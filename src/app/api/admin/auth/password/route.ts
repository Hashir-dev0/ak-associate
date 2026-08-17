import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { readDb, updateAdminPassword, verifyAdminCredentials } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("ak_admin_session")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const payload = verifySessionToken(sessionToken);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Invalid admin session" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const db = readDb();
    const adminEmail = process.env.ADMIN_EMAIL || db.admin.email;

    // Verify current password
    const isCurrentValid = verifyAdminCredentials(adminEmail, currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    // Update password
    const updated = updateAdminPassword(adminEmail, newPassword);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update admin password" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Admin password updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Password change failed" }, { status: 500 });
  }
}
