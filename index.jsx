import Head from "next/head";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>briyantsoleysigno.com</title>
        <meta name="description" content="Portfolio — orange & black theme, built with Next.js on Vercel." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="container">
        <section className="hero">
          <h1 className="title">Design & Dev that pops 🍊</h1>
          <p className="subtitle">
            Sleek black background with an orange glow. Fast, responsive, and deployed on Vercel.
          </p>
          <div>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </section>

        <section id="services" className="card-grid">
          <div className="card">
            <h3>Web Design</h3>
            <p>Modern layouts, bold color, clean typography.</p>
          </div>
          <div className="card">
            <h3>Development</h3>
            <p>Next.js, APIs, and smooth deployments.</p>
          </div>
          <div className="card">
            <h3>Optimization</h3>
            <p>Speed, SEO, and accessibility best practices.</p>
          </div>
        </section>

        <section id="work" style={{marginTop: 48}}>
          <h2 className="sectionTitle">Recent Work</h2>
          <div className="card-grid">
            <div className="card"><h3>Project A</h3><p>Coming soon.</p></div>
            <div className="card"><h3>Project B</h3><p>Coming soon.</p></div>
          </div>
        </section>

        <section id="contact" style={{marginTop: 48}}>
          <h2 className="sectionTitle">Contact</h2>
          <p className="subtitle">Email: <a href="mailto:hello@briyantsoleysigno.com">hello@briyantsoleysigno.com</a></p>
        </section>

        <footer>© {new Date().getFullYear()} briyantsoleysigno.com</footer>
      </main>
    </>
  );
}
