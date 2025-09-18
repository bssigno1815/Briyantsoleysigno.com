export default function Home() {
  return (
    <main style={{ fontFamily:'system-ui', lineHeight:1.5 }}>
      <section style={{
        padding:'64px 0', textAlign:'center',
        background:'linear-gradient(90deg,#111,#333)', color:'#fff'
      }}>
        <h1 style={{ fontSize:44, margin:0 }}>Briyant Solèy Signo</h1>
        <p style={{ opacity:.9, marginTop:12 }}>
          Creative portfolio & contact hub.
        </p>
        <a href="/contact" style={{
          display:'inline-block', marginTop:24, padding:'10px 18px',
          borderRadius:8, background:'#fff', color:'#111', textDecoration:'none'
        }}>
          Get in touch
        </a>
      </section>

      <section style={{ maxWidth:960, margin:'40px auto', padding:'0 20px' }}>
        <h2 style={{ margin:'0 0 12px' }}>Recent Highlights</h2>
        <div style={{
          display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'
        }}>
          {[
            ['Design Systems', 'Reusable components & clean UX'],
            ['Brand & Identity', 'Logos, palettes, typography'],
            ['Web Projects', 'Fast, accessible, SEO-ready'],
          ].map(([title,desc]) => (
            <article key={title} style={{ border:'1px solid #eee', borderRadius:12, padding:16 }}>
              <h3 style={{ margin:'0 0 6px', fontSize:18 }}>{title}</h3>
              <p style={{ margin:0, color:'#555' }}>{desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
