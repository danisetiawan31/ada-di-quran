import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EP02_THEME } from "../theme";
import { MainCharacter } from "./MainCharacter";

export const Scene1OfficePanic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { colors } = EP02_THEME;

  // =========================================================================
  // 1. TIMELINE & CAMERA
  // =========================================================================
  // Phase A (0 - 201): Dramatic Zoom-in on panic
  // Phase B1 (201 - 306): Hopeful expectation (Trophy & Sunrise Calendar)
  // Phase B2 (306 - 558): Gloomy mood shift (Depression & Rain)
  const isPhaseA = frame < 201;
  const isHopeful = frame >= 201 && frame < 306;
  const isGloomy = frame >= 306;

  const cameraZoom = isPhaseA
    ? interpolate(frame, [0, 160], [1.0, 1.16], { extrapolateRight: "clamp" })
    : interpolate(frame, [201, 240], [1.16, 1.0], { extrapolateRight: "clamp" });

  // Mood Lighting Shift (Warm Peach -> Gloomy Slate)
  const gloomProgress = interpolate(frame, [306, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic Background Color
  const bgOpacityGloomy = gloomProgress;

  // =========================================================================
  // 2. GIANT CLOCK ANIMATION (Phase A)
  // =========================================================================
  const minuteHandRot = (frame * 14) % 360;
  const hourHandRot = (frame * 2.5) % 360;
  const secondHandRot = (frame * 36) % 360;

  // Loading Bar Stuck at 10%
  const loadingPulse = Math.sin(frame * 0.25) * 0.15 + 0.85;

  // Thought Bubble Spring (Phase B1)
  const bubbleSpring = spring({
    frame: frame - 205,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const bubbleFade = interpolate(frame, [306, 325], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rain Drops in Gloomy Phase (Phase B2)
  const rainDrops = Array.from({ length: 18 }).map((_, i) => {
    const x = 110 + (i * 24) % 220;
    const y = ((frame * 12 + i * 40) % 200) + 120;
    return { x, y };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgWarmOffice,
        overflow: "hidden",
      }}
    >
      {/* GLOOMY BACKGROUND OVERLAY (Fades in on Phase B2) */}
      <AbsoluteFill
        style={{
          backgroundColor: colors.gloomyBg,
          opacity: bgOpacityGloomy,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* CAMERA RIG CONTAINER */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraZoom})`,
          transformOrigin: "center 60%",
        }}
      >
        {/* =====================================================================
            BACKGROUND OFFICE ELEMENTS (Desk, Window, Giant Clock)
           ===================================================================== */}
        {/* Office Wall Decorative Panels */}
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 90,
            width: 900,
            height: 800,
            borderRadius: 36,
            background: isGloomy
              ? "linear-gradient(180deg, rgba(51, 65, 85, 0.4) 0%, rgba(30, 41, 59, 0.6) 100%)"
              : "linear-gradient(180deg, rgba(254, 215, 170, 0.35) 0%, rgba(255, 237, 213, 0.2) 100%)",
            border: `2px solid ${isGloomy ? "rgba(255,255,255,0.08)" : "rgba(245, 158, 11, 0.2)"}`,
          }}
        />

        {/* GIANT TICKING CLOCK (Top Center) */}
        <div
          style={{
            position: "absolute",
            top: 240,
            left: "50%",
            transform: "translateX(-50%)",
            width: 380,
            height: 380,
            borderRadius: "50%",
            backgroundColor: isGloomy ? "#334155" : "#FFFFFF",
            boxShadow: isGloomy
              ? "0 20px 50px rgba(0,0,0,0.5)"
              : "0 20px 60px rgba(245, 158, 11, 0.25)",
            border: `10px solid ${isGloomy ? "#475569" : colors.amberGold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Clock Ticks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: i % 3 === 0 ? 6 : 3,
                height: i % 3 === 0 ? 18 : 10,
                backgroundColor: isGloomy ? "#94A3B8" : colors.amberDeep,
                transform: `rotate(${i * 30}deg) translateY(-160px)`,
                borderRadius: 4,
              }}
            />
          ))}

          {/* Hour Hand */}
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 100,
              backgroundColor: isGloomy ? "#CBD5E1" : "#0F172A",
              borderRadius: 6,
              transform: `rotate(${hourHandRot}deg)`,
              transformOrigin: "bottom center",
              bottom: "50%",
            }}
          />

          {/* Minute Hand */}
          <div
            style={{
              position: "absolute",
              width: 5,
              height: 145,
              backgroundColor: isGloomy ? "#94A3B8" : "#334155",
              borderRadius: 4,
              transform: `rotate(${minuteHandRot}deg)`,
              transformOrigin: "bottom center",
              bottom: "50%",
            }}
          />

          {/* Rapid Second Hand (Red Alert) */}
          <div
            style={{
              position: "absolute",
              width: 3,
              height: 165,
              backgroundColor: colors.urgentRed,
              borderRadius: 3,
              transform: `rotate(${secondHandRot}deg)`,
              transformOrigin: "bottom center",
              bottom: "50%",
            }}
          />

          {/* Center Pin */}
          <div
            style={{
              position: "absolute",
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: colors.urgentRed,
              boxShadow: "0 0 10px rgba(239, 68, 68, 0.6)",
            }}
          />
        </div>

        {/* =====================================================================
            PHASE A: HOLOGRAPHIC PROGRESS / LOADING BAR (STUCK AT 10%)
           ===================================================================== */}
        {isPhaseA && (
          <div
            style={{
              position: "absolute",
              top: 670,
              left: "50%",
              transform: "translateX(-50%)",
              width: 580,
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              padding: "24px 32px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              border: "2px solid #FDBA74",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* Header: Flashing Warning */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Warning Triangle Icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L1 21H23L12 2Z"
                    fill={colors.urgentRed}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <line x1="12" y1="9" x2="12" y2="14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="12" cy="17" r="1.5" fill="#FFFFFF" />
                </svg>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: colors.urgentRed,
                    opacity: loadingPulse,
                  }}
                />
              </div>

              {/* Vector Hourglass spinning */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: `rotate(${frame * 4}deg)` }}
              >
                <path
                  d="M6 2H18V6L14 10V14L18 18V22H6V18L10 14V10L6 6V2Z"
                  stroke={colors.amberDeep}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="16" r="2" fill={colors.amberGold} />
              </svg>
            </div>

            {/* Progress Track */}
            <div
              style={{
                width: "100%",
                height: 28,
                backgroundColor: "#F1F5F9",
                borderRadius: 14,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Stuck at 10% with warning red/amber stripes */}
              <div
                style={{
                  width: "12%",
                  height: "100%",
                  backgroundColor: colors.urgentRed,
                  borderRadius: 14,
                  boxShadow: `0 0 16px ${colors.urgentRed}`,
                  opacity: loadingPulse,
                }}
              />
            </div>
          </div>
        )}

        {/* =====================================================================
            PHASE B1: THOUGHT BUBBLE (Trophy & Sunrise Calendar - NO TEXT)
           ===================================================================== */}
        {!isPhaseA && bubbleFade > 0 && (
          <div
            style={{
              position: "absolute",
              top: 610,
              left: "50%",
              transform: `translateX(-50%) scale(${bubbleSpring * bubbleFade})`,
              display: "flex",
              alignItems: "center",
              gap: 28,
              backgroundColor: "#FFFFFF",
              borderRadius: 36,
              padding: "24px 36px",
              boxShadow: "0 20px 50px rgba(245, 158, 11, 0.35)",
              border: `3px solid ${colors.amberGold}`,
              zIndex: 30,
            }}
          >
            {/* 1. Golden Trophy Icon (Pure Vector, No Text) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
                {/* Trophy Cup */}
                <path
                  d="M28 20 H72 V48 C72 62 60 70 50 70 C40 70 28 62 28 48 Z"
                  fill="url(#trophyGold)"
                  stroke="#B45309"
                  strokeWidth="3"
                />
                {/* Handles */}
                <path
                  d="M28 26 C12 26 12 50 28 50"
                  fill="none"
                  stroke="url(#trophyGold)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M72 26 C88 26 88 50 72 50"
                  fill="none"
                  stroke="url(#trophyGold)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Stem & Base */}
                <rect x="44" y="70" width="12" height="14" fill="#D97706" />
                <path d="M28 84 H72 L78 94 H22 Z" fill="#92400E" stroke="#78350F" strokeWidth="2" />
                {/* Sparkle Star */}
                <polygon
                  points="50,30 53,38 61,38 55,43 57,51 50,46 43,51 45,43 39,38 47,38"
                  fill="#FFFFFF"
                />
              </svg>
            </div>

            {/* Divider */}
            <div style={{ width: 2, height: 70, backgroundColor: "#E2E8F0" }} />

            {/* 2. Sunrise Calendar Sheet (Pure Vector, No Text) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                {/* Calendar Back Sheet */}
                <rect x="20" y="18" width="60" height="68" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
                {/* Red Top Header */}
                <rect x="20" y="18" width="60" height="22" rx="8" fill="#EF4444" />
                <rect x="20" y="32" width="60" height="8" fill="#EF4444" />
                {/* Binder Rings */}
                <rect x="32" y="12" width="6" height="12" rx="3" fill="#64748B" />
                <rect x="62" y="12" width="6" height="12" rx="3" fill="#64748B" />
                {/* Rising Sun Icon inside */}
                <path d="M30 72 Q50 68 70 72" stroke="#CBD5E1" strokeWidth="2" fill="none" />
                {/* Sun Orb */}
                <circle cx="50" cy="56" r="14" fill="#F59E0B" />
                {/* Sun Rays */}
                {Array.from({ length: 7 }).map((_, rIdx) => {
                  const angle = (rIdx * 25 - 75) * (Math.PI / 180);
                  const x1 = 50 + Math.cos(angle) * 18;
                  const y1 = 56 + Math.sin(angle) * 18;
                  const x2 = 50 + Math.cos(angle) * 25;
                  const y2 = 56 + Math.sin(angle) * 25;
                  return (
                    <line
                      key={rIdx}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#F59E0B"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* =====================================================================
            PHASE B2: GLOOMY RAIN CLOUD OVER CHARACTER
           ===================================================================== */}
        {isGloomy && (
          <div
            style={{
              position: "absolute",
              top: 620,
              left: "50%",
              transform: "translateX(-50%)",
              width: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: gloomProgress,
              zIndex: 35,
            }}
          >
            {/* Fluffy Grey Cloud */}
            <svg width="240" height="110" viewBox="0 0 240 110">
              <path
                d="M40 85 Q20 85 20 65 Q20 45 42 45 Q52 20 85 20 Q120 18 135 40 Q155 30 178 40 Q205 45 205 70 Q215 90 190 90 Z"
                fill="#475569"
                filter="drop-shadow(0 10px 20px rgba(0,0,0,0.4))"
              />
            </svg>

            {/* Falling Animated Rain Drops */}
            <svg
              width="240"
              height="160"
              style={{ position: "absolute", top: 80, overflow: "visible" }}
            >
              {rainDrops.map((d, idx) => (
                <path
                  key={idx}
                  d={`M${d.x} ${d.y} Q${d.x - 2} ${d.y + 12} ${d.x} ${d.y + 16} Q${d.x + 2} ${d.y + 12} ${d.x} ${d.y}`}
                  fill="#60A5FA"
                  opacity={0.7}
                />
              ))}
            </svg>
          </div>
        )}

        {/* =====================================================================
            MAIN CHARACTER (Transitions through poses)
           ===================================================================== */}
        <div
          style={{
            position: "absolute",
            bottom: 260,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
          }}
        >
          <MainCharacter
            pose={
              isPhaseA
                ? "panic"
                : isHopeful
                ? "hopeful"
                : "gloomy"
            }
            scale={1.35}
          />
        </div>

        {/* Modern Office Desk Surface */}
        <div
          style={{
            position: "absolute",
            bottom: 180,
            left: 0,
            width: "100%",
            height: 110,
            backgroundColor: isGloomy ? "#0F172A" : "#78350F",
            borderTop: `6px solid ${isGloomy ? "#334155" : "#92400E"}`,
            boxShadow: "0 -10px 30px rgba(0,0,0,0.18)",
            zIndex: 22,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
