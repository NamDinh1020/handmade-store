"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Link = ({ href, children, className, ...props }: any) => {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
};

const useRouter = () => ({
  push: (url: string) => {
    window.location.href = url;
  }
});

export default function RegisterPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Đã có lỗi xảy ra.");
        setIsLoading(false);
        return;
      }

      router.push("/auth/login");
      
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 sm:p-10">
          <div className="flex justify-center mb-8">
            <Link href="/" className="w-16 h-16 border-2 border-slate-900 flex items-center justify-center font-bold text-slate-900 rounded-xl hover:bg-slate-900 hover:text-white transition-colors">
              LOGO
            </Link>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 mb-8 tracking-tight">Đăng Ký</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Họ và tên</label>
              <Input 
                type="text" 
                placeholder="Nhập họ tên..." 
                className="h-12 rounded-xl" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Email</label>
              <Input 
                type="email" 
                placeholder="example@email.com" 
                className="h-12 rounded-xl" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Mật khẩu</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 rounded-xl" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Xác nhận mật khẩu</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 rounded-xl" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-xl mt-4 transition-all"
            >
              {isLoading ? "Đang xử lý..." : "Đăng Ký"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-slate-500">
            Đã có tài khoản? <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 hover:underline">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
}