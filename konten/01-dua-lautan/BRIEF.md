# Riset & Brief Produksi Episode 01: Dua Lautan yang Bertemu Tapi Tak Bercampur

**Tanggal:** 26 Oktober 2026 · **Kreator:** @Ahmad Dhani Setiawan  
**Channel:** Ada di Quran  
**Acuan Arsitektur:** `PROJECT_SSOT.md` & `FOUNDATION_BACKLOG.md`  
**Kategori Topik:** Sains & Alam (Oseanografi)  
**Rujukan Ayat Utama:** QS. Ar-Rahman (55): 19–20

---

## 1. Status Kesiapan Aset

- [x] Topik & Ayat dikunci (QS. Ar-Rahman: 19 & 20)
- [x] Riset oseanografi (*halocline*) & cek tafsir (2 sumber kredibel)
- [x] Naskah final selesai ditulis (102 kata)
- [x] File suara utama (`public/assets/ep01/vo_main.mp3`) sudah di-generate via Google AI Studio (**Durasi: 52 detik / 1.560 frames pada 30fps**)
- [ ] Unduh otomatis aset Ayat 19 & 20 via `scripts/fetch-ayah.mjs`
- [ ] Eksekusi visual Full-Scene 2D & sinkronisasi di Remotion via Antigravity
- [ ] Preview di Remotion Studio & render akhir ke `out/ep01-dua-lautan.mp4`

---

## 2. Ringkasan Riset & Sumber Verifikasi (Untuk Konteks & Caption)

### A. Poin Inti Sains & Tafsir
1. **Fenomena *Halocline* & *Pycnocline*:** Saat dua massa air laut dengan karakteristik fisik berbeda bertemu (seperti di Selat Gibraltar atau Teluk Alaska), perbedaan mencolok pada **kadar garam (salinitas)**, **suhu**, dan **kepadatan (densitas)** menahan keduanya agar tidak langsung melebur seketika.
2. **Analogi Kepadatan:** Mirip seperti menuangkan sirup kental dan air putih secara perlahan; perbedaan berat jenis menciptakan lapisan pembatas tak kasatmata di bawah permukaan air.
3. **Konteks Tafsir (*Barzakh*):** Dalam *Tafsir Kemenag RI* dan *Tafsir Al-Misbah*, kata *marajal bahrain* (Ayat 19) dan *barzakh* (Ayat 20) merujuk pada kuasa Allah yang mempertemukan dua lautan namun menetapkan pembatas alami (hukum fisika/perbedaan karakteristik air) sehingga masing-masing mempertahankan sifat aslinya.

### B. Sumber Rujukan (Cantumkan di Caption)
- **Al-Qur'an & Tafsir:**
  1. Mushaf & Tafsir Ringkas Kementerian Agama RI — QS. Ar-Rahman (55): 19–20.
  2. Tafsir Al-Misbah (Prof. Dr. M. Quraish Shihab) — Pembahasan Surah Ar-Rahman ayat 19–20.
- **Sains (Oseanografi):**
  1. *National Oceanic and Atmospheric Administration (NOAA)* — *Estuaries, Halocline, and Thermohaline Circulation*.
  2. *UCAR Center for Science Education* — *Seawater Density and Pycnocline Layer*.

### C. Batasan Konten (Dilarang Masuk Visual/Teks)
- Jangan mengklaim kedua lautan "0% bercampur selamanya" (tetap terjadi difusi lambat di zona perbatasan).
- Jangan mencantumkan mitos/hoax tentang Jacques Cousteau.

---

## 3. Spesifikasi Aset Audio & Ayat (3-Part Audio System)

### Bagian 1: Narasi Utama (`vo_main.mp3`)
- **Path File:** `public/assets/ep01/vo_main.mp3`
- **Durasi Pasti:** **52.0 detik (1.560 frames pada 30fps)**

### Bagian 2: Murattal & Gambar Ayat Berurutan (QS. Ar-Rahman: 19 & 20)
Karena narasi menyebut "ayat 19 dan 20" dan keduanya merupakan ayat pendek (~4 detik per ayat, total ~8 detik ≤ batas maksimal 10 detik), Bagian 2 menampilkan **2 kartu ayat secara berurutan** di atas latar belakang adegan terakhir yang di-`<Freeze />` dan di-*blur*:

1. **Ayat Pertama — QS. Ar-Rahman (55): 19**
   - **Audio:** `public/assets/ep01/ayah_19.mp3` (Sumber: `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/055019.mp3`)
   - **Gambar Kaligrafi:** `public/assets/ep01/ayah_19.png` (Sumber: `https://everyayah.com/data/images_png/55_19.png`)
   - **Badge Surah:** `QS. Ar-Rahmaan (55): 19`
   - **Terjemahan Kemenag:** `"Dia membiarkan dua laut mengalir yang (kemudian) keduanya bertemu."`
2. **Ayat Kedua — QS. Ar-Rahman (55): 20**
   - **Audio:** `public/assets/ep01/ayah_20.mp3` (Sumber: `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/055020.mp3`)
   - **Gambar Kaligrafi:** `public/assets/ep01/ayah_20.png` (Sumber: `https://everyayah.com/data/images_png/55_20.png`)
   - **Badge Surah:** `QS. Ar-Rahmaan (55): 20`
   - **Terjemahan Kemenag:** `"Di antara keduanya ada batas yang tidak dilampaui masing-masing."`

### Bagian 3: Penutup / CTA (`vo_cta.mp3`)
- **Path File:** `public/assets/global/vo_cta.mp3`
- **Teks Subtitle CTA:** `"Follow Ada di Quran buat tahu fakta menarik lainnya, ya!"`

---

## 4. Data Naskah & 12 Segmen Subtitle (`vo_main.mp3`)

Gunakan array di bawah ini sebagai input ke `generateProportionalSubtitles(segments, 1560)` (atau gunakan rentang frame acuan berikut untuk sinkronisasi dengan visual 52 detik):

```ts
export const EP01_SUBTITLE_SEGMENTS = [
  {
    // Segmen 1 (~0.0s - 2.8s | Frame 0 - 84)
    text: "Kamu pernah lihat dua air laut yang tabrakan,",
    highlightWords: ["dua air laut", "tabrakan"],
  },
  {
    // Segmen 2 (~2.8s - 6.2s | Frame 84 - 186)
    text: "tapi warnanya nggak mau nyatu kayak gini? Kok bisa?",
    highlightWords: ["nggak mau nyatu", "Kok bisa?"],
  },
  {
    // Segmen 3 (~6.2s - 9.8s | Frame 186 - 294)
    text: "Padahal, nggak ada tembok kaca di tengah lautnya, lho.",
    highlightWords: ["nggak ada", "tembok kaca"],
  },
  {
    // Segmen 4 (~9.8s - 15.6s | Frame 294 - 468)
    text: "Fenomena unik ini nyata dan bisa kamu temukan di tempat seperti Selat Gibraltar atau Teluk Alaska.",
    highlightWords: ["Selat Gibraltar", "Teluk Alaska"],
  },
  {
    // Segmen 5 (~15.6s - 19.6s | Frame 468 - 588)
    text: "Dalam sains kelautan, batas pemisah ini disebut halocline.",
    highlightWords: ["batas pemisah", "halocline"],
  },
  {
    // Segmen 6 (~19.6s - 24.5s | Frame 588 - 735)
    text: "Saat dua lautan dengan kadar garam, suhu, dan kepadatan yang jauh berbeda bertemu,",
    highlightWords: ["kadar garam", "suhu", "kepadatan"],
  },
  {
    // Segmen 7 (~24.5s - 28.0s | Frame 735 - 840)
    text: "molekul airnya nggak bisa langsung melebur gitu aja.",
    highlightWords: ["nggak bisa", "melebur"],
  },
  {
    // Segmen 8 (~28.0s - 32.3s | Frame 840 - 969)
    text: "Mirip kayak kamu nuangin sirup kental dan air putih pelan-pelan.",
    highlightWords: ["sirup kental", "air putih"],
  },
  {
    // Segmen 9 (~32.3s - 36.8s | Frame 969 - 1104)
    text: "Perbedaan kepadatan itu menciptakan dinding pembatas tak kasatmata di bawah air,",
    highlightWords: ["dinding pembatas", "tak kasatmata"],
  },
  {
    // Segmen 10 (~36.8s - 40.0s | Frame 1104 - 1200)
    text: "yang menahan sifat asli masing-masing lautan.",
    highlightWords: ["sifat asli"],
  },
  {
    // Segmen 11 (~40.0s - 44.8s | Frame 1200 - 1344)
    text: "Menariknya, jauh sebelum alat oseanografi modern meneliti kedalaman laut,",
    highlightWords: ["oseanografi modern", "kedalaman laut"],
  },
  {
    // Segmen 12 (~44.8s - 52.0s | Frame 1344 - 1560)
    text: "fenomena dua lautan yang bertemu tapi punya batas pemisah ini sudah tertulis di dalam Al-Qur'an, Surah Ar-Rahman ayat 19 dan 20.",
    highlightWords: ["Al-Qur'an", "Surah Ar-Rahman", "ayat 19 dan 20"],
  },
];
```

---

## 5. Storyboard Full-Scene 2D & Instruksi `<CameraRig />` (Frame 0–1560)
Bangun komponen `src/episodes/Ep01-DuaLautan/index.tsx` menggunakan teknik Multi-Layered Geometric & Gradient SVG (tanpa icon library) yang dibagi menjadi 5 Scene Kontekstual:

### Scene 1: Top-Down Dua Lautan Bertabrakan (Frame 0–294 | Detik 0.0–9.8)
- **Konteks Audio:** Segmen 1–3 (*"Kamu pernah lihat dua air laut yang tabrakan... nggak ada tembok kaca..."*)
- **Lingkungan 2D (Full-Scene):**
  - Tampilan atas (*aerial view*) lautan vertikal yang terbelah dua secara diagonal/vertikal bergelombang menggunakan kurva Bezier dinamis (`Math.sin`).
  - **Sisi Kiri:** Laut biru tua pekat (`#0A2463` ke `#1E3A8A`) dengan partikel arus tenang.
  - **Sisi Kanan:** Laut pirus/toska terang (`#0D9488` ke `#2DD4BF`).
  - **Tengah:** Garis buih putih bercahaya (*foam line*) yang berdesir aktif tempat kedua arus saling mendorong.
- **Aksi Kamera & Visual:**
  - **Frame 0–186:** `<CameraRig />` melakukan zoom-in halus (1.0 ke 1.12) ke arah garis buih pertemuan dua warna air.
  - **Frame 186–294:** Sebuah panel kaca transparan tipis sempat muncul di sepanjang garis batas lalu pecah/memudar menjadi partikel cahaya (memvisualisasikan kalimat *"nggak ada tembok kaca"*).

### Scene 2: Peta Bumi & Penyelaman ke Bawah Permukaan / Halocline (Frame 294–735 | Detik 9.8–24.5)
- **Konteks Audio:** Segmen 4–6 (*"...Selat Gibraltar atau Teluk Alaska... disebut halocline... beda kadar garam, suhu, dan kepadatan..."*)
- **Lingkungan 2D & Transisi Kamera:**
  - **Frame 294–468:** Kamera zoom-out sedikit memperlihatkan cakrawala langit senja/malam, siluet tebing pesisir (representasi Selat Gibraltar / pegunungan es Teluk Alaska di kejauhan) dengan dua titik kompas bercahaya Amber.
  - **Frame 468–735 (Vertical Camera Pan — Menyelam):** `<CameraRig />` bergerak vertikal ke bawah (`panY` menembus permukaan ombak masuk ke penampang bawah air / *underwater cross-section*).
  - Di bawah air, terlihat jelas dinding pembatas vertikal berlapis cahaya (*halocline barrier*):
    - **Ruang Air Kiri (Tinggi Garam & Dingin):** Dipenuhi partikel kristal garam berkilau yang padat dan rapat, bernuansa biru dingin.
    - **Ruang Air Kanan (Rendah Garam & Hangat):** Partikel lebih renggang dengan pendaran cahaya hangat keemasan/oranye lembut (`#F97316`).

### Scene 3: Mikroskopis Molekul & Analogi Gelas Sirup vs Air Putih (Frame 735–969 | Detik 24.5–32.3)
- **Konteks Audio:** Segmen 7–8 (*"molekul airnya nggak bisa langsung melebur... Mirip kayak kamu nuangin sirup kental dan air putih pelan-pelan."*)
- **Lingkungan 2D & Aksi Visual:**
  - **Frame 735–840:** Macro zoom-in ke garis batas bawah air: bola-bola molekul biru pekat dan bola molekul toska saling mendekat lalu memantul halus (*elastic bounce* dengan `spring()`) di garis tengah.
  - **Frame 840–969:** Transisi visual ke ilustrasi siluet wadah/gelas kaca transparan besar di tengah latar belakang laut yang agak gelap. Cairan sirup kental berwarna oranye-merah keemasan (`#F97316` / `#F59E0B`) dituang perlahan di bagian bawah, sementara air putih/biru jernih berada di lapisan atasnya, memperlihatkan garis pemisah horizontal yang tegas.

### Scene 4: Dinding Pembatas Tak Kasatmata di Kedalaman Laut (Frame 969–1200 | Detik 32.3–40.0)
- **Konteks Audio:** Segmen 9–10 (*"Perbedaan kepadatan itu menciptakan dinding pembatas tak kasatmata... menahan sifat asli masing-masing lautan."*)
- **Lingkungan 2D & Aksi Visual:**
  - Kamera kembali ke pemandangan *underwater cross-section* yang megah.
  - Di sepanjang perbatasan kedua warna air laut, muncul gelombang medan energi tipis bercahaya Amber/Teal (*invisible forcefield ripple*) yang berpendar lembut dari dasar hingga ke permukaan.
  - Siluet ikan-ikan kecil dan arus air di sisi kiri berenang mengikuti pusaran kiri, sedangkan arus di sisi kanan berputar di sisi kanan—menunjukkan kedua ekosistem tetap terjaga sifat aslinya.

### Scene 5: Kapal Riset Oseanografi & Transisi Cahaya Menuju Ayat (Frame 1200–1560 | Detik 40.0–52.0)
- **Konteks Audio:** Segmen 11–12 (*"Menariknya, jauh sebelum alat oseanografi modern meneliti kedalaman laut, fenomena... sudah tertulis di dalam Al-Qur'an, Surah Ar-Rahman ayat 19 dan 20."*)
- **Lingkungan 2D & Aksi Visual:**
  - **Frame 1200–1380:** Kamera melakukan *wide view* memperlihatkan siluet kapal riset oseanografi di permukaan laut yang memancarkan gelombang radar/sonar hijau-teal berbentuk kerucut ke arah lapisan halocline di kedalaman laut.
  - **Frame 1380–1560:** Gelombang sonar perlahan meredup, digantikan oleh pendaran cahaya keemasan (`#FBBF24`) yang bersinar tenang dari garis pertemuan dua lautan ke arah langit malam berbintang.
  - Pada **Frame 1560**, komposisi pemandangan laut terbelah dua yang berkilau ini dibekukan (`<Freeze />`) dan menjadi latar belakang blur untuk kemunculan berurutan `<AyahCard />` Ayat 19 dan Ayat 20.
