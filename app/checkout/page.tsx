"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type CartItemType = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
};

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      fetchCart();
    }
  }, [status, router]);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        if (!data.cartItems || data.cartItems.length === 0) {
          router.push("/cart");
          return;
        }
        setCartItems(data.cartItems);
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, phone, paymentMethod }),
      });

      if (res.ok) {
        const data = await res.json();
        window.dispatchEvent(new Event("cart-updated"));
        
        if (data.paymentMethod === "VNPAY" && data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          router.push("/checkout/success");
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching || status === "loading") {
    return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/cart" className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Quay lại giỏ hàng
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Thanh toán</h1>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Thông tin giao hàng</h2>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Người nhận</label>
                  <Input value={session?.user?.name || ""} disabled className="bg-slate-50 text-slate-500" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Số điện thoại</label>
                  <Input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại liên hệ" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Địa chỉ giao hàng chi tiết</label>
                  <Input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Phương thức thanh toán</h2>
                
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="mr-4 w-4 h-4 accent-slate-900" />
                    <Truck className="w-6 h-6 mr-3 text-slate-600" />
                    <span className="font-medium text-slate-900">Thanh toán khi nhận hàng (COD)</span>
                  </label>

                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'VNPAY' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input type="radio" name="payment" value="VNPAY" checked={paymentMethod === 'VNPAY'} onChange={() => setPaymentMethod('VNPAY')} className="mr-4 w-4 h-4 accent-blue-600" />
                    <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                    <span className="font-medium text-slate-900">Thanh toán qua VNPAY</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-slate-200 shadow-sm sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Đơn hàng của bạn</h2>
                
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3 flex-1 pr-4">
                        <span className="font-bold text-slate-500">{item.quantity}x</span>
                        <span className="font-medium text-slate-900 line-clamp-1">{item.product.name}</span>
                      </div>
                      <span className="font-medium text-slate-600 whitespace-nowrap">
                        {(item.product.price * item.quantity).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-slate-200 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-900 font-bold">Tổng cộng</span>
                    <span className="text-3xl font-black text-slate-900">
                      {totalAmount.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full h-14 text-base font-bold rounded-2xl bg-slate-900 hover:bg-slate-800 shadow-md">
                  {isLoading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}