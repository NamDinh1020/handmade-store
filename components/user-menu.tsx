"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { User } from "lucide-react";

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>;
  }

  if (session?.user) {
    return (
      <Link href="/account" className="flex items-center gap-3 p-1.5 hover:bg-slate-100 rounded-2xl transition-all border border-transparent hover:border-slate-200 cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 shadow-inner">
          <User className="w-5 h-5" />
        </div>
        <div className="hidden sm:block pr-3">
          <div className="text-sm font-bold text-slate-900 leading-none mb-1">
            {session.user.name || "Khách hàng"}
          </div>
          <div className="text-xs text-slate-500 leading-none">Tài khoản</div>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/auth/login" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-colors shadow-sm">
      Đăng nhập
    </Link>
  );
}