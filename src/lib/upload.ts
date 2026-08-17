import fs from "fs";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg"];

export interface UploadResult {
  success: boolean;
  url?: string;
  filename?: string;
  size?: number;
  mime?: string;
  error?: string;
}

export async function processAndSaveImage(file: File): Promise<UploadResult> {
  // 1. Validate file existence
  if (!file || !(file instanceof File)) {
    return { success: false, error: "No file provided" };
  }

  // 2. Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `File size exceeds the 8MB limit. (File size: ${(file.size / 1024 / 1024).toFixed(2)}MB)`,
    };
  }

  // 3. Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      success: false,
      error: `Invalid file format: ${file.type}. Allowed formats: JPG, PNG, WebP, SVG.`,
    };
  }

  // 4. Validate file extension
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      success: false,
      error: `Invalid file extension: ${ext}.`,
    };
  }

  // 5. Generate secure random filename
  const randomSuffix = crypto.randomBytes(8).toString("hex");
  const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
  const safeFilename = `${cleanName}-${Date.now()}-${randomSuffix}${ext}`;

  try {
    // 6. Ensure target upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const targetPath = path.join(UPLOAD_DIR, safeFilename);

    // 7. Write buffer to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/uploads/${safeFilename}`;
    return {
      success: true,
      url: publicUrl,
      filename: safeFilename,
      size: file.size,
      mime: file.type,
    };
  } catch (error: any) {
    // Serverless (e.g. Vercel) fallback: convert to base64 Data URI
    try {
      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      return {
        success: true,
        url: dataUri,
        filename: safeFilename,
        size: file.size,
        mime: file.type,
      };
    } catch (fallbackError) {
      console.error("Image upload write error:", error);
      return {
        success: false,
        error: "Failed to process image. Please try again.",
      };
    }
  }
}
