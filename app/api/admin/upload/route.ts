import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const MAX_SIZE = 8 * 1024 * 1024; // 8 MB per image
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
  }
  const form = await req.formData();
  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ ok: false, error: "No files received" }, { status: 400 });
  }

  const uploaded: { src: string; pathname: string }[] = [];
  for (const file of files) {
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: `"${file.name}" is not an image (jpeg/png/webp/gif only)` },
        { status: 415 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { ok: false, error: `"${file.name}" is larger than 8 MB` },
        { status: 413 }
      );
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
    const blob = await put(`gallery/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    uploaded.push({ src: blob.url, pathname: blob.pathname });
  }
  return NextResponse.json({ ok: true, uploaded });
}
