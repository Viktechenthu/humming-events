import { del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
  }
  const { url } = await req.json().catch(() => ({ url: "" }));
  if (typeof url !== "string" || !url.includes("/gallery/")) {
    return NextResponse.json({ ok: false, error: "Invalid photo URL" }, { status: 400 });
  }
  await del(url);
  return NextResponse.json({ ok: true });
}
