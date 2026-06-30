"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Bell, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserMenu from "@/components/user-menu";

type CartItemType = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
  };
};

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setCartItems(data.cartItems || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );

    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId, quantity: newQuantity }),
    });
  };

  const removeItem = async (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    await fetch(`/api/cart?cartItemId=${cartItemId}`, { method: "DELETE" });
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (isLoading || status === "loading") {
    return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Đang tải giỏ hàng...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 border-2 border-slate-900 flex items-center justify-center font-bold text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 rounded-lg">
              LOGO
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">Keycap</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative p-2 text-slate-900 bg-slate-100 rounded-full transition-all cursor-pointer">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </div>
            <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
              <Bell className="w-6 h-6" />
            </button>
            <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/product" className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Tiếp tục mua sắm
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Giỏ hàng của bạn</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Giỏ hàng trống</h2>
            <p className="text-slate-500 mb-8 max-w-md">Bạn chưa thêm sản phẩm nào vào giỏ. Hãy quay lại cửa hàng để khám phá các mẫu keycap độc đáo nhé.</p>
            <Button asChild size="lg" className="rounded-full font-bold px-8">
              <Link href="/">Khám phá sản phẩm</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-slate-200 shadow-sm">
                  <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-slate-100 rounded-2xl flex-shrink-0 p-2 relative overflow-hidden">
                      <img
                        src={`https://placehold.co/400x400/f1f5f9/64748b?text=${item.product.name.replace(/ /g, '+')}`}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{item.product.name}</h3>
                      <div className="text-slate-500 text-sm mb-4">Kho: {item.product.stock}</div>
                      <div className="text-xl font-black text-slate-900">
                        {item.product.price.toLocaleString("vi-VN")}đ
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity, -1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-600 hover:text-slate-900 hover:shadow-sm transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-slate-900 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity, 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-600 hover:text-slate-900 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm sticky top-28">
                <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Tổng đơn hàng</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                    <span className="font-medium text-slate-900">{totalAmount.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Phí vận chuyển</span>
                    <span className="font-medium text-slate-900">Miễn phí</span>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-900 font-bold">Tổng cộng</span>
                    <span className="text-3xl font-black text-slate-900">
                      {totalAmount.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 text-right mt-1">(Đã bao gồm VAT nếu có)</p>
                </div>

                <Button className="w-full h-14 text-base font-bold rounded-2xl bg-slate-900 hover:bg-slate-800 shadow-md">
                  Tiến hành Thanh toán
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}