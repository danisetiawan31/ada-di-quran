import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraRig } from "../../../src/components/CameraRig";
import { FONTS } from "../../../src/theme/fonts";

// Sound Effects dari library public/sfx/
import sfxPop1 from "../../../public/sfx/pop.wav";
import sfxPop2 from "../../../public/sfx/btn_pop.wav";
import sfxDiveWhoosh from "../../../public/sfx/whoosh.wav";
import sfxWaterSlide from "../../../public/sfx/slide_down.mp3";
import sfxWaterPlunge from "../../../public/sfx/drop.wav";
import sfxChimeHalocline from "../../../public/sfx/chime.mp3";
import sfxMetricDing from "../../../public/sfx/ding.wav";

export const Scene2UnderwaterDive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // 1. TRANSISI PENYELAMAN VERTIKAL (THE DIVE TRANSITION)
  // =========================================================================
  // - Frame 0 - 150: Pemandangan langit senja, atlas 2 lokasi Gibraltar & Alaska
  // - Frame 150 - 230: Menyelam tembus permukaan air laut (0 ke -1920)
  // - Frame 230 - 441: Di kedalaman Halocline
  const diveY = interpolate(frame, [150, 230], [0, -1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Kamera dinamika: sedikit zoom in saat menyelam
  const cameraZoom = interpolate(frame, [0, 150, 230, 441], [1.0, 1.04, 1.12, 1.1], {
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 2. KARTU DESTINASI ATLAS (Gibraltar & Alaska Spring Pop-in)
  // =========================================================================
  const pin1Spring = spring({ frame: frame - 18, fps, config: { damping: 11, stiffness: 130 } });
  const pin2Spring = spring({ frame: frame - 48, fps, config: { damping: 11, stiffness: 130 } });

  // Animasi lompatan pin lokasi (squash & stretch bounce)
  const pin1BounceY = Math.sin((frame - 18) * 0.18) * 8;
  const pin2BounceY = Math.sin((frame - 48) * 0.18) * 8;

  // Radar pulsa
  const radarPulse = (frame * 2.8) % 90;

  // =========================================================================
  // 3. EFEK CIPRATAN AIR & GELEMBUNG PENYELAMAN (Frame 150 - 240)
  // =========================================================================
  const isDiving = frame >= 148 && frame <= 245;
  const diveProgress = interpolate(frame, [150, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Angka meteran kedalaman (Depth Meter HUD: 0m -> 320m)
  const depthValue = Math.floor(interpolate(frame, [155, 235], [0, 320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  // Gelembung udara yang melesat naik saat kamera menyelam
  const diveBubbles = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => {
      const baseX = 80 + ((i * 73) % 920);
      const speed = 12 + (i % 6) * 5;
      const size = 6 + (i % 5) * 5;
      return { id: i, baseX, speed, size };
    });
  }, []);

  // =========================================================================
  // 4. KEDALAMAN LAUT: HALOCLINE, SALINITAS & SUHU (Frame 230 - 441)
  // =========================================================================
  // Garis gelombang pemisah Halocline di kedalaman (fluida berayun lembut)
  const haloclineWavePath = useMemo(() => {
    const points: string[] = [];
    const height = 1920;
    const steps = 16;
    for (let i = 0; i <= steps; i++) {
      const y = (height / steps) * i;
      const waveOffset =
        Math.sin(frame * 0.04 + i * 0.45) * 24 +
        Math.cos(frame * 0.02 + i * 0.25) * 14;
      const x = 540 + waveOffset;
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(" ");
  }, [frame]);

  // Kristal Garam Kubus 3D di sisi kiri (Dingin & Padat)
  const saltCubes = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      const baseX = 60 + ((i * 59) % 410);
      const baseY = 120 + ((i * 79) % 1680);
      const size = 12 + (i % 4) * 6;
      return { id: i, baseX, baseY, size };
    });
  }, []);

  // Gelembung Hangat Berdenyut di sisi kanan (Segar & Ringan)
  const warmBubbles = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => {
      const baseX = 600 + ((i * 67) % 410);
      const baseY = 120 + ((i * 89) % 1680);
      const size = 14 + (i % 5) * 8;
      return { id: i, baseX, baseY, size };
    });
  }, []);

  // Fade-in HUD Halocline
  const hudOpacity = interpolate(frame, [225, 255], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hudSpring = spring({
    frame: frame - 230,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  return (
    <CameraRig zoom={cameraZoom}>
      <AbsoluteFill style={{ backgroundColor: "#020714", overflow: "hidden" }}>
        {/* ===================================================================
            AUDIO SFX SEQUENCES
           =================================================================== */}
        {/* 1. Pop Pin Gibraltar (Frame 18) */}
        <Sequence from={18} durationInFrames={30}>
          <Audio src={sfxPop1} volume={0.28} />
        </Sequence>

        {/* 2. Pop Pin Alaska (Frame 48) */}
        <Sequence from={48} durationInFrames={30}>
          <Audio src={sfxPop2} volume={0.28} />
        </Sequence>

        {/* 3. Menyelam Masuk Air (Frame 152) */}
        <Sequence from={152} durationInFrames={45}>
          <Audio src={sfxDiveWhoosh} volume={0.32} />
        </Sequence>

        {/* 4. Pusaran Air Menyelam (Frame 168) */}
        <Sequence from={168} durationInFrames={40}>
          <Audio src={sfxWaterSlide} volume={0.25} />
          <Audio src={sfxWaterPlunge} volume={0.3} />
        </Sequence>

        {/* 5. Chime Kemunculan Badge Halocline (Frame 232) */}
        <Sequence from={232} durationInFrames={50}>
          <Audio src={sfxChimeHalocline} volume={0.35} />
        </Sequence>

        {/* 6. Metric Ding untuk Perbandingan Salinitas (Frame 265) */}
        <Sequence from={265} durationInFrames={35}>
          <Audio src={sfxMetricDing} volume={0.22} />
        </Sequence>

        {/* ===================================================================
            CONTAINER DUNIA 2D YANG MELUNCUR VERTIKAL (-1920px saat menyelam)
           =================================================================== */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 3840,
            transform: `translateY(${diveY}px)`,
          }}
        >
          {/* ===================================================================
              BAGIAN ATAS (Y: 0 - 1920): CAKRAWALA SENJA, BULAN & 2 KARTU LOKASI
             =================================================================== */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 1920 }}>
            <svg viewBox="0 0 1080 1920" style={{ width: "100%", height: "100%" }}>
              <defs>
                <linearGradient id="skyTwilightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#020617" />
                  <stop offset="35%" stopColor="#0B1536" />
                  <stop offset="70%" stopColor="#1E2958" />
                  <stop offset="100%" stopColor="#312E81" />
                </linearGradient>

                <linearGradient id="seaSurfaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0B2A66" />
                  <stop offset="40%" stopColor="#061A42" />
                  <stop offset="100%" stopColor="#020C22" />
                </linearGradient>

                <linearGradient id="moonGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>

              {/* 1. Langit Senja Magis */}
              <rect width="1080" height="1380" fill="url(#skyTwilightGrad)" />

              {/* 2. Garis Grid Peta Astronomis & Garis Lintang Estetik */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <line
                  key={`lat-line-${idx}`}
                  x1="0"
                  y1={220 + idx * 240}
                  x2="1080"
                  y2={220 + idx * 240}
                  stroke="rgba(147, 197, 253, 0.12)"
                  strokeWidth="1.5"
                  strokeDasharray="16 24"
                />
              ))}

              {/* 3. Bintang Malam Berkelip */}
              {Array.from({ length: 55 }).map((_, idx) => {
                const sx = (idx * 163) % 1080;
                const sy = (idx * 89) % 950;
                const pulse = 0.3 + Math.abs(Math.sin(frame * 0.05 + idx)) * 0.55;
                return <circle key={`star-s2-${idx}`} cx={sx} cy={sy} r="2" fill="#FFFFFF" opacity={pulse} />;
              })}

              {/* 4. Bulan Sabit Emas Kartun di Langit (Menghilangkan Dead Space) */}
              <g transform="translate(540, 260)">
                <circle cx="0" cy="0" r="42" fill="url(#moonGlowGrad)" opacity="0.95" />
                <circle cx="16" cy="-10" r="36" fill="#0E1A40" />
                {/* Kilau Halo Bulan */}
                <circle cx="0" cy="0" r="64" fill="none" stroke="rgba(253, 230, 138, 0.25)" strokeWidth="3" />
              </g>

              {/* 5. Awan Kartun Tipis Melayang */}
              {Array.from({ length: 3 }).map((_, idx) => {
                const cloudX = ((idx * 380 + frame * 0.6) % 1300) - 200;
                const cloudY = 380 + idx * 160;
                return (
                  <path
                    key={`cloud-${idx}`}
                    d={`M ${cloudX} ${cloudY} Q ${cloudX + 50} ${cloudY - 30} ${cloudX + 110} ${cloudY} Q ${cloudX + 160} ${cloudY - 40} ${cloudX + 220} ${cloudY} Q ${cloudX + 260} ${cloudY + 25} ${cloudX} ${cloudY + 25} Z`}
                    fill="rgba(255, 255, 255, 0.08)"
                  />
                );
              })}

              {/* 6. Siluet Daratan Selat Gibraltar (Kiri) */}
              <path
                d="M 0 1380 L 0 940 Q 140 760 300 980 T 540 1120 L 540 1380 Z"
                fill="#071022"
              />
              <path
                d="M 40 920 Q 180 810 320 1020"
                stroke="rgba(245, 158, 11, 0.3)"
                strokeWidth="2.5"
                fill="none"
              />

              {/* 7. Siluet Pegunungan Fjord Alaska Berpuncak Salju (Kanan) */}
              <path
                d="M 540 1380 L 540 1120 Q 720 860 900 940 L 1080 1060 L 1080 1380 Z"
                fill="#0A162D"
              />
              {/* Puncak Salju Alaska */}
              <polygon
                points="720,860 670,950 780,950"
                fill="rgba(224, 242, 254, 0.6)"
              />
              <polygon
                points="890,940 840,1020 950,1020"
                fill="rgba(224, 242, 254, 0.5)"
              />

              {/* 8. Permukaan Air Laut (Y: 1320 - 1920) */}
              <rect x="0" y="1320" width="1080" height="600" fill="url(#seaSurfaceGrad)" />

              {/* Riak Gelombang Permukaan Air */}
              <path
                d={`M 0 1320 Q 270 ${1320 + Math.sin(frame * 0.07) * 16} 540 1320 T 1080 1320 L 1080 1920 L 0 1920 Z`}
                fill="#0B2B6B"
                opacity="0.85"
              />
              <path
                d={`M 0 1335 Q 270 ${1335 + Math.cos(frame * 0.06) * 14} 540 1335 T 1080 1335`}
                stroke="rgba(94, 234, 212, 0.5)"
                strokeWidth="3.5"
                fill="none"
              />
            </svg>

            {/* ===============================================================
                KARTU DESTINASI ATLAS 1: SELAT GIBRALTAR (Kiri)
               =============================================================== */}
            <div
              style={{
                position: "absolute",
                left: 60,
                top: 860,
                transform: `scale(${pin1Spring})`,
                transformOrigin: "bottom center",
                zIndex: 25,
              }}
            >
              {/* Pin Map Kartun Emas Melompat 📍 */}
              <div
                style={{
                  position: "absolute",
                  top: -60 + pin1BounceY,
                  left: 45,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50% 50% 50% 0",
                    transform: "rotate(-45deg)",
                    backgroundColor: "#F59E0B",
                    border: "3px solid #FFFFFF",
                    boxShadow: "0 8px 20px rgba(245, 158, 11, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                </div>
                {/* Bayangan Pin di Bawah */}
                <div
                  style={{
                    width: 24,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    marginTop: 4,
                  }}
                />
              </div>

              {/* Kartu Informasi Gibraltar */}
              <div
                style={{
                  backgroundColor: "rgba(10, 19, 44, 0.95)",
                  backdropFilter: "blur(14px)",
                  padding: "24px 30px",
                  borderRadius: 28,
                  border: "2.5px solid #F59E0B",
                  boxShadow: "0 16px 45px rgba(0,0,0,0.7), 0 0 25px rgba(245, 158, 11, 0.35)",
                  width: 430,
                  fontFamily: FONTS.title,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 38 }}>🪨</span>
                  <div>
                    <span
                      style={{
                        color: "#FBBF24",
                        fontSize: 16,
                        fontWeight: 900,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        display: "block",
                      }}
                    >
                      Eropa ⇄ Afrika
                    </span>
                    <h4
                      style={{
                        color: "#FFFFFF",
                        fontSize: 32,
                        fontWeight: 900,
                        margin: "3px 0 0 0",
                        fontFamily: FONTS.title,
                        letterSpacing: "0.5px",
                      }}
                    >
                      Selat Gibraltar
                    </h4>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 12,
                    borderTop: "1.5px solid rgba(255, 255, 255, 0.18)",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: FONTS.body,
                  }}
                >
                  Mediterania Bertemu Atlantik
                </div>
              </div>
            </div>

            {/* ===============================================================
                KARTU DESTINASI ATLAS 2: TELUK ALASKA (Kanan)
               =============================================================== */}
            <div
              style={{
                position: "absolute",
                right: 60,
                top: 860,
                transform: `scale(${pin2Spring})`,
                transformOrigin: "bottom center",
                zIndex: 25,
              }}
            >
              {/* Pin Map Kartun Toska Melompat 📍 */}
              <div
                style={{
                  position: "absolute",
                  top: -60 + pin2BounceY,
                  right: 45,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50% 50% 50% 0",
                    transform: "rotate(-45deg)",
                    backgroundColor: "#14B8A6",
                    border: "3px solid #FFFFFF",
                    boxShadow: "0 8px 20px rgba(20, 184, 166, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 24,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    marginTop: 4,
                  }}
                />
              </div>

              {/* Kartu Informasi Alaska */}
              <div
                style={{
                  backgroundColor: "rgba(6, 38, 36, 0.95)",
                  backdropFilter: "blur(14px)",
                  padding: "24px 30px",
                  borderRadius: 28,
                  border: "2.5px solid #14B8A6",
                  boxShadow: "0 16px 45px rgba(0,0,0,0.7), 0 0 25px rgba(20, 184, 166, 0.35)",
                  width: 430,
                  textAlign: "right",
                  fontFamily: FONTS.title,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexDirection: "row-reverse" }}>
                  <span style={{ fontSize: 38 }}>🏔️</span>
                  <div>
                    <span
                      style={{
                        color: "#5EEAD4",
                        fontSize: 16,
                        fontWeight: 900,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        display: "block",
                      }}
                    >
                      Kutub Utara
                    </span>
                    <h4
                      style={{
                        color: "#FFFFFF",
                        fontSize: 32,
                        fontWeight: 900,
                        margin: "3px 0 0 0",
                        fontFamily: FONTS.title,
                        letterSpacing: "0.5px",
                      }}
                    >
                      Teluk Alaska
                    </h4>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 12,
                    borderTop: "1.5px solid rgba(255, 255, 255, 0.18)",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: FONTS.body,
                  }}
                >
                  Samudra Pasifik & Lelehan Es
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              BAGIAN BAWAH (Y: 1920 - 3840): UNDERWATER CROSS-SECTION & HALOCLINE
             =================================================================== */}
          <div style={{ position: "absolute", top: 1920, left: 0, width: 1080, height: 1920 }}>
            <svg viewBox="0 0 1080 1920" style={{ width: "100%", height: "100%" }}>
              <defs>
                {/* Gradasi Kedalaman Sisi Kiri (Dingin & Padat) */}
                <linearGradient id="deepSalineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#020816" />
                  <stop offset="60%" stopColor="#071E50" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>

                {/* Gradasi Kedalaman Sisi Kanan (Hangat & Segar) */}
                <linearGradient id="deepWarmTealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="45%" stopColor="#085A53" />
                  <stop offset="100%" stopColor="#02211F" />
                </linearGradient>

                {/* Glow Halocline Boundary */}
                <filter id="haloclineGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="14" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Latar Belakang Kiri (Biru Padat): Melingkupi seluruh kanvas 1080x1920 agar tidak ada celah hitam */}
              <rect x="0" y="0" width="1080" height="1920" fill="url(#deepSalineGrad)" />

              {/* 2. Latar Belakang Kanan (Toska Segar): Dipotong Kurva Halocline Dinamis */}
              <path
                d={`${haloclineWavePath} L 1080 1920 L 1080 0 Z`}
                fill="url(#deepWarmTealGrad)"
              />

              {/* HALOCLINE BOUNDARY (Garis Ombak Emas Fluida Berdenyut) */}
              <path
                d={haloclineWavePath}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="18"
                strokeLinecap="round"
                opacity="0.88"
                filter="url(#haloclineGlowFilter)"
              />
              <path
                d={haloclineWavePath}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.95"
              />

              {/* KRISTAL GARAM KUBUS 3D DI SISI KIRI (Salinitas Tinggi) */}
              {saltCubes.map((c) => {
                const cy = (c.baseY + frame * 0.45) % 1920;
                const cx = c.baseX + Math.sin(frame * 0.04 + c.id) * 10;
                const s = c.size;
                return (
                  <g key={`salt-cube-${c.id}`} transform={`translate(${cx}, ${cy})`}>
                    {/* Wajah Kubus Garam Isometrik */}
                    <polygon
                      points={`0,${-s} ${s},${-s / 2} 0,0 ${-s},${-s / 2}`}
                      fill="#BFDBFE"
                      opacity="0.8"
                    />
                    <polygon
                      points={`0,0 ${s},${-s / 2} ${s},${s / 2} 0,${s}`}
                      fill="#60A5FA"
                      opacity="0.65"
                    />
                    <polygon
                      points={`0,0 ${-s},${-s / 2} ${-s},${s / 2} 0,${s}`}
                      fill="#3B82F6"
                      opacity="0.75"
                    />
                    {/* Kilau Bintang Kristal */}
                    <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                  </g>
                );
              })}

              {/* PARTIKEL AIR HANGAT DI SISI KANAN (Rendah Garam) */}
              {warmBubbles.map((wb) => {
                const cy = (wb.baseY - frame * 0.4 + 19200) % 1920;
                const cx = wb.baseX + Math.cos(frame * 0.04 + wb.id) * 14;
                const pulse = 1 + Math.sin(frame * 0.08 + wb.id) * 0.2;
                return (
                  <g key={`warm-bubble-${wb.id}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={wb.size * pulse}
                      fill="rgba(249, 115, 22, 0.25)"
                      filter="url(#haloclineGlowFilter)"
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={wb.size * 0.5}
                      fill="none"
                      stroke="#5EEAD4"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                  </g>
                );
              })}
            </svg>

            {/* ===============================================================
                HUD SAINS KELAUTAN: HALOCLINE HERO BADGE (Frame 230 - 441)
               =============================================================== */}
            <div
              style={{
                position: "absolute",
                top: 280,
                left: "50%",
                transform: `translateX(-50%) scale(${hudSpring})`,
                opacity: hudOpacity,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 35,
                width: 980,
                pointerEvents: "none",
              }}
            >
              {/* Badge Utama Halocline */}
              <div
                style={{
                  backgroundColor: "rgba(10, 17, 40, 0.95)",
                  backdropFilter: "blur(16px)",
                  padding: "22px 54px",
                  borderRadius: 32,
                  border: "3px solid #F59E0B",
                  boxShadow: "0 16px 50px rgba(0,0,0,0.7), 0 0 35px rgba(245, 158, 11, 0.35)",
                  textAlign: "center",
                  fontFamily: FONTS.title,
                }}
              >
                <span
                  style={{
                    color: "#FBBF24",
                    fontSize: 16,
                    fontWeight: 900,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  SAINS KELAUTAN
                </span>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: 48,
                    fontWeight: 900,
                    margin: "4px 0 0 0",
                    fontFamily: FONTS.title,
                    letterSpacing: "3px",
                  }}
                >
                  HALOCLINE
                </h3>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.95)",
                    fontSize: 20,
                    fontWeight: 700,
                    margin: "8px 0 0 0",
                    fontFamily: FONTS.body,
                  }}
                >
                  Lapisan Pembatas Salinitas & Densitas Alami
                </p>
              </div>

              {/* Perbandingan Kartu Sains Kiri vs Kanan (Kurzgesagt Style) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: 36,
                }}
              >
                {/* KARTU KIRI: Laut Dingin & Salinitas Tinggi */}
                <div
                  style={{
                    backgroundColor: "rgba(6, 24, 60, 0.95)",
                    backdropFilter: "blur(16px)",
                    padding: "24px 28px",
                    borderRadius: 28,
                    border: "2.5px solid #3B82F6",
                    boxShadow: "0 16px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(59, 130, 246, 0.25)",
                    width: 440,
                    fontFamily: FONTS.title,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 40 }}>❄️</span>
                    <div>
                      <div
                        style={{
                          color: "#93C5FD",
                          fontSize: 15,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                        }}
                      >
                        Karakter Laut Kiri
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: 30,
                          fontWeight: 900,
                          marginTop: 2,
                          lineHeight: 1.1,
                        }}
                      >
                        Massa Air Padat
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div
                      style={{
                        backgroundColor: "rgba(59, 130, 246, 0.25)",
                        border: "1.5px solid rgba(96, 165, 250, 0.5)",
                        padding: "10px 16px",
                        borderRadius: 14,
                        color: "#E0F2FE",
                        fontSize: 19,
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span style={{ fontSize: 22 }}>🧂</span>
                      <span>Salinitas Tinggi (~3.8%)</span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(59, 130, 246, 0.25)",
                        border: "1.5px solid rgba(96, 165, 250, 0.5)",
                        padding: "10px 16px",
                        borderRadius: 14,
                        color: "#BFDBFE",
                        fontSize: 19,
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span style={{ fontSize: 22 }}>🌡️</span>
                      <span>Suhu Dingin (Tenggelam)</span>
                    </div>
                  </div>
                </div>

                {/* KARTU KANAN: Laut Hangat & Rendah Garam */}
                <div
                  style={{
                    backgroundColor: "rgba(4, 46, 43, 0.95)",
                    backdropFilter: "blur(16px)",
                    padding: "24px 28px",
                    borderRadius: 28,
                    border: "2.5px solid #14B8A6",
                    boxShadow: "0 16px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(20, 184, 166, 0.25)",
                    width: 440,
                    textAlign: "right",
                    fontFamily: FONTS.title,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14, flexDirection: "row-reverse" }}>
                    <span style={{ fontSize: 40 }}>💧</span>
                    <div>
                      <div
                        style={{
                          color: "#5EEAD4",
                          fontSize: 15,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                        }}
                      >
                        Karakter Laut Kanan
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: 30,
                          fontWeight: 900,
                          marginTop: 2,
                          lineHeight: 1.1,
                        }}
                      >
                        Massa Air Ringan
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div
                      style={{
                        backgroundColor: "rgba(20, 184, 166, 0.25)",
                        border: "1.5px solid rgba(45, 212, 191, 0.5)",
                        padding: "10px 16px",
                        borderRadius: 14,
                        color: "#CCFBF1",
                        fontSize: 19,
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 10,
                      }}
                    >
                      <span>Salinitas Rendah (~0.2%)</span>
                      <span style={{ fontSize: 22 }}>🧊</span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(20, 184, 166, 0.25)",
                        border: "1.5px solid rgba(45, 212, 191, 0.5)",
                        padding: "10px 16px",
                        borderRadius: 14,
                        color: "#FDE68A",
                        fontSize: 19,
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 10,
                      }}
                    >
                      <span>Suhu Lebih Hangat (Mengapung)</span>
                      <span style={{ fontSize: 22 }}>☀️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            HUD DEPTH METER (KEDALAMAN MENYELAM: 0m -> 320m)
           =================================================================== */}
        {frame >= 148 && (
          <div
            style={{
              position: "absolute",
              top: 140,
              right: 50,
              backgroundColor: "rgba(10, 17, 40, 0.92)",
              backdropFilter: "blur(14px)",
              padding: "14px 24px",
              borderRadius: 24,
              border: "2px solid rgba(56, 189, 248, 0.7)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 40,
              fontFamily: FONTS.title,
              opacity: interpolate(frame, [148, 160, 420, 440], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span style={{ fontSize: 26 }}>🧭</span>
            <div>
              <div
                style={{
                  color: "#38BDF8",
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Kedalaman Laut
              </div>
              <div style={{ color: "#FFFFFF", fontSize: 28, fontWeight: 900, fontFamily: FONTS.title }}>
                -{depthValue} m
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            GELEMBUNG UDARA PENYELAMAN YANG MELESAT NAIK (Saat Menyelam)
           =================================================================== */}
        {isDiving && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30 }}>
            {diveBubbles.map((b) => {
              const currentY = (b.baseX * 2 - (frame - 150) * b.speed * 4 + 3840) % 1920;
              return (
                <div
                  key={`dive-bub-${b.id}`}
                  style={{
                    position: "absolute",
                    left: b.baseX,
                    top: currentY,
                    width: b.size,
                    height: b.size,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.75)",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                  }}
                />
              );
            })}
          </div>
        )}

        {/* ===================================================================
            SUBTITLE CONTRAST VIGNETTE PROTECTOR
           =================================================================== */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 380,
            background:
              "linear-gradient(to top, rgba(2, 7, 20, 0.92) 0%, rgba(2, 7, 20, 0.55) 60%, rgba(2, 7, 20, 0) 100%)",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
      </AbsoluteFill>
    </CameraRig>
  );
};
