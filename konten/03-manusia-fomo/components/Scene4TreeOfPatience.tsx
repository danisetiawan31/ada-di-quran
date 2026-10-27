import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EP02_THEME } from "../theme";
import { MainCharacter } from "./MainCharacter";

export const Scene4TreeOfPatience: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Relative frame from global frame 1239
  const relFrame = Math.max(0, frame - 1239);

  const { colors } = EP02_THEME;

  // Gentle camera zoom on the peaceful sanctuary
  const cameraZoom = interpolate(relFrame, [0, 200], [1.02, 1.08], {
    extrapolateRight: "clamp",
  });

  // Tree growth bloom spring
  const treeBloom = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Falling leaves animation
  const leaves = Array.from({ length: 8 }).map((_, i) => {
    const x = 320 + (i * 90) % 520;
    const y = ((relFrame * 2.5 + i * 80) % 700) + 700;
    const rot = (relFrame * 2 + i * 45) % 360;
    return { x, y, rot };
  });

  // Sunbeams shimmer
  const sunShimmer = Math.sin(relFrame * 0.1) * 0.15 + 0.85;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.morningSky,
        overflow: "hidden",
      }}
    >
      {/* 1. MORNING SUNNY SKY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 1000,
          background: "linear-gradient(180deg, #BAE6FD 0%, #FEF9C3 60%, #BBF7D0 100%)",
        }}
      />

      {/* Radiant Morning Sun (Top Right) */}
      <div
        style={{
          position: "absolute",
          top: 140,
          right: 120,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FFFFFF 10%, #FDE047 40%, rgba(254, 240, 138, 0.4) 70%, transparent 100%)",
          opacity: sunShimmer,
          filter: "blur(4px)",
        }}
      />

      {/* Golden God Rays / Sunbeams Filtering Down */}
      <svg
        width="1080"
        height="1400"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.28 * sunShimmer,
          pointerEvents: "none",
        }}
      >
        <polygon points="860,180 200,1400 420,1400" fill="url(#sunRayGrad)" />
        <polygon points="880,180 500,1400 750,1400" fill="url(#sunRayGrad)" />
        <defs>
          <linearGradient id="sunRayGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* CAMERA RIG CONTAINER */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraZoom})`,
          transformOrigin: "center 75%",
        }}
      >
        {/* =====================================================================
            2. THE LUSH FRUITFUL TREE OF PATIENCE
           ===================================================================== */}
        <div
          style={{
            position: "absolute",
            bottom: 300,
            left: "50%",
            transform: `translateX(-50%) scale(${treeBloom})`,
            width: 900,
            height: 1100,
            transformOrigin: "bottom center",
          }}
        >
          <svg
            viewBox="0 0 900 1100"
            width="100%"
            height="100%"
            style={{ overflow: "visible" }}
          >
            {/* Trunk Shadow */}
            <ellipse cx="450" cy="1060" rx="220" ry="24" fill="rgba(0,0,0,0.15)" />

            {/* Tree Trunk & Strong Roots into Ground */}
            <path
              d="M380 1060 C400 950 420 800 410 700 C400 620 340 520 280 440 L340 430 C410 520 440 600 450 670 C460 600 490 520 560 430 L620 440 C560 520 500 620 490 700 C480 800 500 950 520 1060 Z"
              fill={colors.treeTrunk}
            />

            {/* Bark Texture Lines */}
            <path d="M440 760 Q455 860 448 980" stroke="#713F12" strokeWidth="6" strokeLinecap="round" />
            <path d="M465 720 Q450 820 460 920" stroke="#713F12" strokeWidth="5" strokeLinecap="round" />

            {/* Canopy Foliage Layers (Lush Emerald & Mint Clouds) */}
            {/* Back Foliage (Dark Emerald) */}
            <circle cx="280" cy="460" r="170" fill="#047857" opacity="0.9" />
            <circle cx="620" cy="460" r="170" fill="#047857" opacity="0.9" />
            <circle cx="450" cy="360" r="210" fill="#047857" opacity="0.9" />

            {/* Mid Foliage (Vibrant Emerald) */}
            <circle cx="240" cy="410" r="150" fill={colors.treeLeaves} />
            <circle cx="660" cy="410" r="150" fill={colors.treeLeaves} />
            <circle cx="450" cy="300" r="190" fill={colors.treeLeaves} />
            <circle cx="340" cy="320" r="160" fill={colors.treeLeaves} />
            <circle cx="560" cy="320" r="160" fill={colors.treeLeaves} />

            {/* Front Foliage Highlights (Sunny Light Green) */}
            <circle cx="360" cy="270" r="130" fill={colors.treeLeavesLight} opacity="0.85" />
            <circle cx="540" cy="270" r="130" fill={colors.treeLeavesLight} opacity="0.85" />
            <circle cx="450" cy="240" r="140" fill={colors.treeLeavesLight} opacity="0.9" />

            {/* RIPE GOLDEN & RED FRUITS ON TREE */}
            {[
              { cx: 300, cy: 360 },
              { cx: 220, cy: 460 },
              { cx: 390, cy: 260 },
              { cx: 510, cy: 240 },
              { cx: 600, cy: 330 },
              { cx: 680, cy: 430 },
              { cx: 450, cy: 360 },
              { cx: 350, cy: 440 },
              { cx: 550, cy: 450 },
            ].map((fruit, fIdx) => (
              <g key={fIdx}>
                {/* Fruit Glow */}
                <circle cx={fruit.cx} cy={fruit.cy} r="18" fill="#FDE047" opacity="0.4" />
                {/* Fruit Orb */}
                <circle cx={fruit.cx} cy={fruit.cy} r="13" fill={colors.fruitRed} />
                {/* Specular Highlight */}
                <circle cx={fruit.cx - 4} cy={fruit.cy - 4} r="3.5" fill="#FFFFFF" />
                {/* Tiny Stem */}
                <path d={`M${fruit.cx} ${fruit.cy - 13} Q${fruit.cx + 2} ${fruit.cy - 20} ${fruit.cx + 6} ${fruit.cy - 18}`} stroke="#713F12" strokeWidth="2.5" fill="none" />
              </g>
            ))}
          </svg>
        </div>

        {/* =====================================================================
            3. PEACEFUL CHARACTER SITTING & LEANING ON THE TREE
           ===================================================================== */}
        <div
          style={{
            position: "absolute",
            bottom: 310,
            left: "50%",
            transform: "translateX(-45%)",
            zIndex: 35,
          }}
        >
          <MainCharacter pose="peaceful" scale={1.38} />
        </div>

        {/* Rolling Green Grass Foreground Mound */}
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 0,
            width: "100%",
            height: 220,
            backgroundColor: "#15803D",
            borderRadius: "50% 50% 0 0 / 40px",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.1)",
            zIndex: 30,
          }}
        />

        {/* Gentle Breeze Falling Leaves */}
        {leaves.map((l, lIdx) => (
          <div
            key={lIdx}
            style={{
              position: "absolute",
              top: l.y,
              left: l.x,
              transform: `rotate(${l.rot}deg)`,
              zIndex: 40,
              pointerEvents: "none",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M4 12 Q12 4 20 12 Q12 20 4 12 Z"
                fill={lIdx % 2 === 0 ? colors.treeLeavesLight : "#F59E0B"}
                opacity="0.85"
              />
            </svg>
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
