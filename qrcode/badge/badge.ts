import QRCode from "qrcode";
import { renderBadgePNG } from "@/lib/badge";

const qrDataUrl = await QRCode.toDataURL(`https://www.briyantssoleysigno.com/vendor/${saved.id}`);
const png = await renderBadgePNG({ name: tx.vendorName, vendorId: saved.id, qrUrl: qrDataUrl });
// store PNG to storage (e.g. Firebase Storage / Vercel Blob) and keep the URL on the record
