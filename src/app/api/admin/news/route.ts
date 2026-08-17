import { NextResponse } from "next/server";
import { getNewsData, createNews, updateNews, deleteNews } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ news: getNewsData() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.excerpt) {
      return NextResponse.json({ error: "Title and excerpt are required." }, { status: 400 });
    }
    const newItem = createNews(body);
    return NextResponse.json({ success: true, news: newItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }
    const updated = updateNews(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, news: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 });
    }
    deleteNews(id);
    return NextResponse.json({ success: true, message: "Article deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
