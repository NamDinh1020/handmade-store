import Link from "next/link";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Đặt hàng thành công!</h1>
        <p className="text-slate-500 mb-8 leading-relaxed text-sm">
          Cảm ơn bạn đã mua sắm tại Handmade Store. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full h-12 text-base font-bold rounded-xl bg-slate-900 hover:bg-slate-800">
            <Link href="/account">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Xem đơn hàng
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full h-12 text-base font-bold rounded-xl border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-50 text-slate-700">
            <Link href="/">
              Tiếp tục mua sắm
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}