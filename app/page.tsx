import React from "react";
import { Search, ChevronLeft, ChevronRight, Star, ArrowRight, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import UserMenu from "@/components/user-menu";
import HeaderCartIcon from "@/components/header-cart-icon";
import AddToCartIcon from "@/components/add-to-cart-icon";

export default async function Home() {
  const categories = [
    { name: "Keycap SA", color: "bg-blue-100 text-blue-600" },
    { name: "Keycap Cherry", color: "bg-red-100 text-red-600" },
    { name: "Keycap OEM", color: "bg-green-100 text-green-600" },
    { name: "Keycap DSA", color: "bg-purple-100 text-purple-600" },
    { name: "Keycap XDA", color: "bg-orange-100 text-orange-600" },
    { name: "Keycap Custom", color: "bg-slate-200 text-slate-800" },
  ];

  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
  });

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

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
        <div className="relative max-w-3xl mx-auto group">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
          <Input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            className="pl-12 py-6 text-base rounded-2xl shadow-sm border-slate-200 focus-visible:ring-slate-300 bg-white transition-shadow focus-visible:shadow-md"
          />
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 h-[320px] flex items-center justify-center shadow-lg group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          <Button variant="outline" size="icon" className="absolute left-6 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="text-center z-10 text-white space-y-4 px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Banner Khuyến Mãi</h1>
            <p className="text-slate-300 text-lg max-w-md mx-auto font-medium">Wireframe - 1200 x 300px</p>
            <Button className="mt-6 bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 py-6 text-base font-bold transition-transform hover:scale-105 shadow-xl">
              Khám Phá Ngay
            </Button>
          </div>

          <Button variant="outline" size="icon" className="absolute right-6 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        <div>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Danh Mục Sản Phẩm</h2>
            <Link href="/product" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center group">
              Xem thêm <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="group cursor-pointer border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-md bg-white overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                    <span className="font-bold text-xl">{category.name.charAt(7)}</span>
                  </div>
                  <span className="font-semibold text-sm text-slate-700 group-hover:text-slate-900">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sản Phẩm Mới Nhất</h2>
            <Link href="/product" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center group">
              Xem thêm <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group block">
                <Card className="h-full overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white">
                  <div className="aspect-square bg-slate-100 relative overflow-hidden">
                     <img 
                        src={`https://placehold.co/400x400/f1f5f9/64748b?text=${product.name.replace(/ /g, '+')}`} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     {index < 2 && (
                       <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-sm tracking-wider">
                         MỚI
                       </span>
                     )}
                  </div>
                  
                  <CardContent className="p-5 flex flex-col gap-2">
                    <h3 className="font-bold text-slate-800 truncate text-base" title={product.name}>
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-slate-700">5.0</span>
                      <span className="text-xs font-medium text-slate-400">(0)</span>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-black text-slate-900">
                        {product.price.toLocaleString("vi-VN")}đ
                      </span>
                      <AddToCartIcon productId={product.id} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}