import { NextResponse } from "next/server";
import { getHeroData, updateHeroData } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ hero: getHeroData() });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = updateHeroData(body);
    return NextResponse.json({ success: true, hero: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
