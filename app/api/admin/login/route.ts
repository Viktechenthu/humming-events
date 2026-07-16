import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, isAdmin, passwordMatches } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ loggedIn: await isAdmin() });
}

export async function POST(req: NextRequest) {
  const token = adminToken();
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Admin login is not configured (ADMIN_PASSWORD missing)" },
      { status: 503 }
    );
  }
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!passwordMatches(String(password ?? ""))) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
