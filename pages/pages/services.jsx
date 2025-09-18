// pages/services.jsx
import Head from "next/head";
import Layout from "../components/Layout";

export default function Services() {
  return (
    <>
      <Head><title>Services – briyantsoleysigno.com</title></Head>
      <Layout>
        <h1 className="title">Services</h1>
        <div className="grid">
          <div className="card"><h3>Web Dev</h3><p>Next.js, React, API integration, hosting.</p></div>
          <div className="card"><h3>Branding</h3><p>Logo, palette, type, assets.</p></div>
          <div className="card"><h3>Maintenance</h3><p>Bug fixes, updates, domain/DNS help.</p></div>
        </div>
      </Layout>
    </>
  );
}
