export const DIMENSIONS = {
  width: 1080,
  height: 1920,
  fps: 30,
  maxAyahFrames: 300, // Maksimal 10 detik @ 30fps untuk pemutaran ayat
  ayahFadeOutFrames: 30, // 1 detik terakhir (frame 270-300) fade out
} as const;

export const COLORS = {
  // Backgrounds & Base (Netral / Color-Agnostic untuk base engine)
  darkVignette: "rgba(0, 0, 0, 0.85)", // Gradasi gelap bawah layar untuk subtitle (netral hitam)
  overlayBlur: "rgba(0, 0, 0, 0.75)", // Overlay gelap transparan saat AyahCard aktif (netral hitam)
  mushafCream: "#FDFBF7", // Background kartu mushaf ayat

  // Accents & Shared Assets
  amber: "#FBBF24", // Aksen emas/kuning untuk bingkai mushaf, waveform, & badge ayat
  teal: "#14B8A6", // Aksen sains/alam
  orange: "#F97316", // Aksen energi/perhatian
  sacredGold: "#F59E0B", // Cahaya keemasan untuk SacredLight
  deepNight: "#0A1128", // Token navy (khusus tema lautan/malam)

  // Typography
  textWhite: "#F8FAFC", // Teks terang utama
  textDark: "#0F172A", // Teks terjemahan di dalam kartu mushaf
  textMuted: "#94A3B8", // Teks redup/metadata
} as const;
