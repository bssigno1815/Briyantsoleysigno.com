// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-amber-500 text-white px-6 py-3 shadow-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          BSS 1815
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/istwa">Istwa</Link>
          <Link href="/dirijan">Dirijan</Link>
          <Link href="/fanatik">Fanatik</Link>
          <Link href="/admin/comments">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
