import React from "react";
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

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans py-12">
      <Card className="w-full max-w-[420px] rounded-3xl shadow-xl border-slate-200 bg-white overflow-hidden">
        <CardContent className="p-8 sm:p-10 flex flex-col items-center">
          
          <Link href="/" className="flex items-center gap-4 group mb-8">
            <div className="w-14 h-14 border-2 border-slate-900 flex items-center justify-center font-bold text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 rounded-xl text-sm">
              LOGO
            </div>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
            Đăng Ký
          </h1>

          <div className="w-full space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Họ và tên</label>
              <Input 
                type="text" 
                placeholder="Nhập họ tên..." 
                className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300 shadow-sm" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Email</label>
              <Input 
                type="email" 
                placeholder="example@email.com" 
                className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300 shadow-sm" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Mật khẩu</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300 shadow-sm" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900">Xác nhận mật khẩu</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300 shadow-sm" 
              />
            </div>

            <div className="pt-2">
              <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-xl transition-all shadow-md">
                Đăng Ký
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm font-medium text-slate-600">
            Đã có tài khoản?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 hover:underline">
              Đăng nhập
            </Link>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}