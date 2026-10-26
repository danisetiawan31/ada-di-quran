import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../../src/components/CameraRig";

export const Scene1TopDown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Kamera: Frame 0-186 zoom in halus ke garis pertemuan; Frame 186-294 stabil dengan getaran mikro
  const cameraZoom = interpolate(frame, [0, 186, 294], [1.0, 1.14, 1.15], {
    extrapolateRight: "clamp",
  });

  // Gelombang pertemuan dua lautan (Bezier Curve Dinamis)
  // Menghasilkan kurva pembatas bergelombang di tengah layar (x ~ 540)
  const wavePoints = useMemo(() => {
    const points: string[] = [];
    const height = 1920;
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      const y = (height / steps) * i;
      // Kombinasi sinewave untuk gerakan cairan alami
      const waveOffset =
        Math.sin(frame * 0.04 + i * 0.6) * 32 +
        Math.cos(frame * 0.02 + i * 0.3) * 18;
      const x = 540 + waveOffset;
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(" ");
  }, [frame]);

  // Bubble / Foam particles di sepanjang garis pertemuan
  const foamParticles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const seedY = (i * 137.5) % 1920;
      const speed = 0.5 + (i % 5) * 0.2;
      const currentY = (seedY + frame * speed) % 1920;
      const waveOffset = Math.sin(frame * 0.04 + (currentY / 160)) * 30;
      const currentX = 540 + waveOffset + Math.sin(frame * 0.08 + i) * 22;
      const size = 6 + (i % 6) * 4;
      const opacity = 0.4 + Math.sin(frame * 0.05 + i) * 0.35;
      return { id: i, x: currentX, y: currentY, size, opacity };
    });
  }, [frame]);

  // Arus partikel di laut kiri (Biru Tua)
  const leftCurrentParticles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const baseX = 80 + ((i * 73) % 400);
      const baseY = ((i * 151) + frame * 0.8) % 1920;
      const drift = Math.sin(frame * 0.03 + i) * 15;
      return { id: i, x: baseX + drift, y: baseY, size: 4 + (i % 4) * 3 };
    });
  }, [frame]);

  // Arus partikel di laut kanan (Toska)
  const rightCurrentParticles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const baseX = 600 + ((i * 83) % 400);
      const baseY = ((i * 179) - frame * 0.9 + 19200) % 1920;
      const drift = Math.cos(frame * 0.03 + i) * 15;
      return { id: i, x: baseX + drift, y: baseY, size: 4 + (i % 4) * 3 };
    });
  }, [frame]);

  // =========================================================================
  // ANIMASI PANEL KACA TRANSPARAN (Frame 186 - 294)
  // "Padahal, nggak ada tembok kaca di tengah lautnya, lho."
  // =========================================================================
  const glassProgress = spring({
    frame: frame - 186,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Kaca pecah / menghilang menjadi partikel cahaya (Frame 240 - 294)
  const shatterProgress = interpolate(frame, [238, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glassOpacity = interpolate(
    frame,
    [186, 200, 235, 275],
    [0, 0.85, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <CameraRig zoom={cameraZoom}>
      <AbsoluteFill style={{ backgroundColor: "#061325", overflow: "hidden" }}>
        {/* ===================================================================
            SVG FULL SCREEN: LAUT KIRI (Biru Tua) & LAUT KANAN (Toska Terang)
           =================================================================== */}
        <svg
          viewBox="0 0 1080 1920"
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            {/* Gradasi Laut Kiri (Samudra Atlantik / Air Asin Padat Dingin) */}
            <linearGradient id="oceanLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#051532" />
              <stop offset="50%" stopColor="#0A2463" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>

            {/* Gradasi Laut Kanan (Air Glasier / Toska Segar) */}
            <linearGradient id="oceanRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#094A49" />
              <stop offset="45%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>

            {/* Gradasi Buih Putih Bercahaya */}
            <linearGradient id="foamGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#A5F3FC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
            </linearGradient>

            {/* Filter Glow Buih */}
            <filter id="foamGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Filter Specular Kaca */}
            <filter id="glassReflect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BACKGROUND LAUT KIRI (Biru Tua) */}
          <rect width="1080" height="1920" fill="url(#oceanLeftGrad)" />

          {/* LAUT KANAN (Toska): Dipotong Mengikuti Kurva Dinamis wavePoints */}
          <path
            d={`${wavePoints} L 1080 1920 L 1080 0 Z`}
            fill="url(#oceanRightGrad)"
          />

          {/* TEKSTUR ARUS HALUS LAUT KIRI */}
          {leftCurrentParticles.map((p) => (
            <ellipse
              key={`lp-${p.id}`}
              cx={p.x}
              cy={p.y}
              rx={p.size * 2.5}
              ry={p.size * 0.8}
              fill="#38BDF8"
              opacity={0.18}
              transform={`rotate(-15, ${p.x}, ${p.y})`}
            />
          ))}

          {/* TEKSTUR ARUS HALUS LAUT KANAN */}
          {rightCurrentParticles.map((p) => (
            <ellipse
              key={`rp-${p.id}`}
              cx={p.x}
              cy={p.y}
              rx={p.size * 2.2}
              ry={p.size * 0.8}
              fill="#99F6E4"
              opacity={0.22}
              transform={`rotate(20, ${p.x}, ${p.y})`}
            />
          ))}

          {/* GARIS BUIH UTAMA (FOAM COLLISION LINE) */}
          <path
            d={wavePoints}
            fill="none"
            stroke="url(#foamGlowGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#foamGlow)"
            opacity={0.92}
          />
          <path
            d={wavePoints}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            opacity={0.95}
          />

          {/* BUBBLE / FOAM PARTICLES YANG BERGELEMBUNG */}
          {foamParticles.map((bubble) => (
            <circle
              key={`foam-${bubble.id}`}
              cx={bubble.x}
              cy={bubble.y}
              r={bubble.size}
              fill="#FFFFFF"
              opacity={bubble.opacity}
              filter="url(#foamGlow)"
            />
          ))}

          {/* ===============================================================
              ILUSTRASI PANEL KACA TIPIS ("nggak ada tembok kaca")
             =============================================================== */}
          {frame >= 186 && glassOpacity > 0 && (
            <g opacity={glassOpacity} filter="url(#glassReflect)">
              {/* Batang Kaca Utama */}
              <rect
                x={525 - shatterProgress * 30}
                y={150}
                width={30}
                height={1620}
                rx={8}
                fill="rgba(255, 255, 255, 0.25)"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="2.5"
                transform={`scale(${glassProgress})`}
                style={{ transformOrigin: "540px 960px" }}
              />
              {/* Pantulan Cahaya Kaca (Specular Sheen) */}
              <line
                x1={532}
                y1={200}
                x2={532}
                y2={1700}
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="3"
                strokeDasharray="40 80"
              />

              {/* Tanda X atau Silang Ikonik Penegas: "TIDAK ADA" */}
              {shatterProgress > 0.1 && (
                <g opacity={shatterProgress}>
                  <circle cx="540" cy="960" r="70" fill="none" stroke="#EF4444" strokeWidth="6" />
                  <line x1="495" y1="915" x2="585" y2="1005" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
                </g>
              )}

              {/* Partikel Cahaya Saat Kaca Hancur/Memudar */}
              {shatterProgress > 0 &&
                Array.from({ length: 16 }).map((_, idx) => {
                  const angle = (idx / 16) * Math.PI * 2;
                  const distance = shatterProgress * 180;
                  const px = 540 + Math.cos(angle) * distance;
                  const py = 960 + Math.sin(angle) * distance;
                  return (
                    <circle
                      key={`glass-part-${idx}`}
                      cx={px}
                      cy={py}
                      r={4 * (1 - shatterProgress)}
                      fill="#FFFFFF"
                      opacity={1 - shatterProgress}
                    />
                  );
                })}
            </g>
          )}
        </svg>

        {/* LABEL AIR LAUT KIRI & KANAN (Elegan & Informatif) */}
        <div
          style={{
            position: "absolute",
            top: 280,
            left: 70,
            color: "rgba(255, 255, 255, 0.85)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "4px",
            fontSize: 22,
            fontWeight: 800,
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          Laut A
          <span style={{ display: "block", fontSize: 14, fontWeight: 500, letterSpacing: "1px", opacity: 0.7 }}>
            Salinitas Tinggi
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: 280,
            right: 70,
            textAlign: "right",
            color: "rgba(255, 255, 255, 0.85)",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "4px",
            fontSize: 22,
            fontWeight: 800,
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          Laut B
          <span style={{ display: "block", fontSize: 14, fontWeight: 500, letterSpacing: "1px", opacity: 0.7 }}>
            Air Segar / Rendah Garam
          </span>
        </div>
      </AbsoluteFill>
    </CameraRig>
  );
};
