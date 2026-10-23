import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";

interface BackgroundProps {
  sceneIndex: number;
}

export const Background: React.FC<BackgroundProps> = ({ sceneIndex }) => {
  const frame = useCurrentFrame();

  // Dynamic pastel gradients for each scene
  const backgrounds = [
    { bg: THEME.colors.bgCream, blob1: "#FDE68A", blob2: "#FED7AA" }, // Scene 1: Warm Cream & Peach
    { bg: THEME.colors.bgSoftBlue, blob1: "#BAE6FD", blob2: "#A7F3D0" }, // Scene 2: Sky Blue & Mint
    { bg: "#FFF1F2", blob1: "#FECDD3", blob2: "#FEF08A" }, // Scene 3: Soft Rose & Yellow
    { bg: THEME.colors.bgLavender, blob1: "#DDD6FE", blob2: "#BAE6FD" }, // Scene 4: Lavender & Sky Blue
    { bg: THEME.colors.bgWarmYellow, blob1: "#FDE047", blob2: "#FED7AA" }, // Scene 5: Sunny Yellow
    { bg: THEME.colors.bgMint, blob1: "#A7F3D0", blob2: "#FDE68A" }, // Scene 6: Mint & Gold
  ];

  const currentTheme = backgrounds[sceneIndex] || backgrounds[0];

  // Gentle floating animation for background blobs
  const blob1X = Math.sin(frame * 0.02) * 50;
  const blob1Y = Math.cos(frame * 0.025) * 60;
  const blob2X = Math.cos(frame * 0.03) * 60;
  const blob2Y = Math.sin(frame * 0.02) * 50;
  const rotateAccents = (frame * 0.4) % 360;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: currentTheme.bg,
        overflow: "hidden",
        zIndex: 0,
        transition: "background-color 0.8s ease",
      }}
    >
      {/* Giant Soft Organic Blob 1 (Top Left) */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -150,
          width: 800,
          height: 800,
          borderRadius: "50%",
          backgroundColor: currentTheme.blob1,
          opacity: 0.55,
          filter: "blur(60px)",
          transform: `translate(${blob1X}px, ${blob1Y}px)`,
        }}
      />

      {/* Giant Soft Organic Blob 2 (Bottom Right) */}
      <div
        style={{
          position: "absolute",
          bottom: -150,
          right: -120,
          width: 850,
          height: 850,
          borderRadius: "50%",
          backgroundColor: currentTheme.blob2,
          opacity: 0.5,
          filter: "blur(70px)",
          transform: `translate(${blob2X}px, ${blob2Y}px)`,
        }}
      />

      {/* Playful Floating Geometric Accents (Zero dead space) */}
      {/* Plus Symbol Top Right */}
      <div
        style={{
          position: "absolute",
          top: 140,
          right: 90,
          fontSize: 48,
          fontWeight: 900,
          color: "rgba(15, 23, 42, 0.12)",
          transform: `rotate(${rotateAccents}deg)`,
          userSelect: "none",
        }}
      >
        ✦
      </div>

      {/* Star Symbol Top Left */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 80,
          fontSize: 44,
          color: "rgba(15, 23, 42, 0.12)",
          transform: `rotate(${-rotateAccents * 1.2}deg)`,
          userSelect: "none",
        }}
      >
        ★
      </div>

      {/* Circle Accent Bottom Left */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 100,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "6px solid rgba(15, 23, 42, 0.1)",
        }}
      />

      {/* Dot Grid Pattern (Subtle & clean) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(15, 23, 42, 0.05) 2px, transparent 2px)",
          backgroundSize: "40px 40px",
          opacity: 0.7,
        }}
      />
    </div>
  );
};
