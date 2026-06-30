import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/session-provider";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Handmade Store | Keycap & Models",
  description: "Cửa hàng bán đồ thủ công, keycap custom và mô hình theo yêu cầu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <SessionProvider>
          <main className="min-h-screen bg-slate-50">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}