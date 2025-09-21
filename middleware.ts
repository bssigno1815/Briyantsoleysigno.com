import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const role = req.cookies.get("role")?.value;

  // block if not admin/superadmin
  if (!session || (role !== "admin" && role !== "superadmin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"], // protect admin routes
};
