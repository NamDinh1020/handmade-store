import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutFailedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Thanh toán thất bại!</h1>
        <p className="text-slate-500 mb-8 leading-relaxed text-sm">
          Rất tiếc, giao dịch của bạn đã bị hủy hoặc không thể hoàn tất. Vui lòng kiểm tra lại thông tin và thử lại.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full h-12 text-base font-bold rounded-xl bg-slate-900 hover:bg-slate-800">
            <Link href="/cart">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại giỏ hàng
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}