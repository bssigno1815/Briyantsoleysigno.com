// components/Navbar.tsx (only show the changed parts)
return (
  <nav className="bg-gradient-to-r from-apricot via-orange to-black px-6 py-3">
    <div className="mx-auto max-w-6xl flex items-center justify-between">
      {/* logo + title stay as-is, title is black on orange header */}
      ...
      <div className="flex items-center gap-3">
        <div className="flex gap-2 text-sm font-semibold">
          {links.map(l=>{
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1 rounded-md border transition ${
                  active
                    ? "bg-black text-orange border-orange"
                    : "text-black border-black hover:bg-black hover:text-orange"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {LANGS.map(({code,label})=>(
            <button key={code} onClick={()=>changeLocale(code)}
              className="px-2 py-1 text-xs rounded-md bg-black text-orange border border-orange">
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  </nav>
);// components/Navbar.tsx
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
