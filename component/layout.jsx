// components/Layout.jsx
export default function Layout({ children }) {
  return (
    <main className="container">
      <nav className="nav">
        <a className="brand" href="/">
          briyantsoleysigno<span style={{ color: "var(--orange)" }}>.com</span>
        </a>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a className="btn" href="/contact">Contact</a>
        </div>
      </nav>
      {children}
      <p className="footer">© {new Date().getFullYear()} Briyant Soley Signo</p>
    </main>
  );
}
