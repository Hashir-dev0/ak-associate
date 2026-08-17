import { NextResponse } from "next/server";
import { getTestimonialsData, createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ testimonials: getTestimonialsData() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.content) {
      return NextResponse.json({ error: "Name and testimonial content are required." }, { status: 400 });
    }
    const newTestimonial = createTestimonial(body);
    return NextResponse.json({ success: true, testimonial: newTestimonial }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }
    const updated = updateTestimonial(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }
    deleteTestimonial(id);
    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
