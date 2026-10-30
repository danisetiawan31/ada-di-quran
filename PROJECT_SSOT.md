# Single Source of Truth (SSOT) — Channel "Ada di Quran"

**Pemilik Proyek:** Ahmad Dhani Setiawan  
**Tech Stack:** Remotion (React/TypeScript), Antigravity (AI Coding & Auto-Proportional Subtitle), Google AI Studio (Voiceover), Git  
**Sumber Audio & Gambar Ayat:** EveryAyah.com (`Abu_Bakr_Ash-Shaatree_128kbps` & `images_png`)  
**Sumber Terjemahan:** Mushaf Standar Kementerian Agama RI (Kemenag)  
**Standar Seni & Animasi:** Cinematic 2D Living Physics & Lead Animator Standards (Bagian 4 & Bagian 6)

---

## 1. Identitas & Karakteristik Channel
- **Nama Channel:** Ada di Quran
- **Konsep Utama:** Konten video edukasi berbasis **Cinematic 2D Contextual Animation & Living Physics** (terinspirasi dari standar visual *Kurzgesagt* dan *Kok Bisa?*) yang memvisualisasikan fenomena sains, alam, medis, sejarah, atau kehidupan sosial secara dinamis, berbobot, dan *playful*, lalu ditutup dengan bukti/petunjuk ayat Al-Qur'an yang relevan secara agung.
- **Target Audiens:** Umum (16+ tahun) di TikTok, Instagram Reels, dan YouTube Shorts.
- **Durasi Video:** 45 hingga 120 detik (menyesuaikan total durasi gabungan 3 komponen audio, idealnya < 60 detik untuk YouTube Shorts).
- **Gaya Bahasa & Tone:**
  - Bahasa Indonesia santai, ramah, *playful*, kalimat pendek-pendek tanpa istilah rumit yang membingungkan.
  - Menggunakan sapaan konsisten: **"kamu"**.
  - Berangkat dari rasa penasaran (*curiosity*) atau fenomena nyata di keseharian penonton, tidak menggurui.

---

## 2. Cakupan Topik (Open Scope)
Topik konten mencakup seluruh dimensi ilmu dan kehidupan yang disinggung di dalam Al-Qur'an:
- **Sains & Alam:** Oseanografi (dua lautan tak bercampur), astronomi, geologi, flora, fauna, dan alam semesta.
- **Tubuh & Medis:** Anatomi manusia (keunikan sidik jari, embriologi, sistem saraf/otak), kesehatan, dan toksikologi pangan.
- **Sejarah & Kisah Nyata:** Kisah umat terdahulu (Ashabul Kahfi, perjalanan Hijrah), peradaban kuno, dan fenomena geografis.
- **Psikologi & Sosial:** Sifat dasar manusia, etika perniagaan, muamalah, serta hikmah/logika di balik aturan syariat.

**Syarat Mutlak Konten:**
1. Wajib memiliki *visual & audio hook* di 3 detik pertama yang langsung mencengkeram rasa ingin tahu penonton.
2. Klaim fakta dan konteks tafsir ayat wajib diverifikasi minimal dari 2 sumber kredibel (Tafsir muktabar + jurnal ilmiah/laporan badan resmi BPOM/WHO/Kemenkes).
3. Menghindari perdebatan *khilafiyah* atau klaim cocoklogi tanpa dasar ilmiah dan tafsir yang kuat.
4. Sumber rujukan wajib dicantumkan di dokumen brief (`BRIEF.md` di tiap folder konten) dan caption video.

---

## 3. Arsitektur Audio Linear & Aset Ayat (3-Part Audio System)
Setiap video disusun menggunakan 3 komponen audio vokal berurutan (linear), didukung oleh **Ambient Soundscapes / BGM Adaptif** serta **Foley Sound Effects (SFX)** yang tersinkronisasi presisi:

- **Aturan Pengiring Audio (Ambience & BGM):**
  - **Fokus Utama — Ambient Soundscapes & Foley:** Suara lingkungan alami (gemuruh ombak bawah air, desis angin gurun, detak jantung, cipratan air, letupan minyak mendidih) serta SFX taktil (transisi *whoosh*, *impact thud*, *elastic boing*, *chime* sakral). SFX foley memberi rasa bobot dan kepuasan fisik pada visual.
  - **BGM Adaptif (Opsional & Kondisional):** BGM instrumental/lo-fi lembut dengan volume default **20%–25%** (`0.20–0.25`) aktif selama Bagian 1 untuk menjaga retensi tanpa menenggelamkan vokal narator.
  - **Kekhusyukan Ayat (Bagian 2):** Saat masuk ke pembacaan ayat Al-Qur'an, BGM dan seluruh SFX wajib diheningkan total (*full mute / 0 SFX*) agar lantunan murattal terdengar jernih, agung, dan khusyuk.

1. **Bagian 1 — Narasi Utama (`vo_main.wav` / `vo_main.mp3`):**
   - Berisi: Hook (0–3 detik) + Penjelasan fakta/cerita dinamis + Kalimat jembatan menuju ayat Al-Qur'an.
   - Diproduksi menggunakan **Google AI Studio Voiceover** berdasarkan naskah terencana.
   - **Sinkronisasi Subtitle (Auto-Proportional + Manual Offset):** Utilitas `subtitleTiming.ts` menghitung timing dasar proporsional teks terhadap vokal narasi dan wajib mendukung parameter `manualOffsets` (toleransi frame per baris kalimat) agar sinkronisasi bibir vokal dan teks tidak pernah meleset.
   - **Zero Audio Overlap Guard:** Durasi Bagian 1 (`voMainFrames`) wajib menampung durasi asli `vo_main.wav` secara penuh ditambah jeda hening transisi mulia minimal **15–20 frame (~0.5–0.7 detik)** sebelum audio `ayah.mp3` dimulai, guna mencegah tabrakan vokal narator dengan lantunan Qari.

2. **Bagian 2 — Murattal & Visual Ayat (`ayah.mp3` & `ayah.png`):**
   - **Sumber Audio (`ayah.mp3`):** Qari **Abu Bakr Ash-Shaatree** dari EveryAyah.com (`https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/{3_digit_surah}{3_digit_ayat}.mp3`).
   - **Sumber Gambar Kaligrafi (`ayah.png`):** Gambar resmi dari EveryAyah.com (`https://everyayah.com/data/images_png/{surah}_{ayat}.png`).
   - **Aturan Durasi & Pemotongan (Maksimal 10 Detik / 300 Frames):**
     - Jika durasi asli `ayah.mp3` ≤ 10 detik, putar penuh sesuai durasi aslinya tanpa *fade-out* (volume 100% tuntas).
     - Jika durasi asli `ayah.mp3` > 10 detik (ayat panjang), batasi durasi tampil maksimal **10 detik (300 frames pada 30fps)** dan lakukan *audio fade-out* halus di 1 detik terakhir (frame 270–300).
   - **Aturan Panjang Teks Terjemahan:** Untuk ayat yang panjang, gunakan kutipan inti terjemahan Kemenag yang paling relevan (maksimal 25–30 kata) dengan tanda elipsis (`"..."`) agar nyaman dibaca dalam 10 detik dan tidak meluber (*overflow*) dari kartu.
   - **ZONA HENING MUTLAK:** Matikan seluruh BGM dan Micro-SFX selama `<AyahCard />` tampil demi adab Kalamullah.

3. **Bagian 3 — Penutup / CTA (`vo_cta.wav` / `vo_cta.mp3`):**
   - Berisi ajakan penutup standar (contoh: *"Follow Ada di Quran buat tahu fakta menarik lainnya, ya!"*).

---

## 4. Standar Sinematografi & Prinsip Animasi ("Cinematic 2D Storytelling & Living Physics")

Resolusi video adalah **1080 x 1920 piksel (Vertikal 9:16), 30 fps**.  
Seluruh adegan harus dibangun dengan filosofi **Film Animasi Pendek**, bukan sekadar menumpuk komponen web atau slide presentasi di layar.

### A. 5 Anti-Pattern Terlarang (Penyebab Animasi Mati & Kaku)
1. **DILARANG "Paper Doll" (Karakter Stiker Kaku):**
   - Dilarang menggerakkan karakter manusia atau maskot sebagai satu balok SVG utuh yang hanya digeser koordinat globalnya (`translate(X, Y)`) lalu digoyang tipis dengan `Math.sin(frame)`.
   - Karakter wajib memiliki **artikulasi sendi**: kepala yang menoleh mengikuti fokus adegan, mata dengan pupil hidup yang melirik ke arah aksi/ancaman, lengan dengan titik engsel bahu dan siku saat beraksi, serta perpindahan bobot tubuh (*weight shift*).
2. **DILARANG "Slide Presentasi / UI Dashboard" (Bukan Adegan Film):**
   - Dilarang keras menyajikan penjelasan perbandingan (misal: dicuci air vs digoreng minyak panas) dengan membuat **2 kotak kolom berdampingan** seperti tabel website lalu menempelkan stempel teks `[X] GAGAL!` dan `[X] KEBAL!`.
   - Seluruh perbandingan wajib divisualisasikan sebagai **Adegan Sinematik Berkesinambungan**: kamera menyorot aksi fisik satu per satu secara dramatis (contoh: air deras mengguyur $\rightarrow$ kamera beralih ke minyak mendidih meletup-letup dengan karakter molekul racun yang kebal dan santai).
3. **DILARANG Gerakan Linier Tanpa Fisika & Massa:**
   - Dilarang menggunakan `interpolate()` linier polos untuk gerakan masuk, keluar, atau benturan.
   - Semua pergerakan dinamis wajib memiliki **Anticipation (ancang-ancang 4–6f)**, **Fast Action (8–10f)**, **Overshoot & Squash/Stretch (6–8f)**, dan **Settle/Hold (15–25f)**.
4. **DILARANG Lingkungan yang "Mati" (Zero Environmental Reaction):**
   - Setiap tindakan objek utama wajib memicu **reaksi fisik pada lingkungan dan objek target**:
     - Jika menyemprot $\rightarrow$ target basah berkilau, ada kabut bervolume, partikel aerosol menyebar.
     - Jika memasak $\rightarrow$ minyak mendidih meletupkan percikan, daging menciut mendesis, asap mengepul.
     - Jika cuaca terik $\rightarrow$ ada uap panas (*heatwave shimmer*), ombak memecah pasir.
5. **DILARANG Kamera Pasif "Sudut Pandang CCTV":**
   - Dilarang mengunci kamera di posisi datar `zoom: 1.0` dari awal hingga akhir scene.
   - Kamera adalah partisipan aktif: *crane dive* dari atas ke bawah, *extreme macro zoom-in* ke pori-pori/serat mikro, *panning* mengikuti objek lari, serta *camera shake / dutch tilt* saat terjadi benturan atau kepanikan.

---

### B. Prinsip Seni Visual Vektor (Kurzgesagt-Grade Art Direction)
1. **Personifikasi Objek Sains (Memberi Jiwa pada Objek Tak Bernyawa):**
   Objek ilmiah yang menjadi pokok cerita (molekul zat kimia, racun insektisida, lalat, organ tubuh, sel darah) **wajib diberi kepribadian**: memiliki mata bulat ekspresif (*dot eyes*), pupil yang melirik, serta gestur emosional (tersenyum licik, kelelahan, panik, pusing).
2. **3 Tonal Shading Layers (Anti-Ugly Programmer Art):**
   Setiap objek utama dan mikro-aktor dilarang digambar dengan satu warna flat polos. Wajib memiliki 3 tingkatan warna:
   - *Layer 1 — Base Silhouette:* Warna lokal objek.
   - *Layer 2 — Inner Shadow / Curvature Depth:* Memberi ilusi kelengkungan dan volume 3D.
   - *Layer 3 — Bright Rim Highlight:* Garis kilau tipis di tepi objek (`stroke` atau *gradient* halus dengan opasitas ~35%) untuk memisahkannya secara tegas dari latar belakang.
3. **Bahasa Visual & Larangan Kosakata Web Developer:**
   Storyboard dan perencanaan dilarang menggunakan kata `Card`, `Badge`, `Panel`, atau `Indikator UI`. Gunakan istilah sinematografi: *Close-Up Wajan*, *Mikro-Aktor Racun*, *Aliran Fluida*, *Partikel Menyerbu*, *Ledakan Asap*.
4. **Transisi "Zoom-Portal / Match-Cut" Antar Act:**
   Perpindahan antar-act di dalam video tidak boleh terasa seperti pergantian slide PowerPoint. Akhir dari Act N melakukan *Extreme Zoom-In* atau *Pan-Wipe* menembus salah satu elemen, yang langsung menjadi pintu masuk adegan Act N+1.

---

### C. Konsistensi Dual Persona Karakter
Channel "Ada di Quran" memiliki standar konsistensi visual dua persona:
* **Character A (Host / Narator Resmi):**
  - Mengenakan **Peci Hitam Nasional** modern (potongan ramping, pas di dahi, headroom lapang minimal 200px di bawah safe zone atas).
  - Baju koko modern putih/krem bersih, celana chinos gelap, kacamata hitam wireframe, dan telinga tampak rapi utuh.
  - Bersikap tenang, santun, ilmiah, dan berwibawa saat menyampaikan fakta serta dalil Al-Qur'an.
* **Character B (Sahabat / Aktor Reaktif):**
  - Rambut gaya *modern textured messy fringe* (rapi dan kasual, tanpa spike batwing tajam).
  - Kaos t-shirt kasual / jaket santai.
  - Berperan sebagai representasi rasa ingin tahu penonton: kaget, heran, mual/pusing saat sakit, atau tertawa.

---

## 5. Struktur Direktori Proyek (Arsitektur 1 Konten = 1 Folder)
```text
D:\Dokumen\yt/
├── PROJECT_SSOT.md                          # Dokumen acuan utama proyek (file ini)
├── scripts/                                 # Script utilitas (fetch-ayah.mjs, dll.)
│
├── konten/                                  # 📦 SETIAP KONTEN HANYA 1 FOLDER MANDIRI
│   ├── 01-dua-lautan/                       # Episode 01: Fenomena Dua Lautan Tak Bercampur
│   ├── 02-manusia-fomo/                     # Episode 02: Karakter Manusia Tergesa-gesa
│   └── 03-ikan-asin/                        # Episode 03: Bahaya Ikan Asin Kimiawi (QS. Asy-Syu'ara: 183)
│       ├── BRIEF.md                         # Riset, naskah, ayat, & acuan tafsir
│       ├── vo_main.wav                      # Narasi utama Google AI Studio
│       ├── vo_cta.wav                       # Audio outro CTA
│       ├── ayah.mp3 & ayah.png              # Audio murattal & kaligrafi EveryAyah
│       ├── MainVideo.tsx                    # Komposisi root video
│       ├── subtitles.ts                     # Segmen subtitle terverifikasi
│       ├── theme.ts                         # Palet warna orisinal & kalkulasi durasi
│       └── components/                      # Act-Act sinematik terpisah & SoundEffects.tsx
│
├── public/                                  # 🎵 SHARED GLOBAL ASSETS (BGM & SFX Library)
│   ├── bgm_bossa.mp3 & bgm_rhodes.mp3
│   ├── sfx/                                 # 34 sound effects (whoosh, boing, punch, drop, dll.)
│   └── twemoji/                             # Vektor emoji SVG
│
├── src/                                     # ⚙️ BASE ENGINE (Reusable Infrastructure)
│   ├── components/                          # AyahCard, CameraRig, DynamicSubtitle, MainCharacter
│   ├── theme/                               # Typography & tokens netral
│   ├── utils/                               # subtitleTiming (Auto-proportional)
│   ├── Root.tsx                             # Registrasi Composition Remotion
│   └── index.ts                             # Entry point
│
└── out/                                     # 🎬 HASIL EXPORT FINAL (.mp4)
```

---

## 6. Protokol Kualitas Lead Animator (7 Standar Emas & Zero-Defect Gate)

Untuk menjamin setiap adegan selalu berkualitas bioskop mini, Antigravity **WAJIB** bertindak mandiri sebagai *Lead Animator* sekaligus *Adversarial Griller*.

Setiap `Act` atau `Scene` yang dibangun **DILARANG** dikunci sebagai **FINAL** sebelum lulus **7 Standar Emas**:

### Checklist 7 Standar Emas Lead Animator
1. **Bebas Pola UI & Bebas Tag `<text>` di SVG (Rule 11):**  
   Apakah adegan 100% bebas dari tabel 2 kolom, kotak kartu presentasi, dan teks/stempel di dalam SVG? (Semua teks narasi ada di `<DynamicSubtitle />` atau kartu HTML terisolasi, ilustrasi murni visual).
2. **Kamera Bergerak Aktif & Sinematik:**  
   Apakah kamera menjelajah ruang dengan *crane dive*, *macro zoom*, *panning*, atau *camera shake* pada momen benturan (bukan terpaku di zoom 1.0)?
3. **Mikro-Aktor Ekspresif & Artikulasi Karakter:**  
   Apakah objek sains memiliki personifikasi (mata/pupil hidup, mulut) dan karakter manusia bergerak dengan artikulasi sendi (bukan potongan karton flat digeser)?
4. **Fisika Organik (Anticipation, Overshoot, Squash & Stretch):**  
   Apakah gerakan utama memiliki ancang-ancang sebelum beraksi, deformasi kenyal saat menabrak, dan ayunan membal sebelum berhenti?
5. **Reaksi Lingkungan Nyata (Aksi = Reaksi):**  
   Apakah aksi objek utama mengubah lingkungan fisik di sekitarnya (basah berkilau, minyak meletup, asap mengepul, atau perubahan warna organ)?
6. **Seni Vektor 3-Layer Shading:**  
   Apakah seluruh aset memiliki kedalaman *Base, Inner Shadow,* dan *Rim Highlight* tipis sehingga objek memancarkan volume yang jelas dan nyaman di mata?
7. **Pacing & Hold Frames Tersinkronisasi Narasi:**  
   Apakah setiap puncak aksi memiliki *hold frame* (15–25f jeda apresiasi) yang mendarat tepat pada kata kunci narator, didukung oleh sound effect foley yang sinkron?

---

### Standar Audio SFX & Zona Hening Mutlak
1. **Foley SFX yang Kaya:**  
   Setiap adegan narasi (Bagian 1 & Bagian 3) wajib dilengkapi dengan mesin `SoundEffects.tsx` mandiri yang memicu sound cues taktil dari `public/sfx/` (whoosh transisi, benturan droplet, letupan gelembung, decit, suara gorengan mendidih) pada volume terukur (`0.20–0.40`).
2. **ZONA HENING MUTLAK (0 SFX PADA BAGIAN 2):**  
   Pada Sekuens Ayat Al-Qur'an (`<AyahCard />`), seluruh audio SFX dan BGM **wajib mati total 100% via programmatic safety guard** (`if (currentFrame >= ayahStart && currentFrame < ayahEnd) return null;`) demi menjaga adab, kesucian, dan kekhusyukan murattal Al-Qur'an.

---

### Zona Aman Layar Vertikal (9:16 Safe Zones)
* **Zona Subtitle Bawah (`Y: 1280px s/d 1920px`):** Dilarang menempatkan wajah karakter atau fokus utama cerita di sepertiga bawah layar (ruang `<DynamicSubtitle />` dan UI TikTok/Reels/Shorts).
* **Zona Header Atas (`Y: 0px s/d 220px`):** Dilarang menempatkan fokus utama mepet ke atas (ruang `<Watermark />` dan status bar HP). Peci dan kepala karakter wajib memiliki headroom minimal 150px di bawah batas ini.
* **Golden Center Zone (`Y: 260px s/d 1240px`):** Seluruh aksi dramatis, mikro-aktor, dan visual cerita wajib berpusat di zona emas ini.
