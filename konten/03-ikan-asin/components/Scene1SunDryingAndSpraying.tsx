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
import { MainCharacter } from "../../../src/components/characters/MainCharacter";
import { FONTS } from "../../../src/theme/fonts";
import {
  getRecoilImpulse,
  getSquashAndStretch,
} from "../../../src/utils/physics";

export const Scene1SunDryingAndSpraying: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---------------------------------------------------------------------------
  // KAMERA & TRANSISI ZOOM / PAN (Sub-Scene 1A: 0-240, Sub-Scene 1B: 240-540)
  // ---------------------------------------------------------------------------
  const cameraZoom = interpolate(frame, [220, 260], [1.08, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [220, 260], [-30, 0], {
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

  // Gerak bernapas & stealthy bob oknum nakal
  const stealthBob = Math.sin(frame / 10) * 3;

  // ---------------------------------------------------------------------------
  // SUB-SCENE 1A: HOOK INSTAN SEMPROTAN RACUN KE IKAN (Frame 18 - 225)
  // ---------------------------------------------------------------------------
  // Mulai menyemprot langsung di frame 18 saat narator berteriak "Ngeri banget!"
  const isSprayingA = frame >= 18 && frame < 225;
  const sprayProgressA = interpolate(frame, [18, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sprayCloudOpacity = isSprayingA
    ? interpolate(frame, [18, 28, 195, 225], [0, 0.95, 0.95, 0])
    : 0;

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
    ? interpolate(frame, [384, 400, 450, 490], [0, 0.95, 0.95, 0])
    : 0;

  // ---------------------------------------------------------------------------
  // FISIKA RECOIL REALISTIS MENGGUNAKAN getRecoilImpulse() DARI physics.ts
  // Recoil saat kaleng aerosol pertama kali menyemprot di frame 18 & frame 384
  // ---------------------------------------------------------------------------
  const recoilImpulseA = getRecoilImpulse(frame, 18, fps, 26);
  const recoilImpulseB = getRecoilImpulse(frame, 384, fps, 26);
  const continuousHissVibration =
    isSprayingA || isSprayingB ? Math.sin(frame * 2.8) * 2.2 : 0;
  // Hentakan balik horizontal ke arah kiri (-X) & hentakan vertikal mendongak (-Y)
  const sprayRecoilX = -(recoilImpulseA * 22 + recoilImpulseB * 18) + continuousHissVibration;
  const sprayRecoilY = -(recoilImpulseA * 7 + recoilImpulseB * 6);

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
          style={{
            overflow: "visible",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 5,
          }}
        >
          <defs>
            {/* Gradasi Langit Pesisir Siang Cerah */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="45%" stopColor="#38BDF8" />
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
              <stop offset="30%" stopColor="#FCD34D" />
              <stop offset="85%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Gradasi Jet Aerosol & Kabut Racun Serangga */}
            <linearGradient id="aerosolJetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#86EFAC" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#4ADE80" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0.1" />
            </linearGradient>

            <radialGradient id="toxicCloudGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#BBF7D0" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#4ADE80" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#22C55E" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
            </radialGradient>

            {/* Gradasi Kaleng Insektisida Aerosol Merah */}
            <linearGradient id="canBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7F1D1D" />
              <stop offset="20%" stopColor="#DC2626" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="85%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
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
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="40%" stopColor="#FDE68A" />
              <stop offset="75%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Gradasi Ikan Asin Belah Punggung Kering */}
            <linearGradient id="fishFleshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#F8FAFC" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="85%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            {/* Bayangan & Glow Beracun */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0F172A" floodOpacity="0.35" />
            </filter>
            <filter id="glowToxic" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="24" floodColor="#4ADE80" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* =========================================================================
              LAYER 1: BACKGROUND ENVIRONMENT (Langit, Matahari, Laut, Pasir, Daun)
              Komposisi vertikal 9:16 yang seimbang, tidak ada dead space kosong!
             ========================================================================= */}
          {/* Langit Pesisir Cerah (Y: 0 - 520) */}
          <rect x="0" y="0" width="1080" height="520" fill="url(#skyGrad)" />

          {/* Matahari Terik Pesisir (Kanan Atas) */}
          <g transform="translate(930, 160)">
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
                  opacity="0.6"
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="140" fill="url(#sunGlow)" transform={`scale(${sunPulse})`} />
            <circle cx="0" cy="0" r="54" fill="#FEF08A" stroke="#F59E0B" strokeWidth="4" />
          </g>

          {/* Awan Pesisir Halus Melintas */}
          <g opacity="0.85">
            <g transform={`translate(${cloudOffset1}, 120)`}>
              <ellipse cx="140" cy="80" rx="90" ry="32" fill="#FFFFFF" opacity="0.9" />
              <ellipse cx="205" cy="65" rx="75" ry="40" fill="#FFFFFF" />
              <ellipse cx="270" cy="80" rx="65" ry="30" fill="#FFFFFF" opacity="0.95" />
            </g>
            <g transform={`translate(${cloudOffset2}, 210)`}>
              <ellipse cx="120" cy="65" rx="70" ry="26" fill="#FFFFFF" opacity="0.75" />
              <ellipse cx="175" cy="52" rx="60" ry="34" fill="#FFFFFF" opacity="0.85" />
              <ellipse cx="230" cy="65" rx="55" ry="24" fill="#FFFFFF" opacity="0.8" />
            </g>
          </g>

          {/* Laut Pesisir Bergelombang (Y: 460 - 620) */}
          <path
            d={`M0 470 Q270 ${460 + seaWaves} 540 470 T1080 470 L1080 620 L0 620 Z`}
            fill="url(#seaGrad)"
          />
          <path
            d={`M0 510 Q270 ${500 - seaWaves} 540 510 T1080 510 L1080 620 L0 620 Z`}
            fill="#0284C7"
            opacity="0.6"
          />

          {/* Hamparan Pasir Pantai Hangat (Y: 590 - 1920) */}
          <path
            d="M0 590 Q540 570 1080 595 L1080 1920 L0 1920 Z"
            fill="url(#sandGrad)"
          />

          {/* Garis Tekstur Pasir Pantai Halus */}
          <path d="M 0 660 Q 300 680 600 655 T 1080 670" stroke="#F59E0B" strokeWidth="3" fill="none" opacity="0.35" />
          <path d="M 0 760 Q 450 785 900 755 T 1080 770" stroke="#D97706" strokeWidth="3" fill="none" opacity="0.25" />

          {/* Daun Kelapa Tropis di Sudut Kiri Atas (Framing Alam Elegan Tanpa Batang Menusuk) */}
          <g transform={`translate(-40, -30) rotate(${palmSway} 0 0)`}>
            <path d="M 0 0 Q 180 60 380 200 Q 240 150 0 0" fill="#15803D" stroke="#14532D" strokeWidth="4" />
            <path d="M 0 0 Q 260 40 450 110 Q 280 85 0 0" fill="#16A34A" stroke="#15803D" strokeWidth="4" />
            <path d="M 0 0 Q 120 160 210 320 Q 130 200 0 0" fill="#15803D" stroke="#14532D" strokeWidth="4" />
          </g>

          {/* =========================================================================
              LAYER 2: PARA-PARA BAMBU 2.5D PROPORSI BESAR & KOKOH
              Mengisi area Y: 720 - 1260 secara dominan, proporsional untuk Shorts 9:16!
             ========================================================================= */}
          {/* Bayangan Kontak Meja Besar di Pasir Pantai */}
          <ellipse cx="560" cy="1240" rx="480" ry="55" fill="#78350F" opacity="0.35" />

          {/* 4 Tiang Penyangga Bambu Kokoh (Berhenti di Y: 1260, Subtitle Y: 1350-1700 Steril!) */}
          <g id="bamboo-stilts">
            {/* Bayangan Kaki Meja di Pasir */}
            <ellipse cx="230" cy="1180" rx="30" ry="12" fill="#451A03" opacity="0.5" />
            <ellipse cx="890" cy="1180" rx="30" ry="12" fill="#451A03" opacity="0.5" />
            <ellipse cx="140" cy="1260" rx="36" ry="14" fill="#451A03" opacity="0.6" />
            <ellipse cx="980" cy="1260" rx="36" ry="14" fill="#451A03" opacity="0.6" />

            {/* Tiang Belakang Kiri */}
            <rect x="218" y="740" width="24" height="440" rx="8" fill="url(#bambooFrame)" stroke="#451A03" strokeWidth="4" />
            <line x1="218" y1="860" x2="242" y2="860" stroke="#451A03" strokeWidth="3" />
            <line x1="218" y1="980" x2="242" y2="980" stroke="#451A03" strokeWidth="3" />

            {/* Tiang Belakang Kanan */}
            <rect x="878" y="740" width="24" height="440" rx="8" fill="url(#bambooFrame)" stroke="#451A03" strokeWidth="4" />
            <line x1="878" y1="860" x2="902" y2="860" stroke="#451A03" strokeWidth="3" />
            <line x1="878" y1="980" x2="902" y2="980" stroke="#451A03" strokeWidth="3" />

            {/* Tiang Depan Kiri (Lebih Dekat & Tebal) */}
            <rect x="126" y="1020" width="28" height="240" rx="10" fill="url(#bambooFrame)" stroke="#451A03" strokeWidth="4.5" />
            <line x1="126" y1="1130" x2="154" y2="1130" stroke="#451A03" strokeWidth="3.5" />

            {/* Tiang Depan Kanan */}
            <rect x="966" y="1020" width="28" height="240" rx="10" fill="url(#bambooFrame)" stroke="#451A03" strokeWidth="4.5" />
            <line x1="966" y1="1130" x2="994" y2="1130" stroke="#451A03" strokeWidth="3.5" />

            {/* Palang Horizontal Pengikat Antar Tiang Depan */}
            <rect x="140" y="1170" width="840" height="20" rx="8" fill="#92400E" stroke="#451A03" strokeWidth="4" />
            {/* Palang Silang Penguat (X-Brace) */}
            <line x1="150" y1="1240" x2="360" y2="1170" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />
            <line x1="760" y1="1170" x2="970" y2="1240" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />
          </g>

          {/* Permukaan Anyaman Bilah Bambu 2.5D (Luas & Padat) */}
          <g id="bamboo-table-surface" filter="url(#softShadow)">
            {/* Dasar Anyaman Bilah Bambu */}
            <polygon
              points="180,720 940,720 1020,1040 100,1040"
              fill="#B45309"
              stroke="#451A03"
              strokeWidth="5"
            />

            {/* Bilah Bambu Memanjang Sesuai Sudut Perspektif (23 Bilah) */}
            {Array.from({ length: 23 }).map((_, i) => {
              const backX = 190 + i * 34;
              const frontX = 110 + i * 41;
              return (
                <line
                  key={`bamboo-slat-${i}`}
                  x1={backX}
                  y1="722"
                  x2={frontX}
                  y2="1038"
                  stroke="url(#bambooSlatGrad)"
                  strokeWidth="8"
                  strokeLinecap="butt"
                />
              );
            })}

            {/* Ikatan Melintang Bambu (Horizontal Slat Braces) */}
            {[770, 825, 880, 935, 990].map((y, idx) => {
              const progress = (y - 720) / (1040 - 720);
              const xStart = 180 - progress * 80;
              const xEnd = 940 + progress * 80;
              return (
                <line
                  key={`slat-brace-${idx}`}
                  x1={xStart}
                  y1={y}
                  x2={xEnd}
                  y2={y}
                  stroke="#78350F"
                  strokeWidth="5.5"
                  opacity="0.85"
                />
              );
            })}

            {/* Bingkai Luar Meja Bambu Kokoh */}
            <polygon points="170,710 950,710 940,725 180,725" fill="#78350F" stroke="#451A03" strokeWidth="3" />
            <polygon points="170,710 180,725 100,1045 90,1030" fill="#92400E" stroke="#451A03" strokeWidth="3" />
            <polygon points="950,710 960,725 1030,1045 1020,1030" fill="#92400E" stroke="#451A03" strokeWidth="3" />
            {/* Bibir Muka Tebal 3D Depan */}
            <polygon
              points="90,1035 1030,1035 1030,1065 90,1065"
              fill="url(#bambooFrame)"
              stroke="#451A03"
              strokeWidth="5"
            />
            {/* Ruas Sambungan Bambu */}
            <line x1="320" y1="1035" x2="320" y2="1065" stroke="#451A03" strokeWidth="3.5" />
            <line x1="560" y1="1035" x2="560" y2="1065" stroke="#451A03" strokeWidth="3.5" />
            <line x1="800" y1="1035" x2="800" y2="1065" stroke="#451A03" strokeWidth="3.5" />
          </g>

          {/* Keranjang Anyaman Bambu (Besek Nelayan) di Bawah Meja Kanan (X: 860, Y: 1220) */}
          <g id="fish-basket-grounding" transform="translate(860, 1220)" filter="url(#softShadow)">
            <ellipse cx="45" cy="65" rx="60" ry="18" fill="#451A03" opacity="0.45" />
            <path d="M 0 20 Q 45 10 90 20 L 80 65 Q 45 74 10 65 Z" fill="#D97706" stroke="#451A03" strokeWidth="4" />
            <path d="M 15 25 L 75 62 M 75 25 L 15 62" stroke="#B45309" strokeWidth="3" opacity="0.8" />
            <ellipse cx="45" cy="20" rx="46" ry="14" fill="#F59E0B" stroke="#451A03" strokeWidth="3.5" />
            <ellipse cx="45" cy="18" rx="38" ry="9" fill="#F8FAFC" opacity="0.95" />
            <ellipse cx="45" cy="18" rx="22" ry="5" fill="#CBD5E1" />
          </g>

          {/* =========================================================================
              LAYER 3: DERETAN IKAN ASIN BELAH PUNGGUNG AUTENTIK (PADAT & REALISTIS)
              Bukan 3 biji sepi! Tersusun 7 ekor ikan asin khas Indonesia (peda/layang)
              dalam 2 baris berperspektif: tulang punggung, sirip ekor, tekstur garam.
             ========================================================================= */}
          <g id="salted-fishes-grid">
            {/* BARIS BELAKANG (Perspektif Lebih Jauh, Skala 0.85) */}
            {/* Ikan 1 (Kiri Belakang) */}
            <g transform="translate(230, 750) rotate(-6) scale(0.85)" filter="url(#softShadow)">
              <ellipse cx="110" cy="55" rx="95" ry="30" fill="#78350F" opacity="0.35" />
              <polygon points="25,48 0,16 12,48 0,80" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
              <path d="M 25 48 Q 60 14 125 16 Q 185 20 215 42 Q 225 48 215 54 Q 185 76 125 78 Q 60 82 25 48 Z" fill="url(#fishFleshGrad)" stroke="#1E293B" strokeWidth="4" />
              <path d="M 30 48 Q 115 44 210 48" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="205" cy="44" r="5.5" fill="#0F172A" />
              <circle cx="207" cy="42" r="2" fill="#FFFFFF" />
            </g>

            {/* Ikan 2 (Tengah Belakang) */}
            <g transform="translate(450, 755) rotate(4) scale(0.85)" filter="url(#softShadow)">
              <ellipse cx="110" cy="55" rx="95" ry="30" fill="#78350F" opacity="0.35" />
              <polygon points="25,48 0,16 12,48 0,80" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
              <path d="M 25 48 Q 60 14 125 16 Q 185 20 215 42 Q 225 48 215 54 Q 185 76 125 78 Q 60 82 25 48 Z" fill="url(#fishFleshGrad)" stroke="#1E293B" strokeWidth="4" />
              <path d="M 30 48 Q 115 44 210 48" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="205" cy="44" r="5.5" fill="#0F172A" />
              <circle cx="207" cy="42" r="2" fill="#FFFFFF" />
            </g>

            {/* Ikan 3 (Kanan Belakang) */}
            <g transform="translate(680, 760) rotate(-3) scale(0.88)" filter="url(#softShadow)">
              <ellipse cx="110" cy="55" rx="95" ry="30" fill="#78350F" opacity="0.35" />
              <polygon points="25,48 0,16 12,48 0,80" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
              <path d="M 25 48 Q 60 14 125 16 Q 185 20 215 42 Q 225 48 215 54 Q 185 76 125 78 Q 60 82 25 48 Z" fill="url(#fishFleshGrad)" stroke="#1E293B" strokeWidth="4" />
              <path d="M 30 48 Q 115 44 210 48" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="205" cy="44" r="5.5" fill="#0F172A" />
              <circle cx="207" cy="42" r="2" fill="#FFFFFF" />
            </g>

            {/* BARIS DEPAN (Ukuran Besar, Detail Lengkap, Target Utama Semprotan) */}
            {/* Ikan 4 (Kiri Depan) */}
            <g transform="translate(190, 880) rotate(-4) scale(1.05)" filter="url(#softShadow)">
              <ellipse cx="125" cy="62" rx="110" ry="35" fill="#78350F" opacity="0.38" />
              <polygon points="25,52 0,16 14,52 0,88" fill="#CBD5E1" stroke="#1E293B" strokeWidth="3.5" />
              <path d="M 25 52 Q 65 14 135 16 Q 205 20 235 46 Q 245 52 235 58 Q 205 84 135 88 Q 65 90 25 52 Z" fill="url(#fishFleshGrad)" stroke="#1E293B" strokeWidth="4.5" />
              <path d="M 30 52 Q 130 46 230 52" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 75 35 L 105 52 L 75 69" stroke="#94A3B8" strokeWidth="3" fill="none" />
              <path d="M 130 31 L 160 52 L 130 73" stroke="#94A3B8" strokeWidth="3" fill="none" />
              <path d="M 180 34 L 205 52 L 180 70" stroke="#94A3B8" strokeWidth="3" fill="none" />
              <circle cx="95" cy="40" r="3" fill="#FFFFFF" />
              <circle cx="145" cy="62" r="3" fill="#FFFFFF" />
              <circle cx="225" cy="48" r="6.5" fill="#0F172A" />
              <circle cx="227" cy="46" r="2.5" fill="#FFFFFF" />
            </g>

            {/* Ikan 5 (HERO FISH Utama Tengah — Sasaran Tembak Nozel Kaleng, Skala 1.22) */}
            <g transform="translate(430, 895) rotate(2) scale(1.22)" filter="url(#softShadow)">
              <ellipse cx="130" cy="66" rx="120" ry="38" fill="#78350F" opacity="0.4" />
              <polygon points="25,54 0,14 14,54 0,94" fill="#CBD5E1" stroke="#0F172A" strokeWidth="4" />
              <path d="M 25 54 Q 68 12 140 14 Q 215 18 248 48 Q 258 54 248 60 Q 215 90 140 94 Q 68 96 25 54 Z" fill="url(#fishFleshGrad)" stroke="#0F172A" strokeWidth="5" />
              <path d="M 30 54 Q 135 48 240 54" stroke="#334155" strokeWidth="5.5" fill="none" strokeLinecap="round" />
              <path d="M 80 34 L 112 54 L 80 74" stroke="#64748B" strokeWidth="3.5" fill="none" />
              <path d="M 135 30 L 168 54 L 135 78" stroke="#64748B" strokeWidth="3.5" fill="none" />
              <path d="M 190 33 L 218 54 L 190 75" stroke="#64748B" strokeWidth="3.5" fill="none" />
              {/* Taburan Kristal Garam Putih Autentik */}
              <circle cx="100" cy="38" r="3.5" fill="#FFFFFF" />
              <circle cx="120" cy="65" r="3" fill="#FFFFFF" />
              <circle cx="155" cy="42" r="3" fill="#FFFFFF" />
              <circle cx="185" cy="62" r="3.5" fill="#FFFFFF" />
              <circle cx="210" cy="40" r="2.5" fill="#FFFFFF" />
              <circle cx="238" cy="50" r="7.5" fill="#0F172A" />
              <circle cx="240" cy="48" r="2.5" fill="#FFFFFF" />
            </g>

            {/* Ikan 6 (Kanan Depan, Skala 1.05) */}
            <g transform="translate(730, 890) rotate(5) scale(1.05)" filter="url(#softShadow)">
              <ellipse cx="125" cy="62" rx="110" ry="35" fill="#78350F" opacity="0.38" />
              <polygon points="25,52 0,16 14,52 0,88" fill="#CBD5E1" stroke="#1E293B" strokeWidth="3.5" />
              <path d="M 25 52 Q 65 14 135 16 Q 205 20 235 46 Q 245 52 235 58 Q 205 84 135 88 Q 65 90 25 52 Z" fill="url(#fishFleshGrad)" stroke="#1E293B" strokeWidth="4.5" />
              <path d="M 30 52 Q 130 46 230 52" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" />
              <circle cx="225" cy="48" r="6.5" fill="#0F172A" />
              <circle cx="227" cy="46" r="2.5" fill="#FFFFFF" />
            </g>
          </g>
        </svg>

        {/* =========================================================================
            LAYER 2: MAIN CHARACTER OKNUM NAKAL MENYEMPROT IKAN (SSOT DESIGN SYSTEM)
            - Full-body MainCharacter (Sahabat / Oknum Nelayan)
            - Pose: spraying (memegang kaleng aerosol merah berlogo hazard tengkorak)
            - Pijakan kaki grounded kokoh di pasir pantai (Y = 1201)
            - Tanpa stickman primitif!
           ========================================================================= */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 740,
            zIndex: 10,
            transform: `translate(${sprayRecoilX}px, ${stealthBob + sprayRecoilY}px)`,
          }}
        >
          <MainCharacter
            pose="spraying"
            scale={1.34}
            breathe={false}
            hasGlasses={false}
            outfitType="tshirt"
            hairStyle="messy"
            customColors={{
              outfitMain: "#1E293B",
              outfitShade: "#0F172A",
              pants: "#334155",
              pantsDark: "#1E293B",
            }}
          />
        </div>

        {/* =========================================================================
            LAYER 3: FOREGROUND VFX (Semburan Jet Aerosol, Kabut Racun, Lalat, Badge)
            Berada di zIndex: 15 agar semburan kabut racun menutupi ikan & nozel kaleng.
           ========================================================================= */}
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 15,
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="aerosolJetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#86EFAC" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#4ADE80" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0.1" />
            </linearGradient>

            <radialGradient id="toxicCloudGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#BBF7D0" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#4ADE80" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#22C55E" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
            </radialGradient>

            <filter id="softShadowFg" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0F172A" floodOpacity="0.35" />
            </filter>
            <filter id="glowToxicFg" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="24" floodColor="#4ADE80" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* =========================================================================
              GELOMBANG AROMA AMIS DI UDARA (Frame 240 - 384)
             ========================================================================= */}
          {frame >= 240 && frame < 390 && (
            <g opacity={interpolate(frame, [240, 260, 360, 384], [0, 0.88, 0.88, 0])}>
              <path
                d={`M 360 870 Q ${375 + stinkWave} 770 350 670 T ${360 + stinkWave} 550`}
                fill="none"
                stroke="#64748B"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="10 12"
              />
              <path
                d={`M 560 860 Q ${540 - stinkWave} 750 570 640 T ${540 - stinkWave} 520`}
                fill="none"
                stroke="#94A3B8"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="8 10"
              />
              <path
                d={`M 760 870 Q ${780 + stinkWave} 770 750 660 T ${770 + stinkWave} 540`}
                fill="none"
                stroke="#64748B"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="10 12"
              />
            </g>
          )}

          {/* =========================================================================
              LALAT-LALAT KARTUN TERBANG MENDEKAT & TERPENTAL PUSING (Frame 240 - 540)
             ========================================================================= */}
          {frame >= 240 && (
            <g id="flies-cluster">
              {/* LALAT 1 (Menukik dari Kanan, Terpental saat Disemprot) */}
              {(() => {
                const flyX = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [620, 960])
                  : interpolate(flyApproachProgress, [0, 1], [880, 620]);
                const flyY = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [780, 520])
                  : interpolate(flyApproachProgress, [0, 1], [540, 780]) + Math.sin(frame / 4) * 16;
                const flyAngle = isRepelled ? (frame * 24) % 360 : Math.sin(frame / 6) * 20;
                const wingFlap = Math.sin(frame * 1.8) * 18;

                // Squash & stretch benturan kabut racun menggunakan getSquashAndStretch()
                const impactFrame1 = frame - 384;
                let deform1 = 0;
                if (impactFrame1 >= 0 && impactFrame1 <= 26) {
                  if (impactFrame1 < 3) {
                    // Fase 1: Gepeng terhantam semprotan (Squash)
                    deform1 = interpolate(impactFrame1, [0, 3], [0, 0.40], { extrapolateRight: "clamp" });
                  } else if (impactFrame1 < 8) {
                    // Fase 2: Meregang melesat terpental mundur (Stretch)
                    deform1 = interpolate(impactFrame1, [3, 8], [0.40, -0.32], { extrapolateRight: "clamp" });
                  } else {
                    // Fase 3: Pegas kenyal kembali normal (Settle)
                    const settle1 = spring({
                      frame: impactFrame1 - 8,
                      fps,
                      config: { damping: 10, stiffness: 140 },
                    });
                    deform1 = interpolate(settle1, [0, 1], [-0.32, 0]);
                  }
                }
                const flyScale1 = getSquashAndStretch(deform1);

                return (
                  <g
                    transform={`translate(${flyX}, ${flyY}) rotate(${flyAngle}) scale(${flyScale1.scaleX}, ${flyScale1.scaleY})`}
                    filter="url(#softShadowFg)"
                  >
                    <ellipse cx="-12" cy={-16 + wingFlap} rx="16" ry="9" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="2.5" />
                    <ellipse cx="12" cy={-16 - wingFlap} rx="16" ry="9" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="2.5" />
                    <ellipse cx="0" cy="0" rx="18" ry="13" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />
                    <circle cx="12" cy="-2" r="9" fill="#DC2626" stroke="#0F172A" strokeWidth="2.5" />
                    {isRepelled ? (
                      <>
                        <path
                          d="M 12 -2 m -4,0 a 4,4 0 1,0 8,0 a 7,7 0 1,0 -14,0"
                          fill="none"
                          stroke="#FEF08A"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        {/* Bintang Pusing Kartun Berputar Mengelilingi Lalat */}
                        <g transform={`rotate(${frame * 18})`} fill="#FACC15" stroke="#B45309" strokeWidth="1.5">
                          <polygon points="0,-26 3,-18 10,-18 5,-13 7,-5 0,-10 -7,-5 -5,-13 -10,-18 -3,-18" />
                          <polygon points="22,14 25,22 32,22 27,27 29,35 22,30 15,35 17,27 12,22 19,22" />
                          <polygon points="-22,14 -19,22 -12,22 -17,27 -15,35 -22,30 -29,35 -27,27 -32,22 -25,22" />
                        </g>
                      </>
                    ) : (
                      <circle cx="14" cy="-3" r="3.5" fill="#FEE2E2" />
                    )}
                  </g>
                );
              })()}

              {/* LALAT 2 (Menukik dari Kiri Tengah) */}
              {(() => {
                const flyX = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [420, 80])
                  : interpolate(flyApproachProgress, [0, 1], [240, 420]);
                const flyY = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [800, 580])
                  : interpolate(flyApproachProgress, [0, 1], [580, 800]) + Math.sin(frame / 5) * 14;
                const flyAngle = isRepelled ? -(frame * 22) % 360 : -Math.sin(frame / 6) * 18;
                const wingFlap = Math.cos(frame * 1.8) * 18;

                // Squash & stretch benturan kabut racun Lalat 2
                const impactFrame2 = frame - 386;
                let deform2 = 0;
                if (impactFrame2 >= 0 && impactFrame2 <= 26) {
                  if (impactFrame2 < 3) {
                    deform2 = interpolate(impactFrame2, [0, 3], [0, 0.36], { extrapolateRight: "clamp" });
                  } else if (impactFrame2 < 8) {
                    deform2 = interpolate(impactFrame2, [3, 8], [0.36, -0.28], { extrapolateRight: "clamp" });
                  } else {
                    const settle2 = spring({
                      frame: impactFrame2 - 8,
                      fps,
                      config: { damping: 10, stiffness: 140 },
                    });
                    deform2 = interpolate(settle2, [0, 1], [-0.28, 0]);
                  }
                }
                const flyScale2 = getSquashAndStretch(deform2);

                return (
                  <g
                    transform={`translate(${flyX}, ${flyY}) rotate(${flyAngle}) scale(${flyScale2.scaleX}, ${flyScale2.scaleY})`}
                    filter="url(#softShadowFg)"
                  >
                    <ellipse cx="-11" cy={-15 + wingFlap} rx="15" ry="8" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="2" />
                    <ellipse cx="11" cy={-15 - wingFlap} rx="15" ry="8" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="2" />
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
              LAYER 4: SEMBURAN JET AEROSOL & KABUT RACUN (DIARAHKAN KE IKAN ASIN!)
              Arah semburan: Miring 25° dari nozel kaleng di (347, 867) langsung ke
              permukaan meja dan ikan asin! Fisika realistis, terkoneksi presisi.
             ========================================================================= */}
          {/* Semburan 1A: Hook Semprot Ikan Asin (Frame 18 - 225) */}
          {sprayCloudOpacity > 0 && (
            <g
              transform={`translate(${sprayRecoilX}, ${stealthBob + sprayRecoilY})`}
              opacity={sprayCloudOpacity}
              filter="url(#glowToxicFg)"
            >
              {/* Kerucut Jet Tekanan Tinggi Langsung dari Lubang Nozel (307, 907) ke Meja */}
              <path
                d="M 305 902 Q 460 820 740 870 Q 550 990 310 914 Z"
                fill="url(#aerosolJetGrad)"
              />
              {/* Gumpalan Partikel Uap Racun Kimia Melapisi Permukaan Ikan */}
              <circle cx="470" cy="900" r={115 * sprayProgressA} fill="url(#toxicCloudGrad)" />
              <circle cx="610" cy="915" r={140 * sprayProgressA} fill="url(#toxicCloudGrad)" />
              <circle cx="740" cy="890" r={120 * sprayProgressA} fill="url(#toxicCloudGrad)" />
              {/* Butiran Tetesan Aerosol Racun Serangga Mengendap di Atas Ikan */}
              <circle cx="390" cy="890" r={8} fill="#BBF7D0" />
              <circle cx="500" cy="895" r={10} fill="#4ADE80" />
              <circle cx="620" cy="910" r={11} fill="#86EFAC" />
              <circle cx="690" cy="925" r={8} fill="#BBF7D0" />
              <circle cx="760" cy="890" r={7} fill="#4ADE80" />
            </g>
          )}

          {/* Semburan 1B: Mengusir Lalat saat Narasi Belatung (Frame 384 - 490) */}
          {repelSprayOpacity > 0 && (
            <g
              transform={`translate(${sprayRecoilX}, ${stealthBob + sprayRecoilY})`}
              opacity={repelSprayOpacity}
              filter="url(#glowToxicFg)"
            >
              <path
                d="M 305 902 Q 460 680 740 710 Q 550 890 310 914 Z"
                fill="url(#aerosolJetGrad)"
              />
              <circle cx="570" cy="720" r={165} fill="url(#toxicCloudGrad)" />
              <circle cx="430" cy="740" r={135} fill="url(#toxicCloudGrad)" />
              <circle cx="730" cy="700" r={140} fill="url(#toxicCloudGrad)" />
            </g>
          )}

          {/* =========================================================================
              KILAUAN BERSIH PALSU (Frame 180 - 240 saat narasi "awet dan bersih")
              Tampil di depan kabut racun untuk menciptakan visual ironi yang tajam!
             ========================================================================= */}
          {fakeCleanGleam > 0 && (
            <g opacity={fakeCleanGleam} filter="url(#softShadowFg)">
              {/* Bintang Berlian Emas 4-Titik di Ikan Tengah */}
              <g transform={`translate(680, 930) scale(${1.0 + Math.sin(frame / 4) * 0.2}) rotate(${frame * 3})`}>
                <path
                  d="M 0 -38 Q 0 0 38 0 Q 0 0 0 38 Q 0 0 -38 0 Q 0 0 0 -38 Z"
                  fill="#FEF08A"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                />
                <path d="M 0 -18 Q 0 0 18 0 Q 0 0 0 18 Q 0 0 -18 0 Q 0 0 0 -18 Z" fill="#FFFFFF" />
              </g>
              {/* Bintang Berlian Biru Neon di Ikan Kiri Depan */}
              <g transform={`translate(360, 920) scale(${0.8 + Math.cos(frame / 4) * 0.2}) rotate(${-frame * 3})`}>
                <path
                  d="M 0 -30 Q 0 0 30 0 Q 0 0 0 30 Q 0 0 -30 0 Q 0 0 0 -30 Z"
                  fill="#38BDF8"
                  stroke="#0284C7"
                  strokeWidth="3"
                />
                <path d="M 0 -14 Q 0 0 14 0 Q 0 0 0 14 Q 0 0 -14 0 Q 0 0 0 -14 Z" fill="#FFFFFF" />
              </g>
            </g>
          )}

          {/* =========================================================================
              BADGE POP-UP: SILANG LALAT & PERINGATAN BAHAYA RACUN (Frame 415 - 540)
              Posisikan di Kanan Atas (X: 800, Y: 490) - Mencolok, Bersih, Bebas Subtitle
             ========================================================================= */}
          {frame >= 415 && (
            <PopElement as="g" startFrame={415} sfxType="whip" volume={0.22}>
              <g transform="translate(800, 490)" filter="url(#softShadowFg)">
                <circle cx="0" cy="0" r="120" fill="#0F172A" stroke="#EF4444" strokeWidth="8" />
                <circle cx="0" cy="0" r="105" fill="#FEF2F2" />

                {/* Ikon Lalat Besar di Tengah Badge */}
                <g transform="translate(0, -12)">
                  <ellipse cx="-15" cy="5" rx="22" ry="15" fill="#334155" />
                  <circle cx="10" cy="2" r="11" fill="#DC2626" />
                  <ellipse cx="-22" cy="-15" rx="18" ry="9" fill="#BAE6FD" opacity="0.85" />
                  {/* Tanda Silang Merah Tebal Mengusir Lalat */}
                  <line x1="-50" y1="-50" x2="50" y2="50" stroke="#EF4444" strokeWidth="13" strokeLinecap="round" />
                  <line x1="50" y1="-50" x2="-50" y2="50" stroke="#EF4444" strokeWidth="13" strokeLinecap="round" />
                </g>

                {/* Ikon Tengkorak Peringatan Racun di Bagian Bawah Badge */}
                <g transform="translate(0, 56) scale(1.05)">
                  <circle cx="0" cy="-5" r="12" fill="#DC2626" />
                  <rect x="-7" y="4" width="14" height="8" rx="2" fill="#DC2626" />
                  <circle cx="-4" cy="-5" r="3" fill="#FFFFFF" />
                  <circle cx="4" cy="-5" r="3" fill="#FFFFFF" />
                </g>
              </g>
            </PopElement>
          )}
        </svg>

        {/* =========================================================================
            LAYER 5: PLAYFUL COMIC OVERLAYS & STICKERS (HTML/CSS)
           ========================================================================= */}
        {/* 1. Opening Comic Badge: "AWAS IKAN ASIN! ⚠️" (Frame 8 - 190) */}
        {frame >= 8 && frame < 190 && (
          <div
            style={{
              position: "absolute",
              top: 240,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 35,
              pointerEvents: "none",
            }}
          >
            <PopElement startFrame={8} tilt={-3} sfxType="none">
              <div
                style={{
                  backgroundColor: "#FACC15",
                  border: "5px solid #0F172A",
                  borderRadius: 22,
                  padding: "10px 32px",
                  boxShadow: "4px 8px 0px #0F172A",
                  fontSize: 32,
                  fontWeight: 900,
                  fontFamily: FONTS.title,
                  color: "#0F172A",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                AWAS IKAN ASIN! ⚠️
              </div>
            </PopElement>
          </div>
        )}

        {/* 2. Stiker Semprotan: "PSSSHHH! 💨" (Frame 22 - 140) */}
        {frame >= 22 && frame < 140 && (
          <div
            style={{
              position: "absolute",
              top: 790,
              left: 340,
              transform: `rotate(-12deg) scale(${1 + Math.sin(frame * 2) * 0.08})`,
              zIndex: 36,
              pointerEvents: "none",
            }}
          >
            <PopElement startFrame={22} tilt={-12} sfxType="none">
              <div
                style={{
                  backgroundColor: "#38BDF8",
                  border: "4px solid #0F172A",
                  borderRadius: 14,
                  padding: "6px 20px",
                  boxShadow: "3px 5px 0px #0F172A",
                  fontSize: 22,
                  fontWeight: 900,
                  fontFamily: FONTS.title,
                  color: "#FFFFFF",
                  letterSpacing: "0.8px",
                  whiteSpace: "nowrap",
                }}
              >
                PSSSHHH! 💨
              </div>
            </PopElement>
          </div>
        )}

        {/* 3. Reaksi Pusing Lalat: "K.O.! 💫" (Frame 388 - 510) */}
        {frame >= 388 && frame < 510 && (
          <div
            style={{
              position: "absolute",
              top: 540,
              right: 120,
              transform: `rotate(12deg) scale(${1 + Math.sin(frame * 0.4) * 0.08})`,
              zIndex: 36,
              pointerEvents: "none",
            }}
          >
            <PopElement startFrame={388} tilt={10} sfxType="none">
              <div
                style={{
                  backgroundColor: "#EF4444",
                  border: "4px solid #FFFFFF",
                  borderRadius: 16,
                  padding: "6px 20px",
                  boxShadow: "4px 6px 0px #0F172A",
                  fontSize: 24,
                  fontWeight: 900,
                  fontFamily: FONTS.title,
                  color: "#FFFFFF",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                K.O.! 💫
              </div>
            </PopElement>
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};