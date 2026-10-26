import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../../src/components/CameraRig";

export const Scene2UnderwaterDive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transisi Vertikal Menyelam:
  // - Frame 0 - 150: Pemandangan cakrawala senja, bintang, gunung & 2 pin (diveY = 0)
  // - Frame 150 - 230: Menyelam tembus permukaan air ke bawah laut (diveY meluncur dari 0 ke -1920)
  // - Frame 230 - 441: Pemandangan penuh underwater cross-section di kedalaman laut (diveY = -1920)
  const diveY = interpolate(frame, [150, 230], [0, -1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pin lokasi animasi muncul dengan spring
  const pin1Spring = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const pin2Spring = spring({ frame: frame - 55, fps, config: { damping: 12 } });

  // Partikel Kristal Garam di sisi kiri bawah air (padat, berkilau, dingin)
  const saltCrystals = useMemo(() => {
    return Array.from({ length: 48 }).map((_, i) => {
      const x = 50 + ((i * 47) % 440);
      const y = 100 + ((i * 73) % 1720);
      const size = 6 + (i % 5) * 3;
      return { id: i, x, y, size };
    });
  }, []);

  // Partikel Hangat Mengapung di sisi kanan bawah air (renggang, tenang)
  const warmParticles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const x = 590 + ((i * 79) % 430);
      const y = 100 + ((i * 97) % 1720);
      const size = 8 + (i % 4) * 4;
      return { id: i, x, y, size };
    });
  }, []);

  // Efek pulsa radar pin
  const radarPulse = (frame * 2.5) % 80;

  // Fade in HUD Halocline saat menyelam ke dalam air
  const hudOpacity = interpolate(frame, [220, 255], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CameraRig>
      <AbsoluteFill style={{ backgroundColor: "#030814", overflow: "hidden" }}>
        {/* CONTAINER DUNIA 2D YANG MELUNCUR KE ATAS SAAT MENYELAM */}
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
              SEKSI 1: PERMUKAAN & CAKRAWALA SENJA (Y: 0 - 1920)
             =================================================================== */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 1080, height: 1920 }}>
            <svg viewBox="0 0 1080 1920" style={{ width: "100%", height: "100%" }}>
              <defs>
                <linearGradient id="skyGradFull" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#020617" />
                  <stop offset="45%" stopColor="#0B132B" />
                  <stop offset="75%" stopColor="#1C2541" />
                  <stop offset="100%" stopColor="#243B55" />
                </linearGradient>

                <linearGradient id="surfaceSeaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0A2463" />
                  <stop offset="50%" stopColor="#051532" />
                  <stop offset="100%" stopColor="#020814" />
                </linearGradient>
              </defs>

              {/* Langit Senja / Malam */}
              <rect width="1080" height="1350" fill="url(#skyGradFull)" />

              {/* Bintang-bintang malam */}
              {Array.from({ length: 45 }).map((_, idx) => {
                const sx = (idx * 157) % 1080;
                const sy = (idx * 93) % 900;
                const op = 0.3 + ((idx % 5) * 0.15);
                return <circle key={`star-s2-${idx}`} cx={sx} cy={sy} r="1.8" fill="#FFFFFF" opacity={op} />;
              })}

              {/* Siluet Tebing Karang Selat Gibraltar (Kiri) */}
              <path
                d="M 0 1350 L 0 980 Q 140 820 280 1020 T 540 1140 L 540 1350 Z"
                fill="#060C18"
              />
              {/* Siluet Pegunungan Es Fjord Teluk Alaska (Kanan) */}
              <path
                d="M 540 1350 L 540 1140 Q 720 900 880 960 L 1080 1080 L 1080 1350 Z"
                fill="#0A1428"
              />

              {/* Garis Puncak Salju Pegunungan Alaska */}
              <path
                d="M 720 900 L 750 970 L 780 920 L 880 960 L 920 1010"
                stroke="rgba(224, 242, 254, 0.45)"
                strokeWidth="3"
                fill="none"
              />

              {/* Permukaan Air Laut */}
              <rect x="0" y="1300" width="1080" height="620" fill="url(#surfaceSeaGrad)" />

              {/* Garis Ombak Permukaan Air yang Dinamis */}
              <path
                d={`M 0 1300 Q 270 ${1300 + Math.sin(frame * 0.08) * 16} 540 1300 T 1080 1300 L 1080 1920 L 0 1920 Z`}
                fill="#0B234C"
                opacity="0.8"
              />
            </svg>

            {/* PIN 1: SELAT GIBRALTAR (Kiri) */}
            <div
              style={{
                position: "absolute",
                left: 220,
                top: 960,
                transform: `scale(${pin1Spring})`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Lingkaran Pulsa Radar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: radarPulse,
                  height: radarPulse,
                  borderRadius: "50%",
                  border: "2px solid #F59E0B",
                  opacity: 1 - radarPulse / 80,
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* Titik Pin Emas */}
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                  boxShadow: "0 0 24px #F59E0B",
                  border: "3px solid #FFFFFF",
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* Label Pin */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: -110,
                  width: 220,
                  textAlign: "center",
                  backgroundColor: "rgba(10, 17, 40, 0.9)",
                  backdropFilter: "blur(10px)",
                  padding: "10px 16px",
                  borderRadius: 18,
                  border: "1.5px solid rgba(245, 158, 11, 0.6)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                }}
              >
                <span style={{ color: "#FBBF24", fontSize: 13, fontWeight: 800, textTransform: "uppercase" }}>
                  MEDITERANIA & ATLANTIK
                </span>
                <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 900, marginTop: 2 }}>
                  Selat Gibraltar
                </div>
              </div>
            </div>

            {/* PIN 2: TELUK ALASKA (Kanan) */}
            <div
              style={{
                position: "absolute",
                left: 820,
                top: 940,
                transform: `scale(${pin2Spring})`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Lingkaran Pulsa Radar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: radarPulse,
                  height: radarPulse,
                  borderRadius: "50%",
                  border: "2px solid #14B8A6",
                  opacity: 1 - radarPulse / 80,
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* Titik Pin Toska */}
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: "#14B8A6",
                  boxShadow: "0 0 24px #14B8A6",
                  border: "3px solid #FFFFFF",
                  transform: "translate(-50%, -50%)",
                }}
              />
              {/* Label Pin */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: -110,
                  width: 220,
                  textAlign: "center",
                  backgroundColor: "rgba(10, 17, 40, 0.9)",
                  backdropFilter: "blur(10px)",
                  padding: "10px 16px",
                  borderRadius: 18,
                  border: "1.5px solid rgba(20, 184, 166, 0.6)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                }}
              >
                <span style={{ color: "#5EEAD4", fontSize: 13, fontWeight: 800, textTransform: "uppercase" }}>
                  PASIFIK & LELEHAN ES
                </span>
                <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 900, marginTop: 2 }}>
                  Teluk Alaska
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SEKSI 2: KEDALAMAN LAUT / UNDERWATER CROSS-SECTION (Y: 1920 - 3840)
             =================================================================== */}
          <div style={{ position: "absolute", top: 1920, left: 0, width: 1080, height: 1920 }}>
            <svg viewBox="0 0 1080 1920" style={{ width: "100%", height: "100%" }}>
              <defs>
                <linearGradient id="deepSalineGradFull" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#030A18" />
                  <stop offset="60%" stopColor="#071E4A" />
                  <stop offset="100%" stopColor="#0F3386" />
                </linearGradient>

                <linearGradient id="warmTealGradFull" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="40%" stopColor="#085E57" />
                  <stop offset="100%" stopColor="#02211F" />
                </linearGradient>

                <filter id="barrierGlowFull" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="16" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Sisi Kiri: Air Asin Padat & Dingin */}
              <rect x="0" y="0" width="540" height="1920" fill="url(#deepSalineGradFull)" />

              {/* Sisi Kanan: Air Rendah Garam & Hangat */}
              <rect x="540" y="0" width="540" height="1920" fill="url(#warmTealGradFull)" />

              {/* HALOCLINE BARRIER (Pilar Cahaya Vertikal di Tengah) */}
              <line
                x1="540"
                y1="0"
                x2="540"
                y2="1920"
                stroke="#F59E0B"
                strokeWidth="14"
                opacity="0.85"
                filter="url(#barrierGlowFull)"
              />
              <line
                x1="540"
                y1="0"
                x2="540"
                y2="1920"
                stroke="#FFFFFF"
                strokeWidth="4"
                opacity="0.95"
              />

              {/* Kristal Garam (Berlian / Salinitas) Sisi Kiri */}
              {saltCrystals.map((c) => {
                const driftY = ((c.y + frame * 0.4) % 1920);
                const driftX = c.x + Math.sin(frame * 0.05 + c.id) * 8;
                return (
                  <polygon
                    key={`salt-full-${c.id}`}
                    points={`${driftX},${driftY - c.size} ${driftX + c.size},${driftY} ${driftX},${driftY + c.size} ${driftX - c.size},${driftY}`}
                    fill="#93C5FD"
                    opacity={0.45 + Math.sin(frame * 0.08 + c.id) * 0.3}
                  />
                );
              })}

              {/* Pendar Cahaya Hangat Sisi Kanan */}
              {warmParticles.map((wp) => {
                const driftY = ((wp.y - frame * 0.3 + 19200) % 1920);
                const driftX = wp.x + Math.cos(frame * 0.04 + wp.id) * 12;
                return (
                  <circle
                    key={`warm-full-${wp.id}`}
                    cx={driftX}
                    cy={driftY}
                    r={wp.size}
                    fill="#F97316"
                    opacity={0.25 + Math.sin(frame * 0.06 + wp.id) * 0.15}
                    filter="url(#barrierGlowFull)"
                  />
                );
              })}
            </svg>

            {/* ===============================================================
                HUD SAINS KELAUTAN: HALOCLINE & PYCNOCLINE BADGE
               =============================================================== */}
            <div
              style={{
                position: "absolute",
                top: 260,
                left: "50%",
                transform: "translateX(-50%)",
                opacity: hudOpacity,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(10, 17, 40, 0.9)",
                  backdropFilter: "blur(14px)",
                  padding: "18px 40px",
                  borderRadius: 28,
                  border: "2px solid #F59E0B",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.7), 0 0 35px rgba(245, 158, 11, 0.3)",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    color: "#FBBF24",
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  SAINS OSEANOGRAFI
                </span>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontSize: 36,
                    fontWeight: 900,
                    margin: "6px 0 0 0",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  HALOCLINE
                </h3>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: 18,
                    margin: "6px 0 0 0",
                  }}
                >
                  Batas Salinitas & Kepadatan Alami
                </p>
              </div>

              {/* Perbandingan Metrik Kiri vs Kanan */}
              <div
                style={{
                  display: "flex",
                  gap: 200,
                  marginTop: 60,
                  width: 920,
                  justifyContent: "center",
                }}
              >
                {/* Box Kiri: Laut Dingin & Asin */}
                <div
                  style={{
                    backgroundColor: "rgba(4, 13, 33, 0.88)",
                    padding: "20px 28px",
                    borderRadius: 22,
                    border: "1.5px solid rgba(147, 197, 253, 0.4)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "#93C5FD", fontSize: 16, fontWeight: 700 }}>Salinitas Tinggi</div>
                  <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, marginTop: 4 }}>
                    Massa Air Padat
                  </div>
                  <div style={{ color: "#60A5FA", fontSize: 15, marginTop: 4 }}>Suhu Dingin</div>
                </div>

                {/* Box Kanan: Laut Hangat & Rendah Garam */}
                <div
                  style={{
                    backgroundColor: "rgba(4, 47, 44, 0.88)",
                    padding: "20px 28px",
                    borderRadius: 22,
                    border: "1.5px solid rgba(45, 212, 191, 0.4)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "#5EEAD4", fontSize: 16, fontWeight: 700 }}>Salinitas Rendah</div>
                  <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, marginTop: 4 }}>
                    Massa Air Ringan
                  </div>
                  <div style={{ color: "#F97316", fontSize: 15, marginTop: 4 }}>Suhu Hangat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </CameraRig>
  );
};
