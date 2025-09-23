"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const LANGS = [
  { code: "ht", label: "Kreyòl" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const parts = pathname.split("/");
  const locale = parts[1] || "ht";
  const links = [
    { href: `/${locale}/istwa`, label: "Istwa" },
    { href: `/${locale}/dirijan`, label: "Dirijan" },
    { href: `/${locale}/fanatik`, label: "Fanatik" },
    { href: `/${locale}/admin/comments`, label: "Admin" },
  ];
  function changeLocale(code: string){ const p=[...parts]; p[1]=code; router.push(p.join("/")||"/"); }

  return (
    <nav className="bg-orange px-6 py-3">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/logo-bss.png" alt="BSS" width={36} height={36}
            className="rounded-full border-2 border-black" />
          <span className="text-xl font-bold text-black">BSS 1815</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex gap-2 text-sm font-semibold">
            {links.map(l=>{
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href}
                  className={`px-3 py-1 rounded-md border ${
                    active ? "bg-black text-orange border-orange"
                           : "text-black border-black hover:bg-black hover:text-orange"
                  }`}>
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
  );
}"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const LANGS = [
  { code: "ht", label: "Kreyòl" },
  { code: "fr", label: "Français" },
  { code: "en", label: "English" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const parts = pathname.split("/");
  const locale = parts[1] || "ht";

  const links = [
    { href: `/${locale}/istwa`, label: "Istwa" },
    { href: `/${locale}/dirijan`, label: "Dirijan" },
    { href: `/${locale}/fanatik`, label: "Fanatik" },
    { href: `/${locale}/admin/comments`, label: "Admin" },
  ];

  function changeLocale(code: string) {
    const p = [...parts]; p[1] = code;
    router.push(p.join("/") || "/");
  }

  return (
    <nav className="bg-amber-500 px-6 py-3 shadow-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/logo-bss.png" alt="BSS Logo" width={36} height={36}
            className="rounded-full border-2 border-black" />
          <span className="text-xl font-bold tracking-tight text-black">BSS 1815</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-sm font-medium">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}
                  className={`px-3 py-1 rounded-lg transition ${
                    isActive ? "bg-black text-amber-500" : "text-white hover:text-black hover:bg-amber-600"
                  }`}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {LANGS.map(({code,label})=>(
              <button key={code} onClick={()=>changeLocale(code)}
                className="px-2 py-1 text-xs rounded-md bg-black text-amber-500 hover:opacity-85">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
