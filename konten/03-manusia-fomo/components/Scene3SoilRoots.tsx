import React from "react";
import { AbsoluteFill, Audio, Easing, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { EP02_THEME } from "../theme";
import { MainCharacter } from "./MainCharacter";
import { PopElement } from "../../../src/components/PopElement";

export const Scene3SoilRoots: React.FC = () => {
  const frame = useCurrentFrame();
  // Frame is 0-indexed relative to Scene 3 via Sequence wrapper
  const relFrame = frame;

  const { colors } = EP02_THEME;

  // =========================================================================
  // 1. CINEMATIC CAMERA CHOREOGRAPHY
  // =========================================================================
  // Part A (0 - 210 | Frame 915 - 1125): Full surface garden view
  // Part B (210 - 324 | Frame 1125 - 1239): Macro camera dive into subterranean soil
  const panProgress = interpolate(relFrame, [210, 285], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Camera pans down 1980px to completely clear the surface and center the roots
  const cameraPanY = panProgress * -1980;

  // Comical Sprout pulling bounce in Part A
  const sproutPullBounce = relFrame < 210 ? Math.abs(Math.sin(relFrame * 0.35)) * 16 : 0;

  // Root growth progress in Part B (organic smooth unfolding)
  const rootGrowth = interpolate(relFrame, [215, 305], [0.12, 1.0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glowing energy pulse through the subterranean root network
  const rootPulse = Math.sin(relFrame * 0.16) * 0.2 + 0.8;

  // Character and thought bubble fade as surface moves out of frame during dive
  const charOpacity = interpolate(relFrame, [210, 245], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.skyLight,
        overflow: "hidden",
      }}
    >
      {/* =====================================================================
          AUDIO: CINEMATIC DIVE & ILLUMINATION SFX (Max 2-3 triggers)
         ===================================================================== */}
      {/* 1. Subterranean Dive Whoosh at Frame 210 */}
      <Sequence from={210} durationInFrames={40}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.18} />
      </Sequence>

      {/* 2. Sacred Root Glow Chime/Ting at Frame 275 */}
      <Sequence from={275} durationInFrames={40}>
        <Audio src={staticFile("sfx/ting.wav")} volume={0.15} />
      </Sequence>

      {/* =====================================================================
          CAMERA PAN WRAPPER (Transforms smoothly from Y=0 to Y=-1980px)
         ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 4200,
          transform: `translateY(${cameraPanY}px)`,
        }}
      >
        {/* =====================================================================
            STAGE 1: SURFACE GARDEN (Y: 0 - 1920px)
            (A lush, expansive, welcoming garden filling the entire first screen)
           ===================================================================== */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 1920,
          }}
        >
          {/* Sky Background with Gentle Morning Gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 1100,
              background: "linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 50%, #FEF9C3 85%, #BBF7D0 100%)",
            }}
          />

          {/* Radiant Warm Morning Sun */}
          <div
            style={{
              position: "absolute",
              top: 180,
              left: "50%",
              transform: "translateX(-50%)",
              width: 280,
              height: 280,
              borderRadius: "50%",
              backgroundColor: "#FEF08A",
              opacity: 0.6,
              filter: "blur(28px)",
            }}
          />

          {/* Distant Rolling Hills & Lush Foliage */}
          <svg
            viewBox="0 0 1080 600"
            style={{
              position: "absolute",
              top: 480,
              left: 0,
              width: "100%",
              height: 600,
              pointerEvents: "none",
            }}
          >
            {/* Distant Hill 1 */}
            <path
              d="M0 320 Q280 230 560 290 T1080 260 L1080 600 L0 600 Z"
              fill="#86EFAC"
              opacity="0.75"
            />
            {/* Distant Hill 2 */}
            <path
              d="M0 380 Q360 300 740 360 T1080 330 L1080 600 L0 600 Z"
              fill="#4ADE80"
              opacity="0.85"
            />

            {/* Natural Clustered Garden Trees along the Horizon */}
            {[
              { cx: 140, cy: 330, r: 48, c: "#10B981" },
              { cx: 210, cy: 310, r: 62, c: "#059669" },
              { cx: 280, cy: 340, r: 44, c: "#10B981" },
              { cx: 800, cy: 320, r: 52, c: "#059669" },
              { cx: 870, cy: 300, r: 68, c: "#047857" },
              { cx: 950, cy: 330, r: 46, c: "#10B981" },
            ].map((tree, tIdx) => (
              <circle
                key={tIdx}
                cx={tree.cx}
                cy={tree.cy}
                r={tree.r}
                fill={tree.c}
                opacity="0.9"
              />
            ))}

            {/* Near Garden Lawn Slope */}
            <path
              d="M0 450 Q480 370 1080 430 L1080 600 L0 600 Z"
              fill="#16A34A"
            />
          </svg>

          {/* Flowering Garden Grass Lawn (Y: 980 - 1920) */}
          <div
            style={{
              position: "absolute",
              top: 980,
              left: 0,
              width: "100%",
              height: 940,
              background: "linear-gradient(180deg, #15803D 0%, #15803D 82%, #14532D 93%, #1C1917 100%)",
              borderTop: "6px solid #22C55E",
            }}
          >
            {/* Wildflowers and Clover Accents on Lawn */}
            <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              {[
                { x: 100, y: 120, c: "#FEF08A" },
                { x: 160, y: 220, c: "#FFFFFF" },
                { x: 220, y: 140, c: "#FDE047" },
                { x: 120, y: 380, c: "#FFFFFF" },
                { x: 180, y: 490, c: "#FEF08A" },
                { x: 840, y: 130, c: "#FFFFFF" },
                { x: 920, y: 240, c: "#FEF08A" },
                { x: 990, y: 150, c: "#FDE047" },
                { x: 860, y: 400, c: "#FFFFFF" },
                { x: 940, y: 520, c: "#FEF08A" },
              ].map((f, i) => (
                <circle key={i} cx={f.x} cy={f.y} r="5.5" fill={f.c} opacity="0.85" />
              ))}
            </svg>
          </div>

          {/* -----------------------------------------------------------------
              A. RAISED CEDAR GARDEN BED & SOIL MOUND (Positioned on the Right)
             ----------------------------------------------------------------- */}
          <div
            style={{
              position: "absolute",
              top: 1180,
              left: 530,
              width: 460,
              height: 240,
              zIndex: 35,
            }}
          >
            {/* Raised Garden Planter Box Vector */}
            <svg width="460" height="240" viewBox="0 0 460 240">
              <defs>
                <linearGradient id="woodPlankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#78350F" />
                  <stop offset="25%" stopColor="#92400E" />
                  <stop offset="75%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
                <linearGradient id="fertileSoilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3F2212" />
                  <stop offset="40%" stopColor="#29150B" />
                  <stop offset="100%" stopColor="#1C0D05" />
                </linearGradient>
              </defs>

              {/* Garden Bed Drop Shadow on Lawn */}
              <ellipse cx="230" cy="220" rx="210" ry="16" fill="rgba(0,0,0,0.3)" />

              {/* Wooden Planter Box Body */}
              <rect
                x="30"
                y="95"
                width="400"
                height="115"
                rx="14"
                fill="url(#woodPlankGrad)"
                stroke="#451A03"
                strokeWidth="3.5"
              />
              {/* Wood Planks Division Line */}
              <line x1="30" y1="152" x2="430" y2="152" stroke="#451A03" strokeWidth="2.5" opacity="0.7" />

              {/* Corner Joint Brackets */}
              <rect x="25" y="90" width="22" height="125" rx="5" fill="#451A03" />
              <rect x="413" y="90" width="22" height="125" rx="5" fill="#451A03" />

              {/* Rich Dark Compost Soil Mound */}
              <ellipse cx="230" cy="95" rx="190" ry="35" fill="url(#fertileSoilGrad)" stroke="#1C0D05" strokeWidth="2" />

              {/* Tiny Soil Pebbles */}
              <circle cx="150" cy="90" r="4" fill="#78350F" opacity="0.6" />
              <circle cx="310" cy="98" r="5" fill="#78350F" opacity="0.5" />
              <circle cx="210" cy="104" r="3.5" fill="#A16207" opacity="0.6" />

              {/* Wooden Plant Marker Tag (🏷️ 🌱) */}
              <rect x="360" y="45" width="8" height="55" rx="2" fill="#D97706" />
              <rect x="345" y="30" width="38" height="25" rx="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
              <circle cx="364" cy="42" r="4.5" fill="#16A34A" />
            </svg>

            {/* Tiny Tender Seedling Sprout with Pulling Bounce Animation (Scaled 1.25x) */}
            <div
              style={{
                position: "absolute",
                top: -38 - sproutPullBounce,
                left: 160,
                width: 160,
                height: 160,
                zIndex: 40,
              }}
            >
              <svg width="160" height="160" viewBox="0 0 160 160">
                {/* Tender Green Stem (Stretches when pulled) */}
                <path
                  d={`M80 135 Q${78 + sproutPullBounce * 0.4} ${85 - sproutPullBounce * 0.5} 80 ${50 - sproutPullBounce}`}
                  stroke="#16A34A"
                  strokeWidth="9"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Left Leaf (Bounces) */}
                <path
                  d={`M80 ${72 - sproutPullBounce} Q40 ${42 - sproutPullBounce} 32 ${76 - sproutPullBounce} Q60 ${90 - sproutPullBounce} 80 ${78 - sproutPullBounce}`}
                  fill="#22C55E"
                  stroke="#15803D"
                  strokeWidth="3"
                />

                {/* Right Leaf */}
                <path
                  d={`M80 ${62 - sproutPullBounce} Q120 ${32 - sproutPullBounce} 128 ${66 - sproutPullBounce} Q102 ${80 - sproutPullBounce} 80 ${70 - sproutPullBounce}`}
                  fill="#4ADE80"
                  stroke="#15803D"
                  strokeWidth="3"
                />

                {/* Glistening Morning Dewdrop */}
                <circle cx="54" cy={65 - sproutPullBounce} r="4" fill="#FFFFFF" opacity="0.95" />
              </svg>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              B. MICRO THOUGHT BUBBLE: "MAUNYA LANGSUNG PANEN APEL!" 🍎
                 (Visualizing the comical instant gratification expectation)
                 Integrated with PopElement for playful bouncy entrance & SFX
             ----------------------------------------------------------------- */}
          {relFrame < 210 && (
            <div
              style={{
                position: "absolute",
                top: 730,
                left: 170,
                zIndex: 45,
                opacity: charOpacity,
                transformOrigin: "bottom center",
              }}
            >
              <PopElement triggerFrame={70} sound="pop" volume={0.22} tilt={-5}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transform: "scale(1.15)",
                    transformOrigin: "bottom center",
                  }}
                >
                  {/* Thought Card Container */}
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 22,
                      padding: "14px 22px",
                      boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
                      border: "2.5px solid #FCD34D",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    {/* Lush Apple Fruit Vector */}
                    <svg width="48" height="48" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F87171" />
                          <stop offset="50%" stopColor="#EF4444" />
                          <stop offset="100%" stopColor="#B91C1C" />
                        </linearGradient>
                      </defs>
                      {/* Stem & Leaf */}
                      <path d="M50 22 Q52 8 62 6" fill="none" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
                      <path d="M56 16 Q72 8 76 22 Q64 26 56 16 Z" fill="#22C55E" />
                      {/* Apple Body */}
                      <path
                        d="M50 28 C40 22 20 25 18 48 C16 75 35 92 50 92 C65 92 84 75 82 48 C80 25 60 22 50 28 Z"
                        fill="url(#appleGrad)"
                      />
                      {/* Apple Sparkle Shine */}
                      <ellipse cx="34" cy="45" rx="6" ry="14" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 34 45)" />
                    </svg>

                    {/* Expectation Text */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#DC2626", textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Besok Pagi?
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>
                        Langsung Berbuah
                      </span>
                    </div>
                  </div>

                  {/* Trailing Dots connecting to character */}
                  <div
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                      border: "2px solid #FCD34D",
                      marginTop: 8,
                    }}
                  />
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                      border: "1.5px solid #FCD34D",
                      marginTop: 5,
                    }}
                  />
                </div>
              </PopElement>
            </div>
          )}

          {/* -----------------------------------------------------------------
              C. MAIN CHARACTER (Standing on Left side, looking at the Sprout)
             ----------------------------------------------------------------- */}
          <div
            style={{
              position: "absolute",
              top: 1010,
              left: 160,
              zIndex: 42,
              opacity: charOpacity,
            }}
          >
            <MainCharacter
              pose="impatient"
              scale={1.38}
              flip={false}
            />
          </div>
        </div>

        {/* =====================================================================
            STAGE 2: SUBTERRANEAN EARTH & SACRED ROOTS (Y: 1920 - 4200px)
            (Rich geological strata & bioluminescent fractal root network.
             100% hidden in Part A, gloriously revealed during vertical pan dive)
           ===================================================================== */}
        <div
          style={{
            position: "absolute",
            top: 1920,
            left: 0,
            width: "100%",
            height: 2280,
          }}
        >
          {/* GEOLOGICAL STRATIFICATION LAYERS */}
          {/* Layer 1: Topsoil Humus (Rich Dark Loam: 0 - 520) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 520,
              background: "linear-gradient(180deg, #1C1917 0%, #292524 100%)",
            }}
          />

          {/* Layer 2: Warm Clay Subsoil (520 - 1200) */}
          <div
            style={{
              position: "absolute",
              top: 520,
              left: 0,
              width: "100%",
              height: 680,
              background: `linear-gradient(180deg, #292524 0%, ${colors.soilWarm} 45%, ${colors.soilDark} 100%)`,
            }}
          />

          {/* Layer 3: Deep Bedrock & Mineral Crust (1200 - 2280) */}
          <div
            style={{
              position: "absolute",
              top: 1200,
              left: 0,
              width: "100%",
              height: 1080,
              background: "linear-gradient(180deg, #3B1B06 0%, #1A0A02 50%, #090300 100%)",
            }}
          />

          {/* Soil Mineral Grains & Sediment Particles */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            {Array.from({ length: 75 }).map((_, pIdx) => {
              const cx = (pIdx * 73) % 1040 + 20;
              const cy = (pIdx * 97) % 2100 + 40;
              const r = 4 + (pIdx % 6) * 2.5;
              return (
                <ellipse
                  key={pIdx}
                  cx={cx}
                  cy={cy}
                  rx={r}
                  ry={r * 0.65}
                  fill={pIdx % 3 === 0 ? "#F59E0B" : pIdx % 2 === 0 ? "#D97706" : "#78350F"}
                  opacity={pIdx % 3 === 0 ? "0.35" : "0.5"}
                />
              );
            })}
          </svg>

          {/* -----------------------------------------------------------------
              GOLDEN SACRED SEED CAPSULE (Positioned at Y: 360 within Earth)
              (Lands at screen Y = 300px after pan, safely below watermark)
             ----------------------------------------------------------------- */}
          <div
            style={{
              position: "absolute",
              top: 360,
              left: 540,
              transform: "translate(-50%, -50%)",
              zIndex: 30,
            }}
          >
            <svg width="150" height="150" viewBox="0 0 150 150">
              <defs>
                <radialGradient id="seedAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Pulsing Aura */}
              <circle cx="75" cy="75" r={58 * rootPulse} fill="url(#seedAura)" />

              {/* Outer Seed Shell */}
              <ellipse
                cx="75"
                cy="75"
                rx="28"
                ry="40"
                fill="#92400E"
                stroke="#F59E0B"
                strokeWidth="5"
              />

              {/* Glowing Embryo Core */}
              <circle cx="75" cy="75" r={17} fill="#FDE047" opacity={rootPulse} />
              <circle cx="75" cy="75" r={8.5} fill="#FFFFFF" />
            </svg>
          </div>

          {/* -----------------------------------------------------------------
              BIOLUMINESCENT FRACTAL ROOT NETWORK (Organic Asymmetric Dendrites)
              (Stops cleanly at screen Y = 1450, leaving subtitle safe zone dark)
             ----------------------------------------------------------------- */}
          <svg
            width="1080"
            height="1250"
            viewBox="0 0 1080 1250"
            style={{
              position: "absolute",
              top: 360,
              left: 0,
              overflow: "visible",
              filter: `drop-shadow(0 0 ${18 * rootPulse}px rgba(245, 158, 11, 0.85)) drop-shadow(0 0 36px rgba(251, 191, 36, 0.5))`,
            }}
          >
            {/* 1. PRIMARY ORGANIC TAPROOT (Akar Tunggang Utama Menghunjam ke Bawah) */}
            <path
              d={`M540 0 C530 180 555 360 545 540 C535 720 550 900 540 ${1050 * rootGrowth}`}
              fill="none"
              stroke={colors.rootGold}
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* White Luminous Core of Taproot */}
            <path
              d={`M540 0 C530 180 555 360 545 540 C535 720 550 900 540 ${1050 * rootGrowth}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
              opacity={0.9}
            />

            {/* 2. ASYMMETRIC STAGGERED BIFURCATING LATERAL BRANCHES */}
            {/* Branch 1 (Upper Left - Origin 538, 140) */}
            {rootGrowth > 0.18 && (
              <g>
                <path
                  d={`M538 140 Q430 155 330 205 Q230 265 160 ${360 * Math.min(1, rootGrowth * 1.5)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Fork 1A */}
                <path
                  d={`M330 205 Q260 225 190 ${275 * Math.min(1, rootGrowth * 1.4)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Branch 2 (Upper Right - Origin 542, 230 - Staggered Lower) */}
            {rootGrowth > 0.25 && (
              <g>
                <path
                  d={`M542 230 Q650 250 760 305 Q870 370 940 ${490 * Math.min(1, rootGrowth * 1.4)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Fork 2A */}
                <path
                  d={`M760 305 Q850 330 920 ${390 * Math.min(1, rootGrowth * 1.35)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Branch 3 (Mid Left - Origin 539, 390) */}
            {rootGrowth > 0.42 && (
              <g>
                <path
                  d={`M539 390 Q430 420 330 490 Q230 575 160 ${710 * Math.min(1, rootGrowth * 1.25)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                {/* Fork 3A */}
                <path
                  d={`M330 490 Q250 520 180 ${590 * Math.min(1, rootGrowth * 1.2)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Branch 4 (Mid Right - Origin 541, 510 - Staggered) */}
            {rootGrowth > 0.52 && (
              <g>
                <path
                  d={`M541 510 Q650 535 760 610 Q850 690 920 ${820 * Math.min(1, rootGrowth * 1.25)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                {/* Fork 4A */}
                <path
                  d={`M760 610 Q840 635 910 ${710 * Math.min(1, rootGrowth * 1.2)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Branch 5 (Deep Left - Origin 538, 670) */}
            {rootGrowth > 0.65 && (
              <g>
                <path
                  d={`M538 670 Q440 710 350 780 Q250 860 180 ${980 * Math.min(1, rootGrowth * 1.15)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Fork 5A */}
                <path
                  d={`M350 780 Q280 830 210 ${910 * Math.min(1, rootGrowth * 1.15)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Branch 6 (Deep Right - Origin 542, 790 - Staggered) */}
            {rootGrowth > 0.72 && (
              <g>
                <path
                  d={`M542 790 Q640 825 730 895 Q820 970 880 ${1050 * Math.min(1, rootGrowth * 1.12)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Fork 6A */}
                <path
                  d={`M730 895 Q810 935 870 ${1010 * Math.min(1, rootGrowth * 1.12)}`}
                  fill="none"
                  stroke={colors.rootGold}
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* 3. TIER 2 & TIER 3 SUB-BRANCHES & CAPILLARY ROOTLETS (Fraktal Halus) */}
            {rootGrowth > 0.6 && (
              <>
                {/* Upper Left Tendrils */}
                <path d="M250 240 C190 280 140 340 100 410" fill="none" stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M190 275 C140 330 110 400 80 470" fill="none" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
                {/* Upper Right Tendrils */}
                <path d="M840 340 C900 390 950 450 990 520" fill="none" stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M870 410 C920 470 960 540 990 610" fill="none" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />

                {/* Mid Left Tendrils */}
                <path d="M260 530 C190 580 140 650 100 730" fill="none" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
                <path d="M180 590 C130 660 90 730 70 810" fill="none" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
                {/* Mid Right Tendrils */}
                <path d="M820 650 C890 705 940 770 980 840" fill="none" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
                <path d="M860 720 C920 780 960 850 990 920" fill="none" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />

                {/* Deep Earth Tendrils (Anchoring outwards, strictly above Y = 1120) */}
                <path d="M280 830 C220 880 160 940 120 1010" fill="none" stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M800 930 C860 975 910 1030 950 1080" fill="none" stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M210 910 C160 960 120 1020 90 1070" fill="none" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
              </>
            )}

            {/* 4. LUMINOUS NUTRIENT METABOLISM PARTICLES (Mengalir naik ke biji) */}
            {/* Particles ascending along central taproot */}
            {Array.from({ length: 14 }).map((_, dotIdx) => {
              const py = ((dotIdx * 80 - relFrame * 5.5) % (1020 * rootGrowth) + 1020 * rootGrowth) % (1020 * rootGrowth);
              const px = 540 + Math.sin(dotIdx * 2 + relFrame * 0.12) * 16;
              return (
                <circle
                  key={`tap-${dotIdx}`}
                  cx={px}
                  cy={py}
                  r={4 + (dotIdx % 3)}
                  fill="#FFFFFF"
                  filter="drop-shadow(0 0 10px #FEF08A)"
                />
              );
            })}
            {/* Particles flowing inward along branches */}
            {rootGrowth > 0.5 &&
              [
                { startX: 200, startY: 250, endX: 538, endY: 140 },
                { startX: 880, startY: 350, endX: 542, endY: 230 },
                { startX: 220, startY: 550, endX: 539, endY: 390 },
                { startX: 860, startY: 670, endX: 541, endY: 510 },
              ].map((branch, bIdx) => {
                const bProgress = ((relFrame * 0.04 + bIdx * 0.25) % 1);
                const curX = branch.startX + (branch.endX - branch.startX) * bProgress;
                const curY = branch.startY + (branch.endY - branch.startY) * bProgress;
                return (
                  <circle
                    key={`b-dot-${bIdx}`}
                    cx={curX}
                    cy={curY}
                    r={3.5}
                    fill="#FEF08A"
                    filter="drop-shadow(0 0 8px #FDE047)"
                  />
                );
              })}
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
