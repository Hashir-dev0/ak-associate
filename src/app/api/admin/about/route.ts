import { NextResponse } from "next/server";
import { getAboutData, updateAboutData } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ about: getAboutData() });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = updateAboutData(body);
    return NextResponse.json({ success: true, about: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
