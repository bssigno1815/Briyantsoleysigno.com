import { jwtVerify } from "jose";
const secret = new TextEncoder().encode(process.env.SESSION_SECRET!);

export async function requireAdmin(cookieValue?: string) {
  if (!cookieValue) return false;
  try {
    const { payload } = await jwtVerify(cookieValue, secret);
    return payload?.role === "admin";
  } catch {
    return false;
  }
}
