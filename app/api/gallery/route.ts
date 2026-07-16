import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function captionFromPath(pathname: string): string {
  const name = pathname.split("/").pop() || "";
  return name
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^\d+-/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ photos: [] });
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
    return NextResponse.json({ photos });
  } catch {
    return NextResponse.json({ photos: [] });
  }
}
