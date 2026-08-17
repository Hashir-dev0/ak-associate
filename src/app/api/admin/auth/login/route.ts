import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";
import { readDb, verifyAdminCredentials } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const db = readDb();
    // Verify password against stored hash or env variables
    const isValid = verifyAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = createSessionToken({ email: db.admin.email, role: "admin" });

    const response = NextResponse.json({
      success: true,
      user: {
        email: db.admin.email,
        name: db.admin.name,
        role: "admin",
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: "ak_admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 500 });
  }
}
