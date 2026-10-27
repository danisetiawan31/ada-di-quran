import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { EP02_THEME } from "../theme";
import { MainCharacter, CharacterPose } from "./MainCharacter";
import { PopElement } from "../../../src/components/PopElement";

export const Scene2ForkInTheRoad: React.FC = () => {
  const frame = useCurrentFrame();
  // Relative frame from 0 (starts at global frame 558)
  const relFrame = Math.max(0, frame - 558);

  const { colors } = EP02_THEME;

  // =========================================================================
  // 1. STORYTELLING CHOREOGRAPHY (Dilemma Pacing)
  // =========================================================================
  // 0 - 160: Focus on Instant Shortcut (Looks Left towards Flash Portal)
  // 160 - 231: Focus on Mountain Process (Looks Right towards Hill Trail)
  // 231 - 357: Feeling overwhelmed by long process ("gampang mengeluh")
  const isLookingLeft = relFrame < 160;
  const characterPose: CharacterPose =
    relFrame < 231 ? "impatient" : "gloomy";

  // Gentle weight shift instead of wild flipping
  const swayX = Math.sin(relFrame * 0.08) * 10;

  // Portal neon glow & rotating rays
  const portalGlow = Math.sin(relFrame * 0.2) * 0.25 + 0.75;
  const portalRays = (relFrame * 2.5) % 360;

  // Brain Infographic pulse (breathing)
  const brainPulse = Math.sin(relFrame * 0.12) * 0.03 + 1.0;

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
          background: "linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 55%, #FEF9C3 100%)",
        }}
      />

      {/* Gentle Distant Sun */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: "50%",
          transform: "translateX(-50%)",
          width: 220,
          height: 220,
          borderRadius: "50%",
          backgroundColor: "#FEF08A",
          opacity: 0.55,
          filter: "blur(18px)",
        }}
      />

      {/* =========================================================================
          2. DISTANT MOUNTAIN SILHOUETTES
         ========================================================================= */}
      <svg
        viewBox="0 0 1080 520"
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          width: "100%",
          height: 520,
          pointerEvents: "none",
        }}
      >
        {/* Layer 1: Distant Misty Mountain Peaks */}
        <polygon points="40,420 260,180 500,420" fill="#93C5FD" opacity="0.45" />
        <polygon points="400,420 660,150 940,420" fill="#818CF8" opacity="0.4" />
        <polygon points="760,420 920,230 1080,420" fill="#93C5FD" opacity="0.35" />

        {/* Layer 2: Mid-distance Rolling Hills */}
        <path
          d="M0 370 Q320 300 640 360 T1080 340 L1080 520 L0 520 Z"
          fill="#34D399"
          opacity="0.85"
        />
        <path
          d="M0 420 Q420 370 820 430 T1080 400 L1080 520 L0 520 Z"
          fill="#10B981"
        />
      </svg>

      {/* =========================================================================
          3. BENTO CARD: BRAIN INFOGRAPHIC (Instant Gratification Bias)
             (Safe zone below Watermark, clear typography & animated neuron)
             Integrated with PopElement for bouncy spring entry & auto micro-SFX
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 40,
        }}
      >
        <PopElement triggerFrame={10} sound="btn_pop" volume={0.20} tilt={-2}>
          <div
            style={{
              transform: `scale(${brainPulse})`,
              width: 580,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(16px)",
              borderRadius: 28,
              padding: "16px 26px",
              boxShadow: "0 20px 48px rgba(245, 158, 11, 0.2)",
              border: "2.5px solid #FCD34D",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
        {/* Animated Brain Vector Icon */}
        <div style={{ flexShrink: 0 }}>
          <svg width="105" height="85" viewBox="0 0 120 90">
            <defs>
              <linearGradient id="scene2BrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="60%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>

            {/* Brain Hemisphere Outline */}
            <path
              d="M35 55 C20 50 15 35 25 25 C30 15 45 15 55 22 C62 14 78 14 85 24 C95 18 108 28 102 42 C108 52 100 68 85 70 C75 75 60 70 52 64 C45 70 38 65 35 55 Z"
              fill="#FFF1F2"
              stroke="url(#scene2BrainGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Internal Gyri Folds */}
            <path d="M40 32 Q55 38 48 50 Q60 52 70 42" fill="none" stroke="#F472B6" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M68 28 Q78 38 88 34" fill="none" stroke="#F59E0B" strokeWidth="2.8" strokeLinecap="round" />

            {/* Pulsing Dopamine / Reward Impulse Node */}
            <circle cx="86" cy="38" r={10 * portalGlow} fill="#FACC15" opacity="0.6" />
            <circle cx="86" cy="38" r="5" fill="#EF4444" />

            {/* Firing Electrical Sparks */}
            <line
              x1="86"
              y1="38"
              x2={86 + Math.cos(relFrame * 0.25) * 22}
              y2={38 + Math.sin(relFrame * 0.25) * 22}
              stroke="#F59E0B"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Text Details & Psychological Term */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Badge Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "#FEF3C7",
              border: "1px solid #FCD34D",
              borderRadius: 999,
              padding: "2px 10px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#D97706",
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#B45309",
                letterSpacing: 0.8,
                textTransform: "uppercase",
              }}
            >
              Psikologi Perilaku
            </span>
          </div>

          {/* Main Title */}
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: -0.3,
              lineHeight: 1.2,
            }}
          >
            Instant Gratification Bias
          </span>

          {/* Subtitle / Meaning */}
          <span
            style={{
              fontSize: 14.5,
              fontWeight: 600,
              color: "#64748B",
            }}
          >
            Otak menuntut hasil instan tanpa proses
          </span>
        </div>
      </div>
    </PopElement>
  </div>

      {/* =========================================================================
          4. FOREGROUND HILLS & INTEGRATED CONTINUOUS Y-FORK ROAD SYSTEM
         ========================================================================= */}
      <svg
        viewBox="0 0 1080 1200"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 1200,
          zIndex: 10,
        }}
      >
        <defs>
          {/* Main Road Gradient */}
          <linearGradient id="mainRoadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Golden Shortcut Path Gradient */}
          <linearGradient id="shortcutGrad" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          {/* Mountain Hill Path Gradient */}
          <linearGradient id="mountainPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Base Green Terrain (Starts at y=0 to overlap seamlessly with hills above) */}
        <rect x="0" y="0" width="1080" height="1200" fill="#059669" />

        {/* Left Grassy Hillock behind Portal */}
        <path
          d="M0 800 Q180 680 320 850 L320 1200 L0 1200 Z"
          fill="#10B981"
          opacity="0.8"
        />

        {/* Full Right Green Hill Slope (Grounding the pine trees firmly) */}
        <path
          d="M540 1200 L1080 1200 L1080 80 Q920 160 800 320 Q680 500 640 760 Z"
          fill="#047857"
        />
        {/* Layered hill ridge on right */}
        <path
          d="M700 1200 L1080 1200 L1080 340 Q940 440 840 600 Q760 760 720 980 Z"
          fill="#065F46"
          opacity="0.55"
        />

        {/* -------------------------------------------------------------------
            CONTINUOUS ROAD SYSTEM:
            Trunk enters from bottom (y=1200) -> Junction at y=760 -> Forks
           ------------------------------------------------------------------- */}
        {/* Main Road Trunk */}
        <path
          d="M360 1200 L720 1200 L620 760 L460 760 Z"
          fill="url(#mainRoadGrad)"
        />
        {/* Road Center Dashes */}
        <line x1="540" y1="1160" x2="540" y2="1070" stroke="#FFFFFF" strokeWidth="6" strokeDasharray="16 16" opacity="0.65" />
        <line x1="540" y1="1030" x2="540" y2="940" stroke="#FFFFFF" strokeWidth="5" strokeDasharray="14 14" opacity="0.65" />
        <line x1="540" y1="900" x2="540" y2="820" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="12 12" opacity="0.65" />

        {/* BRANCH 1: Golden Shortcut Path (Seamlessly flows from junction into Flash Portal base at x:190, y:70) */}
        <path
          d="M470 760 Q340 620 220 320 Q170 180 190 70 L140 70 Q110 200 170 380 Q280 680 430 790 Z"
          fill="url(#shortcutGrad)"
        />
        {/* Luminous edge on shortcut */}
        <path
          d="M470 760 Q340 620 220 320 Q170 180 190 70"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="6"
          opacity="0.85"
        />

        {/* BRANCH 2: Winding Mountain Process Path (Flows from junction climbing up right hill) */}
        <path
          d="M620 760 Q740 680 820 540 Q880 420 840 280 Q810 180 860 100 L895 110 Q850 190 880 290 Q920 420 860 550 Q780 700 580 790 Z"
          fill="url(#mountainPathGrad)"
        />

        {/* Stepping Stones along Mountain Path */}
        {[
          { cx: 650, cy: 740, rx: 17, ry: 9 },
          { cx: 720, cy: 670, rx: 16, ry: 9 },
          { cx: 780, cy: 590, rx: 15, ry: 8 },
          { cx: 830, cy: 510, rx: 14, ry: 7 },
          { cx: 860, cy: 420, rx: 13, ry: 7 },
          { cx: 855, cy: 330, rx: 12, ry: 6 },
          { cx: 840, cy: 240, rx: 11, ry: 5 },
          { cx: 865, cy: 150, rx: 10, ry: 5 },
        ].map((s, idx) => (
          <ellipse
            key={idx}
            cx={s.cx}
            cy={s.cy}
            rx={s.rx}
            ry={s.ry}
            fill="#CBD5E1"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
        ))}

        {/* Pine Trees Firmly Rooted on the Mountain Slope */}
        {[
          { x: 920, y: 740, s: 1.2 },
          { x: 880, y: 550, s: 0.95 },
          { x: 770, y: 410, s: 0.8 },
          { x: 890, y: 280, s: 0.65 },
          { x: 830, y: 150, s: 0.5 },
        ].map((t, idx) => (
          <g key={idx} transform={`translate(${t.x}, ${t.y}) scale(${t.s})`}>
            {/* Trunk */}
            <rect x="25" y="60" width="10" height="24" fill="#78350F" rx="2" />
            {/* 3 Tier Pine Foliage */}
            <polygon points="30,8 8,42 52,42" fill="#047857" />
            <polygon points="30,24 12,54 48,54" fill="#059669" />
            <polygon points="30,38 16,66 44,66" fill="#10B981" />
          </g>
        ))}

        {/* Wildflower Accent Dots across the grass */}
        {[
          { x: 220, y: 920, c: "#FEF08A" },
          { x: 280, y: 960, c: "#FFFFFF" },
          { x: 340, y: 880, c: "#FDE047" },
          { x: 740, y: 940, c: "#FFFFFF" },
          { x: 800, y: 900, c: "#FEF08A" },
          { x: 860, y: 980, c: "#FDE047" },
        ].map((f, i) => (
          <circle key={i} cx={f.x} cy={f.y} r="4.5" fill={f.c} opacity="0.8" />
        ))}
      </svg>

      {/* =========================================================================
          5. LEFT SIDE: INSTANT FLASH PORTAL (The Alluring Shortcut Trap)
             (Positioned right at the end of the left golden path)
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          top: 660,
          left: 60,
          width: 250,
          height: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        {/* Rotating Sunburst Rays */}
        <svg
          width="270"
          height="270"
          viewBox="0 0 200 200"
          style={{
            position: "absolute",
            transform: `rotate(${portalRays}deg)`,
            opacity: 0.65 * portalGlow,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 88 * Math.cos((i * 45 * Math.PI) / 180)}
              y2={100 + 88 * Math.sin((i * 45 * Math.PI) / 180)}
              stroke="#FBBF24"
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {/* Concentric Glowing Portal Arch */}
        <svg width="210" height="210" viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="44" ry="44" fill="#FEF08A" opacity={0.35 * portalGlow} />
          <ellipse cx="50" cy="50" rx="35" ry="35" fill="#FDE047" opacity={0.75 * portalGlow} />
          <ellipse cx="50" cy="50" rx="25" ry="25" fill="#FFFFFF" />

          {/* Golden Lightning Bolt Core */}
          <polygon
            points="52,22 38,48 48,48 46,74 64,44 54,44"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* =========================================================================
          6. WOODEN FORK SIGNPOST (Visual Storytelling Anchor at Crossroads)
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          bottom: 470,
          left: 240,
          width: 170,
          height: 230,
          zIndex: 25,
          pointerEvents: "none",
        }}
      >
        <svg width="170" height="230" viewBox="0 0 170 230">
          <defs>
            <linearGradient id="woodPostGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="50%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
          </defs>

          {/* Wooden Stake */}
          <rect x="76" y="20" width="16" height="200" rx="4" fill="url(#woodPostGrad)" />
          {/* Base Mound */}
          <ellipse cx="84" cy="218" rx="26" ry="8" fill="#047857" />

          {/* Top Arrow: Pointing Left (⚡ Instan) */}
          <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))">
            <path
              d="M12 46 L38 24 L142 24 L142 68 L38 68 Z"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="2.5"
            />
            {/* Lightning bolt emblem */}
            <polygon points="34,36 24,48 31,48 28,58 40,44 33,44" fill="#FFFFFF" />
            {/* Fast lines */}
            <line x1="50" y1="40" x2="125" y2="40" stroke="#FEF3C7" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="50" y1="52" x2="105" y2="52" stroke="#FEF3C7" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* Bottom Arrow: Pointing Right (🌱 Proses) */}
          <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))">
            <path
              d="M38 90 L132 90 L158 112 L132 134 L38 134 Z"
              fill="#059669"
              stroke="#047857"
              strokeWidth="2.5"
            />
            {/* Sprouting seedling emblem */}
            <path
              d="M132 102 Q138 98 142 102 Q138 108 132 106 Z"
              fill="#A7F3D0"
            />
            <path
              d="M132 106 Q126 102 122 106 Q126 112 132 108 Z"
              fill="#A7F3D0"
            />
            <line x1="132" y1="106" x2="132" y2="122" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            {/* Mountain lines */}
            <line x1="52" y1="106" x2="115" y2="106" stroke="#D1FAE5" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="65" y1="118" x2="115" y2="118" stroke="#D1FAE5" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* =========================================================================
          7. MAIN CHARACTER (Ergonomically Elevated at Crossroads: Bottom 470)
             (100% Free from Subtitle Collision, dilemma & narrative-driven pose)
         ========================================================================= */}
      <div
        style={{
          position: "absolute",
          bottom: 470,
          left: `calc(50% + ${swayX}px)`,
          transform: "translateX(-50%)",
          zIndex: 30,
        }}
      >
        <MainCharacter
          pose={characterPose}
          scale={1.48}
          flip={isLookingLeft}
        />

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
