import React from "react";
import { ChevronRight, Trash2, Minus, Plus, ShoppingCart, Bell, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Link = ({ href, children, className, ...props }: any) => {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
};

export default function CartPage() {
  const cartItems = [
    { id: 1, name: "Sản phẩm 1 (Keycap GMK Olivia)", price: 2500000, quantity: 1, image: "https://placehold.co/150x150/f1f5f9/64748b?text=SP1" },
    { id: 2, name: "Sản phẩm 2 (Keycap PBT Chalk)", price: 850000, quantity: 2, image: "https://placehold.co/150x150/f1f5f9/64748b?text=SP2" },
    { id: 3, name: "Sản phẩm 3 (Switch Cherry Red)", price: 120000, quantity: 1, image: "https://placehold.co/150x150/f1f5f9/64748b?text=SP3" },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

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
            <Link href="/cart" className="relative p-2 text-slate-900 bg-slate-100 rounded-full transition-all">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">3</span>
            </Link>

            <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">5</span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>

            <Link href="/account" className="flex items-center gap-3 p-1.5 hover:bg-slate-100 rounded-2xl transition-all border border-transparent hover:border-slate-200 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 shadow-inner">
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
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Giỏ Hàng & Đặt Hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-100 pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">Sản Phẩm Trong Giỏ ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-white hover:bg-slate-50/50 transition-colors">
                      <div className="w-24 h-24 rounded-xl border border-slate-200 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-bold text-slate-900 text-base leading-tight">{item.name}</h3>
                          <span className="font-bold text-slate-900 whitespace-nowrap hidden sm:block">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <div className="text-sm text-slate-500">{item.price.toLocaleString('vi-VN')}đ / cái</div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                            <button className="h-8 w-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <input 
                              type="text" 
                              value={item.quantity} 
                              readOnly 
                              className="h-8 w-12 text-center text-sm font-semibold border-x border-slate-200 bg-transparent focus:outline-none" 
                            />
                            <button className="h-8 w-8 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <span className="font-bold text-slate-900 sm:hidden">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </span>

                          <button className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium">
                            <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Xóa</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-100 pb-4">
                <CardTitle className="text-xl font-bold text-slate-900">Thông Tin Giao Hàng</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5 bg-white">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Họ và tên người nhận <span className="text-red-500">*</span></label>
                  <Input type="text" placeholder="Nhập họ tên..." className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300 shadow-sm" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Số điện thoại <span className="text-red-500">*</span></label>
                  <Input type="tel" placeholder="Nhập số điện thoại..." className="h-12 rounded-xl border-slate-200 focus-visible:ring-slate-300 shadow-sm" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Địa chỉ giao hàng chi tiết <span className="text-red-500">*</span></label>
                  <textarea 
                    placeholder="Nhập địa chỉ đầy đủ (Số nhà, đường, phường/xã, quận/huyện, tỉnh/TP)..." 
                    className="flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-transparent px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900">Ghi chú đơn hàng (Tùy chọn)</label>
                  <textarea 
                    placeholder="Thêm ghi chú về màu sắc, khắc tên, giờ giao hàng..." 
                    className="flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-transparent px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
              </CardContent>
            </Card>

          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                  <CardTitle className="text-xl font-bold text-slate-900">Tổng Đơn Hàng</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Tạm tính:</span>
                      <span className="font-semibold text-slate-900">{subtotal.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Phí vận chuyển:</span>
                      <span className="font-semibold text-slate-900">{shippingFee.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-dashed border-slate-200 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">Tổng cộng:</span>
                      <span className="text-2xl font-black text-red-600">{total.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="text-sm font-semibold text-slate-900">Phương thức thanh toán:</h4>
                    
                    <label className="flex items-center p-4 border border-blue-200 bg-blue-50/50 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                      <input type="radio" name="payment" value="cod" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" defaultChecked />
                      <span className="ml-3 font-semibold text-slate-900 text-sm">Thanh toán khi nhận hàng (COD)</span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 hover:bg-slate-50 transition-colors">
                      <input type="radio" name="payment" value="bank" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                      <span className="ml-3 font-medium text-slate-700 text-sm">Chuyển khoản ngân hàng</span>
                    </label>
                  </div>

                  <Button className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg">
                    Tiến Hành Đặt Hàng
                  </Button>

                  <div className="mt-6 text-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      <ArrowLeft className="w-4 h-4 mr-1" /> Tiếp tục mua sắm
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-slate-100 rounded-2xl p-4 text-center">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Thông tin cá nhân của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích giao hàng theo chính sách của cửa hàng.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}