// /api/roles-revoke.js (super only) — removes admin access
import { adminDb } from "../lib/admin";
import { requireRole } from "../lib/admin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const auth = await requireRole(req, res, ['super']);
  if (!auth?.uid) return;

  const { uid } = req.body || {};
  if (!uid) return res.status(400).json({ ok:false, error:'uid required' });

  await adminDb.doc(`roles/${uid}`).delete();
  return res.status(200).json({ ok:true });
}// /api/roles-assign.js (super only)
import { adminDb } from "../lib/admin";
import { requireRole } from "../lib/admin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const auth = await requireRole(req, res, ['super']);
  if (!auth?.uid) return;

  const { uid, email, role } = req.body || {};
  if (!uid || !email || !['admin','super'].includes(role)) {
    return res.status(400).json({ ok:false, error:'uid, email, role=admin|super required' });
  }

  await adminDb.doc(`roles/${uid}`).set({
    email, role, updatedAt: new Date()
  }, { merge:true });

  return res.status(200).json({ ok:true });
}import { requireRole } from "../lib/admin";

export default async function handler(req, res) {
  const auth = await requireRole(req, res, ['admin','super']);
  if (!auth?.uid) return; // response already sent on fail

  // ... your secure logic here ...
}import { requireRole } from "../lib/admin";

export default async function handler(req, res) {
  const auth = await requireRole(req, res, ['admin','super']);
  if (!auth?.uid) return; // response already sent on fail

  // ... your secure logic here ...
}// lib/admin.js
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: (process.env.FB_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
    }),
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();

export async function requireRole(req, res, allowedRoles = ['admin','super']) {
  try {
    const authHeader = req.headers.authorization || '';
    const idToken = (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null)
      || (req.cookies?.bss_session || null);
    if (!idToken) return res.status(401).json({ ok:false, error:'No token' });

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const roleDoc = await adminDb.doc(`roles/${uid}`).get();
    const role = roleDoc.exists ? roleDoc.data().role : null;

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ ok:false, error:'Insufficient role' });
    }
    return { uid, role, email: decoded.email || null };
  } catch (e) {
    return res.status(401).json({ ok:false, error:'Bad token' });
  }
}npm i firebase-admin// /api/vendor-finalize.js
import nodemailer from "nodemailer";
import twilio from "twilio";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// (Optional) write back to Firestore from server
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

const fbApp = initializeApp({
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
});
const db = getFirestore(fbApp);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, error:"Method not allowed" });
  try {
    const body = req.body || {};
    const incoming = body.data || {};
    const t = (s)=> (s ?? "").toString().trim();

    // Required basics
    const name = t(incoming.name);
    const email = t(incoming.email);
    const phone = t(incoming.phone);
    if (!name || !email || !phone) {
      return res.status(400).json({ ok:false, error:"Name, email, phone required" });
    }

    const vid = t(incoming.vid) || ("VM-" + Math.floor(Math.random()*9999).toString().padStart(4,"0"));
    const ref = `${vid}-${Date.now().toString().slice(-6)}`;

    // Build PDF with logo + orange header
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([612,792]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

    // Logo
    const site = process.env.SITE_URL || "";
    try {
      const logoBytes = await fetch(`${site}/logo.png`).then(r=>r.arrayBuffer());
      const img = await pdf.embedPng(logoBytes);
      const w=160,h=(img.height/img.width)*w;
      page.drawImage(img,{x:(612-w)/2,y:740,width:w,height:h});
    } catch {}

    // Orange header
    page.drawRectangle({ x:0,y:710,width:612,height:25,color:rgb(1,0.4,0) });
    page.drawText("BRIYANT SOLÈY SIGNO 1815 – TI MACHANN REGISTRATION", {
      x:50,y:718,size:12,font:bold,color:rgb(0,0,0)
    });

    // Body
    let y=680, left=50, maxWidth=512, lh=16;
    const write = (txt, size=11, f=font, color=rgb(1,1,1))=>{
      page.drawText(txt, { x:left, y, size, font:f, color }); y -= lh;
    };
    const label = (txt)=> write(txt, 10, bold, rgb(1,0.4,0));
    const line = (lbl,val)=>{ label(lbl); write(val || "-"); y -= 4; };

    line("Reference", ref);
    line("Vendor Name", name);
    line("Company", t(incoming.company));
    line("Email", email);
    line("Phone", phone);
    line("Alt Phone", t(incoming.phone2));
    line("Category / Goods", t(incoming.category));
    line("Vendor ID", vid);
    line("Address", t(incoming.address));
    line("Social / Website", t(incoming.social));
    line("Emergency Contact", t(incoming.emergency));
    line("Tax ID", t(incoming.taxid));
    label("Notes"); 
    write(t(incoming.notes));

    // Footer
    try {
      const logoBytes2 = await fetch(`${site}/logo.png`).then(r=>r.arrayBuffer());
      const img2 = await pdf.embedPng(logoBytes2);
      page.drawImage(img2, { x:50,y:28,width:40,height:40 });
    } catch {}
    page.drawText("Briyant Solèy se yon mountain, yon vision, yon limyè ki pap janm ka etenn.", {
      x:100,y:40,size:9,font,color:rgb(1,0.4,0)
    });

    const pdfBytes = await pdf.save();
    const filename = `BSS_TiMachann_${vid}.pdf`;

    // Email (HTML with logo header)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    const adminTo = process.env.EMAIL_TO || process.env.GMAIL_USER;
    const header = `
      <div style="background:#ff7a00;padding:12px 16px">
        <img src="${site}/logo.png" style="height:36px;vertical-align:middle">
        <span style="font-weight:800;margin-left:10px;color:#000">BRIYANT SOLÈY SIGNO 1815</span>
      </div>`;
    const footer = `
      <div style="padding:12px 16px;border-top:1px solid #333;background:#0a0a0a;color:#bbb;font-size:12px">
        Briyant Solèy se yon mountain, yon vision, yon limyè ki pap janm ka etenn.
      </div>`;
    const infoHtml = `
      ${header}
      <div style="background:#0a0a0a;color:#f5f5f5;padding:16px;font-family:system-ui,Segoe UI,Roboto">
        <h2 style="color:#ff7a00;margin:0 0 12px">Ti Machann Registration — ${name}</h2>
        <pre style="white-space:pre-wrap;font-size:14px;line-height:1.5">
Ref: ${ref}
Vendor: ${name}
Company: ${t(incoming.company) || "-"}
Phone: ${phone}  Alt: ${t(incoming.phone2) || "-"}
Email: ${email}
Category: ${t(incoming.category) || "-"}
Vendor ID: ${vid}
Address: ${t(incoming.address) || "-"}
Social: ${t(incoming.social) || "-"}
Emergency: ${t(incoming.emergency) || "-"}
Tax ID: ${t(incoming.taxid) || "-"}
Notes: ${t(incoming.notes) || "-"}
        </pre>
      </div>
      ${footer}
    `;

    // Send to admins + vendor
    await transporter.sendMail({
      from: `"BSS Vendors" <${process.env.GMAIL_USER}>`,
      to: adminTo,
      subject: `🟠 Ti Machann • ${name} (${vid})`,
      html: infoHtml,
      text: `Vendor: ${name} (${vid})`,
      attachments: [{ filename, content: Buffer.from(pdfBytes) }]
    });
    await transporter.sendMail({
      from: `"BSS Vendors" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Registration Copy — ${vid}`,
      html: infoHtml,
      text: `Vendor: ${name} (${vid})`,
      attachments: [{ filename, content: Buffer.from(pdfBytes) }]
    });

    // Optional: SMS admins when a vendor is finalized (reuses your Twilio env)
    if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN && process.env.TWILIO_FROM && process.env.ADMINS_PHONES){
      const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
      const list = process.env.ADMINS_PHONES.split(",").map(s=>s.trim()).filter(Boolean);
      const msg = `BSS: Vendor finalized — ${name} (${vid}) ${phone}`;
      await Promise.all(list.map(to => client.messages.create({ from:process.env.TWILIO_FROM, to, body: msg })));
    }

    // Write/update Firestore
    const dataToSave = {
      ...incoming,
      vid, ref,
      status: "Finalized",
      finalizedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    let finalId = body.id;
    if (finalId) {
      await setDoc(doc(db, "vendors", finalId), dataToSave, { merge:true });
    } else {
      const docRef = await addDoc(collection(db, "vendors"), dataToSave);
      finalId = docRef.id;
    }

    return res.status(200).json({ ok:true, id: finalId, ref });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok:false, error: e.message });
  }
}await notifyAdminsSMS({ amount, currency, name, email });import twilio from "twilio";

async function notifyAdminsSMS({ amount, currency, name, email }) {
  const sid = process.env.TWILIO_SID;
  const token = process.env.TWILIO_TOKEN;
  const from = process.env.TWILIO_FROM;
  const list = (process.env.ADMINS_PHONES || "").split(",").map(s=>s.trim()).filter(Boolean);
  if (!sid || !token || !from || !list.length) return;

  const client = twilio(sid, token);
  const msg = `BSS 1815: $${amount} ${currency} received — ${name} <${email}>`;
  await Promise.all(list.map(to => client.messages.create({ from, to, body: msg })));
}const amount = (session.amount_total || session.amount || 0) / 100;
const currency = (session.currency || "usd").toUpperCase();
const email = session.customer_details?.email || session.charges?.data?.[0]?.billing_details?.email || "unknown";
const name = session.customer_details?.name || session.charges?.data?.[0]?.billing_details?.name || "unknown";

const receiptPdf = await buildReceiptPDF({ id: session.id, amount, currency, email, name });

await transporter.sendMail({
  from: `"BSS Store" <${process.env.GMAIL_USER}>`,
  to: [email, process.env.EMAIL_TO || process.env.GMAIL_USER].filter(Boolean),
  subject: `Receipt — $${amount} ${currency} — ${name}`,
  html: htmlBody("BSS 1815 Receipt", `Amount: $${amount} ${currency}\nBuyer: ${name} <${email}>`),
  text: `Amount: $${amount} ${currency}\nBuyer: ${name} <${email}>`,
  attachments: [{ filename: `BSS_Receipt_${session.id}.pdf`, content: Buffer.from(receiptPdf) }]
});import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

async function buildReceiptPDF(payment) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612,792]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Logo + header
  const logoUrl = `${process.env.SITE_URL || ""}/logo.png`;
  try {
    const logoBytes = await fetch(logoUrl).then(r => r.arrayBuffer());
    const logoImg = await pdfDoc.embedPng(logoBytes);
    const w=140, h=(logoImg.height/logoImg.width)*w;
    page.drawImage(logoImg, { x:(612-w)/2, y:740, width:w, height:h });
  } catch {}
  page.drawRectangle({ x:0,y:710,width:612,height:25,color:rgb(1,0.4,0) });
  page.drawText("BRIYANT SOLÈY SIGNO 1815 – RECEIPT", { x:50,y:718,size:12,font:fontBold,color:rgb(0,0,0) });

  // Body
  const write = (txt,y)=> page.drawText(txt,{x:50,y,size:11,font,color:rgb(1,1,1)});
  let y = 680;
  write(`Payment ID: ${payment.id}`, y); y-=16;
  write(`Amount: $${payment.amount} ${payment.currency}`, y); y-=16;
  write(`Buyer: ${payment.name} <${payment.email}>`, y); y-=16;
  write(`When: ${new Date().toLocaleString()}`, y); y-=16;
  write(`Notes: ${payment.notes || "-"}`, y); y-=24;
  write(`Thank you for your support.`, y);

  // Footer logo small
  try {
    const logoBytes = await fetch(logoUrl).then(r => r.arrayBuffer());
    const logoImg = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logoImg, { x:50, y:28, width:40, height:40 });
  } catch {}
  page.drawText("Briyant Solèy se yon mountain, yon vision, yon limyè ki pap janm ka etenn.", {
    x:100,y:40,size:9,font:font,color:rgb(1,0.4,0)
  });

  return await pdfDoc.save();
}await transporter.sendMail({
  from: `"BSS Contracts" <${process.env.GMAIL_USER}>`,
  to: adminTo,
  subject,
  text: linesTxt,
  html: htmlBody("New Contract", linesTxt),
  attachments: [{ filename, content: Buffer.from(pdfBytes) }]
});await transporter.sendMail({
  from: `"BSS Contracts" <${process.env.GMAIL_USER}>`,
  to: adminTo,
  subject,
  text: linesTxt,
  html: htmlBody("New Contract", linesTxt),
  attachments: [{ filename, content: Buffer.from(pdfBytes) }]
});const htmlHeader = `
  <div style="background:#ff7a00;padding:12px 16px;">
    <img src="${process.env.SITE_URL || ""}/logo.png" alt="BSS" style="height:36px;vertical-align:middle;">
    <span style="font-weight:800;margin-left:10px;color:#000">BRIYANT SOLÈY SIGNO 1815</span>
  </div>
`;

const htmlFooter = `
  <div style="padding:12px 16px;border-top:1px solid #333;background:#0a0a0a;color:#bbb;font-size:12px;">
    Briyant Solèy se yon mountain, yon vision, yon limyè ki pap janm ka etenn.
  </div>
`;

const htmlBody = (title, lines) => `
  ${htmlHeader}
  <div style="background:#0a0a0a;color:#f5f5f5;padding:16px;font-family:system-ui,Segoe UI,Roboto">
    <h2 style="color:#ff7a00;margin:0 0 12px">${title}</h2>
    <pre style="white-space:pre-wrap;font-size:14px;line-height:1.5">${lines}</pre>
  </div>
  ${htmlFooter}
`;const pdfBytes = await buildContractPDF(req.body);import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

async function buildContractPDF(body) {
  const t = (s)=> (s??"").toString().trim();

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Load logo from your live site
  const logoUrl = `${process.env.SITE_URL || ""}/logo.png`;
  try {
    const logoBytes = await fetch(logoUrl).then(r => r.arrayBuffer());
    const logoImg = await pdfDoc.embedPng(logoBytes);
    const w = 160, h = (logoImg.height / logoImg.width) * w;
    page.drawImage(logoImg, { x: (612 - w)/2, y: 740, width: w, height: h });
  } catch { /* if logo missing, continue */ }

  // Orange header
  page.drawRectangle({ x:0, y:710, width:612, height:25, color: rgb(1,0.4,0) });
  page.drawText("BRIYANT SOLÈY SIGNO 1815 – MUSICIAN AGREEMENT", {
    x:50, y:718, size:12, font:fontBold, color: rgb(0,0,0)
  });

  // writers
  let y = 690, left = 50, maxWidth = 512, lh = 14;
  const write = (txt, bold=false) => {
    const f = bold ? fontBold : font;
    const words = (txt || "").split(" ");
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (f.widthOfTextAtSize(test, 10) > maxWidth) {
        page.drawText(line, { x:left, y, size:10, font:f, color: rgb(1,1,1) }); y -= lh; line = w;
      } else { line = test; }
    }
    if (line) { page.drawText(line, { x:left, y, size:10, font:f, color: rgb(1,1,1) }); y -= lh; }
  };
  const section = (h, v) => { write(h, true); if (v) write(v); y -= 6; };
  const b = body;

  section("Parties",
    `Presenter: ${t(b.presenter_name)} | ${t(b.presenter_email)} | ${t(b.presenter_phone)}\n` +
    `Artist: ${t(b.artist_name)} | ${t(b.artist_email)} | ${t(b.artist_phone)}`
  );
  section("Engagement",
    `Event: ${t(b.event_name)}  Date: ${t(b.event_date)}  Venue: ${t(b.venue)}  Capacity: ${t(b.capacity) || "-"}`);
  section("Schedule",
    `Load-in: ${t(b.loadin) || "-"}  Soundcheck: ${t(b.soundcheck) || "-"}  Performance: ${t(b.performance_window) || "-"}`);
  section("Sets/Breaks",
    `Sets: ${t(b.sets) || "-"}  Breaks: ${t(b.breaks) || "-"}`);
  section("Compensation",
    `Fee: $${t(b.fee)}  Deposit: $${t(b.deposit) || "0"} (due: ${t(b.deposit_due) || "-"})  ` +
    `Balance: ${t(b.balance_due) || "-"}  Method: ${t(b.payment_method)}`);
  section("Tech/Hospitality",
    `Gear: ${t(b.gear) || "-"}\nSound/Light: ${t(b.sound_light) || "-"}\nStage Plot: ${t(b.stage_plot) || "-"}\nHospitality: ${t(b.hospitality) || "-"}`);
  section("Legal",
    `Law: ${t(b.law) || "-"}  Jurisdiction: ${t(b.jurisdiction) || "-"}`);
  section("Signatories",
    `Presenter: ${t(b.presenter_sign_name)}  |  Artist: ${t(b.artist_sign_name)}`);

  // Footer logo + slogan
  try {
    const logoBytes = await fetch(logoUrl).then(r => r.arrayBuffer());
    const logoImg = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logoImg, { x: 50, y: 28, width: 40, height: 40 });
  } catch {}
  page.drawText("Briyant Solèy se yon mountain, yon vision, yon limyè ki pap janm ka etenn.", {
    x: 100, y: 40, size: 9, font, color: rgb(1,0.4,0)
  });

  return await pdfDoc.save();
}// Embed logo + orange header
const logoUrl = "/logo.png";
const logoImageBytes = await fetch(logoUrl).then(r => r.arrayBuffer());
const logoImage = await pdfDoc.embedPng(logoImageBytes);

const pageWidth = 612;
const logoDims = logoImage.scale(0.3);
page.drawImage(logoImage, {
  x: pageWidth/2 - logoDims.width/2,
  y: 740,
  width: logoDims.width,
  height: logoDims.height
});

// Orange header bar
page.drawRectangle({
  x: 0, y: 710, width: pageWidth, height: 25,
  color: rgb(1, 0.4, 0)  // orange
});
page.drawText("BRIYANT SOLÈY SIGNO 1815 – MUSICIAN AGREEMENT", {
  x: 50, y: 718, size: 12, font: fontBold, color: rgb(0,0,0)
});

// Footer logo + slogan
page.drawImage(logoImage, { x: 50, y: 30, width: 40, height: 40 });
page.drawText("Briyant Solèy se yon mountain, yon vision, yon limyè ki pap janm ka etenn.", {
  x: 100, y: 40, size: 9, font: font, color: rgb(1,0.4,0)
});// /api/contract.js
import nodemailer from "nodemailer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, error:"Method not allowed" });

  const required = ["presenter_email","presenter_phone","artist_email","artist_phone","presenter_name","artist_name","event_name","event_date","venue"];
  const missing = required.filter(k => !req.body?.[k]);
  if (missing.length) return res.status(400).json({ ok:false, error:"Missing: "+missing.join(", ") });

  try {
    const t = (s)=> (s??"").toString().trim();
    const b = req.body;

    // 1) Build plain-text body
    const linesArr = [
      "MUSICIAN PERFORMANCE AGREEMENT — Submission",
      "",
      `Presenter: ${t(b.presenter_name)}  |  Email: ${t(b.presenter_email)}  |  Phone: ${t(b.presenter_phone)}`,
      `Artist:    ${t(b.artist_name)}  |  Email: ${t(b.artist_email)}  |  Phone: ${t(b.artist_phone)}`,
      "",
      `Event: ${t(b.event_name)}  |  Date: ${t(b.event_date)}`,
      `Venue: ${t(b.venue)}  |  Capacity: ${t(b.capacity) || "-"}`,
      `Load-in: ${t(b.loadin) || "-"}  |  Soundcheck: ${t(b.soundcheck) || "-"}  |  Perf: ${t(b.performance_window) || "-"}`,
      `Sets: ${t(b.sets) || "-"}  |  Breaks: ${t(b.breaks) || "-"}`,
      "",
      `Fee: $${t(b.fee)}  |  Deposit: $${t(b.deposit) || "0"}  |  Deposit Due: ${t(b.deposit_due) || "-"}`,
      `Balance Due: ${t(b.balance_due) || "-"}`,
      `Payment Method: ${t(b.payment_method)}`,
      "",
      `Gear: ${t(b.gear) || "-"}`,
      `Sound/Light: ${t(b.sound_light) || "-"}`,
      `Stage Plot: ${t(b.stage_plot) || "-"}`,
      `Hospitality: ${t(b.hospitality) || "-"}`,
      "",
      `Governing Law: ${t(b.law) || "-"}`,
      `Jurisdiction: ${t(b.jurisdiction) || "-"}`,
      "",
      `Presenter Signatory: ${t(b.presenter_sign_name)}`,
      `Artist Signatory:    ${t(b.artist_sign_name)}`,
      "",
      `Submitted at: ${new Date().toISOString()}`
    ];
    const linesTxt = linesArr.join("\n");

    // 2) Make a simple, clean PDF (serverless-friendly)
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // Letter
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Header
    const title = "MUSICIAN PERFORMANCE AGREEMENT — BSS 1815";
    page.drawText(title, { x: 50, y: 752, size: 14, font: fontBold, color: rgb(1, 0.48, 0) });

    // Body (wrap lines)
    let y = 730;
    const maxWidth = 512;
    const lineHeight = 14;
    const drawWrapped = (text, bold=false) => {
      const words = text.split(" ");
      let line = "";
      const f = bold ? fontBold : font;
      for (const w of words) {
        const test = line ? line + " " + w : w;
        const width = f.widthOfTextAtSize(test, 10);
        if (width > maxWidth) {
          page.drawText(line, { x: 50, y, size: 10, font: f, color: rgb(1,1,1) });
          y -= lineHeight;
          line = w;
        } else {
          line = test;
        }
      }
      if (line) {
        page.drawText(line, { x: 50, y, size: 10, font: f, color: rgb(1,1,1) });
        y -= lineHeight;
      }
    };

    // Sections
    const section = (label, value) => {
      drawWrapped(label, true);
      if (value) drawWrapped(value, false);
      y -= 6;
    };

    // Dump content
    section("Parties",
      `Presenter: ${t(b.presenter_name)} | ${t(b.presenter_email)} | ${t(b.presenter_phone)}\n` +
      `Artist: ${t(b.artist_name)} | ${t(b.artist_email)} | ${t(b.artist_phone)}`
    );
    section("Engagement",
      `Event: ${t(b.event_name)}  Date: ${t(b.event_date)}  Venue: ${t(b.venue)}  Capacity: ${t(b.capacity) || "-"}`);
    section("Schedule",
      `Load-in: ${t(b.loadin) || "-"}  Soundcheck: ${t(b.soundcheck) || "-"}  Performance: ${t(b.performance_window) || "-"}`);
    section("Sets/Breaks",
      `Sets: ${t(b.sets) || "-"}  Breaks: ${t(b.breaks) || "-"}`);
    section("Compensation",
      `Fee: $${t(b.fee)}  Deposit: $${t(b.deposit) || "0"} (due: ${t(b.deposit_due) || "-"})  ` +
      `Balance: ${t(b.balance_due) || "-"}  Method: ${t(b.payment_method)}`);
    section("Tech/Hospitality",
      `Gear: ${t(b.gear) || "-"}\nSound/Light: ${t(b.sound_light) || "-"}\nStage Plot: ${t(b.stage_plot) || "-"}\nHospitality: ${t(b.hospitality) || "-"}`);
    section("Legal",
      `Law: ${t(b.law) || "-"}  Jurisdiction: ${t(b.jurisdiction) || "-"}`);
    section("Signatories",
      `Presenter: ${t(b.presenter_sign_name)}  |  Artist: ${t(b.artist_sign_name)}`);

    // Footer note
    if (y < 60) { pdfDoc.addPage(); } // avoid clipping
    const pdfBytes = await pdfDoc.save();

    // 3) Email with PDF attached
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    const adminTo = process.env.EMAIL_TO || process.env.GMAIL_USER;
    const filename = `BSS_Musician_Agreement_${t(b.artist_name).replace(/\s+/g,'_')}_${t(b.event_date).replace(/[^\d]/g,'')}.pdf`;

    // to admin
    await transporter.sendMail({
      from: `"BSS Contracts" <${process.env.GMAIL_USER}>`,
      to: adminTo,
      subject: `🟠 New Contract — ${t(b.artist_name)} @ ${t(b.event_name)} (${t(b.event_date)})`,
      text: linesTxt,
      attachments: [{ filename, content: Buffer.from(pdfBytes) }]
    });

    // copies to both parties
    const copyText = "Mèsi! Sa a se kopi kontra ou te soumèt bay BSS 1815.\n\n" + linesTxt;
    await transporter.sendMail({
      from: `"BSS Contracts" <${process.env.GMAIL_USER}>`,
      to: [t(b.presenter_email), t(b.artist_email)].filter(Boolean),
      subject: `Copy — Musician Performance Agreement`,
      text: copyText,
      attachments: [{ filename, content: Buffer.from(pdfBytes) }]
    });

    return res.status(200).json({ ok:true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok:false, error: err.message });
  }
}const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: [
    {
      price: "{{PRICE_ID}}",
      quantity: 1,
    },
  ],
  mode: "payment",
  phone_number_collection: { enabled: true },  // ✅ Require phone
  customer_creation: "always",                 // ✅ Store phone with customer
  success_url: "https://briyantsoleysigno1815.com/success",
  cancel_url: "https://briyantsoleysigno1815.com/cancel",
});// /api/contact.js  (Vercel Serverless Function)
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok:false, error:"Method not allowed" });

  try {
    const { name, email, phone, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok:false, error:"Missing required fields" });
    }

    // transporter using Gmail App Password (not your normal password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,         // e.g. briyantsoleysigno1815@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // 16-char app password
      },
    });

    const adminTo = process.env.EMAIL_TO || process.env.GMAIL_USER;

    // email to you (admin inbox)
    await transporter.sendMail({
      from: `"BSS Website" <${process.env.GMAIL_USER}>`,
      to: adminTo,
      subject: `BSS Fan Message: ${subject || "No subject"}`,
      text: [
        `Name:   ${name}`,
        `Email:  ${email}`,
        `Phone:  ${phone || ""}`,
        `Subject:${subject || ""}`,
        "",
        `${message}`
      ].join("\n"),
    });

    // auto-reply to fan (optional but nice)
    await transporter.sendMail({
      from: `"BSS 1815" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Nou resevwa mesaj ou",
      text: "Mèsi! Briyant Solèy Signo 1815 resevwa mesaj ou. Nou ap pran kontak avè w talè konsa.",
    });

    res.status(200).json({ ok:true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, error: err.message });
  }
}
