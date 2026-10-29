import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EP03_THEME } from "../theme";
import { PopElement } from "../../../src/components/PopElement";
import { CameraRig } from "../../../src/components/CameraRig";

export const Scene1SunDryingAndSpraying: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = EP03_THEME.colors;

  // ---------------------------------------------------------------------------
  // KAMERA & TRANSISI ZOOM / PAN (Sub-Scene 1A: 0-240, Sub-Scene 1B: 240-540)
  // ---------------------------------------------------------------------------
  const cameraZoom = interpolate(frame, [220, 260], [1.12, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [220, 260], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // CONTINUOUS SECONDARY MOTION (Hukum "Layar Tidak Boleh Mati")
  // ---------------------------------------------------------------------------
  const sunPulse = 1 + Math.sin(frame / 14) * 0.05;
  const sunRaysRotate = (frame * 0.45) % 360;
  const seaWaves = Math.sin(frame / 16) * 8;
  const cloudOffset1 = (frame * 0.7) % 1500 - 300;
  const cloudOffset2 = ((frame * 0.5) + 650) % 1500 - 300;
  const palmSway = Math.sin(frame / 18) * 3;
  const stinkWave = Math.sin(frame / 7) * 12;

  // Idle stickman breathing & sneaky bob
  const stickmanBob = Math.sin(frame / 11) * 2.5;

  // ---------------------------------------------------------------------------
  // SUB-SCENE 1A: HOOK INSTAN SEMPROTAN RACUN HIJAU (Frame 18 - 225)
  // ---------------------------------------------------------------------------
  // Mulai menyemprot langsung di frame 18 saat narator berteriak "Ngeri banget!"
  const isSprayingA = frame >= 18 && frame < 225;
  const sprayProgressA = interpolate(frame, [18, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sprayCloudOpacity = isSprayingA
    ? interpolate(frame, [18, 30, 195, 225], [0, 0.92, 0.92, 0])
    : 0;

  // Getaran nozel kaleng semprot akibat tekanan aerosol
  const sprayRecoil = isSprayingA ? Math.sin(frame * 2.2) * 2.5 : 0;

  // Kilauan bersih palsu pada ikan asin (Frame 180 - 240 saat narasi "awet dan bersih")
  const fakeCleanGleam = spring({
    frame: frame - 180,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // ---------------------------------------------------------------------------
  // SUB-SCENE 1B: LALAT MENDEKAT & TERPENTAL PUSING (Frame 240 - 540)
  // ---------------------------------------------------------------------------
  const flyApproachProgress = interpolate(frame, [240, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flyRepelProgress = interpolate(frame, [384, 430], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isRepelled = frame >= 384;
  const isSprayingB = frame >= 384 && frame < 490;
  const repelSprayOpacity = isSprayingB
    ? interpolate(frame, [384, 400, 450, 490], [0, 0.94, 0.94, 0])
    : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0369A1",
        overflow: "hidden",
      }}
    >
      <CameraRig
        zoom={cameraZoom}
        panY={cameraPanY}
        whooshAtFrames={[240]}
      >
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Gradasi Langit Pesisir Siang Cerah */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="40%" stopColor="#38BDF8" />
              <stop offset="80%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            {/* Gradasi Matahari Terik */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
              <stop offset="40%" stopColor="#FACC15" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            {/* Gradasi Laut Pesisir */}
            <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>

            {/* Gradasi Pasir Pantai Hangat */}
            <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="35%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Gradasi Kabut Semprotan Racun Hijau Neon Beracun */}
            <radialGradient id="toxicCloudGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#4ADE80" stopOpacity="0.88" />
              <stop offset="75%" stopColor="#22C55E" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
            </radialGradient>

            {/* Gradasi Kaleng Insektisida Aerosol */}
            <linearGradient id="canBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="25%" stopColor="#EF4444" />
              <stop offset="70%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>

            {/* Gradasi Bingkai Bambu */}
            <linearGradient id="bambooFrame" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="35%" stopColor="#B45309" />
              <stop offset="75%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Gradasi Bilah Anyaman Bambu (Top Rack) */}
            <linearGradient id="bambooSlatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Gradasi Ikan Asin Belah Punggung Kering */}
            <linearGradient id="fishFleshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F8FAFC" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            {/* Bayangan Halus & Glow Beracun */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0F172A" floodOpacity="0.32" />
            </filter>
            <filter id="glowToxic" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="26" floodColor="#4ADE80" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* =========================================================================
              LAYER 1: BACKGROUND ENVIRONMENT (Langit, Matahari, Laut, Pasir, Daun Kelapa)
             ========================================================================= */}
          {/* Langit Pesisir Cerah */}
          <rect x="0" y="0" width="1080" height="720" fill="url(#skyGrad)" />

          {/* Matahari Terik Pesisir (Kanan Atas) */}
          <g transform="translate(920, 180)">
            <g transform={`rotate(${sunRaysRotate})`}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="0"
                  y1="0"
                  x2={110 * Math.cos((angle * Math.PI) / 180)}
                  y2={110 * Math.sin((angle * Math.PI) / 180)}
                  stroke="#FDE047"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="140" fill="url(#sunGlow)" transform={`scale(${sunPulse})`} />
            <circle cx="0" cy="0" r="54" fill="#FEF08A" stroke="#F59E0B" strokeWidth="4" />
          </g>

          {/* Awan Pesisir Halus Melintas */}
          <g opacity="0.85">
            <g transform={`translate(${cloudOffset1}, 140)`}>
              <ellipse cx="140" cy="80" rx="90" ry="32" fill="#FFFFFF" opacity="0.9" />
              <ellipse cx="205" cy="65" rx="75" ry="40" fill="#FFFFFF" />
              <ellipse cx="270" cy="80" rx="65" ry="30" fill="#FFFFFF" opacity="0.95" />
            </g>
            <g transform={`translate(${cloudOffset2}, 230)`}>
              <ellipse cx="120" cy="65" rx="70" ry="26" fill="#FFFFFF" opacity="0.75" />
              <ellipse cx="175" cy="52" rx="60" ry="34" fill="#FFFFFF" opacity="0.85" />
              <ellipse cx="230" cy="65" rx="55" ry="24" fill="#FFFFFF" opacity="0.8" />
            </g>
          </g>

          {/* Laut Pesisir Bergelombang */}
          <path
            d={`M0 540 Q270 ${530 + seaWaves} 540 540 T1080 540 L1080 690 L0 690 Z`}
            fill="url(#seaGrad)"
          />
          <path
            d={`M0 580 Q270 ${572 - seaWaves} 540 580 T1080 580 L1080 690 L0 690 Z`}
            fill="#0284C7"
            opacity="0.6"
          />

          {/* Garis Pantai & Hamparan Pasir Pantai Hangat (Y: 670 - 1920) */}
          <path
            d="M0 670 Q540 650 1080 675 L1080 1920 L0 1920 Z"
            fill="url(#sandGrad)"
          />

          {/* Tekstur Kontur Pasir Halus */}
          <path d="M 0 740 Q 300 760 600 735 T 1080 750" stroke="#F59E0B" strokeWidth="3" fill="none" opacity="0.35" />
          <path d="M 0 860 Q 450 885 900 855 T 1080 870" stroke="#D97706" strokeWidth="3" fill="none" opacity="0.25" />

          {/* Daun Kelapa Tropis di Sudut Kiri Atas (Hanya Daun, Tanpa Batang Menusuk ke Meja) */}
          <g transform={`translate(-40, -30) rotate(${palmSway} 0 0)`}>
            <path
              d="M 0 0 Q 180 60 380 200 Q 240 150 0 0"
              fill="#15803D"
              stroke="#14532D"
              strokeWidth="4"
            />
            <path
              d="M 0 0 Q 260 40 450 110 Q 280 85 0 0"
              fill="#16A34A"
              stroke="#15803D"
              strokeWidth="4"
            />
            <path
              d="M 0 0 Q 120 160 210 320 Q 130 200 0 0"
              fill="#15803D"
              stroke="#14532D"
              strokeWidth="4"
            />
          </g>

          {/* =========================================================================
              LAYER 2: 2.5D ISOMETRIC PARA-PARA BAMBU (DRYING RACK)
              Posisi Meja: Y: 780 - 1080 | Kaki Berakhir di Y: 1250 (Bebas Subtitle!)
             ========================================================================= */}
          {/* Bayangan Jatuh Keseluruhan Meja di Atas Pasir Pantai */}
          <ellipse cx="560" cy="1220" rx="460" ry="45" fill="#B45309" opacity="0.3" />

          {/* 4 Tiang Bambu Penyangga Kokoh Berakhiran di Y: 1250 */}
          <g id="bamboo-stilts">
            {/* Bayangan Kontak Kaki-kaki di Pasir */}
            <ellipse cx="250" cy="1160" rx="26" ry="10" fill="#78350F" opacity="0.4" />
            <ellipse cx="860" cy="1160" rx="26" ry="10" fill="#78350F" opacity="0.4" />
            <ellipse cx="180" cy="1245" rx="32" ry="12" fill="#78350F" opacity="0.5" />
            <ellipse cx="940" cy="1245" rx="32" ry="12" fill="#78350F" opacity="0.5" />

            {/* Tiang Belakang Kiri */}
            <rect x="238" y="800" width="24" height="360" rx="8" fill="url(#bambooFrame)" stroke="#451A03" strokeWidth="4" />
            <line x1="238" y1="920" x2="262" y2="920" stroke="#451A03" strokeWidth="3" />
            <line x1="238" y1="1040" x2="262" y2="1040" stroke="#451A03" strokeWidth="3" />

            {/* Tiang Belakang Kanan */}
            <rect x="848" y="800" width="24" height="360" rx="8" fill="url(#bambooFrame)" stroke="#451A03" strokeWidth="4" />
            <line x1="848" y1="920" x2="872" y2="920" stroke="#451A03" strokeWidth="3" />
            <line x1="848" y1="1040" x2="872" y2="1040" stroke="#451A03" strokeWidth="3" />

            {/* Tiang Depan Kiri (Lebih Besar karena Kedalaman Perspektif) */}
            <rect x="166" y="1030" width="28" height="215" rx="10" fill="url(#bambooFrame)" stroke="#451A03" strokeWidth="4.5" />
            <line x1="166" y1="1130" x2="194" y2="1130" stroke="#451A03" strokeWidth="3.5" />

            {/* Tiang Depan Kanan */}
            <rect x="926" y="1030" width="28" height="215" rx="10" fill="url(#bambooFrame)" stroke="#451A03" strokeWidth="4.5" />
            <line x1="926" y1="1130" x2="954" y2="1130" stroke="#451A03" strokeWidth="3.5" />

            {/* Palang Penyangga Horizontal Antar Tiang Depan */}
            <rect x="180" y="1170" width="760" height="18" rx="7" fill="#92400E" stroke="#451A03" strokeWidth="4" />
            {/* Palang Silang Penguat (X-Brace) */}
            <line x1="190" y1="1230" x2="380" y2="1170" stroke="#78350F" strokeWidth="9" strokeLinecap="round" />
            <line x1="740" y1="1170" x2="930" y2="1230" stroke="#78350F" strokeWidth="9" strokeLinecap="round" />
          </g>

          {/* Permukaan Anyaman Bambu Miring 2.5D (Trapezoid Surface) */}
          <g id="bamboo-table-surface" filter="url(#softShadow)">
            {/* Lapisan Dasar Anyaman */}
            <polygon
              points="200,790 920,790 980,1050 140,1050"
              fill="#B45309"
              stroke="#451A03"
              strokeWidth="5"
            />

            {/* Kisi-kisi Bilah Bambu Perspektif Memanjang (21 Bilah) */}
            {Array.from({ length: 21 }).map((_, i) => {
              const backX = 210 + i * 35;
              const frontX = 150 + i * 41;
              return (
                <line
                  key={`slat-vert-${i}`}
                  x1={backX}
                  y1="792"
                  x2={frontX}
                  y2="1048"
                  stroke="url(#bambooSlatGrad)"
                  strokeWidth="8"
                  strokeLinecap="butt"
                />
              );
            })}

            {/* Kisi-kisi Bilah Bambu Melintang (Horizontal Ties) */}
            {[830, 875, 920, 965, 1010].map((y, idx) => {
              const progress = (y - 790) / (1050 - 790);
              const xStart = 200 - progress * 60;
              const xEnd = 920 + progress * 60;
              return (
                <line
                  key={`slat-horiz-${idx}`}
                  x1={xStart}
                  y1={y}
                  x2={xEnd}
                  y2={y}
                  stroke="#78350F"
                  strokeWidth="5"
                  opacity="0.85"
                />
              );
            })}

            {/* Bingkai Bambu Tebal Sekeliling Meja (Border Rim) */}
            <polygon points="190,780 930,780 920,795 200,795" fill="#78350F" stroke="#451A03" strokeWidth="3" />
            <polygon points="190,780 200,795 140,1055 130,1040" fill="#92400E" stroke="#451A03" strokeWidth="3" />
            <polygon points="930,780 940,795 990,1055 980,1040" fill="#92400E" stroke="#451A03" strokeWidth="3" />
            {/* Bibir Muka Meja Tebal Depan (Front Apron with 3D Depth) */}
            <polygon
              points="130,1045 990,1045 990,1075 130,1075"
              fill="url(#bambooFrame)"
              stroke="#451A03"
              strokeWidth="5"
            />
            {/* Ruas Sambungan Bambu di Bibir Depan */}
            <line x1="340" y1="1045" x2="340" y2="1075" stroke="#451A03" strokeWidth="3.5" />
            <line x1="560" y1="1045" x2="560" y2="1075" stroke="#451A03" strokeWidth="3.5" />
            <line x1="780" y1="1045" x2="780" y2="1075" stroke="#451A03" strokeWidth="3.5" />
          </g>

          {/* Keranjang Bambu Tradisional (Besek Ikan) di Samping Kanan Pasir (X: 840, Y: 1210 - 1310) */}
          <g id="traditional-fish-basket" transform="translate(840, 1220)" filter="url(#softShadow)">
            <ellipse cx="40" cy="65" rx="55" ry="18" fill="#78350F" opacity="0.4" />
            {/* Badan Keranjang Anyaman */}
            <path
              d="M 0 20 Q 40 10 80 20 L 70 65 Q 40 72 10 65 Z"
              fill="#D97706"
              stroke="#451A03"
              strokeWidth="4"
            />
            {/* Garis Anyaman Besek */}
            <path d="M 12 25 L 68 62 M 68 25 L 12 62" stroke="#B45309" strokeWidth="3" opacity="0.8" />
            <path d="M 28 18 L 52 68 M 52 18 L 28 68" stroke="#B45309" strokeWidth="3" opacity="0.8" />
            {/* Bibir Keranjang */}
            <ellipse cx="40" cy="20" rx="42" ry="12" fill="#F59E0B" stroke="#451A03" strokeWidth="3.5" />
            {/* Ikan Asin Cadangan / Garam di Dalam Keranjang */}
            <ellipse cx="40" cy="18" rx="34" ry="8" fill="#F8FAFC" opacity="0.9" />
            <ellipse cx="40" cy="18" rx="20" ry="5" fill="#CBD5E1" />
          </g>

          {/* =========================================================================
              LAYER 3: IKAN ASIN BELAH PUNGGUNG TRADISIONAL (4 EKOR DENGAN PERSPEKTIF)
              Bentuk butterfly-cut autentik: lekukan belahan daging, tulang tengah,
              tekstur jemuran garam, dan sirip ekor cabang.
             ========================================================================= */}
          <g id="salted-fishes-cluster">
            {/* IKAN ASIN 1 (Kiri Atas - Perspektif Jauh, Skala 0.85) */}
            <g transform="translate(250, 810) rotate(-6) scale(0.85)" filter="url(#softShadow)">
              <ellipse cx="120" cy="62" rx="100" ry="32" fill="#78350F" opacity="0.35" />
              <polygon points="25,50 0,18 12,50 0,82" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
              <path
                d="M 25 50 Q 60 15 130 18 Q 195 22 225 45 Q 235 50 225 55 Q 195 78 130 82 Q 60 85 25 50 Z"
                fill="url(#fishFleshGrad)"
                stroke="#1E293B"
                strokeWidth="4"
              />
              <path d="M 30 50 Q 120 45 220 50" stroke="#475569" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M 60 36 L 85 50 L 60 64" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
              <path d="M 110 32 L 135 50 L 110 68" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
              <path d="M 160 34 L 182 50 L 160 66" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
              <circle cx="215" cy="46" r="6" fill="#0F172A" />
              <circle cx="217" cy="44" r="2" fill="#FFFFFF" />
            </g>

            {/* IKAN ASIN 2 (Kanan Atas - Perspektif Jauh, Skala 0.9) */}
            <g transform="translate(710, 820) rotate(8) scale(0.9)" filter="url(#softShadow)">
              <ellipse cx="120" cy="62" rx="100" ry="32" fill="#78350F" opacity="0.35" />
              <polygon points="25,50 0,18 12,50 0,82" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
              <path
                d="M 25 50 Q 60 15 130 18 Q 195 22 225 45 Q 235 50 225 55 Q 195 78 130 82 Q 60 85 25 50 Z"
                fill="url(#fishFleshGrad)"
                stroke="#1E293B"
                strokeWidth="4"
              />
              <path d="M 30 50 Q 120 45 220 50" stroke="#475569" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M 70 35 L 95 50 L 70 65" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
              <path d="M 120 32 L 145 50 L 120 68" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
              <circle cx="215" cy="46" r="6" fill="#0F172A" />
              <circle cx="217" cy="44" r="2" fill="#FFFFFF" />
            </g>

            {/* IKAN ASIN 3 (Kiri Bawah - Lebih Dekat, Skala 1.05) */}
            <g transform="translate(320, 930) rotate(-4) scale(1.05)" filter="url(#softShadow)">
              <ellipse cx="125" cy="64" rx="110" ry="35" fill="#78350F" opacity="0.35" />
              <polygon points="25,52 0,16 12,52 0,88" fill="#CBD5E1" stroke="#334155" strokeWidth="3.5" />
              <path
                d="M 25 52 Q 65 14 135 16 Q 205 20 235 46 Q 245 52 235 58 Q 205 84 135 88 Q 65 90 25 52 Z"
                fill="url(#fishFleshGrad)"
                stroke="#1E293B"
                strokeWidth="4.5"
              />
              <path d="M 30 52 Q 130 46 230 52" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 75 35 L 105 52 L 75 69" stroke="#94A3B8" strokeWidth="3" fill="none" />
              <path d="M 130 31 L 160 52 L 130 73" stroke="#94A3B8" strokeWidth="3" fill="none" />
              <path d="M 180 34 L 205 52 L 180 70" stroke="#94A3B8" strokeWidth="3" fill="none" />
              <circle cx="95" cy="40" r="3" fill="#FFFFFF" />
              <circle cx="145" cy="62" r="3" fill="#FFFFFF" />
              <circle cx="175" cy="44" r="2.5" fill="#FFFFFF" />
              <circle cx="225" cy="48" r="6.5" fill="#0F172A" />
              <circle cx="227" cy="46" r="2.5" fill="#FFFFFF" />
            </g>

            {/* IKAN ASIN 4 (Tengah Kanan - HERO FISH Target Utama Semprotan, Skala 1.18) */}
            <g transform="translate(560, 915) rotate(2) scale(1.18)" filter="url(#softShadow)">
              <ellipse cx="130" cy="66" rx="118" ry="38" fill="#78350F" opacity="0.38" />
              <polygon points="25,54 0,14 14,54 0,94" fill="#CBD5E1" stroke="#1E293B" strokeWidth="4" />
              <path
                d="M 25 54 Q 68 12 140 14 Q 215 18 248 48 Q 258 54 248 60 Q 215 90 140 94 Q 68 96 25 54 Z"
                fill="url(#fishFleshGrad)"
                stroke="#0F172A"
                strokeWidth="5"
              />
              <path d="M 30 54 Q 135 48 240 54" stroke="#334155" strokeWidth="5.5" fill="none" strokeLinecap="round" />
              <path d="M 80 34 L 112 54 L 80 74" stroke="#64748B" strokeWidth="3.5" fill="none" />
              <path d="M 135 30 L 168 54 L 135 78" stroke="#64748B" strokeWidth="3.5" fill="none" />
              <path d="M 190 33 L 218 54 L 190 75" stroke="#64748B" strokeWidth="3.5" fill="none" />
              {/* Butiran Kristal Garam Berkilau */}
              <circle cx="100" cy="38" r="3.5" fill="#FFFFFF" />
              <circle cx="120" cy="65" r="3" fill="#FFFFFF" />
              <circle cx="155" cy="42" r="3" fill="#FFFFFF" />
              <circle cx="185" cy="62" r="3.5" fill="#FFFFFF" />
              <circle cx="210" cy="40" r="2.5" fill="#FFFFFF" />
              <circle cx="238" cy="50" r="7.5" fill="#0F172A" />
              <circle cx="240" cy="48" r="2.5" fill="#FFFFFF" />
            </g>
          </g>

          {/* =========================================================================
              GELOMBANG AROMA AMIS DI UDARA (Frame 240 - 384)
             ========================================================================= */}
          {frame >= 240 && frame < 390 && (
            <g opacity={interpolate(frame, [240, 260, 360, 384], [0, 0.85, 0.85, 0])}>
              <path
                d={`M 460 900 Q ${475 + stinkWave} 800 450 700 T ${485 + stinkWave} 570`}
                fill="none"
                stroke="#64748B"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray="10 12"
              />
              <path
                d={`M 590 880 Q ${570 - stinkWave} 780 600 670 T ${570 - stinkWave} 550`}
                fill="none"
                stroke="#94A3B8"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray="8 10"
              />
              <path
                d={`M 720 900 Q ${740 + stinkWave} 810 710 710 T ${730 + stinkWave} 590`}
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="6 8"
              />
            </g>
          )}

          {/* =========================================================================
              LALAT-LALAT KARTUN TERBANG MENDEKAT & TERPENTAL PUSING (Frame 240 - 540)
             ========================================================================= */}
          {frame >= 240 && (
            <g id="flies-cluster">
              {/* LALAT 1 (Terbang dari Kiri ke Tengah, Terpental ke Kiri Atas) */}
              {(() => {
                const flyX = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [480, 120])
                  : interpolate(flyApproachProgress, [0, 1], [180, 480]);
                const flyY = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [780, 560])
                  : interpolate(flyApproachProgress, [0, 1], [580, 780]) + Math.sin(frame / 4) * 16;
                const flyAngle = isRepelled ? (frame * 24) % 360 : Math.sin(frame / 6) * 20;
                const wingFlap = Math.sin(frame * 1.8) * 18;

                return (
                  <g transform={`translate(${flyX}, ${flyY}) rotate(${flyAngle})`} filter="url(#softShadow)">
                    <ellipse cx="-10" cy={-16 + wingFlap} rx="16" ry="9" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="2" />
                    <ellipse cx="10" cy={-16 - wingFlap} rx="16" ry="9" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="2" />
                    <ellipse cx="0" cy="0" rx="18" ry="13" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
                    <circle cx="12" cy="-2" r="9" fill="#DC2626" stroke="#0F172A" strokeWidth="2" />
                    {isRepelled ? (
                      <path
                        d="M 12 -2 m -4,0 a 4,4 0 1,0 8,0 a 7,7 0 1,0 -14,0"
                        fill="none"
                        stroke="#FEF08A"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    ) : (
                      <circle cx="14" cy="-3" r="3.5" fill="#FEE2E2" />
                    )}
                  </g>
                );
              })()}

              {/* LALAT 2 (Terbang dari Kanan ke Tengah, Terpental ke Kanan Atas) */}
              {(() => {
                const flyX = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [680, 960])
                  : interpolate(flyApproachProgress, [0, 1], [880, 680]);
                const flyY = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [820, 600])
                  : interpolate(flyApproachProgress, [0, 1], [620, 820]) + Math.sin(frame / 5) * 14;
                const flyAngle = isRepelled ? -(frame * 22) % 360 : -Math.sin(frame / 6) * 18;
                const wingFlap = Math.cos(frame * 1.8) * 18;

                return (
                  <g transform={`translate(${flyX}, ${flyY}) rotate(${flyAngle})`} filter="url(#softShadow)">
                    <ellipse cx="-10" cy={-15 + wingFlap} rx="15" ry="8" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="2" />
                    <ellipse cx="10" cy={-15 - wingFlap} rx="15" ry="8" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="2" />
                    <ellipse cx="0" cy="0" rx="16" ry="12" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
                    <circle cx="-11" cy="-2" r="8" fill="#DC2626" stroke="#0F172A" strokeWidth="2" />
                    {isRepelled ? (
                      <path
                        d="M -11 -2 m -3,0 a 3,3 0 1,0 6,0 a 6,6 0 1,0 -12,0"
                        fill="none"
                        stroke="#FEF08A"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    ) : (
                      <circle cx="-12" cy="-3" r="3" fill="#FEE2E2" />
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* =========================================================================
              KABUT RACUN SEMPROTAN HIJAU NEON (Sub-Scene 1A & 1B)
             ========================================================================= */}
          {/* Semburan Racun 1A (Frame 18 - 225) */}
          {sprayCloudOpacity > 0 && (
            <g opacity={sprayCloudOpacity} filter="url(#glowToxic)">
              {/* Semburan Kerucut Langsung dari Nozel Kaleng ke Ikan */}
              <path
                d="M 335 635 Q 460 700 640 830 Q 520 960 340 760 Z"
                fill="url(#toxicCloudGrad)"
              />
              {/* Gumpalan Partikel Asap Racun Melayang di Atas Ikan Asin */}
              <circle cx="520" cy="840" r={115 * sprayProgressA} fill="url(#toxicCloudGrad)" />
              <circle cx="660" cy="870" r={140 * sprayProgressA} fill="url(#toxicCloudGrad)" />
              <circle cx="780" cy="850" r={120 * sprayProgressA} fill="url(#toxicCloudGrad)" />
              {/* Butiran Tetesan Aerosol Hijau Beracun */}
              <circle cx="440" cy="740" r={8} fill="#86EFAC" />
              <circle cx="560" cy="820" r={10} fill="#4ADE80" />
              <circle cx="680" cy="850" r={11} fill="#86EFAC" />
              <circle cx="740" cy="910" r={8} fill="#BBF7D0" />
              <circle cx="820" cy="860" r={7} fill="#4ADE80" />
            </g>
          )}

          {/* Semburan Racun 1B Mengusir Lalat (Frame 384 - 490) */}
          {repelSprayOpacity > 0 && (
            <g opacity={repelSprayOpacity} filter="url(#glowToxic)">
              <path
                d="M 335 635 Q 480 620 680 720 Q 580 880 340 750 Z"
                fill="url(#toxicCloudGrad)"
              />
              <circle cx="560" cy="740" r={165} fill="url(#toxicCloudGrad)" />
              <circle cx="420" cy="700" r={135} fill="url(#toxicCloudGrad)" />
              <circle cx="720" cy="710" r={140} fill="url(#toxicCloudGrad)" />
            </g>
          )}

          {/* =========================================================================
              KILAUAN BERSIH PALSU (Frame 180 - 240 saat narasi "awet dan bersih")
              Diletakkan di foreground agar menembus kabut racun dengan kontras tinggi!
             ========================================================================= */}
          {fakeCleanGleam > 0 && (
            <g opacity={fakeCleanGleam} filter="url(#softShadow)">
              {/* Kilau Berlian Emas 4-Titik di Ikan Tengah */}
              <g transform={`translate(720, 930) scale(${1.0 + Math.sin(frame / 4) * 0.2}) rotate(${frame * 3})`}>
                <path
                  d="M 0 -36 Q 0 0 36 0 Q 0 0 0 36 Q 0 0 -36 0 Q 0 0 0 -36 Z"
                  fill="#FEF08A"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                />
                <path
                  d="M 0 -18 Q 0 0 18 0 Q 0 0 0 18 Q 0 0 -18 0 Q 0 0 0 -18 Z"
                  fill="#FFFFFF"
                />
              </g>
              {/* Kilau Berlian Biru Neon di Ikan Depan */}
              <g transform={`translate(520, 960) scale(${0.8 + Math.cos(frame / 4) * 0.2}) rotate(${-frame * 3})`}>
                <path
                  d="M 0 -28 Q 0 0 28 0 Q 0 0 0 28 Q 0 0 -28 0 Q 0 0 0 -28 Z"
                  fill="#38BDF8"
                  stroke="#0284C7"
                  strokeWidth="3"
                />
                <path
                  d="M 0 -14 Q 0 0 14 0 Q 0 0 0 14 Q 0 0 -14 0 Q 0 0 0 -14 Z"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          )}

          {/* =========================================================================
              LAYER 4: KARAKTER STICKMAN "OKNUM NAKAL" DENGAN KALENG RACUN
              Berdiri di samping kiri meja (X: 180, Y: 520 - 1100), memegang kaleng racun
              dengan jari menekan nozel semprot langsung ke arah ikan asin.
             ========================================================================= */}
          <g id="stickman-oknum-nakal" transform={`translate(0, ${stickmanBob})`}>
            {/* Bayangan Kaki Stickman di Pasir Pantai */}
            <ellipse cx="145" cy="1070" rx="28" ry="10" fill="#78350F" opacity="0.4" />
            <ellipse cx="205" cy="1070" rx="28" ry="10" fill="#78350F" opacity="0.4" />

            {/* Kaki Kiri & Kanan (Garis Tebal Stylized) */}
            <path
              d="M 155 830 L 145 1065 L 125 1070"
              fill="none"
              stroke="#0F172A"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 185 830 L 200 1065 L 220 1070"
              fill="none"
              stroke="#0F172A"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Sandal Jepit Pedagang Pesisir di Kaki */}
            <rect x="120" y="1065" width="28" height="8" rx="4" fill="#3B82F6" stroke="#0F172A" strokeWidth="2.5" />
            <rect x="195" y="1065" width="28" height="8" rx="4" fill="#3B82F6" stroke="#0F172A" strokeWidth="2.5" />

            {/* Badan: Kaos Singlet Hitam Pedagang Pasar (Beri Volume & Kontras Jelas) */}
            <path
              d="M 140 660 L 205 660 L 215 835 L 130 835 Z"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Lengan Kiri (Bertolak Pinggang Santai / Akimbo) */}
            <path
              d="M 140 670 L 95 725 L 135 775"
              fill="none"
              stroke="#0F172A"
              strokeWidth="15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Kepala Stickman Bulat */}
            <circle
              cx="170"
              cy="595"
              r="40"
              fill="#FDE68A"
              stroke="#0F172A"
              strokeWidth="6"
            />

            {/* Topi Caping Bambu Pedagang Pesisir (Miring Nyeleneh di Atas Kepala) */}
            <polygon
              points="90,580 170,510 250,580"
              fill="#D97706"
              stroke="#451A03"
              strokeWidth="5"
            />
            <line x1="170" y1="510" x2="170" y2="580" stroke="#B45309" strokeWidth="3" />
            <line x1="120" y1="555" x2="220" y2="555" stroke="#B45309" strokeWidth="3" />

            {/* Ekspresi Wajah Licik (Mata Sipit Miring & Senyum Seringai) */}
            {/* Alis & Mata Kiri */}
            <path d="M 146 590 L 160 594 L 148 600" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Alis & Mata Kanan */}
            <path d="M 172 594 L 186 590 L 184 600" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Senyum Seringai Licik Pedagang Curang */}
            <path
              d="M 152 612 Q 168 624 186 608"
              fill="none"
              stroke="#0F172A"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Lengan Kanan Terulur Memegang Kaleng Semprot (Dengan Recoil Getar saat Semprot) */}
            <g transform={`translate(${sprayRecoil}, 0)`}>
              {/* Lengan Atas ke Siku */}
              <path
                d="M 200 670 Q 240 685 270 655"
                fill="none"
                stroke="#0F172A"
                strokeWidth="15"
                strokeLinecap="round"
              />

              {/* Tangan & Kaleng Insektisida Aerosol Merah */}
              <g transform="translate(265, 625) rotate(-22)">
                {/* Jari Tangan Menekan Nozel Kaleng */}
                <ellipse cx="20" cy="18" rx="16" ry="12" fill="#FDE68A" stroke="#0F172A" strokeWidth="4" />
                <rect x="14" y="-8" width="12" height="22" rx="6" fill="#FDE68A" stroke="#0F172A" strokeWidth="3.5" />

                {/* Nozel Semprot Hitam */}
                <rect x="20" y="-20" width="16" height="22" rx="4" fill="#0F172A" stroke="#1E293B" strokeWidth="3" />
                {/* Titik Lubang Semprotan Merah (Arah Kabut Racun) */}
                <circle cx="36" cy="-10" r="3.5" fill="#EF4444" />

                {/* Tutup Atas Kaleng Melengkung */}
                <ellipse cx="28" cy="4" rx="36" ry="12" fill="#DC2626" stroke="#0F172A" strokeWidth="4" />

                {/* Tabung Silinder Kaleng Semprot Merah Mencolok */}
                <rect
                  x="-8"
                  y="4"
                  width="72"
                  height="195"
                  rx="8"
                  fill="url(#canBodyGrad)"
                  stroke="#0F172A"
                  strokeWidth="5"
                />

                {/* Sabuk Hitam Peringatan Bahaya */}
                <rect x="-8" y="55" width="72" height="75" fill="#0F172A" />

                {/* Lambang Tengkorak Bahaya Racun (Path Vektor Murni Tanpa Tag Text) */}
                <g transform="translate(28, 92)">
                  <circle cx="0" cy="-6" r="14" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
                  <rect x="-8" y="4" width="16" height="10" rx="3" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
                  <ellipse cx="-5" cy="-6" rx="3.5" ry="4.5" fill="#0F172A" />
                  <ellipse cx="5" cy="-6" rx="3.5" ry="4.5" fill="#0F172A" />
                  <polygon points="0,0 -2,4 2,4" fill="#0F172A" />
                  <line x1="-4" y1="8" x2="-4" y2="13" stroke="#0F172A" strokeWidth="2" />
                  <line x1="0" y1="8" x2="0" y2="13" stroke="#0F172A" strokeWidth="2" />
                  <line x1="4" y1="8" x2="4" y2="13" stroke="#0F172A" strokeWidth="2" />
                </g>

                {/* Dasar Bawah Kaleng */}
                <ellipse cx="28" cy="199" rx="36" ry="12" fill="#7F1D1D" stroke="#0F172A" strokeWidth="4" />
              </g>
            </g>
          </g>

          {/* =========================================================================
              BADGE POP-UP: SILANG LALAT & PERINGATAN BAHAYA RACUN (Frame 415 - 540)
              Posisikan di Kanan Atas (X: 780, Y: 520) - Seimbang, Elegan, Bebas Subtitle
             ========================================================================= */}
          {frame >= 415 && (
            <PopElement as="g" startFrame={415} sfxType="whip" volume={0.22}>
              <g transform="translate(780, 520)" filter="url(#softShadow)">
                {/* Lingkaran Luar Merah Bahaya */}
                <circle cx="0" cy="0" r="115" fill="#0F172A" stroke="#EF4444" strokeWidth="8" />
                <circle cx="0" cy="0" r="100" fill="#FEF2F2" />

                {/* Ikon Lalat Besar di Tengah Badge */}
                <g transform="translate(0, -10)">
                  <ellipse cx="-14" cy="5" rx="20" ry="14" fill="#334155" />
                  <circle cx="9" cy="2" r="10" fill="#DC2626" />
                  <ellipse cx="-20" cy="-14" rx="16" ry="8.5" fill="#BAE6FD" opacity="0.85" />
                  {/* Tanda Silang Merah Tebal Mengusir Lalat */}
                  <line x1="-45" y1="-45" x2="45" y2="45" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
                  <line x1="45" y1="-45" x2="-45" y2="45" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
                </g>

                {/* Ikon Tengkorak Peringatan Racun di Bagian Bawah Badge */}
                <g transform="translate(0, 54) scale(0.95)">
                  <circle cx="0" cy="-5" r="12" fill="#DC2626" />
                  <rect x="-7" y="4" width="14" height="8" rx="2" fill="#DC2626" />
                  <circle cx="-4" cy="-5" r="2.8" fill="#FFFFFF" />
                  <circle cx="4" cy="-5" r="2.8" fill="#FFFFFF" />
                </g>
              </g>
            </PopElement>
          )}
        </svg>
      </CameraRig>
    </AbsoluteFill>
  );
};