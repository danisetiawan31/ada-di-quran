# Backlog Pembangunan Pondasi (Base Engine) — "Ada di Quran"

**Tujuan Dokumen:** Daftar pekerjaan teknis satu kali (*one-time setup*) untuk membangun arsitektur dasar, sistem otomasi unduhan EveryAyah (`.mp3` & `.png`), kalkulator *Auto-Proportional Subtitle*, *camera rig* untuk animasi 2D penuh, serta komponen *reusable* di Remotion sebelum memulai produksi Episode 1.  
**Acuan Aturan:** `PROJECT_SSOT.md`

---

## Milestone 1: Inisiasi Proyek, Git & Struktur Direktori
Tujuan: Menyiapkan lingkungan kerja Remotion (TypeScript) yang bersih sesuai struktur direktori di SSOT.

- [ ] **Task 1.1 — Setup Proyek Remotion & Git:**
  - Inisiasi proyek Remotion menggunakan TypeScript.
  - Inisiasi Git (`git init`) dan buat `.gitignore` standar (`node_modules/`, `out/`, `.remotion/`).
- [ ] **Task 1.2 — Pembuatan Struktur Folder Standar:**
  - Buat folder `briefs/`, `scripts/`, `public/assets/global/`, `src/theme/`, `src/utils/`, `src/components/`, dan `src/episodes/`.
- [ ] **Task 1.3 — Instalasi Package Pendukung:**
  - Install `@remotion/google-fonts` (untuk font `Plus Jakarta Sans` / `Inter`) dan `@remotion/media-utils` (untuk deteksi durasi `.mp3` otomatis dan visualisasi gelombang audio `useAudioData`).

---

## Milestone 2: Design System, Data 114 Surah & Utilitas Subtitle (`src/theme/` & `src/utils/`)
Tujuan: Mengunci variabel ukuran layar, palet warna, kamus 114 surah, serta fungsi penghitung waktu subtitle proporsional.

- [ ] **Task 2.1 — File Konstanta Tema & Font (`src/theme/tokens.ts` & `fonts.ts`):**
  - Kunci ukuran layar: `WIDTH = 1080`, `HEIGHT = 1920`, `FPS = 30`, `MAX_AYAH_FRAMES = 300` (10 detik).
  - Siapkan palet warna dasar & aksen: Deep Night (`#0A1128`), Mushaf Cream (`#FDFBF7`), Teal (`#14B8A6`), Orange (`#F97316`), Amber (`#FBBF24`), dan Text White (`#F8FAFC`).
  - Muat font Latin (`Plus Jakarta Sans` atau `Inter`) via `@remotion/google-fonts`.
- [ ] **Task 2.2 — Kamus Data 114 Surah (`src/theme/surahList.ts`):**
  - Simpan mapping nomor surah (1–114) ke nama surah sesuai daftar `<select id="chapter">` di EveryAyah (contoh: `1: "Al-Faatiha"`, `22: "Al-Hajj"`, `49: "Al-Hujuraat"`, `55: "Ar-Rahmaan"`, `75: "Al-Qiyaama"`, dst.).
- [ ] **Task 2.3 — Utilitas Auto-Proportional Subtitle (`src/utils/subtitleTiming.ts`):**
  - Buat fungsi helper `generateProportionalSubtitles(segments: { text: string; highlightWords?: string[] }[], totalDurationInFrames: number)` yang secara otomatis menghitung `startFrame` dan `endFrame` tiap kalimat secara proporsional berdasarkan panjang karakter teks terhadap `totalDurationInFrames` dari `vo_main.mp3`.

---

## Milestone 3: Otomasi Pengunduh Audio & Gambar Ayat (`scripts/`)
Tujuan: Membuat script otomatis untuk mengunduh file `.mp3` dan `.png` sekaligus dari EveryAyah.com.

- [ ] **Task 3.1 — Buat Script `scripts/fetch-ayah.mjs`:**
  - Script Node.js yang menerima argumen CLI: `--ep` (contoh: `01`), `--surah` (contoh: `49`), dan `--ayah` (contoh: `9`).
  - **Download 1 (Audio):** Format surah & ayat menjadi 3 digit (`049009.mp3`), unduh dari `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/{surah3}{ayat3}.mp3`, simpan ke `public/assets/ep{XX}/ayah.mp3`.
  - **Download 2 (Gambar Ayat):** Format surah & ayat asli dengan pemisah underscore (`49_9.png`), unduh dari `https://everyayah.com/data/images_png/{surah}_{ayat}.png`, simpan ke `public/assets/ep{XX}/ayah.png`.
- [ ] **Task 3.2 — Tambah Shortcut di `package.json`:**
  - Tambahkan script `"fetch-ayah": "node scripts/fetch-ayah.mjs"` (cara pakai: `npm run fetch-ayah -- --ep=01 --surah=49 --ayah=9`).

---

## Milestone 4: Pembangunan Core Visual & Camera Engine (`src/components/`)
Tujuan: Membangun perangkat kamera 2D, komponen adab cahaya, kartu mushaf anti-overflow, dan *subtitle*.

- [ ] **Task 4.1 — `<CameraRig />` & `<ParallaxLayer />` (`src/components/CameraRig.tsx`):**
  - Komponen pembungkus adegan (*wrapper*) untuk menganimasikan pergerakan kamera sinematik pada ilustrasi 2D:
    - Mendukung *props* `zoom` (dari *wide shot* ke *macro close-up*), `panX`, `panY` (misal menyelam dari permukaan laut ke dasar laut), dan `shake` (getaran halus).
    - `<ParallaxLayer speed={...} />` untuk memisahkan gerakan latar langit, objek tengah, dan latar depan.
- [ ] **Task 4.2 — `<SacredLight />` & `<Watermark />` (`src/components/SacredLight.tsx`):**
  - Komponen bola cahaya keemasan bersinar (*glowing orb* dengan partikel lembut) untuk merepresentasikan Nabi, Malaikat, atau hal gaib.
  - Komponen watermark `@AdaDiQuran` di area aman bagian atas layar.
- [ ] **Task 4.3 — `<AyahCard />` (`src/components/AyahCard.tsx`):**
  - Menerima *props*: `surahNumber`, `ayahNumber`, `translationText`, `imageSrc` (`ayah.png`), dan `audioSrc` (`ayah.mp3`).
  - Merender *backdrop overlay* gelap transparan (`backdropFilter: 'blur(12px)'`, `backgroundColor: 'rgba(10, 17, 40, 0.75)'`) yang akan mem-blur ilustrasi adegan cerita di bawahnya.
  - Menampilkan *badge* nama surah (otomatis dari `surahList.ts`) & nomor ayat dengan aksen Amber (`#FBBF24`).
  - Menampilkan gambar `<Img src={imageSrc} />` di dalam kartu **Warm Cream (`#FDFBF7`)** dengan gaya `width: '100%'`, `maxHeight: 420`, `objectFit: 'contain'`, dan **`mixBlendMode: 'multiply'`** agar kaligrafi hitam menyatu sempurna tanpa kotak background bawaan.
  - Menampilkan **Audio Waveform Visualizer** (via `useAudioData()`) dan *progress bar* berwarna Amber di bawah kaligrafi.
  - Menampilkan `translationText` dengan logika **Auto-Scale Font Size** (contoh: `fontSize = translationText.length > 180 ? 28 : 34`) agar terjemahan panjang tidak pernah *overflow* keluar kartu.
  - Memutar `<Audio src={audioSrc} />` dengan batas maksimal 10 detik (300 frames) dan *audio fade-out* halus di frame 270–300 jika durasi asli audio > 10 detik.
- [ ] **Task 4.4 — `<DynamicSubtitle />` (`src/components/DynamicSubtitle.tsx`):**
  - Dilengkapi *bottom dark vignette* (gradasi hitam halus di bagian bawah layar) agar teks selalu kontras di atas ilustrasi apa pun.
  - Menerima *array* hasil kalkulasi `generateProportionalSubtitles()` dan menampilkan maksimal 1–2 baris di sepertiga bawah layar dengan *highlight* warna aksen pada kata kunci.

---

## Milestone 5: Master Layout & Layered Freeze Architecture (`src/components/EpisodeLayout.tsx`)
Tujuan: Menggabungkan 3 bagian audio linear secara otomatis sekaligus mempertahankan ilustrasi Sekuens 1 di latar belakang saat `<AyahCard />` dan CTA muncul.

- [ ] **Task 5.1 — Bangun `<EpisodeLayout />`:**
  - Membaca durasi `vo_main.mp3` (`voMainFrames`), `ayah.mp3` (`ayahFrames = Math.min(durasiAsliFrames, 300)`), dan `vo_cta.mp3` (`ctaFrames`) secara otomatis menggunakan `getAudioDurationInSeconds()` di `calculateMetadata`.
  - **Layer 1 (Base Visual Layer — `<AbsoluteFill>` Paling Bawah):**
    - Merender `children` (ilustrasi 2D episode) sepanjang durasi video dengan pembungkus `<Freeze frame={voMainFrames - 1} active={currentFrame >= voMainFrames}>` dari Remotion. Dengan ini, saat masuk ke bagian Ayat dan CTA, ilustrasi terakhir cerita tetap tampil membeku di latar belakang (tidak hilang/hitam) sehingga efek `backdropFilter: 'blur(12px)'` bekerja sempurna.
  - **Layer 2 (Sequential Audio & Overlay Layer — `<Series>`):**
    1. **Sekuens 1 (Durasi = `voMainFrames`):** Merender `<Audio src={voMain} />` + `<DynamicSubtitle subtitles={mainSubtitles} />`.
    2. **Sekuens 2 (Durasi = `ayahFrames`):** Merender `<AyahCard />` (sebagai *blurred overlay* di atas ilustrasi yang di-*freeze*).
    3. **Sekuens 3 (Durasi = `ctaFrames`):** Merender overlay visual penutup/CTA + `<Audio src={voCta} />` + `<DynamicSubtitle subtitles={ctaSubtitles} />`.

---

## Milestone 6: Aset Global & Pengujian "Episode 00 (Dummy Test)"
Tujuan: Memastikan seluruh pondasi berjalan lancar sebelum mulai produksi konten pertama.

- [ ] **Task 6.1 — Siapkan Aset Global (`public/assets/global/vo_cta.mp3`):**
  - Simpan 1 file suara penutup *reusable* hasil generate Google AI Studio Voiceover.
- [ ] **Task 6.2 — Buat Komposisi Uji Coba (`src/episodes/Ep00-Test/`):**
  - Jalankan `npm run fetch-ayah -- --ep=00 --surah=49 --ayah=9` untuk menguji unduhan otomatis `ayah.mp3` dan `ayah.png`.
  - Uji fungsi `generateProportionalSubtitles()`, simulasi kamera `<CameraRig />`, pastikan `<Freeze />` menahan ilustrasi latar saat `<AyahCard />` muncul mem-blur di atasnya, dan uji pemotongan 10 detik + *fade-out*.
- [ ] **Task 6.3 — Test Render & Git Commit Pondasi:**
  - Lakukan test render singkat ke `.mp4` dan commit seluruh kode pondasi ke branch `main`.
