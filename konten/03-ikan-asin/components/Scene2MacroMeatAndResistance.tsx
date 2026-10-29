import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";
import { PopElement } from "../../../src/components/PopElement";
import { CameraRig } from "../../../src/components/CameraRig";

export const Scene2MacroMeatAndResistance: React.FC = () => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // KAMERA & TRANSISI (Frame 0 - 345 lokal | Frame 540 - 885 global)
  // Sub-Scene 2A (Penetrasi Racun di Talenan): Frame 0 - 220
  // Sub-Scene 2B (Uji Komparasi Cuci vs Goreng): Frame 220 - 345
  // ---------------------------------------------------------------------------
  const cameraZoom = interpolate(frame, [205, 235], [1.05, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [205, 235], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // CONTINUOUS SECONDARY MOTION (Hukum "Layar Tidak Boleh Mati")
  // ---------------------------------------------------------------------------
  const breathingBob = Math.sin(frame / 12) * 3;
  const toxicPulse = 1 + Math.sin(frame / 7) * 0.08;
  const waterFlowSway = Math.sin(frame / 3) * 12;
  const flameFlicker = Math.sin(frame * 1.5) * 8;

  // ---------------------------------------------------------------------------
  // ACT 1: TETESAN & REMBESAN RACUN MENEMBUS IKAN ASIN (Frame 0 - 220)
  // ---------------------------------------------------------------------------
  // Tetesan insektisida jatuh dari atas ke badan ikan (Frame 45 - 85)
  const dropY = interpolate(frame, [45, 80], [380, 800], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dropOpacity = interpolate(frame, [45, 50, 78, 85], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rembesan racun hijau menyebar di daging ikan (Frame 80 - 215)
  const toxicSpread = interpolate(frame, [80, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Kaca pembesar / lingkaran HUD inspeksi forensik muncul (Frame 95+)
  const loupeScale = spring({
    frame: frame - 95,
    fps: 30,
    config: { damping: 14, stiffness: 120 },
  });

  // ---------------------------------------------------------------------------
  // ACT 2: DUAL KITCHEN TEST CHAMBERS (Frame 220 - 345)
  // Sinkron narasi: "Racun ini nggak bakal hilang tuntas cuma dengan dicuci air atau digoreng panas!"
  // ---------------------------------------------------------------------------
  const dualChambersIntro = spring({
    frame: frame - 220,
    fps: 30,
    config: { damping: 14, stiffness: 110 },
  });

  // Status uji aktif
  const isAct2 = frame >= 220;

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
        whooshAtFrames={[0, 220]}
      >
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Latar Belakang Dapur / Investigasi Forensik Pangan */}
            <radialGradient id="kitchenBgGrad" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Gradasi Kayu Talenan Dapur Estetik (Warm Oak Wood) */}
            <linearGradient id="cuttingBoardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="35%" stopColor="#B45309" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Gradasi Ikan Asin Autentik (Belah Punggung Kering Jemur) */}
            <linearGradient id="fishBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F8FAFC" />
              <stop offset="65%" stopColor="#F1F5F9" />
              <stop offset="85%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            {/* Gradasi Rembesan Racun Kimia Neon Berbahaya */}
            <radialGradient id="toxicInfiltrationGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#22C55E" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#15803D" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#052E16" stopOpacity="0" />
            </radialGradient>

            {/* Gradasi Kucuran Air Kran Wastafel */}
            <linearGradient id="tapWaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#BAE6FD" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
            </linearGradient>

            {/* Gradasi Logam Stainless Steel Kran */}
            <linearGradient id="faucetSteelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="30%" stopColor="#E2E8F0" />
              <stop offset="60%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Gradasi Minyak Goreng Panas Mendidih */}
            <radialGradient id="boilingOilGrad" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#D97706" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#78350F" stopOpacity="0.9" />
            </radialGradient>

            {/* Filter Bayangan Halus & Pijar Racun */}
            <filter id="kitchenShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.55" />
            </filter>
            <filter id="toxicGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#4ADE80" floodOpacity="0.95" />
            </filter>
            <filter id="stampShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#DC2626" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* =========================================================================
              LAYER 1: BACKGROUND RUANG DAPUR / INVESTIGASI FORENSIK (Y: 0 - 1920)
             ========================================================================= */}
          {/* Latar Dasar Dapur Elegan */}
          <rect x="0" y="0" width="1080" height="1920" fill="url(#kitchenBgGrad)" />

          {/* Ubin Keramik Dinding Dapur Halus (Subtle Kitchen Backsplash Pattern) */}
          <g opacity="0.08" stroke="#FFFFFF" strokeWidth="2">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={`tile-h-${i}`} x1="0" y1={180 + i * 160} x2="1080" y2={180 + i * 160} />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`tile-v-${i}`} x1={90 + i * 150} y1="180" x2={90 + i * 150} y2="1320" />
            ))}
          </g>

          {/* =========================================================================
              ACT 1: IKAN ASIN NYATA DI ATAS TALENAN KAYU & PENETRASI RACUN (Frame 0 - 220)
              Jelas bentuk ikannya! Jelas talenannya! Jelas racun yang merembes ke daging!
             ========================================================================= */}
          {!isAct2 && (
            <g
              id="act1-cutting-board-fish"
              transform={`translate(0, ${breathingBob})`}
              filter="url(#kitchenShadow)"
            >
              {/* Bayangan Meja Dapur */}
              <ellipse cx="540" cy="1160" rx="440" ry="40" fill="#000000" opacity="0.45" />

              {/* TALENAN KAYU DAPUR ESTETIK (Cutting Board Y: 560 - 1140) */}
              <g id="cutting-board">
                {/* Ketebalan Sisi Talenan 3D */}
                <rect x="130" y="580" width="820" height="540" rx="28" fill="#451A03" />
                {/* Permukaan Atas Talenan Kayu */}
                <rect
                  x="130"
                  y="560"
                  width="820"
                  height="540"
                  rx="28"
                  fill="url(#cuttingBoardGrad)"
                  stroke="#451A03"
                  strokeWidth="6"
                />
                {/* Serat Urat Kayu Alami */}
                <path d="M 180 640 Q 540 620 900 640" stroke="#78350F" strokeWidth="3.5" fill="none" opacity="0.4" />
                <path d="M 160 780 Q 540 760 920 780" stroke="#78350F" strokeWidth="3" fill="none" opacity="0.35" />
                <path d="M 180 940 Q 540 920 900 940" stroke="#78350F" strokeWidth="3.5" fill="none" opacity="0.4" />
                <path d="M 160 1050 Q 540 1030 920 1050" stroke="#78350F" strokeWidth="3" fill="none" opacity="0.35" />
                {/* Lubang Gantungan Talenan di Kiri */}
                <circle cx="190" cy="620" r="18" fill="#0F172A" stroke="#451A03" strokeWidth="4" />
              </g>

              {/* IKAN ASIN UTUH BELAH PUNGGUNG (PEDA / LAYANG BESAR & REALISTIS) */}
              <g id="hero-salted-fish" transform="translate(540, 840)">
                {/* Bayangan Ikan di Talenan */}
                <ellipse cx="10" cy="20" rx="330" ry="110" fill="#451A03" opacity="0.4" />

                {/* Ekor Ikan Cabang Dua Khas Ikan Asin */}
                <polygon
                  points="-280,0 -340,-60 -310,0 -340,60"
                  fill="#CBD5E1"
                  stroke="#1E293B"
                  strokeWidth="5"
                />

                {/* Badan Ikan Belah Punggung Lebar (Butterfly Cut) */}
                <path
                  d="M -280 0 Q -180 -120 40 -120 Q 220 -100 320 -20 Q 340 0 320 20 Q 220 100 40 120 Q -180 120 -280 0 Z"
                  fill="url(#fishBodyGrad)"
                  stroke="#0F172A"
                  strokeWidth="6"
                  strokeLinejoin="round"
                />

                {/* Rongga Belahan Punggung & Alur Tulang Belakang Ikan Asin */}
                <path
                  d="M -270 0 Q 30 -5 300 0"
                  stroke="#334155"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Duri-Duri Ikan Halus Menyamping */}
                {[-180, -120, -60, 0, 60, 120, 180, 240].map((x, idx) => (
                  <g key={`rib-${idx}`}>
                    <line x1={x} y1="0" x2={x - 20} y2="-55" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                    <line x1={x} y1="0" x2={x - 20} y2="55" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                  </g>
                ))}

                {/* Taburan Kristal Garam Laut Putih Menempel di Daging */}
                <circle cx="-140" cy="-35" r="4" fill="#FFFFFF" />
                <circle cx="-80" cy="45" r="4.5" fill="#FFFFFF" />
                <circle cx="20" cy="-50" r="4" fill="#FFFFFF" />
                <circle cx="80" cy="35" r="4.5" fill="#FFFFFF" />
                <circle cx="160" cy="-30" r="4" fill="#FFFFFF" />
                <circle cx="220" cy="40" r="4" fill="#FFFFFF" />

                {/* Kepala & Mata Kering Ikan Asin */}
                <circle cx="295" cy="-8" r="9" fill="#0F172A" />
                <circle cx="297" cy="-10" r="3" fill="#FFFFFF" />

                {/* NODA RACUN KIMIA INSEKTISIDA MEREMBES MASUK (Frame 80+) */}
                {toxicSpread > 0 && (
                  <g opacity={toxicSpread} filter="url(#toxicGlow)">
                    {/* Area Rembesan Daging Berubah Kehijauan Beracun */}
                    <ellipse cx="60" cy="0" rx={180 * toxicSpread} ry={85 * toxicSpread} fill="url(#toxicInfiltrationGrad)" />
                    {/* Bintik Tetesan Racun Kimia Meresap di Poros Daging */}
                    <circle cx="40" cy="-20" r={10 * toxicPulse} fill="#86EFAC" stroke="#15803D" strokeWidth="3" />
                    <circle cx="110" cy="15" r={12 * toxicPulse} fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
                    <circle cx="-30" cy="18" r={9 * toxicPulse} fill="#86EFAC" stroke="#15803D" strokeWidth="2.5" />
                    <circle cx="140" cy="-25" r={8 * toxicPulse} fill="#86EFAC" />
                  </g>
                )}
              </g>

              {/* TETESAN CAIRAN RACUN OBAT NYAMUK MENETES KE DAGING (Frame 45 - 85) */}
              {dropOpacity > 0 && (
                <g transform={`translate(600, ${dropY})`} opacity={dropOpacity} filter="url(#toxicGlow)">
                  <path
                    d="M 0 -30 C 14 -10 20 10 20 22 C 20 34 10 44 0 44 C -10 44 -20 34 -20 22 C -20 10 -14 -10 0 -30 Z"
                    fill="#4ADE80"
                    stroke="#15803D"
                    strokeWidth="3.5"
                  />
                  <circle cx="-5" cy="15" r="4" fill="#FFFFFF" opacity="0.8" />
                </g>
              )}

              {/* LOUPE / KACA PEMBESAR INSPEKSI FORENSIK (Frame 95+) */}
              {loupeScale > 0 && (
                <g
                  id="forensic-loupe"
                  transform={`translate(620, 830) scale(${loupeScale})`}
                  filter="url(#kitchenShadow)"
                >
                  {/* Lingkaran Luar Lensa Logam Perak */}
                  <circle cx="0" cy="0" r="145" fill="none" stroke="#E2E8F0" strokeWidth="16" />
                  <circle cx="0" cy="0" r="135" fill="none" stroke="#0F172A" strokeWidth="5" />
                  {/* Gagang Kaca Pembesar Melintang ke Kanan Bawah */}
                  <path d="M 105 105 L 210 210" stroke="#1E293B" strokeWidth="28" strokeLinecap="round" />
                  <path d="M 115 115 L 200 200" stroke="#D97706" strokeWidth="18" strokeLinecap="round" />

                  {/* Kaca Transparan dengan Indikator Grid Forensik */}
                  <circle cx="0" cy="0" r="130" fill="#0A0F1D" fillOpacity="0.4" />
                  <circle cx="0" cy="0" r="125" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 6" opacity="0.7" />

                  {/* IKON TENGKORAK BAHAYA RACUN DI DALAM DAGING */}
                  <g transform={`scale(${toxicPulse * 1.35})`} filter="url(#toxicGlow)">
                    <circle cx="0" cy="-8" r="22" fill="#EF4444" stroke="#0F172A" strokeWidth="3.5" />
                    <rect x="-12" y="6" width="24" height="14" rx="4" fill="#EF4444" stroke="#0F172A" strokeWidth="3.5" />
                    <ellipse cx="-7" cy="-8" rx="5.5" ry="7" fill="#0F172A" />
                    <ellipse cx="7" cy="-8" rx="5.5" ry="7" fill="#0F172A" />
                    <polygon points="0,-1 -3,5 3,5" fill="#0F172A" />
                    <line x1="-5" y1="12" x2="-5" y2="18" stroke="#0F172A" strokeWidth="2.5" />
                    <line x1="0" y1="12" x2="0" y2="18" stroke="#0F172A" strokeWidth="2.5" />
                    <line x1="5" y1="12" x2="5" y2="18" stroke="#0F172A" strokeWidth="2.5" />
                  </g>
                </g>
              )}
            </g>
          )}

          {/* =========================================================================
              ACT 2: DUAL KITCHEN TEST CHAMBERS (Frame 220 - 345)
              DUA METODE NYATA YANG DILAKUKAN ORANG: DICUCI AIR vs DIGORENG MINYAK PANAS!
              Dua bilik berdampingan yang sangat konkret, jelas, dan langsung dipahami!
             ========================================================================= */}
          {isAct2 && (
            <g
              id="act2-dual-kitchen-chambers"
              transform={`scale(${dualChambersIntro})`}
              transformOrigin="540 850"
            >
              {/* =====================================================================
                  BILIK KIRI (X: 70 - 520, Y: 520 - 1220): UJI CUCI DI WASTAFEL AIR
                 ===================================================================== */}
              <g id="chamber-water-wash" transform="translate(70, 520)" filter="url(#kitchenShadow)">
                {/* Kotak Bilik Wastafel Biru */}
                <rect x="0" y="0" width="455" height="700" rx="28" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="6" />
                <rect x="15" y="15" width="425" height="670" rx="20" fill="#082F49" />

                {/* HEADER LABEL ILMIAH (Path Vektor Tanpa Tag Text) */}
                {/* Banner Header Biru Air */}
                <rect x="35" y="35" width="385" height="65" rx="14" fill="#0284C7" stroke="#38BDF8" strokeWidth="3" />
                {/* Ikon Tetesan Air di Header */}
                <g transform="translate(70, 68)">
                  <path d="M 0 -18 C 10 -6 16 6 16 14 C 16 23 9 30 0 30 C -9 30 -16 23 -16 14 C -16 6 -10 -6 0 -18 Z" fill="#FFFFFF" />
                </g>
                {/* Garis Simbol Tes Dicuci Air */}
                <line x1="105" y1="68" x2="380" y2="68" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />

                {/* PIPA KRAN AIR STAINLESS STEEL DI ATAS WASTAFEL */}
                <g id="kitchen-faucet" transform="translate(225, 120)">
                  {/* Pipa Melengkung Stainless */}
                  <path
                    d="M -120 40 L -60 40 Q 0 40 0 -20 L 0 -40 Q 0 -60 25 -60 L 35 -60 Q 55 -60 55 -40 L 55 10"
                    fill="none"
                    stroke="url(#faucetSteelGrad)"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Ujung Nozel Kran */}
                  <rect x="42" y="10" width="26" height="16" rx="4" fill="#64748B" stroke="#0F172A" strokeWidth="2.5" />
                  {/* Pemutar Keran Air */}
                  <ellipse cx="-120" cy="40" rx="16" ry="24" fill="#94A3B8" stroke="#0F172A" strokeWidth="3" />
                </g>

                {/* KUCURAN AIR DERAS DARI KRAN KE IKAN (Frame 240+) */}
                <g id="water-stream" transform={`translate(280, 145)`}>
                  {/* Pancuran Air Vertikal Bergelombang */}
                  <path
                    d={`M -15 0 Q ${-20 + waterFlowSway} 120 -40 260 L 40 260 Q ${20 - waterFlowSway} 120 15 0 Z`}
                    fill="url(#tapWaterGrad)"
                  />
                  <path
                    d={`M -8 10 Q ${-10 + waterFlowSway} 130 -20 250 L 20 250 Q ${10 - waterFlowSway} 130 8 10 Z`}
                    fill="#FFFFFF"
                    opacity="0.85"
                  />
                  {/* Percikan Air Bawah */}
                  <circle cx="-50" cy="250" r="8" fill="#BAE6FD" opacity="0.85" />
                  <circle cx="50" cy="245" r="9" fill="#BAE6FD" opacity="0.85" />
                  <circle cx="-25" cy="270" r="7" fill="#FFFFFF" />
                  <circle cx="30" cy="265" r="7" fill="#FFFFFF" />
                </g>

                {/* POTONGAN IKAN ASIN DI DALAM WASTAFEL AIR */}
                <g id="fish-in-sink" transform="translate(225, 470)">
                  <ellipse cx="0" cy="10" rx="160" ry="60" fill="#000000" opacity="0.4" />
                  <path
                    d="M -150 0 Q -70 -60 60 -55 Q 150 -40 170 0 Q 150 40 60 55 Q -70 60 -150 0 Z"
                    fill="url(#fishBodyGrad)"
                    stroke="#0F172A"
                    strokeWidth="4.5"
                  />
                  <path d="M -140 0 Q 0 -3 150 0" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <circle cx="140" cy="-5" r="6" fill="#0F172A" />

                  {/* NODA RACUN HIJAU TETAP MENEMPEL KUAT (GAGAL LUNTUR!) */}
                  <g filter="url(#toxicGlow)">
                    <circle cx="0" cy="0" r={32 * toxicPulse} fill="#22C55E" opacity="0.85" />
                    <circle cx="0" cy="0" r="16" fill="#86EFAC" />
                    {/* Cakar Racun Mengikat Erat */}
                    <path d="M -20 -15 L -45 -30 M 20 -15 L 45 -30 M -20 15 L -45 30 M 20 15 L 45 30" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
                  </g>
                </g>

                {/* STEMPEL MERAH BESAR: AIR GAGAL LUNTUR (Frame 255+) */}
                {frame >= 255 && (
                  <PopElement as="g" startFrame={255} sfxType="whip" volume={0.22}>
                    <g transform="translate(225, 590)" filter="url(#stampShadow)">
                      <circle cx="0" cy="0" r="72" fill="#0F172A" stroke="#EF4444" strokeWidth="8" />
                      <circle cx="0" cy="0" r="60" fill="#FEF2F2" />
                      {/* Ikon Air */}
                      <path d="M 0 -22 C 10 -6 15 5 15 12 C 15 21 8 26 0 26 C -8 26 -15 21 -15 12 C -15 5 -10 -6 0 -22 Z" fill="#38BDF8" />
                      {/* SILANG MERAH BESAR (TIDAK LUNTUR!) */}
                      <line x1="-36" y1="-36" x2="36" y2="36" stroke="#EF4444" strokeWidth="14" strokeLinecap="round" />
                      <line x1="36" y1="-36" x2="-36" y2="36" stroke="#EF4444" strokeWidth="14" strokeLinecap="round" />
                    </g>
                  </PopElement>
                )}
              </g>

              {/* =====================================================================
                  BILIK KANAN (X: 555 - 1010, Y: 520 - 1220): UJI GORENG MINYAK PANAS
                 ===================================================================== */}
              <g id="chamber-hot-oil" transform="translate(555, 520)" filter="url(#kitchenShadow)">
                {/* Kotak Bilik Penggorengan Oranye */}
                <rect x="0" y="0" width="455" height="700" rx="28" fill="#451A03" stroke="#F59E0B" strokeWidth="6" />
                <rect x="15" y="15" width="425" height="670" rx="20" fill="#291404" />

                {/* HEADER LABEL ILMIAH (Path Vektor Tanpa Tag Text) */}
                {/* Banner Header Oranye Minyak */}
                <rect x="35" y="35" width="385" height="65" rx="14" fill="#D97706" stroke="#F59E0B" strokeWidth="3" />
                {/* Ikon Api Penggorengan di Header */}
                <g transform="translate(70, 68)">
                  <path d="M 0 -18 C 8 -10 14 0 14 10 C 14 20 7 26 0 26 C -7 26 -14 20 -14 10 C -14 3 -9 -4 -3 -9 C -3 -3 2 1 4 1 C 6 1 8 -4 0 -18 Z" fill="#FFFFFF" />
                </g>
                <line x1="105" y1="68" x2="380" y2="68" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />

                {/* WAJAN PENGGORENGAN (KATEL HITAM) DENGAN MINYAK MENDIDIH BERBUIH */}
                <g id="frying-wok" transform="translate(225, 340)">
                  {/* Lidah Api Kompor Membara di Bawah Wajan */}
                  <g transform={`translate(0, 115) scale(${1 + Math.sin(frame) * 0.08})`}>
                    <path
                      d={`M -130 0 Q -65 ${-35 + flameFlicker} 0 0 Q 65 ${-35 - flameFlicker} 130 0 L 110 35 L -110 35 Z`}
                      fill="#EF4444"
                    />
                    <path
                      d={`M -90 5 Q -45 ${-25 - flameFlicker} 0 5 Q 45 ${-25 + flameFlicker} 90 5 L 80 30 L -80 30 Z`}
                      fill="#F59E0B"
                    />
                  </g>

                  {/* Badan Wajan Hitam Cekung */}
                  <ellipse cx="0" cy="15" rx="190" ry="95" fill="#0F172A" stroke="#334155" strokeWidth="7" />
                  {/* Gagang Wajan Kiri & Kanan */}
                  <path d="M -190 10 Q -225 10 -225 -10 Q -225 -25 -190 -10" fill="none" stroke="#64748B" strokeWidth="12" strokeLinecap="round" />
                  <path d="M 190 10 Q 225 10 225 -10 Q 225 -25 190 -10" fill="none" stroke="#64748B" strokeWidth="12" strokeLinecap="round" />

                  {/* Permukaan Minyak Panas Mendidih Bergolak */}
                  <ellipse cx="0" cy="15" rx="172" ry="80" fill="url(#boilingOilGrad)" />

                  {/* Gelembung-Gelembung Minyak Panas Mendesis (Sizzling Bubbles) */}
                  {Array.from({ length: 14 }).map((_, i) => {
                    const bX = -120 + ((i * 45) % 240) + Math.sin(frame / 2 + i) * 8;
                    const bY = -30 + ((frame * 6 + i * 35) % 90);
                    const bR = 6 + (i % 3) * 5;
                    return (
                      <circle
                        key={`oil-bubble-${i}`}
                        cx={bX}
                        cy={bY}
                        r={bR}
                        fill="#FEF08A"
                        opacity="0.85"
                        stroke="#D97706"
                        strokeWidth="2"
                      />
                    );
                  })}

                  {/* POTONGAN IKAN ASIN DIGORENG DI DALAM MINYAK PANAS */}
                  <g id="fish-frying" transform="translate(0, 15)">
                    <path
                      d="M -130 0 Q -60 -45 50 -40 Q 130 -30 145 0 Q 130 30 50 40 Q -60 45 -130 0 Z"
                      fill="#FDE68A"
                      stroke="#78350F"
                      strokeWidth="4"
                    />
                    <path d="M -120 0 Q 0 -2 130 0" stroke="#B45309" strokeWidth="4.5" fill="none" />

                    {/* NODA RACUN KIMIA TETAP BERTAHAN (TAHAN PANAS / TIDAK MATI!) */}
                    <g filter="url(#toxicGlow)">
                      <circle cx="10" cy="0" r={32 * toxicPulse} fill="#22C55E" opacity="0.9" />
                      <circle cx="10" cy="0" r="16" fill="#86EFAC" />
                      {/* Simbol Bahaya Tengkorak Tetap Utuh */}
                      <circle cx="10" cy="-3" r="7" fill="#0F172A" />
                      <rect x="7" y="3" width="6" height="4" rx="1" fill="#0F172A" />
                    </g>
                  </g>
                </g>

                {/* STEMPEL MERAH BESAR: MINYAK GORENG TETAP BERACUN (Frame 302+) */}
                {frame >= 302 && (
                  <PopElement as="g" startFrame={302} sfxType="whip" volume={0.22}>
                    <g transform="translate(225, 590)" filter="url(#stampShadow)">
                      <circle cx="0" cy="0" r="76" fill="#0F172A" stroke="#EF4444" strokeWidth="8" />
                      <circle cx="0" cy="0" r="64" fill="#FEF2F2" />
                      {/* Ikon Api */}
                      <path d="M 0 -24 C 8 -12 14 -2 14 8 C 14 18 7 24 0 24 C -7 24 -14 18 -14 8 C -14 2 -9 -5 -3 -10 C -3 -4 2 0 4 0 C 6 0 8 -5 0 -24 Z" fill="#F59E0B" />
                      {/* SILANG MERAH BESAR (TETAP BERACUN!) */}
                      <line x1="-38" y1="-38" x2="38" y2="38" stroke="#EF4444" strokeWidth="14" strokeLinecap="round" />
                      <line x1="38" y1="-38" x2="-38" y2="38" stroke="#EF4444" strokeWidth="14" strokeLinecap="round" />
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
            fill="url(#kitchenBgGrad)"
            opacity="0.95"
          />
        </svg>
      </CameraRig>
    </AbsoluteFill>
  );
};