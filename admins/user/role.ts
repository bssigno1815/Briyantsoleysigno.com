// lib/auth.ts
export function requireAdmin(user: { role?: string }) {
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    throw new Error("Unauthorized");
  }
}
export function canRemoveAdmin(actor: { role?: string }) {
  return actor?.role === "superadmin";
}
