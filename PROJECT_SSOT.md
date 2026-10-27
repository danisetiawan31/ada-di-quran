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
4. Sumber rujukan wajib dicantumkan di dokumen brief (`BRIEF.md` di tiap folder konten) dan caption video.

---

## 3. Arsitektur Audio Linear & Aset Ayat (3-Part Audio System)
Setiap video disusun menggunakan 3 komponen audio vokal berurutan (linear), didukung oleh **Ambient Soundscapes / BGM Adaptif** untuk menjaga retensi penonton:

- **Aturan Pengiring Audio (Ambience & BGM):**
  - **Fokus Utama — Ambient Soundscapes & Foley:** Menggunakan suara lingkungan alami yang sesuai konteks topik (contoh: gemuruh ombak bawah air untuk oseanografi, hembusan angin gurun untuk sejarah/alam, detak jantung atau cinematic sub-bass untuk biologi/medis) serta SFX halus (transisi *whoosh*, kilauan cahaya saat ayat muncul). Hal ini membuat video terasa sinematik dan hidup tanpa terasa "kering" atau canggung di sela nafas narator.
  - **BGM Adaptif (Opsional & Kondisional):** BGM instrumental/lo-fi lembut dengan volume default **25%** (`0.25`) digunakan selama Bagian 1 untuk menjaga retensi dan suasana cerita tanpa menenggelamkan vokal narator.
  - **Kekhusyukan Ayat (Bagian 2):** Saat masuk ke pembacaan ayat Al-Qur'an, BGM/ambience wajib diheningkan total (*full mute*) atau diturunkan drastis (*ducking*) agar murattal terdengar jernih, agung, dan khusyuk.

1. **Bagian 1 — Narasi Utama (`vo_main.wav` / `vo_main.mp3`):**
   - Berisi: Hook (0–3 detik) + Penjelasan fakta/cerita + Kalimat jembatan menuju ayat Al-Qur'an.
   - Diproduksi menggunakan **Google AI Studio Voiceover** berdasarkan naskah yang disusun pada tahap *planning*.
   - **Sinkronisasi Subtitle (Auto-Proportional + Manual Offset):** Perhitungan rasio panjang karakter teks terhadap total durasi vokal narasi dijadikan sebagai *baseline* otomatis. Namun, karena rekaman suara narator memiliki dinamika tempo, jeda nafas, dan jeda dramatis, utilitas `subtitleTiming.ts` wajib mendukung parameter **`manualOffsets` (toleransi pergeseran frame per baris kalimat)** agar sinkronisasi teks dan suara bisa disempurnakan secara presisi saat preview tanpa meleset.
2. **Bagian 2 — Murattal & Visual Ayat (`ayah.mp3` & `ayah.png`):**
   - **Sumber Audio (`ayah.mp3`):** Qari **Abu Bakr Ash-Shaatree** dari EveryAyah.com (`https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/{3_digit_surah}{3_digit_ayat}.mp3`).
   - **Sumber Gambar Kaligrafi (`ayah.png`):** Gambar resmi dari EveryAyah.com (`https://everyayah.com/data/images_png/{surah}_{ayat}.png`).
   - **Aturan Durasi & Pemotongan (Maksimal 10 Detik / 300 Frames):**
     - Jika durasi asli `ayah.mp3` ≤ 10 detik, putar penuh sesuai durasi aslinya tanpa *fade-out* (volume 100% tuntas).
     - Jika durasi asli `ayah.mp3` > 10 detik (ayat panjang), batasi durasi tampil maksimal **10 detik (300 frames pada 30fps)** dan lakukan *audio fade-out* halus di 1 detik terakhir (frame 270–300).
   - **Aturan Panjang Teks Terjemahan:** Untuk ayat yang panjang, gunakan kutipan inti terjemahan Kemenag yang paling relevan (maksimal 25–30 kata) dengan tanda elipsis (`"..."`) agar nyaman dibaca dalam 10 detik dan tidak meluber (*overflow*) dari kartu.
3. **Bagian 3 — Penutup / CTA (`vo_cta.wav` / `vo_cta.mp3`):**
   - Berisi: Ajakan penutup standar (contoh: *"Follow Ada di Quran buat tahu fakta menarik lainnya, ya!"*).

---

## 4. Standar Visual & Prinsip Animasi Remotion ("Full-Scene 2D Storytelling")
- **Resolusi & Frame Rate:** 1080 x 1920 piksel (Vertikal 9:16), 30 fps.
- **Bebas Warna Acuan (100% Bebas & Independen per Topik):** Channel "Ada di Quran" **TIDAK MEMILIKI WARNA ACUAN GLOBAL (dilarang mematok tema navy atau tema warna tunggal lainnya)**. Setiap topik pembahasan memiliki kebebasan penuh merancang palet warna orisinal di dalam file tema lokalnya masing-masing (`theme.ts` per konten):
  - **Alam & Hidrologi:** Biru samudra, toska, pecahan busa putih.
  - **Tumbuhan & Botani:** Hijau zamrud, kuning madu, cokelat tanah humus.
  - **Anatomi & Medis:** Merah marun sel darah, merah muda, krem jaringan tubuh.
  - **Sejarah & Gurun:** Kuning pasir, terakota, oranye senja, batu karang.
  - **Astronomi & Langit:** Hitam kosmik, ungu nebula, perak bintang.
  Seluruh komponen dasar mesin (*base engine*) seperti *overlay blur*, gradasi subtitle (*dark vignette*), dan kanvas dasar wajib bersifat netral (*color-agnostic* hitam netral transparan) agar tidak pernah mengotori atau membiaskan warna alami tema video apa pun.
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
- Saat masuk Bagian 2, adegan ilustrasi terakhir dari Bagian 1 **tetap dipertahankan di layar bawah dalam kondisi dibekukan (`<Freeze />`)**, lalu dilapisi *overlay* gelap netral transparan dan *blur* (`backdropFilter: 'blur(14px)'`, `backgroundColor: 'rgba(0, 0, 0, 0.75)'`).
- Di tengah layar muncul kartu Mushaf berwarna **Warm Cream (`#FDFBF7`)** dengan aksen bingkai Amber (`#FBBF24`).
- Gambar `ayah.png` dirender dengan properti CSS **`mixBlendMode: 'multiply'`** agar latar putih bawaan EveryAyah menyatu 100% dengan warna kertas kartu.
- Dilengkapi **Audio Waveform Visualizer** berwarna Amber di bawah kaligrafi serta teks terjemahan Kemenag dengan fitur **Auto-Scale Font Size** agar terjemahan tidak pernah *overflow*.

### D. Aturan Tipografi & Subtitle (`<DynamicSubtitle />`)
- Gunakan font sans-serif modern (`Plus Jakarta Sans` atau `Inter`).
- Berikan *dark vignette* (gradasi gelap halus) di bagian bawah layar agar teks selalu kontras di atas ilustrasi apa pun.
- Tampilkan maksimal 1–2 baris pendek di sepertiga bawah layar dengan *highlight* warna aksen pada kata kunci. Teks narasi dilarang dimasukkan ke dalam ilustrasi SVG.

---

## 5. Struktur Direktori Proyek (Arsitektur 1 Konten = 1 Folder)
```text
D:\Dokumen\yt\
├── PROJECT_SSOT.md              # Dokumen acuan utama proyek (file ini)
├── FOUNDATION_BACKLOG.md        # Backlog pembangunan pondasi Base Engine
├── scripts/                     # Script utilitas (fetch-ayah.mjs untuk unduh aset ke folder konten)
│
├── konten/                      # 📦 SETIAP KONTEN HANYA 1 FOLDER UTUH
│   ├── 01-gelitik/              # Konten 1: Kenapa Geli (Arsip)
│   └── 02-dua-lautan/           # Konten 2 / Episode 1 "Ada di Quran"
│       ├── BRIEF.md             # Riset, naskah, & hook
│       ├── vo_main.wav          # Audio narasi utama (dari Google AI Studio)
│       ├── vo_cta.wav           # Audio penutup CTA (dari Google AI Studio)
│       ├── ayah_19.mp3 & .png   # Murattal & kaligrafi ayat 19 (EveryAyah)
│       ├── ayah_20.mp3 & .png   # Murattal & kaligrafi ayat 20 (EveryAyah)
│       ├── MainVideo.tsx        # Komposisi utama episode ini
│       ├── theme.ts             # Pengaturan tema/durasi episode
│       └── components/          # Scene-scene visual 2D
│
├── public/                      # 🎵 SHARED GLOBAL ASSETS (BGM & SFX Library)
│   ├── bgm_bossa.mp3 & rhodes.mp3
│   ├── sfx/                     # 26 efek suara komik & bioskop
│   └── twemoji/                 # Vektor emoji SVG
│
├── src/                         # ⚙️ BASE ENGINE (Reusable Engine)
│   ├── components/              # AyahCard, CameraRig, DynamicSubtitle, SacredLight, EpisodeLayout
│   ├── theme/                   # Tokens, fonts, surahList (114 Surah)
│   ├── utils/                   # subtitleTiming (Auto-proportional)
│   ├── declarations.d.ts        # Dukungan import aset audio & gambar langsung
│   ├── Root.tsx                 # Registrasi Composition Remotion
│   └── index.ts                 # Entry point
│
└── out/                         # 🎬 HASIL EXPORT FINAL (.mp4)
```

---

## 6. Protokol Eksekusi Mandiri & Standar Mutlak Kualitas Visual (Zero-Defect Quality Gate)

Untuk menghilangkan iterasi manual yang monoton dari sisi pengguna, Antigravity **WAJIB** bertindak sebagai *Lead Animator* sekaligus *Quality Assurance (Viewer Kritis)* secara mandiri. 

Antigravity **DILARANG KERAS**:
1. Menulis seluruh scene episode di dalam satu file tunggal (`index.tsx`).
2. Mengerjakan semua scene sekaligus dalam kondisi draf lalu baru mengevaluasinya di akhir.
3. Berhenti di tengah jalan untuk meminta validasi pengguna per-scene.
4. Menjalankan render video penuh (`npx remotion render`) sebelum ada perintah eksplisit dari pengguna.

Setiap kali mengeksekusi sebuah episode (`BRIEF.md` per folder konten), Antigravity wajib menjalankan **Sequential Per-Scene Loop** (Selesaikan `Scene 1` hingga 100% lulus *Quality Gate*, kunci sebagai **FINAL**, baru boleh membuat file `Scene 2`, dst.).

---

### A. Siklus Kerja Mandiri Per-Scene (Wajib Dijalankan Berurutan)

Untuk setiap scene (`Scene1.tsx`, `Scene2.tsx`, dst.), lakukan siklus 4 langkah ini secara tuntas:

1. **Langkah 1 — Initial Scene Construction:**
   - Buat file terpisah `SceneX.tsx` di dalam folder `components/` sesuai rincian Storyboard di dokumen Brief.
2. **Langkah 2 — Deep Viewer Self-Audit (Posisikan Diri Sebagai Penonton Kritis):**
   - Render minimal 1 frame still kunci (`npx remotion still`) pada momen puncak aksi/komposisi scene tersebut.
   - Periksa gambar hasil render secara visual menggunakan tool pembaca gambar.
   - Evaluasi visual tersebut menggunakan **20 Syarat Mutlak (Bagian B)** di bawah ini. Cari seluruh celah yang membuat penonton bosan, ilusi anatomi aneh, tabrakan subtitle, area kosong (*void*), atau gerakan kaku.
3. **Langkah 3 — Immediate Rewrite & Polish (Lock as FINAL):**
   - Tanpa bertanya kepada pengguna, **langsung tulis ulang dan perbaiki `SceneX.tsx`** saat itu juga untuk menambal seluruh kekurangan dari Langkah 2.
   - Pastikan 100% syarat di Bagian B terpenuhi. Setelah `SceneX.tsx` berstatus **FINAL**, barulah lanjut membuat `Scene(X+1).tsx`.
4. **Langkah 4 — Penyelesaian Siklus & Siaga Render (Render Gate):**
   - Setelah seluruh scene (`Scene 1` s/d `Scene Penutup`) dan sekuens Ayat/CTA selesai dikunci sebagai **FINAL**:
   - Antigravity **DILARANG KERAS** menjalankan render video penuh (`npx remotion render`).
   - Antigravity wajib menyajikan ringkasan kelulusan *Quality Gate* beserta cuplikan frame still kunci, lalu **berhenti dan siaga menunggu instruksi eksplisit pengguna** (misal: *"render full"* / *"render video"*).

---

### B. 20 Syarat Mutlak "Viewer Betah, Playful & Anti-Cacat" (Wajib Lulus 100% di Tiap Scene)

Sebuah `SceneX.tsx` **DILARANG** dinyatakan selesai apabila melanggar satu saja dari 5 pilar kualitas berikut:

#### Pilar 1: Psikologi Retensi Penonton (Apa yang Bikin Viewer Betah)
1. **Aturan 3 Detik (Visual Change Rate):** Mata penonton vertikal mudah bosan. Di dalam satu scene yang berdurasi > 5 detik (150 frames), **wajib** ada perubahan visual yang jelas setiap 90–120 frames (misal: perubahan sudut `<CameraRig />`, kemunculan objek pendukung baru, perubahan ekspresi karakter, atau pergeseran *mood* pencahayaan).
2. **Kejelasan Fokus Utama (1 Detik Paham):** Saat scene dimulai, penonton harus langsung tahu ke mana mata mereka harus melihat dalam < 1 detik. Objek utama wajib memiliki kontras warna paling menonjol dibanding latar belakang.
3. **Skala Objek Proporsional (Anti-Kekecilan):** Objek utama atau karakter tidak boleh terlihat kerdil di tengah layar. Fokus utama wajib mengisi **40% hingga 65% dari area tengah layar**.
4. **Keseimbangan Komposisi (3-Layer Depth):** Setiap scene wajib memiliki minimal 3 lapisan kedalaman:
   - *Background Layer:* Langit/dinding ruangan/lanskap dengan gradasi kaya (`<linearGradient>` / `<radialGradient>`), bukan warna flat.
   - *Midground Layer:* Karakter utama dan objek interaksi cerita.
   - *Foreground / Ambient Layer:* Elemen siluet di tepi layar, partikel debu cahaya, daun melayang, atau gelembung untuk menciptakan efek kedalaman 2.5D.

#### Pilar 2: Standar "Playful & Hidup" (Larangan Animasi Kaku)
5. **Larangan Mutlak Gerakan Linear pada Objek:** Dilarang memunculkan atau menggerakkan objek utama hanya dengan `interpolate()` linear yang kaku. Semua objek masuk (*entrance*), keluar (*exit*), dan perubahan skala wajib menggunakan `spring()` dengan konfigurasi kenyal (*bouncy overshoot*, contoh: `damping: 10–14`, `stiffness: 100–140`).
6. **Hukum "Layar Tidak Boleh Mati" (Continuous Secondary Motion):** Meskipun narasi sedang menjelaskan sesuatu dan kamera sedang diam, **tidak boleh ada frame yang membeku seperti gambar statis**. Wajib ada minimal 2 gerakan mikro berkelanjutan menggunakan `Math.sin(frame / speed)`:
   - Karakter yang "bernapas" (bahu/dada naik-turun halus `2–4px`) dan mata yang berkedip periodik.
   - Awan yang bergeser, daun yang bergoyang, air yang beriak, atau partikel cahaya yang mengapung.
7. **Antisipasi & Follow-Through (Squash & Stretch):** Saat objek membesar atau melompat, berikan sedikit efek gepeng/memanjang (*scaleX* vs *scaleY* yang berlawanan tipis `0.95` ke `1.05`) agar terasa kenyal seperti kartun studio profesional.
8. **Rotasi Dinamis:** Saat sebuah ikon, balon pikiran, atau kartu muncul di layar, jangan hanya di-*scale* dari `0` ke `1`, tetapi sertakan sedikit rotasi mengayun (misal dari `-8deg` ke `0deg` dengan `spring()`) agar terasa *playful*.

#### Pilar 3: Pencegahan Cacat Visual & Anatomi (Anti-Jelek / Anti-Berantakan)
9. **Konsistensi Anatomi & Rigging Karakter:** Jika episode menggunakan karakter manusia (`MainCharacter.tsx`), bagian tubuh (kepala, badan, lengan, tangan) harus menyatu pada titik engsel (*pivot point / transformOrigin*) yang benar. **Dilarang keras** membuat tangan/kaki yang melayang terputus dari badan atau proporsi kepala dan tubuh yang berubah-ubah antar-scene.
10. **Larangan Bentuk Geometri Mentah (No Raw Boxes):** Dilarang menggambar objek seperti meja, pohon, awan, atau batu hanya dengan `<rect>` tajam atau `<circle>` polos. Wajib gunakan sudut membulat (`rx`), kurva Bezier halus, tumpukan *shading* (bayangan gelap & *highlight* terang), serta gradasi warna.
11. **Larangan Keras Teks di Dalam Ilustrasi SVG:** Dilarang merender tag `<text>` atau huruf/kata apa pun di dalam gambar ilustrasi SVG (seperti di dalam balon pikiran, rambu jalan, atau layar laptop). Semua informasi di dalam ilustrasi wajib direpresentasikan dengan **simbol/ikon visual murni** agar tidak bertabrakan dengan teks `<DynamicSubtitle />`.
12. **Anti-Clipping & Overflow:** Pastikan saat `<CameraRig />` melakukan *zoom-in* atau *panning*, pinggiran kanvas latar belakang tidak bocor memperlihatkan ruang kosong/hitam (buat ukuran kanvas *background* minimal `120%–140%` dari ukuran layar 1080x1920 saat ada kamera *pan/zoom*).

#### Pilar 4: Tata Letak & Zona Aman Layar Vertikal (9:16 Safe Zones)
13. **Zona Terlarang Bawah (Subtitle Safe Zone — `Y: 1280px s/d 1920px`):** Area sepertiga bawah layar adalah milik `<DynamicSubtitle />` dan UI TikTok/Reels/Shorts. **Dilarang keras** menempatkan wajah karakter, objek penting, atau fokus cerita di bawah koordinat `Y = 1280px`.
14. **Zona Terlarang Atas (Header/Watermark Safe Zone — `Y: 0px s/d 220px`):** Area paling atas adalah ruang untuk `<Watermark />` dan status bar HP. Fokus utama cerita harus berada di **Golden Center Zone (`Y: 300px s/d 1250px`)**.
15. **Zona Aman Tepi Kanan (UI Buttons Safe Zone — `X: 920px s/d 1080px`):** Hindari menaruh detail visual krusial terlalu mepet ke tepi kanan layar karena di TikTok/Reels/Shorts terdapat deretan tombol Like/Comment/Share.
16. **Kontras Subtitle Mutlak:** Pastikan *dark vignette* di bagian bawah layar selalu aktif di atas ilustrasi terang sekalipun, sehingga teks `<DynamicSubtitle />` berwarna putih/aksen selalu terbaca 100% jelas tanpa menyilaukan mata.

#### Pilar 5: Kontinuitas Transisi, Audio & Ayat
17. **Transisi Antar-Scene yang Mulus:** Perpindahan dari `Scene 1` ke `Scene 2` (dan seterusnya) tidak boleh terasa patah (*jarring cut*). Gunakan pergerakan kamera berkesinambungan (misal: *camera pan* menembus objek/tanah) atau *smooth cross-dissolve / wipe* selama 10–15 frames.
18. **Kesesuaian Mood Warna dengan Konteks Cerita (Mood-Driven Palette):** Jangan terpaku pada satu warna gelap. Sesuaikan suhu warna latar dengan emosi kalimat: hangat/cerah saat membahas keseharian atau alam siang hari, teduh/sejuk saat membahas ketenangan, dan redup/kontras saat membahas kebingungan.
19. **Transisi `<Freeze />` & Blur ke `<AyahCard />`:** Pastikan tepat saat `vo_main.mp3` berakhir, frame terakhir dari scene penutup tetap membeku dengan indah di latar belakang, dilapisi *blur* halus (`backdropFilter: 'blur(14px)'`) dan *dark overlay* (`rgba(0, 0, 0, 0.75)`), sehingga kartu Mushaf tampil menonjol dan agung.
20. **Sinkronisasi Aksi Visual dengan Kata Kunci Subtitle:** Setiap kali narator mengucapkan kata kunci yang di-*highlight* pada `<DynamicSubtitle />`, aksi visual utama di dalam scene (seperti balon pikiran meletus, tunas ditarik, atau akar tumbuh) **wajib terjadi tepat pada rentang frame segmen subtitle tersebut**, bukan lebih cepat atau terlambat.
