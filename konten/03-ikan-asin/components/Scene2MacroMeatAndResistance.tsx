import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PopElement } from "../../../src/components/PopElement";
import { CameraRig } from "../../../src/components/CameraRig";

export const Scene2MacroMeatAndResistance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---------------------------------------------------------------------------
  // KAMERA & TRANSISI MAKRO ZOOM-IN (Frame 540 - 885)
  // Frame lokal dimulai dari 0 sampai 345
  // (Frame 0 lokal = Frame 540 global video)
  // ---------------------------------------------------------------------------
  const macroZoom = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const cameraScale = interpolate(macroZoom, [0, 1], [0.82, 1.0]);

  // ---------------------------------------------------------------------------
  // CONTINUOUS SECONDARY MOTION (Hukum "Layar Tidak Boleh Mati")
  // ---------------------------------------------------------------------------
  const fiberBreathing = 1 + Math.sin(frame / 15) * 0.018;
  const moleculeFloat = Math.sin(frame / 11) * 7;
  const moleculePulse = 1 + Math.sin(frame / 8) * 0.04;
  const moleculeRotate = (frame * 0.6) % 360;
  const waterWave = Math.sin(frame / 5) * 14;

  // ---------------------------------------------------------------------------
  // TAHAP 1: STRUKTUR KIMIA RACUN MERESAP & MENGUNCI SERAT LEMAK (Frame 63 - 220)
  // ---------------------------------------------------------------------------
  const poisonInfiltration = interpolate(frame, [63, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const toxicCoreGlowPulse = 0.75 + Math.sin(frame / 7) * 0.25;

  // ---------------------------------------------------------------------------
  // TAHAP 2: UJI GUYURAN AIR CUCI KRAN (Frame 240 - 302 lokal)
  // Sinkron dengan narasi "cuma dengan dicuci air" (Frame 804 - 845 global)
  // ---------------------------------------------------------------------------
  const isWaterWash = frame >= 240 && frame < 302;
  const waterFlowProgress = interpolate(frame, [240, 302], [-300, 1300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waterOpacity = isWaterWash
    ? interpolate(frame, [240, 250, 292, 302], [0, 0.9, 0.9, 0])
    : 0;

  // ---------------------------------------------------------------------------
  // TAHAP 3: UJI MINYAK GORENG PANAS MENDIDIH (Frame 302 - 345 lokal)
  // Sinkron dengan narasi "atau digoreng panas!" (Frame 845 - 885 global)
  // ---------------------------------------------------------------------------
  const isHotOil = frame >= 302;
  const oilTransition = interpolate(frame, [302, 318], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0F1D",
        overflow: "hidden",
      }}
    >
      <CameraRig
        zoom={cameraScale}
        whooshAtFrames={[0]} // Transisi masuk dari Scene 1
      >
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Gradasi Latar Laboratorium Mikroskopis Ilmiah */}
            <radialGradient id="labBgGrad" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Gradasi Daging Ikan Asin Cured Kering (Bukan Daging Mentah Berdarah!) */}
            <linearGradient id="curedMeatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="25%" stopColor="#FDE68A" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="85%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            {/* Gradasi Cincin Senyawa Kimiawi Racun Hijau Neon */}
            <linearGradient id="chemicalRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="40%" stopColor="#4ADE80" />
              <stop offset="80%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>

            {/* Gradasi Aliran Air Cuci Jernih */}
            <linearGradient id="waterStreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.75" />
              <stop offset="80%" stopColor="#0284C7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0.2" />
            </linearGradient>

            {/* Gradasi Minyak Goreng Mendidih Keemasan */}
            <radialGradient id="hotOilPoolGrad" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#D97706" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#78350F" stopOpacity="0.9" />
            </radialGradient>

            {/* Efek Pijar Toksin Berbahaya */}
            <filter id="toxicHexGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#4ADE80" floodOpacity="0.95" />
            </filter>
            <filter id="heatGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#F59E0B" floodOpacity="0.85" />
            </filter>
            <filter id="darkShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* =========================================================================
              LAYER 1: BACKGROUND MIKROSKOPIS ILMIAH & GRID INVESTIGASI MAKANAN
             ========================================================================= */}
          {/* Latar Laboratorium Mikroskopis Gelap */}
          <rect x="0" y="0" width="1080" height="1920" fill="url(#labBgGrad)" />

          {/* Grid Scanning Ilmiah Halus (UI/UX Kredibilitas Sains) */}
          <g opacity="0.12" stroke="#38BDF8" strokeWidth="1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`grid-h-${i}`} x1="0" y1={200 + i * 140} x2="1080" y2={200 + i * 140} />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`grid-v-${i}`} x1={90 + i * 150} y1="200" x2={90 + i * 150} y2="1320" />
            ))}
            {/* Lingkaran Target Retikel Mikroskopis */}
            <circle cx="540" cy="850" r="320" fill="none" strokeDasharray="8 8" strokeWidth="2" />
            <circle cx="540" cy="850" r="180" fill="none" strokeDasharray="6 6" strokeWidth="1.5" />
          </g>

          {/* =========================================================================
              LAYER 2: STRUKTUR MAKRO SERAT DAGING IKAN ASIN (CURED MEAT FIBERS)
              Warna autentik ikan asin jemuran matahari: kuning keemasan, amber,
              lapisan lemak lipid pengikat racun, dan taburan kristal garam laut.
             ========================================================================= */}
          <g
            id="macro-fish-meat-fibers"
            transform={`scale(${fiberBreathing})`}
            style={{ transformOrigin: "540px 850px" }}
            filter="url(#darkShadow)"
          >
            {/* Irisan Blok Daging Ikan Asin Makro di Tengah Layar (Y: 600 - 1150) */}
            <polygon
              points="120,620 960,620 1000,1120 80,1120"
              fill="url(#curedMeatGrad)"
              stroke="#78350F"
              strokeWidth="6"
              rx="20"
            />

            {/* Berkas Serat Otot Ikan Kering (Myotomes Segmented Ribbons) */}
            {Array.from({ length: 9 }).map((_, i) => {
              const y = 650 + i * 50;
              const waveOffset = Math.sin((frame + i * 15) / 14) * 8;
              return (
                <g key={`meat-flake-${i}`}>
                  {/* Alur Serat Berkas Daging Emas Cured */}
                  <path
                    d={`M 100 ${y} Q 360 ${y - 25 + waveOffset} 540 ${y + waveOffset} T 980 ${y + waveOffset}`}
                    fill="none"
                    stroke="#FEF3C7"
                    strokeWidth="16"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                  {/* Lapisan Lemak Intermuskular (Lipid Layer) yang Mengikat Insektisida */}
                  <path
                    d={`M 110 ${y + 20} Q 380 ${y + 5 + waveOffset} 540 ${y + 20 + waveOffset} T 970 ${y + 20 + waveOffset}`}
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="5"
                    strokeDasharray="12 10"
                    opacity="0.85"
                  />
                </g>
              );
            })}

            {/* Butiran Kristal Garam Laut Mikroskopis Terpapar */}
            <circle cx="280" cy="720" r="6" fill="#FFFFFF" opacity="0.9" />
            <circle cx="420" cy="810" r="5" fill="#FFFFFF" opacity="0.85" />
            <circle cx="680" cy="740" r="7" fill="#FFFFFF" opacity="0.95" />
            <circle cx="820" cy="850" r="5" fill="#FFFFFF" opacity="0.85" />
            <circle cx="340" cy="980" r="6" fill="#FFFFFF" opacity="0.9" />
            <circle cx="740" cy="1020" r="7" fill="#FFFFFF" opacity="0.95" />

            {/* Noda Infiltrasi Racun Kimia Meresap ke Daging (Frame 63+) */}
            {poisonInfiltration > 0 && (
              <g opacity={poisonInfiltration * 0.75}>
                <ellipse cx="540" cy="860" rx="340" ry="180" fill="#22C55E" opacity="0.32" filter="url(#toxicHexGlow)" />
                <ellipse cx="540" cy="860" rx="200" ry="110" fill="#15803D" opacity="0.4" />
              </g>
            )}
          </g>

          {/* =========================================================================
              LAYER 3: UJI MINYAK GORENG PANAS (Frame 302 - 345)
              Bukan menimpa seluruh layar! Melainkan kolam minyak bergolak di wajan
              dengan gelembung mendidih mendesis mengelilingi daging ikan asin!
             ========================================================================= */}
          {isHotOil && (
            <g opacity={oilTransition} filter="url(#heatGlow)">
              {/* Kolam Minyak Mendidih Keemasan di Atas Daging Ikan */}
              <ellipse cx="540" cy="870" rx="460" ry="260" fill="url(#hotOilPoolGrad)" />
              {/* Garis Bibir Wajan Baja Panas */}
              <ellipse cx="540" cy="870" rx="475" ry="275" fill="none" stroke="#F59E0B" strokeWidth="8" />

              {/* Gelembung Minyak Mendidih Bergolak Cepat (Sizzling Hot Oil Bubbles) */}
              {Array.from({ length: 24 }).map((_, i) => {
                const bY = 700 + ((frame * 9 + i * 45) % 360);
                const bX = 180 + ((i * 120) % 720) + Math.sin(frame / 3 + i) * 15;
                const bR = 10 + (i % 4) * 8;
                return (
                  <g key={`bubble-${i}`} transform={`translate(${bX}, ${bY})`}>
                    <circle cx="0" cy="0" r={bR} fill="#FEF08A" opacity="0.75" stroke="#D97706" strokeWidth="2.5" />
                    <circle cx={-bR * 0.3} cy={-bR * 0.3} r={bR * 0.28} fill="#FFFFFF" opacity="0.95" />
                  </g>
                );
              })}

              {/* Lidah Api Penggorengan Menjilat dari Bawah Wajan */}
              <path
                d={`M 150 1140 Q 300 ${1110 + Math.sin(frame) * 15} 450 1140 T 750 1140 T 950 1140 L 950 1190 L 150 1190 Z`}
                fill="#EF4444"
                opacity="0.85"
              />
              <path
                d={`M 220 1150 Q 380 ${1130 - Math.sin(frame) * 12} 540 1150 T 860 1150 L 860 1185 L 220 1185 Z`}
                fill="#F59E0B"
                opacity="0.9"
              />
            </g>
          )}

          {/* =========================================================================
              LAYER 4: UJI ALIRAN AIR CUCI BIRU (Frame 240 - 302)
              Guyuran air kran mengalir deras melintasi daging, namun racun tetap lekat!
             ========================================================================= */}
          {waterOpacity > 0 && (
            <g opacity={waterOpacity}>
              {/* Aliran Air Utama Bergelombang Melintas dari Kiri Atas ke Kanan Bawah */}
              <path
                d={`M ${waterFlowProgress - 350} 350 Q ${waterFlowProgress + 100} ${750 + waterWave} ${waterFlowProgress - 200} 1250 L ${waterFlowProgress + 200} 1250 Q ${waterFlowProgress + 500} ${750 - waterWave} ${waterFlowProgress + 50} 350 Z`}
                fill="url(#waterStreamGrad)"
              />
              <path
                d={`M ${waterFlowProgress - 150} 400 Q ${waterFlowProgress + 250} ${780 - waterWave} ${waterFlowProgress} 1200 L ${waterFlowProgress + 150} 1200 Q ${waterFlowProgress + 400} ${780 + waterWave} ${waterFlowProgress + 150} 400 Z`}
                fill="#BAE6FD"
                opacity="0.65"
              />

              {/* Percikan Butiran Air Cuci */}
              {Array.from({ length: 12 }).map((_, i) => (
                <circle
                  key={`water-drop-${i}`}
                  cx={waterFlowProgress - 100 + (i * 60)}
                  cy={550 + ((i * 70) % 500)}
                  r={8 + (i % 3) * 6}
                  fill="#FFFFFF"
                  opacity="0.85"
                />
              ))}
            </g>
          )}

          {/* =========================================================================
              LAYER 5: STRUKTUR SENYAWA KIMIAWI RACUN HEKSAGONAL LIPOFILIK
              Bukan monster kartun berduri! Melainkan representasi ilmiah senyawa
              pestisida (piretroid/organofosfat) yang menancap kuat pada serat lipid!
             ========================================================================= */}
          {frame >= 63 && (
            <PopElement as="g" startFrame={63} sfxType="whip" volume={0.22}>
              <g id="chemical-toxic-network" transform={`translate(0, ${moleculeFloat})`}>
                {/* -------------------------------------------------------------------
                    SENYAWA UTAMA (TENGAH — HERO MOLECULAR COMPOUND)
                   ------------------------------------------------------------------- */}
                <g
                  transform={`translate(540, 850) scale(${moleculePulse})`}
                  filter="url(#toxicHexGlow)"
                >
                  {/* Pijar Radiasi Toksik Berdenyut */}
                  <circle
                    cx="0"
                    cy="0"
                    r={120 + Math.sin(frame / 6) * 10}
                    fill={isHotOil ? "#EF4444" : "#22C55E"}
                    opacity={isHotOil ? 0.45 : 0.28 * toxicCoreGlowPulse}
                  />

                  {/* Cakar Ikatan Kimiawi Lipofilik (Menancap Kokoh ke Serat Lemak Ikan) */}
                  <path
                    d="M -70 50 Q -140 120 -220 180"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 70 50 Q 140 120 220 180"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M -80 -30 Q -160 -60 -240 -30"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 80 -30 Q 160 -60 240 -30"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />

                  {/* Node Ikatan Kimia di Ujung Cakar (Anchor Bonds) */}
                  <circle cx="-220" cy="180" r="14" fill="#22C55E" stroke="#052E16" strokeWidth="4" />
                  <circle cx="220" cy="180" r="14" fill="#22C55E" stroke="#052E16" strokeWidth="4" />
                  <circle cx="-240" cy="-30" r="13" fill="#22C55E" stroke="#052E16" strokeWidth="4" />
                  <circle cx="240" cy="-30" r="13" fill="#22C55E" stroke="#052E16" strokeWidth="4" />

                  {/* Cincin Heksagonal Benzena Toksik Luar (Rotasi Halus) */}
                  <g transform={`rotate(${moleculeRotate})`}>
                    <polygon
                      points="0,-85 74,-42 74,42 0,85 -74,42 -74,-42"
                      fill="none"
                      stroke="url(#chemicalRingGrad)"
                      strokeWidth="9"
                      strokeLinejoin="round"
                    />
                    {/* Ikatan Kovalen Ganda Heksagon (Double Bonds) */}
                    <line x1="0" y1="-72" x2="62" y2="-36" stroke="#86EFAC" strokeWidth="4" />
                    <line x1="62" y1="36" x2="0" y2="72" stroke="#86EFAC" strokeWidth="4" />
                    <line x1="-62" y1="-36" x2="-62" y2="36" stroke="#86EFAC" strokeWidth="4" />

                    {/* Atom Simpul di Setiap Sudut Heksagon (6 Node Lingkaran) */}
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <circle
                        key={`atom-${deg}`}
                        cx={85 * Math.sin((deg * Math.PI) / 180)}
                        cy={-85 * Math.cos((deg * Math.PI) / 180)}
                        r="11"
                        fill="#FEF08A"
                        stroke="#0F172A"
                        strokeWidth="3.5"
                      />
                    ))}
                  </g>

                  {/* Inti Molekular Toksik (Gelap Berpijar Bahaya) */}
                  <circle
                    cx="0"
                    cy="0"
                    r="52"
                    fill="#0F172A"
                    stroke="#4ADE80"
                    strokeWidth="5"
                  />

                  {/* Lambang Tengkorak Bahaya Kimia (Path Vektor Murni Sesuai Rule 11) */}
                  <g transform="translate(0, 2) scale(1.15)">
                    <circle cx="0" cy="-6" r="15" fill="#EF4444" stroke="#0F172A" strokeWidth="2.5" />
                    <rect x="-8" y="4" width="16" height="11" rx="3" fill="#EF4444" stroke="#0F172A" strokeWidth="2.5" />
                    <ellipse cx="-5" cy="-6" rx="4" ry="5" fill="#0F172A" />
                    <ellipse cx="5" cy="-6" rx="4" ry="5" fill="#0F172A" />
                    <polygon points="0,0 -2.5,4 2.5,4" fill="#0F172A" />
                    <line x1="-4" y1="8" x2="-4" y2="13" stroke="#0F172A" strokeWidth="2.2" />
                    <line x1="0" y1="8" x2="0" y2="13" stroke="#0F172A" strokeWidth="2.2" />
                    <line x1="4" y1="8" x2="4" y2="13" stroke="#0F172A" strokeWidth="2.2" />
                  </g>
                </g>

                {/* -------------------------------------------------------------------
                    SENYAWA SATELIT 2 (KIRI ATAS, Skala 0.65)
                   ------------------------------------------------------------------- */}
                <g transform="translate(260, 680) scale(0.65)" filter="url(#toxicHexGlow)">
                  <polygon
                    points="0,-70 60,-35 60,35 0,70 -60,35 -60,-35"
                    fill="#0F172A"
                    stroke="#22C55E"
                    strokeWidth="7"
                  />
                  <circle cx="0" cy="0" r="28" fill="#15803D" stroke="#86EFAC" strokeWidth="4" />
                  <circle cx="0" cy="0" r="10" fill="#FEF08A" />
                </g>

                {/* -------------------------------------------------------------------
                    SENYAWA SATELIT 3 (KANAN BAWAH, Skala 0.6)
                   ------------------------------------------------------------------- */}
                <g transform="translate(820, 1020) scale(0.6)" filter="url(#toxicHexGlow)">
                  <polygon
                    points="0,-70 60,-35 60,35 0,70 -60,35 -60,-35"
                    fill="#0F172A"
                    stroke="#22C55E"
                    strokeWidth="7"
                  />
                  <circle cx="0" cy="0" r="28" fill="#15803D" stroke="#86EFAC" strokeWidth="4" />
                  <circle cx="0" cy="0" r="10" fill="#FEF08A" />
                </g>
              </g>
            </PopElement>
          )}

          {/* =========================================================================
              LAYER 6: BADGE INDIKATOR PENGUJIAN ILMIAH (TETAP DI KANAN ATAS Y: 460)
              Posisikan di Kanan Atas (X: 820, Y: 460) - Bebas Tabrakan & Sangat Kontras
             ========================================================================= */}
          {/* Uji 1: Dicuci Air Kran = GAGAL LUNTUR (Frame 240 - 302) */}
          {waterOpacity > 0 && (
            <PopElement as="g" startFrame={245} sfxType="whip" volume={0.22}>
              <g transform="translate(820, 460)" filter="url(#darkShadow)">
                <circle cx="0" cy="0" r="95" fill="#0F172A" stroke="#38BDF8" strokeWidth="7" />
                <circle cx="0" cy="0" r="82" fill="#0C4A6E" />

                {/* Ikon Tetesan Air Biru Jernih */}
                <path
                  d="M 0 -36 C 18 -12 28 12 28 26 C 28 42 16 54 0 54 C -16 54 -28 42 -28 26 C -28 12 -18 -12 0 -36 Z"
                  fill="#38BDF8"
                  stroke="#BAE6FD"
                  strokeWidth="3.5"
                />
                <circle cx="-9" cy="18" r="5" fill="#FFFFFF" opacity="0.8" />

                {/* Palang Merah Tebal Larangan / Gagal Luntur */}
                <line x1="-42" y1="-42" x2="42" y2="42" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
                <line x1="42" y1="-42" x2="-42" y2="42" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
              </g>
            </PopElement>
          )}

          {/* Uji 2: Digoreng Minyak Panas Mendidih = TAHAN PANAS (Frame 302 - 345) */}
          {isHotOil && (
            <PopElement as="g" startFrame={305} sfxType="whip" volume={0.22}>
              <g transform="translate(820, 460)" filter="url(#darkShadow)">
                <circle cx="0" cy="0" r="100" fill="#0F172A" stroke="#EF4444" strokeWidth="8" />
                <circle cx="0" cy="0" r="86" fill="#450A0A" />

                {/* Ikon Api Penggorengan Oranye */}
                <path
                  d="M 0 -38 C 14 -20 24 -2 24 18 C 24 38 12 50 0 50 C -12 50 -24 38 -24 18 C -24 6 -16 -8 -5 -18 C -5 -6 3 2 7 2 C 11 2 14 -8 0 -38 Z"
                  fill="#F59E0B"
                  stroke="#FEF08A"
                  strokeWidth="3.5"
                />

                {/* Palang Merah Kegagalan Goreng Panas */}
                <line x1="-45" y1="-45" x2="45" y2="45" stroke="#EF4444" strokeWidth="13" strokeLinecap="round" />
                <line x1="45" y1="-45" x2="-45" y2="45" stroke="#EF4444" strokeWidth="13" strokeLinecap="round" />

                {/* Ikon Tengkorak Kecil di Bawah Badge */}
                <g transform="translate(0, 52) scale(0.9)">
                  <circle cx="0" cy="-5" r="11" fill="#EF4444" />
                  <rect x="-6" y="4" width="12" height="7" rx="2" fill="#EF4444" />
                  <circle cx="-3.5" cy="-5" r="2.5" fill="#FFFFFF" />
                  <circle cx="3.5" cy="-5" r="2.5" fill="#FFFFFF" />
                </g>
              </g>
            </PopElement>
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
            fill="url(#labBgGrad)"
            opacity="0.95"
          />
        </svg>
      </CameraRig>
    </AbsoluteFill>
  );
};