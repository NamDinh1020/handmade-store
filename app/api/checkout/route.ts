import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import crypto from "crypto";
import querystring from "querystring";

function sortObject(obj: Record<string, any>) {
  const sorted: Record<string, string> = {};
  const str = [];
  let key;
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

function formatVnPayDate(date: Date) {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { address, phone, paymentMethod } = await req.json();

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        cartItems: { include: { product: true } }
      }
    });

    if (!cart || cart.cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const totalAmount = cart.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        shippingAddress: `${phone} - ${address}`,
        status: "PENDING",
        orderItems: {
          create: cart.cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      }
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    if (paymentMethod === "VNPAY") {
      const ipAddr = req.headers.get("x-forwarded-for") || "127.0.0.1";
      const tmnCode = process.env.VNPAY_TMN_CODE!;
      const secretKey = process.env.VNPAY_HASH_SECRET!;
      const vnpUrl = process.env.VNPAY_URL!;
      const returnUrl = process.env.VNPAY_RETURN_URL!;

      const date = new Date();
      const createDate = formatVnPayDate(date);
      date.setMinutes(date.getMinutes() + 15);
      const expireDate = formatVnPayDate(date);

      let vnp_Params: Record<string, any> = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: order.id,
        vnp_OrderInfo: `Thanh toan don hang ${order.id}`,
        vnp_OrderType: "other",
        vnp_Amount: totalAmount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate
      };

      vnp_Params = sortObject(vnp_Params);
      const signData = querystring.stringify(vnp_Params, '&', '=', { encodeURIComponent: (str: string) => str });
      const hmac = crypto.createHmac("sha512", secretKey);
      const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      vnp_Params.vnp_SecureHash = signed;

      const paymentUrl = `${vnpUrl}?${querystring.stringify(vnp_Params, '&', '=', { encodeURIComponent: (str: string) => str })}`;

      return NextResponse.json({ success: true, orderId: order.id, paymentMethod: "VNPAY", paymentUrl });
    }

    return NextResponse.json({ success: true, orderId: order.id, paymentMethod: "COD" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}