import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Các hàm tiện ích tự viết để random dữ liệu
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

async function main() {
  console.log('Bắt đầu dọn dẹp dữ liệu cũ...');
  // Xóa dữ liệu theo thứ tự để không bị lỗi khóa ngoại (Foreign Key)
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('Đang tạo 10 User ảo...');
  // Vẫn dùng bcrypt để băm mật khẩu, vì nếu lưu mật khẩu thô thì lát nữa code Đăng nhập sẽ không chạy được
  const hashedPassword = await bcrypt.hash('123456', 10); 

  const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi'];
  const middleNames = ['Văn', 'Thị', 'Hoàng', 'Minh', 'Ngọc', 'Hải', 'Thanh'];
  const lastNames = ['Nam', 'Anh', 'Hùng', 'Linh', 'Trang', 'Hương', 'Đạt', 'Sơn'];

  for (let i = 0; i < 10; i++) {
    const fullName = `${randomElement(firstNames)} ${randomElement(middleNames)} ${randomElement(lastNames)}`;
    await prisma.user.create({
      data: {
        name: fullName,
        email: `khachhang${i + 1}@gmail.com`,
        password: hashedPassword,
        phone: `09${randomInt(10000000, 99999999)}`,
        address: `${randomInt(1, 200)} Đường Mẫu, Quận Test, TP.HCM`,
        role: i === 0 ? 'ADMIN' : 'USER', // Người đầu tiên (khachhang1) làm Admin
      },
    });
  }

  console.log('Đang tạo 20 Sản phẩm thủ công ảo...');
  const prefixes = ['Keycap', 'Mô hình', 'Tượng gỗ', 'Bàn phím custom', 'Kê tay'];
  const materials = ['Resin', 'Gỗ Óc Chó', 'Đất sét', 'PBT Double-shot', 'Kim loại'];
  const adjectives = ['Tuyệt Đẹp', 'Bản Giới Hạn', 'Phong cách Cyberpunk', 'Màu Pastel', 'Vintage'];
  const craftingTimes = ['3-5 ngày', '1 tuần', '2 tuần', null];

  for (let i = 0; i < 20; i++) {
    const productName = `${randomElement(prefixes)} ${randomElement(materials)} - ${randomElement(adjectives)}`;
    
    await prisma.product.create({
      data: {
        name: productName,
        description: 'Đây là mô tả sản phẩm tự động. Sản phẩm được chế tác hoàn toàn thủ công với độ tinh xảo cao, phù hợp để làm quà tặng hoặc decor góc làm việc.',
        price: randomInt(150, 3500) * 1000, // Giá từ 150k đến 3.5 triệu
        stock: randomInt(0, 50),
        isPreorder: Math.random() > 0.5, // 50% cơ hội là hàng order
        craftingTime: randomElement(craftingTimes),
      },
    });
  }

  console.log('Gieo mầm dữ liệu THÀNH CÔNG! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });