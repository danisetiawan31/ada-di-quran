# Riset & Brief Produksi Video 1: Kenapa Kita Tidak Bisa Menggelitik Diri Sendiri

Oct 8, 2026 · @Ahmad Dhani Setiawan (Direvisi untuk Produksi Remotion)

Dokumen ini menyimpan konteks channel, hasil riset, naskah final, dan spesifikasi produksi video menggunakan **Remotion (React/TypeScript)**, agar siap dieksekusi langsung oleh AI (Antigravity).

---

## 1. Konteks Channel (untuk AI)

- **Nama kandidat channel:** Eh Lo Tau Nggak? (masih kandidat utama, belum final).
- **Tujuan:** belajar dulu, penghasilan dalam jangka panjang.
- **Audiens:** umum, usia 16 tahun ke atas.
- **Platform dan durasi:** TikTok, Instagram Reels, YouTube Shorts, sekitar 60 detik.
- **Gaya:** bahasa Indonesia santai, kalimat pendek, tanpa istilah rumit, menggunakan sapaan konsisten ("kamu").
- **Aturan wajib:** hook di 3 detik pertama, fakta dicek manual dari minimal 2 sumber, subtitle di setiap video, sumber dicantumkan di caption.
- **Peran AI (Antigravity):** membangun visual animasi, efek gerak, dan subtitle secara terprogram menggunakan Remotion (React/TypeScript) berdasarkan naskah di dokumen ini. Riset dan cek fakta tetap dikerjakan sendiri.

---

## 2. Status Produksi

- [x] Topik dipilih
- [x] Bahan riset awal dikumpulkan
- [x] Buka dan cek sumber 1 dan 2
- [x] Pilih hook
- [x] Tulis dan revisi naskah (121 kata, siap rekam)
- [ ] Siapkan file suara (`public/voiceover.mp3` - suara asli atau suara AI)
- [ ] Generate komponen visual & subtitle di Remotion via Antigravity
- [ ] Preview di Remotion Studio & render akhir ke `.mp4`

---

## 3. Poin Inti dari Riset

- **Penyebab utamanya serebelum (otak kecil).** Bagian otak di belakang ini memprediksi sensasi yang timbul dari gerakanmu sendiri, tapi tidak untuk gerakan orang lain. Prediksi itu dipakai untuk meredam respons area otak lain terhadap sentuhan.
- **Ada sinyal salinan perintah.** Sistem motorik mengirim sinyal internal (*efference copy*) ke serebelum, sehingga serebelum bisa memperkirakan gerakan yang direncanakan. Akibatnya respons terhadap gelitikan sendiri lebih rendah daripada gelitikan orang lain.
- **Area pengolah rasa geli ikut meredup.** Korteks somatosensori sekunder dan korteks cingulata anterior kurang aktif saat seseorang menggelitik dirinya sendiri.
- **Otak bisa dikelabui.** Dalam eksperimen dengan robot, jeda kecil antara gerakan dan sentuhan yang dihasilkan membuat sensasinya terasa geli.

---

## 4. Sumber

**Sumber utama:**
- [Tanya-jawab Sarah-Jayne Blakemore di Scientific American](https://www.scientificamerican.com/article/why-cant-a-person-tickle/)
- [Paper asli: Blakemore, Wolpert & Frith, The Cerebellum Contributes to Somatosensory Cortical Activity during Self-Produced Tactile Stimulation](https://wolpertlab.neuroscience.columbia.edu/sites/default/files/content/papers/BlaWolFri99.pdf)
- [Ringkasan untuk umum dari tim yang sama (NeuroReport, 2000)](https://www.google.com/search?q=https://staff.washington.edu/chudler/funny.html)

**Pembanding (sekunder, jangan jadi rujukan utama):**
- [Yale Scientific](https://www.google.com/search?q=https://www.yalescientific.org/%3Fp%3D9937)
- [ScienceAlert](https://www.sciencealert.com/the-scientific-reason-you-can-t-tickle-yourself)

**Status cek fakta:** Sudah dicek dan terverifikasi. Ketiga klaim utama (prediksi dan peredaman oleh serebelum, sinyal motorik internal/*efference copy*, serta eksperimen tangan robot dengan jeda waktu) telah sesuai dengan sumber utama.

---

## 5. Sebaiknya Tidak Masuk Video

- **Kaitan dengan skizofrenia.** Beberapa artikel menyinggungnya, tapi topiknya sensitif dan nuansanya panjang, tidak cocok untuk format 60 detik.
- **Penjelasan evolusi** (misalnya soal perlindungan dari pemangsa). Itu masih dugaan. Kalau dipakai, tulis sebagai "para peneliti menduga".

---

## 6. Pilihan Hook

1. "Kenapa kamu bisa geli kalau digelitik orang lain, tapi nggak kalau digelitik diri sendiri?"
2. "Otakmu sebenarnya lagi spoiler tiap kali kamu coba menggelitik diri sendiri."
3. "Eh lo tau nggak? Ada satu cara buat memaksa otak percaya lo lagi digelitik orang lain."

**Hook final terpilih:** *"Tiap kali coba menggelitik diri sendiri, otakmu sebenarnya lagi spoiler! Kok bisa?"*

---

## 7. Naskah Final & Spesifikasi Remotion (untuk Antigravity)

### A. Naskah Voiceover & Subtitle (Total 60 Detik / ~121 Kata)

- **0–3 detik (Hook):** Tiap kali coba menggelitik diri sendiri, otakmu sebenarnya lagi spoiler! Kok bisa?
- **3–10 detik (Konteks):** Kenapa kita cuma geli kalau digelitik orang lain? Tenang, itu bukan karena jarimu yang kurang jago.
- **10–20 detik (Isi - Bagian 1):** Di bagian belakang bawah otak, ada otak kecil bernama serebelum. Tiap kali tanganmu bergerak, sistem gerakmu mengirim bocoran sinyal ke sana.
- **20–35 detik (Isi - Bagian 2):** Jadi, sebelum jarimu menyentuh kulit, otak sudah menebak rasanya duluan—lalu meredam area pengolah rasa geli. Hasilnya? Gelitikanmu sendiri terasa hambar.
- **35–42 detik (Jawaban Inti - Bagian 1):** Beda cerita kalau orang lain yang menggelitik. Karena gerakannya nggak ketebak, otak nggak sempat meredamnya. Uniknya, otak bisa ditipu!
- **42–52 detik (Jawaban Inti - Bagian 2):** Saat peneliti memakai tangan robot yang memberi jeda sepersekian detik antara gerakan tangan dan sentuhan, rasa geli itu langsung muncul lagi.
- **52–60 detik (Penutup):** Intinya, otakmu itu tukang spoiler yang membocorkan kejutan sebelum kamu sempat merasakannya. Follow buat fakta 60 detik lainnya, ya!

### B. Konfigurasi Proyek Remotion

- **Resolusi & Rasio:** 1080 x 1920 piksel (Vertikal 9:16).
- **Frame Rate & Durasi:** 30 fps, total 1800 frames (60 detik, atau menyesuaikan durasi `public/voiceover.mp3` jika tersedia).
- **Gaya Visual & Tema Warna:**
  - Clean flat vector/SVG illustration dengan soft glowing lighting (gunakan CSS `drop-shadow` atau radial glow).
  - Background: Dark Navy (`#0A1128` menuju `#0F172A`).
  - Warna Aksen Utama: Teal (`#14B8A6` / `#00F5D4`) dan Orange (`#F97316` / `#FF7B00`).
- **Aturan Visual & Subtitle:**
  - Gunakan komponen SVG terprogram yang dianimasikan dengan `spring()` dan `interpolate()` dari Remotion (tanpa gambar eksternal/Muse).
  - Jangan meletakkan teks di dalam ilustrasi SVG. Semua teks narasi ditampilkan melalui komponen Subtitle Dinamis di sepertiga bawah layar (aman dari area UI TikTok/Reels/Shorts) dengan highlight warna orange atau teal pada kata kunci.
  - Perhatikan anatomi otak: saat menampilkan serebelum, sorot bagian belakang-bawah otak (*back-lower part of the brain highlighted in orange*).
  - Gunakan satu desain karakter siluet/kartun minimalis yang konsisten di semua scene.

### C. Struktur Komponen `<Sequence>` (6 Blok Adegan)

#### Blok 1: Hook & Pembuka (0–10 detik | Frame 0–300)
- **Teks Subtitle:** "Tiap kali coba menggelitik diri sendiri, otakmu sebenarnya lagi spoiler! Kok bisa? Kenapa kita cuma geli kalau digelitik orang lain? Tenang, itu bukan karena jarimu yang kurang jago."
- **Animasi Visual (Scene 1):**
  - **Frame 0–100:** Karakter kartun minimalis tertawa dengan gelombang getaran saat digelitik oleh siluet tangan dari samping layar (aksen teal).
  - **Frame 100–200:** Karakter yang sama mencoba menggelitik telapak tangannya sendiri dengan ekspresi datar/bosan.
  - **Frame 200–300:** Ikon otak menyala (*glowing brain*) muncul dengan animasi pop-up (`spring`) di atas kepala karakter.

#### Blok 2: Serebelum Menebak (10–20 detik | Frame 300–600)
- **Teks Subtitle:** "Di bagian belakang bawah otak, ada otak kecil bernama serebelum. Tiap kali tanganmu bergerak, sistem gerakmu mengirim bocoran sinyal ke sana."
- **Animasi Visual (Scene 2):**
  - **Frame 300–450:** Tampilan samping (*side view*) ilustrasi vektor otak bercahaya teal, dengan bagian belakang-bawah (serebelum) berkedip dan menyala warna orange terang.
  - **Frame 450–600:** Animasi garis titik-titik sinyal bercahaya mengalir cepat ke serebelum, diikuti siluet tangan yang bergerak mendekati kulit dengan bayangan transparan (*ghost image*) yang muncul mendahului sentuhan aslinya.

#### Blok 3: Meredam Rasa Geli (20–35 detik | Frame 600–1050)
- **Teks Subtitle:** "Jadi, sebelum jarimu menyentuh kulit, otak sudah menebak rasanya duluan—lalu meredam area pengolah rasa geli. Hasilnya? Gelitikanmu sendiri terasa hambar."
- **Animasi Visual (Scene 3):**
  - **Frame 600–825:** Ilustrasi otak bercahaya di mana area sensorik yang tadinya terang meredup secara perlahan, didampingi animasi indikator volume bar/knob yang turun ke level rendah.
  - **Frame 825–1050:** Karakter kartun menyentuh lengannya sendiri dengan ekspresi datar dan efek gelombang sentuhan yang langsung hilang/rata.

#### Blok 4: Digelitik Orang Lain (35–42 detik | Frame 1050–1260)
- **Teks Subtitle:** "Beda cerita kalau orang lain yang menggelitik. Karena gerakannya nggak ketebak, otak nggak sempat meredamnya. Uniknya, otak bisa ditipu!"
- **Animasi Visual (Scene 4):**
  - **Frame 1050–1155:** Siluet tangan asing muncul mendadak dari luar frame menuju karakter, memunculkan ikon tanda tanya (?) bercahaya di sekitar otak.
  - **Frame 1155–1260:** Ikon otak tampak terkejut (efek *shake*/bergetar), lalu siluet lengan robot mekanik kecil muncul dari sudut layar.

#### Blok 5: Eksperimen Robot (42–52 detik | Frame 1260–1560)
- **Teks Subtitle:** "Saat peneliti memakai tangan robot yang memberi jeda sepersekian detik antara gerakan tangan dan sentuhan, rasa geli itu langsung muncul lagi."
- **Animasi Visual (Scene 5):**
  - **Frame 1260–1360:** Jari menekan tombol/tuas di satu sisi, sementara lengan robot mekanik berada di dekat telapak tangan pada sisi lainnya.
  - **Frame 1360–1460:** Ikon stopwatch bercahaya orange muncul di tengah jalur sinyal yang menahan sinyal selama sepersekian detik (*delay indicator*) sebelum lengan robot menyentuh telapak tangan.
  - **Frame 1460–1560:** Karakter kembali tertawa geli dan seluruh ikon otak menyala terang dengan partikel cahaya teal dan orange.

#### Blok 6: Penutup & CTA (52–60 detik | Frame 1560–1800)
- **Teks Subtitle:** "Intinya, otakmu itu tukang spoiler yang membocorkan kejutan sebelum kamu sempat merasakannya. Follow buat fakta 60 detik lainnya, ya!"
- **Animasi Visual (Scene 6):**
  - **Frame 1560–1680:** Karakter otak kartun tersenyum jahil sambil membisikkan gelombang suara melalui megafon bercahaya.
  - **Frame 1680–1800:** Otak melambaikan tangan dengan animasi floating lembut di bagian atas-tengah layar, memberikan ruang bersih di bawahnya untuk animasi tombol/ajakan Follow.

---

## 8. Catatan Waktu Produksi

| Langkah | Estimasi | Waktu nyata |
| --- | --- | --- |
| Riset dan cek fakta | 30-45 menit | |
| Naskah | 20-30 menit | |
| Suara (`voiceover.mp3`) | 15 menit | |
| Generate Remotion & Preview | 30-45 menit | |
| Render & Unggah | 15 menit | |

---

## 9. Perintah Siap Pakai untuk Antigravity

Salin salah satu perintah di bawah ini ke chat Antigravity setelah file ini disimpan di folder kerjamu:

**Perintah 1 (Inisiasi & Buat Video):**
> "Baca file BRIEF_VIDEO_1.md. Inisiasi proyek Remotion (TypeScript) di folder ini dan bangun komposisi video vertikal 1080x1920 (30fps, 1800 frames) sesuai seluruh spesifikasi warna, aturan anatomi otak, komponen SVG per blok waktu, dan subtitle dinamis yang tertulis di Bagian 7. Setelah selesai, jalankan Remotion Studio untuk preview."

**Perintah 2 (Sinkronisasi Audio):**
> "Aku sudah memasukkan file public/voiceover.mp3. Pasang audio tersebut ke dalam komposisi utama Remotion dan sesuaikan timing kemunculan tiap kalimat subtitle serta transisi 6 blok adegan agar pas dengan suara di audio."

**Perintah 3 (Render Akhir):**
> "Semua preview sudah pas. Tolong jalankan perintah render Remotion untuk mengekspor komposisi ini menjadi file out/video-gelitik.mp4 dengan kualitas tinggi."
