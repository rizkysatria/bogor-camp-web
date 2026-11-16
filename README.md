# Bogor Camping Guide

Website statis direktori camping & glamping Bogor. Dibuat dengan HTML, CSS, JavaScript, dan JSON data lokal. Tidak membutuhkan backend, database, API key, atau biaya hosting.

## Isi
- `index.html` — struktur halaman
- `style.css` — styling responsive
- `app.js` — filter, sorting, tampilan grid/list, share
- `data.js` — data tempat camping

## Cara menjalankan di Mac
1. Extract ZIP.
2. Buka folder `bogor-camping-dashboard`.
3. Cara paling simpel: double-click `index.html`.
4. Jika ingin menjalankan local server, buka Terminal di folder tersebut lalu jalankan:
   `python3 -m http.server 8000`
5. Buka `http://localhost:8000`.

## Deploy gratis ke GitHub Pages
1. Login ke GitHub dan buat repository baru, misalnya `bogor-camping-guide`.
2. Pilih **Public** agar GitHub Pages tersedia gratis untuk repository ini.
3. Upload semua file di folder ini (`index.html`, `style.css`, `app.js`, `data.js`) ke root repository. Jangan upload ZIP-nya saja.
4. Di repository, buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch `main`, folder `/ (root)`, lalu klik **Save**.
7. Tunggu proses deployment selesai. URL website biasanya:
   `https://USERNAME.github.io/bogor-camping-guide/`
8. Buka URL tersebut dan share ke grup WhatsApp.

## Update data
Edit `data.js`. Setiap tempat adalah satu object di dalam array `window.CAMPING_PLACES`.
- `name`: nama tempat
- `area`: salah satu dari tujuh koridor
- `subarea`: kecamatan/desa atau petunjuk area
- `rating`: angka rating, atau `null` jika belum terverifikasi
- `reviews`: jumlah ulasan, atau `null`
- `family`: `true` jika kandidat family-friendly, `false` jika perlu verifikasi lebih lanjut
- `tags`: daftar fasilitas/karakter
- `maps`: URL pencarian Google Maps

Setelah edit, commit perubahan ke branch `main`. GitHub Pages akan deploy ulang otomatis.

## Penting tentang data
Data tempat, rating, dan jumlah ulasan di `data.js` adalah data awal yang dirangkum dari riset percakapan dan belum diverifikasi live. Cek kembali rating, jumlah ulasan, alamat, operasional, harga, fasilitas, dan keamanan langsung melalui Google Maps/pengelola sebelum mengambil keputusan. Label family-friendly adalah shortlist awal, bukan jaminan keamanan.

## Batasan
Website ini frontend statis. Filter dan sorting berjalan di browser. Tidak ada login, database, booking, sinkronisasi rating otomatis, atau panel admin.
