import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        {children}
      </main>
      <footer style={{
        borderTop: "1px solid rgba(255,165,0,0.3)",
        padding: "16px",
        textAlign: "center",
        opacity: 0.8
      }}>
        © {new Date().getFullYear()} {process.env.BRAND_NAME || "Briyant Solèy Signo 1815"}
      </footer>
    </div>
  );
}
