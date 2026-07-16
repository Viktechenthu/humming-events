import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

function captionFromPath(pathname: string): string {
  const name = pathname.split("/").pop() || "";
  return name
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^\d+-/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

export async function GET() {
  // `configured: false` tells the site to fall back to its built-in photos.
  // When Blob is configured, its contents are authoritative — even when empty,
  // so photos deleted in /admin actually disappear from the public gallery.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ configured: false, photos: [] }, { headers: NO_STORE });
  }
  try {
    const { blobs } = await list({ prefix: "gallery/" });
    const photos = blobs
      .filter((b) => b.size > 0)
      .sort((a, b) => a.pathname.localeCompare(b.pathname))
      .map((b) => ({
        src: b.url,
        pathname: b.pathname,
        caption: captionFromPath(b.pathname),
      }));
    return NextResponse.json({ configured: true, photos }, { headers: NO_STORE });
  } catch {
    return NextResponse.json({ configured: false, photos: [] }, { headers: NO_STORE });
  }
}
