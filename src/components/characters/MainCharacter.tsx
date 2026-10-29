import React from "react";
import { useCurrentFrame } from "remotion";

export type CharacterPose =
  | "idle"
  | "explaining"
  | "pointing"
  | "curious"
  | "alert"
  | "dizzy"
  | "peaceful"
  | "holding"
  | "angry"
  | "calming"
  | "regret"
  | "spraying"
  // Aliases
  | "senang"
  | "berbicara"
  | "menunjuk"
  | "penasaran"
  | "panik"
  | "pusing"
  | "tenang"
  | "memegang"
  | "marah"
  | "furious"
  | "menenangkan"
  | "advising"
  | "sabar"
  | "menyesal"
  | "malu"
  | "embarrassed"
  | "spray"
  | "menyemprot"
  | "happy"
  | "panic"
  | "hopeful"
  | "gloomy"
  | "impatient"
  | "datar"
  | "sedih"
  | "terkejut";

export interface CharacterColors {
  skin: string;
  skinShadow: string;
  hair: string;
  hairHighlight: string;
  outfitMain: string;
  outfitShade: string;
  outfitCollar: string;
  outfitAccent: string;
  pants: string;
  pantsDark: string;
  shoeBase: string;
  shoeWhite: string;
  glasses: string;
  outline: string;
}

export const DEFAULT_CHARACTER_COLORS: CharacterColors = {
  skin: "#FBD5B5",
  skinShadow: "#E8B28B",
  hair: "#1E293B", // Modern dark slate
  hairHighlight: "#334155",
  outfitMain: "#F8FAFC", // Clean modern Koko / Shirt
  outfitShade: "#E2E8F0",
  outfitCollar: "#FFFFFF",
  outfitAccent: "#D97706", // Gold buttons
  pants: "#334155", // Modern dark slate chinos
  pantsDark: "#1E293B",
  shoeBase: "#0F172A", // Modern sneakers
  shoeWhite: "#FFFFFF",
  glasses: "#0F172A", // Modern stylish dark wireframe
  outline: "#0F172A",
};

export interface MainCharacterProps {
  pose?: CharacterPose;
  expression?: CharacterPose;
  scale?: number;
  flip?: boolean;
  breathe?: boolean;
  blink?: boolean;
  tilt?: number;
  hasGlasses?: boolean;
  outfitType?: "koko" | "tshirt";
  hairStyle?: "peci" | "quiff" | "messy";
  customColors?: Partial<CharacterColors>;
  style?: React.CSSProperties;
}

export const MainCharacter: React.FC<MainCharacterProps> = ({
  pose = "idle",
  expression,
  scale = 1.0,
  flip = false,
  breathe = true,
  blink = true,
  tilt = 0,
  hasGlasses = true,
  outfitType = "koko",
  hairStyle = "peci",
  customColors,
  style,
}) => {
  const frame = useCurrentFrame();
  const rawId = React.useId();
  const instanceId = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const hairGradId = `charHair_${instanceId}`;
  const outfitGradId = `charOutfit_${instanceId}`;

  const rawKey = (expression || pose || "idle").toLowerCase();
  let activePose:
    | "idle"
    | "explaining"
    | "pointing"
    | "curious"
    | "alert"
    | "dizzy"
    | "peaceful"
    | "holding"
    | "angry"
    | "calming"
    | "regret"
    | "spraying" = "idle";

  if (["idle", "senang", "happy", "datar"].includes(rawKey)) activePose = "idle";
  else if (["explaining", "berbicara", "hopeful"].includes(rawKey)) activePose = "explaining";
  else if (["pointing", "menunjuk"].includes(rawKey)) activePose = "pointing";
  else if (["curious", "penasaran"].includes(rawKey)) activePose = "curious";
  else if (["alert", "panik", "panic", "terkejut"].includes(rawKey)) activePose = "alert";
  else if (["dizzy", "pusing", "gloomy", "sedih"].includes(rawKey)) activePose = "dizzy";
  else if (["peaceful", "tenang", "impatient"].includes(rawKey)) activePose = "peaceful";
  else if (["holding", "memegang"].includes(rawKey)) activePose = "holding";
  else if (["angry", "marah", "furious"].includes(rawKey)) activePose = "angry";
  else if (["calming", "menenangkan", "advising", "sabar"].includes(rawKey)) activePose = "calming";
  else if (["regret", "menyesal", "malu", "embarrassed"].includes(rawKey)) activePose = "regret";
  else if (["spraying", "spray", "menyemprot"].includes(rawKey)) activePose = "spraying";

  const c: CharacterColors = { ...DEFAULT_CHARACTER_COLORS, ...customColors };

  // Secondary Motion
  const breatheY = breathe ? Math.sin(frame / 16) * 2.2 : 0;
  const shakeX = activePose === "alert" || activePose === "angry" ? Math.sin(frame * 0.9) * 3 : 0;
  const dizzyWobble = activePose === "dizzy" ? Math.sin(frame * 0.22) * 3.5 : 0;
  const headTilt = activePose === "curious" ? 6 : activePose === "dizzy" ? -6 : activePose === "angry" ? 4 : tilt;
  const isBlinking = blink && frame % 90 < 4 && !["dizzy", "peaceful", "angry"].includes(activePose);

  return (
    <div
      style={{
        width: 280,
        height: 560,
        transform: `scale(${scale}) scaleX(${flip ? -1 : 1}) translate(${shakeX + dizzyWobble}px, 0px)`,
        transformOrigin: "bottom center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 280 560"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id={hairGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c.hairHighlight} />
            <stop offset="100%" stopColor={c.hair} />
          </linearGradient>

          <linearGradient id={outfitGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.outfitCollar} />
            <stop offset="60%" stopColor={c.outfitMain} />
            <stop offset="100%" stopColor={c.outfitShade} />
          </linearGradient>
        </defs>

        {/* =====================================================================
            1. GROUND CONTACT SHADOW (Menapak Kokoh Tepat di Bawah Sol Sepatu)
           ===================================================================== */}
        {/* Bayangan Kontak Presisi di Bawah Kedua Kaki (Zero Floating Gap!) */}
        <ellipse cx="111" cy="516" rx="32" ry="7" fill="rgba(0, 0, 0, 0.28)" />
        <ellipse cx="169" cy="516" rx="32" ry="7" fill="rgba(0, 0, 0, 0.28)" />
        {/* Bayangan Ambient Halus Penyatuan Pijakan */}
        <ellipse cx="140" cy="517" rx="68" ry="9" fill="rgba(0, 0, 0, 0.16)" />

        {/* =====================================================================
            2. LEGS & SNEAKERS (Kaki Proporsional & Natural A-Stance)
           ===================================================================== */}
        <g id="legs-and-shoes">
          {/* Kaki Kiri */}
          <g transform="rotate(-2, 120, 360)">
            {/* Celana Chino Kiri dengan Lekukan Natural */}
            <path
              d="M 106 360 L 102 430 L 100 488 L 132 488 L 134 430 L 134 360 Z"
              fill={c.pants}
              stroke={c.outline}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Lipatan Seterika Celana Rapi */}
            <line x1="117" y1="375" x2="115" y2="475" stroke={c.pantsDark} strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            {/* Lipatan Ujung Celana */}
            <rect x="99" y="480" width="34" height="8" rx="3" fill={c.pantsDark} stroke={c.outline} strokeWidth="2" />
            {/* Sneaker Kiri (Desain Modern Minimalis) */}
            <g transform="translate(86, 486)">
              {/* Bagian Atas Sepatu */}
              <path
                d="M 4 14 C 12 6 28 4 46 8 L 47 24 L 2 24 C 0 19 1 16 4 14 Z"
                fill={c.shoeBase}
                stroke={c.outline}
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              {/* Tali Sepatu Minimalis */}
              <line x1="20" y1="11" x2="28" y2="10" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="22" y1="15" x2="30" y2="14" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              {/* Sol Putih Sneaker Tebal & Datar Menapak Lantai */}
              <rect x="0" y="21" width="50" height="9" rx="3" fill={c.shoeWhite} stroke={c.outline} strokeWidth="2.2" />
              <line x1="0" y1="28" x2="50" y2="28" stroke={c.outline} strokeWidth="1.5" />
            </g>
          </g>

          {/* Kaki Kanan */}
          <g transform="rotate(2, 160, 360)">
            {/* Celana Chino Kanan dengan Lekukan Natural */}
            <path
              d="M 146 360 L 146 430 L 148 488 L 180 488 L 178 430 L 174 360 Z"
              fill={c.pants}
              stroke={c.outline}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Lipatan Seterika Celana Rapi */}
            <line x1="163" y1="375" x2="165" y2="475" stroke={c.pantsDark} strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            {/* Lipatan Ujung Celana */}
            <rect x="147" y="480" width="34" height="8" rx="3" fill={c.pantsDark} stroke={c.outline} strokeWidth="2" />
            {/* Sneaker Kanan (Desain Modern Minimalis) */}
            <g transform="translate(144, 486)">
              {/* Bagian Atas Sepatu */}
              <path
                d="M 4 8 C 22 4 38 6 46 14 C 49 16 50 19 48 24 L 3 24 L 4 8 Z"
                fill={c.shoeBase}
                stroke={c.outline}
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              {/* Tali Sepatu Minimalis */}
              <line x1="22" y1="10" x2="30" y2="11" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="14" x2="28" y2="15" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              {/* Sol Putih Sneaker Tebal & Datar Menapak Lantai */}
              <rect x="0" y="21" width="50" height="9" rx="3" fill={c.shoeWhite} stroke={c.outline} strokeWidth="2.2" />
              <line x1="0" y1="28" x2="50" y2="28" stroke={c.outline} strokeWidth="1.5" />
            </g>
          </g>
        </g>

        {/* =====================================================================
            3. UPPER BODY & HEAD GROUP (Bernapas Halus, Badan Atletis Rapi)
           ===================================================================== */}
        <g id="upper-body-group" transform={`translate(0, ${breatheY})`}>
          {/* Rambut Belakang Leher (Ikut HeadTilt saat Kepala Menoleh/Miring) */}
          <g id="back-hair" transform={`rotate(${headTilt} 140 145)`}>
            <path
              d="M 112 142 C 110 180 120 198 128 202 L 152 202 C 160 198 170 180 168 142 Z"
              fill={c.hair}
            />
          </g>

          {/* Leher Proporsional (Simetris di Tengah X: 140) */}
          <path
            d="M 128 178 L 128 218 Q 140 222 152 218 L 152 178 Z"
            fill={c.skinShadow}
            stroke={c.outline}
            strokeWidth="3.2"
          />

          {/* BADAN: KOKO MODERN ATAU T-SHIRT KASUAL (Bahu Tegap, Simetris di X: 140) */}
          <g id="torso">
            <path
              d="M 88 220 L 192 220 L 182 364 Q 140 370 98 364 Z"
              fill={`url(#${outfitGradId})`}
              stroke={c.outline}
              strokeWidth="3.8"
              strokeLinejoin="round"
            />

            {outfitType === "koko" ? (
              <>
                {/* Kerah Shanghai Modern Rapi */}
                <path
                  d="M 120 214 Q 140 226 160 214 L 160 225 Q 140 236 120 225 Z"
                  fill={c.outfitCollar}
                  stroke={c.outline}
                  strokeWidth="2.8"
                />

                {/* Belahan Kancing Tengah & Kancing Emas */}
                <line x1="140" y1="225" x2="140" y2="345" stroke={c.outfitShade} strokeWidth="3" />
                <circle cx="140" cy="242" r="3.2" fill={c.outfitAccent} stroke={c.outline} strokeWidth="1.2" />
                <circle cx="140" cy="268" r="3.2" fill={c.outfitAccent} stroke={c.outline} strokeWidth="1.2" />
                <circle cx="140" cy="294" r="3.2" fill={c.outfitAccent} stroke={c.outline} strokeWidth="1.2" />
                <circle cx="140" cy="320" r="3.2" fill={c.outfitAccent} stroke={c.outline} strokeWidth="1.2" />

                {/* Saku Minimalis di Dada Kiri */}
                <rect x="156" y="248" width="18" height="22" rx="3" fill="none" stroke={c.outfitShade} strokeWidth="2" />
                <line x1="156" y1="248" x2="174" y2="248" stroke={c.outfitAccent} strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Kerah Crewneck Kasual Kaos/Sweater */}
                <path
                  d="M 122 216 Q 140 234 158 216"
                  fill="none"
                  stroke={c.outfitCollar}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 122 216 Q 140 234 158 216"
                  fill="none"
                  stroke={c.outline}
                  strokeWidth="2.2"
                />
              </>
            )}
          </g>

          {/* ===================================================================
              4. LENGAN & TANGAN (THE POSE ENGINE - PROPORSIONAL & NATURAL)
             =================================================================== */}
          <g id="arms">
            {/* 1. IDLE (Tangan Santai di Samping Paha, Jempol Hadap Dalam Medial Natural) */}
            {activePose === "idle" && (
              <g>
                {/* Lengan Kiri */}
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="73" y="372" width="20" height="7" rx="3" fill={c.outfitShade} stroke={c.outline} strokeWidth="2" />
                <ellipse cx="85" cy="392" rx="9" ry="12" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                {/* Jempol Hadap Dalam ke Arah Badan (Anatomi Benar) */}
                <ellipse cx="92" cy="388" rx="3.5" ry="5" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />

                {/* Lengan Kanan */}
                <path d="M 190 228 C 206 275 206 340 196 380" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 C 206 275 206 340 196 380" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="187" y="372" width="20" height="7" rx="3" fill={c.outfitShade} stroke={c.outline} strokeWidth="2" />
                <ellipse cx="195" cy="392" rx="9" ry="12" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                {/* Jempol Hadap Dalam ke Arah Badan (Anatomi Benar) */}
                <ellipse cx="188" cy="388" rx="3.5" ry="5" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />
              </g>
            )}

            {/* 2. EXPLAINING (Tangan Kiri Santai Proporsional, Tangan Kanan Terbuka Menerangkan Santun) */}
            {activePose === "explaining" && (
              <g>
                {/* Lengan Kiri Santai Konsisten */}
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="73" y="372" width="20" height="7" rx="3" fill={c.outfitShade} stroke={c.outline} strokeWidth="2" />
                <ellipse cx="85" cy="392" rx="9" ry="12" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                <ellipse cx="92" cy="388" rx="3.5" ry="5" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />

                {/* Lengan Kanan Mengangkat Terbuka Santun */}
                <path d="M 190 228 Q 224 285 208 305 L 230 270" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 Q 224 285 208 305 L 230 270" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="221" y="268" width="16" height="7" rx="3" fill={c.outfitShade} stroke={c.outline} strokeWidth="1.8" transform="rotate(-30 229 271)" />
                <g transform="translate(238, 262) rotate(-15)">
                  <ellipse cx="0" cy="0" rx="10" ry="13" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  {/* Jari Santun Terbuka */}
                  <line x1="-3" y1="-11" x2="-3" y2="-2" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="-11" x2="3" y2="-2" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx="-8" cy="2" rx="4" ry="5" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />
                </g>
              </g>
            )}

            {/* 3. POINTING (Menunjuk Mantap & Jangkauan Penuh Percaya Diri dengan Manset Rapi) */}
            {activePose === "pointing" && (
              <g>
                {/* Lengan Kiri Santai Konsisten */}
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="73" y="372" width="20" height="7" rx="3" fill={c.outfitShade} stroke={c.outline} strokeWidth="2" />
                <ellipse cx="85" cy="392" rx="9" ry="12" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                <ellipse cx="92" cy="388" rx="3.5" ry="5" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />

                {/* Lengan Kanan Terentang Menunjuk dengan Manset Pergelangan */}
                <path d="M 190 226 L 246 186" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 226 L 246 186" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="238" y="180" width="8" height="18" rx="2.5" fill={c.outfitShade} stroke={c.outline} strokeWidth="1.8" transform="rotate(-34 242 189)" />
                <g transform="translate(256, 184) rotate(-22)">
                  <ellipse cx="0" cy="0" rx="9" ry="9" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  {/* Telunjuk Menunjuk Mantap */}
                  <rect x="4" y="-5" width="22" height="8" rx="4" fill={c.skin} stroke={c.outline} strokeWidth="2.2" />
                  {/* Jempol Terlipat */}
                  <ellipse cx="-2" cy="-4" rx="4" ry="3.5" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />
                </g>
              </g>
            )}

            {/* 4. CURIOUS (Tangan di Dagu, Siku V Bersih, Berpikir Penasaran) */}
            {activePose === "curious" && (
              <g>
                {/* Lengan Kiri Santai Konsisten */}
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="73" y="372" width="20" height="7" rx="3" fill={c.outfitShade} stroke={c.outline} strokeWidth="2" />
                <ellipse cx="85" cy="392" rx="9" ry="12" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                <ellipse cx="92" cy="388" rx="3.5" ry="5" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />

                {/* Lengan Kanan Menekuk ke Dagu (Lipatan Siku V Bersih) */}
                <path d="M 190 228 L 222 280 L 176 195" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 190 228 L 222 280 L 176 195" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="172" y="194" width="14" height="6" rx="2.5" fill={c.outfitShade} stroke={c.outline} strokeWidth="1.8" transform="rotate(-30 179 197)" />
                <g transform="translate(172, 188) rotate(-10)">
                  <ellipse cx="0" cy="0" rx="8.5" ry="9" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  <rect x="-6" y="-7" width="14" height="6.5" rx="3.2" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />
                </g>
              </g>
            )}

            {/* 5. ALERT / PANIC (Kedua Tangan Memegang Pipi, Jari-Jari Mencengkeram Waspada) */}
            {activePose === "alert" && (
              <g>
                {/* Lengan Kiri Menempel Pipi */}
                <path d="M 90 228 Q 58 210 68 168" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 Q 58 210 68 168" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <g transform="translate(70, 158) rotate(15)">
                  <ellipse cx="0" cy="0" rx="9" ry="10" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  <path d="M 4 -7 Q 9 -4 4 -1" fill="none" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 4 -1 Q 9 2 4 5" fill="none" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                </g>

                {/* Lengan Kanan Menempel Pipi */}
                <path d="M 190 228 Q 222 210 212 168" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 Q 222 210 212 168" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <g transform="translate(210, 158) rotate(-15)">
                  <ellipse cx="0" cy="0" rx="9" ry="10" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  <path d="M -4 -7 Q -9 -4 -4 -1" fill="none" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M -4 -1 Q -9 2 -4 5" fill="none" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                </g>

                {/* Keringat Dingin Panik */}
                <path d="M 64 128 C 60 136 56 143 64 145 C 72 143 68 136 64 128 Z" fill="#38BDF8" stroke={c.outline} strokeWidth="1.5" />
              </g>
            )}

            {/* 6. DIZZY (Tangan di Dahi & Perut Mual) */}
            {activePose === "dizzy" && (
              <g>
                {/* Tangan Kiri di Perut */}
                <path d="M 90 228 Q 98 300 130 300" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 Q 98 300 130 300" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <ellipse cx="134" cy="300" rx="10" ry="10" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />

                {/* Tangan Kanan Memegang Dahi Pusing */}
                <path d="M 190 228 Q 232 215 190 134" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 Q 232 215 190 134" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <ellipse cx="184" cy="130" rx="10" ry="10" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />

                {/* Spiral Bintang Pusing Berputar */}
                <g transform={`translate(140, 48) rotate(${(frame * 8) % 360})`} opacity="0.85">
                  <path d="M 0 0 m -5,0 a 5,5 0 1,0 10,0 a 10,10 0 1,0 -20,0 a 15,15 0 1,0 30,0" fill="none" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* 7. PEACEFUL (Tangan Bersedekap Santun Tawadhu' Berlapisp Kanan di Atas Kiri) */}
            {activePose === "peaceful" && (
              <g>
                {/* Lengan Kiri Menyilang di Bawah */}
                <path d="M 90 228 Q 80 295 125 310 L 155 310" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 Q 80 295 125 310 L 155 310" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="145" y="304" width="16" height="12" rx="3" fill={c.skin} stroke={c.outline} strokeWidth="2.4" />

                {/* Lengan Kanan Menyilang di Atas (Sedekap Kanan di Atas Kiri) */}
                <path d="M 190 228 Q 200 295 155 304 L 120 304" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 Q 200 295 155 304 L 120 304" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                {/* Tangan Kanan Menggenggam Lengan Kiri Santun */}
                <g transform="translate(122, 304)">
                  <ellipse cx="0" cy="0" rx="8" ry="9" fill={c.skin} stroke={c.outline} strokeWidth="2.4" />
                  <path d="M -3 -6 Q 2 -8 5 -5" fill="none" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* 8. HOLDING (Tangan Terulur Memegang Properti Adegan) */}
            {activePose === "holding" && (
              <g>
                {/* Lengan Kiri Santai Konsisten */}
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="73" y="372" width="20" height="7" rx="3" fill={c.outfitShade} stroke={c.outline} strokeWidth="2" />
                <ellipse cx="85" cy="392" rx="9" ry="12" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                <ellipse cx="92" cy="388" rx="3.5" ry="5" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />

                {/* Lengan Kanan Memegang Properti di Depan Perut/Pinggang */}
                <path d="M 190 228 Q 230 270 216 295" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 Q 230 270 216 295" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="207" y="290" width="8" height="15" rx="2.5" fill={c.outfitShade} stroke={c.outline} strokeWidth="1.8" transform="rotate(25 211 297)" />
                {/* Tangan Mencengkeram/Memegang Mantap (Grip Pose) */}
                <g transform="translate(216, 295)">
                  <ellipse cx="0" cy="0" rx="9.5" ry="10" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  {/* Jempol Mengunci */}
                  <path d="M -6 -5 Q -2 -9 2 -5" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                  {/* Jari-Jari Mencengkeram */}
                  <path d="M 4 -3 Q 8 0 4 3" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                  <path d="M 3 3 Q 7 6 3 9" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* 9. ANGRY (Kedua Tangan Mengepal Kuat Penuh Emosi / Bergetar) */}
            {activePose === "angry" && (
              <g>
                {/* Lengan Kiri Mengepal di Pinggang */}
                <path d="M 90 228 Q 62 268 76 305 L 94 290" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 Q 62 268 76 305 L 94 290" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                {/* Kepalan Tinju Kiri */}
                <g transform="translate(98, 288)">
                  <circle cx="0" cy="0" r="10" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  <path d="M -5 -4 L 5 -4" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                  <path d="M -5 1 L 5 1" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                  <path d="M -7 -2 Q -3 -8 1 -3" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Lengan Kanan Mengepal Tegak Menantang */}
                <path d="M 190 228 Q 224 250 216 210 L 202 185" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 Q 224 250 216 210 L 202 185" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                {/* Kepalan Tinju Kanan Terangkat */}
                <g transform="translate(198, 178) rotate(-15)">
                  <circle cx="0" cy="0" r="10.5" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  <path d="M -4 -4 L 5 -4" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                  <path d="M -4 1 L 5 1" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                  <path d="M -6 -2 Q -2 -7 2 -2" fill="none" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Simbol Emosi Marah / Urat Berdenyut (Comic Anger Vein 💢) */}
                <g transform="translate(72, 110) scale(0.9)" opacity="0.95">
                  <path d="M -8 -8 L -2 -2 M -8 8 L -2 2 M 8 -8 L 2 -2 M 8 8 L 2 2" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
                  <rect x="-7" y="-7" width="14" height="14" rx="2" fill="none" stroke="#EF4444" strokeWidth="2.5" />
                </g>
              </g>
            )}

            {/* 10. CALMING (Kedua Tangan Terangkat Menenangkan: "Sabar, Tenang") */}
            {activePose === "calming" && (
              <g>
                {/* Lengan Kiri Terulur ke Depan Santun */}
                <path d="M 90 228 Q 70 280 108 275 L 126 265" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 Q 70 280 108 275 L 126 265" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <g transform="translate(132, 260) rotate(-20)">
                  <ellipse cx="0" cy="0" rx="9" ry="11" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  <line x1="-3" y1="-9" x2="-3" y2="-2" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="3" y1="-9" x2="3" y2="-2" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                </g>

                {/* Lengan Kanan Terulur Menenangkan */}
                <path d="M 190 228 Q 220 280 185 270 L 165 255" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 Q 220 280 185 270 L 165 255" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <g transform="translate(158, 250) rotate(15)">
                  <ellipse cx="0" cy="0" rx="9" ry="11" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  <line x1="-3" y1="-9" x2="-3" y2="-2" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="3" y1="-9" x2="3" y2="-2" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* 11. REGRET (Menggaruk Belakang Kepala Canggung & Sadar Nasihat) */}
            {activePose === "regret" && (
              <g>
                {/* Lengan Kiri Santai Konsisten */}
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 C 74 275 74 340 84 380" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="73" y="372" width="20" height="7" rx="3" fill={c.outfitShade} stroke={c.outline} strokeWidth="2" />
                <ellipse cx="85" cy="392" rx="9" ry="12" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                <ellipse cx="92" cy="388" rx="3.5" ry="5" fill={c.skin} stroke={c.outline} strokeWidth="1.8" />

                {/* Lengan Kanan Menekuk ke Belakang Kepala (Menggaruk Malu) */}
                <path d="M 190 228 Q 236 215 204 140 L 192 125" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 Q 236 215 204 140 L 192 125" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <g transform="translate(188, 122) rotate(-35)">
                  <ellipse cx="0" cy="0" rx="9" ry="9" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  <path d="M -4 -3 Q 0 -7 4 -3" fill="none" stroke={c.outline} strokeWidth="1.8" strokeLinecap="round" />
                </g>

                {/* Keringat Malu/Canggung Besar */}
                <path d="M 210 115 C 205 125 198 132 208 135 C 218 132 215 125 210 115 Z" fill="#38BDF8" stroke={c.outline} strokeWidth="1.5" />
              </g>
            )}

            {/* 12. SPRAYING (Menyemprotkan Kaleng Racun / Insektisida ke Depan) */}
            {activePose === "spraying" && (
              <g id="arms-spraying">
                {/* Lengan Kiri Santai Bertolak Pinggang (Sikap Acuh / Menyepelekan) */}
                <path d="M 90 228 Q 62 268 76 305 L 94 290" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 90 228 Q 62 268 76 305 L 94 290" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <g transform="translate(98, 288)">
                  <circle cx="0" cy="0" r="10" fill={c.skin} stroke={c.outline} strokeWidth="2.6" />
                  <path d="M -5 -4 L 5 -4" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                  <path d="M -5 1 L 5 1" stroke={c.outline} strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Lengan Kanan Terulur Mantap Memegang Kaleng Semprot (Miring Menembak ke Bawah) */}
                <path d="M 190 228 Q 235 240 252 268" fill="none" stroke={c.outfitMain} strokeWidth="19" strokeLinecap="round" />
                <path d="M 190 228 Q 235 240 252 268" fill="none" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                <rect x="244" y="258" width="16" height="8" rx="2.5" fill={c.outfitShade} stroke={c.outline} strokeWidth="1.8" transform="rotate(35 252 262)" />

                {/* TANGAN & KALENG SEMPROT AEROSOL (X: 258, Y: 275) */}
                <g transform="translate(258, 275) rotate(-35)">
                  {/* Tabung Kaleng Semprot Merah */}
                  <rect x="-12" y="10" width="34" height="78" rx="5" fill="#EF4444" stroke={c.outline} strokeWidth="3" />
                  <path d="M -12 10 Q 5 -2 22 10 Z" fill="#DC2626" stroke={c.outline} strokeWidth="2.5" />
                  <rect x="-12" y="32" width="34" height="32" fill="#0F172A" />

                  {/* Ikon Bahaya Tengkorak Kuning di Kaleng */}
                  <g transform="translate(5, 48)">
                    <circle cx="0" cy="-4" r="6" fill="#FACC15" />
                    <rect x="-3" y="1" width="6" height="4" rx="1.5" fill="#FACC15" />
                    <circle cx="-2" cy="-4" r="1.2" fill="#0F172A" />
                    <circle cx="2" cy="-4" r="1.2" fill="#0F172A" />
                    <line x1="-1.5" y1="2" x2="-1.5" y2="5" stroke="#0F172A" strokeWidth="1" />
                    <line x1="1.5" y1="2" x2="1.5" y2="5" stroke="#0F172A" />
                  </g>

                  {/* Nozel Semprot Hitam */}
                  <rect x="0" y="-8" width="10" height="10" rx="2" fill="#0F172A" stroke={c.outline} strokeWidth="2" />
                  <circle cx="10" cy="-3" r="2.2" fill="#EF4444" />

                  {/* Jari-Jari Tangan Menggenggam Tabung */}
                  <g transform="translate(-2, 28)">
                    <rect x="-6" y="-6" width="14" height="9" rx="3.5" fill={c.skin} stroke={c.outline} strokeWidth="2.2" />
                    <rect x="-6" y="5" width="14" height="9" rx="3.5" fill={c.skin} stroke={c.outline} strokeWidth="2.2" />
                    <rect x="-6" y="16" width="14" height="9" rx="3.5" fill={c.skin} stroke={c.outline} strokeWidth="2.2" />
                  </g>
                  {/* Ibu Jari Menekan Katup Nozel */}
                  <ellipse cx="4" cy="-2" rx="6" ry="8" fill={c.skin} stroke={c.outline} strokeWidth="2.2" transform="rotate(-15 4 -2)" />
                </g>
              </g>
            )}
          </g>

          {/* ===================================================================
              5. KEPALA, RAMBUT & WAJAH (SIMETRIS, RAPI, YOUTHFUL & BERSIH)
             =================================================================== */}
          <g id="head-and-face" transform={`rotate(${headTilt} 140 145)`}>
            {/* Telinga Kiri & Kanan (Simetris: 140 - 54 = 86, 140 + 54 = 194) */}
            <circle cx="86" cy="146" r="13" fill={c.skin} stroke={c.outline} strokeWidth="3" />
            <circle cx="194" cy="146" r="13" fill={c.skin} stroke={c.outline} strokeWidth="3" />
            <path d="M 84 143 Q 88 148 84 151" fill="none" stroke={c.skinShadow} strokeWidth="2" strokeLinecap="round" />
            <path d="M 196 143 Q 192 148 196 151" fill="none" stroke={c.skinShadow} strokeWidth="2" strokeLinecap="round" />

            {/* Bentuk Wajah Utama Oval Proporsional (Simetris di Tengah X: 140) */}
            <ellipse
              cx="140"
              cy="142"
              rx="49"
              ry="53"
              fill={c.skin}
              stroke={c.outline}
              strokeWidth="3.2"
            />

            {/* Rona Pipi Manis Halus (Merah Terbakar saat Marah) */}
            <ellipse cx="108" cy="154" rx={activePose === "angry" ? "10" : "7"} ry={activePose === "angry" ? "6" : "4.5"} fill={activePose === "angry" ? "#EF4444" : "#FDA4AF"} opacity={activePose === "angry" ? 0.65 : 0.32} />
            <ellipse cx="172" cy="154" rx={activePose === "angry" ? "10" : "7"} ry={activePose === "angry" ? "6" : "4.5"} fill={activePose === "angry" ? "#EF4444" : "#FDA4AF"} opacity={activePose === "angry" ? 0.65 : 0.32} />

            {/* HEADWEAR & RAMBUT (Peci Hitam Host vs Textured Fringe Sahabat vs Quiff) */}
            {hairStyle === "peci" ? (
              <g id="headwear-peci">
                {/* Siluet Utama Peci Hitam Nasional / Kopiah Modern Elegan
                    - Ketinggian dipangkas pas & proporsional (puncak Y: 60, bukan 45 yang terlalu tinggi)
                    - Melengkung rapi di atas daun telinga (Y: 126-128) tanpa memotong telinga
                    - Memiliki jambang tipis rapi di depan telinga (lebar 5px, Y: 142)
                    - Lengkungan rim dahi proporsional (Y: 98-100), dahi terbuka cerdas & ramah
                    - Siluet modern songkok / peci nasional yang pas di kepala */}
                <path
                  d="M 82 134 
                     C 84 112 88 88 96 74 
                     C 106 63 120 60 140 60 
                     C 160 60 174 63 184 74 
                     C 192 88 196 112 198 134 
                     C 197 126 192 126 190 128 
                     L 190 142 
                     L 185 142 
                     L 185 124 
                     C 180 112 164 98 140 98 
                     C 116 98 100 112 95 124 
                     L 95 142 
                     L 90 142 
                     L 90 128 
                     C 88 126 83 126 82 134 Z"
                  fill={`url(#${hairGradId})`}
                  stroke={c.outline}
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                {/* Garis Lipatan / Jahitan Rim Bawah Peci (Seam Line Elegan) */}
                <path
                  d="M 96 122 C 104 112 118 101 140 101 C 162 101 176 112 184 122"
                  fill="none"
                  stroke={c.hairHighlight}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.75"
                />

                {/* Kilau Halus Kain Beludru Peci (Velvet Sheen) */}
                <path
                  d="M 116 66 Q 140 62 164 66"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  opacity="0.16"
                  strokeLinecap="round"
                />
              </g>
            ) : hairStyle === "messy" ? (
              <g id="hair-textured-fringe">
                {/* Silhouette Utama: Textured Crop / Two-Block Kasual Trendy
                    - Tidak memotong telinga: melengkung rapi di atas daun telinga (Y: 126-128)
                    - Sideburns / jambang presisi berketebalan natural (lebar 5px, Y: 142)
                    - Mahkota bervolume dinamis natural bertekstur modern (Y: 60-64)
                    - Poni bertekstur lembut di atas dahi (Y: 104-108), proporsional & bebas taring tajam */}
                <path
                  d="M 82 134 
                     C 83 112 86 90 94 76 
                     C 102 65 114 62 126 64 
                     C 134 60 148 60 162 64 
                     C 174 66 184 76 191 86 
                     C 196 98 198 114 198 134 
                     C 197 126 192 126 190 128 
                     L 190 142 
                     L 185 142 
                     L 185 124 
                     C 184 114 178 106 170 106 
                     C 164 104 156 104 150 108 
                     C 144 103 136 103 130 108 
                     C 122 104 112 105 104 110 
                     C 98 114 96 120 95 124 
                     L 95 142 
                     L 90 142 
                     L 90 128 
                     C 88 126 83 126 82 134 Z"
                  fill={`url(#${hairGradId})`}
                  stroke={c.outline}
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                {/* Detail Garis Helai Poni Bertekstur (Layering Alami) */}
                <path
                  d="M 129 108 C 133 113 139 114 145 111"
                  fill="none"
                  stroke={c.outline}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 150 108 C 154 113 160 114 166 111"
                  fill="none"
                  stroke={c.outline}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Aksen Aliran Tekstur Rambut di Mahkota Kepala */}
                <g fill="none" stroke={c.hairHighlight} strokeWidth="2.2" opacity="0.75" strokeLinecap="round">
                  <path d="M 112 74 Q 128 68 144 71" />
                  <path d="M 148 70 Q 164 72 176 80" />
                  <path d="M 124 83 Q 138 80 154 82" />
                </g>
              </g>
            ) : (
              <g id="hair-modern-quiff">
                {/* Silhouette Utama: Modern Side-Part Quiff Taper Fade Host
                    - Taper fade rapi di sisi kiri (Y: 82), menyatu ke belahan rambut (X: 112, Y: 80)
                    - Quiff bervolume maskulin menyisir ke kanan (puncak Y: 56 pada X: 150)
                    - Melengkung bersih di atas telinga tanpa memotong daun telinga
                    - Jambang (sideburns) presisi berketebalan 5px di depan telinga (Y: 142)
                    - Garis dahi elegan, terbuka cerdas & santun (Y: 96-102) */}
                <path
                  d="M 82 134 
                     C 83 110 86 90 94 82 
                     C 100 76 106 78 112 80 
                     C 118 66 132 56 150 56 
                     C 168 56 184 65 191 80 
                     C 196 90 198 108 198 134 
                     C 197 126 192 126 190 128 
                     L 190 142 
                     L 185 142 
                     L 185 124 
                     C 184 110 178 98 168 96 
                     C 152 92 134 92 118 97 
                     C 110 100 104 106 102 114 
                     C 98 118 96 122 95 126 
                     L 95 142 
                     L 90 142 
                     L 90 128 
                     C 88 126 83 126 82 134 Z"
                  fill={`url(#${hairGradId})`}
                  stroke={c.outline}
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                {/* Garis Aksen Belahan Rambut (Side-Part) */}
                <path
                  d="M 108 80 C 111 88 113 96 118 97"
                  fill="none"
                  stroke={c.hairHighlight}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  opacity="0.85"
                />

                {/* Garis Aliran Sisiran Quiff (Volume & Direction) */}
                <g fill="none" stroke={c.hairHighlight} strokeWidth="2.2" opacity="0.8" strokeLinecap="round">
                  <path d="M 126 67 Q 146 62 168 68" />
                  <path d="M 132 77 Q 152 72 174 79" />
                  <path d="M 138 87 Q 154 83 170 89" />
                </g>
              </g>
            )}

            {/* Hidung Kartun Halus */}
            <path
              d="M 137 146 Q 140 151 143 146"
              fill="none"
              stroke={c.skinShadow}
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* ALIS (Mata & Alis Menyesuaikan Emosi Pose) */}
            <g id="eyebrows">
              {activePose === "angry" ? (
                <>
                  {/* Alis Menukik Tajam Sangat Marah */}
                  <path d="M 106 122 L 133 112" stroke={c.outline} strokeWidth="3.6" strokeLinecap="round" />
                  <path d="M 174 122 L 147 112" stroke={c.outline} strokeWidth="3.6" strokeLinecap="round" />
                </>
              ) : activePose === "calming" ? (
                <>
                  {/* Alis Lembut Santun Penuh Kasih Sayang */}
                  <path d="M 108 114 Q 120 110 131 116" fill="none" stroke={c.outline} strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M 172 114 Q 160 110 149 116" fill="none" stroke={c.outline} strokeWidth="2.8" strokeLinecap="round" />
                </>
              ) : activePose === "regret" ? (
                <>
                  {/* Alis Canggung / Menyesal Miring ke Luar */}
                  <path d="M 110 114 L 131 121" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                  <path d="M 170 114 L 149 121" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                </>
              ) : activePose === "alert" ? (
                <>
                  <path d="M 108 114 Q 120 102 131 114" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 149 114 Q 160 102 172 114" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                </>
              ) : activePose === "dizzy" ? (
                <>
                  <path d="M 108 120 Q 118 126 131 116" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 149 116 Q 162 126 172 120" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                </>
              ) : activePose === "curious" ? (
                <>
                  <path d="M 108 116 Q 120 120 131 118" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 149 110 Q 160 102 172 110" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                </>
              ) : activePose === "spraying" ? (
                <>
                  {/* Alis Licik / Acuh Menukik Miring */}
                  <path d="M 108 116 L 132 112" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                  <path d="M 172 112 L 148 116" stroke={c.outline} strokeWidth="3.2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d="M 108 118 Q 120 112 131 118" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 149 118 Q 160 112 172 118" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                </>
              )}
            </g>

            {/* MATA (Binar Ramah, Bersih, Ekspresi Dinamis Sesuai Pose) */}
            <g id="eyes">
              {activePose === "dizzy" ? (
                <>
                  <g transform="translate(120, 134) scale(0.6)">
                    <path d="M 0 0 m -6,0 a 6,6 0 1,0 12,0 a 12,12 0 1,0 -24,0" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                  </g>
                  <g transform="translate(160, 134) scale(0.6)">
                    <path d="M 0 0 m -6,0 a 6,6 0 1,0 12,0 a 12,12 0 1,0 -24,0" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                  </g>
                </>
              ) : activePose === "peaceful" ? (
                <>
                  {/* Mata Tertutup Tenang Khusyuk / Damai */}
                  <path d="M 112 135 Q 120 144 128 135" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 152 135 Q 160 144 168 135" fill="none" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                </>
              ) : activePose === "calming" ? (
                <>
                  {/* Mata Terbuka Ramah & Penuh Kasih (Menatap Lawan Bicara dengan Empati) */}
                  <ellipse cx="120" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="122" cy="134" rx="5" ry="5.8" fill="#5A3825" />
                  <circle cx="122" cy="134" r="2.8" fill={c.outline} />
                  <circle cx="123.8" cy="131.8" r="1.6" fill="#FFFFFF" />
                  <circle cx="120" cy="135.5" r="0.8" fill="#FFFFFF" />

                  <ellipse cx="160" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="162" cy="134" rx="5" ry="5.8" fill="#5A3825" />
                  <circle cx="162" cy="134" r="2.8" fill={c.outline} />
                  <circle cx="163.8" cy="131.8" r="1.6" fill="#FFFFFF" />
                  <circle cx="160" cy="135.5" r="0.8" fill="#FFFFFF" />
                </>
              ) : activePose === "angry" ? (
                <>
                  {/* Mata Melotot Tajam Marah */}
                  <path d="M 112 128 L 129 135 L 125 142 L 112 138 Z" fill="#FFFFFF" stroke={c.outline} strokeWidth="1.8" />
                  <circle cx="121" cy="135" r="2.5" fill="#DC2626" />
                  <circle cx="121" cy="135" r="1.4" fill={c.outline} />

                  <path d="M 168 128 L 151 135 L 155 142 L 168 138 Z" fill="#FFFFFF" stroke={c.outline} strokeWidth="1.8" />
                  <circle cx="159" cy="135" r="2.5" fill="#DC2626" />
                  <circle cx="159" cy="135" r="1.4" fill={c.outline} />
                </>
              ) : activePose === "regret" ? (
                <>
                  {/* Mata Canggung Melirik ke Bawah Malu */}
                  <ellipse cx="120" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="120.5" cy="137" rx="4.5" ry="4.5" fill="#5A3825" />
                  <circle cx="120.5" cy="137" r="2.2" fill={c.outline} />
                  <circle cx="122" cy="135.5" r="1.2" fill="#FFFFFF" />

                  <ellipse cx="160" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="160.5" cy="137" rx="4.5" ry="4.5" fill="#5A3825" />
                  <circle cx="160.5" cy="137" r="2.2" fill={c.outline} />
                  <circle cx="162" cy="135.5" r="1.2" fill="#FFFFFF" />
                </>
              ) : activePose === "alert" ? (
                <>
                  {/* Mata Terbelalak Panik / Waspada */}
                  <ellipse cx="120" cy="134" rx="8.5" ry="9.5" fill="#FFFFFF" stroke={c.outline} strokeWidth="1.5" />
                  <ellipse cx="120" cy="134" rx="4.2" ry="5.2" fill="#5A3825" />
                  <circle cx="120" cy="134" r="2" fill={c.outline} />
                  <circle cx="121.5" cy="132" r="1.2" fill="#FFFFFF" />

                  <ellipse cx="160" cy="134" rx="8.5" ry="9.5" fill="#FFFFFF" stroke={c.outline} strokeWidth="1.5" />
                  <ellipse cx="160" cy="134" rx="4.2" ry="5.2" fill="#5A3825" />
                  <circle cx="160" cy="134" r="2" fill={c.outline} />
                  <circle cx="161.5" cy="132" r="1.2" fill="#FFFFFF" />
                </>
              ) : activePose === "curious" ? (
                <>
                  {/* Mata Berpikir / Penasaran */}
                  <ellipse cx="120" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="122" cy="132.5" rx="5" ry="6" fill="#5A3825" />
                  <circle cx="122" cy="132.5" r="2.8" fill={c.outline} />
                  <circle cx="123.8" cy="130.5" r="1.6" fill="#FFFFFF" />
                  <circle cx="120" cy="134" r="0.8" fill="#FFFFFF" />

                  <ellipse cx="160" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="162" cy="132.5" rx="5" ry="6" fill="#5A3825" />
                  <circle cx="162" cy="132.5" r="2.8" fill={c.outline} />
                  <circle cx="163.8" cy="130.5" r="1.6" fill="#FFFFFF" />
                  <circle cx="160" cy="134" r="0.8" fill="#FFFFFF" />
                </>
              ) : activePose === "spraying" ? (
                <>
                  {/* Mata Melirik Fokus & Licik ke Arah Semprotan Racun */}
                  <ellipse cx="120" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="123" cy="135" rx="5" ry="5.8" fill="#5A3825" />
                  <circle cx="123.5" cy="135" r="2.8" fill={c.outline} />
                  <circle cx="124.8" cy="132.8" r="1.5" fill="#FFFFFF" />

                  <ellipse cx="160" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="163" cy="135" rx="5" ry="5.8" fill="#5A3825" />
                  <circle cx="163.5" cy="135" r="2.8" fill={c.outline} />
                  <circle cx="164.8" cy="132.8" r="1.5" fill="#FFFFFF" />
                </>
              ) : isBlinking ? (
                <>
                  <path d="M 112 135 L 128 135" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 152 135 L 168 135" stroke={c.outline} strokeWidth="3" strokeLinecap="round" />
                </>
              ) : (
                <>
                  {/* Mata Ramah Baku (Default) */}
                  <ellipse cx="120" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="120.5" cy="134" rx="5" ry="6" fill="#5A3825" />
                  <circle cx="120.5" cy="134" r="2.8" fill={c.outline} />
                  <circle cx="122.5" cy="131.5" r="1.6" fill="#FFFFFF" />
                  <circle cx="118.5" cy="135.5" r="0.8" fill="#FFFFFF" />

                  <ellipse cx="160" cy="134" rx="7.5" ry="8.5" fill="#FFFFFF" />
                  <ellipse cx="160.5" cy="134" rx="5" ry="6" fill="#5A3825" />
                  <circle cx="160.5" cy="134" r="2.8" fill={c.outline} />
                  <circle cx="162.5" cy="131.5" r="1.6" fill="#FFFFFF" />
                  <circle cx="158.5" cy="135.5" r="0.8" fill="#FFFFFF" />
                </>
              )}
            </g>

            {/* KACAMATA MODERN ELEGANT (Opsional: Host Pakai, Sahabat Kasual Tanpa Kacamata) */}
            {hasGlasses && (
              <g id="glasses" fill="none" stroke={c.glasses} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                {/* Lensa Kiri Rounded Pantos */}
                <rect x="106" y="121" width="28" height="26" rx="8" fill="rgba(255,255,255,0.06)" />
                {/* Lensa Kanan Rounded Pantos */}
                <rect x="146" y="121" width="28" height="26" rx="8" fill="rgba(255,255,255,0.06)" />
                {/* Jembatan Hidung Kacamata */}
                <path d="M 134 130 Q 140 126 146 130" strokeWidth="2.4" />
                {/* Tangkai Kacamata ke Telinga */}
                <line x1="106" y1="130" x2="94" y2="133" strokeWidth="2.2" />
                <line x1="174" y1="130" x2="186" y2="133" strokeWidth="2.2" />
                {/* Refleksi Kilau Kaca Bersih */}
                <line x1="112" y1="126" x2="118" y2="126" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.75" />
                <line x1="152" y1="126" x2="158" y2="126" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.75" />
              </g>
            )}

            {/* MULUT */}
            <g id="mouth">
              {activePose === "angry" ? (
                <g transform="translate(140, 164)">
                  {/* Mulut Menggeram Gemas Menahan Marah / Menggertak Gigi */}
                  <rect x="-10" y="-3.5" width="20" height="9" rx="3" fill="#FFFFFF" stroke={c.outline} strokeWidth="2.4" />
                  <line x1="-10" y1="1" x2="10" y2="1" stroke={c.outline} strokeWidth="1.8" />
                  <line x1="-3" y1="-3.5" x2="-3" y2="5.5" stroke={c.outline} strokeWidth="1.5" />
                  <line x1="3" y1="-3.5" x2="3" y2="5.5" stroke={c.outline} strokeWidth="1.5" />
                </g>
              ) : activePose === "explaining" || activePose === "pointing" ? (
                <g transform="translate(140, 163)">
                  <path d="M -9 0 Q 0 9 9 0 Z" fill="#991B1B" stroke={c.outline} strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M -6 0 Q 0 2.5 6 0 Z" fill="#FFFFFF" />
                </g>
              ) : activePose === "alert" ? (
                <ellipse cx="140" cy="165" rx="5.5" ry="7.5" fill="#991B1B" stroke={c.outline} strokeWidth="2.5" />
              ) : activePose === "dizzy" ? (
                <path d="M 133 165 Q 137 160 140 165 T 147 163" fill="none" stroke={c.outline} strokeWidth="2.5" strokeLinecap="round" />
              ) : activePose === "curious" ? (
                <path d="M 136 163 Q 142 166 146 162" fill="none" stroke={c.outline} strokeWidth="2.6" strokeLinecap="round" />
              ) : activePose === "spraying" ? (
                <path d="M 133 165 Q 140 171 150 163" fill="none" stroke={c.outline} strokeWidth="2.8" strokeLinecap="round" />
              ) : activePose === "regret" ? (
                <path d="M 134 165 Q 140 160 146 164" fill="none" stroke={c.outline} strokeWidth="2.6" strokeLinecap="round" />
              ) : (
                <path
                  d="M 133 162 Q 140 169 147 162"
                  fill="none"
                  stroke={c.outline}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              )}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
