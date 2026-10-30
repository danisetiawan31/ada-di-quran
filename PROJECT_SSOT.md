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
2. Klaim fakta dan konteks tafsir ayat wajib diverifikasi minimal dari 2 sumber kredibel (Tafsir muktabar + jurnal ilmiah/laporan badan resmi seperti BPOM/WHO/Kemenkes).
3. Menghindari perdebatan *khilafiyah* atau klaim cocoklogi tanpa dasar ilmiah dan tafsir yang kuat.
4. Sumber rujukan wajib dicantumkan di dokumen brief (`BRIEF.md` di tiap folder konten) dan caption video.

---

## 3. Arsitektur Audio Linear & Aset Ayat (3-Part Audio System)
Setiap video disusun menggunakan 3 komponen audio vokal berurutan (linear), didukung oleh **Ambient Soundscapes / BGM Adaptif** serta **Foley Sound Effects (SFX)** yang tersinkronisasi presisi:

### A. Aturan Pengiring Audio (Foley SFX, BGM, & Zona Hening Mutlak)
- **Foley SFX Taktil (`SoundEffects.tsx`):** Setiap adegan narasi (Bagian 1 & Bagian 3) wajib diperkaya suara lingkungan/foley dari `public/sfx/` (gemuruh air, desis angin, letupan minyak mendidih, *whoosh* transisi, *impact thud*, *elastic boing*, *drop*) pada volume terukur (`0.20–0.40`) untuk memberi rasa bobot fisik pada visual.
- **BGM Adaptif (Opsional & Kondisional):** BGM instrumental lembut dengan volume default **20%–25%** (`0.20–0.25`) aktif selama Bagian 1 untuk menjaga retensi tanpa menenggelamkan vokal narator.
- **ZONA HENING MUTLAK (0 SFX & 0 BGM pada Bagian 2):**
  - Demi menjaga adab dan kekhusyukan Kalamullah, saat masuk ke Sekuens Ayat (`<AyahCard />`), seluruh BGM dan SFX wajib hening total (100% mute).
  - **Aturan Teknis Anti-Glitch:** Untuk BGM/Ambience kontinu, gunakan `interpolate()` untuk melakukan *smooth volume fade-out* ke `0` selama 15 frame sebelum `ayahStart`. Untuk pemicu SFX diskrit di `SoundEffects.tsx`, wajib pasang *programmatic safety guard*: `if (currentFrame >= ayahStart - 10 && currentFrame < ayahEnd) return null;`.

### B. 3 Komponen Audio Utama
1. **Bagian 1 — Narasi Utama (`vo_main.wav` / `vo_main.mp3`):**
   - Berisi: Hook (0–3 detik) + Penjelasan fakta/cerita dinamis + Kalimat jembatan menuju ayat Al-Qur'an.
   - Diproduksi menggunakan **Google AI Studio Voiceover** berdasarkan naskah terencana.
   - **Sinkronisasi Subtitle (Auto-Proportional + Manual Offset):** Utilitas `subtitleTiming.ts` menghitung timing dasar proporsional teks terhadap vokal narasi dan wajib mendukung parameter `manualOffsets` (toleransi frame per baris kalimat) agar sinkronisasi vokal dan teks selalu presisi.
   - **Zero Audio Overlap Guard:** Durasi Bagian 1 (`voMainFrames`) wajib menampung durasi asli `vo_main` secara penuh ditambah jeda hening transisi mulia minimal **15–20 frame (~0.5–0.7 detik)** sebelum audio `ayah.mp3` dimulai, guna mencegah tabrakan vokal narator dengan lantunan Qari.
2. **Bagian 2 — Murattal & Visual Ayat (`ayah.mp3` & `ayah.png`):**
   - **Sumber Audio (`ayah.mp3`):** Qari **Abu Bakr Ash-Shaatree** dari EveryAyah.com (`https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/{3_digit_surah}{3_digit_ayat}.mp3`).
   - **Sumber Gambar Kaligrafi (`ayah.png`):** Gambar resmi dari EveryAyah.com (`https://everyayah.com/data/images_png/{surah}_{ayat}.png`).
   - **Aturan Durasi & Pemotongan (Maksimal 10 Detik / 300 Frames):**
     - Jika durasi asli `ayah.mp3` ≤ 10 detik, putar penuh sesuai durasi aslinya tanpa *fade-out* (volume 100% tuntas).
     - Jika durasi asli `ayah.mp3` > 10 detik (ayat panjang), batasi durasi tampil maksimal **10 detik (300 frames pada 30fps)** dan lakukan *audio fade-out* halus di 1 detik terakhir (frame 270–300).
   - **Aturan Panjang Teks Terjemahan:** Untuk ayat yang panjang, gunakan kutipan inti terjemahan Kemenag yang paling relevan (maksimal 25–30 kata) dengan tanda elipsis (`"..."`) agar nyaman dibaca dalam 10 detik dan tidak meluber (*overflow*) dari kartu.
3. **Bagian 3 — Penutup / CTA (`vo_cta.wav` / `vo_cta.mp3`):**
   - Berisi ajakan penutup standar (contoh: *"Follow Ada di Quran buat tahu fakta menarik lainnya, ya!"*).

---

## 4. Standar Sinematografi & Prinsip Animasi ("Cinematic 2D Storytelling & Living Physics")

Resolusi video adalah **1080 x 1920 piksel (Vertikal 9:16), 30 fps**.  
Seluruh adegan harus dibangun dengan filosofi **Film Animasi Pendek**, bukan sekadar menumpuk komponen web atau slide presentasi di layar.

### A. 5 Anti-Pattern Terlarang (Penyebab Animasi Mati & Kaku)
1. **DILARANG "Paper Doll" & Rotasi Poros Rusak (Karakter Stiker Kaku):**
   - Dilarang menggerakkan karakter manusia atau maskot sebagai satu balok SVG utuh yang hanya digeser koordinat globalnya (`translate(X, Y)`) lalu digoyang tipis dengan `Math.sin(frame)`.
   - Karakter wajib memiliki **artikulasi sendi**: kepala yang menoleh mengikuti fokus adegan, mata dengan pupil hidup yang melirik ke arah aksi/ancaman, lengan dengan titik engsel bahu dan siku saat beraksi, serta perpindahan bobot tubuh (*weight shift*).
   - **Aturan Teknis Rigging SVG (Anti-Detached Limb):** Setiap anggota tubuh yang berotasi (bahu, siku, leher, pergelangan) **WAJIB** dibungkus dalam grup bersarang `<g transform="translate(pivotX, pivotY)">` di mana titik engsel menjadi `(0, 0)` lokal sebelum diberikan `rotate(deg)`, sehingga sendi tidak pernah lepas atau terbang keluar poros.
2. **DILARANG "Slide Presentasi / UI Dashboard" (Bukan Adegan Film):**
   - Dilarang keras menyajikan penjelasan perbandingan dua kondisi atau dua fenomena dengan membuat **2 kotak kolom berdampingan** seperti tabel website lalu menempelkan stempel teks seperti `[X] GAGAL!` atau kartu perbandingan UI.
   - Seluruh perbandingan fenomena wajib divisualisasikan sebagai **Adegan Sinematik Berkesinambungan**: kamera menyorot aksi fisik pertama secara utuh dan dramatis, lalu berpindah/bertransisi aktif (*whip-pan / macro zoom*) ke aksi fisik kedua yang memperlihatkan kontrasnya secara visual.
3. **DILARANG Gerakan Linier Tanpa Fisika & Massa:**
   - Dilarang menggunakan `interpolate()` linier polos untuk gerakan masuk, keluar, atau benturan.
   - Semua pergerakan dinamis wajib memiliki **Anticipation (ancang-ancang 4–6f)**, **Fast Action (8–10f)**, **Overshoot & Squash/Stretch (6–8f)**, dan **Settle/Hold (15–25f)**.
   - **Wajib menggunakan mesin fisika terpusat di `src/utils/physics.ts`**:
     - `getAnticipationSpring()` untuk ancang-ancang mundur sebelum melesat.
     - `getRecoilImpulse()` untuk efek hentakan balik semprotan/benturan.
     - `getSquashAndStretch()` untuk elastisitas volume kenyal ($X \times Y = 1.0$).
     - `getContinuousWave()` untuk gelombang organik (uap, riak air, gelembung).
4. **DILARANG Lingkungan yang "Mati" (Zero Environmental Reaction):**
   - Setiap tindakan objek utama wajib memicu **reaksi fisik pada lingkungan dan objek target**:
     - Jika ada benturan/hantaman $\rightarrow$ partikel memercik, ada gelombang kejut (*shockwave*), atau permukaan bergetar.
     - Jika ada fluida/cairan mengalir $\rightarrow$ ada percikan tetesan, busa, dan riak permukaan air.
     - Jika ada suhu panas/api $\rightarrow$ ada uap/asap mengepul dinamis dan distorsi udara panas (*heatwave shimmer*).
     - Jika ada zat/partikel menempel $\rightarrow$ permukaan target berubah warna atau basah berkilau (*wet sheen*).
5. **DILARANG Kamera Pasif "Sudut Pandang CCTV":**
   - Dilarang mengunci kamera di posisi datar `zoom: 1.0` dari awal hingga akhir scene.
   - Kamera adalah partisipan aktif: *crane dive* dari atas ke bawah, *extreme macro zoom-in* ke struktur mikroskopis, *panning* dinamis mengikuti arah aksi, serta *camera shake / dutch tilt* saat terjadi benturan atau kepanikan.

---

### B. Prinsip Seni Visual Vektor (Kurzgesagt-Grade Art Direction)
1. **Personifikasi Objek Sains (Memberi Jiwa pada Objek Tak Bernyawa):**
   Objek ilmiah mikroskopis atau tak bernyawa yang menjadi fokus cerita (molekul zat, partikel kimia, sel tubuh, bakteri, organ tubuh) **wajib diberi kepribadian**: memiliki mata bulat ekspresif (*dot eyes*), pupil yang melirik, serta gestur emosional (tersenyum licik, kelelahan, panik, pusing) agar penonton memiliki ikatan empati.
2. **3 Tonal Shading Layers (Anti-Ugly Programmer Art):**
   Setiap objek utama dan mikro-aktor dilarang digambar dengan satu warna flat polos. Wajib memiliki 3 tingkatan warna:
   - *Layer 1 — Base Silhouette:* Warna lokal objek.
   - *Layer 2 — Inner Shadow / Curvature Depth:* Memberi ilusi kelengkungan dan volume 3D.
   - *Layer 3 — Bright Rim Highlight:* Garis kilau tipis di tepi objek (`stroke` atau *gradient* halus dengan opasitas ~35%) untuk memisahkannya secara tegas dari latar belakang.
3. **Hierarki Kedalaman & Kontras Warna (70-20-10 Atmospheric Rule):**
   Agar layar tidak terlihat semrawut (*visual clutter*), terapkan pemisahan kontras yang tegas:
   - **Background (70% Ruang):** Gunakan saturasi lebih rendah, gradasi atmosferik yang tenang, dan tanpa *outline* tajam.
   - **Midground Environment (20% Ruang):** Elemen panggung tempat aksi berlangsung dengan kontras menengah.
   - **Foreground / Primary Micro-Actors (10% Fokus Utama):** Gunakan warna paling kontras/cerah, *3-layer shading* penuh, dan *Rim Highlight* tajam agar mata penonton langsung terkunci pada fokus cerita di *Golden Center Zone*.
4. **Bahasa Visual & Larangan Kosakata Web Developer:**
   Storyboard dan dokumen perencanaan dilarang menggunakan kata `Card`, `Badge`, `Panel`, atau `Indikator UI`. Gunakan istilah sinematografi: *Macro Close-Up*, *Mikro-Aktor*, *Aliran Fluida*, *Partikel Menyerbu*, *Ledakan Asap*, *Match-Cut*.
5. **Transisi "Zoom-Portal / Match-Cut" Antar Act:**
   Perpindahan antar-act di dalam video tidak boleh terasa seperti pergantian slide PowerPoint. 
   - Pada 15 frame terakhir Act N, kamera melakukan **Extreme Camera Zoom-In (scale: 1 $\rightarrow$ 8–12x)** tepat ke objek target (misal: pori-pori/serat mikro atau wadah).
   - Pada 15 frame pertama Act N+1, kamera mulai dari dalam dunia mikroskopis tersebut (**scale: 0.4 $\rightarrow$ 1.0**) diiringi foley *whoosh* lembut (volume: 0.18–0.22).

---

### C. Konsistensi Karakter & Batasan Penggunaan (`MainCharacter.tsx`)
Channel "Ada di Quran" memiliki standar konsistensi visual persona manusia:
- **Character A (Host / Narator Resmi):**
  - Mengenakan **Peci Hitam Nasional** modern (potongan ramping, pas di dahi, headroom lapang minimal 200px di bawah safe zone atas).
  - Baju koko modern putih/krem bersih, celana chinos gelap, kacamata hitam wireframe, dan telinga tampak rapi utuh.
  - **Peruntukan Khusus:** Dipakai HANYA sebagai presenter narasi resmi dan pengantar ayat suci di akhir Bagian 1 (Preamble Ayat).
- **Character B (Sahabat / Aktor Reaktif):**
  - Rambut gaya *modern textured messy fringe* (rapi dan kasual, tanpa spike batwing tajam).
  - Kaos t-shirt kasual / jaket santai.
  - Dipakai saat menggambarkan reaksi manusia di dunia nyata (kaget, heran, mual/pusing di ruang makan).
- **Adab Representasi Hal Gaib:** Nabi, Malaikat, atau hal gaib dilarang keras divisualisasikan wujud atau siluet tubuhnya; wajib direpresentasikan dengan **pancaran cahaya keemasan (`<SacredLight />`)**.
- **BATASAN MUTLAK (Anti-Paper Doll pada Adegan Aksi Sains):**
  - **DILARANG** memaksakan memasukkan patung full-body `MainCharacter` berdiri kaku di panggung adegan aksi fisik (seperti proses penjemuran, memasak, atau reaksi zat kimia).
  - Pada adegan aksi fisik, **WAJIB** beralih ke:
    1. **Articulated Close-Ups:** Sorot anggota tubuh berengsel (lengan berotot yang menekan kaleng, tangan yang menuang cairan) dengan titik engsel sendi yang jelas.
    2. **Living Micro-Actors:** Berikan fokus cerita kepada objek sains (lalat, ikan, molekul racun, sel darah, organ tubuh) yang diberi kepribadian dan mata hidup.

---

### D. Standar Visual `<AyahCard />` & Latar `<Freeze />` (Bagian 2)
- **Continuity Freeze & Blur:** Saat masuk ke Bagian 2 (Sekuens Ayat), visual adegan terakhir dari Bagian 1 wajib dipertahankan di lapisan bawah menggunakan `<Freeze />` Remotion dan diberi efek redup + *blur* (`backdropFilter: 'blur(12px)'`, `backgroundColor: 'rgba(10, 17, 40, 0.78)'`) sehingga suasana cerita tidak terputus menjadi layar kosong.
- **Illuminated Mushaf Container:** Kartu ayat menggunakan latar kertas mushaf hangat **Warm Cream (`#FDFBF7`)** dengan aksen bingkai Amber (`#FBBF24`) serta badge nama surah & nomor ayat.
- **Seamless Calligraphy Blending:** Gambar `ayah.png` dirender dengan `objectFit: 'contain'` dan **`mixBlendMode: 'multiply'`** agar latar putih/abu-abu bawaan EveryAyah lebur 100% dengan warna kertas *Warm Cream*.
- **Waveform & Anti-Overflow Translation:** Dilengkapi *Audio Waveform* halus berwarna Amber di bawah kaligrafi dan teks terjemahan Kemenag dengan logika *Auto-Scale Font Size* (otomatis menyesuaikan ukuran huruf jika teks panjang agar tidak pernah *overflow*).

---

### E. Zona Aman Layar Vertikal (9:16 Safe Zones)
- **Zona Header Atas (`Y: 0px s/d 220px`):** Ruang `<Watermark />` dan status bar HP. Peci dan kepala karakter wajib memiliki headroom minimal 150px–200px di bawah batas ini.
- **Golden Center Zone (`Y: 260px s/d 1240px`):** Seluruh aksi dramatis, wajah karakter, mikro-aktor, dan `<AyahCard />` wajib berpusat di zona emas ini.
- **Zona Subtitle Bawah (`Y: 1280px s/d 1920px`):** Ruang khusus `<DynamicSubtitle />` (dilengkapi *bottom dark vignette* halus) dan UI TikTok/Reels/Shorts. Dilarang menempatkan fokus utama cerita di area ini.

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
│   ├── utils/                               # physics.ts (Anticipation, Recoil, Squash-Stretch, Wave), subtitleTiming.ts
│   ├── Root.tsx                             # Registrasi Composition Remotion
│   └── index.ts                             # Entry point
│
└── out/                                     # 🎬 HASIL EXPORT FINAL (.mp4)
```

## 6. Protokol Kualitas Lead Animator & Eksekusi Modular Per-Act (Zero-Defect Gate)
Untuk menjamin setiap adegan selalu berkualitas bioskop mini dan mencegah AI kehabisan output token sehingga adegan digambar asal-asalan, Antigravity WAJIB bertindak mandiri sebagai Lead Animator sekaligus Adversarial Griller dengan mematuhi protokol arsitektur dan siklus kerja berikut:

### A. Aturan Baku Arsitektur File (Wajib 1 Act = 1 File Terpisah)
1. **DILARANG KERAS File Raksasa (Monolithic File Anti-Pattern):** Dilarang keras menulis seluruh adegan atau menggabungkan banyak Act ke dalam satu file tunggal (misal membuat file 1.500+ baris). Menulis adegan sekaligus dalam 1 file menyebabkan AI kehabisan output token, menghasilkan detail visual yang malas, dan memicu context drift.
2. **WAJIB Modular 1 Act = 1 File Mandiri:** Setiap episode wajib dipecah menjadi 3–4 file Act terpisah di dalam folder components/ (misal: Act1_*.tsx, Act2_*.tsx, Act3_*.tsx, Act4_*.tsx). Dengan 1 file per Act, AI dapat mengerahkan 100% kapasitas komputasi dan tokennya untuk mengukir detail mikro, 3-layer shading, dan fisika gerak secara maksimal.
3. **Penyambungan Antar-Act via "Zoom-Portal / Match-Cut":** Meskipun kode terpisah bersih per-file, akhir Act N (15 frame terakhir zoom-in scale: 1 $\rightarrow$ 8–12x) dan awal Act N+1 (15 frame pertama zoom-in scale: 0.4 $\rightarrow$ 1.0) wajib disambung secara presisi sehingga di layar penonton terasa sebagai satu perjalanan kamera sinematik tanpa putus.

### B. Siklus Kerja Mandiri "Sequential Per-Act Loop" (Wajib Berurutan)
Setiap episode wajib dikerjakan dengan siklus berurutan tuntas:
1. **Langkah 1 — Pembangunan Act N:** Buat file terpisah ActN_*.tsx dan selesaikan detail visualnya sesuai naskah & storyboard di BRIEF.md.
2. **Langkah 2 — 3-Point Keyframe Self-Audit (npx remotion still):** Render minimal 3 frame kunci berurutan pada setiap Act:
   - *Frame A (Entry / Anticipation):* Memastikan posisi awal & transisi masuk Zoom-Portal bersih tanpa cacat potong (*clipping*).
   - *Frame B (Peak Impact / Action):* Memastikan efek Squash & Stretch, reaksi lingkungan, dan artikulasi sendi tidak lepas dari porosnya.
   - *Frame C (Settle / Hold):* Memastikan komposisi akhir Act berada tepat di Golden Center Zone (Y: 260px–1240px).  
   *Periksa ketiga gambar hasil render menggunakan tool pembaca gambar secara langsung.*
3. **Langkah 3 — Evaluasi 7 Standar Emas:** Uji hasil render still menggunakan Checklist 7 Standar Emas di bawah ini. Jika ada cacat (*stiff*, sendi lepas, *clipping*, kontras buruk), langsung perbaiki kode saat itu juga.
4. **Langkah 4 — Lock as FINAL:** Setelah Act N lulus 100% dan dikunci sebagai FINAL, barulah Antigravity diizinkan membuat file Act(N+1)_*.tsx. DILARANG membuat file Act berikutnya sebelum Act sebelumnya selesai dan lulus audit!
5. **Langkah 5 — Render Gate:** Setelah seluruh Act 1 s/d 4 dan sekuens Ayat/CTA selesai dikunci FINAL, Antigravity DILARANG menjalankan render video penuh (npx remotion render) sebelum ada instruksi eksplisit dari pengguna.

### C. Checklist 7 Standar Emas Lead Animator
1. [ ] **Bebas Pola UI & Bebas Tag `<text>` di SVG (Rule 11):** Apakah adegan 100% bebas dari tabel 2 kolom, kotak kartu presentasi, stempel teks, dan tag `<text>` di dalam SVG? (Semua teks narasi vokal wajib ada di `<DynamicSubtitle />`, dunia ilustrasi murni bercerita lewat aksi visual dan metafora gerak, tanpa kartu teks tambahan kecuali `<AyahCard />` & `<ClosingCta />`).
2. [ ] **Kamera Bergerak Aktif & Sinematik:** Apakah kamera menjelajah ruang dengan *crane dive*, *macro zoom*, *panning*, atau *camera shake* pada momen benturan (bukan terpaku di zoom 1.0)?
3. [ ] **Mikro-Aktor Ekspresif & Rigging Sendi Presisi:** Apakah objek sains memiliki personifikasi (mata/pupil hidup, mulut) dan anggota tubuh karakter berputar tepat pada titik engsel `<g transform="translate(pivotX, pivotY)">` (bukan potongan karton flat digeser atau berputar liar)?
4. [ ] **Fisika Organik (Anticipation, Overshoot, Squash & Stretch):** Apakah gerakan utama memiliki ancang-ancang sebelum beraksi, deformasi kenyal saat menabrak, dan ayunan membal sebelum berhenti menggunakan `src/utils/physics.ts`?
5. [ ] **Reaksi Lingkungan Nyata (Aksi = Reaksi):** Apakah aksi objek utama mengubah lingkungan fisik di sekitarnya (basah berkilau, minyak meletup, asap mengepul, atau perubahan warna organ)?
6. [ ] **Seni Vektor 3-Layer Shading & Kontras 70-20-10:** Apakah seluruh aset memiliki kedalaman Base, Inner Shadow, dan Rim Highlight tipis, serta kontras warna objek utama menonjol tajam di atas latar belakang?
7. [ ] **Pacing, Hold Frames & Kepatuhan Audio:** Apakah setiap puncak aksi memiliki *hold frame* (15–25f jeda apresiasi) yang mendarat tepat pada kata kunci narator, didukung foley SFX yang sinkron di Bagian 1, dan hening mutlak (0 SFX/BGM) saat masuk `<AyahCard />`?
