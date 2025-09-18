// pages/index.jsx
export default function Home() {
  return (
    <>
      <style jsx global>{`
        :root { --orange: #ff7a00; --text: #f2f2f2; }
        html, body, #__next { height: 100%; }
        body {
          margin: 0; color: var(--text);
          background:
            radial-gradient(900px 500px at 70% -10%, rgba(255,122,0,0.25), transparent 60%),
            linear-gradient(180deg, #000 0%, #0a0a0a 60%, #000 100%);
          background-color: #000;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
        }
        .wrap { min-height: 100%; display: grid; place-items: center; padding: 4rem 1.5rem; }
        .card {
          max-width: 780px; width: 100%;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 36px;
          background: rgba(255,255,255,0.03); backdrop-filter: blur(6px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        h1 { margin: 0 0 12px; font-size: 42px; letter-spacing: .4px; }
        .brand { color: var(--orange); }
        p { margin: 0 0 16px; line-height: 1.6; }
        .btn {
          display: inline-block; margin-top: 8px; padding: 12px 18px;
          border-radius: 999px; border: 1px solid rgba(255,122,0,0.6);
          background: linear-gradient(90deg, rgba(255,122,0,.9), rgba(255,122,0,.65));
          color: #0b0b0b; font-weight: 700; text-decoration: none;
        }
        .btn:hover { filter: brightness(1.05); }
      `}</style>

      <main className="wrap">
        <section className="card">
          <h1><span className="brand">briyantsoleysigno.com</span></h1>
          <p>It works! 🚀</p>
          <p>Orange + black theme. Clean slate. Ready for your next section.</p>
          <a className="btn" href="https://briyantsoleysigno.com">Visit Home</a>
        </section>
      </main>
    </>
  );
}
