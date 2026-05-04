import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put } from "@vercel/blob";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

const allowedExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
  ".heic",
  ".heif",
  ".bmp",
  ".tif",
  ".tiff",
  ".ico",
]);

function contentTypeFor(ext: string, fallback: string) {
  if (fallback) return fallback;
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".avif": "image/avif",
    ".heic": "image/heic",
    ".heif": "image/heif",
    ".bmp": "image/bmp",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
    ".ico": "image/x-icon",
  };
  return map[ext] ?? "application/octet-stream";
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File topilmadi" }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  const isImage = file.type.startsWith("image/") || allowedExtensions.has(ext);

  if (!isImage) {
    return NextResponse.json({ error: "Faqat rasm yuklash mumkin" }, { status: 400 });
  }

  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: "Rasm 20MB dan kichik bo'lishi kerak" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeExt = allowedExtensions.has(ext) ? ext : ".png";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${safeExt}`;
  const contentType = contentTypeFor(safeExt, file.type);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`muradovs-smm/${fileName}`, bytes, {
      access: "public",
      contentType,
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  }

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Production upload uchun Vercel Blob token kerak: BLOB_READ_WRITE_TOKEN env qo'shing." },
      { status: 500 },
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), bytes);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
