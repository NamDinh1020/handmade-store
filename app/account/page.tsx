"use client";

import React, { useState } from "react";
import { ShoppingCart, Bell, User, MapPin, Settings, Heart, Package, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Link = ({ href, children, className, ...props }: any) => {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Thông tin cá nhân", icon: User },
    { id: "orders", label: "Đơn hàng của tôi", icon: Package },
    { id: "favorites", label: "Sản phẩm yêu thích", icon: Heart },
    { id: "address", label: "Địa chỉ", icon: MapPin },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 border-2 border-slate-900 flex items-center justify-center font-bold text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 rounded-lg">
              LOGO
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">Keycap</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">3</span>
            </Link>

            <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">5</span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>

            <Link href="/account" className="flex items-center gap-3 p-1.5 bg-slate-100 rounded-2xl transition-all border border-slate-200 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 border border-slate-200 shadow-sm">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden sm:block pr-3">
                <div className="text-sm font-bold text-slate-900 leading-none mb-1">Nguyễn Văn A</div>
                <div className="text-xs text-slate-500 leading-none">Tài khoản</div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Tài Khoản Của Tôi</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 shrink-0">
            <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shadow-inner shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-slate-900 text-lg truncate">Nguyễn Văn A</h3>
                    <p className="text-sm text-slate-500 truncate">user@email.com</p>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-semibold ${
                          isActive 
                            ? "bg-slate-900 text-white shadow-md" 
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    );
                  })}
                  
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-semibold text-red-600 hover:bg-red-50">
                      <LogOut className="w-5 h-5" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white min-h-[500px]">
              {activeTab === "profile" && (
                <CardContent className="p-6 sm:p-8 space-y-8">
                  <h2 className="text-2xl font-bold text-slate-900">Thông Tin Cá Nhân</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900">Họ</label>
                      <Input type="text" defaultValue="Nguyễn" className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900">Tên</label>
                      <Input type="text" defaultValue="Văn A" className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Email</label>
                    <Input type="email" defaultValue="user@email.com" readOnly className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed focus-visible:ring-0" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Số điện thoại</label>
                    <Input type="tel" defaultValue="0123456789" className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900">Ngày sinh</label>
                    <Input type="date" defaultValue="1990-01-01" className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-900">Giới tính</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center cursor-pointer group">
                        <input type="radio" name="gender" value="male" defaultChecked className="w-4 h-4 text-slate-900 focus:ring-slate-900 border-gray-300" />
                        <span className="ml-2 text-sm font-medium text-slate-700 group-hover:text-slate-900">Nam</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input type="radio" name="gender" value="female" className="w-4 h-4 text-slate-900 focus:ring-slate-900 border-gray-300" />
                        <span className="ml-2 text-sm font-medium text-slate-700 group-hover:text-slate-900">Nữ</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input type="radio" name="gender" value="other" className="w-4 h-4 text-slate-900 focus:ring-slate-900 border-gray-300" />
                        <span className="ml-2 text-sm font-medium text-slate-700 group-hover:text-slate-900">Khác</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md">
                      Cập Nhật Thông Tin
                    </Button>
                  </div>
                </CardContent>
              )}

              {activeTab !== "profile" && (
                <CardContent className="p-8 flex flex-col items-center justify-center h-[500px] text-slate-400">
                  <Package className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium">Tính năng đang được phát triển</p>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}