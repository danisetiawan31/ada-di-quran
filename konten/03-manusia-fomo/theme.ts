export const EP02_THEME = {
  dimensions: {
    width: 1080,
    height: 1920,
    fps: 30,
    voMainFrames: 1524, // ~50.8s (sesuai vo_main.wav)
    ayahFrames: 295, // ~9.83s (sesuai ayah.mp3 QS. 21:37)
    voCtaFrames: 107, // ~3.56s (sesuai vo_cta.wav)
    get totalDurationFrames() {
      return this.voMainFrames + this.ayahFrames + this.voCtaFrames;
    },
  },
  colors: {
    // Scene 1: Warm Office & Anxiety
    bgWarmOffice: "#FFF7ED",
    peachLight: "#FFEDD5",
    peachAccent: "#FDBA74",
    amberGold: "#F59E0B",
    amberDeep: "#D97706",
    urgentRed: "#EF4444",

    // Scene 1B: Gloomy mood shift
    gloomyBg: "#1E293B",
    gloomySlate: "#334155",
    gloomyText: "#94A3B8",

    // Scene 2: Fork in the Road
    skyBlue: "#38BDF8",
    skyLight: "#E0F2FE",
    pathCobble: "#E2E8F0",
    flashPortal: "#FACC15",
    mountainPurple: "#6366F1",

    // Scene 3: Soil & Roots
    soilDark: "#291102",
    soilWarm: "#451A03",
    soilMid: "#78350F",
    soilSurface: "#15803D",
    rootGold: "#FBBF24",
    rootCore: "#F59E0B",

    // Scene 4: Lush Tree & Peaceful Sunlight
    morningSky: "#FEF9C3",
    sunlightGold: "#FDE047",
    treeTrunk: "#854D0E",
    treeLeaves: "#059669",
    treeLeavesLight: "#10B981",
    fruitRed: "#F43F5E",
    peacefulGaze: "#FEF3C7",

    // Character Palette
    charSkin: "#FCD34D",
    charSkinShadow: "#F59E0B",
    charHair: "#1E293B",
    charShirt: "#0284C7", // Bright cheerful blue hoodie
    charPants: "#334155",
    charShoe: "#0F172A",
    charSweat: "#60A5FA",
  },
} as const;
