import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CameraRig } from "../../../src/components/CameraRig";

export const Scene4ForcefieldBarrier: React.FC = () => {
  const frame = useCurrentFrame();

  // Kamera subtle breathing zoom
  const cameraZoom = 1.0 + Math.sin(frame * 0.03) * 0.02;

  // Medan energi gelombang pembatas (Undulating Forcefield Wave)
  const forcefieldPoints = useMemo(() => {
    const points: string[] = [];
    const height = 1920;
    const steps = 16;
    for (let i = 0; i <= steps; i++) {
      const y = (height / steps) * i;
      const xOffset =
        Math.sin(frame * 0.06 + i * 0.5) * 16 +
        Math.cos(frame * 0.04 + i * 0.8) * 10;
      const x = 540 + xOffset;
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(" ");
  }, [frame]);

  // Kawanan ikan di sisi kiri (Berenang hanya di area kiri: x 80 - 450)
  const leftFishes = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => {
      const baseY = 350 + i * 140;
      const speed = 1.2 + (i % 3) * 0.4;
      const curX = ((i * 120 + frame * speed) % 360) + 70;
      const curY = baseY + Math.sin(frame * 0.05 + i) * 20;
      return { id: i, x: curX, y: curY, size: 14 + (i % 3) * 4 };
    });
  }, [frame]);

  // Kawanan ikan di sisi kanan (Berenang hanya di area kanan: x 620 - 990)
  const rightFishes = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => {
      const baseY = 320 + i * 145;
      const speed = 1.1 + (i % 3) * 0.3;
      const curX = 980 - ((i * 115 + frame * speed) % 350);
      const curY = baseY + Math.cos(frame * 0.05 + i) * 20;
      return { id: i, x: curX, y: curY, size: 14 + (i % 3) * 4 };
    });
  }, [frame]);

  // Lingkaran riak medan gaya di tengah
  const rippleRadius = (frame * 3) % 180;
  const rippleOpacity = 1 - rippleRadius / 180;

  // Pendaran dinding energi
  const barrierGlowIntensity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.7, 1.0]
  );

  return (
    <CameraRig zoom={cameraZoom}>
      <AbsoluteFill style={{ backgroundColor: "#040A18", overflow: "hidden" }}>
        {/* ===================================================================
            SVG BACKGROUND: DUA EKOSISTEM LAUT YANG BERBEDA
           =================================================================== */}
        <svg viewBox="0 0 1080 1920" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="deepOceanLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#030A1A" />
              <stop offset="100%" stopColor="#0F2D6B" />
            </linearGradient>

            <linearGradient id="warmOceanRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D766E" />
              <stop offset="100%" stopColor="#032624" />
            </linearGradient>

            <filter id="forcefieldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="energyRayGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sisi Kiri: Biru Tua Samudra Atlantik */}
          <rect x="0" y="0" width="540" height="1920" fill="url(#deepOceanLeft)" />

          {/* Sisi Kanan: Toska Samudra Pasifik */}
          <rect x="540" y="0" width="540" height="1920" fill="url(#warmOceanRight)" />

          {/* Pusaran Arus Kiri (Left Vortex Silhouette) */}
          <ellipse
            cx="270"
            cy="960"
            rx="220"
            ry="450"
            fill="none"
            stroke="rgba(56, 189, 248, 0.12)"
            strokeWidth="3"
            strokeDasharray="40 30"
            transform={`rotate(${frame * 0.3}, 270, 960)`}
          />

          {/* Pusaran Arus Kanan (Right Vortex Silhouette) */}
          <ellipse
            cx="810"
            cy="960"
            rx="220"
            ry="450"
            fill="none"
            stroke="rgba(45, 212, 191, 0.12)"
            strokeWidth="3"
            strokeDasharray="40 30"
            transform={`rotate(${-frame * 0.3}, 810, 960)`}
          />

          {/* KAWANAN IKAN KIRI (Berenang Mengarah ke Kiri/Tengah) */}
          {leftFishes.map((f) => (
            <g key={`fish-l-${f.id}`} transform={`translate(${f.x}, ${f.y})`}>
              <path
                d={`M 0 0 Q ${f.size} ${-f.size * 0.4} ${f.size * 1.8} 0 Q ${f.size} ${f.size * 0.4} 0 0 Z`}
                fill="#93C5FD"
                opacity="0.75"
              />
              <polygon
                points={`${-f.size * 0.6},${-f.size * 0.3} 0,0 ${-f.size * 0.6},${f.size * 0.3}`}
                fill="#60A5FA"
                opacity="0.8"
              />
            </g>
          ))}

          {/* KAWANAN IKAN KANAN (Berenang Mengarah ke Kanan/Tengah) */}
          {rightFishes.map((f) => (
            <g key={`fish-r-${f.id}`} transform={`translate(${f.x}, ${f.y})`}>
              <path
                d={`M 0 0 Q ${-f.size} ${-f.size * 0.4} ${-f.size * 1.8} 0 Q ${-f.size} ${f.size * 0.4} 0 0 Z`}
                fill="#FDE68A"
                opacity="0.75"
              />
              <polygon
                points={`${f.size * 0.6},${-f.size * 0.3} 0,0 ${f.size * 0.6},${f.size * 0.3}`}
                fill="#F59E0B"
                opacity="0.8"
              />
            </g>
          ))}

          {/* ===============================================================
              DINDING PEMBATAS ENERGI TAK KASATMATA (HALOCLINE FORCEFIELD)
             =============================================================== */}
          {/* Lapisan Pendaran Cahaya Luar (Amber) */}
          <path
            d={forcefieldPoints}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="20"
            strokeLinecap="round"
            opacity={0.7 * barrierGlowIntensity}
            filter="url(#forcefieldGlow)"
          />

          {/* Lapisan Pendaran Cahaya Tengah (Cyan/Teal) */}
          <path
            d={forcefieldPoints}
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="8"
            strokeLinecap="round"
            opacity={0.85 * barrierGlowIntensity}
            filter="url(#energyRayGlow)"
          />

          {/* Inti Garis Putih Sangat Terang */}
          <path
            d={forcefieldPoints}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Riak Gelombang Medan Gaya Melingkar di Titik Tengah */}
          <circle
            cx="540"
            cy="960"
            r={rippleRadius}
            fill="none"
            stroke="#FBBF24"
            strokeWidth="3"
            opacity={rippleOpacity * 0.7}
          />
        </svg>

        {/* HUD PENJELASAN SAINS & TAFSIR */}
        <div
          style={{
            position: "absolute",
            top: 240,
            left: "50%",
            transform: "translateX(-50%)",
            width: 780,
            textAlign: "center",
            backgroundColor: "rgba(10, 17, 40, 0.85)",
            backdropFilter: "blur(12px)",
            padding: "20px 32px",
            borderRadius: 24,
            border: "1px solid rgba(245, 158, 11, 0.4)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          }}
        >
          <span
            style={{
              color: "#FBBF24",
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            HUKUM ALAM (BARZAKH)
          </span>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: 32,
              fontWeight: 900,
              margin: "6px 0 0 0",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            Dinding Pembatas Tak Kasatmata
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 17,
              margin: "8px 0 0 0",
            }}
          >
            Masing-masing lautan tetap mempertahankan suhu, salinitas, dan ekosistem aslinya.
          </p>
        </div>
      </AbsoluteFill>
    </CameraRig>
  );
};
