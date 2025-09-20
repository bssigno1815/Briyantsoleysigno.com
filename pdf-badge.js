window.bssPDF = (function(){
  // Simple client-side PDF using jsPDF (embed via CDN, or use dynamic import)
  async function ensureJSPDF(){
    if(!window.jspdf){
      const s = document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
      await new Promise(r=>{ s.onload=r; document.head.appendChild(s); });
    }
  }
  async function generateVendorPDF(v){
    await ensureJSPDF();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({unit:'pt', format:'a4'});
    doc.setFillColor(11,11,12);
    doc.rect(0,0,595,842,'F');

    // Title
    doc.setTextColor(255,122,0);
    doc.setFont('helvetica','bold'); doc.setFontSize(20);
    doc.text('BRIYANT SOLEY SIGNO 1815 • VENDOR REGISTRATION', 40, 60);

    doc.setTextColor(240); doc.setFontSize(12);
    const lines = [
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone}`,
      `Alt Phone: ${v.phone2||''}`,
      `Category: ${v.category||''}`,
      `Company: ${v.company||''}`,
      `Address: ${v.address||''}`,
      `Social: ${v.social||''}`,
      `Emergency: ${v.emergency||''}`,
      `Notes: ${v.notes||''}`,
      `Vendor ID: ${v.id}`
    ];
    let y=100;
    lines.forEach(t=>{ doc.text(t,40,y); y+=20; });

    // Orange divider
    doc.setDrawColor(255,122,0); doc.line(40, y+10, 555, y+10);

    doc.save(`BSS1815-Vendor-${(v.name||'unknown').replace(/\s+/g,'_')}.pdf`);
  }

  // Badge download (PNG) from the preview
  async function downloadBadgePNG(){
    const el = document.getElementById('badge');
    const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
    const canvas = await html2canvas.default(el,{backgroundColor:null, scale:2});
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href=url; a.download='BSS1815-Badge.png'; a.click();
  }

  document.getElementById('downloadBadgeBtn')?.addEventListener('click', downloadBadgePNG);

  return { generateVendorPDF };
})();
