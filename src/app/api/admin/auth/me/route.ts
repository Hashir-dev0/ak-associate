import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { readDb } from "@/lib/db";

export async function GET() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("ak_admin_session")?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const payload = verifySessionToken(sessionToken);
  if (!payload) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const db = readDb();
  return NextResponse.json({
    user: {
      email: db.admin.email,
      name: db.admin.name,
      role: db.admin.role,
    },
  });
}
