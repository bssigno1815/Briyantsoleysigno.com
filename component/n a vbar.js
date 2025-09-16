import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { href: "/", label: "Akèy" },
  { href: "/videyo", label: "Videyo" },
  { href: "/store", label: "Store" },
  { href: "/dokiman", label: "Dokiman" }
];

export default function NavBar() {
  const { pathname } = useRouter();

  return (
    <header style={{
      width: "100%",
      borderBottom: "1px solid rgba(255,165,0,0.3)",
      position: "sticky",
      top: 0,
      background: "#000",
      zIndex: 50
    }}>
      <nav style={{
        maxWidth: 1100, margin: "0 auto", padding: "12px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ fontWeight: 800, letterSpacing: 0.5 }}>
          {process.env.BRAND_NAME || "Briyant Solèy Signo 1815"}
        </div>
        <ul style={{ display: "flex", gap: 16, listStyle: "none" }}>
          {navItems.map(item => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href} style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: active ? "1px solid #FFA500" : "1px solid transparent",
                  opacity: active ? 1 : 0.9
                }}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
