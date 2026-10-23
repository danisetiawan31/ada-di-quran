# Single Source of Truth (SSOT) — Channel "Ada di Quran"

**Pemilik Proyek:** Ahmad Dhani Setiawan  
**Tech Stack:** Remotion (React/TypeScript), Antigravity (AI Coding & Auto-Proportional Subtitle), Google AI Studio (Voiceover), Git  
**Sumber Audio & Gambar Ayat:** EveryAyah.com (`Abu_Bakr_Ash-Shaatree_128kbps` & `images_png`)  
**Sumber Terjemahan:** Mushaf Standar Kementerian Agama RI (Kemenag)

---

## 1. Identitas & Karakteristik Channel
- **Nama Channel:** Ada di Quran
- **Konsep Utama:** Konten video edukasi berbasis **Full-Scene 2D Contextual Animation** (seperti gaya visual *Kok Bisa?* atau *Kurzgesagt*) yang memvisualisasikan fenomena sains, alam, medis, sejarah, atau kehidupan sosial secara utuh dan *playful*, lalu ditutup dengan bukti/petunjuk ayat Al-Qur'an yang relevan.
- **Target Audiens:** Umum (16+ tahun) di TikTok, Instagram Reels, dan YouTube Shorts.
- **Durasi Video:** 45 hingga 120 detik (menyesuaikan total durasi gabungan 3 komponen audio).
- **Gaya Bahasa & Tone:**
  - Bahasa Indonesia santai, ramah, *playful*, kalimat pendek-pendek tanpa istilah rumit.
  - Menggunakan sapaan konsisten: **"kamu"**.
  - Berangkat dari rasa penasaran (*curiosity*) atau kejadian yang dekat dengan keseharian penonton, tidak menggurui.

---

## 2. Cakupan Topik (Open Scope)
Topik konten mencakup seluruh dimensi ilmu dan kehidupan yang disinggung di dalam Al-Qur'an:
- **Sains & Alam:** Oseanografi (dua lautan tak bercampur), astronomi, geologi, flora, fauna, dan alam semesta.
- **Tubuh & Medis:** Anatomi manusia (keunikan sidik jari, embriologi, sistem saraf/otak), dan kesehatan.
- **Sejarah & Kisah Nyata:** Kisah umat terdahulu (Ashabul Kahfi, perjalanan Hijrah), peradaban kuno, dan fenomena geografis.
- **Psikologi & Sosial:** Sifat dasar manusia, pengelolaan emosi, muamalah, serta hikmah/logika di balik aturan kehidupan.

**Syarat Mutlak Konten:**
1. Wajib memiliki *visual & audio hook* di 3 detik pertama.
2. Klaim fakta dan konteks tafsir ayat wajib diverifikasi minimal dari 2 sumber kredibel (Tafsir muktabar + referensi ilmiah/sejarah yang sahih).
3. Menghindari perdebatan *khilafiyah* yang rumit atau klaim cocoklogi tanpa dasar.
4. Sumber rujukan wajib dicantumkan di dokumen brief (`BRIEF_EPXX.md`) dan caption video.

---

## 3. Arsitektur Audio Linear & Aset Ayat (3-Part Audio System)
Setiap video disusun menggunakan 3 komponen audio vokal berurutan (linear), didukung oleh **Ambient Soundscapes / BGM Adaptif** untuk menjaga retensi penonton:

- **Aturan Pengiring Audio (Ambience & BGM):**
  - **Fokus Utama — Ambient Soundscapes & Foley:** Menggunakan suara lingkungan alami yang sesuai konteks topik (contoh: gemuruh ombak bawah air untuk oseanografi, hembusan angin gurun untuk sejarah/alam, detak jantung atau cinematic sub-bass untuk biologi/medis) serta SFX halus (transisi *whoosh*, kilauan cahaya saat ayat muncul). Hal ini membuat video terasa sinematik dan hidup tanpa terasa "kering" atau canggung di sela nafas narator.
  - **BGM Adaptif (Opsional & Kondisional):** BGM instrumental/lo-fi lembut dengan volume **15–20%** dapat digunakan apabila cocok dengan suasana cerita.
  - **Kekhusyukan Ayat (Bagian 2):** Saat masuk ke pembacaan ayat Al-Qur'an, BGM/ambience wajib diheningkan total (*full mute*) atau diturunkan drastis (*ducking*) agar murattal terdengar jernih, agung, dan khusyuk.

1. **Bagian 1 — Narasi Utama (`vo_main.mp3`):**
   - Berisi: Hook (0–3 detik) + Penjelasan fakta/cerita + Kalimat jembatan menuju ayat Al-Qur'an.
   - Diproduksi menggunakan **Google AI Studio Voiceover** berdasarkan naskah yang disusun pada tahap *planning*.
   - **Sinkronisasi Subtitle (Auto-Proportional + Manual Offset):** Perhitungan rasio panjang karakter teks terhadap total durasi `vo_main.mp3` dijadikan sebagai *baseline* otomatis. Namun, karena rekaman suara narator memiliki dinamika tempo, jeda nafas, dan jeda dramatis, utilitas `subtitleTiming.ts` wajib mendukung parameter **`manualOffsets` (toleransi pergeseran frame per baris kalimat)** agar sinkronisasi teks dan suara bisa disempurnakan secara presisi saat preview tanpa meleset.
2. **Bagian 2 — Murattal & Visual Ayat (`ayah.mp3` & `ayah.png`):**
   - **Sumber Audio (`ayah.mp3`):** Qari **Abu Bakr Ash-Shaatree** dari EveryAyah.com (`https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/{3_digit_surah}{3_digit_ayat}.mp3`, contoh: `022012.mp3`).
   - **Sumber Gambar Kaligrafi (`ayah.png`):** Gambar resmi dari EveryAyah.com (`https://everyayah.com/data/images_png/{surah}_{ayat}.png` tanpa *leading zero*, contoh: `22_12.png`).
   - **Aturan Durasi & Pemotongan (Maksimal 10 Detik / 300 Frames):**
     - Jika durasi asli `ayah.mp3` ≤ 10 detik, putar penuh sesuai durasi aslinya.
     - Jika durasi asli `ayah.mp3` > 10 detik (ayat panjang), batasi durasi tampil maksimal **10 detik (300 frames pada 30fps)** dan lakukan *audio fade-out* halus di 1 detik terakhir (frame 270–300).
   - **Aturan Panjang Teks Terjemahan:** Untuk ayat yang panjang, gunakan kutipan inti terjemahan Kemenag yang paling relevan (maksimal 25–30 kata) dengan tanda elipsis (`"..."`) agar nyaman dibaca dalam 10 detik dan tidak meluber (*overflow*) dari kartu.
3. **Bagian 3 — Penutup / CTA (`vo_cta.mp3`):**
   - Berisi: Ajakan penutup standar (contoh: *"Follow Ada di Quran buat tahu fakta menarik lainnya, ya!"*).
   - Merupakan aset *reusable* global hasil Google AI Studio Voiceover yang dipakai berulang di setiap episode.

---

## 4. Standar Visual & Prinsip Animasi Remotion ("Full-Scene 2D Storytelling")
- **Resolusi & Frame Rate:** 1080 x 1920 piksel (Vertikal 9:16), 30 fps.
- **Larangan Background Polos & Statis:** Dilarang menggunakan latar belakang 1 warna polos atau sekadar menumpuk kartu teks (*UI cards*). Setiap adegan wajib berupa **ilustrasi lingkungan 2D utuh (Full-Scene Environment)** yang sesuai dengan konteks cerita.

### A. Prinsip Visualisasi Kontekstual (Topic-Driven Visuals)
Visual pada Bagian 1 harus selalu merepresentasikan objek nyata yang sedang dibicarakan narator:
1. **Topik Alam & Sains:** Visualisasikan lanskap alam secara langsung beserta pergerakan fisika/partikelnya (contoh: pemandangan laut dari atas yang terbelah dua warna, lalu kamera menyelam ke bawah air memperlihatkan partikel garam dan arus air).
2. **Topik Medis & Anatomi:** Gunakan transisi *Macro Zoom-In* dari objek luar masuk ke struktur mikroskopis (contoh: dari jari tangan yang menyentuh layar HP, *zoom-in* masuk ke labirin garis sidik jari yang menyala).
3. **Topik Sejarah & Ruang:** Bangun atmosfer lokasi dan perjalanan waktu (contoh: mulut gua batu di pegunungan, lalu masuk ke dalam gua dengan simulasi cahaya matahari dan langit siang-malam yang berganti cepat / *time-lapse*).
4. **Topik Sosial & Keseharian:** Gunakan adegan situasional dengan aktor manusia *flat-geometric* hanya jika topik memang membahas interaksi manusia.
5. **Adab Representasi Hal Gaib (`<SacredLight />`):** Nabi, Malaikat, atau hal gaib dilarang divisualisasikan wujud/siluet tubuhnya. Wajib direpresentasikan menggunakan **pancaran cahaya keemasan (*glowing light orb*)**.

### B. Pergerakan Kamera & Transisi Adegan (`<CameraRig />`)
Agar penonton betah menonton hingga akhir, setiap episode wajib dibagi menjadi **3–5 Scene Ilustrasi** yang dihubungkan dengan pergerakan kamera aktif di Remotion:
- **Camera Panning (Horizontal / Vertical):** Menggeser sudut pandang kamera dari langit ke daratan, atau dari permukaan laut menyelam ke dasar laut (*cross-section*).
- **Camera Zoom (Macro / Wide):** Memperbesar detail objek menggunakan `spring()` dan `interpolate()`.
- **2.5D Parallax:** Memisahkan elemen latar depan (*foreground*), tengah (*midground*), dan belakang (*background*) agar bergerak dengan kecepatan berbeda.

### C. Desain `<AyahCard />` (Seamless Mushaf Overlay & Freeze Background)
- Saat masuk Bagian 2, adegan ilustrasi terakhir dari Bagian 1 **tetap dipertahankan di layar bawah dalam kondisi dibekukan (`<Freeze />`)**, lalu dilapisi *overlay* gelap transparan dan *blur* (`backdropFilter: 'blur(12px)'`, `backgroundColor: 'rgba(10, 17, 40, 0.75)'`).
- Di tengah layar muncul kartu Mushaf berwarna **Warm Cream (`#FDFBF7`)** dengan aksen bingkai Amber (`#FBBF24`).
- Gambar `ayah.png` dirender dengan `width: 100%`, `maxHeight: 420px`, `objectFit: 'contain'`, dan properti CSS **`mixBlendMode: 'multiply'`** agar latar putih/abu-abu bawaan EveryAyah menyatu 100% dengan warna kertas kartu.
- Dilengkapi **Audio Waveform Visualizer** berwarna Amber di bawah kaligrafi serta teks terjemahan Kemenag dengan fitur **Auto-Scale Font Size** (ukuran font otomatis mengecil jika panjang teks > 180 karakter agar tidak pernah *overflow*).

### D. Aturan Tipografi & Subtitle (`<DynamicSubtitle />`)
- Gunakan font sans-serif modern (`Plus Jakarta Sans` atau `Inter`).
- Berikan *dark vignette* (gradasi gelap halus) di bagian bawah layar agar teks selalu kontras di atas ilustrasi apa pun.
- Tampilkan maksimal 1–2 baris pendek di sepertiga bawah layar dengan *highlight* warna aksen (Teal `#14B8A6`, Orange `#F97316`, atau Amber `#FBBF24`) pada kata kunci. Teks narasi dilarang dimasukkan ke dalam ilustrasi SVG.

---

## 5. Struktur Direktori Proyek (Git Standard)
```text
ada-di-quran/
├── PROJECT_SSOT.md              # Dokumen acuan utama proyek (file ini)
├── FOUNDATION_BACKLOG.md        # Backlog pembangunan pondasi Base Engine
├── briefs/                      # Dokumen riset, naskah voiceover, & storyboard per episode (BRIEF_EPXX.md)
├── scripts/                     # Script utilitas (fetch-ayah.mjs untuk unduh .mp3 & .png)
├── public/
│   └── assets/
│       ├── global/              # Aset reusable (vo_cta.mp3, watermark/logo)
│       └── epXX/                # Aset per episode (vo_main.mp3, ayah.mp3, ayah.png)
└── src/
    ├── theme/                   # Konstanta palet warna, ukuran, font Latin, dan daftar 114 Surah
    ├── utils/                   # Utilitas Auto-Proportional Subtitle Timing (subtitleTiming.ts)
    ├── components/              # Reusable engine (CameraRig, SacredLight, AyahCard, DynamicSubtitle, EpisodeLayout)
    ├── episodes/                # Full-scene 2D illustrations spesifik per episode (Ep01, Ep02, dst.)
    └── Root.tsx                 # Registrasi komposisi Remotion
```
