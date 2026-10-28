export const EP03_THEME = {
  dimensions: {
    width: 1080,
    height: 1920,
    fps: 30,
    voMainFrames: 1320, // 44.0s (sesuai naskah & audio)
    ayahFrames: 248, // ~8.26s (sesuai ayah.mp3 QS. 26:183)
    voCtaFrames: 107, // ~3.56s (sesuai vo_cta.wav)
    get totalDurationFrames() {
      return this.voMainFrames + this.ayahFrames + this.voCtaFrames;
    },
  },
  colors: {
    // Scene 1: Penjemuran Pesisir Siang Cerah vs Racun
    skyBlue: "#38BDF8",
    skyLight: "#BAE6FD",
    sunYellow: "#FDE047",
    sunWarm: "#FACC15",
    seaDeep: "#0284C7",
    seaFoam: "#E0F2FE",
    sandWarm: "#FDE68A",
    bambooRack: "#D97706",
    bambooDark: "#92400E",
    fishSilver: "#E2E8F0",
    fishShade: "#94A3B8",
    toxicGreen: "#22C55E",
    toxicGreenNeon: "#4ADE80",
    toxicPurple: "#A855F7",
    canRed: "#EF4444",
    canDark: "#991B1B",

    // Scene 2: Penampang Makro Serat Daging Ikan & Uji Tahan
    meatSalmon: "#FB7185",
    meatDeep: "#E11D48",
    meatLight: "#FDA4AF",
    meatFiber: "#FFF1F2",
    waterBlue: "#38BDF8",
    waterSplash: "#E0F2FE",
    oilYellow: "#F59E0B",
    oilBubble: "#FEF08A",
    toxicMolecule: "#16A34A",
    toxicSpike: "#15803D",

    // Scene 3: Ruang Medis Terang & Organ
    roomWarmCream: "#FFFBEB",
    roomMintSoft: "#CCFBF1",
    floorWood: "#FDE68A",
    tableWood: "#B45309",
    xrayBg: "#0F172A",
    xrayCardBorder: "#38BDF8",
    liverHealthy: "#991B1B",
    liverDanger: "#EF4444",
    kidneyHealthy: "#7F1D1D",
    kidneyDanger: "#DC2626",
    dangerPulse: "#FF0000",

    // Scene 4: Pasar Pagi Cerah & Jujur
    morningGold: "#FEF3C7",
    morningSun: "#FDE68A",
    marketAwningGreen: "#059669",
    marketAwningWhite: "#F8FAFC",
    cleanFishSalt: "#F8FAFC",
    woodCounter: "#78350F",
    sealRed: "#EF4444",
  },
} as const;
