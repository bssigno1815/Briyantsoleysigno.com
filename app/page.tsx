export default function Page() {
  return (
    <main>
      <h1 style={{fontSize:36, fontWeight:800, marginBottom:8}}>BRIYANT SOLÈY SIGNO 1815</h1>
      <p style={{fontSize:18, marginBottom:24}}>Slogan: Yon motè nèf, yon sèl kout klé san bri.</p>
      <nav style={{display:"flex", gap:12, flexWrap:"wrap", marginBottom:24}}>
        <a href="/videyo" style={{padding:"10px 16px", border:"1px solid #000", borderRadius:12, textDecoration:"none"}}>Videyo</a>
        <a href="/store" style={{padding:"10px 16px", border:"1px solid #000", borderRadius:12, textDecoration:"none"}}>Store</a>
        <a href="/admin" style={{padding:"10px 16px", border:"1px solid #000", borderRadius:12, textDecoration:"none"}}>Admin</a>
      </nav>
      <p>Sa a se vèsyon minimòm pou konfime deploy la ap mache.</p>
    </main>
  )
}
