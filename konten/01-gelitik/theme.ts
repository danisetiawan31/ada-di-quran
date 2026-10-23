import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

export const { fontFamily } = loadFont("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const THEME = {
  colors: {
    // Bright & Warm Canvas Backgrounds (Kok Bisa? style)
    bgCream: "#FFFDF5",
    bgWarmCream: "#FFFDF5",
    bgWarmYellow: "#FEF9C3",
    bgSoftBlue: "#E0F2FE",
    bgMint: "#ECFDF5",
    bgPeach: "#FFEDD5",
    bgLavender: "#F5F3FF",

    // Chunky Flat Illustration Colors
    ink: "#0F172A", // Dark charcoal outline (10px-12px)
    white: "#FFFFFF",
    
    coral: "#FF5757",
    coralDark: "#E03B3B",
    orange: "#FF8A00",
    orangeLight: "#FFB347",
    yellow: "#FFD000",
    yellowLight: "#FFF066",
    teal: "#00C9A7",
    tealDark: "#009E82",
    blue: "#38BDF8",
    blueDark: "#0284C7",
    purple: "#8B5CF6",
    pink: "#F43F5E",
    
    // Shadows & Overlays
    popShadow: "8px 8px 0px #0F172A",
    popShadowLarge: "12px 12px 0px #0F172A",
  },
  dimensions: {
    width: 1080,
    height: 1920,
    fps: 30,
    durationInFrames: 1782, // 59.4s
  },
};
