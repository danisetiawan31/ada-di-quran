import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { EP02_THEME } from "../theme";
import { FONTS } from "../../../src/theme/fonts";
import { MainCharacter, CharacterPose } from "./MainCharacter";
import { PopElement } from "../../../src/components/PopElement";

export const Scene2ForkInTheRoad: React.FC = () => {
  const frame = useCurrentFrame();
  // Frame is 0-indexed relative to Scene 2 via Sequence wrapper
  const relFrame = frame;

  const { colors } = EP02_THEME;

  // =========================================================================
  // 1. STORYTELLING CHOREOGRAPHY (Dilemma Pacing)
  // =========================================================================
  // 0 - 160: Focus on Instant Shortcut (Looks Left towards Golden Speed Gate)
  // 160 - 231: Focus on Mountain Process (Looks Right towards Mountain Trail)
  // 231 - 357: Feeling overwhelmed by long process ("gampang mengeluh")
  const isLookingLeft = relFrame < 160;
  const characterPose: CharacterPose =
    relFrame < 231 ? "impatient" : "gloomy";

  // Gentle character breathing & posture sway
  const swayX = Math.sin(relFrame * 0.08) * 8;
  const breatheY = Math.sin(relFrame * 0.12) * 3;

  // Speed gate neon pulsation
  const gateGlow = Math.sin(relFrame * 0.2) * 0.25 + 0.75;

  // Mountaintop sunrise shimmer
  const sunShimmer = Math.sin(relFrame * 0.1) * 0.15 + 0.85;

  // Brain Infographic pulse (breathing)
  const brainPulse = Math.sin(relFrame * 0.1) * 0.02 + 1.0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.skyLight,
        overflow: "hidden",
      }}
    >
      {/* =========================================================================
          AUDIO: SCENE TRANSITION & STORYTELLING MICRO-SFX (Max 2-3 triggers)
         ========================================================================= */}
      {/* 1. Scene Transition Airy Whoosh */}
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.16} />
      </Sequence>

      {/* 2. Dilemma Shift Ding at Frame 160 (Character turns to Mountain Process) */}
      <Sequence from={160} durationInFrames={30}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.16} />
      </Sequence>

      {/* =========================================================================
          1. SKY GRADIENT & SUN
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 850,
          background: "linear-gradient(180deg, #93C5FD 0%, #BAE6FD 45%, #FEF9C3 100%)",
        }}
      />

      {/* Radiant Distant Morning Sun */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 540,
          transform: "translateX(-50%)",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FEF08A 20%, rgba(254, 240, 138, 0.4) 60%, transparent 100%)",
          filter: "blur(14px)",
          opacity: 0.85 * sunShimmer,
          pointerEvents: "none",
        }}
      />

      {/* =========================================================================
          2. DISTANT MOUNTAIN SILHOUETTES & SKYLINE
         ========================================================================= */}
      <svg
        viewBox="0 0 1080 600"
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          width: "100%",
          height: 600,
          pointerEvents: "none",
        }}
      >
        {/* Layer 1: Distant Misty Mountain Peaks */}
        <polygon points="0,500 180,240 420,500" fill="#93C5FD" opacity="0.45" />
        <polygon points="320,500 580,200 860,500" fill="#818CF8" opacity="0.4" />
        <polygon points="720,500 920,270 1080,500" fill="#93C5FD" opacity="0.45" />

        {/* Layer 2: Mid-distance Rolling Green Ridge */}
        <path
          d="M0 430 Q280 350 560 410 T1080 380 L1080 600 L0 600 Z"
          fill="#34D399"
          opacity="0.75"
        />
        <path
          d="M0 470 Q380 400 760 450 T1080 420 L1080 600 L0 600 Z"
          fill="#10B981"
          opacity="0.9"
        />
      </svg>

      {/* =========================================================================
          3. BENTO CARD: BRAIN INFOGRAPHIC (Instant Gratification Bias)
             (Safe zone below Watermark, bold typography & crisp contrast)
             Using FONTS.title (Plus Jakarta Sans) & FONTS.body (Inter)
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 40,
        }}
      >
        <PopElement triggerFrame={10} sound="btn_pop" volume={0.20} tilt={-2}>
          <div
            style={{
              transform: `scale(${brainPulse})`,
              width: 860,
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              borderRadius: 36,
              padding: "26px 36px",
              boxShadow: "0 28px 65px rgba(245, 158, 11, 0.22), 0 4px 16px rgba(0, 0, 0, 0.06)",
              border: "3.5px solid #FCD34D",
              display: "flex",
              alignItems: "center",
              gap: 28,
              fontFamily: FONTS.title,
            }}
          >
            {/* Animated Brain Vector Icon */}
            <div style={{ flexShrink: 0 }}>
              <svg width="135" height="110" viewBox="0 0 120 90">
                <defs>
                  <linearGradient id="scene2BrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="60%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>

                {/* Brain Silhouette Outline */}
                <path
                  d="M35 55 C20 50 15 35 25 25 C30 15 45 15 55 22 C62 14 78 14 85 24 C95 18 108 28 102 42 C108 52 100 68 85 70 C75 75 60 70 52 64 C45 70 38 65 35 55 Z"
                  fill="#FFF1F2"
                  stroke="url(#scene2BrainGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Internal Gyri Folds */}
                <path d="M40 32 Q55 38 48 50 Q60 52 70 42" fill="none" stroke="#F472B6" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M68 28 Q78 38 88 34" fill="none" stroke="#F59E0B" strokeWidth="3.2" strokeLinecap="round" />

                {/* Pulsing Dopamine Node */}
                <circle cx="86" cy="38" r={12 * gateGlow} fill="#FACC15" opacity="0.5" />
                <circle cx="86" cy="38" r="6" fill="#EF4444" />

                {/* Synaptic Sparks */}
                <line
                  x1="86"
                  y1="38"
                  x2={86 + Math.cos(relFrame * 0.25) * 24}
                  y2={38 + Math.sin(relFrame * 0.25) * 24}
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Typography Hierarchy */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Badge Pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "#FEF3C7",
                  border: "2px solid #FCD34D",
                  borderRadius: 999,
                  padding: "6px 18px",
                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#D97706",
                  }}
                />
                <span
                  style={{
                    fontFamily: FONTS.title,
                    fontSize: 18,
                    fontWeight: 900,
                    color: "#B45309",
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                  }}
                >
                  PSIKOLOGI PERILAKU
                </span>
              </div>

              {/* Main Title - Scaled & High Contrast */}
              <span
                style={{
                  fontFamily: FONTS.title,
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#0F172A",
                  letterSpacing: -0.5,
                  lineHeight: 1.2,
                }}
              >
                Instant Gratification Bias
              </span>

              {/* Subtitle - Crisp and Clear */}
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 23,
                  fontWeight: 700,
                  color: "#334155",
                  lineHeight: 1.35,
                }}
              >
                Otak menuntut hasil instan tanpa mau melewati proses
              </span>
            </div>
          </div>
        </PopElement>
      </div>

      {/* =========================================================================
          4. MAIN LANDSCAPE & ROAD SYSTEM (CLEAN 2.5D PERSPECTIVE Y-FORK)
             Canvas coordinates: 1080 x 1400 (Top: 620 to 1920)
         ========================================================================= */}
      <svg
        viewBox="0 0 1080 1380"
        style={{
          position: "absolute",
          top: 620,
          left: 0,
          width: "100%",
          height: 1380,
          pointerEvents: "none",
        }}
      >
        <defs>
          {/* Rolling Hill Gradients */}
          <linearGradient id="lushMeadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="hillLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="mountainRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#065F46" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>

          {/* Incoming Bottom Road Gradient */}
          <linearGradient id="incomingRoadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Paved Crossroads Plaza */}
          <radialGradient id="plazaHubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </radialGradient>

          {/* Left Branch: Golden Super-Highway */}
          <linearGradient id="goldenRoadGrad" x1="50%" y1="100%" x2="20%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>

          {/* Right Branch: Mountain Stone Paver Trail */}
          <linearGradient id="mountainTrailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Speed Gate Neon Glow */}
          <filter id="neonGlowYellow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* -------------------------------------------------------------------
            A. ROLLING HILLS & VALLEY TERRAIN (Natural 3D Curves, No Flat Line)
           ------------------------------------------------------------------- */}
        {/* Soft Background Hill Ridge */}
        <path
          d="M0 60 Q270 10 540 50 Q810 90 1080 30 L1080 1380 L0 1380 Z"
          fill="#047857"
          opacity="0.45"
        />

        {/* Base Rolling Valley Fill with Natural Undulating Crest */}
        <path
          d="M0 100 Q260 40 520 80 Q780 120 1080 60 L1080 1380 L0 1380 Z"
          fill="url(#lushMeadowGrad)"
        />

        {/* Left Hill: Supporting Golden Expressway */}
        <path
          d="M0 220 Q220 160 380 300 Q480 400 460 650 L0 650 Z"
          fill="url(#hillLeftGrad)"
          opacity="0.85"
        />

        {/* Right Stepped Mountain Ridge: Tiered backdrop for Winding Trail */}
        {/* Tier 1: Far Mountain Peak */}
        <path
          d="M600 650 L1080 650 L1080 90 Q960 120 880 210 Q760 340 680 510 Z"
          fill="url(#mountainRightGrad)"
        />
        {/* Tier 2: Mid Hill Terrace */}
        <path
          d="M680 650 L1080 650 L1080 270 Q940 340 840 460 Q760 550 710 650 Z"
          fill="#065F46"
          opacity="0.75"
        />

        {/* -------------------------------------------------------------------
            B. DESTINATIONS AT THE END OF EACH PATH
           ------------------------------------------------------------------- */}
        {/* DESTINATION 1 (LEFT): Radiant Instant Finish Arch / Trophy Gate */}
        <g transform="translate(140, 190)">
          {/* Pulsing Sunburst Halo */}
          <circle cx="60" cy="50" r="75" fill="#FEF08A" opacity={0.35 * gateGlow} filter="blur(10px)" />
          
          {/* Golden Archway Columns */}
          <rect x="15" y="20" width="16" height="70" rx="4" fill="#D97706" />
          <rect x="89" y="20" width="16" height="70" rx="4" fill="#D97706" />
          <rect x="19" y="20" width="8" height="70" fill="#FBBF24" />
          <rect x="93" y="20" width="8" height="70" fill="#FBBF24" />

          {/* Archway Lintel */}
          <rect x="8" y="10" width="104" height="18" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
          <rect x="12" y="13" width="96" height="6" rx="3" fill="#FEF3C7" />

          {/* Golden Lightning Bolt Emblem */}
          <circle cx="60" cy="50" r="26" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
          <polygon points="62,35 48,51 58,51 56,66 72,47 62,47" fill="#B45309" />

          {/* Floating Reward Stars */}
          <polygon points="20,0 23,6 29,7 24,12 26,18 20,15 14,18 16,12 11,7 17,6" fill="#FDE047" opacity={gateGlow} />
          <polygon points="100,2 103,7 109,8 104,13 106,19 100,16 94,19 96,13 91,8 97,7" fill="#FDE047" opacity={gateGlow} />
        </g>

        {/* DESTINATION 2 (RIGHT): Serene Mountaintop Summit with Flourishing Tree & Flag */}
        <g transform="translate(860, 120)">
          {/* Heavenly Golden Sunbeams */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="40"
              x2={50 + 60 * Math.cos(((i * 30 + 190) * Math.PI) / 180)}
              y2={40 + 60 * Math.sin(((i * 30 + 190) * Math.PI) / 180)}
              stroke="#FEF08A"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity={0.45 * sunShimmer}
            />
          ))}

          {/* Mountaintop Rocky Peak Base */}
          <polygon points="15,80 50,28 85,80" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <polygon points="32,80 50,28 68,80" fill="#F8FAFC" />

          {/* Summit Golden Flagpole & Banner */}
          <line x1="50" y1="28" x2="50" y2="2" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="2" r="3.5" fill="#F59E0B" />
          {/* Waving Golden Banner */}
          <path
            d="M50 4 Q68 8 82 4 Q68 16 50 18 Z"
            fill="#10B981"
            stroke="#047857"
            strokeWidth="1.5"
          />

          {/* Flourishing Little Mountaintop Tree (Foreshadowing Scene 4 Tree of Patience) */}
          <ellipse cx="28" cy="55" rx="14" ry="16" fill="#10B981" />
          <ellipse cx="28" cy="52" rx="10" ry="12" fill="#34D399" />
          <rect x="26" y="65" width="5" height="12" rx="2" fill="#78350F" />
        </g>

        {/* -------------------------------------------------------------------
            C. BRANCH 1: HIGH-SPEED GOLDEN RUNWAY (⚡ JALUR INSTAN)
               Clear, wide, modern expressway shooting towards the Left Arch
           ------------------------------------------------------------------- */}
        {/* Road Bed / Embankment Shadow */}
        <path
          d="M440 630 Q330 480 250 350 Q205 275 195 260 L205 260 Q225 275 285 350 Q380 490 500 630 Z"
          fill="#B45309"
          opacity="0.3"
        />

        {/* Golden Highway Surface */}
        <path
          d="M430 620 Q320 470 240 340 Q195 270 190 255 L215 255 Q235 270 295 340 Q390 480 490 620 Z"
          fill="url(#goldenRoadGrad)"
          stroke="#F59E0B"
          strokeWidth="3"
        />

        {/* Neon Outer Curb Rails */}
        <path
          d="M430 620 Q320 470 240 340 Q195 270 190 255"
          fill="none"
          stroke="#FEF08A"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#neonGlowYellow)"
        />
        <path
          d="M490 620 Q390 480 295 340 Q235 270 215 255"
          fill="none"
          stroke="#FEF08A"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#neonGlowYellow)"
        />

        {/* Animated Speed Chevrons (>> >> >>) Pointing UP & FORWARD towards Golden Arch */}
        {[
          { x: 425, y: 550, rot: 132, scale: 0.95 },
          { x: 335, y: 440, rot: 128, scale: 0.8 },
          { x: 265, y: 350, rot: 124, scale: 0.65 },
          { x: 215, y: 280, rot: 120, scale: 0.5 },
        ].map((c, idx) => (
          <g key={idx} transform={`translate(${c.x}, ${c.y}) rotate(${c.rot}) scale(${c.scale})`}>
            <polyline
              points="-14,-10 0,0 -14,10"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="-24,-10 -10,0 -24,10"
              fill="none"
              stroke="#FEF3C7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </g>
        ))}

        {/* -------------------------------------------------------------------
            D. BRANCH 2: SCENIC MOUNTAIN SWITCHBACK TRAIL (🌱 JALUR PROSES)
               Beautifully winding stone trail with 3 clear switchback curves
           ------------------------------------------------------------------- */}
        {/* Switchback Curve 1: From Hub curving right towards cliff */}
        <path
          d="M580 620 Q680 570 760 540 Q830 510 840 470 L810 470 Q800 500 735 525 Q650 565 550 620 Z"
          fill="url(#mountainTrailGrad)"
          stroke="#64748B"
          strokeWidth="2"
        />

        {/* Switchback Curve 2: Cutting back left across mid terrace */}
        <path
          d="M840 470 Q850 440 790 410 Q730 380 720 340 L750 340 Q760 370 810 395 Q870 425 860 470 Z"
          fill="url(#mountainTrailGrad)"
          stroke="#64748B"
          strokeWidth="2"
        />

        {/* Switchback Curve 3: Final ascent to the Summit Flag & Tree */}
        <path
          d="M720 340 Q710 300 760 260 Q820 210 880 170 L905 170 Q850 210 790 255 Q745 290 750 340 Z"
          fill="url(#mountainTrailGrad)"
          stroke="#64748B"
          strokeWidth="2"
        />

        {/* Clean Mountain Timber Steps (Placed strictly on the climbing paths) */}
        {[
          // Ascent 1 steps
          { x1: 605, y1: 605, x2: 635, y2: 590 },
          { x1: 660, y1: 575, x2: 690, y2: 560 },
          { x1: 720, y1: 548, x2: 750, y2: 532 },
          // Switchback 2 steps
          { x1: 825, y1: 460, x2: 845, y2: 440 },
          { x1: 775, y1: 405, x2: 795, y2: 385 },
          { x1: 730, y1: 355, x2: 750, y2: 335 },
          // Ascent 3 steps towards peak
          { x1: 755, y1: 280, x2: 775, y2: 265 },
          { x1: 810, y1: 230, x2: 830, y2: 215 },
          { x1: 860, y1: 185, x2: 880, y2: 170 },
        ].map((st, sIdx) => (
          <g key={`step-${sIdx}`}>
            {/* Step Timber Shadow */}
            <line x1={st.x1} y1={st.y1 + 2} x2={st.x2} y2={st.y2 + 2} stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" opacity="0.35" />
            {/* Step Timber Beam */}
            <line x1={st.x1} y1={st.y1} x2={st.x2} y2={st.y2} stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
            {/* Step Top Highlight */}
            <line x1={st.x1} y1={st.y1 - 1} x2={st.x2} y2={st.y2 - 1} stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        ))}

        {/* Clean Mountain Wooden Guardrail at Cliff Edge (Turn 1) */}
        {[
          { x: 840, y: 500 },
          { x: 855, y: 470 },
          { x: 840, y: 440 },
        ].map((p, pIdx) => (
          <g key={`post-${pIdx}`}>
            <rect x={p.x - 3} y={p.y - 14} width="6" height="24" rx="1.5" fill="#78350F" />
            <rect x={p.x - 3} y={p.y - 14} width="2" height="24" fill="#92400E" />
          </g>
        ))}
        <path d="M840 494 Q858 468 840 434" fill="none" stroke="#78350F" strokeWidth="2.5" />

        {/* Pine Trees rooted naturally on terraces beside the trail */}
        {[
          { x: 880, y: 510, s: 1.1 },
          { x: 670, y: 420, s: 0.85 },
          { x: 820, y: 310, s: 0.75 },
          { x: 700, y: 230, s: 0.65 },
          { x: 920, y: 200, s: 0.6 },
        ].map((t, idx) => (
          <g key={`pine-${idx}`} transform={`translate(${t.x}, ${t.y}) scale(${t.s})`}>
            {/* Tree Shadow */}
            <ellipse cx="25" cy="65" rx="18" ry="6" fill="#022c22" opacity="0.35" />
            {/* Trunk */}
            <rect x="21" y="50" width="8" height="18" rx="2" fill="#78350F" />
            {/* 3 Tier Pine Foliage */}
            <polygon points="25,5 6,34 44,34" fill="#047857" />
            <polygon points="25,18 10,44 40,44" fill="#059669" />
            <polygon points="25,30 14,54 36,54" fill="#10B981" />
          </g>
        ))}

        {/* -------------------------------------------------------------------
            E. CENTRAL FORK PLAZA HUB (BUNDARAN PERSIMPANGAN BATU)
               Solid circular paved cobblestone plaza where character stands firmly
           ------------------------------------------------------------------- */}
        {/* Plaza Embankment Drop Shadow */}
        <ellipse cx="540" cy="635" rx="215" ry="70" fill="#1C1917" opacity="0.25" />
        {/* Paved Stone Plaza Surface */}
        <ellipse cx="540" cy="630" rx="210" ry="66" fill="url(#plazaHubGrad)" stroke="#475569" strokeWidth="4" />
        {/* Decorative Inner Paver Cobblestone Ring */}
        <ellipse cx="540" cy="630" rx="160" ry="48" fill="none" stroke="#F1F5F9" strokeWidth="2.5" strokeDasharray="12 10" opacity="0.75" />
        {/* Center Plinth Ring */}
        <ellipse cx="540" cy="630" rx="90" ry="26" fill="#334155" opacity="0.3" />

        {/* -------------------------------------------------------------------
            F. MAIN HIGHWAY ENTERING FROM BOTTOM (Y: 630 -> Y: 1380)
               Tapers naturally towards the junction
           ------------------------------------------------------------------- */}
        {/* Highway Shoulder Curbs */}
        <polygon points="210,1380 870,1380 710,660 370,660" fill="#64748B" />
        {/* Smooth Dark Highway Asphalt */}
        <polygon points="230,1380 850,1380 690,660 390,660" fill="url(#incomingRoadGrad)" />

        {/* Perspective Center Lane Dashes */}
        <line x1="540" y1="1330" x2="540" y2="1210" stroke="#FFFFFF" strokeWidth="9" strokeDasharray="22 22" opacity="0.9" strokeLinecap="round" />
        <line x1="540" y1="1150" x2="540" y2="1040" stroke="#FFFFFF" strokeWidth="8" strokeDasharray="18 18" opacity="0.9" strokeLinecap="round" />
        <line x1="540" y1="990" x2="540" y2="900" stroke="#FFFFFF" strokeWidth="7" strokeDasharray="16 16" opacity="0.9" strokeLinecap="round" />
        <line x1="540" y1="860" x2="540" y2="780" stroke="#FFFFFF" strokeWidth="6" strokeDasharray="14 14" opacity="0.9" strokeLinecap="round" />
        <line x1="540" y1="750" x2="540" y2="685" stroke="#FFFFFF" strokeWidth="5" strokeDasharray="12 12" opacity="0.9" strokeLinecap="round" />
      </svg>

      {/* =========================================================================
          5. WOODEN CROSSROADS SIGNPOST (VITAL STORYTELLING ANCHOR)
             Positioned cleanly on the left verge of the junction plaza
             (X: 180, Bottom: 680 — completely separated from Character & Subtitle)
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          bottom: 680,
          left: 170,
          width: 200,
          height: 240,
          zIndex: 25,
          pointerEvents: "none",
        }}
      >
        <svg width="200" height="240" viewBox="0 0 200 240">
          <defs>
            <linearGradient id="signPostWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="50%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="signLeftWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="signRightWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Post Shadow on Ground */}
          <ellipse cx="100" cy="230" rx="30" ry="9" fill="#1C1917" opacity="0.35" />

          {/* Main Wooden Stake */}
          <rect x="91" y="25" width="18" height="205" rx="4" fill="url(#signPostWood)" />
          {/* Post Top Chamfer */}
          <polygon points="91,25 100,16 109,25" fill="#B45309" />

          {/* -------------------------------------------------------------
              TOP SIGNBOARD: POINTING LEFT (⚡ INSTAN)
             ------------------------------------------------------------- */}
          <g filter="drop-shadow(0 5px 8px rgba(0,0,0,0.32))">
            {/* Arrow shape pointing Left */}
            <path
              d="M15 50 L42 24 L165 24 L165 76 L42 76 Z"
              fill="url(#signLeftWood)"
              stroke="#B45309"
              strokeWidth="2.5"
            />
            {/* Inner Highlight Border */}
            <path
              d="M22 50 L45 30 L158 30 L158 70 L45 70 Z"
              fill="none"
              stroke="#FEF3C7"
              strokeWidth="1.8"
              opacity="0.85"
            />
            {/* Lightning Icon Badge */}
            <circle cx="50" cy="50" r="14" fill="#FFFFFF" />
            <polygon points="52,40 43,51 49,51 47,60 57,48 51,48" fill="#D97706" />
            {/* Bold Text Label with FONTS.title */}
            <text
              x="72"
              y="56"
              fill="#FFFFFF"
              fontSize="17"
              fontWeight="900"
              letterSpacing="0.8"
              fontFamily={FONTS.title}
            >
              INSTAN
            </text>
          </g>

          {/* -------------------------------------------------------------
              BOTTOM SIGNBOARD: POINTING RIGHT (🌱 PROSES)
             ------------------------------------------------------------- */}
          <g filter="drop-shadow(0 5px 8px rgba(0,0,0,0.32))">
            {/* Arrow shape pointing Right */}
            <path
              d="M35 102 L158 102 L185 128 L158 154 L35 154 Z"
              fill="url(#signRightWood)"
              stroke="#065F46"
              strokeWidth="2.5"
            />
            {/* Inner Highlight Border */}
            <path
              d="M42 108 L155 108 L178 128 L155 148 L42 148 Z"
              fill="none"
              stroke="#D1FAE5"
              strokeWidth="1.8"
              opacity="0.85"
            />
            {/* Seedling Icon Badge */}
            <circle cx="150" cy="128" r="14" fill="#FFFFFF" />
            <path
              d="M150 124 Q154 120 157 124 Q154 129 150 127 Z"
              fill="#059669"
            />
            <path
              d="M150 127 Q146 123 143 127 Q146 131 150 129 Z"
              fill="#059669"
            />
            <line x1="150" y1="127" x2="150" y2="136" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
            {/* Bold Text Label with FONTS.title */}
            <text
              x="52"
              y="134"
              fill="#FFFFFF"
              fontSize="17"
              fontWeight="900"
              letterSpacing="0.8"
              fontFamily={FONTS.title}
            >
              PROSES
            </text>
          </g>
        </svg>
      </div>

      {/* =========================================================================
          6. MAIN CHARACTER (Ergonomically Elevated at Crossroads Plaza: Bottom 670)
             (100% Free from Subtitle Collision, dilemma & narrative-driven pose)
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          bottom: 670,
          left: `calc(50% + ${swayX}px)`,
          transform: "translateX(-50%)",
          zIndex: 30,
        }}
      >
        {/* Soft Contact Shadow beneath Character's Shoes */}
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 140,
            height: 24,
            borderRadius: "50%",
            backgroundColor: "rgba(15, 23, 42, 0.38)",
            filter: "blur(6px)",
            zIndex: -1,
          }}
        />

        <div style={{ transform: `translateY(${breatheY}px)` }}>
          <MainCharacter
            pose={characterPose}
            scale={1.48}
            flip={isLookingLeft}
          />
        </div>

        {/* Weary Sweat Bead when narrator mentions "gampang mengeluh" (relFrame >= 231) */}
        {relFrame >= 231 && (
          <div
            style={{
              position: "absolute",
              top: 55,
              right: isLookingLeft ? 260 : 35,
              opacity: Math.min(1, (relFrame - 231) / 15),
              transform: `translateY(${Math.sin((relFrame - 231) * 0.15) * 4}px)`,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 42 42">
              {/* Blue sweat bead */}
              <path
                d="M21 4 C21 4 10 18 10 26 C10 32 15 37 21 37 C27 37 32 32 32 26 C32 18 21 4 21 4 Z"
                fill="#38BDF8"
                stroke="#0284C7"
                strokeWidth="2.5"
              />
              {/* Highlight */}
              <ellipse cx="17" cy="24" rx="3" ry="5" fill="#FFFFFF" opacity="0.75" />
            </svg>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
