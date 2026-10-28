# Riset & Brief Produksi Episode 03: Bahaya Ikan Asin Disemprot Obat Nyamuk

**Tanggal:** 28 Oktober 2026 · **Kreator:** @Ahmad Dhani Setiawan  
**Channel:** Ada di Quran  
**Acuan Arsitektur:** `PROJECT_SSOT.md` (Termasuk Bagian 6: 20 Syarat Mutlak Zero-Defect & Sequential Per-Scene Loop) & `FOUNDATION_BACKLOG.md`  
**Kategori Topik:** Kesehatan Medis, Keamanan Pangan & Etika Sosial  
**Rujukan Ayat Utama:** QS. Asy-Syu'ara (26): 183

---

## 1. Status Kesiapan Aset

- [x] Topik & Ayat dikunci (QS. Asy-Syu'ara: 183)
- [x] Riset toksikologi pangan (*Propoxur / Pyrethroids*) & cek tafsir (2 sumber kredibel)
- [x] Naskah final selesai ditulis (106 kata)
- [x] File suara utama (`vo_main.wav`) (**Durasi: 44.0 detik / 1.320 frames pada 30fps**)
- [x] Unduh otomatis aset Ayat (`ayah.mp3` & `ayah.png`) via EveryAyah
- [x] Komponen Maskot Resmi Reusable (`MainCharacter.tsx`) dengan Baju Koko Modern & 11 Ekspresi
- [ ] Eksekusi visual Full-Scene 2D dengan `<PopElement />`, `@remotion/sfx`, dan *Sequential Per-Scene Loop* via Antigravity
- [ ] Preview di Remotion Studio & render akhir ke `out/ep03-ikan-asin.mp4`

---

## 2. Ringkasan Riset & Sumber Verifikasi (Untuk Konteks & Caption)

### A. Poin Inti Medis/Toksikologi & Tafsir
1. **Modus Oknum Nakal:** Saat penjemuran terbuka, bau amis ikan asin mengundang lalat untuk bertelur (memicu munculnya belatung). Oknum curang menyemprotkan insektisida rumah tangga (obat nyamuk) agar lalat tidak berani mendekat dan ikan tampak mulus.
2. **Sifat Racun Saraf yang Meresap (*Lipofilik*):** Cairan obat nyamuk mengandung senyawa *propoxur* (karbamat) atau *piretroid* yang bersifat racun saraf (*neurotoxin*). Saat disemprotkan pada ikan, zat ini meresap mengikat jaringan lemak dan serat daging, sehingga residunya tidak hilang tuntas hanya dengan dicuci air atau digoreng panas.
3. **Bahaya Organ Tubuh:** Konsumsi residu insektisida memicu gejala akut (mual, pusing, muntah) dan kerusakan kronis pada organ penyaring racun utama tubuh, yaitu **hati (liver) dan ginjal**.
4. **Konteks Tafsir QS. Asy-Syu'ara (26): 183:** Dalam *Tafsir Kemenag RI* dan *Tafsir Al-Misbah*, larangan *"laa tabkhasun-naasa asy-yaa'ahum"* (jangan merugikan manusia pada hak-haknya) dan larangan berbuat kerusakan di bumi (*fasad*) mencakup segala bentuk kecurangan dagang yang memalsukan mutu serta membahayakan kesehatan pembeli demi keuntungan sepihak.

### B. Sumber Rujukan (Cantumkan di Caption)
- **Al-Qur'an & Tafsir:**
  1. Mushaf & Tafsir Ringkas Kementerian Agama RI — QS. Asy-Syu'ara (26): 183.
  2. Tafsir Al-Misbah (Prof. Dr. M. Quraish Shihab) — Pembahasan Surah Asy-Syu'ara ayat 183 tentang kecurangan perniagaan dan *fasad fil ardh*.
- **Medis & Keamanan Pangan:**
  1. Badan Pengawas Obat dan Makanan (BPOM RI) & Kemenkes RI — Bahaya penyalahgunaan bahan berbahaya dan residu pestisida pada pangan olahan.
  2. World Health Organization (WHO) — *Toxicological Profile for Pyrethroids and Carbamates (Propoxur) in Food Safety*.

### C. Batasan Konten
- Wajib menegaskan kata **"oknum"** agar tidak merugikan pedagang ikan asin jujur yang mengolah secara higienis dengan garam murni.
- Dilarang menampilkan merek dagang obat nyamuk apa pun atau teks huruf apa pun pada ilustrasi kaleng semprot (gunakan ikon tengkorak/bahaya kimia murni).

---

## 3. Spesifikasi Aset Audio & Ayat (3-Part Audio System)

### Bagian 1: Narasi Utama (`vo_main.wav`)
- **Durasi Pasti:** **44.0 detik (1.320 frames pada 30fps)**

### Bagian 2: Murattal & Gambar Ayat (QS. Asy-Syu'ara: 183)
- **Audio (`ayah.mp3`):** Qari Abu Bakr Ash-Shaatree (durasi 8.26 detik / ~248 frames, putar tuntas tanpa fade-out).
- **Gambar Kaligrafi (`ayah.png`):** EveryAyah 26_183.png.
- **Badge Surah:** `QS. Asy-Syu'ara (26): 183`
- **Teks Terjemahan Kemenag:**  
  `"Dan janganlah kamu merugikan manusia pada hak-haknya dan janganlah kamu merajalela di muka bumi dengan membuat kerusakan."`
- **ZONA HENING MUTLAK:** Matikan seluruh Micro-SFX selama `<AyahCard />` tampil agar khusyuk.

### Bagian 3: Penutup / CTA (`vo_cta.wav`)
- **Teks Subtitle CTA:** `"Follow Ada di Quran buat tahu fakta menarik lainnya, ya!"`
