import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Briyant Solèy Signo 1815</title>
        <meta name="description" content="BSS - Sit ofisyèl" />
      </Head>
      <main style={{maxWidth:960, margin:"0 auto", padding:"24px"}}>
        <h1 style={{fontSize:36, fontWeight:800, marginBottom:8}}>
          BRIYANT SOLÈY SIGNO 1815
        </h1>
        <p style={{fontSize:18, marginBottom:24}}>
          Slogan: Yon motè nèf, yon sèl kout klé san bri.
        </p>

        <nav style={{display:"flex", gap:12, flexWrap:"wrap", marginBottom:24}}>
          <a href="/videyo" style={{padding:"10px 16px", border:"1px solid #000", borderRadius:12, textDecoration:"none"}}>Videyo</a>
          <a href="/store" style={{padding:"10px 16px", border:"1px solid #000", borderRadius:12, textDecoration:"none"}}>Store</a>
          <a href="/admin" style={{padding:"10px 16px", border:"1px solid #000", borderRadius:12, textDecoration:"none"}}>Admin</a>
        </nav>

        <section>
          <h2 style={{fontSize:24, marginBottom:8}}>Byenvini</h2>
          <p>
            Sa a se vèsyon minimòm pou nou verifye ke deploy la mache.
            Nou ka ajoute seksyon, galri, ak dokiman apre paj sa a parèt nòmal.
          </p>
        </section>
      </main>
    </>
  )
}
