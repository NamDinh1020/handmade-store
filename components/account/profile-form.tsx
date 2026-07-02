"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileForm({ user }: { user: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, dateOfBirth }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Họ và Tên</label>
          <Input required value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Email</label>
          <Input value={user.email} readOnly className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed focus-visible:ring-0" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Số điện thoại</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Chưa cập nhật" className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Ngày sinh</label>
          <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300" />
        </div>
      </div>
      <div className="pt-4">
        <Button type="submit" disabled={isLoading} className="h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md">
          {isLoading ? "Đang xử lý..." : "Cập Nhật Thông Tin"}
        </Button>
      </div>
    </form>
  );
}