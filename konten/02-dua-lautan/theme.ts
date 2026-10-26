export const EP01_THEME = {
  dimensions: {
    width: 1080,
    height: 1920,
    fps: 30,
    voMainFrames: 1578, // ~52.6s (sesuai vo_main.wav)
    ayah19Frames: 126, // ~4.2s (sesuai ayah_19.mp3)
    ayah20Frames: 150, // ~5.0s (sesuai ayah_20.mp3)
    voCtaFrames: 107, // ~3.56s (sesuai vo_cta.wav)
    get totalDurationFrames() {
      return this.voMainFrames + this.ayah19Frames + this.ayah20Frames + this.voCtaFrames;
    },
  },
  colors: {
    oceanDeepBlue: "#0A2463",
    oceanMidBlue: "#1E3A8A",
    oceanTealDark: "#0F766E",
    oceanTealBright: "#2DD4BF",
    barrierAmber: "#FBBF24",
    syrupOrange: "#F97316",
    foamWhite: "#FFFFFF",
  },
};
