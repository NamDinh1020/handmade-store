"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddressForm({ user }: { user: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(user.address || "");

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      if (res.ok) {
        setIsEditing(false);
        router.refresh();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: null }),
      });
      if (res.ok) {
        setAddress("");
        router.refresh();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900">Địa chỉ giao hàng mặc định</label>
          <Input autoFocus value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Nhập địa chỉ của bạn" className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300" />
        </div>
        <div className="flex gap-4">
          <Button onClick={handleSave} disabled={isLoading} className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm">
            Lưu địa chỉ
          </Button>
          <Button onClick={() => setIsEditing(false)} variant="outline" className="rounded-xl font-bold">
            Hủy
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-slate-900 rounded-2xl p-5 sm:p-6 relative bg-slate-50/50">
        <span className="absolute top-5 right-5 text-[10px] uppercase font-black bg-slate-900 text-white px-2 py-1 rounded">
          Mặc định
        </span>
        <div className="mb-2 pr-20">
          <span className="font-bold text-slate-900 mr-2 text-lg">{user.name}</span>
          <span className="text-slate-500 text-sm">| {user.phone || "Chưa cập nhật SĐT"}</span>
        </div>
        <p className="text-slate-700 text-sm mb-5 pr-4 leading-relaxed">
          {user.address || "Bạn chưa thiết lập địa chỉ giao hàng nào. Vui lòng thêm địa chỉ mới để quá trình thanh toán diễn ra nhanh chóng hơn."}
        </p>
        <div className="flex gap-4">
          <button onClick={() => setIsEditing(true)} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            {user.address ? "Thay đổi" : "Thêm địa chỉ"}
          </button>
          {user.address && (
            <button onClick={handleDelete} disabled={isLoading} className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
              Xóa
            </button>
          )}
        </div>
      </div>
    </div>
  );
}