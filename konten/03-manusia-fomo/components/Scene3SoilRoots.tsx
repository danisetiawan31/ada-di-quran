import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EP02_THEME } from "../theme";
import { MainCharacter } from "./MainCharacter";

export const Scene3SoilRoots: React.FC = () => {
  const frame = useCurrentFrame();
  // Relative frame from global frame 915
  const relFrame = Math.max(0, frame - 915);

  const { colors } = EP02_THEME;

  // =========================================================================
  // CAMERA PAN: Surface (0 - 216) -> Dive into Soil (216 - 324)
  // 915 to 1131 is relFrame 0 to 216
  // 1131 to 1239 is relFrame 216 to 324
  // =========================================================================
  const cameraPanY = interpolate(relFrame, [210, 310], [0, -880], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sprout pull bounce in Part A
  const sproutPullY = relFrame < 210 ? Math.sin(relFrame * 0.25) * 8 : 0;

  // Root growth progress in Part B
  const rootGrowth = interpolate(relFrame, [210, 320], [0.1, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glowing energy pulse through roots
  const rootPulse = Math.sin(relFrame * 0.18) * 0.2 + 0.8;

  // Character fades out smoothly during soil dive
  const charOpacity = interpolate(relFrame, [205, 235], [1, 0], {
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
      {/* CAMERA PAN WRAPPER */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 2800,
          transform: `translateY(${cameraPanY}px)`,
        }}
      >
        {/* =====================================================================
            1. SURFACE GARDEN (Top 0 - 1300px)
           ===================================================================== */}
        {/* Sky Background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 950,
            background: "linear-gradient(180deg, #BAE6FD 0%, #FEF9C3 80%, #D9F99D 100%)",
          }}
        />

        {/* Sun & Rays */}
        <circle cx="200" cy="240" r="80" fill="#FDE047" opacity="0.65" />
        <circle cx="200" cy="240" r="140" fill="#FEF08A" opacity="0.3" />

        {/* Distant Trees */}
        <div style={{ position: "absolute", top: 680, left: 60, display: "flex", gap: 30 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 90 + (i % 3) * 20,
                height: 120 + (i % 2) * 30,
                borderRadius: "50% 50% 10% 10%",
                backgroundColor: i % 2 === 0 ? "#10B981" : "#059669",
                opacity: 0.7,
              }}
            />
          ))}
        </div>

        {/* Grass Mound */}
        <div
          style={{
            position: "absolute",
            top: 860,
            left: 0,
            width: "100%",
            height: 100,
            backgroundColor: "#16A34A",
            borderRadius: "50% 50% 0 0 / 30px",
          }}
        />

        {/* Grass Blades Texture */}
        <svg
          width="100%"
          height="60"
          viewBox="0 0 1080 60"
          style={{ position: "absolute", top: 840, left: 0 }}
        >
          {Array.from({ length: 40 }).map((_, gi) => (
            <polygon
              key={gi}
              points={`${gi * 28},60 ${gi * 28 + 6},20 ${gi * 28 + 14},60`}
              fill="#22C55E"
            />
          ))}
        </svg>

        {/* TINY SEEDLING / SPROUT WITH 2 LEAVES */}
        <div
          style={{
            position: "absolute",
            top: 780 - sproutPullY,
            left: 640,
            width: 140,
            height: 140,
            zIndex: 35,
          }}
        >
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* Stem */}
            <path
              d="M70 120 Q68 85 70 50"
              stroke="#15803D"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Leaf */}
            <path
              d="M70 70 Q40 50 35 75 Q55 85 70 75"
              fill="#22C55E"
              stroke="#15803D"
              strokeWidth="2"
            />
            {/* Right Leaf */}
            <path
              d="M70 60 Q100 40 105 65 Q85 75 70 65"
              fill="#4ADE80"
              stroke="#15803D"
              strokeWidth="2"
            />
            {/* Dew drop */}
            <circle cx="48" cy="65" r="3" fill="#FFFFFF" opacity="0.9" />
          </svg>
        </div>

        {/* CHARACTER CROUCHING / IMPATIENT NEXT TO SPROUT */}
        <div
          style={{
            position: "absolute",
            top: 500,
            left: 360,
            zIndex: 40,
            opacity: charOpacity,
          }}
        >
          <MainCharacter pose="impatient" scale={1.25} />
        </div>

        {/* =====================================================================
            2. SOIL CROSS-SECTION (Penampang Tanah Bawah: 940 - 2800px)
           ===================================================================== */}
        <div
          style={{
            position: "absolute",
            top: 940,
            left: 0,
            width: "100%",
            height: 1860,
            background: `linear-gradient(180deg, #15803D 0%, ${colors.soilMid} 4%, ${colors.soilWarm} 25%, ${colors.soilDark} 70%, #170701 100%)`,
          }}
        >
          {/* Soil Organic Matter & Mineral Pebbles */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            {Array.from({ length: 45 }).map((_, pIdx) => {
              const cx = (pIdx * 67) % 1020 + 30;
              const cy = (pIdx * 89) % 1600 + 80;
              const r = 6 + (pIdx % 5) * 3;
              return (
                <ellipse
                  key={pIdx}
                  cx={cx}
                  cy={cy}
                  rx={r}
                  ry={r * 0.7}
                  fill={pIdx % 2 === 0 ? "#A16207" : "#572C05"}
                  opacity="0.45"
                />
              );
            })}
          </svg>

          {/* Golden Seed Capsule in Soil */}
          <div
            style={{
              position: "absolute",
              top: 140,
              left: 640,
              transform: "translate(-50%, -50%)",
              zIndex: 20,
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <ellipse
                cx="50"
                cy="50"
                rx="22"
                ry="30"
                fill="#92400E"
                stroke="#F59E0B"
                strokeWidth="4"
              />
              <circle cx="50" cy="50" r="12" fill="#FBBF24" opacity={rootPulse} />
            </svg>
          </div>

          {/* GLOWING ROOT NETWORK SPREADING DEEP (Akar Keemasan) */}
          <svg
            width="1000"
            height="1500"
            viewBox="0 0 1000 1500"
            style={{
              position: "absolute",
              top: 150,
              left: 140,
              overflow: "visible",
              filter: `drop-shadow(0 0 ${16 * rootPulse}px ${colors.rootGold})`,
            }}
          >
            {/* Primary Tap Root (Akar Tunggang Menembus ke Bawah) */}
            <path
              d={`M500 0 Q${490 + Math.sin(relFrame * 0.1) * 15} 350 510 700 Q495 1050 500 ${1400 * rootGrowth}`}
              fill="none"
              stroke={colors.rootGold}
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Inner Core Light of Tap Root */}
            <path
              d={`M500 0 Q${490 + Math.sin(relFrame * 0.1) * 15} 350 510 700 Q495 1050 500 ${1400 * rootGrowth}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              opacity={0.85}
            />

            {/* Lateral Branch 1 (Left High) */}
            {rootGrowth > 0.25 && (
              <path
                d={`M495 240 Q380 320 220 ${420 * Math.min(1, rootGrowth * 1.5)}`}
                fill="none"
                stroke={colors.rootGold}
                strokeWidth="8"
                strokeLinecap="round"
              />
            )}
            {/* Lateral Branch 2 (Right High) */}
            {rootGrowth > 0.3 && (
              <path
                d={`M505 280 Q640 360 800 ${460 * Math.min(1, rootGrowth * 1.4)}`}
                fill="none"
                stroke={colors.rootGold}
                strokeWidth="8"
                strokeLinecap="round"
              />
            )}

            {/* Lateral Branch 3 (Left Mid) */}
            {rootGrowth > 0.5 && (
              <path
                d={`M500 560 Q340 680 160 ${780 * Math.min(1, rootGrowth * 1.2)}`}
                fill="none"
                stroke={colors.rootGold}
                strokeWidth="7"
                strokeLinecap="round"
              />
            )}

            {/* Lateral Branch 4 (Right Mid) */}
            {rootGrowth > 0.55 && (
              <path
                d={`M508 620 Q680 740 860 ${840 * Math.min(1, rootGrowth * 1.2)}`}
                fill="none"
                stroke={colors.rootGold}
                strokeWidth="7"
                strokeLinecap="round"
              />
            )}

            {/* Sub-branches / Capillaries (Jaringan Akar Halus) */}
            {rootGrowth > 0.75 && (
              <>
                <path d="M280 370 Q220 440 180 500" fill="none" stroke="#FDE047" strokeWidth="4" />
                <path d="M720 410 Q780 480 840 540" fill="none" stroke="#FDE047" strokeWidth="4" />
                <path d="M240 730 Q160 800 120 880" fill="none" stroke="#FDE047" strokeWidth="3.5" />
                <path d="M780 790 Q850 870 920 950" fill="none" stroke="#FDE047" strokeWidth="3.5" />
                <path d="M500 900 Q420 1020 360 1140" fill="none" stroke="#FDE047" strokeWidth="5" />
                <path d="M505 980 Q600 1100 660 1220" fill="none" stroke="#FDE047" strokeWidth="5" />
              </>
            )}

            {/* Golden Energy Particles along Roots */}
            {Array.from({ length: 12 }).map((_, dotIdx) => {
              const py = (dotIdx * 110 + relFrame * 5) % 1300;
              const px = 500 + Math.sin(dotIdx + relFrame * 0.1) * 30;
              return (
                <circle
                  key={dotIdx}
                  cx={px}
                  cy={py}
                  r="5"
                  fill="#FFFFFF"
                  filter={`drop-shadow(0 0 8px ${colors.rootGold})`}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
