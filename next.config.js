// pages/index.js
export default function Home() {
  return (
    <>
      <main className="wrap">
        <div className="tag">briyantsoleysigno.com</div>

        <h1>We’re Building Something Bold</h1>
        <p className="sub">
          Black ⚫️ + Orange 🍊 — coming soon.
        </p>

        <a className="cta" href="mailto:hello@briyantsoleysigno.com">Contact</a>
      </main>

      <style jsx>{`
        html, body, #__next { height: 100%; }

        .wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          /* Black background with an orange fade */
          background:
            radial-gradient(60rem 60rem at 70% 85%, rgba(255,106,0,0.18), transparent 40%),
            radial-gradient(40rem 40rem at 20% 20%, rgba(255,106,0,0.25), transparent 35%),
            linear-gradient(135deg, #000 35%, #1a0f06 70%, #ff6a00 140%);
        }

        .tag {
          letter-spacing: .14em;
          text-transform: uppercase;
          opacity: .8;
          font-size: .85rem;
          margin-bottom: 0.75rem;
        }

        h1 {
          margin: 0.4rem 0;
          font-weight: 800;
          color: #ff6a00; /* orange headline */
          font-size: clamp(2rem, 6vw, 4.25rem);
          line-height: 1.05;
          text-shadow: 0 2px 18px rgba(255,106,0,.25);
        }

        .sub {
          max-width: 34rem;
          margin: 0.5rem auto 1.25rem;
          font-size: clamp(1rem, 2.6vw, 1.2rem);
          color: #eaeaea;
          opacity: .9;
        }

        .cta {
          display: inline-block;
          padding: 0.85rem 1.25rem;
          border-radius: 999px;
          font-weight: 700;
          background: #ff6a00;
          color: #000; /* black text on orange button */
          text-decoration: none;
          box-shadow: 0 10px 24px rgba(255,106,0,.25);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 16px 30px rgba(255,106,0,.35); }
      `}</style>
    </>
  );
    }
