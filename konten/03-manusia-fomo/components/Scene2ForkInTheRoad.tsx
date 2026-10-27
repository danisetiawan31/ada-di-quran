import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EP02_THEME } from "../theme";
import { MainCharacter } from "./MainCharacter";

export const Scene2ForkInTheRoad: React.FC = () => {
  const frame = useCurrentFrame();
  // Relative frame from 0 (starts at global frame 558)
  const relFrame = Math.max(0, frame - 558);

  const { colors } = EP02_THEME;

  // Character pacing back and forth anxiously
  const paceX = Math.sin(relFrame * 0.08) * 45;
  const isFacingLeft = Math.cos(relFrame * 0.08) < 0;

  // Portal neon glow pulsing
  const portalGlow = Math.sin(relFrame * 0.2) * 0.25 + 0.75;
  const portalRays = (relFrame * 3) % 360;

  // Brain Infographic pulse
  const brainPulse = Math.sin(relFrame * 0.15) * 0.06 + 1.0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.skyLight,
        overflow: "hidden",
      }}
    >
      {/* 1. SKY & DISTANT MOUNTAINS */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 900,
          background: "linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 60%, #FEF9C3 100%)",
        }}
      />

      {/* Sun in distant sky */}
      <circle cx="540" cy="380" r="110" fill="#FEF08A" opacity="0.6" />

      {/* Rolling Hills (Background Layers) */}
      <svg
        viewBox="0 0 1080 800"
        style={{
          position: "absolute",
          bottom: 700,
          left: 0,
          width: "100%",
        }}
      >
        {/* Distant Mountains */}
        <polygon points="120,500 360,280 620,500" fill="#93C5FD" opacity="0.5" />
        <polygon points="460,500 740,240 1020,500" fill="#818CF8" opacity="0.45" />

        {/* Rolling Green Hills */}
        <path
          d="M0 450 Q300 380 600 440 T1080 430 L1080 800 L0 800 Z"
          fill="#34D399"
          opacity="0.8"
        />
        <path
          d="M0 500 Q400 460 800 520 T1080 490 L1080 800 L0 800 Z"
          fill="#10B981"
        />
      </svg>

      {/* =========================================================================
          2. BRAIN INFOGRAPHIC (Instant Gratification Bias - Top Center)
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: "50%",
          transform: `translateX(-50%) scale(${brainPulse})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          borderRadius: 32,
          padding: "16px 28px",
          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          border: "2px solid #FCD34D",
          zIndex: 40,
        }}
      >
        <svg width="120" height="90" viewBox="0 0 120 90">
          <defs>
            {/* Brain Outline Gradient */}
            <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          {/* Left / Rear Hemisphere */}
          <path
            d="M35 55 C20 50 15 35 25 25 C30 15 45 15 55 22 C62 14 78 14 85 24 C95 18 108 28 102 42 C108 52 100 68 85 70 C75 75 60 70 52 64 C45 70 38 65 35 55 Z"
            fill="none"
            stroke="url(#brainGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Internal Brain Gyri Folds */}
          <path d="M40 32 Q55 38 48 50 Q60 52 70 42" fill="none" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 28 Q78 38 88 34" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

          {/* Flashing Reward / Frontal Impulse Zone */}
          <circle cx="88" cy="38" r={10 * portalGlow} fill="#FACC15" opacity="0.6" />
          <circle cx="88" cy="38" r="5" fill="#EF4444" />

          {/* Sparks shooting from brain */}
          <line
            x1="88"
            y1="38"
            x2={88 + Math.cos(relFrame * 0.2) * 25}
            y2={38 + Math.sin(relFrame * 0.2) * 25}
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Small Lightning Symbol */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
          </svg>
          <div
            style={{
              width: 48,
              height: 6,
              borderRadius: 3,
              backgroundColor: "#F59E0B",
            }}
          />
        </div>
      </div>

      {/* =========================================================================
          3. FORK IN THE ROAD (PERSIMPANGAN JALAN)
         ========================================================================= */}
      <svg
        viewBox="0 0 1080 1200"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 1200,
        }}
      >
        {/* Main Base Grass Ground */}
        <rect x="0" y="400" width="1080" height="800" fill="#059669" />

        {/* Cobblestone / Dirt Road Y-Fork */}
        {/* Main Trunk coming from bottom */}
        <path
          d="M440 1200 L640 1200 L610 850 L470 850 Z"
          fill="#CBD5E1"
        />

        {/* Left Branch (Shortcut to Flash Portal) */}
        <path
          d="M470 850 Q360 800 220 720 L160 760 Q340 850 510 880 Z"
          fill="#FDE047"
          opacity="0.9"
        />

        {/* Right Branch (Winding Mountain Path) */}
        <path
          d="M610 850 Q750 820 860 760 Q940 700 900 640 Q840 600 880 540 L850 520 Q780 580 840 650 Q860 720 720 790 L560 860 Z"
          fill="#E2E8F0"
        />

        {/* Stepping stones on mountain path */}
        {Array.from({ length: 6 }).map((_, stoneIdx) => {
          const sx = 720 + stoneIdx * 24;
          const sy = 800 - stoneIdx * 45;
          return (
            <ellipse
              key={stoneIdx}
              cx={sx}
              cy={sy}
              rx="18"
              ry="10"
              fill="#94A3B8"
              opacity="0.8"
            />
          );
        })}
      </svg>

      {/* =========================================================================
          4. LEFT SIDE: INSTANT FLASH PORTAL (The Shortcut Trap)
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 640,
          left: 80,
          width: 260,
          height: 260,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Rotating Sunburst Rays */}
        <svg
          width="280"
          height="280"
          viewBox="0 0 200 200"
          style={{
            position: "absolute",
            transform: `rotate(${portalRays}deg)`,
            opacity: 0.6 * portalGlow,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 90 * Math.cos((i * 45 * Math.PI) / 180)}
              y2={100 + 90 * Math.sin((i * 45 * Math.PI) / 180)}
              stroke="#FBBF24"
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {/* Glowing Portal Arch */}
        <svg width="220" height="220" viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="42" ry="42" fill="#FEF08A" opacity={0.35 * portalGlow} />
          <ellipse cx="50" cy="50" rx="34" ry="34" fill="#FDE047" opacity={0.7 * portalGlow} />
          <ellipse cx="50" cy="50" rx="24" ry="24" fill="#FFFFFF" />
          {/* Lightning Bolt Core */}
          <polygon
            points="52,24 38,50 48,50 46,72 64,44 54,44"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* =========================================================================
          5. RIGHT SIDE: MOUNTAIN PROGRESS TRAIL WITH TREES
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 500,
          right: 90,
          width: 240,
          height: 300,
        }}
      >
        {/* Mini Pine Trees Along Mountain Trail */}
        {Array.from({ length: 4 }).map((_, treeIdx) => (
          <svg
            key={treeIdx}
            width="60"
            height="80"
            viewBox="0 0 60 80"
            style={{
              position: "absolute",
              left: treeIdx * 45,
              top: treeIdx * 50,
            }}
          >
            <rect x="26" y="55" width="8" height="20" fill="#78350F" />
            <polygon points="30,10 10,40 50,40" fill="#047857" />
            <polygon points="30,25 15,50 45,50" fill="#059669" />
            <polygon points="30,38 18,60 42,60" fill="#10B981" />
          </svg>
        ))}
      </div>

      {/* =========================================================================
          6. MAIN CHARACTER PACING AT THE FORK
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: `calc(50% + ${paceX}px)`,
          transform: "translateX(-50%)",
          zIndex: 50,
        }}
      >
        <MainCharacter
          pose="impatient"
          scale={1.3}
          flip={isFacingLeft}
        />
      </div>
    </AbsoluteFill>
  );
};
