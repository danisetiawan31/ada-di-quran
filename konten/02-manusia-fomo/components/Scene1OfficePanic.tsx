import React from "react";
import { AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { EP02_THEME } from "../theme";
import { MainCharacter } from "./MainCharacter";
import { PopElement } from "../../../src/components/PopElement";

export const Scene1OfficePanic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { colors } = EP02_THEME;

  // =========================================================================
  // 1. TIMELINE & CAMERA
  // =========================================================================
  // Phase A (0 - 201): Dramatic Zoom-in on panic & impatience
  // Phase B1 (201 - 306): Hopeful expectation (Trophy & Sunrise Calendar)
  // Phase B2 (306 - 558): Gloomy mood shift (Depression & Rain)
  const isPhaseA = frame < 201;
  const isHopeful = frame >= 201 && frame < 306;
  const isGloomy = frame >= 306;

  // Cinematic Camera Zoom with Smooth Easing (UI/UX Pro Max Standard)
  const cameraZoom = isPhaseA
    ? interpolate(frame, [0, 150], [1.0, 1.10], {
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        extrapolateRight: "clamp",
      })
    : interpolate(frame, [201, 240], [1.10, 1.0], {
        easing: Easing.out(Easing.cubic),
        extrapolateRight: "clamp",
      });

  // Mood Lighting Shift (Warm Peach -> Gloomy Slate)
  const gloomProgress = interpolate(frame, [306, 360], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 2. GIANT CLOCK ANIMATION
  // =========================================================================
  const minuteHandRot = (frame * 14) % 360;
  const hourHandRot = (frame * 2.5) % 360;
  const secondHandRot = (frame * 36) % 360;
  const clockJitter = isPhaseA ? Math.sin(frame * 1.2) * 1.2 : 0;

  // =========================================================================
  // 3. PHASE A: LOADING BAR ANIMATION (STUCK AT 10%)
  // =========================================================================
  const loadingPulse = Math.sin(frame * 0.25) * 0.15 + 0.85;
  const loadingJitter = isPhaseA ? Math.sin(frame * 0.9) * 2 : 0;

  // =========================================================================
  // 4. PHASE B1: THOUGHT BUBBLE SPRING & TRAILING DOTS
  // =========================================================================
  const bubbleSpring = spring({
    frame: frame - 205,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const bubbleFade = interpolate(frame, [300, 318], [1, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 5. PHASE B2: RAIN DROPS (Falling directly onto character's head & shoulders)
  // =========================================================================
  const rainDrops = Array.from({ length: 22 }).map((_, i) => {
    const x = 45 + (i * 26) % 250;
    // Drops fall over a 380px vertical trajectory directly reaching the character's head
    const dropProgress = ((frame * 16 + i * 42) % 370);
    return { x, y: dropProgress, index: i };
  });

  // =========================================================================
  // 6. DESK PROPS: STEAM FROM COFFEE MUG
  // =========================================================================
  const steamOffset1 = (frame * 1.6) % 45;
  const steamOffset2 = ((frame + 22) * 1.6) % 45;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgWarmOffice,
        overflow: "hidden",
      }}
    >
      {/* =========================================================================
          AUDIO: STORYTELLING MICRO-SFX (Viewer-Centric)
         ========================================================================= */}
      {/* 1. Subtle Clock Tick when loading bar is struggling at Frame 35 */}
      <Sequence from={35} durationInFrames={20}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.15} />
      </Sequence>

      {/* 2. Emotional Gloom Drop at Frame 306 (Sudden shift to dark room & rain) */}
      <Sequence from={306} durationInFrames={40}>
        <Audio src={staticFile("sfx/fader.wav")} volume={0.16} />
      </Sequence>

      {/* GLOOMY BACKGROUND OVERLAY (Fades in smoothly on Phase B2) */}
      <AbsoluteFill
        style={{
          backgroundColor: colors.gloomyBg,
          opacity: gloomProgress,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* CAMERA RIG CONTAINER */}
      <AbsoluteFill
        style={{
          transform: `scale(${cameraZoom})`,
          transformOrigin: "center 55%",
        }}
      >
        {/* =====================================================================
            A. BACKGROUND WALL DECORATION
           ===================================================================== */}
        {/* Modern Minimal Arch Panel behind Clock & Character */}
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 90,
            width: 900,
            height: 1260,
            borderRadius: "450px 450px 40px 40px",
            background: isGloomy
              ? "linear-gradient(180deg, rgba(51, 65, 85, 0.45) 0%, rgba(30, 41, 59, 0.7) 100%)"
              : "linear-gradient(180deg, rgba(254, 215, 170, 0.45) 0%, rgba(255, 237, 213, 0.25) 100%)",
            border: `2px solid ${isGloomy ? "rgba(255,255,255,0.08)" : "rgba(245, 158, 11, 0.22)"}`,
          }}
        />

        {/* =====================================================================
            B. GIANT TICKING CLOCK (Centered safely below Watermark)
           ===================================================================== */}
        <div
          style={{
            position: "absolute",
            top: 255,
            left: "50%",
            transform: `translateX(-50%) translate(${clockJitter}px, 0px)`,
            width: 340,
            height: 340,
            borderRadius: "50%",
            backgroundColor: isGloomy ? "#1E293B" : "#FFFFFF",
            boxShadow: isGloomy
              ? "0 20px 50px rgba(0,0,0,0.6)"
              : "0 20px 60px rgba(245, 158, 11, 0.28)",
            border: `10px solid ${isGloomy ? "#64748B" : colors.amberGold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
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
                backgroundColor: isGloomy ? (i % 3 === 0 ? "#FFFFFF" : "#94A3B8") : colors.amberDeep,
                transform: `rotate(${i * 30}deg) translateY(-140px)`,
                borderRadius: 4,
              }}
            />
          ))}

          {/* Hour Hand (High contrast white in dark mode) */}
          <div
            style={{
              position: "absolute",
              width: 8,
              height: 85,
              backgroundColor: isGloomy ? "#FFFFFF" : "#0F172A",
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
              height: 125,
              backgroundColor: isGloomy ? "#F1F5F9" : "#334155",
              borderRadius: 4,
              transform: `rotate(${minuteHandRot}deg)`,
              transformOrigin: "bottom center",
              bottom: "50%",
            }}
          />

          {/* Rapid Second Hand (Red Alert with Glowing Core) */}
          <div
            style={{
              position: "absolute",
              width: 3.5,
              height: 145,
              backgroundColor: colors.urgentRed,
              borderRadius: 3,
              transform: `rotate(${secondHandRot}deg)`,
              transformOrigin: "bottom center",
              bottom: "50%",
              boxShadow: "0 0 8px rgba(239, 68, 68, 0.8)",
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
              boxShadow: "0 0 12px rgba(239, 68, 68, 0.8)",
            }}
          />
        </div>

        {/* =====================================================================
            C. PHASE A: HOLOGRAPHIC PROGRESS / LOADING BAR (STUCK AT 10%)
           ===================================================================== */}
        {isPhaseA && (
          <div
            style={{
              position: "absolute",
              top: 630,
              left: "50%",
              transform: `translateX(-50%) translate(${loadingJitter}px, 0px)`,
              zIndex: 15,
            }}
          >
            <PopElement triggerFrame={8} sound="btn_pop" volume={0.18}>
              <div
                style={{
                  width: 620,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 24,
                  padding: "18px 26px",
                  boxShadow: "0 18px 45px rgba(239, 68, 68, 0.16)",
                  border: "2.5px solid #FDBA74",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
            {/* Header: Flashing Warning + Clear Text Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Status Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* SVG Warning Triangle */}
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L1 21H23L12 2Z"
                    fill={colors.urgentRed}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <line x1="12" y1="9" x2="12" y2="14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="12" cy="17" r="1.5" fill="#FFFFFF" />
                </svg>

                {/* Pill Status Badge */}
                <div
                  style={{
                    backgroundColor: "#FEE2E2",
                    border: "1.5px solid #FCA5A5",
                    borderRadius: 999,
                    padding: "4px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: colors.urgentRed,
                      opacity: loadingPulse,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#DC2626",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    10% · STUCK
                  </span>
                </div>
              </div>

              {/* Vector Spinning Hourglass */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: `rotate(${frame * 4}deg)` }}
              >
                <path
                  d="M6 2H18V6L14 10V14L18 18V22H6V18L10 14V10L6 6V2Z"
                  stroke={colors.amberDeep}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="16" r="2.5" fill={colors.amberGold} />
              </svg>
            </div>

            {/* Progress Track */}
            <div
              style={{
                width: "100%",
                height: 26,
                backgroundColor: "#F1F5F9",
                borderRadius: 13,
                overflow: "hidden",
                position: "relative",
                border: "1px solid #E2E8F0",
              }}
            >
              {/* Stuck at 10% with warning pulse */}
              <div
                style={{
                  width: "10%",
                  height: "100%",
                  backgroundColor: colors.urgentRed,
                  borderRadius: 13,
                  boxShadow: `0 0 16px ${colors.urgentRed}`,
                  opacity: loadingPulse,
                }}
              />
            </div>
          </div>
        </PopElement>
      </div>
    )}

        {/* =====================================================================
            D. PHASE B1: THOUGHT BUBBLE WITH SEAMLESS TRAILING DOT CHAIN
           ===================================================================== */}
        {!isPhaseA && bubbleFade > 0 && (
          <>
            {/* Trailing Dot 1 (Closest to character's head) */}
            <div
              style={{
                position: "absolute",
                top: 925,
                left: "53.5%",
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                border: `2px solid ${colors.amberGold}`,
                boxShadow: "0 4px 10px rgba(245, 158, 11, 0.25)",
                transform: `scale(${bubbleSpring * bubbleFade})`,
                zIndex: 28,
              }}
            />

            {/* Trailing Dot 2 */}
            <div
              style={{
                position: "absolute",
                top: 880,
                left: "55%",
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                border: `2.5px solid ${colors.amberGold}`,
                boxShadow: "0 6px 14px rgba(245, 158, 11, 0.25)",
                transform: `scale(${bubbleSpring * bubbleFade})`,
                zIndex: 28,
              }}
            />

            {/* Trailing Dot 3 */}
            <div
              style={{
                position: "absolute",
                top: 830,
                left: "56.5%",
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                border: `3px solid ${colors.amberGold}`,
                boxShadow: "0 8px 18px rgba(245, 158, 11, 0.25)",
                transform: `scale(${bubbleSpring * bubbleFade})`,
                zIndex: 28,
              }}
            />

            {/* Trailing Dot 4 (Largest before thought card) */}
            <div
              style={{
                position: "absolute",
                top: 775,
                left: "58%",
                width: 38,
                height: 38,
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                border: `3px solid ${colors.amberGold}`,
                boxShadow: "0 10px 22px rgba(245, 158, 11, 0.25)",
                transform: `scale(${bubbleSpring * bubbleFade})`,
                zIndex: 28,
              }}
            />

            {/* Main Thought Cloud Card */}
            <div
              style={{
                position: "absolute",
                top: 615,
                left: "50%",
                transform: `translateX(-50%) scale(${bubbleFade})`,
                zIndex: 30,
              }}
            >
              <PopElement triggerFrame={205} sound="pop" volume={0.22} tilt={-6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 36,
                    padding: "22px 36px",
                    boxShadow: "0 20px 50px rgba(245, 158, 11, 0.35)",
                    border: `3.5px solid ${colors.amberGold}`,
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
                <svg width="95" height="95" viewBox="0 0 100 100">
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
                <svg width="95" height="95" viewBox="0 0 100 100">
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
          </PopElement>
        </div>
      </>
    )}

        {/* =====================================================================
            E. PHASE B2: GLOOMY RAIN CLOUD OVER CHARACTER
               (Drops land directly on character's head and shoulders)
           ===================================================================== */}
        {isGloomy && (
          <div
            style={{
              position: "absolute",
              top: 610,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 35,
            }}
          >
            <PopElement triggerFrame={306} sound="whip" volume={0.20} tilt={3}>
              <div
                style={{
                  width: 340,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: gloomProgress,
                }}
              >
                {/* Fluffy Dark Cloud */}
                <svg width="260" height="120" viewBox="0 0 240 110">
                  <path
                    d="M40 85 Q20 85 20 65 Q20 45 42 45 Q52 20 85 20 Q120 18 135 40 Q155 30 178 40 Q205 45 205 70 Q215 90 190 90 Z"
                    fill="#475569"
                    filter="drop-shadow(0 12px 24px rgba(0,0,0,0.5))"
                  />
                </svg>

                {/* Falling Animated Rain Drops (Deep vertical trajectory) */}
                <svg
                  width="280"
                  height="400"
                  style={{ position: "absolute", top: 80, overflow: "visible" }}
                >
                  {rainDrops.map((d) => (
                    <g key={d.index}>
                      {/* Rain droplet */}
                      <path
                        d={`M${d.x} ${d.y} Q${d.x - 2} ${d.y + 14} ${d.x} ${d.y + 18} Q${d.x + 2} ${d.y + 14} ${d.x} ${d.y}`}
                        fill="#60A5FA"
                        opacity={d.y > 330 ? 0.3 : 0.85}
                      />
                      {/* Splash ripple on impact near character head (y > 310) */}
                      {d.y > 310 && (
                        <circle
                          cx={d.x}
                          cy={d.y + 16}
                          r={(d.y - 310) * 0.45}
                          fill="none"
                          stroke="#93C5FD"
                          strokeWidth="1.5"
                          opacity={(370 - d.y) / 60}
                        />
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            </PopElement>
          </div>
        )}

        {/* =====================================================================
            F. MAIN CHARACTER (Scale: 1.55 for prominent mobile readability)
           ===================================================================== */}
        <div
          style={{
            position: "absolute",
            bottom: 300,
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
            scale={1.55}
          />
        </div>

        {/* =====================================================================
            G. MODERN WORKSPACE DESK & FOREGROUND PROPS (Z-Index: 25)
               (Crops lower body naturally and protects subtitle safe area)
           ===================================================================== */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 510,
            zIndex: 25,
            pointerEvents: "none",
          }}
        >
          {/* Desk Tabletop Bevel / Surface Edge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 32,
              background: isGloomy
                ? "linear-gradient(90deg, #1E293B 0%, #334155 50%, #1E293B 100%)"
                : "linear-gradient(90deg, #9A3412 0%, #B45309 50%, #9A3412 100%)",
              borderTop: `4px solid ${isGloomy ? "#475569" : "#FDBA74"}`,
              boxShadow: "0 -8px 25px rgba(0,0,0,0.22)",
            }}
          />

          {/* Desk Front Apron Panel */}
          <div
            style={{
              position: "absolute",
              top: 32,
              left: 0,
              width: "100%",
              bottom: 0,
              backgroundColor: isGloomy ? "#0F172A" : "#7C2D12",
              borderTop: `2px solid ${isGloomy ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.15)"}`,
            }}
          />

          {/* -----------------------------------------------------------------
              OFFICE DESK PROP 1: Modern Laptop (Center Foreground)
             ----------------------------------------------------------------- */}
          <div
            style={{
              position: "absolute",
              top: -150,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Screen Lid (Back View) */}
            <div
              style={{
                width: 290,
                height: 160,
                borderRadius: "12px 12px 2px 2px",
                backgroundColor: isGloomy ? "#334155" : "#1E293B",
                border: "2px solid rgba(255,255,255,0.14)",
                boxShadow: isGloomy
                  ? "0 -15px 30px rgba(0,0,0,0.5)"
                  : "0 -18px 40px rgba(56, 189, 248, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Minimal Glowing Tech Emblem */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: isGloomy ? "#64748B" : "#38BDF8",
                  boxShadow: isGloomy
                    ? "none"
                    : "0 0 18px rgba(56, 189, 248, 0.9)",
                }}
              />
              {/* Soft Screen Glow upward onto character's face */}
              <div
                style={{
                  position: "absolute",
                  top: -22,
                  width: 260,
                  height: 35,
                  background: isGloomy
                    ? "radial-gradient(ellipse at center, rgba(148, 163, 184, 0.15) 0%, transparent 70%)"
                    : "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.45) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Laptop Base Hinge */}
            <div
              style={{
                width: 320,
                height: 14,
                borderRadius: "0 0 8px 8px",
                backgroundColor: isGloomy ? "#1E293B" : "#0F172A",
                boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* -----------------------------------------------------------------
              OFFICE DESK PROP 2: Steaming Coffee Mug (Right Foreground)
             ----------------------------------------------------------------- */}
          <div
            style={{
              position: "absolute",
              top: -75,
              left: "74%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Animated Steam Waves */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 40 40"
              style={{
                position: "absolute",
                top: -36,
                opacity: isGloomy ? 0.3 : 0.8,
              }}
            >
              {/* Steam Wave 1 */}
              <path
                d={`M14 ${35 - steamOffset1} Q10 ${25 - steamOffset1} 14 ${15 - steamOffset1} Q18 ${5 - steamOffset1} 14 -5`}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity={Math.max(0, 1 - steamOffset1 / 40)}
              />
              {/* Steam Wave 2 */}
              <path
                d={`M24 ${35 - steamOffset2} Q28 ${25 - steamOffset2} 24 ${15 - steamOffset2} Q20 ${5 - steamOffset2} 24 -5`}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity={Math.max(0, 1 - steamOffset2 / 40)}
              />
            </svg>

            {/* Mug Body */}
            <div
              style={{
                width: 54,
                height: 64,
                borderRadius: "4px 4px 14px 14px",
                backgroundColor: isGloomy ? "#475569" : "#FFFFFF",
                boxShadow: "0 10px 20px rgba(0,0,0,0.22)",
                border: "2px solid rgba(0,0,0,0.08)",
                position: "relative",
              }}
            >
              {/* Mug Handle */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: -16,
                  width: 16,
                  height: 32,
                  borderRadius: "0 12px 12px 0",
                  border: `4px solid ${isGloomy ? "#475569" : "#FFFFFF"}`,
                  borderLeft: "none",
                }}
              />
              {/* Amber Coffee Surface */}
              <div
                style={{
                  position: "absolute",
                  top: 5,
                  left: 5,
                  width: 44,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#78350F",
                }}
              />
            </div>
          </div>

          {/* -----------------------------------------------------------------
              OFFICE DESK PROP 3: Sticky Notes & Pen (Left Foreground)
             ----------------------------------------------------------------- */}
          <div
            style={{
              position: "absolute",
              top: -45,
              left: "16%",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Mint Sticky Note Pad (Underneath) */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 5,
                backgroundColor: isGloomy ? "#64748B" : "#A7F3D0",
                transform: "rotate(-8deg)",
                boxShadow: "0 6px 12px rgba(0,0,0,0.18)",
              }}
            />
            {/* Yellow Sticky Note Pad (On Top) */}
            <div
              style={{
                position: "absolute",
                top: -5,
                left: 10,
                width: 52,
                height: 52,
                borderRadius: 5,
                backgroundColor: isGloomy ? "#94A3B8" : "#FEF08A",
                transform: "rotate(6deg)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              }}
            />
            {/* Sleek Pen */}
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 72,
                width: 9,
                height: 58,
                borderRadius: 4,
                backgroundColor: isGloomy ? "#CBD5E1" : colors.urgentRed,
                transform: "rotate(35deg)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
