import { NextResponse } from "next/server";
import { getMediaData, addMediaItem, deleteMediaItem } from "@/lib/db";
import { processAndSaveImage } from "@/lib/upload";

export async function GET() {
  try {
    const media = getMediaData();
    return NextResponse.json({ media });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const uploadResult = await processAndSaveImage(file);
    if (!uploadResult.success || !uploadResult.url) {
      return NextResponse.json({ error: uploadResult.error }, { status: 400 });
    }

    const mediaItem = addMediaItem({
      filename: uploadResult.filename || file.name,
      url: uploadResult.url,
      size: uploadResult.size || file.size,
      mime: uploadResult.mime || file.type,
    });

    return NextResponse.json({ success: true, media: mediaItem });
  } catch (error: any) {
    console.error("Media upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    deleteMediaItem(id);
    return NextResponse.json({ success: true, message: "Media deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
