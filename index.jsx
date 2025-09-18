import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Briyant Soley Signo</title>
        <meta name="description" content="Portfolio & services" />
      </Head>

      <Layout>
        <section className="hero">
          <h1 className="title">
            Design & code in bold <span style={{ color: "var(--orange)" }}>orange</span> on black.
          </h1>
          <p className="subtitle">
            Fast, modern, mobile-first sites with Next.js + Vercel. Clean UI, solid SEO, and easy updates.
          </p>

          <div className="grid">
            <div className="card"><h3>Websites</h3><p>Next.js sites deployed to Vercel.</p></div>
            <div className="card"><h3>Branding</h3><p>Logo, color system, typography.</p></div>
            <div className="card"><h3>UI Components</h3><p>Reusable React components.</p></div>
            <div className="card"><h3>Support</h3><p>DNS, domains, migrations, fixes.</p></div>
          </div>
        </section>
      </Layout>
    </>
  );
}
