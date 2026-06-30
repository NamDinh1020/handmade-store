import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Star, Package, Clock, ShieldCheck, ChevronRight, Bell } from "lucide-react";
import Link from "next/link";
import UserMenu from "@/components/user-menu";
import HeaderCartIcon from "@/components/header-cart-icon";
import AddToCartButton from "@/components/add-to-cart-button";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) {
    notFound();
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
            <HeaderCartIcon />

            <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">5</span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>

            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/product" className="hover:text-slate-900 transition-colors">Sản phẩm</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="bg-slate-100 p-8 flex items-center justify-center relative min-h-[400px]">
              <img
                src={`https://placehold.co/800x800/f1f5f9/64748b?text=${product.name.replace(/ /g, '+')}`}
                alt={product.name}
                className="w-full max-w-md object-contain mix-blend-multiply drop-shadow-xl"
              />
              {product.isPreorder && (
                <span className="absolute top-6 left-6 bg-blue-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  Hàng đặt trước (Pre-order)
                </span>
              )}
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-500">5.0 (0 đánh giá)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className={`text-sm font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
                </span>
              </div>

              <div className="text-4xl font-black text-slate-900 mb-8">
                {product.price.toLocaleString("vi-VN")}đ
              </div>

              <p className="text-slate-600 text-base leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-slate-600" />
                  </div>
                  <span className="text-sm font-medium">Giao hàng toàn quốc</span>
                </div>
                
                {product.isPreorder && product.craftingTime && (
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Chế tác: {product.craftingTime}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Bảo hành 12 tháng</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <AddToCartButton productId={product.id} stock={product.stock} />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1 h-14 text-base font-bold rounded-2xl border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-50"
                  disabled={product.stock === 0}
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}