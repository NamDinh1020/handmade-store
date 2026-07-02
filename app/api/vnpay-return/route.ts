import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

export async function GET(req: Request) {
  const url = new URL(req.url);
  let vnp_Params = Object.fromEntries(url.searchParams.entries());

  const secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  const secretKey = process.env.VNPAY_HASH_SECRET!;
  const signData = querystring.stringify(vnp_Params, '&', '=', { encodeURIComponent: (str: string) => str });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  const orderId = vnp_Params["vnp_TxnRef"];
  const responseCode = vnp_Params["vnp_ResponseCode"];

  if (secureHash === signed) {
    if (responseCode === "00") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" }
      });
      return NextResponse.redirect(new URL("/checkout/success", req.url));
    } else {
      return NextResponse.redirect(new URL("/checkout/failed", req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/checkout/failed", req.url));
  }
}