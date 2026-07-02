"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function HeaderCartIcon() {
  const { status } = useSession();
  const [count, setCount] = useState(0);

  const fetchCart = async () => {
    if (status !== "authenticated") return;
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setCount(data.cartItems?.length || 0);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCart();
    
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cart-updated", handleCartUpdate);
    
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, [status]);

  return (
    <Link href="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
          {count}
        </span>
      )}
    </Link>
  );
}