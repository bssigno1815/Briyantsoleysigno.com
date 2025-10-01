import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isAdminArea = req.nextUrl.pathname.startsWith("/admin");
  if (!isAdminArea) return NextResponse.next();

  const hasCookie = req.cookies.get("bss_admin");
  if (!hasCookie) {
    const url = new URL("/admin/login", req.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
