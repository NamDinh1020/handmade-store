"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCartIcon({ productId }: { productId: string }) {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
      size="icon"
      variant="secondary"
      onClick={handleAddToCart}
      disabled={isLoading}
      className="rounded-full bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white transition-colors shadow-sm"
    >
      <ShoppingCart className="w-4 h-4" />
    </Button>
  );
}