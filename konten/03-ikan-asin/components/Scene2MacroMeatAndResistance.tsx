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

export const Scene2MacroMeatAndResistance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = EP03_THEME.colors;

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
  const cameraScale = interpolate(macroZoom, [0, 1], [0.75, 1.0]);

  // ---------------------------------------------------------------------------
  // CONTINUOUS SECONDARY MOTION (Serat Daging & Partikel Mengambang)
  // ---------------------------------------------------------------------------
  const fiberPulse = 1 + Math.sin(frame / 16) * 0.02;
  const moleculeFloat = Math.sin(frame / 12) * 8;
  const moleculeRotate = (frame * 0.8) % 360;

  // ---------------------------------------------------------------------------
  // TAHAP 1: MOLEKUL RACUN MENYUSUP & MENCENGKERAM SERAT (Frame 63 - 200 lokal)
  // (Frame 63 lokal = Frame 603 global saat narasi bicara racun saraf)
  // ---------------------------------------------------------------------------
  const poisonSpreadProgress = interpolate(frame, [63, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // TAHAP 2: UJI GUYURAN AIR CUCI BIRU (Frame 220 - 275 lokal | Frame 760 global)
  // ---------------------------------------------------------------------------
  const isWaterWash = frame >= 220 && frame < 275;
  const waterFlowX = interpolate(frame, [220, 275], [-400, 1200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waterOpacity = isWaterWash
    ? interpolate(frame, [220, 230, 265, 275], [0, 0.85, 0.85, 0])
    : 0;

  // ---------------------------------------------------------------------------
  // TAHAP 3: UJI MINYAK GORENG PANAS MENDIDIH (Frame 275 - 345 lokal | Frame 815 global)
  // ---------------------------------------------------------------------------
  const isHotOil = frame >= 275;
  const oilTransition = interpolate(frame, [275, 295], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1E1B4B",
        overflow: "hidden",
      }}
    >
      <CameraRig
        scale={cameraScale}
        whooshAtFrames={[0]} // Transisi masuk dari Scene 1
      >
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Gradasi Serat Daging Ikan Salmon/Coral Hangat */}
            <radialGradient id="meatBgGrad" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="45%" stopColor="#F43F5E" />
              <stop offset="85%" stopColor="#BE123C" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>

            {/* Gradasi Minyak Goreng Panas Berbusa Keemasan */}
            <radialGradient id="hotOilGrad" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#D97706" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#92400E" stopOpacity="0.98" />
            </radialGradient>

            {/* Gradasi Molekul Racun Hijau Berduri */}
            <radialGradient id="toxicMoleculeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="45%" stopColor="#22C55E" />
              <stop offset="85%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#052E16" />
            </radialGradient>

            {/* Efek Pijar Racun Toksik */}
            <filter id="toxicCoreGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#4ADE80" floodOpacity="0.9" />
            </filter>
            <filter id="meatShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#4C0519" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* =========================================================================
              LAYER 1: BACKGROUND (SERAT DAGING ATAU MINYAK GORENG PANAS)
             ========================================================================= */}
          {/* Latar Dasar Serat Daging Ikan */}
          <rect x="0" y="0" width="1080" height="1920" fill="url(#meatBgGrad)" />

          {/* Pola Alur Serat Daging Ikan (Myotomes Segmented Flakes) */}
          <g
            id="meat-fibers"
            transform={`scale(${fiberPulse})`}
            transformOrigin="540 960"
            opacity="0.85"
          >
            {Array.from({ length: 14 }).map((_, i) => {
              const yBase = 220 + i * 110;
              const waveA = Math.sin((frame + i * 20) / 14) * 12;
              return (
                <g key={i}>
                  <path
                    d={`M-80 ${yBase} Q270 ${yBase - 35 + waveA} 540 ${yBase + waveA} T1160 ${yBase + waveA}`}
                    fill="none"
                    stroke="#FFE4E6"
                    strokeWidth={14 + (i % 3) * 4}
                    strokeLinecap="round"
                    opacity={0.35 + (i % 2) * 0.15}
                    filter="url(#meatShadow)"
                  />
                  {/* Garis lipid / lemak pengikat racun */}
                  <path
                    d={`M-40 ${yBase + 24} Q300 ${yBase - 15 + waveA} 600 ${yBase + 24 + waveA} T1120 ${yBase + 24 + waveA}`}
                    fill="none"
                    stroke="#FDA4AF"
                    strokeWidth="4"
                    strokeDasharray="16 12"
                    opacity="0.5"
                  />
                </g>
              );
            })}
          </g>

          {/* Penampang Irisan Daging Ikan Detail */}
          <g transform="translate(540, 960)" filter="url(#meatShadow)">
            <ellipse cx="0" cy="0" rx="460" ry="320" fill="#E11D48" stroke="#FFE4E6" strokeWidth="8" opacity="0.35" />
            <ellipse cx="0" cy="0" rx="380" ry="240" fill="#BE123C" stroke="#FFF1F2" strokeWidth="6" opacity="0.45" />
          </g>

          {/* Jika masuk tahap minyak panas (Frame 275+), latar bertransisi ke minyak mendidih di BELAKANG molekul */}
          {isHotOil && (
            <g opacity={oilTransition}>
              <rect x="0" y="0" width="1080" height="1920" fill="url(#hotOilGrad)" />
              {/* Gelembung Minyak Panas Bergolak Naik ke Atas */}
              {Array.from({ length: 22 }).map((_, i) => {
                const bubbleY = ((frame * 7 + i * 90) % 1920);
                const bubbleX = 60 + ((i * 150) % 960);
                const bubbleR = 12 + (i % 4) * 9;
                return (
                  <g key={i} transform={`translate(${bubbleX}, ${1920 - bubbleY})`}>
                    <circle cx="0" cy="0" r={bubbleR} fill="#FEF08A" opacity="0.65" stroke="#F59E0B" strokeWidth="2.5" />
                    <circle cx={-bubbleR * 0.3} cy={-bubbleR * 0.3} r={bubbleR * 0.25} fill="#FFFFFF" opacity="0.9" />
                  </g>
                );
              })}
            </g>
          )}

          {/* =========================================================================
              LAYER 2: ALIRAN AIR CUCI BIRU (Frame 220 - 275 lokal)
             ========================================================================= */}
          {waterOpacity > 0 && (
            <g opacity={waterOpacity}>
              <path
                d={`M${waterFlowX} 200 Q${waterFlowX + 300} 700 ${waterFlowX - 200} 1200 T${waterFlowX + 200} 1800 L${waterFlowX - 400} 1800 Z`}
                fill="#38BDF8"
                opacity="0.55"
              />
              <path
                d={`M${waterFlowX + 100} 100 Q${waterFlowX + 450} 800 ${waterFlowX} 1400 T${waterFlowX + 350} 1900 L${waterFlowX - 200} 1900 Z`}
                fill="#E0F2FE"
                opacity="0.45"
              />
              {Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={i}
                  cx={waterFlowX + 150 + (i * 70)}
                  cy={600 + (i * 120)}
                  r={12 + (i % 3) * 6}
                  fill="#FFFFFF"
                  opacity="0.8"
                />
              ))}
            </g>
          )}

          {/* =========================================================================
              LAYER 3: FOREGROUND — MOLEKUL RACUN SARAF BERDURI (SELALU TAJAM & MENYALA)
             ========================================================================= */}
          {frame >= 63 && (
            <PopElement as="g" startFrame={63} sfxType="whip" volume={0.22}>
              <g id="toxic-molecules-network">
                {/* -------------------------------------------------------------------
                    MOLEKUL RACUN UTAMA 1 (TENGAH BESAR — FOKUS UTAMA)
                   ------------------------------------------------------------------- */}
                <g
                  transform={`translate(540, ${920 + moleculeFloat})`}
                  filter="url(#toxicCoreGlow)"
                >
                  {/* Aura Bahaya Denyut Merah/Hijau */}
                  <circle
                    cx="0"
                    cy="0"
                    r={95 + Math.sin(frame / 6) * 8}
                    fill={isHotOil ? "#EF4444" : "#22C55E"}
                    opacity={isHotOil ? 0.45 : 0.25}
                  />

                  {/* Duri-duri Cakar Pengikat Serat Daging (Lipophilic Spikes) */}
                  <g transform={`rotate(${moleculeRotate})`}>
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                      <polygon
                        key={ang}
                        points="0,-65 -16,-98 0,-115 16,-98"
                        fill="#15803D"
                        stroke="#12233F"
                        strokeWidth="3.5"
                        transform={`rotate(${ang})`}
                      />
                    ))}
                  </g>

                  {/* Inti Bola Molekul Racun */}
                  <circle
                    cx="0"
                    cy="0"
                    r="68"
                    fill="url(#toxicMoleculeGrad)"
                    stroke="#12233F"
                    strokeWidth="5"
                  />

                  {/* Simbol Kilat / Bahaya Neurotoksin (Tanpa Teks — Sesuai Rule 11) */}
                  <polygon
                    points="6,-38 -24,4 -2,4 -10,38 24,-4 2,-4"
                    fill="#FEF08A"
                    stroke="#12233F"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  {/* Cengkeraman Serat: Kaki Pengikat Menyatu ke Daging */}
                  <path
                    d="M-55 45 Q-110 90 -160 130"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M55 45 Q110 90 160 130"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </g>

                {/* -------------------------------------------------------------------
                    MOLEKUL RACUN 2 (KIRI ATAS)
                   ------------------------------------------------------------------- */}
                <g
                  transform={`translate(280, ${660 - moleculeFloat * 0.8}) scale(0.68)`}
                  filter="url(#toxicCoreGlow)"
                >
                  <g transform={`rotate(${-moleculeRotate * 1.2})`}>
                    {[0, 60, 120, 180, 240, 300].map((ang) => (
                      <polygon
                        key={ang}
                        points="0,-55 -14,-85 0,-100 14,-85"
                        fill="#15803D"
                        stroke="#12233F"
                        strokeWidth="3"
                        transform={`rotate(${ang})`}
                      />
                    ))}
                  </g>
                  <circle cx="0" cy="0" r="58" fill="url(#toxicMoleculeGrad)" stroke="#12233F" strokeWidth="4.5" />
                  <polygon points="5,-30 -18,3 -2,3 -8,30 18,-3 2,-3" fill="#FEF08A" stroke="#12233F" strokeWidth="2.5" />
                </g>

                {/* -------------------------------------------------------------------
                    MOLEKUL RACUN 3 (KANAN BAWAH)
                   ------------------------------------------------------------------- */}
                <g
                  transform={`translate(800, ${1180 + moleculeFloat * 0.7}) scale(0.62)`}
                  filter="url(#toxicCoreGlow)"
                >
                  <g transform={`rotate(${moleculeRotate * 1.1})`}>
                    {[0, 60, 120, 180, 240, 300].map((ang) => (
                      <polygon
                        key={ang}
                        points="0,-55 -14,-85 0,-100 14,-85"
                        fill="#15803D"
                        stroke="#12233F"
                        strokeWidth="3"
                        transform={`rotate(${ang})`}
                      />
                    ))}
                  </g>
                  <circle cx="0" cy="0" r="58" fill="url(#toxicMoleculeGrad)" stroke="#12233F" strokeWidth="4.5" />
                  <polygon points="5,-30 -18,3 -2,3 -8,30 18,-3 2,-3" fill="#FEF08A" stroke="#12233F" strokeWidth="2.5" />
                </g>
              </g>
            </PopElement>
          )}

          {/* =========================================================================
              LAYER 4: BADGE INDIKATOR STATUS PERINGATAN (Uji Air & Uji Minyak)
             ========================================================================= */}
          {/* Status Uji Cuci Air (Frame 220 - 275) */}
          {waterOpacity > 0 && (
            <g transform="translate(540, 520)" filter="url(#meatShadow)">
              <circle cx="0" cy="0" r="56" fill="#EF4444" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="-26" y1="-26" x2="26" y2="26" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
              <line x1="26" y1="-26" x2="-26" y2="26" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
            </g>
          )}

          {/* Status Uji Minyak Panas Mendidih (Frame 285+) */}
          {isHotOil && (
            <PopElement as="g" startFrame={285} sfxType="whip" volume={0.22}>
              <g transform="translate(540, 520)" filter="url(#meatShadow)">
                <circle cx="0" cy="0" r="62" fill="#DC2626" stroke="#FEF08A" strokeWidth="6" />
                <line x1="-28" y1="-28" x2="28" y2="28" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                <line x1="28" y1="-28" x2="-28" y2="28" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
              </g>
            </PopElement>
          )}
        </svg>
      </CameraRig>
    </AbsoluteFill>
  );
};
