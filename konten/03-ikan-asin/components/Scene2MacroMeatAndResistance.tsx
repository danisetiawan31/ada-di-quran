import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";
import { PopElement } from "../../../src/components/PopElement";
import { CameraRig } from "../../../src/components/CameraRig";
import { FONTS } from "../../../src/theme/fonts";
import {
  MainCharacter,
  CharacterPose,
} from "../../../src/components/characters/MainCharacter";

export const Scene2MacroMeatAndResistance: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // KAMERA & TRANSISI (Frame 0 - 345 lokal | Frame 540 - 885 global)
  // Sub-Scene 2A (Penetrasi Racun di Talenan): Frame 0 - 210
  // Sub-Scene 2B (Dua Panel Komik Aksi Cuci vs Goreng): Frame 210 - 345
  // ---------------------------------------------------------------------------
  const cameraZoom = interpolate(frame, [205, 230], [1.04, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [205, 230], [-15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // GERAKAN PLAYFUL BERKELANJUTAN (Hukum "Layar Tidak Boleh Mati")
  // ---------------------------------------------------------------------------
  const playfulBob = Math.sin(frame / 9) * 4;
  const wiggleFish = Math.sin(frame / 6) * 3;
  const waterSplashWobble = Math.sin(frame * 1.8) * 8;
  const flameDance = Math.sin(frame * 2.2) * 10;
  const steamRise = (frame * 3.5) % 80;

  // ---------------------------------------------------------------------------
  // ACT 1: TETESAN & REMBESAN RACUN DI TALENAN DAPUR (Frame 0 - 210)
  // ---------------------------------------------------------------------------
  // Tetesan racun hijau jatuh dari atas (Frame 35 - 72)
  const dropY = interpolate(frame, [35, 72], [360, 800], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dropScaleY = interpolate(frame, [35, 68, 72], [1.4, 1.2, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dropOpacity = interpolate(frame, [35, 42, 70, 78], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rembesan racun hijau menyebar di badan ikan (Frame 72 - 205)
  const toxicSpread = interpolate(frame, [72, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Kaca pembesar forensik kartun pop-in (Frame 90+)
  const loupeScale = spring({
    frame: frame - 90,
    fps: 30,
    config: { damping: 12, stiffness: 130 },
  });

  // ---------------------------------------------------------------------------
  // ACT 2: DUAL COMIC ACTION PANELS (Frame 210 - 345)
  // Masuk dengan spring kekenyalan kartun (squash & stretch)
  // ---------------------------------------------------------------------------
  const isAct2 = frame >= 210;
  const panelSpringLeft = spring({
    frame: frame - 210,
    fps: 30,
    config: { damping: 13, stiffness: 120 },
  });
  const panelSpringRight = spring({
    frame: frame - 220,
    fps: 30,
    config: { damping: 13, stiffness: 120 },
  });

  // Dinamika Pose Host Peci Hitam
  const hostPose: CharacterPose =
    frame < 90 ? "curious" : frame < 210 ? "alert" : "explaining";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFBEB",
        overflow: "hidden",
      }}
    >
      <CameraRig
        zoom={cameraZoom}
        panY={cameraPanY}
        whooshAtFrames={[0, 210]}
      >
        {/* =========================================================================
            LAYER 1: BACKGROUND DAPUR TERANG HANGAT (BRIGHT WARM KITCHEN) & SVG PROPS
           ========================================================================= */}
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, overflow: "visible" }}
        >
          <defs>
            {/* Latar Belakang Dinding Dapur Hangat */}
            <linearGradient id="kitchenWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="60%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>

            {/* Countertop Meja Dapur */}
            <linearGradient id="countertopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="30%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Lantai Terakota Dapur */}
            <linearGradient id="kitchenFloorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C2410C" />
              <stop offset="40%" stopColor="#9A3412" />
              <stop offset="100%" stopColor="#431407" />
            </linearGradient>

            {/* Vignette Gelap Bawah Kontras Subtitle */}
            <linearGradient id="subtitleVignetteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#431407" stopOpacity="0" />
              <stop offset="40%" stopColor="#1E1B18" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
            </linearGradient>

            {/* Gradasi Talenan Kayu Kartun Bubbly */}
            <linearGradient id="cartoonWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="40%" stopColor="#B45309" />
              <stop offset="85%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Gradasi Ikan Asin Kartun Autentik */}
            <linearGradient id="cartoonFishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F8FAFC" />
              <stop offset="65%" stopColor="#E2E8F0" />
              <stop offset="85%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            {/* Gradasi Panel Komik Kiri (Air Bersih) */}
            <linearGradient id="panelWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="45%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            {/* Gradasi Panel Komik Kanan (Minyak Panas) */}
            <linearGradient id="panelFireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9A3412" />
              <stop offset="45%" stopColor="#7C2D12" />
              <stop offset="100%" stopColor="#431407" />
            </linearGradient>

            {/* Gradasi Minyak Goreng Panas Berbusa */}
            <radialGradient id="oilJacuzziGrad" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#FACC15" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>

            {/* Gradasi Kucuran Air Kran Kartun */}
            <linearGradient id="cartoonWaterJet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#BAE6FD" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.75" />
            </linearGradient>

            {/* Bayangan Blok Stiker Komik Playful */}
            <filter id="comicStickerShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="8" dy="12" stdDeviation="0" floodColor="#0F172A" floodOpacity="0.6" />
            </filter>
            <filter id="toxicBubbleGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#4ADE80" floodOpacity="0.95" />
            </filter>
            <filter id="stampImpactGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#EF4444" floodOpacity="0.65" />
            </filter>
          </defs>

          {/* Dinding Dapur Hangat (Y: 0 - 1200) */}
          <rect x="0" y="0" width="1080" height="1200" fill="url(#kitchenWallGrad)" />

          {/* Pola Garis Ubin Keramik Halus */}
          <g opacity="0.16" stroke="#D97706" strokeWidth="1.5">
            {[80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120].map((y) => (
              <line key={`tile-h-${y}`} x1="0" y1={y} x2="1080" y2={y} />
            ))}
            {Array.from({ length: 14 }).map((_, r) => {
              const y = r * 80;
              const offset = (r % 2) * 60;
              return Array.from({ length: 10 }).map((_, col) => {
                const x = offset + col * 120;
                return <line key={`tile-v-${r}-${col}`} x1={x} y1={y} x2={x} y2={y + 80} />;
              });
            })}
          </g>

          {/* Sunbeam Lembut Menembus dari Kiri Atas */}
          <g opacity="0.22">
            <polygon points="0,0 220,0 620,1200 0,1200" fill="#FEF08A" />
            <polygon points="260,0 500,0 980,1200 420,1200" fill="#FEF9C3" />
          </g>

          {/* Countertop Meja Dapur (Y: 1200 - 1240) */}
          <rect x="0" y="1200" width="1080" height="40" fill="url(#countertopGrad)" />
          <line x1="0" y1="1200" x2="1080" y2="1200" stroke="#78350F" strokeWidth="4" />
          <line x1="0" y1="1240" x2="1080" y2="1240" stroke="#451A03" strokeWidth="6" />

          {/* Lantai Terakota Dapur (Y: 1240 - 1920) */}
          <rect x="0" y="1240" width="1080" height="680" fill="url(#kitchenFloorGrad)" />
          <g opacity="0.12" stroke="#FEF3C7" strokeWidth="2">
            {[1340, 1440, 1540, 1640, 1740, 1840].map((y) => (
              <line key={`floor-h-${y}`} x1="0" y1={y} x2="1080" y2={y} />
            ))}
            {[0, 180, 360, 540, 720, 900, 1080].map((x) => (
              <line key={`floor-v-${x}`} x1={x} y1="1240" x2={x} y2="1920" />
            ))}
          </g>

          {/* Vignette Gelap Bawah Menjamin Kontras Subtitle 100% */}
          <rect x="0" y="1360" width="1080" height="560" fill="url(#subtitleVignetteGrad)" />

          {/* =========================================================================
              ACT 1: IKAN ASIN DI ATAS TALENAN (SISI KANAN X: 310 - 1010) (Frame 0 - 210)
             ========================================================================= */}
          {!isAct2 && (
            <g id="act1-playful-cutting-board" transform={`translate(0, ${playfulBob})`}>
              {/* TALENAN KAYU KARTUN DI SISI KANAN (Center X: 680, Y: 800, Scale 0.80) */}
              <g
                id="cartoon-cutting-board"
                transform="translate(680, 800) scale(0.80) rotate(-3)"
                filter="url(#comicStickerShadow)"
              >
                {/* Bayangan Dasar & Ketebalan Kayu 3D */}
                <rect x="-420" y="-270" width="840" height="540" rx="42" fill="#451A03" />
                <rect
                  x="-420"
                  y="-290"
                  width="840"
                  height="540"
                  rx="42"
                  fill="url(#cartoonWoodGrad)"
                  stroke="#0F172A"
                  strokeWidth="8"
                />
                {/* Gagang Pegangan Talenan di Sebelah Kiri */}
                <rect x="-490" y="-70" width="100" height="140" rx="28" fill="url(#cartoonWoodGrad)" stroke="#0F172A" strokeWidth="8" />
                <circle cx="-440" cy="0" r="24" fill="#0F172A" />

                {/* Serat Garis Urat Kayu Kartun Playful */}
                <path d="M -360 -180 Q 0 -220 360 -180" stroke="#78350F" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
                <path d="M -340 0 Q 0 -40 340 0" stroke="#78350F" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.45" />
                <path d="M -360 180 Q 0 140 360 180" stroke="#78350F" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
              </g>

              {/* IKAN ASIN KARTUN PLAYFUL DI TALENAN */}
              <g
                id="playful-salted-fish"
                transform={`translate(680, 800) scale(0.80) rotate(${wiggleFish})`}
                filter="url(#comicStickerShadow)"
              >
                {/* Bayangan Ikan di Talenan */}
                <ellipse cx="10" cy="30" rx="340" ry="110" fill="#451A03" opacity="0.35" />

                {/* Ekor Ikan Cabang Dua Kartun */}
                <polygon
                  points="-270,0 -350,-70 -310,0 -350,70"
                  fill="#CBD5E1"
                  stroke="#0F172A"
                  strokeWidth="7"
                  strokeLinejoin="round"
                />

                {/* Sirip Samping Kartun Lucu */}
                <path d="M -120 -95 Q -60 -140 -20 -95" fill="#E2E8F0" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
                <path d="M -120 95 Q -60 140 -20 95" fill="#E2E8F0" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

                {/* Badan Ikan Belah Punggung Gemuk Kartun */}
                <path
                  d="M -270 0 Q -170 -125 50 -125 Q 230 -105 320 -20 Q 340 0 320 20 Q 230 105 50 125 Q -170 125 -270 0 Z"
                  fill="url(#cartoonFishGrad)"
                  stroke="#0F172A"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />

                {/* Alur Tulang Belakang Ikan Asin Tebal Kartun */}
                <path
                  d="M -260 0 Q 30 -6 290 0"
                  stroke="#334155"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Duri Ikan Kartun Menyamping Lucu */}
                {[-170, -110, -50, 10, 70, 130, 190, 240].map((x, idx) => (
                  <g key={`playful-rib-${idx}`}>
                    <line x1={x} y1="0" x2={x - 22} y2="-55" stroke="#64748B" strokeWidth="5.5" strokeLinecap="round" />
                    <line x1={x} y1="0" x2={x - 22} y2="55" stroke="#64748B" strokeWidth="5.5" strokeLinecap="round" />
                  </g>
                ))}

                {/* Mata Ikan Asin Kartun Konyol (Mata Ikan Kering Deadpan X_X) */}
                <circle cx="280" cy="-8" r="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="5" />
                <line x1="272" y1="-16" x2="288" y2="0" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                <line x1="288" y1="-16" x2="272" y2="0" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx="315" cy="5" rx="6" ry="10" fill="#0F172A" />

                {/* Butiran Garam Laut Bubbly Putih */}
                <circle cx="-130" cy="-35" r="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="-70" cy="45" r="6.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="20" cy="-45" r="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="90" cy="40" r="6.5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="170" cy="-30" r="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />

                {/* NODA RACUN MEREMBES MASUK (Frame 72+) */}
                {toxicSpread > 0 && (
                  <g opacity={toxicSpread} filter="url(#toxicBubbleGlow)">
                    <ellipse cx="60" cy="0" rx={170 * toxicSpread} ry={85 * toxicSpread} fill="#22C55E" opacity="0.65" />
                    <ellipse cx="60" cy="0" rx={110 * toxicSpread} ry={55 * toxicSpread} fill="#4ADE80" opacity="0.85" />

                    {/* Karakter Racun Hijau Nakal Mengedip di Tengah Ikan */}
                    <g transform="translate(60, 0)">
                      <circle cx="0" cy="0" r="28" fill="#15803D" stroke="#0F172A" strokeWidth="4" />
                      <circle cx="-9" cy="-5" r="6" fill="#FFFFFF" />
                      <circle cx="-9" cy="-5" r="3" fill="#0F172A" />
                      <circle cx="9" cy="-5" r="6" fill="#FFFFFF" />
                      <circle cx="9" cy="-5" r="3" fill="#0F172A" />
                      <path d="M -10 8 Q 0 16 10 8" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                    </g>
                  </g>
                )}
              </g>

              {/* TETESAN RACUN INSEKTISIDA KARTUN JATUH (Frame 35 - 78) */}
              {dropOpacity > 0 && (
                <g
                  transform={`translate(728, ${dropY}) scale(1.2, ${dropScaleY})`}
                  opacity={dropOpacity}
                  filter="url(#toxicBubbleGlow)"
                >
                  <path
                    d="M 0 -35 C 16 -12 24 10 24 24 C 24 38 12 50 0 50 C -12 50 -24 38 -24 24 C -24 10 -16 -12 0 -35 Z"
                    fill="#4ADE80"
                    stroke="#0F172A"
                    strokeWidth="4.5"
                  />
                  <ellipse cx="-7" cy="18" rx="6" ry="10" fill="#FFFFFF" opacity="0.9" />
                </g>
              )}

              {/* KACA PEMBESAR FORENSIK KARTUN LUCU (Frame 90+) */}
              {loupeScale > 0 && (
                <g
                  id="cartoon-loupe"
                  transform={`translate(720, 800) scale(${loupeScale})`}
                  filter="url(#comicStickerShadow)"
                >
                  {/* Gagang Kayu Melintang Tebal */}
                  <path d="M 110 110 L 220 220" stroke="#0F172A" strokeWidth="36" strokeLinecap="round" />
                  <path d="M 120 120 L 210 210" stroke="#F59E0B" strokeWidth="22" strokeLinecap="round" />

                  {/* Bingkai Lensa Logam Tebal Kartun */}
                  <circle cx="0" cy="0" r="160" fill="none" stroke="#0F172A" strokeWidth="20" />
                  <circle cx="0" cy="0" r="148" fill="none" stroke="#F8FAFC" strokeWidth="12" />

                  {/* Kaca Lensa Biru Transparan */}
                  <circle cx="0" cy="0" r="140" fill="#38BDF8" fillOpacity="0.2" />

                  {/* Serat Daging Ikan Merah Muda di Balik Lensa */}
                  <g opacity="0.85">
                    {[-90, -50, -10, 30, 70].map((ly, i) => (
                      <path
                        key={`meat-fiber-${i}`}
                        d={`M -120 ${ly} Q 0 ${ly + 25} 120 ${ly}`}
                        stroke="#FDA4AF"
                        strokeWidth="14"
                        strokeLinecap="round"
                        fill="none"
                      />
                    ))}
                  </g>

                  {/* Kilau Kaca Lensa Miring */}
                  <path d="M -90 -90 Q -20 -115 50 -90 L -50 30 Z" fill="#FFFFFF" opacity="0.35" />

                  {/* TENGKORAK RACUN KARTUN MENYERINGAI JAHIL MENCENGKRAM DAGING */}
                  <g transform={`scale(${1.35 + Math.sin(frame / 6) * 0.08})`} filter="url(#toxicBubbleGlow)">
                    <circle cx="0" cy="-8" r="30" fill="#EF4444" stroke="#0F172A" strokeWidth="4.5" />
                    <rect x="-18" y="8" width="36" height="20" rx="6" fill="#EF4444" stroke="#0F172A" strokeWidth="4.5" />
                    <circle cx="-11" cy="-8" r="9" fill="#0F172A" />
                    <circle cx="11" cy="-8" r="9" fill="#0F172A" />
                    <circle cx="-9" cy="-10" r="3" fill="#FFFFFF" />
                    <circle cx="13" cy="-10" r="3" fill="#FFFFFF" />
                    <polygon points="0,-2 -4,4 4,4" fill="#0F172A" />
                    <line x1="-8" y1="18" x2="-8" y2="28" stroke="#0F172A" strokeWidth="3.5" />
                    <line x1="0" y1="18" x2="0" y2="28" stroke="#0F172A" strokeWidth="3.5" />
                    <line x1="8" y1="18" x2="8" y2="28" stroke="#0F172A" strokeWidth="3.5" />
                    <path d="M -24 16 Q -42 30 -30 45" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 24 16 Q 42 30 30 45" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
                  </g>
                </g>
              )}
            </g>
          )}

          {/* =========================================================================
              ACT 2: DUA PANEL KOMIK AKSI PLAYFUL (Frame 210 - 345)
              Panel Kiri: Ikan Asin Mandi di Bawah Kran (X: 280 - 660, Width: 380)
              Panel Kanan: Ikan Asin Masuk Wajan Panas (X: 680 - 1060, Width: 380)
             ========================================================================= */}
          {isAct2 && (
            <g id="act2-playful-comic-split">
              {/* =====================================================================
                  PANEL KOMIK KIRI (X: 280, Y: 370, Width: 380, Height: 840)
                 ===================================================================== */}
              <g
                id="comic-panel-water"
                transform={`translate(280, 370) scale(${panelSpringLeft})`}
                style={{ transformOrigin: "190px 420px" }}
                filter="url(#comicStickerShadow)"
              >
                {/* Bingkai Panel Komik Biru Outline Tebal */}
                <rect x="0" y="0" width="380" height="840" rx="36" fill="url(#panelWaterGrad)" stroke="#0F172A" strokeWidth="8" />

                {/* Banner Header Komik Kuning */}
                <g transform="translate(15, 24)">
                  <rect x="0" y="0" width="350" height="82" rx="22" fill="#FACC15" stroke="#0F172A" strokeWidth="6" />
                  {/* Ikon Tetesan Air Biru di Header */}
                  <g transform="translate(36, 41)">
                    <path d="M 0 -22 C 14 -7 20 6 20 18 C 20 29 11 38 0 38 C -11 38 -20 29 -20 18 C -20 6 -14 -7 0 -22 Z" fill="#0284C7" stroke="#0F172A" strokeWidth="3.5" />
                    <ellipse cx="-5" cy="14" rx="4" ry="7" fill="#FFFFFF" opacity="0.8" />
                  </g>
                </g>

                {/* PIPA KRAN AIR KARTUN MELENGKUNG REROUTED (Clearance 60px di Bawah Header) */}
                <g id="cartoon-faucet" transform="translate(190, 210)">
                  <path
                    d="M -130 30 L -50 30 Q -10 30 -10 -15 Q -10 -40 25 -40 L 45 -40 Q 75 -40 75 -15 L 75 35"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="28"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M -130 30 L -50 30 Q -10 30 -10 -15 Q -10 -40 25 -40 L 45 -40 Q 75 -40 75 -15 L 75 35"
                    fill="none"
                    stroke="#0F172A"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Pemutar Kran Merah */}
                  <circle cx="-130" cy="30" r="22" fill="#EF4444" stroke="#0F172A" strokeWidth="4.5" />
                  <rect x="-136" y="14" width="12" height="32" rx="4" fill="#FFFFFF" />
                  {/* Mulut Nozel Kran */}
                  <rect x="58" y="28" width="34" height="20" rx="5" fill="#94A3B8" stroke="#0F172A" strokeWidth="4" />
                </g>

                {/* KUCURAN AIR DERAS & CIPRATAN BUBBLY */}
                <g id="cartoon-water-gush" transform="translate(265, 255)">
                  <path
                    d={`M -20 0 Q ${-26 + waterSplashWobble} 140 -50 280 L 50 280 Q ${26 - waterSplashWobble} 140 20 0 Z`}
                    fill="url(#cartoonWaterJet)"
                    stroke="#0F172A"
                    strokeWidth="5.5"
                  />
                  <path d={`M -8 15 Q ${-12 + waterSplashWobble} 150 -28 270`} stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round" />
                  <path d={`M 10 15 Q ${12 - waterSplashWobble} 150 28 270`} stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round" />
                  <circle cx="-65" cy="265" r="10" fill="#E0F2FE" stroke="#0F172A" strokeWidth="3.5" />
                  <circle cx="65" cy="260" r="11" fill="#E0F2FE" stroke="#0F172A" strokeWidth="3.5" />
                  <circle cx="-35" cy="295" r="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
                  <circle cx="40" cy="290" r="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
                </g>

                {/* IKAN ASIN KARTUN SEDANG DISIRAM AIR */}
                <g id="fish-getting-washed" transform="translate(190, 540) scale(0.85) rotate(-4)">
                  <path
                    d="M -165 0 Q -85 -70 65 -65 Q 155 -50 175 0 Q 155 50 65 65 Q -85 70 -165 0 Z"
                    fill="url(#cartoonFishGrad)"
                    stroke="#0F172A"
                    strokeWidth="6.5"
                  />
                  <polygon points="-165,0 -205,-38 -188,0 -205,38" fill="#CBD5E1" stroke="#0F172A" strokeWidth="5.5" />
                  {[-100, -50, 0, 50, 100].map((dx, i) => (
                    <line key={`rib-wash-${i}`} x1={dx} y1="-35" x2={dx - 12} y2="35" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                  ))}
                  <circle cx="140" cy="-6" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.5" />
                  <path d="M 134 -6 Q 140 -12 146 -6 Q 146 0 140 2" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                  <ellipse cx="168" cy="4" rx="4" ry="7" fill="#0F172A" />

                  {/* RACUN HIJAU MEMEGANG PAYUNG (TIDAK LUNTUR!) */}
                  <g id="smug-poison-water" transform="translate(-10, -5)" filter="url(#toxicBubbleGlow)">
                    <g transform="translate(0, -32)">
                      <path d="M -45 0 Q 0 -45 45 0 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="4.5" />
                      <path d="M -15 0 Q 0 -45 0 -45" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                      <path d="M 15 0 Q 0 -45 0 -45" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                      <line x1="0" y1="0" x2="0" y2="35" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
                      <path d="M 0 35 Q 0 45 -8 45" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                    </g>
                    <circle cx="0" cy="5" r="32" fill="#22C55E" stroke="#0F172A" strokeWidth="4.5" />
                    <circle cx="0" cy="5" r="16" fill="#86EFAC" />
                    <circle cx="-9" cy="2" r="4.5" fill="#0F172A" />
                    <circle cx="9" cy="2" r="4.5" fill="#0F172A" />
                    <path d="M -7 12 Q 0 20 7 12" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                    <path d="M -3 15 Q 0 24 3 15 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
                  </g>
                </g>
              </g>

              {/* =====================================================================
                  PANEL KOMIK KANAN (X: 680, Y: 370, Width: 380, Height: 840)
                 ===================================================================== */}
              <g
                id="comic-panel-oil"
                transform={`translate(680, 370) scale(${panelSpringRight})`}
                style={{ transformOrigin: "190px 420px" }}
                filter="url(#comicStickerShadow)"
              >
                {/* Bingkai Panel Komik Oranye-Merah Outline Tebal */}
                <rect x="0" y="0" width="380" height="840" rx="36" fill="url(#panelFireGrad)" stroke="#0F172A" strokeWidth="8" />

                {/* Banner Header Komik Kuning */}
                <g transform="translate(15, 24)">
                  <rect x="0" y="0" width="350" height="82" rx="22" fill="#FACC15" stroke="#0F172A" strokeWidth="6" />
                  {/* Ikon Api Penggorengan di Header */}
                  <g transform="translate(36, 41)">
                    <path d="M 0 -22 C 12 -11 18 2 18 13 C 18 25 9 33 0 33 C -9 33 -18 25 -18 13 C -18 4 -11 -4 -3 -11 C -3 -3 2 1 4 1 C 8 1 10 -6 0 -22 Z" fill="#EA580C" stroke="#0F172A" strokeWidth="3.5" />
                  </g>
                </g>

                {/* WAJAN PENGGORENGAN KARTUN */}
                <g id="cartoon-wok" transform="translate(190, 420) scale(0.82)">
                  {/* Api Kompor */}
                  <g transform={`translate(0, 140) scale(${1 + Math.sin(frame * 2) * 0.08})`}>
                    <path
                      d={`M -150 0 Q -75 ${-50 + flameDance} 0 0 Q 75 ${-50 - flameDance} 150 0 L 130 45 L -130 45 Z`}
                      fill="#EF4444"
                      stroke="#0F172A"
                      strokeWidth="5.5"
                    />
                    <path
                      d={`M -105 5 Q -50 ${-35 - flameDance} 0 5 Q 50 ${-35 + flameDance} 105 5 L 90 32 L -90 32 Z`}
                      fill="#FACC15"
                    />
                  </g>

                  {/* Badan Wajan Hitam Tebal */}
                  <ellipse cx="0" cy="15" rx="205" ry="105" fill="#0F172A" stroke="#334155" strokeWidth="8" />
                  <path d="M -205 10 Q -245 10 -245 -15 Q -245 -30 -205 -15" fill="#D97706" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
                  <path d="M 205 10 Q 245 10 245 -15 Q 245 -30 195 -15" fill="#D97706" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />

                  {/* Kolam Minyak Mendidih */}
                  <ellipse cx="0" cy="15" rx="185" ry="90" fill="url(#oilJacuzziGrad)" stroke="#F59E0B" strokeWidth="5.5" />

                  {/* Gelembung Minyak Panas */}
                  {Array.from({ length: 14 }).map((_, i) => {
                    const bX = -130 + ((i * 42) % 260) + Math.sin(frame / 2 + i) * 6;
                    const bY = -35 + ((frame * 5 + i * 28) % 95);
                    const bR = 6 + (i % 3) * 5;
                    return (
                      <circle
                        key={`sizzle-${i}`}
                        cx={bX}
                        cy={bY}
                        r={bR}
                        fill="#FEF08A"
                        opacity="0.9"
                        stroke="#B45309"
                        strokeWidth="2.5"
                      />
                    );
                  })}

                  {/* Garis Uap Panas */}
                  <path
                    d={`M -70 -75 Q -60 ${-95 - steamRise} -80 -125`}
                    fill="none"
                    stroke="#FEF3C7"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                  <path
                    d={`M 70 -70 Q 80 ${-90 - steamRise} 60 -120`}
                    fill="none"
                    stroke="#FEF3C7"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    opacity="0.75"
                  />

                  {/* IKAN ASIN DIGORENG DI MINYAK */}
                  <g id="fish-frying-jacuzzi" transform="translate(0, 15)">
                    <path
                      d="M -135 0 Q -65 -45 55 -40 Q 135 -30 150 0 Q 135 30 55 40 Q -65 45 -135 0 Z"
                      fill="#FDE68A"
                      stroke="#0F172A"
                      strokeWidth="5.5"
                    />
                    <polygon points="-135,0 -165,-25 -155,0 -165,25" fill="#F59E0B" stroke="#0F172A" strokeWidth="4.5" />
                    {[-70, -20, 30, 80].map((dx, i) => (
                      <line key={`rib-fry-${i}`} x1={dx} y1="-22" x2={dx - 8} y2="22" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
                    ))}

                    {/* RACUN HIJAU SANTAI PAKAI KACAMATA HITAM & BAN RENANG */}
                    <g id="smug-poison-fire" transform="translate(10, -5)" filter="url(#toxicBubbleGlow)">
                      <ellipse cx="0" cy="18" rx="36" ry="16" fill="#F97316" stroke="#0F172A" strokeWidth="4.5" />
                      <ellipse cx="0" cy="18" rx="18" ry="8" fill="#FBBF24" />
                      <circle cx="0" cy="0" r="32" fill="#22C55E" stroke="#0F172A" strokeWidth="4.5" />
                      <circle cx="0" cy="0" r="16" fill="#86EFAC" />
                      <path d="M -16 -8 L -2 -8 L -4 4 L -14 4 Z" fill="#0F172A" />
                      <path d="M 2 -8 L 16 -8 L 14 4 L 4 4 Z" fill="#0F172A" />
                      <line x1="-2" y1="-5" x2="2" y2="-5" stroke="#0F172A" strokeWidth="3" />
                      <line x1="-12" y1="-5" x2="-8" y2="1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      <line x1="6" y1="-5" x2="10" y2="1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      <path d="M -8 11 Q 0 18 8 11" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          )}
        </svg>

        {/* =========================================================================
            LAYER 2: HOST (MainCharacter) BERPECI HITAM & BAJU KOKO (PILAR KIRI)
            Scale 1.45, Sol sepatu grounded presisi di Y: 1240
           ========================================================================= */}
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 744,
            width: 280,
            height: 560,
            zIndex: 10,
          }}
        >
          <MainCharacter
            pose={hostPose}
            scale={1.45}
            hairStyle="peci"
            outfitType="koko"
            hasGlasses={true}
            breathe={true}
            blink={true}
          />
        </div>

        {/* =========================================================================
            LAYER 3: HTML/CSS OVERLAY CARDS (MIGRASI 100% BEBAS TAG <text> SVG)
           ========================================================================= */}

        {/* TAG #1: PITA KACA PEMBESAR (Top: 920, Left: 720) (Frame 90 - 210) */}
        {!isAct2 && loupeScale > 0 && (
          <div
            style={{
              position: "absolute",
              top: 920,
              left: 720,
              transform: `translate(-50%, -50%) scale(${loupeScale})`,
              zIndex: 25,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "#FACC15",
                border: "4px solid #0F172A",
                borderRadius: 14,
                padding: "6px 20px",
                boxShadow: "4px 6px 0px #0F172A",
                fontSize: 18,
                fontWeight: 900,
                fontFamily: FONTS.title,
                color: "#0F172A",
                letterSpacing: "0.8px",
                whiteSpace: "nowrap",
              }}
            >
              MERESAP KE DAGING! ☠️
            </div>
          </div>
        )}

        {/* =========================================================================
            ACT 2: OVERLAY PANEL 1 (AIR) & PANEL 2 (MINYAK GORENG)
           ========================================================================= */}
        {isAct2 && (
          <>
            {/* ---------------------------------------------------------------------
                OVERLAY PANEL 1: UJI CUCI AIR (X: 280, Y: 370, Width: 380, Height: 840)
               --------------------------------------------------------------------- */}
            <div
              style={{
                position: "absolute",
                top: 370,
                left: 280,
                width: 380,
                height: 840,
                transform: `scale(${panelSpringLeft})`,
                transformOrigin: "190px 420px",
                pointerEvents: "none",
                zIndex: 20,
              }}
            >
              {/* TAG #2: HEADER PANEL 1 "1. DICUCI AIR" */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 15,
                  width: 350,
                  height: 82,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 48,
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    fontSize: 27,
                    fontWeight: 900,
                    fontFamily: FONTS.title,
                    color: "#0F172A",
                    letterSpacing: "0.8px",
                  }}
                >
                  1. DICUCI AIR
                </span>
              </div>

              {/* TAG #3: ONOMATOPOEIA "BYUR! 💦" */}
              <div
                style={{
                  position: "absolute",
                  top: 245,
                  right: 15,
                  transform: "rotate(10deg)",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#38BDF8",
                    border: "4px solid #0F172A",
                    borderRadius: 10,
                    padding: "4px 14px",
                    boxShadow: "3px 4px 0px #0F172A",
                    fontSize: 18,
                    fontWeight: 900,
                    fontFamily: FONTS.title,
                    color: "#FFFFFF",
                    letterSpacing: "0.5px",
                  }}
                >
                  BYUR! 💦
                </div>
              </div>

              {/* TAG #4: SPEECH BUBBLE "GAK MEMPAN! 😛" */}
              <div
                style={{
                  position: "absolute",
                  top: 440,
                  left: 28,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "4px solid #0F172A",
                    borderRadius: 12,
                    padding: "5px 14px",
                    boxShadow: "3px 4px 0px #0F172A",
                    fontSize: 16,
                    fontWeight: 900,
                    fontFamily: FONTS.title,
                    color: "#0F172A",
                    whiteSpace: "nowrap",
                    position: "relative",
                  }}
                >
                  GAK MEMPAN! 😛
                  <div
                    style={{
                      position: "absolute",
                      bottom: -10,
                      right: 18,
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "10px solid #0F172A",
                    }}
                  />
                </div>
              </div>

              {/* TAG #5 & #6: STEMPEL MERAH "[X] GAGAL! TIDAK LUNTUR AIR" (Frame 255+) */}
              {frame >= 255 && (
                <div
                  style={{
                    position: "absolute",
                    top: 660,
                    left: 25,
                    width: 330,
                  }}
                >
                  <PopElement
                    startFrame={255}
                    sfxType="whip"
                    volume={0.25}
                    tilt={-10}
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#EF4444",
                        border: "5px solid #FFFFFF",
                        borderRadius: 16,
                        padding: "12px 10px",
                        boxShadow: "0 8px 24px rgba(239, 68, 68, 0.6), 4px 6px 0px #0F172A",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        outline: "2.5px dashed #FFFFFF",
                        outlineOffset: "-8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 900,
                          fontFamily: FONTS.title,
                          color: "#FFFFFF",
                          letterSpacing: "1px",
                          lineHeight: 1.1,
                          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                        }}
                      >
                        [X] GAGAL!
                      </div>
                      <div
                        style={{
                          fontSize: 19,
                          fontWeight: 800,
                          fontFamily: FONTS.body,
                          color: "#FEE2E2",
                          letterSpacing: "0.8px",
                          marginTop: 4,
                          textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        TIDAK LUNTUR AIR
                      </div>
                    </div>
                  </PopElement>
                </div>
              )}
            </div>

            {/* ---------------------------------------------------------------------
                OVERLAY PANEL 2: UJI GORENG MINYAK (X: 680, Y: 370, Width: 380, Height: 840)
               --------------------------------------------------------------------- */}
            <div
              style={{
                position: "absolute",
                top: 370,
                left: 680,
                width: 380,
                height: 840,
                transform: `scale(${panelSpringRight})`,
                transformOrigin: "190px 420px",
                pointerEvents: "none",
                zIndex: 20,
              }}
            >
              {/* TAG #7: HEADER PANEL 2 "2. DIGORENG PANAS" */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 15,
                  width: 350,
                  height: 82,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 48,
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    fontSize: 25,
                    fontWeight: 900,
                    fontFamily: FONTS.title,
                    color: "#0F172A",
                    letterSpacing: "0.8px",
                  }}
                >
                  2. DIGORENG PANAS
                </span>
              </div>

              {/* TAG #8: ONOMATOPOEIA "SZZZT! 🔥" (Top: 250, Right: 15) */}
              <div
                style={{
                  position: "absolute",
                  top: 250,
                  right: 15,
                  transform: "rotate(-10deg)",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#EA580C",
                    border: "4px solid #0F172A",
                    borderRadius: 10,
                    padding: "4px 14px",
                    boxShadow: "3px 4px 0px #0F172A",
                    fontSize: 18,
                    fontWeight: 900,
                    fontFamily: FONTS.title,
                    color: "#FFFFFF",
                    letterSpacing: "0.5px",
                  }}
                >
                  SZZZT! 🔥
                </div>
              </div>

              {/* TAG #9: SPEECH BUBBLE "MASIH KEBAL! 😎" (Top: 390, Left: 35) */}
              <div
                style={{
                  position: "absolute",
                  top: 390,
                  left: 35,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "4px solid #0F172A",
                    borderRadius: 12,
                    padding: "5px 14px",
                    boxShadow: "3px 4px 0px #0F172A",
                    fontSize: 16,
                    fontWeight: 900,
                    fontFamily: FONTS.title,
                    color: "#0F172A",
                    whiteSpace: "nowrap",
                    position: "relative",
                  }}
                >
                  MASIH KEBAL! 😎
                  <div
                    style={{
                      position: "absolute",
                      bottom: -10,
                      left: 18,
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "10px solid #0F172A",
                    }}
                  />
                </div>
              </div>

              {/* TAG #10 & #11: STEMPEL MERAH "[X] KEBAL! TETAP BERACUN" (Frame 295+) */}
              {frame >= 295 && (
                <div
                  style={{
                    position: "absolute",
                    top: 660,
                    left: 25,
                    width: 330,
                  }}
                >
                  <PopElement
                    startFrame={295}
                    sfxType="whip"
                    volume={0.25}
                    tilt={10}
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#EF4444",
                        border: "5px solid #FFFFFF",
                        borderRadius: 16,
                        padding: "12px 10px",
                        boxShadow: "0 8px 24px rgba(239, 68, 68, 0.6), 4px 6px 0px #0F172A",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        outline: "2.5px dashed #FFFFFF",
                        outlineOffset: "-8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 900,
                          fontFamily: FONTS.title,
                          color: "#FFFFFF",
                          letterSpacing: "1px",
                          lineHeight: 1.1,
                          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                        }}
                      >
                        [X] KEBAL!
                      </div>
                      <div
                        style={{
                          fontSize: 19,
                          fontWeight: 800,
                          fontFamily: FONTS.body,
                          color: "#FEE2E2",
                          letterSpacing: "0.8px",
                          marginTop: 4,
                          textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        TETAP BERACUN
                      </div>
                    </div>
                  </PopElement>
                </div>
              )}
            </div>
          </>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
