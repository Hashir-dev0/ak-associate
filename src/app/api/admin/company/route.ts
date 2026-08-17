import { NextResponse } from "next/server";
import { getCompanyData, updateCompanyData } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ company: getCompanyData() });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = updateCompanyData(body);
    return NextResponse.json({ success: true, company: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
