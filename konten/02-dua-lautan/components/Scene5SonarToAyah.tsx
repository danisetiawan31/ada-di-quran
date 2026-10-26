import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../../src/components/CameraRig";

export const Scene5SonarToAyah: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transisi dari Sonar Modern (0 - 180) ke Cahaya Sakral Al-Qur'an (180 - 378)
  const isSacredPhase = frame >= 160;
  const sacredPhaseProgress = interpolate(frame, [160, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const modernSonarOpacity = 1 - sacredPhaseProgress;

  // Kamera: zoom out perlahan memberi kesan megah dan agung
  const cameraZoom = interpolate(frame, [0, 378], [1.05, 1.0], {
    extrapolateRight: "clamp",
  });

  // Gelombang Sonar Mengembang ke Bawah (Kerucut Sonar)
  const sonarPings = useMemo(() => {
    return [0, 1, 2].map((idx) => {
      const pingProgress = ((frame * 1.5 + idx * 40) % 120) / 120;
      const radius = pingProgress * 500;
      const opacity = (1 - pingProgress) * 0.7;
      return { id: idx, radius, opacity };
    });
  }, [frame]);

  // Partikel Cahaya Keemasan Sakral yang Mengalir ke Langit
  const goldenParticles = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      const baseX = 460 + ((i * 23) % 160);
      const speed = 1.8 + (i % 4) * 0.8;
      const currentY = 1920 - ((frame * speed + i * 55) % 1920);
      const size = 4 + (i % 5) * 3;
      const opacity = 0.4 + Math.sin(frame * 0.08 + i) * 0.4;
      return { id: i, x: baseX, y: currentY, size, opacity };
    });
  }, [frame]);

  // Badge Surah Ar-Rahman animasi spring
  const surahBadgeSpring = spring({
    frame: frame - 190,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Goyangan kapal di atas ombak
  const shipBobbingY = Math.sin(frame * 0.08) * 8;
  const shipRotation = Math.cos(frame * 0.06) * 1.5;

  return (
    <CameraRig zoom={cameraZoom}>
      <AbsoluteFill style={{ backgroundColor: "#030814", overflow: "hidden" }}>
        {/* ===================================================================
            SVG BACKGROUND: DUA LAUTAN DENGAN LANGIT MALAM
           =================================================================== */}
        <svg viewBox="0 0 1080 1920" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="skyNightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#02040A" />
              <stop offset="40%" stopColor="#061229" />
              <stop offset="100%" stopColor="#0A1E40" />
            </linearGradient>

            <linearGradient id="seaLeftNight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#040F24" />
              <stop offset="100%" stopColor="#0E3378" />
            </linearGradient>

            <linearGradient id="seaRightNight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B5D58" />
              <stop offset="100%" stopColor="#032624" />
            </linearGradient>

            <linearGradient id="sacredPillarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#FBBF24" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.05" />
            </linearGradient>

            <filter id="sacredGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="24" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Langit Malam */}
          <rect x="0" y="0" width="1080" height="700" fill="url(#skyNightGrad)" />

          {/* Bintang-bintang malam */}
          {Array.from({ length: 40 }).map((_, idx) => {
            const bx = (idx * 163) % 1080;
            const by = (idx * 87) % 550;
            return <circle key={`st-${idx}`} cx={bx} cy={by} r="1.6" fill="#FFFFFF" opacity={0.4} />;
          })}

          {/* Permukaan Laut & Kedalaman */}
          <rect x="0" y="700" width="540" height="1220" fill="url(#seaLeftNight)" />
          <rect x="540" y="700" width="540" height="1220" fill="url(#seaRightNight)" />

          {/* Garis Ombak Permukaan */}
          <line x1="0" y1="700" x2="1080" y2="700" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />

          {/* Garis Batas Bawah Air Antara Dua Lautan */}
          <line
            x1="540"
            y1="700"
            x2="540"
            y2="1920"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="3"
            strokeDasharray="12 8"
          />

          {/* ===============================================================
              FASE 1: KAPAL RISET OSEANOGRAFI & SONAR BEAM (Frame 0 - 180)
             =============================================================== */}
          {modernSonarOpacity > 0 && (
            <g opacity={modernSonarOpacity}>
              {/* Gelombang Sonar Radar Memancar ke Bawah */}
              {sonarPings.map((ping) => (
                <path
                  key={`sonar-${ping.id}`}
                  d={`M ${540 - ping.radius * 0.6} ${700 + ping.radius} Q 540 ${700 + ping.radius + 40} ${540 + ping.radius * 0.6} ${700 + ping.radius}`}
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="4"
                  opacity={ping.opacity}
                />
              ))}

              {/* Garis Pandu Kerucut Sonar */}
              <line x1="540" y1="695" x2="280" y2="1200" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />
              <line x1="540" y1="695" x2="800" y2="1200" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4" />

              {/* SILUET KAPAL RISET (Modern Oceanographic Vessel) */}
              <g
                transform={`translate(540, ${695 + shipBobbingY}) rotate(${shipRotation})`}
              >
                {/* Lambung Kapal */}
                <path
                  d="M -110 0 L -80 -28 L 80 -28 L 110 0 L 80 12 L -90 12 Z"
                  fill="#E2E8F0"
                  stroke="#94A3B8"
                  strokeWidth="2"
                />
                {/* Garis Aksen Lambung */}
                <line x1="-70" y1="-5" x2="70" y2="-5" stroke="#0284C7" strokeWidth="4" />

                {/* Dek / Kabin Kapal */}
                <rect x="-40" y="-55" width="65" height="27" fill="#F8FAFC" rx="4" />
                <rect x="-25" y="-75" width="35" height="20" fill="#E2E8F0" rx="3" />

                {/* Tiang Radar / Antena Komunikasi */}
                <line x1="-8" y1="-75" x2="-8" y2="-105" stroke="#64748B" strokeWidth="3" />
                <ellipse
                  cx="-8"
                  cy="-105"
                  rx="14"
                  ry="5"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  transform={`rotate(${frame * 4}, -8, -105)`}
                />

                {/* Lampu Navigasi Hijau & Merah */}
                <circle cx="-100" cy="-6" r="3" fill="#EF4444" />
                <circle cx="100" cy="-6" r="3" fill="#22C55E" />
              </g>
            </g>
          )}

          {/* ===============================================================
              FASE 2: PILAR CAHAYA KEEMASAN AL-QUR'AN (Frame 180 - 378)
             =============================================================== */}
          {isSacredPhase && (
            <g opacity={sacredPhaseProgress}>
              {/* Pilar Cahaya Keemasan yang Menjulang Tinggi ke Langit */}
              <rect
                x="440"
                y="0"
                width="200"
                height="1920"
                fill="url(#sacredPillarGrad)"
                filter="url(#sacredGlow)"
              />
              <rect
                x="500"
                y="0"
                width="80"
                height="1920"
                fill="url(#sacredPillarGrad)"
              />
              <line
                x1="540"
                y1="0"
                x2="540"
                y2="1920"
                stroke="#FFFFFF"
                strokeWidth="4"
                opacity="0.9"
              />

              {/* Partikel Emas Naik ke Langit */}
              {goldenParticles.map((gp) => (
                <circle
                  key={`gp-${gp.id}`}
                  cx={gp.x}
                  cy={gp.y}
                  r={gp.size}
                  fill="#FDE68A"
                  opacity={gp.opacity}
                  filter="url(#sacredGlow)"
                />
              ))}
            </g>
          )}
        </svg>

        {/* ===================================================================
            HUD LABEL ALAT RISET vs WAHYU AL-QUR'AN
           =================================================================== */}
        {modernSonarOpacity > 0.3 && (
          <div
            style={{
              position: "absolute",
              top: 220,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: modernSonarOpacity,
              backgroundColor: "rgba(10, 17, 40, 0.8)",
              backdropFilter: "blur(10px)",
              padding: "14px 32px",
              borderRadius: 20,
              border: "1px solid rgba(45, 212, 191, 0.4)",
              textAlign: "center",
            }}
          >
            <span style={{ color: "#2DD4BF", fontSize: 14, fontWeight: 800, letterSpacing: "3px" }}>
              RISET MODERN
            </span>
            <div style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 800, marginTop: 4 }}>
              Eksplorasi Sonar Oseanografi
            </div>
          </div>
        )}

        {isSacredPhase && (
          <div
            style={{
              position: "absolute",
              top: 360,
              left: "50%",
              transform: `translateX(-50%) scale(${surahBadgeSpring})`,
              opacity: sacredPhaseProgress,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(10, 17, 40, 0.9)",
                backdropFilter: "blur(16px)",
                padding: "24px 44px",
                borderRadius: 28,
                border: "2px solid #F59E0B",
                boxShadow: "0 10px 50px rgba(0,0,0,0.8), 0 0 40px rgba(245, 158, 11, 0.4)",
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
                TERTULIS SEJAK 14 ABAD SILAM
              </span>
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: 40,
                  fontWeight: 900,
                  margin: "8px 0 4px 0",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                Surah Ar-Rahman
              </h2>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(245, 158, 11, 0.2)",
                  color: "#FDE68A",
                  padding: "4px 18px",
                  borderRadius: 12,
                  fontSize: 20,
                  fontWeight: 800,
                  marginTop: 6,
                }}
              >
                Ayat 19 & 20
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>
    </CameraRig>
  );
};
