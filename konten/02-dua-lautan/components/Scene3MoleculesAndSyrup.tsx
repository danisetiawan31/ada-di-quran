import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../../src/components/CameraRig";

export const Scene3MoleculesAndSyrup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transisi antara Molekul (0 - 105) ke Analogi Gelas Sirup (105 - 234)
  const isSyrupPhase = frame >= 95;
  const syrupPhaseOpacity = interpolate(frame, [95, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const moleculesOpacity = 1 - syrupPhaseOpacity;

  // =========================================================================
  // FASE 1: MOLEKUL AIR MEMANTUL DI GARIS PEMBATAS (Frame 0 - 105)
  // =========================================================================
  const moleculePairs = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const y = 300 + i * 160;
      return { id: i, y };
    });
  }, []);

  // Animasi elastis pantulan molekul
  const bounceCycle = Math.sin(frame * 0.12);
  const leftBounceX = 540 - 70 - Math.abs(bounceCycle) * 110;
  const rightBounceX = 540 + 70 + Math.abs(bounceCycle) * 110;

  // =========================================================================
  // FASE 2: ANALOGI GELAS SIRUP & AIR PUTIH (Frame 105 - 234)
  // =========================================================================
  const glassEntrance = spring({
    frame: frame - 100,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Level pengisian sirup dan air
  const syrupLevel = interpolate(frame, [110, 160], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waterLevel = interpolate(frame, [150, 200], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <CameraRig>
      <AbsoluteFill style={{ backgroundColor: "#070E1B", overflow: "hidden" }}>
        {/* ===================================================================
            FASE 1: MOLEKUL AIR (H₂O) BERTABRAKAN DAN MEMANTUL
           =================================================================== */}
        {moleculesOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: moleculesOpacity,
            }}
          >
            <svg viewBox="0 0 1080 1920" style={{ width: "100%", height: "100%" }}>
              <defs>
                <linearGradient id="molLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E40AF" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>

                <linearGradient id="molRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F766E" />
                  <stop offset="100%" stopColor="#2DD4BF" />
                </linearGradient>

                <filter id="barrierLineGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Garis Pembatas Vertikal Halocline */}
              <line
                x1="540"
                y1="100"
                x2="540"
                y2="1820"
                stroke="#F59E0B"
                strokeWidth="6"
                strokeDasharray="16 10"
                filter="url(#barrierLineGlow)"
              />

              {/* Gelombang Medan Energi Pantul */}
              <circle
                cx="540"
                cy="960"
                r={100 + Math.abs(bounceCycle) * 60}
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2"
                opacity={0.6 - Math.abs(bounceCycle) * 0.4}
              />

              {/* Molekul-Molekul Air Kiri & Kanan */}
              {moleculePairs.map((pair) => {
                const offsetY = Math.sin(frame * 0.08 + pair.id) * 20;
                const curY = pair.y + offsetY;

                return (
                  <g key={`pair-${pair.id}`}>
                    {/* Molekul Kiri (Biru Padat Asin) */}
                    <g transform={`translate(${leftBounceX}, ${curY})`}>
                      {/* Atom Oksigen */}
                      <circle cx="0" cy="0" r="32" fill="url(#molLeftGrad)" />
                      {/* Atom Hidrogen 1 & 2 */}
                      <circle cx="-24" cy="-22" r="14" fill="#93C5FD" />
                      <circle cx="24" cy="-22" r="14" fill="#93C5FD" />
                      <text
                        x="0"
                        y="8"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="14"
                        fontWeight="800"
                      >
                        H₂O
                      </text>
                    </g>

                    {/* Panah Indikator Pantulan Kiri */}
                    <path
                      d={`M ${leftBounceX + 45} ${curY} L ${leftBounceX + 65} ${curY}`}
                      stroke="#60A5FA"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Molekul Kanan (Toska Segar) */}
                    <g transform={`translate(${rightBounceX}, ${curY})`}>
                      {/* Atom Oksigen */}
                      <circle cx="0" cy="0" r="32" fill="url(#molRightGrad)" />
                      {/* Atom Hidrogen 1 & 2 */}
                      <circle cx="-24" cy="-22" r="14" fill="#99F6E4" />
                      <circle cx="24" cy="-22" r="14" fill="#99F6E4" />
                      <text
                        x="0"
                        y="8"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="14"
                        fontWeight="800"
                      >
                        H₂O
                      </text>
                    </g>

                    {/* Panah Indikator Pantulan Kanan */}
                    <path
                      d={`M ${rightBounceX - 45} ${curY} L ${rightBounceX - 65} ${curY}`}
                      stroke="#5EEAD4"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Badge Konsep Makro Molekuler */}
            <div
              style={{
                position: "absolute",
                top: 180,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(10, 17, 40, 0.85)",
                padding: "12px 30px",
                borderRadius: 20,
                border: "1px solid rgba(245, 158, 11, 0.5)",
                textAlign: "center",
              }}
            >
              <span style={{ color: "#FBBF24", fontSize: 18, fontWeight: 800 }}>
                Tegangan Permukaan & Gravitasi Partikel
              </span>
              <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 14, marginTop: 4 }}>
                Molekul Menolak Peleburan Seketika
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            FASE 2: ANALOGI WADAH / GELAS KACA SIRUP VS AIR PUTIH
           =================================================================== */}
        {isSyrupPhase && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: syrupPhaseOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Header Analogi */}
            <div
              style={{
                textAlign: "center",
                marginBottom: 40,
                transform: `scale(${glassEntrance})`,
              }}
            >
              <span
                style={{
                  color: "#F97316",
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                }}
              >
                Analogi Sederhana
              </span>
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: 38,
                  fontWeight: 900,
                  margin: "8px 0 0 0",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                Sirup Kental vs Air Putih
              </h2>
            </div>

            {/* Ilustrasi Gelas Silinder Laboratorium */}
            <div
              style={{
                width: 360,
                height: 640,
                position: "relative",
                border: "4px solid rgba(255, 255, 255, 0.4)",
                borderTop: "none",
                borderRadius: "0 0 40px 40px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(255,255,255,0.05)",
                overflow: "hidden",
                transform: `scale(${glassEntrance})`,
              }}
            >
              {/* Pantulan Kaca Vertikal (Highlight) */}
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  top: 20,
                  width: 14,
                  height: 580,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: 8,
                }}
              />

              {/* LAPISAN SIRUP KENTAL DI BAGIAN BAWAH */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: syrupLevel,
                  background: "linear-gradient(180deg, #EA580C 0%, #C2410C 100%)",
                  boxShadow: "0 -4px 16px rgba(234, 88, 12, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {syrupLevel > 100 && (
                  <div style={{ textAlign: "center", color: "#FFFFFF" }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>SIRUP KENTAL</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Massa Jenis / Densitas Tinggi</div>
                  </div>
                )}
              </div>

              {/* GARIS PEMBATAS MENISKUS EMAS */}
              {syrupLevel > 50 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: syrupLevel - 3,
                    left: 0,
                    width: "100%",
                    height: 6,
                    backgroundColor: "#FBBF24",
                    boxShadow: "0 0 14px #FBBF24",
                  }}
                />
              )}

              {/* LAPISAN AIR PUTIH DI BAGIAN ATAS */}
              <div
                style={{
                  position: "absolute",
                  bottom: syrupLevel,
                  left: 0,
                  width: "100%",
                  height: waterLevel,
                  background: "linear-gradient(180deg, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.55) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {waterLevel > 100 && (
                  <div style={{ textAlign: "center", color: "#FFFFFF" }}>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>AIR PUTIH</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Massa Jenis Rendah (Mengapung)</div>
                  </div>
                )}
              </div>
            </div>

            {/* Papan Keterangan Bawah Gelas */}
            <div
              style={{
                marginTop: 36,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                padding: "14px 28px",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.15)",
                textAlign: "center",
                transform: `scale(${glassEntrance})`,
              }}
            >
              <span style={{ color: "#FBBF24", fontWeight: 800, fontSize: 18 }}>
                Perbedaan Berat Jenis Mencegah Percampuran
              </span>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </CameraRig>
  );
};
