import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../theme/tokens";
import { FONTS } from "../theme/fonts";

export interface SacredLightProps {
  x?: number | string;
  y?: number | string;
  size?: number;
  /**
   * Intensitas kilau cahaya (0.5 hingga 1.5)
   */
  intensity?: number;
  label?: string;
  style?: React.CSSProperties;
}

export const SacredLight: React.FC<SacredLightProps> = ({
  x = "50%",
  y = "45%",
  size = 280,
  intensity = 1.0,
  label,
  style,
}) => {
  const frame = useCurrentFrame();

  // Animasi denyut halus (pulsing) dan rotasi sinar
  const pulse = Math.sin(frame * 0.08) * 0.08 + 1.0;
  const rotation = (frame * 0.4) % 360;
  const particleFloat = Math.sin(frame * 0.05) * 15;

  const currentSize = size * pulse * intensity;

  return (
    <div
      style={{
        position: "absolute",
        left: typeof x === "number" ? `${x}px` : x,
        top: typeof y === "number" ? `${y}px` : y,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* 1. Sinar Putar Halus (Rotating Rays) */}
      <svg
        width={currentSize * 1.5}
        height={currentSize * 1.5}
        viewBox="0 0 200 200"
        style={{
          position: "absolute",
          transform: `rotate(${rotation}deg)`,
          opacity: 0.35 * intensity,
        }}
      >
        <defs>
          <radialGradient id="rayGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.amber} stopOpacity="1" />
            <stop offset="60%" stopColor={COLORS.sacredGold} stopOpacity="0.4" />
            <stop offset="100%" stopColor={COLORS.sacredGold} stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + 95 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={100 + 95 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke="url(#rayGlow)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* 2. Inti Bola Cahaya (Golden Orb with Heavy Blur) */}
      <div
        style={{
          width: currentSize,
          height: currentSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, #FFFFFF 15%, ${COLORS.amber} 50%, ${COLORS.sacredGold} 80%, transparent 100%)`,
          boxShadow: `0 0 ${80 * intensity}px ${COLORS.sacredGold}, 0 0 ${140 * intensity}px ${COLORS.amber}`,
          filter: "blur(2px)",
        }}
      />

      {/* 3. Partikel Cahaya Mengambang Halus */}
      <div
        style={{
          position: "absolute",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          boxShadow: `0 0 12px ${COLORS.amber}`,
          transform: `translate(${-35 + particleFloat}px, ${-40 - particleFloat}px)`,
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          boxShadow: `0 0 10px ${COLORS.amber}`,
          transform: `translate(${40 - particleFloat}px, ${30 + particleFloat}px)`,
          opacity: 0.7,
        }}
      />

      {/* 4. Label teks reverent opsional di bawah cahaya */}
      {label && (
        <span
          style={{
            marginTop: 24,
            fontSize: 22,
            fontFamily: FONTS.title,
            fontWeight: 700,
            color: COLORS.amber,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export interface WatermarkProps {
  channelName?: string;
  style?: React.CSSProperties;
}

export const Watermark: React.FC<WatermarkProps> = ({
  channelName = "@AdaDiQuran",
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 80, // Safe zone atas dari header TikTok / Reels
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 18px",
        backgroundColor: "rgba(10, 17, 40, 0.45)",
        backdropFilter: "blur(8px)",
        borderRadius: 24,
        border: "1px solid rgba(251, 191, 36, 0.3)",
        zIndex: 50,
        pointerEvents: "none",
        ...style,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: COLORS.amber,
          boxShadow: `0 0 8px ${COLORS.amber}`,
        }}
      />
      <span
        style={{
          color: COLORS.textWhite,
          fontFamily: FONTS.title,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {channelName}
      </span>
    </div>
  );
};
