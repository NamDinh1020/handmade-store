import React from "react";
import { ChevronRight, Star, Heart, Share2, Minus, Plus, ShoppingCart, Bell, User } from "lucide-react";
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

export default function ProductDetail() {
  const reviews = [
    { id: 1, name: "Người dùng 1", rating: 5, comment: "Sản phẩm rất đẹp, chất lượng tốt, đóng gói cẩn thận. Switch gõ rất êm tay." },
    { id: 2, name: "Người dùng 2", rating: 4, comment: "Keycap lên màu chuẩn, profile gõ quen tay. Giao hàng hơi chậm một chút nhưng shop tư vấn nhiệt tình." },
    { id: 3, name: "Người dùng 3", rating: 5, comment: "Tuyệt vời! Sẽ ủng hộ shop trong các dự án build phím tiếp theo." },
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

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
        <nav className="flex items-center text-sm text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/" className="hover:text-blue-600 transition-colors">Keycap GMK</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900">Keycap GMK Olivia</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative group cursor-pointer">
                <img 
                  src="https://placehold.co/600x600/f1f5f9/64748b?text=Hinh+Anh+San+Pham" 
                  alt="Keycap GMK Olivia"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${item === 1 ? 'border-slate-900 shadow-sm' : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'}`}>
                    <img 
                      src={`https://placehold.co/150x150/f1f5f9/64748b?text=${item}`} 
                      alt={`Thumbnail ${item}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-start">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Keycap GMK Olivia</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-5 h-5 ${star === 5 ? 'text-slate-300 fill-slate-300' : 'text-amber-400 fill-amber-400'}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-700">4.8</span>
                <span className="text-sm text-slate-500 underline cursor-pointer hover:text-slate-900">(156 đánh giá)</span>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-black text-red-600 mb-2">2,500,000đ</div>
                <div className="text-lg text-slate-400 font-medium line-through decoration-slate-400">3,200,000đ</div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8 space-y-3">
                <h3 className="font-bold text-slate-900 mb-4">Mô tả sản phẩm:</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start"><span className="mr-2 font-bold text-slate-400">•</span> Chất liệu: ABS Double-shot</li>
                  <li className="flex items-start"><span className="mr-2 font-bold text-slate-400">•</span> Profile: Cherry Profile</li>
                  <li className="flex items-start"><span className="mr-2 font-bold text-slate-400">•</span> Tương thích: MX Switch</li>
                  <li className="flex items-start"><span className="mr-2 font-bold text-slate-400">•</span> Xuất xứ: Thiết kế bởi Olivia</li>
                  <li className="flex items-start"><span className="mr-2 font-bold text-slate-400">•</span> Đặc điểm: Màu hồng pastel sang trọng</li>
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-slate-900 mb-3 text-sm">Số lượng:</h4>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-l-lg rounded-r-none border-slate-300 text-slate-600 hover:bg-slate-100">
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input 
                    type="text" 
                    defaultValue="1" 
                    className="h-10 w-16 text-center rounded-none border-x-0 border-slate-300 font-semibold focus-visible:ring-0" 
                  />
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-r-lg rounded-l-none border-slate-300 text-slate-600 hover:bg-slate-100">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Button className="h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg">
                  Mua Ngay
                </Button>
                <Button variant="outline" className="h-14 border-2 border-slate-900 text-slate-900 font-bold text-base rounded-xl hover:bg-slate-50 transition-all">
                  Thêm Vào Giỏ
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-slate-600 font-semibold hover:text-red-500 hover:bg-red-50 px-4">
                  <Heart className="w-5 h-5 mr-2" /> Yêu thích
                </Button>
                <Button variant="ghost" className="text-slate-600 font-semibold hover:text-blue-600 hover:bg-blue-50 px-4">
                  <Share2 className="w-5 h-5 mr-2" /> Chia sẻ
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Đánh Giá Sản Phẩm</h2>
            <Button variant="outline" className="border-slate-300 text-slate-700 font-semibold hover:bg-slate-50">
              Viết Đánh Giá
            </Button>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="border-slate-200 shadow-none bg-slate-50/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-slate-900 text-base">{review.name}</div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 fill-slate-300'}`} />
                        ))}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mt-2">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}