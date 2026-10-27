# Riset & Brief Produksi Episode 02: Kenapa Manusia Gampang Panik & Nggak Sabaran?

**Tanggal:** 27 Oktober 2026 · **Kreator:** @Ahmad Dhani Setiawan  
**Channel:** Ada di Quran  
**Acuan Arsitektur:** `PROJECT_SSOT.md` & `FOUNDATION_BACKLOG.md` (Arsitektur 1 Konten = 1 Folder Utuh)  
**Kategori Topik:** Psikologi & Kehidupan Manusia  
**Rujukan Ayat Utama:** QS. Al-Anbiya (21): 37  
**Folder Konten:** `konten/03-manusia-fomo/`

---

## 1. Status Kesiapan Aset

- [x] Topik & Ayat dikunci (QS. Al-Anbiya: 37)
- [x] Riset psikologi (*Instant Gratification Bias*) & cek tafsir (2 sumber kredibel)
- [x] Naskah final selesai ditulis (105 kata)
- [x] File suara utama (`konten/03-manusia-fomo/vo_main.wav`) sudah siap di folder konten (**Durasi: ~50.8 detik / 1.524 frames pada 30fps**)
- [ ] Unduh otomatis aset Ayat (`ayah.mp3` & `ayah.png`) via `scripts/fetch-ayah.mjs`
- [ ] Eksekusi visual Full-Scene 2D dengan *Reusable Main Character* (`konten/03-manusia-fomo/components/MainCharacter.tsx`) & sinkronisasi di Remotion via Antigravity
- [ ] Preview di Remotion Studio & render akhir ke `out/02-tergesa-gesa.mp4`

---

## 2. Ringkasan Riset & Sumber Verifikasi (Untuk Konteks & Caption)

### A. Poin Inti Psikologi & Tafsir
1. ***Instant Gratification Bias* (Psikologi Perilaku):** Otak manusia cenderung menuntut hasil langsung di depan mata dan mudah merasa cemas, panik, atau mengeluh ketika harus melewati proses panjang yang hasilnya belum terlihat.
2. **Hukum Bertahap (*Sunnatullah*):** Seperti menanam pohon dari biji, pertumbuhan yang kuat selalu membutuhkan waktu untuk berakar di bawah permukaan sebelum hasilnya tampak di atas tanah.
3. **Konteks Tafsir QS. Al-Anbiya (21): 37:** Dalam *Tafsir Kemenag RI* dan *Tafsir Al-Misbah*, kalimat *"Khuliqal-insanu min 'ajal"* (Manusia telah dijadikan bertabiat tergesa-gesa) adalah pengingat psikologis dari Allah tentang kelemahan dasar manusia agar kita tidak gegabah dan belajar bersabar mengikuti ketetapan waktu-Nya.

### B. Sumber Rujukan (Cantumkan di Caption)
- **Al-Qur'an & Tafsir:**
  1. Mushaf & Tafsir Ringkas Kementerian Agama RI — QS. Al-Anbiya (21): 37.
  2. Tafsir Al-Misbah (Prof. Dr. M. Quraish Shihab) — Pembahasan Surah Al-Anbiya ayat 37.
- **Psikologi:**
  1. *American Psychological Association (APA)* — *Delayed Gratification and Impulsivity in Human Behavior*.
  2. Studi Psikologi Perilaku Walter Mischel (*Self-Control & Instant Gratification*).

### C. Batasan Konten
- Jangan menjadikan ayat ini sebagai pembenaran untuk terus bersikap tidak sabaran; posisikan sebagai pengingat agar manusia mengenali sifat dasarnya dan belajar tenang.

---

## 3. Spesifikasi Aset Audio & Ayat (3-Part Audio System)

### Bagian 1: Narasi Utama (`vo_main.wav`)
- **Path File:** `konten/03-manusia-fomo/vo_main.wav`
- **Durasi Pasti:** **~50.8 detik (1.524 frames pada 30fps)**

### Bagian 2: Murattal & Gambar Ayat (QS. Al-Anbiya: 37)
- **Perintah CLI Unduh Aset:**
  ```bash
  npm run fetch-ayah -- --folder=03-manusia-fomo --surah=21 --ayah=37
  ```
- **Audio (`ayah.mp3`):** `konten/03-manusia-fomo/ayah.mp3` (Sumber: `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/021037.mp3`)
- **Gambar Kaligrafi (`ayah.png`):** `konten/03-manusia-fomo/ayah.png` (Sumber: `https://everyayah.com/data/images_png/21_37.png`)
- **Aturan Durasi Khusus Ayat Ini:** Putar **penuh sampai selesai** (sekitar ~11 detik) agar lantunan bacaan Qari Abu Bakr Ash-Shaatree tuntas sempurna sampai huruf terakhir, tidak terpotong kaku di detik ke-10.
- **Badge Surah:** `QS. Al-Anbiyaa (21): 37`
- **Teks Terjemahan Kemenag (Ringkas & Padat untuk `<AyahCard />`):**  
  `"Manusia telah dijadikan (bertabiat) tergesa-gesa. Kelak akan Aku perlihatkan kepadamu tanda-tanda (kekuasaan)-Ku. Maka janganlah kamu meminta Aku menyegerakannya."`

### Bagian 3: Penutup / CTA (`vo_cta.wav`)
- **Path File:** `konten/03-manusia-fomo/vo_cta.wav` (atau shared dari template)
- **Teks Subtitle CTA:** `"Follow Ada di Quran buat tahu fakta menarik lainnya, ya!"`

---

## 4. Data Naskah & 14 Segmen Subtitle (Disesuaikan dengan Jeda Napas Audio)

File subtitle tersimpan di `konten/03-manusia-fomo/subtitles.ts`:

```ts
export const EP02_SUBTITLE_SEGMENTS = [
  {
    // Segmen 1 (0.0s - 3.4s | Frame 0 - 102) - Hook Part 1
    text: "Kenapa sih manusia itu gampang banget panik dan nggak sabaran",
    highlightWords: ["gampang banget panik", "nggak sabaran"],
  },
  {
    // Segmen 2 (3.4s - 6.7s | Frame 102 - 201) - Hook Part 2 (Ada jeda napas tanda tanya)
    text: "kalau keinginannya belum tercapai sekarang juga?",
    highlightWords: ["belum tercapai", "sekarang juga?"],
  },
  {
    // Segmen 3 (6.7s - 10.2s | Frame 201 - 306)
    text: "Baru mulai usaha sebentar, udah pengen langsung sukses.",
    highlightWords: ["usaha sebentar", "langsung sukses"],
  },
  {
    // Segmen 4 (10.2s - 13.9s | Frame 306 - 417)
    text: "Baru berdoa hari ini, maunya langsung dikabulin besok pagi.",
    highlightWords: ["berdoa hari ini", "besok pagi"],
  },
  {
    // Segmen 5 (13.9s - 16.0s | Frame 417 - 480)
    text: "Kalau belum kelihatan hasilnya,",
    highlightWords: ["belum kelihatan"],
  },
  {
    // Segmen 6 (16.0s - 18.6s | Frame 480 - 558) - Transisi mood lighting
    text: "kita langsung gelisah dan ngerasa gagal.",
    highlightWords: ["langsung gelisah", "ngerasa gagal"],
  },
  {
    // Segmen 7 (18.6s - 22.8s | Frame 558 - 684)
    text: "Dalam psikologi, sifat ini berkaitan sama instant gratification bias.",
    highlightWords: ["psikologi", "instant gratification bias"],
  },
  {
    // Segmen 8 (22.8s - 26.3s | Frame 684 - 789)
    text: "Otak kita cenderung nuntut hasil instan di depan mata,",
    highlightWords: ["nuntut", "hasil instan"],
  },
  {
    // Segmen 9 (26.3s - 30.5s | Frame 789 - 915)
    text: "dan gampang mengeluh saat harus ngelewatin proses yang butuh waktu.",
    highlightWords: ["gampang mengeluh", "butuh waktu"],
  },
  {
    // Segmen 10 (30.5s - 34.0s | Frame 915 - 1020)
    text: "Padahal, hidup itu mirip kayak nanam pohon dari biji.",
    highlightWords: ["nanam pohon", "dari biji"],
  },
  {
    // Segmen 11 (34.0s - 37.7s | Frame 1020 - 1131)
    text: "Kamu nggak bisa maksa bijinya langsung berbuah besok pagi,",
    highlightWords: ["nggak bisa maksa", "langsung berbuah"],
  },
  {
    // Segmen 12 (37.7s - 41.3s | Frame 1131 - 1239)
    text: "karena dia butuh waktu buat berakar kuat di bawah tanah.",
    highlightWords: ["butuh waktu", "berakar kuat"],
  },
  {
    // Segmen 13 (41.3s - 45.7s | Frame 1239 - 1371)
    text: "Menariknya, tabiat dasar manusia yang selalu pengen serba cepat ini",
    highlightWords: ["tabiat dasar", "pengen serba cepat"],
  },
  {
    // Segmen 14 (45.7s - 50.0s | Frame 1371 - 1500)
    text: "sudah diingatkan dengan sangat pas di dalam Al-Qur'an, Surah Al-Anbiya ayat 37.",
    highlightWords: ["Al-Qur'an", "Surah Al-Anbiya ayat 37"],
  },
];
```

---

## 5. Storyboard Full-Scene 2D & Arsitektur Karakter (Frame 0–1524)

### Aturan Wajib Konsistensi Karakter (`konten/03-manusia-fomo/components/MainCharacter.tsx`):
Wajib membuat file komponen terpisah `MainCharacter.tsx` yang merender satu desain anatomi karakter *flat-geometric* yang sama persis (bentuk kepala, proporsi badan, warna baju, aksesori) dengan props ekspresi:
```ts
pose?: 'panic' | 'hopeful' | 'gloomy' | 'impatient' | 'peaceful'
```
Gunakan komponen ini di semua scene di bawah ini agar wujud tokoh utama 100% konsisten.

> ⚠️ **Larangan Keras:** Dilarang menulis teks/huruf apa pun di dalam ilustrasi SVG (gunakan ikon murni seperti trofi emas atau kalender matahari terbit tanpa tulisan teks).

---

### Scene 1A: Close-Up Kepanikan & Jarum Jam Cepat (Frame 0–201 | Detik 0.0–6.7)
* **Konteks Audio:** Segmen 1–2 (*"Kenapa sih manusia itu gampang banget panik..."*)
* **Visual & Kamera:**
  * Latar ruang kerja hangat dengan palet Warm Peach (`#FFEDD5`) dan Amber (`#F59E0B`).
  * `<CameraRig />` melakukan zoom-in dramatis ke arah `<MainCharacter pose="panic" />` yang memegang kepalanya. Di latar belakang, jarum jam raksasa berputar sangat kencang dan bilah loading terhenti di 10%.

### Scene 1B: Ekspektasi Cepat vs Rasa Gelisah (Frame 201–558 | Detik 6.7–18.6)
* **Konteks Audio:** Segmen 3–6 (*"Baru mulai usaha sebentar... langsung gelisah dan ngerasa gagal."*)
* **Visual & Kamera:**
  * Kamera zoom-out membuka ruangan secara utuh.
  * **Frame 201–306:** Karakter tersenyum optimis (`<MainCharacter pose="hopeful" />`) menatap balon pikiran berisi ikon trofi emas berkilau dan ikon lembaran kalender dengan matahari terbit (TANPA teks/tulisan).
  * **Frame 306–558:** Suasana ruangan seketika berubah meredup (*mood lighting shift* ke warna biru kelabu lembut) saat target meleset; bahu karakter merosot lemas dengan ekspresi sedih (`<MainCharacter pose="gloomy" />`).

### Scene 2: Jalan Bercabang & "Instant Gratification Bias" (Frame 558–915 | Detik 18.6–30.5)
* **Konteks Audio:** Segmen 7–9 (*"Dalam psikologi, sifat ini berkaitan sama instant gratification bias..."*)
* **Visual & Kamera:**
  * Lanskap persimpangan jalan cerah (*Sky Blue* & *Emerald*).
  * `<MainCharacter pose="impatient" />` berdiri di tengah: sisi kiri gerbang kilat instan yang menyilaukan, sisi kanan jalur proses mendaki bukit. Karakter tampak mondar-mandir tidak sabaran sambil melirik jam tangan.

### Scene 3: Analogi Menanam Biji & Penampang Tanah (Frame 915–1239 | Detik 30.5–41.3)
* **Konteks Audio:** Segmen 10–12 (*"Padahal, hidup itu mirip kayak nanam pohon dari biji..."*)
* **Visual & Kamera:**
  * **Frame 915–1131:** Taman terbuka cerah. `<MainCharacter pose="impatient" />` berjongkok memegang tunas kecil sambil menarik-nariknya pelan karena tidak sabar.
  * **Frame 1131–1239 (Vertical Camera Pan):** Kamera bergerak vertikal ke bawah menembus tanah (*soil cross-section*). Di dalam tanah yang hangat, terlihat jaringan akar bercahaya keemasan tumbuh kokoh mencengkeram bumi.

### Scene 4: Pohon Rindang, Ketenangan, & Jembatan ke Ayat (Frame 1239–1524 | Detik 41.3–50.8)
* **Konteks Audio:** Segmen 13–14 (*"Menariknya, tabiat dasar manusia yang selalu pengen serba cepat ini sudah diingatkan..."*)
* **Visual & Kamera:**
  * Kamera kembali ke permukaan taman. Pohon kini tumbuh rindang dan berbuah di bawah sinar matahari pagi keemasan (`#FBBF24`).
  * `<MainCharacter pose="peaceful" />` duduk bersandar dengan tenang, tersenyum damai, dan menarik napas lega.
  * Pada frame transisi ke Bagian 2, adegan ini dibekukan (`<Freeze />`) dan dilapisi *blur* sebagai latar belakang kemunculan `<AyahCard />` QS. Al-Anbiya (21): 37.
