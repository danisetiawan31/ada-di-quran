import React from "react";

export interface LogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  tagline?: string;
  style?: React.CSSProperties;
}

/**
 * LOGO OPSI 1: "The Open Mushaf & Sacred Light"
 * Filosofi: Lembaran Mushaf terbuka dengan pendaran cahaya keemasan (Sacred Light)
 * yang memancar ke atas melambangkan tadabbur, wahyu, dan ilmu sains.
 */
export const LogoOpenMushaf: React.FC<LogoProps> = ({
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
      {/* SIMBOL SVG MUSHAF & CAHAYA */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          {/* Gradasi Lembaran Kiri */}
          <linearGradient id="mushafLeftPage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Gradasi Lembaran Kanan */}
          <linearGradient id="mushafRightPage" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Gradasi Lembaran Belakang / Bayangan */}
          <linearGradient id="mushafBackPage" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Gradasi Emas Utama */}
          <linearGradient id="goldGradientMushaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Gradasi Cahaya Sakral */}
          <radialGradient id="sacredOrb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>

          {/* Glow Filter */}
          <filter id="mushafGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Latar Belakang Lingkaran Halus (Emblem Base) */}
        <circle cx="100" cy="100" r="92" fill="#0A1128" stroke="url(#goldGradientMushaf)" strokeWidth="3" />

        {/* 2. Pendaran Sinar Cahaya di Atas Mushaf */}
        <circle cx="100" cy="85" r="46" fill="url(#sacredOrb)" filter="url(#mushafGlow)" />

        {/* Sinar-sinar Fajar (Rays of Light) */}
        <line x1="100" y1="36" x2="100" y2="58" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="72" y1="46" x2="84" y2="64" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
        <line x1="128" y1="46" x2="116" y2="64" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="70" x2="68" y2="78" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="150" y1="70" x2="132" y2="78" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />

        {/* 3. Lembaran Belakang Mushaf (Kedalaman) */}
        <path
          d="M 100 138 C 76 130 48 134 32 144 C 32 122 52 108 78 112 C 88 114 96 118 100 124 Z"
          fill="url(#mushafBackPage)"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <path
          d="M 100 138 C 124 130 152 134 168 144 C 168 122 148 108 122 112 C 112 114 104 118 100 124 Z"
          fill="url(#mushafBackPage)"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />

        {/* 4. Lembaran Depan Mushaf (Putih Bersih Gading) */}
        {/* Halaman Kiri */}
        <path
          d="M 100 148 C 76 136 44 140 30 152 C 30 128 54 114 80 118 C 90 120 96 126 100 132 Z"
          fill="url(#mushafLeftPage)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
        {/* Halaman Kanan */}
        <path
          d="M 100 148 C 124 136 156 140 170 152 C 170 128 146 114 120 118 C 110 120 104 126 100 132 Z"
          fill="url(#mushafRightPage)"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* Garis Aksen Emas di Ujung Halaman */}
        <path
          d="M 30 152 C 54 140 82 138 100 148"
          stroke="url(#goldGradientMushaf)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 170 152 C 146 140 118 138 100 148"
          stroke="url(#goldGradientMushaf)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Punggung / Jilid Tengah Mushaf */}
        <circle cx="100" cy="148" r="4" fill="#D97706" />

        {/* 5. Inti Bola Cahaya (The Sacred Orb Core) */}
        <circle cx="100" cy="85" r="14" fill="#FFFFFF" />
        <circle cx="100" cy="85" r="16" stroke="#FDE68A" strokeWidth="2.5" fill="none" />
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
