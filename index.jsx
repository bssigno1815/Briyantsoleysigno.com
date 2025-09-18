import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>briyantsoleysigno.com</title>
        <meta name="description" content="Bold orange on black. Next.js + Vercel." />
      </Head>

      <div className="wrap">
        <header className="nav">
          <a className="brand" href="#">
            briyantsoleysigno<span>.com</span>
          </a>
          <nav>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a className="btn" href="#contact">Contact</a>
          </nav>
        </header>

        <section className="hero">
          <h1 className="title">
            Bold work in <span className="orange">orange</span> on black.
          </h1>
          <p className="subtitle">
            Fast, modern, mobile-first websites with Next.js + Vercel. Clean UI, solid SEO, easy updates.
          </p>
        </section>

        <section id="about">
          <h2 className="sectionTitle">About</h2>
          <p className="subtitle">
            I build sleek, performant sites with a strong orange/black identity. Focused on speed,
            accessibility, and clean design.
          </p>
        </section>

        <section id="services">
          <h2 className="sectionTitle">Services</h2>
          <div className="grid">
            <div className="card"><h3>Web Dev</h3><p>Next.js, React, APIs, hosting.</p></div>
            <div className="card"><h3>Branding</h3><p>Logo, palette, typography.</p></div>
            <div className="card"><h3>UI Components</h3><p>Reusable, accessible components.</p></div>
            <div className="card"><h3>Support</h3><p>DNS, domains, migrations, fixes.</p></div>
          </div>
        </section>

        <section id="contact">
          <h2 className="sectionTitle">Contact</h2>
          <p className="subtitle">
            Email: <a href="mailto:hello@briyantsoleysigno.com">hello@briyantsoleysigno.com</a>
          </p>
          <a className="btn" href="mailto:hello@briyantsoleysigno.com">Email Me</a>
        </section>

        <footer className="footer">© {new Date().getFullYear()} Briyant Soley Signo</footer>
      </div>

      <style jsx global>{`
        :root {
          --orange: #ff7a00;
          --text: #f2f2f2;
        }
        html, body, #__next { height: 100%; }
        body {
          margin: 0;
          color: var(--text);
          background:
            radial-gradient(900px 500px at 70% -10%, rgba(255,122,0,0.25), transparent 60%),
            linear-gradient(180deg, #000 0%, #0a0a0a 60%, #000 100%);
          background-color: #000; /* solid base if gradients fail */
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
        }
        a { color: var(--text); text-decoration: none; opacity: 0.9; }
        a:hover { opacity: 1; }
        .wrap { max-width: 1100px; margin: 0 auto; padding: 24px; }
        .nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .brand { font-weight: 800; letter-spacing: .4px; }
        .brand span { color: var(--orange); }
        .nav a { margin-left: 16px; }
        .btn { background: var(--orange); color: #111; padding: 8px 14px; border-radius: 12px; font-weight: 700; }
        .hero { padding: 80px 0 40px; }
        .title { font-size: clamp(34px, 6vw, 64px); line-height: 1.1; margin: 0 0 12px; }
        .orange { color: var(--orange); }
        .subtitle { opacity: .85; max-width: 65ch; }
        .sectionTitle { font-size: 28px; margin: 40px 0 12px; color: var(--orange); }
        .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
        .card { background: #0f0f0f; border: 1px solid #1f1f1f; border-radius: 16px; padding: 16px; }
        .card h3 { margin: 0 0 6px; color: var(--orange); }
        .footer { opacity: .7; padding: 40px 0; font-size: 14px; }
      `}</style>
    </>
  );
}
