# Catatan Perbaikan Website (Kesya Portfolio)



## 1. Bug HTML/Struktur

- **Section Projects tidak pernah ditutup** — ada `<section>` bersarang di dalam
  `<section id="projects">` yang membuat section Projects tidak pernah benar-benar
  ditutup (sisa halaman jadi ikut "terjebak" di dalamnya secara struktur). Diperbaiki
  dengan mengubah section dalam menjadi `<div>` dan menambahkan penutup yang benar.
- **1 `<div>` navbar tidak pernah ditutup** sejak awal (div pembungkus baris
  logo+menu). Sudah ditambahkan penutupnya.
- **`id="menu-btn"` dobel** (dua tombol pakai ID yang sama — tidak valid di HTML
  dan bikin JavaScript hanya mengenali tombol pertama). Sudah dihapus salah satu
  duplikatnya.
- **Atribut class rusak**: `mt-12""` (ada tanda kutip ganda nyasar) diperbaiki
  menjadi `mt-12"`.
- **Karakter `>` nyasar** di akhir paragraf hero ("...functionality.>") dihapus.

## 2. Bug Fungsional (JavaScript)

- **Tombol hamburger menu (mobile) sama sekali tidak berfungsi** — tidak ada
  elemen menu mobile dan tidak ada kode JS untuk membukanya. Sekarang sudah
  dibuatkan panel menu mobile + JavaScript untuk toggle buka/tutup, lengkap
  dengan auto-close saat salah satu link diklik.
- **Dark mode tidak pernah aktif** — tombol toggle menambahkan class
  `dark-mode` ke `<body>`, padahal konfigurasi Tailwind (`@custom-variant dark`)
  di `src/input.css` mengecek class `dark`. Akibatnya semua utility `dark:...`
  di HTML tidak pernah ter-aktivasi walau tombol di-klik. Sudah diperbaiki agar
  konsisten memakai class `dark` di JavaScript maupun CSS.
- **Modal portofolio berpotensi error** — script mencari tombol dengan
  `id="openPortfolio"` yang ternyata tidak ada di halaman manapun, sehingga
  akan langsung error di console saat halaman dibuka. Sudah diberi pengecekan
  (`if (openBtn) ...`) agar aman.

## 3. Bug Konten (data tidak konsisten)

- Link email di bagian Contact mengarah ke **email placeholder**
  `kesya@example.com`, padahal teks yang ditampilkan dan footer memakai email
  asli `putukesya077@gmail.com`. Sudah disamakan.
- Link Instagram di bagian Contact mengarah ke **`instagram.com/yourusername`**
  (placeholder bawaan), padahal username asli adalah `kesyaaspt` (sudah dipakai
  di teks & footer). Sudah disamakan.
- Nomor WhatsApp di bagian Contact (`6281234567890`) **tidak sama** dengan
  nomor yang ditampilkan (+62 896-0269-6730) maupun nomor di footer
  (`6289602696730`). Sudah disamakan ke nomor yang benar.

## 4. Link & Path

- `href="/case-study.html"`, `href="/dashboard-case-study.html"`, dan
  `href="/"` memakai **path absolut dari root domain** — ini akan rusak kalau
  situs dibuka langsung dari file lokal atau di-hosting bukan di root domain
  (misalnya GitHub Pages project page). Sudah diganti ke path relatif
  (`./case-study.html`, dst).
- Semua link `target="_blank"` (WhatsApp, Instagram, dll) ditambahkan
  `rel="noopener noreferrer"` — praktik keamanan standar agar halaman yang
  dibuka tidak bisa mengakses window asal.

## 5. Gambar & Aset

- **`profile.jpg.JPG` (7.6 MB, 4000×6000px)** dikompres & di-resize menjadi
  **`profile.jpg` (±141 KB, 900px)** tanpa mengubah tampilan — supaya halaman
  jauh lebih cepat dimuat. Semua referensi di HTML sudah diperbarui.
- Favicon ditambahkan (sebelumnya tab browser kosong/tanpa ikon).

### ⚠️ Gambar project yang masih perlu Anda ganti sendiri (sesuai permintaan Anda):
- `images/projects/website.png` → saat ini isinya bukan gambar, melainkan
  teks path Windows (`c:\Users\putuk\...`). Kemungkinan salah save/export.
- `images/projects/dashboard.png` → file kosong (0 byte).
- `images/projects/calculator.png` → dipakai di HTML tapi filenya **tidak ada**
  sama sekali di folder.
- `images/projects/dashboard-cover.png` (dipakai di `dashboard-case-study.html`)
  → filenya juga **tidak ada**.

Silakan upload ulang keempat gambar ini ke folder `images/projects/` dengan
nama file yang sama persis.

## 6. Tailwind CSS v4 — PENTING, perlu Anda jalankan sendiri

Proyek ini pakai **Tailwind v4** dengan cara build lewat CLI
(`@tailwindcss/cli`), hasilnya disimpan di `css/style.css`. Yang terjadi:
`src/input.css` sudah diubah (menambahkan dark mode, warna custom, dll) tapi
`css/style.css` **tidak pernah di-build ulang**, jadi banyak style dark mode
hilang dari file hasil build.

Saya tidak bisa menjalankan proses build ini di sandbox saya karena:
- `node_modules` di proyek Anda hanya berisi binary native untuk **Windows**
  (`@tailwindcss/oxide-win32-x64-msvc`), sedangkan sandbox saya berjalan di
  Linux, dan
- sandbox saya tidak punya akses internet untuk mengunduh binary yang sesuai.

**Yang sudah saya lakukan sebagai solusi sementara:** saya menambahkan secara
manual CSS dark mode yang hilang langsung ke `css/style.css` (lihat bagian
"PATCH MANUAL" di akhir file), jadi dark mode sudah berfungsi normal.

**Yang perlu Anda lakukan di komputer sendiri (opsional tapi disarankan)**
supaya `css/style.css` benar-benar ter-generate ulang secara bersih:
```bash
npm install
npx @tailwindcss/cli -i ./src/input.css -o ./css/style.css --minify
```
Setelah itu, blok "PATCH MANUAL" di akhir `css/style.css` boleh dihapus karena
akan otomatis digantikan hasil build yang benar.

## 7. Lain-lain

- `tailwind.config.js` punya comment JSDoc yang rusak sintaksnya (sudah
  diperbaiki), dan sebenarnya **file ini tidak dipakai sama sekali** oleh
  Tailwind v4 kecuali Anda menambahkan `@config "./tailwind.config.js";` di
  `src/input.css`. Sudah diberi catatan di dalam file.
- Folder `pages/` (6 file HTML kosong) dan folder `node_modules/` dibiarkan
  apa adanya sesuai permintaan Anda. `node_modules/` **tidak disertakan** di
  file ZIP hasil perbaikan ini karena ukurannya besar dan bisa di-generate
  ulang dengan `npm install` — cukup jalankan itu di komputer Anda sebelum
  submit atau develop lebih lanjut.
