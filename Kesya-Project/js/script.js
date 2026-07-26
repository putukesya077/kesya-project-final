/* =========================================================
   KESYA PORTFOLIO — script.js
   Semua logika interaktif website dikumpulkan di sini
   (dipindahkan dari <script> inline agar struktur kode rapi).
   ========================================================= */

document.documentElement.classList.remove("no-js");

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileMenu();
  initPortfolioModal();
  initScrollReveal();
});

/* ================= THEME (DARK / LIGHT MODE) ================= */
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  // Muat tema yang tersimpan. Class yang dipakai HARUS "dark"
  // (bukan "dark-mode") agar sesuai dengan @custom-variant dark
  // (&:where(.dark, .dark *)) di src/input.css.
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (saved === "dark" || (!saved && prefersDark)) {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
  } else {
    toggle.textContent = "🌙";
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggle.textContent = isDark ? "☀️" : "🌙";
  });
}

/* ================= MOBILE MENU ================= */
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
    menuBtn.innerHTML = isOpen ? "☰" : "✕";
  });

  // Tutup menu otomatis saat salah satu link diklik
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.innerHTML = "☰";
    });
  });
}

/* ================= PORTFOLIO MODAL ================= */
function initPortfolioModal() {
  const openBtn = document.getElementById("openPortfolio");
  const closeBtn = document.getElementById("closePortfolio");
  const modal = document.getElementById("portfolioModal");
  if (!modal) return;

  // openBtn opsional (belum tentu ada di setiap halaman/section)
  if (openBtn) {
    openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
    }
  });
}

/* ================= SCROLL REVEAL ANIMATION ================= */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  // Fallback untuk browser lama yang tidak mendukung IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}
