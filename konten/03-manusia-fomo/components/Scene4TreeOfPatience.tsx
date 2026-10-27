import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EP02_THEME } from "../theme";
import { MainCharacter } from "./MainCharacter";
import { PopElement } from "../../../src/components/PopElement";

export const Scene4TreeOfPatience: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Frame is 0-indexed relative to Scene 4 via Sequence wrapper
  const relFrame = frame;

  const { colors } = EP02_THEME;

  // Gentle cinematic camera zoom on the peaceful sanctuary
  const cameraZoom = interpolate(relFrame, [0, 280], [1.0, 1.05], {
    extrapolateRight: "clamp",
  });

  // Tree growth bloom spring (organic unfolding into maturity)
  const treeBloom = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Falling leaves animation floating gently in the breeze
  const leaves = Array.from({ length: 9 }).map((_, i) => {
    const startX = 200 + (i * 85) % 640;
    const y = ((relFrame * 2.2 + i * 95) % 650) + 720;
    const x = startX + Math.sin(relFrame * 0.05 + i) * 24;
    const rot = (relFrame * 2.5 + i * 40) % 360;
    return { x, y, rot };
  });

  // Radiant sun shimmer & god-ray pulsation
  const sunShimmer = Math.sin(relFrame * 0.08) * 0.12 + 0.88;

  // Gentle breathing sway of the character resting
  const restBreatheY = Math.sin(relFrame * 0.1) * 3;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FEF9C3",
        overflow: "hidden",
      }}
    >
      {/* =====================================================================
          AUDIO: SCENE 4 TRANSITION & AYAH TEASER SFX (Max 2 triggers)
         ===================================================================== */}
      {/* 1. Scene Transition Gentle Nature Breeze Whoosh */}
      <Sequence from={0} durationInFrames={35}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.14} />
      </Sequence>

      {/* =====================================================================
          1. ENVIRONMENTAL BACKDROP: MORNING SUN & ROLLING HILLS
         ===================================================================== */}
      {/* Gentle Morning Gradient Sky */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 1200,
          background: "linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 40%, #FEF9C3 75%, #BBF7D0 100%)",
        }}
      />

      {/* Radiant Warm Morning Sun (Upper Right) */}
      <div
        style={{
          position: "absolute",
          top: 130,
          right: 90,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FFFFFF 15%, #FDE047 45%, rgba(254, 240, 138, 0.45) 75%, transparent 100%)",
          opacity: sunShimmer,
          filter: "blur(6px)",
        }}
      />

      {/* Volumetric God Rays / Heavenly Sunbeams */}
      <svg
        width="1080"
        height="1500"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.32 * sunShimmer,
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        <defs>
          <linearGradient id="godRay1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="godRay2" x1="90%" y1="0%" x2="15%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points="900,160 120,1500 380,1500" fill="url(#godRay1)" />
        <polygon points="920,170 420,1500 700,1500" fill="url(#godRay2)" />
        <polygon points="940,180 720,1500 960,1500" fill="url(#godRay1)" />
      </svg>

      {/* Distant Rolling Hills with Miniature Pines (Environmental Continuity from Scene 3) */}
      <svg
        viewBox="0 0 1080 500"
        style={{
          position: "absolute",
          top: 560,
          left: 0,
          width: "100%",
          height: 500,
          pointerEvents: "none",
          zIndex: 8,
        }}
      >
        {/* Distant Hill Layer 1 */}
        <path
          d="M0 260 Q260 180 540 230 T1080 200 L1080 500 L0 500 Z"
          fill="#86EFAC"
          opacity="0.7"
        />
        {/* Distant Hill Layer 2 */}
        <path
          d="M0 320 Q380 240 760 300 T1080 270 L1080 500 L0 500 Z"
          fill="#4ADE80"
          opacity="0.8"
        />

        {/* Horizon Forest Clusters */}
        {[
          { cx: 120, cy: 280, r: 40, c: "#10B981" },
          { cx: 180, cy: 260, r: 52, c: "#059669" },
          { cx: 240, cy: 290, r: 38, c: "#10B981" },
          { cx: 820, cy: 270, r: 46, c: "#059669" },
          { cx: 880, cy: 250, r: 58, c: "#047857" },
          { cx: 950, cy: 280, r: 42, c: "#10B981" },
        ].map((t, idx) => (
          <circle key={idx} cx={t.cx} cy={t.cy} r={t.r} fill={t.c} opacity="0.85" />
        ))}
      </svg>

      {/* Foreground Expansive Lawn (Y: 980 - 1920) - Zero Bottom Void! */}
      <div
        style={{
          position: "absolute",
          top: 980,
          left: 0,
          width: "100%",
          height: 940,
          background: "linear-gradient(180deg, #15803D 0%, #166534 60%, #14532D 100%)",
          borderTop: "6px solid #22C55E",
          zIndex: 10,
        }}
      >
        {/* Wildflower & Meadow Grass Accents */}
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          {[
            { x: 100, y: 120, c: "#FEF08A" },
            { x: 180, y: 240, c: "#FFFFFF" },
            { x: 260, y: 150, c: "#FDE047" },
            { x: 140, y: 400, c: "#FFFFFF" },
            { x: 220, y: 520, c: "#FEF08A" },
            { x: 800, y: 140, c: "#FFFFFF" },
            { x: 880, y: 260, c: "#FEF08A" },
            { x: 960, y: 170, c: "#FDE047" },
            { x: 840, y: 420, c: "#FFFFFF" },
            { x: 920, y: 540, c: "#FEF08A" },
          ].map((f, i) => (
            <circle key={i} cx={f.x} cy={f.y} r="5.5" fill={f.c} opacity="0.85" />
          ))}
        </svg>
      </div>

      {/* =====================================================================
          2. CAMERA RIG FOR MAJESTIC TREE & RECLINING CHARACTER
         ===================================================================== */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraZoom})`,
          transformOrigin: "center 70%",
          zIndex: 20,
        }}
      >
        {/* -----------------------------------------------------------------
            A. MAJESTIC TREE OF PATIENCE (Right-Anchored Asymmetric Framing)
               (Trunk curves elegantly from right to center-left, with canopy
                spreading across the top like a sheltering canopy roof)
           ----------------------------------------------------------------- */}
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 200,
            width: 880,
            height: 1250,
            transform: `scale(${treeBloom})`,
            transformOrigin: "bottom right",
            zIndex: 22,
          }}
        >
          <svg
            viewBox="0 0 880 1250"
            width="100%"
            height="100%"
            style={{ overflow: "visible" }}
          >
            {/* Tree Base Shadow on Grass */}
            <ellipse cx="540" cy="1160" rx="260" ry="26" fill="rgba(0,0,0,0.22)" />

            {/* Tree Gnarled Roots Spreading into Lawn */}
            <path
              d="M400 1160 Q460 1120 500 1080 L560 1080 Q620 1130 700 1160 Z"
              fill="#78350F"
            />

            {/* Main Tree Trunk: Gracefully curved and branching out */}
            <path
              d="M490 1160 C500 1020 520 880 510 760 C500 660 430 550 310 450 L380 435 C480 525 530 610 550 700 C565 615 620 525 710 440 L775 455 C690 550 635 660 615 760 C605 880 620 1020 610 1160 Z"
              fill="url(#trunkWoodGrad)"
              stroke="#451A03"
              strokeWidth="3.5"
            />

            {/* Bark Texture & Growth Ring Grain Lines */}
            <defs>
              <linearGradient id="trunkWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="35%" stopColor="#854D0E" />
                <stop offset="70%" stopColor="#A16207" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
            <path d="M545 770 Q565 890 555 1060" stroke="#451A03" strokeWidth="5" strokeLinecap="round" opacity="0.6" fill="none" />
            <path d="M575 730 Q555 870 570 1020" stroke="#451A03" strokeWidth="4.5" strokeLinecap="round" opacity="0.6" fill="none" />

            {/* -------------------------------------------------------------
                CANOPY FOLIAGE LAYERS (Lush Emerald, Mint & Sunlit Gold Clouds)
               ------------------------------------------------------------- */}
            {/* Layer 1: Deep Under-Canopy (Dark Emerald #047857) */}
            <circle cx="160" cy="420" r="160" fill="#047857" opacity="0.95" />
            <circle cx="330" cy="420" r="175" fill="#047857" opacity="0.95" />
            <circle cx="560" cy="330" r="215" fill="#047857" opacity="0.95" />
            <circle cx="760" cy="420" r="165" fill="#047857" opacity="0.95" />

            {/* Layer 2: Vibrant Mid-Canopy (#059669) */}
            <circle cx="120" cy="370" r="145" fill={colors.treeLeaves} />
            <circle cx="270" cy="370" r="150" fill={colors.treeLeaves} />
            <circle cx="440" cy="270" r="185" fill={colors.treeLeaves} />
            <circle cx="640" cy="260" r="185" fill={colors.treeLeaves} />
            <circle cx="810" cy="360" r="145" fill={colors.treeLeaves} />
            <circle cx="540" cy="400" r="190" fill={colors.treeLeaves} />

            {/* Layer 3: Sunlit Highlights (#10B981 & #34D399) */}
            <circle cx="200" cy="280" r="130" fill={colors.treeLeavesLight} opacity="0.9" />
            <circle cx="360" cy="230" r="140" fill={colors.treeLeavesLight} opacity="0.9" />
            <circle cx="540" cy="190" r="160" fill={colors.treeLeavesLight} opacity="0.9" />
            <circle cx="710" cy="210" r="140" fill={colors.treeLeavesLight} opacity="0.9" />

            {/* Radiant Sunlit Top Cap */}
            <circle cx="540" cy="150" r="110" fill="#34D399" opacity="0.75" />

            {/* -------------------------------------------------------------
                RIPE GOLDEN & RED FRUITS ON TREE (Fulfilling the Promise!)
               ------------------------------------------------------------- */}
            {[
              { cx: 160, cy: 380 },
              { cx: 250, cy: 320 },
              { cx: 330, cy: 390 },
              { cx: 390, cy: 230 },
              { cx: 480, cy: 190 },
              { cx: 570, cy: 240 },
              { cx: 660, cy: 310 },
              { cx: 750, cy: 400 },
              { cx: 450, cy: 370 },
              { cx: 600, cy: 360 },
              { cx: 700, cy: 440 },
            ].map((fruit, fIdx) => (
              <g key={fIdx}>
                {/* Golden Halo of Harvest Fulfillment */}
                <circle cx={fruit.cx} cy={fruit.cy} r="22" fill="#FDE047" opacity="0.35" />
                {/* Ripe Red Apple Fruit */}
                <circle cx={fruit.cx} cy={fruit.cy} r="15" fill={colors.fruitRed} />
                {/* Specular Shine Highlight */}
                <circle cx={fruit.cx - 4} cy={fruit.cy - 4} r="4" fill="#FFFFFF" />
                {/* Little Fruit Stem */}
                <path
                  d={`M${fruit.cx} ${fruit.cy - 15} Q${fruit.cx + 2} ${fruit.cy - 23} ${fruit.cx + 7} ${fruit.cy - 20}`}
                  stroke="#451A03"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* -----------------------------------------------------------------
            B. PEACEFUL RESTING CHARACTER (Reclining Comfortably on the Left)
               (Positioned at top: 970 to ensure 150px+ clearance above subtitle)
           ----------------------------------------------------------------- */}
        <div
          style={{
            position: "absolute",
            top: 970 + restBreatheY,
            left: 260,
            transform: "rotate(-5deg)",
            transformOrigin: "bottom center",
            zIndex: 25,
          }}
        >
          {/* Subtle Shadow Beneath Reclining Character */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 40,
              width: 240,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.24)",
              filter: "blur(4px)",
            }}
          />

          <MainCharacter
            pose="peaceful"
            scale={1.34}
            flip={false}
          />
        </div>

        {/* -----------------------------------------------------------------
            C. GENTLE BREEZE FALLING LEAVES (Organic Particle Flow)
           ----------------------------------------------------------------- */}
        {leaves.map((l, lIdx) => (
          <div
            key={lIdx}
            style={{
              position: "absolute",
              top: l.y,
              left: l.x,
              transform: `rotate(${l.rot}deg)`,
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28">
              <path
                d="M5 14 Q14 4 23 14 Q14 24 5 14 Z"
                fill={lIdx % 2 === 0 ? colors.treeLeavesLight : "#F59E0B"}
                opacity="0.85"
              />
            </svg>
          </div>
        ))}

        {/* -----------------------------------------------------------------
            D. AYAH TEASER BADGE: "QS. AL-ANBIYA : 37"
               (Pops gracefully when narrator introduces the Quranic verse)
           ----------------------------------------------------------------- */}
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 70,
            zIndex: 35,
          }}
        >
          <PopElement triggerFrame={132} sound="ting" volume={0.18} tilt={-2}>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(14px)",
                border: "2.5px solid #FCD34D",
                boxShadow: "0 12px 30px rgba(245, 158, 11, 0.22)",
                borderRadius: 999,
                padding: "10px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Gold Quran / Star Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
                  fill="#F59E0B"
                />
              </svg>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: 0.5,
                }}
              >
                QS. Al-Anbiya : 37
              </span>
            </div>
          </PopElement>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
