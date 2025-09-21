// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes: allow through
  const publicRoutes = [
    "/", "/login", "/api/public", "/favicon.ico", "/_next", "/assets",
  ];
  if (publicRoutes.some((p) => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Admin protection (edge-safe: cookie presence only)
  const session = req.cookies.get("session")?.value;
  const role = req.cookies.get("role")?.value;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!session || (role !== "admin" && role !== "superadmin")) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};
