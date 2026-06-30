"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId, stock }: { productId: string; stock: number }) {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (res.ok) {
        window.dispatchEvent(new Event("cart-updated"));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleAddToCart}
      disabled={stock === 0 || isLoading}
      className="flex-1 h-14 text-base font-bold rounded-2xl bg-slate-900 hover:bg-slate-800"
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      {isLoading ? "Đang xử lý..." : "Thêm vào giỏ hàng"}
    </Button>
  );
}