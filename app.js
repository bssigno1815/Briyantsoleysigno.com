// Simple i18n content (Black & Orange UI only)
const copy = {
  ht: {
    "menu.dirijan": "DIRIJAN",
    "menu.fanbase": "FANBASE",
    "menu.dosye":   "DOSYE",
    "menu.kontak":  "KONTAK",
    slogan: "Yon motè nèf, yon sèl kout kle san bri.",
    cta: "Antre nan dosye yo",
    "sections.dirijan.title": "DIRIJAN",
    "sections.dirijan.body": "Lidèchip ki mache dous tankou motè nèf.",
    "sections.fanbase.title": "FANBASE",
    "sections.fanbase.body": "Kominote a se gaz la — nou kenbe mouvman an.",
    "sections.dosye.title": "DOSYE",
    "sections.dosye.body": "Tout materyèl, mizik, videyo ak istwa yo ranje isit la.",
    "sections.kontak.title": "KONTAK",
    "sections.kontak.body": "Ekri nou pou rezèvasyon, kolaborasyon, oswa kesyon."
  },
  fr: {
    "menu.dirijan": "DIRECTION",
    "menu.fanbase": "FANBASE",
    "menu.dosye":   "DOSSIERS",
    "menu.kontak":  "CONTACT",
    slogan: "Un moteur neuf, un seul tour de clé, sans bruit.",
    cta: "Entrer dans les dossiers",
    "sections.dirijan.title": "DIRECTION",
    "sections.dirijan.body": "Un leadership fluide comme un moteur neuf.",
    "sections.fanbase.title": "FANBASE",
    "sections.fanbase.body": "La communauté est notre carburant — on avance ensemble.",
    "sections.dosye.title": "DOSSIERS",
    "sections.dosye.body": "Tous les contenus, musiques, vidéos et histoires sont ici.",
    "sections.kontak.title": "CONTACT",
    "sections.kontak.body": "Écrivez-nous pour les réservations, collaborations ou questions."
  },
  en: {
    "menu.dirijan": "LEADERS",
    "menu.fanbase": "FANBASE",
    "menu.dosye":   "FILES",
    "menu.kontak":  "CONTACT",
    slogan: "A brand-new engine — one turn of the key, whisper-quiet.",
    cta: "Enter the files",
    "sections.dirijan.title": "LEADERS",
    "sections.dirijan.body": "Leadership that runs smooth like a new engine.",
    "sections.fanbase.title": "FANBASE",
    "sections.fanbase.body": "The community is the fuel — we keep the motion.",
    "sections.dosye.title": "FILES",
    "sections.dosye.body": "All materials, music, videos, and stories live here.",
    "sections.kontak.title": "CONTACT",
    "sections.kontak.body": "Reach out for bookings, collabs, or questions."
  }
};

function setLang(lang) {
  const dict = copy[lang] || copy.ht;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = lang === "en" ? "en" : lang;
  document.querySelectorAll(".lang").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
}

// Hook up language buttons
document.addEventListener("click", e => {
  const btn = e.target.closest(".lang");
  if (btn) setLang(btn.dataset.lang);
});

// Default language: Kreyòl
setLang("ht");
