import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Bell, User, MapPin, Settings, Heart, Package, LogOut, Clock, CheckCircle, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UserMenu from "@/components/user-menu";
import HeaderCartIcon from "@/components/cart/header-cart-icon";
import ProfileForm from "@/components/account/profile-form";
import AddressForm from "@/components/account/address-form";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams.tab || "profile";

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        include: {
          orderItems: {
            include: { product: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  const menuItems = [
    { id: "profile", label: "Thông tin cá nhân", icon: User },
    { id: "orders", label: "Đơn hàng của tôi", icon: Package },
    { id: "favorites", label: "Sản phẩm yêu thích", icon: Heart },
    { id: "address", label: "Địa chỉ", icon: MapPin },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "PAID":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "SHIPPED":
        return <Truck className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Chờ thanh toán / COD";
      case "PAID":
        return "Đã thanh toán";
      case "SHIPPED":
        return "Đang giao hàng";
      default:
        return status;
    }
  };

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
            <HeaderCartIcon />

            <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">5</span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>

            <UserMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Tài Khoản Của Tôi</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 shrink-0">
            <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shadow-inner shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-slate-900 text-lg truncate">{user.name}</h3>
                    <p className="text-sm text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <Link
                        key={item.id}
                        href={`/account?tab=${item.id}`}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-semibold ${
                          isActive 
                            ? "bg-slate-900 text-white shadow-md" 
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                  
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link href="/api/auth/signout" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-semibold text-red-600 hover:bg-red-50">
                      <LogOut className="w-5 h-5" />
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <Card className="border-slate-200 shadow-sm rounded-3xl overflow-hidden bg-white min-h-[500px]">
              
              {activeTab === "profile" && (
                <CardContent className="p-6 sm:p-8 space-y-8">
                  <h2 className="text-2xl font-bold text-slate-900">Thông Tin Cá Nhân</h2>
                  <ProfileForm user={user} />
                </CardContent>
              )}

              {activeTab === "orders" && (
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Đơn hàng của tôi</h2>
                  {user.orders.length === 0 ? (
                    <div className="bg-slate-50 rounded-2xl p-12 border border-slate-200 text-center shadow-sm">
                      <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Chưa có đơn hàng nào</h3>
                      <p className="text-slate-500 mb-6">Bạn chưa thực hiện giao dịch nào trên hệ thống.</p>
                      <Button asChild className="rounded-xl font-bold">
                        <Link href="/">Bắt đầu mua sắm</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
                            <div>
                              <p className="text-sm text-slate-500 font-medium">Mã đơn hàng</p>
                              <p className="font-bold text-slate-900 truncate max-w-[200px]">{order.id}</p>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                              {getStatusIcon(order.status)}
                              <span className="font-bold text-slate-700 text-sm">{getStatusText(order.status)}</span>
                            </div>
                          </div>

                          <div className="space-y-4 mb-6">
                            {order.orderItems.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-xl p-2 flex-shrink-0">
                                  <img
                                    src={`https://placehold.co/400x400/f1f5f9/64748b?text=${item.product.name.replace(/ /g, '+')}`}
                                    alt={item.product.name}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.product.name}</h4>
                                  <p className="text-slate-500 text-sm">x{item.quantity}</p>
                                </div>
                                <div className="font-bold text-slate-900">
                                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                            <span className="font-medium text-slate-500">Tổng tiền</span>
                            <span className="text-xl font-black text-slate-900">
                              {order.totalAmount.toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              )}

              {activeTab === "address" && (
                <CardContent className="p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-slate-900">Sổ Địa Chỉ</h2>
                  </div>
                  <AddressForm user={user} />
                </CardContent>
              )}

              {["favorites", "settings"].includes(activeTab) && (
                <CardContent className="p-8 flex flex-col items-center justify-center h-[500px] text-slate-400">
                  <Package className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium">Tính năng đang được phát triển</p>
                </CardContent>
              )}

            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}