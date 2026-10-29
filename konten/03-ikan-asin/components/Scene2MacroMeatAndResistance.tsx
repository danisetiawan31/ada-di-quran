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

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B1120",
        overflow: "hidden",
      }}
    >
      <CameraRig
        zoom={cameraZoom}
        panY={cameraPanY}
        whooshAtFrames={[0, 210]}
      >
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Latar Belakang Komik Edukasi Dapur */}
            <radialGradient id="comicBgGrad" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="55%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

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

            {/* Gradasi Daging Ikan Asin Dalam (Serat Merah Muda Gurih) */}
            <linearGradient id="fishMeatFibersGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FCA5A5" />
              <stop offset="50%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#EF4444" />
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
              <feDropShadow dx="8" dy="12" stdDeviation="0" floodColor="#0F172A" floodOpacity="0.8" />
            </filter>
            <filter id="toxicBubbleGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#4ADE80" floodOpacity="0.95" />
            </filter>
            <filter id="stampImpactGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#EF4444" floodOpacity="0.65" />
            </filter>
          </defs>

          {/* =========================================================================
              LAYER 1: BACKGROUND KOMIK EDUKASI (Latar Dapur Gelap Playful)
             ========================================================================= */}
          <rect x="0" y="0" width="1080" height="1920" fill="url(#comicBgGrad)" />

          {/* Pola Titik Halftone Komik Playful (Pop Art Dots) */}
          <g opacity="0.08" fill="#38BDF8">
            {Array.from({ length: 11 }).map((_, r) =>
              Array.from({ length: 8 }).map((_, col) => (
                <circle key={`dot-${r}-${col}`} cx={70 + col * 135} cy={200 + r * 110} r="5" />
              ))
            )}
          </g>

          {/* =========================================================================
              ACT 1: IKAN ASIN KARTUN DI ATAS TALENAN & PENETRASI RACUN (Frame 0 - 210)
              Playful, ekspresif, bentuk ikan asin kartun yang langsung dikenali penonton!
             ========================================================================= */}
          {!isAct2 && (
            <g id="act1-playful-cutting-board" transform={`translate(0, ${playfulBob})`}>
              {/* TALENAN KAYU KARTUN BULAT PLAYFUL (Miring Nyeleneh -3°) */}
              <g
                id="cartoon-cutting-board"
                transform="translate(540, 810) rotate(-3)"
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
                <rect x="-530" y="-70" width="130" height="140" rx="30" fill="url(#cartoonWoodGrad)" stroke="#0F172A" strokeWidth="8" />
                <circle cx="-470" cy="0" r="28" fill="#0F172A" />

                {/* Serat Garis Urat Kayu Kartun Playful */}
                <path d="M -360 -180 Q 0 -220 360 -180" stroke="#78350F" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
                <path d="M -340 0 Q 0 -40 340 0" stroke="#78350F" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.45" />
                <path d="M -360 180 Q 0 140 360 180" stroke="#78350F" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.5" />
              </g>

              {/* IKAN ASIN KARTUN PLAYFUL (BELAH PUNGGUNG PEDE / LAYANG) */}
              <g
                id="playful-salted-fish"
                transform={`translate(540, 810) rotate(${wiggleFish})`}
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
                {/* Silang Mata X_X Lucu */}
                <line x1="272" y1="-16" x2="288" y2="0" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                <line x1="288" y1="-16" x2="272" y2="0" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                {/* Mulut Ikan Kartun Heran */}
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
                    {/* Bercak Racun Hijau Neon Bubbly */}
                    <ellipse cx="60" cy="0" rx={170 * toxicSpread} ry={85 * toxicSpread} fill="#22C55E" opacity="0.65" />
                    <ellipse cx="60" cy="0" rx={110 * toxicSpread} ry={55 * toxicSpread} fill="#4ADE80" opacity="0.85" />

                    {/* Karakter Racun Hijau Nakal Mengedip di Tengah Ikan */}
                    <g transform="translate(60, 0)">
                      <circle cx="0" cy="0" r="28" fill="#15803D" stroke="#0F172A" strokeWidth="4" />
                      {/* Mata Licik Tengkorak Racun */}
                      <circle cx="-9" cy="-5" r="6" fill="#FFFFFF" />
                      <circle cx="-9" cy="-5" r="3" fill="#0F172A" />
                      <circle cx="9" cy="-5" r="6" fill="#FFFFFF" />
                      <circle cx="9" cy="-5" r="3" fill="#0F172A" />
                      {/* Senyum Jahil Racun */}
                      <path d="M -10 8 Q 0 16 10 8" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                    </g>
                  </g>
                )}
              </g>

              {/* TETESAN RACUN INSEKTISIDA KARTUN JATUH (Frame 35 - 78) */}
              {dropOpacity > 0 && (
                <g
                  transform={`translate(600, ${dropY}) scale(1.2, ${dropScaleY})`}
                  opacity={dropOpacity}
                  filter="url(#toxicBubbleGlow)"
                >
                  {/* Bentuk Tetesan Air Kartun Gemuk */}
                  <path
                    d="M 0 -35 C 16 -12 24 10 24 24 C 24 38 12 50 0 50 C -12 50 -24 38 -24 24 C -24 10 -16 -12 0 -35 Z"
                    fill="#4ADE80"
                    stroke="#0F172A"
                    strokeWidth="4.5"
                  />
                  {/* Kilauan Putih di Tetesan */}
                  <ellipse cx="-7" cy="18" rx="6" ry="10" fill="#FFFFFF" opacity="0.9" />
                </g>
              )}

              {/* KACA PEMBESAR FORENSIK KARTUN LUCU (Frame 90+) */}
              {loupeScale > 0 && (
                <g
                  id="cartoon-loupe"
                  transform={`translate(620, 810) scale(${loupeScale})`}
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
                    {/* Kepala Tengkorak Merah-Hijau Bubbly */}
                    <circle cx="0" cy="-8" r="30" fill="#EF4444" stroke="#0F172A" strokeWidth="4.5" />
                    <rect x="-18" y="8" width="36" height="20" rx="6" fill="#EF4444" stroke="#0F172A" strokeWidth="4.5" />
                    {/* Mata Hitam Bulat Besar */}
                    <circle cx="-11" cy="-8" r="9" fill="#0F172A" />
                    <circle cx="11" cy="-8" r="9" fill="#0F172A" />
                    <circle cx="-9" cy="-10" r="3" fill="#FFFFFF" />
                    <circle cx="13" cy="-10" r="3" fill="#FFFFFF" />
                    {/* Hidung Segitiga */}
                    <polygon points="0,-2 -4,4 4,4" fill="#0F172A" />
                    {/* Gigi Tengkorak Kartun */}
                    <line x1="-8" y1="18" x2="-8" y2="28" stroke="#0F172A" strokeWidth="3.5" />
                    <line x1="0" y1="18" x2="0" y2="28" stroke="#0F172A" strokeWidth="3.5" />
                    <line x1="8" y1="18" x2="8" y2="28" stroke="#0F172A" strokeWidth="3.5" />
                    {/* Tentakel Kait Cengkraman ke Daging */}
                    <path d="M -24 16 Q -42 30 -30 45" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 24 16 Q 42 30 30 45" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
                  </g>

                  {/* Comic Ribbon Tag: MERESAP KE DAGING */}
                  <g transform="translate(0, 105)">
                    <rect x="-135" y="-18" width="270" height="38" rx="12" fill="#FACC15" stroke="#0F172A" strokeWidth="4.5" />
                    <text
                      x="0"
                      y="8"
                      fill="#0F172A"
                      fontSize="17"
                      fontWeight="900"
                      fontFamily={FONTS.title}
                      textAnchor="middle"
                      letterSpacing="0.8"
                    >
                      MERESAP KE DAGING! ☠️
                    </text>
                  </g>
                </g>
              )}
            </g>
          )}

          {/* =========================================================================
              ACT 2: DUA PANEL KOMIK AKSI PLAYFUL (Frame 210 - 345)
              Panel Kiri: Ikan Asin Mandi di Bawah Kran (Tapi Racunnya Memakai Payung! ☔)
              Panel Kanan: Ikan Asin Masuk Wajan Panas (Tapi Racunnya Pakai Kacamata Hitam! 😎)
             ========================================================================= */}
          {isAct2 && (
            <g id="act2-playful-comic-split">
              {/* =====================================================================
                  PANEL KOMIK KIRI (X: 55 - 525, Y: 370 - 1250): UJI CUCI AIR KRAN
                 ===================================================================== */}
              <g
                id="comic-panel-water"
                transform={`translate(55, 370) scale(${panelSpringLeft})`}
                style={{ transformOrigin: "240px 440px" }}
                filter="url(#comicStickerShadow)"
              >
                {/* Bingkai Panel Komik Biru dengan Outline Kartun Tebal */}
                <rect x="0" y="0" width="470" height="840" rx="36" fill="url(#panelWaterGrad)" stroke="#0F172A" strokeWidth="8" />

                {/* Banner Label Header Komik (Kuning Cerah Kontras + Judul Jelas!) */}
                <g transform="translate(30, 28)">
                  <rect x="0" y="0" width="410" height="82" rx="22" fill="#FACC15" stroke="#0F172A" strokeWidth="6" />
                  {/* Ikon Tetesan Air Biru di Header */}
                  <g transform="translate(48, 41)">
                    <path d="M 0 -22 C 14 -7 20 6 20 18 C 20 29 11 38 0 38 C -11 38 -20 29 -20 18 C -20 6 -14 -7 0 -22 Z" fill="#0284C7" stroke="#0F172A" strokeWidth="3.5" />
                    <ellipse cx="-5" cy="14" rx="4" ry="7" fill="#FFFFFF" opacity="0.8" />
                  </g>
                  {/* Judul Komik Super Jelas dan Mudah Dipahami Penonton */}
                  <text
                    x="245"
                    y="52"
                    fill="#0F172A"
                    fontSize="30"
                    fontWeight="900"
                    fontFamily={FONTS.title}
                    textAnchor="middle"
                    letterSpacing="0.8"
                  >
                    1. DICUCI AIR
                  </text>
                </g>

                {/* KRAN AIR KARTUN MELENGKUNG (Curved Cartoon Faucet) */}
                <g id="cartoon-faucet" transform="translate(240, 160)">
                  {/* Pipa Kran Perak Melengkung Playful */}
                  <path
                    d="M -150 55 L -75 55 Q 0 55 0 -20 L 0 -45 Q 0 -75 35 -75 L 55 -75 Q 85 -75 85 -45 L 85 25"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M -150 55 L -75 55 Q 0 55 0 -20 L 0 -45 Q 0 -75 35 -75 L 55 -75 Q 85 -75 85 -45 L 85 25"
                    fill="none"
                    stroke="#0F172A"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Pemutar Kran Merah Lucu */}
                  <circle cx="-150" cy="55" r="26" fill="#EF4444" stroke="#0F172A" strokeWidth="5.5" />
                  <rect x="-158" y="35" width="16" height="40" rx="5" fill="#FFFFFF" />
                  {/* Mulut Nozel Kran */}
                  <rect x="66" y="25" width="38" height="24" rx="6" fill="#94A3B8" stroke="#0F172A" strokeWidth="4.5" />
                </g>

                {/* KUCURAN AIR DERAS & CIPRATAN BUBBLY (Frame 225+) */}
                <g id="cartoon-water-gush" transform="translate(325, 205)">
                  {/* Pancuran Air Kerucut Bergelombang Lucu */}
                  <path
                    d={`M -24 0 Q ${-30 + waterSplashWobble} 160 -65 330 L 65 330 Q ${30 - waterSplashWobble} 160 24 0 Z`}
                    fill="url(#cartoonWaterJet)"
                    stroke="#0F172A"
                    strokeWidth="6"
                  />
                  {/* Garis Aliran Air Putih Berbusa */}
                  <path d={`M -10 15 Q ${-14 + waterSplashWobble} 170 -35 320`} stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" />
                  <path d={`M 12 15 Q ${14 - waterSplashWobble} 170 35 320`} stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" />

                  {/* Cipratan Butiran Air Lucu (Splash Drops) */}
                  <circle cx="-85" cy="305" r="12" fill="#E0F2FE" stroke="#0F172A" strokeWidth="4" />
                  <circle cx="85" cy="300" r="13" fill="#E0F2FE" stroke="#0F172A" strokeWidth="4" />
                  <circle cx="-45" cy="345" r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
                  <circle cx="50" cy="340" r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
                </g>

                {/* Comic Onomatopoeia: BYURRR! 💦 */}
                <g transform="translate(390, 260) rotate(12)">
                  <rect x="-55" y="-18" width="110" height="36" rx="10" fill="#38BDF8" stroke="#0F172A" strokeWidth="4" />
                  <text x="0" y="7" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily={FONTS.title} textAnchor="middle">
                    BYUR! 💦
                  </text>
                </g>

                {/* IKAN ASIN KARTUN SEDANG DISIRAM AIR */}
                <g id="fish-getting-washed" transform="translate(235, 540) rotate(-4)">
                  {/* Badan Ikan Asin Belah Punggung Autentik */}
                  <path
                    d="M -165 0 Q -85 -70 65 -65 Q 155 -50 175 0 Q 155 50 65 65 Q -85 70 -165 0 Z"
                    fill="url(#cartoonFishGrad)"
                    stroke="#0F172A"
                    strokeWidth="6.5"
                  />
                  {/* Ekor Ikan Cabang Dua */}
                  <polygon points="-165,0 -205,-38 -188,0 -205,38" fill="#CBD5E1" stroke="#0F172A" strokeWidth="5.5" />

                  {/* Duri Ikan Kartun Biar Langsung Dikenali Sebagai Ikan Asin */}
                  {[-100, -50, 0, 50, 100].map((dx, i) => (
                    <line key={`rib-wash-${i}`} x1={dx} y1="-35" x2={dx - 12} y2="35" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                  ))}

                  {/* Mata Ikan Pusing Diguyur Air (Spiral @_@) */}
                  <circle cx="140" cy="-6" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.5" />
                  <path d="M 134 -6 Q 140 -12 146 -6 Q 146 0 140 2" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                  <ellipse cx="168" cy="4" rx="4" ry="7" fill="#0F172A" />

                  {/* RACUN HIJAU SANTAI MEMEGANG PAYUNG (TIDAK LUNTUR!) */}
                  <g id="smug-poison-water" transform="translate(-10, -5)" filter="url(#toxicBubbleGlow)">
                    {/* Payung Kartun Pelindung Air (Visual Humor Playful!) */}
                    <g transform="translate(0, -32)">
                      <path d="M -45 0 Q 0 -45 45 0 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="4.5" />
                      {/* Corak Garis Payung Putih */}
                      <path d="M -15 0 Q 0 -45 0 -45" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                      <path d="M 15 0 Q 0 -45 0 -45" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                      {/* Gagang Payung Hitam */}
                      <line x1="0" y1="0" x2="0" y2="35" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
                      <path d="M 0 35 Q 0 45 -8 45" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                    </g>

                    {/* Lingkaran Karakter Racun Hijau Neon Bubbly */}
                    <circle cx="0" cy="5" r="32" fill="#22C55E" stroke="#0F172A" strokeWidth="4.5" />
                    <circle cx="0" cy="5" r="16" fill="#86EFAC" />

                    {/* Senyum Meledek: "Wleee Gak Luntur 😛" */}
                    <circle cx="-9" cy="2" r="4.5" fill="#0F172A" />
                    <circle cx="9" cy="2" r="4.5" fill="#0F172A" />
                    <path d="M -7 12 Q 0 20 7 12" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                    {/* Lidah Menjulur Lucu */}
                    <path d="M -3 15 Q 0 24 3 15 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
                  </g>

                  {/* Comic Speech Bubble: Gak Mempan! */}
                  <g transform="translate(-40, -85)">
                    <rect x="-65" y="-18" width="130" height="36" rx="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
                    <polygon points="10,18 20,28 25,18" fill="#FFFFFF" />
                    <line x1="10" y1="18" x2="20" y2="28" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                    <line x1="20" y1="28" x2="25" y2="18" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                    <text x="0" y="6" fill="#0F172A" fontSize="16" fontWeight="900" fontFamily={FONTS.title} textAnchor="middle">
                      GAK MEMPAN!
                    </text>
                  </g>
                </g>

                {/* STEMPEL CAP MERAH BESAR: AIR GAGAL LUNTUR (Frame 255+) */}
                {frame >= 255 && (
                  <PopElement as="g" startFrame={255} sfxType="whip" volume={0.25} tilt={-12}>
                    <g transform="translate(235, 715)" filter="url(#stampImpactGlow)">
                      {/* Box Cap Merah Stempel Komik */}
                      <rect x="-170" y="-55" width="340" height="110" rx="18" fill="#EF4444" stroke="#FFFFFF" strokeWidth="6" />
                      <rect x="-162" y="-47" width="324" height="94" rx="12" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeDasharray="8 6" />

                      <text
                        x="0"
                        y="-4"
                        fill="#FFFFFF"
                        fontSize="38"
                        fontWeight="900"
                        fontFamily={FONTS.title}
                        textAnchor="middle"
                        letterSpacing="1.2"
                      >
                        [X] GAGAL!
                      </text>
                      <text
                        x="0"
                        y="34"
                        fill="#FEE2E2"
                        fontSize="22"
                        fontWeight="800"
                        fontFamily={FONTS.body}
                        textAnchor="middle"
                        letterSpacing="0.8"
                      >
                        TIDAK LUNTUR AIR
                      </text>
                    </g>
                  </PopElement>
                )}
              </g>

              {/* =====================================================================
                  PANEL KOMIK KANAN (X: 555 - 1025, Y: 370 - 1250): UJI GORENG MINYAK
                 ===================================================================== */}
              <g
                id="comic-panel-oil"
                transform={`translate(555, 370) scale(${panelSpringRight})`}
                style={{ transformOrigin: "240px 440px" }}
                filter="url(#comicStickerShadow)"
              >
                {/* Bingkai Panel Komik Oranye-Merah dengan Outline Kartun Tebal */}
                <rect x="0" y="0" width="470" height="840" rx="36" fill="url(#panelFireGrad)" stroke="#0F172A" strokeWidth="8" />

                {/* Banner Label Header Komik (Kuning Cerah Kontras + Judul Jelas!) */}
                <g transform="translate(30, 28)">
                  <rect x="0" y="0" width="410" height="82" rx="22" fill="#FACC15" stroke="#0F172A" strokeWidth="6" />
                  {/* Ikon Api Penggorengan di Header */}
                  <g transform="translate(48, 41)">
                    <path d="M 0 -22 C 12 -11 18 2 18 13 C 18 25 9 33 0 33 C -9 33 -18 25 -18 13 C -18 4 -11 -4 -3 -11 C -3 -3 2 1 4 1 C 8 1 10 -6 0 -22 Z" fill="#EA580C" stroke="#0F172A" strokeWidth="3.5" />
                  </g>
                  {/* Judul Komik Super Jelas dan Mudah Dipahami Penonton */}
                  <text
                    x="245"
                    y="52"
                    fill="#0F172A"
                    fontSize="29"
                    fontWeight="900"
                    fontFamily={FONTS.title}
                    textAnchor="middle"
                    letterSpacing="0.8"
                  >
                    2. DIGORENG PANAS
                  </text>
                </g>

                {/* WAJAN PENGGORENGAN KARTUN (Wok Pan on Fiery Stove) */}
                <g id="cartoon-wok" transform="translate(235, 410)">
                  {/* Lidah Api Kompor Menari Membara di Bawah Wajan */}
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

                  {/* Badan Wajan Hitam Tebal Kartun */}
                  <ellipse cx="0" cy="15" rx="205" ry="105" fill="#0F172A" stroke="#334155" strokeWidth="8" />
                  {/* Gagang Kayu Wajan Kiri & Kanan */}
                  <path d="M -205 10 Q -245 10 -245 -15 Q -245 -30 -205 -15" fill="#D97706" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
                  <path d="M 205 10 Q 245 10 245 -15 Q 245 -30 195 -15" fill="#D97706" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />

                  {/* Kolam Minyak Mendidih Berbuih Keemasan */}
                  <ellipse cx="0" cy="15" rx="185" ry="90" fill="url(#oilJacuzziGrad)" stroke="#F59E0B" strokeWidth="5.5" />

                  {/* Gelembung Minyak Panas Sizzling Popping */}
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

                  {/* Garis Uap Panas Meliuk (Steam Waves) */}
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

                  {/* Comic Onomatopoeia: SZZZZT! 🔥 */}
                  <g transform="translate(145, -70) rotate(-10)">
                    <rect x="-55" y="-18" width="110" height="36" rx="10" fill="#EA580C" stroke="#0F172A" strokeWidth="4" />
                    <text x="0" y="7" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily={FONTS.title} textAnchor="middle">
                      SZZZT! 🔥
                    </text>
                  </g>

                  {/* IKAN ASIN KARTUN SEDANG DIGORENG DI MINYAK */}
                  <g id="fish-frying-jacuzzi" transform="translate(0, 15)">
                    {/* Badan Ikan Asin Goreng Keemasan */}
                    <path
                      d="M -135 0 Q -65 -45 55 -40 Q 135 -30 150 0 Q 135 30 55 40 Q -65 45 -135 0 Z"
                      fill="#FDE68A"
                      stroke="#0F172A"
                      strokeWidth="5.5"
                    />
                    <polygon points="-135,0 -165,-25 -155,0 -165,25" fill="#F59E0B" stroke="#0F172A" strokeWidth="4.5" />

                    {/* Duri Ikan Kartun */}
                    {[-70, -20, 30, 80].map((dx, i) => (
                      <line key={`rib-fry-${i}`} x1={dx} y1="-22" x2={dx - 8} y2="22" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
                    ))}

                    {/* RACUN HIJAU SANTAI PAKAI KACAMATA HITAM & BAN RENANG (TAHAN PANAS!) */}
                    <g id="smug-poison-fire" transform="translate(10, -5)" filter="url(#toxicBubbleGlow)">
                      {/* Pelampung Donat Renang Oranye (Humor Kartun!) */}
                      <ellipse cx="0" cy="18" rx="36" ry="16" fill="#F97316" stroke="#0F172A" strokeWidth="4.5" />
                      <ellipse cx="0" cy="18" rx="18" ry="8" fill="#FBBF24" />

                      {/* Kepala Karakter Racun Hijau */}
                      <circle cx="0" cy="0" r="32" fill="#22C55E" stroke="#0F172A" strokeWidth="4.5" />
                      <circle cx="0" cy="0" r="16" fill="#86EFAC" />

                      {/* Kacamata Hitam Keren Kartun (Playful Cool Sunglasses 😎) */}
                      <path d="M -16 -8 L -2 -8 L -4 4 L -14 4 Z" fill="#0F172A" />
                      <path d="M 2 -8 L 16 -8 L 14 4 L 4 4 Z" fill="#0F172A" />
                      <line x1="-2" y1="-5" x2="2" y2="-5" stroke="#0F172A" strokeWidth="3" />
                      {/* Kilau Putih di Kacamata */}
                      <line x1="-12" y1="-5" x2="-8" y2="1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      <line x1="6" y1="-5" x2="10" y2="1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                      {/* Senyum Santai di Minyak Panas: "Masih Kebal Bro 😎" */}
                      <path d="M -8 11 Q 0 18 8 11" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
                    </g>

                    {/* Comic Speech Bubble: Masih Kebal! */}
                    <g transform="translate(50, -75)">
                      <rect x="-65" y="-18" width="130" height="36" rx="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
                      <polygon points="-10,18 0,28 10,18" fill="#FFFFFF" />
                      <line x1="-10" y1="18" x2="0" y2="28" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                      <line x1="0" y1="28" x2="10" y2="18" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
                      <text x="0" y="6" fill="#0F172A" fontSize="16" fontWeight="900" fontFamily={FONTS.title} textAnchor="middle">
                        MASIH KEBAL! 😎
                      </text>
                    </g>
                  </g>
                </g>

                {/* STEMPEL CAP MERAH BESAR: MINYAK GAGAL MEMATIKAN RACUN (Frame 295+) */}
                {frame >= 295 && (
                  <PopElement as="g" startFrame={295} sfxType="whip" volume={0.25} tilt={12}>
                    <g transform="translate(235, 715)" filter="url(#stampImpactGlow)">
                      {/* Box Cap Merah Stempel Komik */}
                      <rect x="-170" y="-55" width="340" height="110" rx="18" fill="#EF4444" stroke="#FFFFFF" strokeWidth="6" />
                      <rect x="-162" y="-47" width="324" height="94" rx="12" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeDasharray="8 6" />

                      <text
                        x="0"
                        y="-4"
                        fill="#FFFFFF"
                        fontSize="38"
                        fontWeight="900"
                        fontFamily={FONTS.title}
                        textAnchor="middle"
                        letterSpacing="1.2"
                      >
                        [X] KEBAL!
                      </text>
                      <text
                        x="0"
                        y="34"
                        fill="#FEE2E2"
                        fontSize="22"
                        fontWeight="800"
                        fontFamily={FONTS.body}
                        textAnchor="middle"
                        letterSpacing="0.8"
                      >
                        TETAP BERACUN
                      </text>
                    </g>
                  </PopElement>
                )}
              </g>
            </g>
          )}

          {/* =========================================================================
              LAYER 7: VIGNETTE BAWAH MUTLAK UNTUK KONTRAS SUBTITLE (Y: 1350 - 1920)
              Menjamin teks subtitle putih & highlight emas terbaca 100% (WCAG 12:1)!
             ========================================================================= */}
          <rect
            x="0"
            y="1320"
            width="1080"
            height="600"
            fill="url(#comicBgGrad)"
            opacity="0.95"
          />
        </svg>
      </CameraRig>
    </AbsoluteFill>
  );
};
