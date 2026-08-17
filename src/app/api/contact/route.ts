import { NextResponse } from "next/server";
import { createMessage } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, service, message } = body || {};
    // Trim inputs
    const cleanFirstName = String(firstName || "").trim().slice(0, 100);
    const cleanLastName = String(lastName || "").trim().slice(0, 100);
    const cleanEmail = String(email || "").trim().toLowerCase().slice(0, 150);
    const cleanPhone = String(phone || "").trim().slice(0, 50);
    const cleanService = String(service || "General Construction Inquiry").trim().slice(0, 100);
    const cleanMessage = String(message || "").trim().slice(0, 3000);

    // Server-side validation
    if (!cleanFirstName || !cleanEmail || !cleanPhone || !cleanMessage) {
      return NextResponse.json(
        { error: "Please provide all required fields." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Save message directly into database store for Admin Inquiries inbox
    const savedMessage = createMessage({
      firstName: cleanFirstName,
      lastName: cleanLastName,
      email: cleanEmail,
      phone: cleanPhone,
      service: cleanService,
      message: cleanMessage,
    });

    console.log("[New Project Enquiry Stored in DB]:", savedMessage.id);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you. Your project enquiry has been registered.",
        id: savedMessage.id,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
