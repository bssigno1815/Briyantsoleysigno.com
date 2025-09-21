// lib/badge.ts
import { createCanvas, loadImage } from "canvas"; // add dependency 'canvas'
export async function renderBadgePNG({ name, vendorId, qrUrl }:{
  name:string, vendorId:string, qrUrl:string
}) {
  const w=640, h=400;
  const c = createCanvas(w,h);
  const ctx = c.getContext("2d");
  // background
  ctx.fillStyle = "#000"; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle = "orange"; ctx.lineWidth = 4; ctx.strokeRect(8,8,w-16,h-16);
  // logo (optional, ensure orange/black asset)
  // const logo = await loadImage("/public/bss_logo_orange.png"); ctx.drawImage(logo, 24, 20, 120, 120);

  // text
  ctx.fillStyle = "orange";
  ctx.font = "bold 36px Inter, Arial";
  ctx.fillText("BSS • VENDOR", 170, 60);
  ctx.font = "28px Inter, Arial";
  ctx.fillText(name.toUpperCase(), 170, 110);
  ctx.font = "20px Inter, Arial";
  ctx.fillText(`ID: ${vendorId}`, 170, 150);

  // QR
  // pre-generate a QR image URL with any lib/server route:
  const qr = await loadImage(qrUrl);
  ctx.drawImage(qr, w-180, h-180, 150, 150);

  return c.toBuffer("image/png");
}
