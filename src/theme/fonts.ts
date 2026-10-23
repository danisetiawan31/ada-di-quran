import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Load Google Fonts yang efisien (hanya bobot yang dipakai: 500, 700, 800)
const plusJakarta = loadPlusJakartaSans("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

const inter = loadInter("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const FONTS = {
  title: plusJakarta.fontFamily,
  body: inter.fontFamily,
} as const;
