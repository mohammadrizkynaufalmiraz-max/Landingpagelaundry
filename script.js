// Ganti dengan nomor WhatsApp bisnis Anda (format internasional, tanpa + atau 0 di depan)
const WA_NUMBER = "6281234567890";

const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

// Menu mobile
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Gelembung sabun di hero
const bubbles = document.querySelector(".bubbles");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  for (let i = 0; i < 18; i++) {
    const b = document.createElement("span");
    const size = 16 + Math.random() * 54;
    b.className = "bubble";
    b.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${9 + Math.random() * 12}s;animation-delay:${-Math.random() * 15}s`;
    bubbles.appendChild(b);
  }
}

// Kalkulator harga
const kg = document.getElementById("kg");
const kgOut = document.getElementById("kgOut");
const total = document.getElementById("total");
const promo = document.getElementById("promo");

function hitung() {
  const berat = Number(kg.value);
  const tarif = Number(document.querySelector('input[name="tipe"]:checked').value);
  let harga = berat * tarif;
  kgOut.textContent = berat;
  if (berat >= 10) {
    harga *= 0.9;
    promo.textContent = "Diskon 10% sudah termasuk untuk cucian 10 kg atau lebih.";
  } else {
    promo.textContent = "Cuci 10 kg atau lebih, dapat diskon 10%.";
  }
  total.textContent = rupiah(Math.round(harga));
}
kg.addEventListener("input", hitung);
document.querySelectorAll('input[name="tipe"]').forEach((r) => r.addEventListener("change", hitung));
hitung();

// Form pesan -> WhatsApp
document.getElementById("pesan").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const pesan = `Halo Busa Biru Laundry, saya ingin pesan jemput.\nNama: ${f.get("nama")}\nAlamat: ${f.get("alamat")}\nLayanan: ${f.get("layanan")}`;
  window.open(waLink(pesan), "_blank", "noopener");
});

// Tombol WhatsApp melayang
document.getElementById("waFloat").href = waLink("Halo Busa Biru Laundry, saya mau tanya layanan.");
