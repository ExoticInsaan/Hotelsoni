// Demo number: replace with the hotel's real WhatsApp number (country code, no + or spaces).
const WHATSAPP = "910000000000";

const form = document.getElementById("book");
const today = new Date().toISOString().slice(0, 10);
form.in.min = form.out.min = today;
form.in.addEventListener("change", () => { form.out.min = form.in.value || today; });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = `Hello Hotel Soni, I would like to check room availability.\nCheck-in: ${form.in.value}\nCheck-out: ${form.out.value}\nGuests: ${form.guests.value}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
});

// "Book this room" buttons open WhatsApp with the room name filled in.
document.querySelectorAll("[data-room]").forEach((a) => {
  const msg = `Hello Hotel Soni, I would like to book the ${a.dataset.room}.`;
  a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  a.target = "_blank"; a.rel = "noopener";
});

// Any button with data-msg opens WhatsApp with that message.
document.querySelectorAll("[data-msg]").forEach((a) => {
  a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(a.dataset.msg)}`;
  a.target = "_blank"; a.rel = "noopener";
});

// Map loads only when asked, so the page stays fast.
document.getElementById("showMap").addEventListener("click", () => {
  const f = document.createElement("iframe");
  f.src = "https://www.google.com/maps?q=Soni+Hotel+G8WR%2BC9X+Rajoli+Rajasthan&output=embed";
  f.title = "Map showing Hotel Soni in Rajoli"; f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade";
  document.getElementById("map").replaceChildren(f);
});

// Photo viewer.
const shots = [...document.querySelectorAll(".gallery .g")];
const dlg = document.getElementById("lightbox");
const big = dlg.querySelector("img"), cap = dlg.querySelector("figcaption");
let cur = 0;
function show(i) {
  cur = (i + shots.length) % shots.length;
  const im = shots[cur].querySelector("img");
  big.src = im.currentSrc || im.src; big.alt = im.alt; cap.textContent = im.alt;
}
shots.forEach((b, i) => b.addEventListener("click", () => { show(i); dlg.showModal(); }));
dlg.querySelector(".lb-prev").addEventListener("click", () => show(cur - 1));
dlg.querySelector(".lb-next").addEventListener("click", () => show(cur + 1));
dlg.querySelector(".lb-close").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
document.addEventListener("keydown", (e) => {
  if (!dlg.open) return;
  if (e.key === "ArrowRight") show(cur + 1);
  if (e.key === "ArrowLeft") show(cur - 1);
});
