import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // 1. Nhận dữ liệu từ form gửi lên
    const body = await request.json();
    const { name, email, password } = body;

    // 2. Kiểm tra dữ liệu đầu vào
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Vui lòng điền đầy đủ thông tin (Tên, Email, Mật khẩu)." },
        { status: 400 }
      );
    }

    // 3. Kiểm tra email đã tồn tại trong DB chưa
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email này đã được sử dụng. Vui lòng chọn email khác!" },
        { status: 409 }
      );
    }

    // 4. Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Lưu user mới vào Database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER", // Mặc định tài khoản đăng ký mới là USER
      },
    });

    // 6. Trả về kết quả thành công (Không trả về mật khẩu)
    return NextResponse.json(
      { 
        message: "Đăng ký tài khoản thành công!", 
        user: { id: newUser.id, email: newUser.email, name: newUser.name } 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Lỗi API Đăng ký:", error);
    return NextResponse.json(
      { message: "Đã có lỗi xảy ra từ phía server." },
      { status: 500 }
    );
  }
}