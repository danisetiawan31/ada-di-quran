import React from "react";

export interface LogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  tagline?: string;
  style?: React.CSSProperties;
}

/**
 * LOGO OPSI 2: "Modern Rub el Hizb"
 * Filosofi: Bintang 8 sudut Al-Qur'an (Rub el Hizb - ۞) yang melambangkan
 * kesempurnaan wahyu dan keteraturan hukum alam semesta (Divine Order & Geometry).
 */
export const LogoRubElHizb: React.FC<LogoProps> = ({
  size = 200,
  showText = false,
  textColor = "#FFFFFF",
  tagline = "Fakta Menarik di Balik Al-Qur'an",
  style,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: showText ? "row" : "column",
        alignItems: "center",
        gap: showText ? Math.round(size * 0.15) : Math.round(size * 0.08),
        ...style,
      }}
    >
      {/* SIMBOL SVG BINTANG 8 SUDUT */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          {/* Gradasi Emas Mewah */}
          <linearGradient id="rubGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="80%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Gradasi Biru Samudra Malam */}
          <linearGradient id="rubDeepNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1C3D" />
            <stop offset="100%" stopColor="#040A18" />
          </linearGradient>

          {/* Gradasi Inti Cahaya */}
          <radialGradient id="rubCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FDE68A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#0A1128" stopOpacity="0" />
          </radialGradient>

          {/* Filter Glow Halus */}
          <filter id="rubGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Lingkaran Dasar Luar (Base Frame) */}
        <circle cx="100" cy="100" r="92" fill="#0A1128" stroke="url(#rubGoldGrad)" strokeWidth="3" />
        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(251, 191, 36, 0.35)" strokeWidth="1" strokeDasharray="6 4" />

        {/* 2. Dua Persegi Bertumpuk Membentuk Bintang 8 Sudut (Rub el Hizb) */}
        {/* Persegi 1 (Tegak: 0 Derajat) */}
        <rect
          x="44"
          y="44"
          width="112"
          height="112"
          rx="8"
          fill="url(#rubDeepNavy)"
          stroke="url(#rubGoldGrad)"
          strokeWidth="3"
        />

        {/* Persegi 2 (Rotasi 45 Derajat) */}
        <rect
          x="44"
          y="44"
          width="112"
          height="112"
          rx="8"
          fill="url(#rubDeepNavy)"
          stroke="url(#rubGoldGrad)"
          strokeWidth="3"
          transform="rotate(45, 100, 100)"
        />

        {/* 3. Garis Geometris Kisi-Kisi Dalam (Sacred Geometric Infill) */}
        <g stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1.2">
          {/* Garis Diagonal dan Salib Harmonis */}
          <line x1="100" y1="28" x2="100" y2="172" />
          <line x1="28" y1="100" x2="172" y2="100" />
          <line x1="49" y1="49" x2="151" y2="151" />
          <line x1="151" y1="49" x2="49" y2="151" />
        </g>

        {/* 4. Inti Cahaya Pendaran (Luminous Center Hub) */}
        <circle cx="100" cy="100" r="32" fill="url(#rubCoreGlow)" filter="url(#rubGlow)" />

        {/* Lingkaran Cincin Emas Tengah */}
        <circle cx="100" cy="100" r="22" fill="#0A1128" stroke="url(#rubGoldGrad)" strokeWidth="2.5" />

        {/* 5. Berlian Bintang Kecil di Titik Pusat */}
        <polygon
          points="100,82 105,95 118,100 105,105 100,118 95,105 82,100 95,95"
          fill="#FFFFFF"
        />

        {/* Titik Mutiara Inti */}
        <circle cx="100" cy="100" r="3.5" fill="#F59E0B" />
      </svg>

      {/* TYPOGRAPHY BRANDING (Jika showText = true) */}
      {showText && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: Math.round(size * 0.32),
              fontWeight: 900,
              color: textColor,
              letterSpacing: "0.5px",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            ADA DI QURAN
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: Math.round(size * 0.14),
              fontWeight: 600,
              color: "#FBBF24",
              letterSpacing: "1px",
              marginTop: 4,
            }}
          >
            {tagline}
          </span>
        </div>
      )}
    </div>
  );
};
