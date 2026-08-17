import { NextResponse } from "next/server";
import { getServicesData, createService, updateService, deleteService } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ services: getServicesData() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.shortDescription) {
      return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    }
    const newService = createService(body);
    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }
    const updated = updateService(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }
    deleteService(id);
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
