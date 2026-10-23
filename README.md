# YouTube Shorts / Reels Remotion Studio

Proyek generator video edukasi berbasis **Remotion (React + TypeScript)** dengan arsitektur **multi-konten modular** dan aset yang dapat digunakan kembali (*reusable*).

---

## 📁 Struktur Workspace

```text
yt/
├── konten/                     # 📦 SETIAP KONTEN HANYA 1 FOLDER
│   ├── 01-gelitik/             # Video 1: Kenapa Tidak Bisa Menggelitik Diri Sendiri
│   │   ├── BRIEF.md            # Riset, naskah, & hook
│   │   ├── voiceover.mp3       # Audio narasi video 1
│   │   ├── MainVideo.tsx       # Komposisi visual video 1
│   │   ├── theme.ts            # Dimensi & warna video 1
│   │   └── components/         # Scene-scene video 1
│   ├── 02-senyum-al-quran/     # Video 2 (Siap dibuat)
│   └── _template/              # Template instan untuk video baru
│
├── public/                     # 🎵 SHARED ASSETS (Dipakai bersama semua video)
│   ├── bgm_bossa.mp3           # BGM santai organik (Bossa)
│   ├── bgm_rhodes.mp3          # BGM chill lo-fi (Airport Lounge)
│   ├── sfx/                    # 26 efek suara (whoosh, pop, boing, chime, dsb.)
│   └── twemoji/                # Vektor emoji SVG
│
├── src/                        # ⚙️ REMOTION REUSABLE ENGINE
│   ├── Root.tsx                # Registry Composition (daftarin semua video di sini)
│   ├── index.ts                # Entry point
│   ├── declarations.d.ts       # Module support (.mp3, .wav, .svg, dll.)
│   └── shared/                 # Komponen & modul reusable
│       └── components/
│           └── BackgroundMusic.tsx # Universal auto-fading BGM player
│
├── out/                        # 🎬 HASIL EXPORT VIDEO (.mp4)
│   └── VideoGelitik_v2.mp4
│
└── package.json
```

---

## 🚀 Perintah Dasar

### 1. Jalankan Studio Preview (Browser)
```bash
npm start
```
Buka browser di `http://localhost:3000`. Kamu bisa memilih konten mana yang mau di-preview lewat dropdown sidebar kiri.

### 2. Render Video Tertentu
```bash
# Render Konten 1:
npx remotion render VideoGelitik out/gelitik.mp4

# Render Konten 2:
# npx remotion render VideoSenyum out/senyum.mp4
```

---

## 💡 Cara Menambah Konten Baru (Cepat & Rapi)
1. Duplikat folder `konten/_template/` menjadi `konten/02-[nama-konten]/`.
2. Masukkan file `BRIEF.md` dan audio `voiceover.mp3` ke folder baru tersebut.
3. Buka [`src/Root.tsx`](src/Root.tsx), daftarkan komposisi baru dengan menambahkan:
   ```tsx
   import { MainVideo as VideoSenyum } from "@konten/02-senyum-al-quran/MainVideo";
   import { THEME as SENYUM_THEME } from "@konten/02-senyum-al-quran/theme";

   // Di dalam RemotionRoot:
   <Composition
     id="VideoSenyum"
     component={VideoSenyum}
     durationInFrames={SENYUM_THEME.dimensions.durationInFrames}
     fps={SENYUM_THEME.dimensions.fps}
     width={SENYUM_THEME.dimensions.width}
     height={SENYUM_THEME.dimensions.height}
   />
   ```
