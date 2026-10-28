import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EP03_THEME } from "../theme";
import { PopElement } from "../../../src/components/PopElement";
import { CameraRig } from "../../../src/components/CameraRig";
import { MainCharacter } from "../../../src/components/characters/MainCharacter";

export const Scene3MedicalLiverKidney: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = EP03_THEME.colors;

  // ---------------------------------------------------------------------------
  // KAMERA & TRANSISI (Frame 885 - 1080 global | Frame 0 - 195 lokal)
  // ---------------------------------------------------------------------------
  const isXrayScan = frame >= 120;
  const cameraZoom = interpolate(frame, [115, 145], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [115, 145], [0, -25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // CONTINUOUS SECONDARY MOTION (Denyut Bahaya Organ & Pusing)
  // ---------------------------------------------------------------------------
  const organPulse = 1 + Math.sin(frame / 4.5) * 0.06;
  const toxicPulse = 1 + Math.sin(frame / 3) * 0.15;
  const dizzySpin = (frame * 10) % 360;
  const roomDimOpacity = interpolate(frame, [118, 135], [0, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.roomWarmCream,
        overflow: "hidden",
      }}
    >
      <CameraRig
        zoom={cameraZoom}
        panY={cameraPanY}
        whooshAtFrames={[0, 120]}
      >
        {/* =========================================================================
            LAYER 1: BACKGROUND RUANG MAKAN (DINDING, JENDELA, LANTAI)
           ========================================================================= */}
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="roomWallGrad5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="60%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>

            <linearGradient id="floorGrad5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
          </defs>

          {/* Dinding */}
          <rect x="0" y="0" width="1080" height="1240" fill="url(#roomWallGrad5)" />

          {/* Jendela Ruangan dengan Sinar Matahari */}
          <g transform="translate(100, 180)">
            <rect x="0" y="0" width="220" height="320" rx="14" fill="#FEF08A" opacity="0.65" stroke="#B45309" strokeWidth="8" />
            <line x1="110" y1="0" x2="110" y2="320" stroke="#B45309" strokeWidth="6" />
            <line x1="0" y1="160" x2="220" y2="160" stroke="#B45309" strokeWidth="6" />
            {/* Sorotan Sinar Matahari ke Meja & Lantai */}
            <polygon
              points="0,320 220,320 440,1050 0,1050"
              fill="#FEF9C3"
              opacity="0.35"
            />
          </g>

          {/* Lantai Ruangan Kayu */}
          <rect x="0" y="1240" width="1080" height="680" fill="url(#floorGrad5)" />
          <line x1="0" y1="1240" x2="1080" y2="1240" stroke="#78350F" strokeWidth="8" />
          <line x1="280" y1="1240" x2="180" y2="1920" stroke="#92400E" strokeWidth="4" opacity="0.45" />
          <line x1="580" y1="1240" x2="540" y2="1920" stroke="#92400E" strokeWidth="4" opacity="0.45" />
          <line x1="880" y1="1240" x2="920" y2="1920" stroke="#92400E" strokeWidth="4" opacity="0.45" />
        </svg>

        {/* =========================================================================
            LAYER 2: MASKOT BERBAJU KOKO MODERN (POSE PUSING)
           ========================================================================= */}
        <div
          style={{
            position: "absolute",
            top: 280,
            left: 340,
            width: 400,
            height: 400,
            zIndex: 10,
          }}
        >
          <MainCharacter pose="pusing" scale={1.85} />
        </div>

        {/* Efek Pusing Melayang di Atas Kepala Karakter */}
        {frame >= 35 && (
          <div
            style={{
              position: "absolute",
              top: 160,
              left: 420,
              width: 240,
              height: 120,
              zIndex: 12,
            }}
          >
            <PopElement startFrame={35} sfxType="whip" volume={0.2} style={{ width: 240, height: 120 }}>
              <svg width="240" height="120" viewBox="-120 -60 240 120" style={{ overflow: "visible" }}>
                {/* Spiral Pusing Berputar */}
                <g transform={`rotate(${dizzySpin})`}>
                  <path
                    d="M0 0 m-8,0 a8,8 0 1,0 16,0 a16,16 0 1,0 -32,0 a24,24 0 1,0 48,0"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </g>
                {/* Bintang Pusing Kecil Kiri & Kanan */}
                <polygon
                  points="0,-12 3.5,-3.5 12,-3.5 5,2.5 7,11 0,6 -7,11 -5,2.5 -12,-3.5 -3.5,-3.5"
                  fill="#FEF08A"
                  stroke="#D97706"
                  strokeWidth="2.5"
                  transform="translate(-65, -18) scale(1.2)"
                />
                <polygon
                  points="0,-12 3.5,-3.5 12,-3.5 5,2.5 7,11 0,6 -7,11 -5,2.5 -12,-3.5 -3.5,-3.5"
                  fill="#FEF08A"
                  stroke="#D97706"
                  strokeWidth="2.5"
                  transform="translate(65, -18) scale(1.2)"
                />
              </svg>
            </PopElement>
          </div>
        )}

        {/* =========================================================================
            LAYER 3: MEJA MAKAN KAYU & PIRING SISA TULANG IKAN
           ========================================================================= */}
        <div
          style={{
            position: "absolute",
            top: 920,
            left: 0,
            width: "100%",
            zIndex: 15,
          }}
        >
          <svg viewBox="0 0 1080 340" width="100%" height="340">
            <defs>
              <linearGradient id="tableGradFg5" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#92400E" />
                <stop offset="50%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
              <filter id="tableShadowFg5" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#0F172A" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Kaki Meja Makan Kayu */}
            <rect x="140" y="200" width="50" height="140" fill="#78350F" stroke="#451A03" strokeWidth="5" />
            <rect x="890" y="200" width="50" height="140" fill="#78350F" stroke="#451A03" strokeWidth="5" />

            {/* Permukaan Meja Kayu */}
            <g filter="url(#tableShadowFg5)">
              <rect
                x="80"
                y="10"
                width="920"
                height="200"
                rx="28"
                fill="url(#tableGradFg5)"
                stroke="#451A03"
                strokeWidth="7"
              />
            </g>

            {/* Piring Putih dengan Sisa Duri/Tulang Ikan Asin */}
            <g transform="translate(540, 85)">
              <ellipse cx="0" cy="0" rx="160" ry="52" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="4.5" />
              <ellipse cx="0" cy="0" rx="130" ry="38" fill="#E2E8F0" />
              {/* Tulang Belakang & Duri Ikan */}
              <path d="M-80 0 L80 0" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
              <line x1="-50" y1="-18" x2="-35" y2="18" stroke="#64748B" strokeWidth="4" />
              <line x1="-15" y1="-20" x2="0" y2="20" stroke="#64748B" strokeWidth="4" />
              <line x1="20" y1="-18" x2="35" y2="18" stroke="#64748B" strokeWidth="4" />
              <line x1="55" y1="-14" x2="65" y2="14" stroke="#64748B" strokeWidth="3.5" />
              {/* Kepala Duri Ikan */}
              <polygon points="80,-14 105,0 80,14" fill="#94A3B8" />
            </g>

            {/* Gelas Minum Air (Kanan) */}
            <g transform="translate(800, 45)">
              <rect x="0" y="0" width="54" height="88" rx="10" fill="#E0F2FE" opacity="0.85" stroke="#38BDF8" strokeWidth="4" />
              <rect x="5" y="30" width="44" height="52" rx="6" fill="#38BDF8" opacity="0.6" />
            </g>
          </svg>
        </div>

        {/* Dimming overlay saat X-Ray scanner aktif untuk kontras maksimal */}
        {frame >= 118 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1080,
              height: 1920,
              backgroundColor: "#0B132B",
              opacity: roomDimOpacity,
              zIndex: 20,
              pointerEvents: "none",
            }}
          />
        )}

        {/* =========================================================================
            LAYER 4: PEMINDAI ANATOMI MEDIS X-RAY (HATI & SEPASANG GINJAL)
            (Aktif Frame 120 lokal | Frame 1005 global)
            Posisikan di atas dada bawah & perut (top: 570) agar wajah & mata pusing tetap tampak!
           ========================================================================= */}
        {isXrayScan && (
          <div
            style={{
              position: "absolute",
              top: 570,
              left: 110,
              width: 860,
              height: 520,
              zIndex: 30,
            }}
          >
            <PopElement
              startFrame={120}
              sfxType="whip"
              volume={0.22}
              tilt={-1.5}
              style={{ width: "100%", height: "100%" }}
            >
              <svg viewBox="0 0 860 520" width="100%" height="100%" style={{ overflow: "visible" }}>
                <defs>
                  <linearGradient id="xrayCardGrad5" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0F172A" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#1E293B" stopOpacity="0.98" />
                    <stop offset="100%" stopColor="#0B132B" stopOpacity="0.99" />
                  </linearGradient>

                  <filter id="dangerGlow5" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#EF4444" floodOpacity="0.95" />
                  </filter>
                  <filter id="xrayShadow5" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="18" stdDeviation="30" floodColor="#0F172A" floodOpacity="0.65" />
                  </filter>
                </defs>

                {/* Kartu Pemindai Anatomi Translucent Modern */}
                <rect
                  x="10"
                  y="10"
                  width="840"
                  height="500"
                  rx="32"
                  fill="url(#xrayCardGrad5)"
                  stroke="#38BDF8"
                  strokeWidth="5"
                  filter="url(#xrayShadow5)"
                />

                {/* Grid Garis Pemindai Medis Sian */}
                <g stroke="#38BDF8" strokeWidth="1.5" opacity="0.2">
                  {[90, 180, 270, 360, 450].map((y) => (
                    <line key={y} x1="40" y1={y} x2="820" y2={y} />
                  ))}
                  {[160, 290, 430, 570, 710].map((x) => (
                    <line key={x} x1={x} y1="40" x2={x} y2={480} />
                  ))}
                </g>

                {/* Sudut-sudut Target Scanner (Kamera Medis) */}
                <g stroke="#38BDF8" strokeWidth="5" fill="none">
                  <path d="M40 70 L40 40 L70 40" />
                  <path d="M820 70 L820 40 L790 40" />
                  <path d="M40 450 L40 480 L70 480" />
                  <path d="M820 450 L820 480 L790 480" />
                </g>

                {/* Ikon Peringatan Medis di Puncak Kartu (Segitiga Bahaya) */}
                <g transform="translate(430, 48)">
                  <polygon points="0,-22 24,16 -24,16" fill="#EF4444" stroke="#FFFFFF" strokeWidth="3" />
                  <circle cx="0" cy="10" r="2.5" fill="#FFFFFF" />
                  <line x1="0" y1="-10" x2="0" y2="3" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                </g>

                {/* Garis Pembuluh Darah Anatomi Translucent (Aorta & Vena Cava) */}
                <g opacity="0.35">
                  <path d="M430 90 L430 430" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
                  <path d="M410 90 L410 430" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" />
                  {/* Cabang ke Hati */}
                  <path d="M410 190 Q360 190 320 190" stroke="#EF4444" strokeWidth="6" fill="none" />
                  {/* Cabang ke Ginjal */}
                  <path d="M410 360 L290 360" stroke="#EF4444" strokeWidth="5" fill="none" />
                  <path d="M430 360 L570 360" stroke="#EF4444" strokeWidth="5" fill="none" />
                </g>

                {/* -------------------------------------------------------------------
                    ORGAN 1: HATI (LIVER) — BERDENYUT MERAH BAHAYA DENGAN PARTIKEL RACUN
                   ------------------------------------------------------------------- */}
                <g transform="translate(420, 180)" filter="url(#dangerGlow5)">
                  {/* Bentuk Anatomi Organ Hati */}
                  <path
                    d="M-140 -35 Q-10 -80 170 -20 Q230 40 160 80 Q10 100 -130 55 Q-180 15 -140 -35 Z"
                    fill="#DC2626"
                    stroke="#EF4444"
                    strokeWidth="5"
                    transform={`scale(${organPulse})`}
                    transformOrigin="20 15"
                  />
                  {/* Bintik-bintik Racun Hijau Tertimbun di Jaringan Hati */}
                  <circle cx="20" cy="-10" r={9 * toxicPulse} fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
                  <circle cx="95" cy="15" r={11 * toxicPulse} fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
                  <circle cx="-50" cy="12" r={8 * toxicPulse} fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
                  <circle cx="145" cy="24" r={7 * toxicPulse} fill="#86EFAC" />
                  <circle cx="-100" cy="10" r={7 * toxicPulse} fill="#86EFAC" />
                </g>

                {/* -------------------------------------------------------------------
                    ORGAN 2 & 3: SEPASANG GINJAL (KIDNEYS) — BENTUK BIJI KACANG
                   ------------------------------------------------------------------- */}
                {/* Ginjal Kiri (Bawah Kiri) */}
                <g transform="translate(260, 360)" filter="url(#dangerGlow5)">
                  <path
                    d="M0 -42 C45 -42 55 -10 40 0 C55 10 45 42 0 42 C-40 42 -52 0 0 -42 Z"
                    fill="#B91C1C"
                    stroke="#EF4444"
                    strokeWidth="4.5"
                    transform={`scale(${organPulse})`}
                  />
                  <circle cx="10" cy="0" r={8 * toxicPulse} fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
                  <circle cx="-10" cy="14" r={6 * toxicPulse} fill="#86EFAC" />
                </g>

                {/* Ginjal Kanan (Bawah Kanan) */}
                <g transform="translate(600, 360)" filter="url(#dangerGlow5)">
                  <path
                    d="M0 -42 C-45 -42 -55 -10 -40 0 C-55 10 -45 42 0 42 C40 42 52 0 0 -42 Z"
                    fill="#B91C1C"
                    stroke="#EF4444"
                    strokeWidth="4.5"
                    transform={`scale(${organPulse})`}
                  />
                  <circle cx="-10" cy="0" r={8 * toxicPulse} fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
                  <circle cx="10" cy="14" r={6 * toxicPulse} fill="#86EFAC" />
                </g>
              </svg>
            </PopElement>
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
