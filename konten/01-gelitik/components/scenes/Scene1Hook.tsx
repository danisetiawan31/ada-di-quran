import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AlertTriangle,
  HelpCircle,
  Laugh,
  Meh,
  XCircle,
  Sparkles,
} from "lucide-react";
import { fontFamily, THEME } from "../../theme";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating idle motion
  const idleFloat = Math.sin(frame * 0.1) * 16;
  const idleRotate = Math.sin(frame * 0.08) * 3;

  // Phase 1 (0 - 195 frames) vs Phase 2 (195 - 384 frames)
  const isPhase1 = frame < 195;

  // Badge Spring Entrance
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 9, stiffness: 190, mass: 0.7 },
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.1, 1]);
  const badgeRotate = interpolate(badgeSpring, [0, 1], [-20, -3]);

  // "KOK BISA?!" Comic Sticker (frame 144)
  const kokBisaAge = Math.max(0, frame - 144);
  const kokBisaSpring = spring({
    frame: kokBisaAge,
    fps,
    config: { damping: 8, stiffness: 220, mass: 0.5 },
  });
  const kokBisaScale = interpolate(kokBisaSpring, [0, 1], [0, 1.15]);

  // Phase 2 Springs (Comparison Duel)
  const p2Age = Math.max(0, frame - 195);
  const card1Spring = spring({
    frame: p2Age,
    fps,
    config: { damping: 11, stiffness: 160 },
  });
  const card2Spring = spring({
    frame: Math.max(0, p2Age - 15),
    fps,
    config: { damping: 11, stiffness: 160 },
  });
  const card1Y = interpolate(card1Spring, [0, 1], [-300, 0]);
  const card2Y = interpolate(card2Spring, [0, 1], [300, 0]);

  // Stamp "BUKAN SALAH JARI!" at frame 282
  const stampAge = Math.max(0, frame - 282);
  const stampSpring = spring({
    frame: stampAge,
    fps,
    config: { damping: 8, stiffness: 240, mass: 0.6 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [3, 1]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 180,
        zIndex: 10,
      }}
    >
      {/* ========================================================= */}
      {/* PHASE 1: CHUNKY SPOILER BRAIN (0 - 195 FRAMES) */}
      {/* ========================================================= */}
      {isPhase1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Giant Chunky "SPOILER ALERT!" Badge */}
          <div
            style={{
              transform: `scale(${badgeScale}) rotate(${badgeRotate}deg)`,
              background: THEME.colors.yellow,
              color: THEME.colors.ink,
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 36,
              padding: "16px 54px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 40,
            }}
          >
            <AlertTriangle size={64} color={THEME.colors.ink} strokeWidth={3.5} />
            <span
              style={{
                fontSize: 68,
                fontWeight: 900,
                letterSpacing: "1px",
              }}
            >
              SPOILER ALERT!
            </span>
          </div>

          {/* Giant Chunky Flat Brain Character (720px wide) */}
          <div
            style={{
              position: "relative",
              width: 720,
              height: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translateY(${idleFloat}px) rotate(${idleRotate}deg)`,
            }}
          >
            {/* SVG Chunky Brain with Solid Coral Fill, Thick 10px Stroke & Eyes */}
            <svg
              viewBox="0 0 500 380"
              style={{
                width: "100%",
                height: "100%",
                overflow: "visible",
                filter: "drop-shadow(10px 14px 0px rgba(15, 23, 42, 0.35))",
              }}
            >
              {/* Brain Main Silhouette */}
              <path
                d="M 120 220 
                   C 70 200, 60 140, 110 90 
                   C 140 60, 200 60, 240 85 
                   C 280 50, 360 50, 390 90 
                   C 440 140, 430 200, 390 230 
                   C 420 280, 380 340, 320 330 
                   C 280 325, 260 290, 240 300 
                   C 210 320, 160 340, 120 310 
                   C 70 270, 90 230, 120 220 Z"
                fill={THEME.colors.coral}
                stroke={THEME.colors.ink}
                strokeWidth="12"
                strokeLinejoin="round"
              />

              {/* Brain Inner Folds / Grooves (Chunky) */}
              <path
                d="M 180 110 Q 220 160 170 210 Q 230 250 200 300"
                fill="none"
                stroke={THEME.colors.ink}
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 310 110 Q 280 170 330 220 Q 280 270 300 310"
                fill="none"
                stroke={THEME.colors.ink}
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Cute Expressive Eyes (Cartoon Kok Bisa style) */}
              {/* Left Eye */}
              <circle cx="205" cy="190" r="22" fill="#FFF" stroke={THEME.colors.ink} strokeWidth="7" />
              <circle cx="212" cy="188" r="10" fill={THEME.colors.ink} />
              <circle cx="216" cy="184" r="3.5" fill="#FFF" />

              {/* Right Eye (Smirking/Winking or Looking) */}
              <circle cx="285" cy="190" r="22" fill="#FFF" stroke={THEME.colors.ink} strokeWidth="7" />
              <circle cx="292" cy="188" r="10" fill={THEME.colors.ink} />
              <circle cx="296" cy="184" r="3.5" fill="#FFF" />

              {/* Smirking Mouth */}
              <path
                d="M 230 235 Q 250 255 270 235"
                fill="none"
                stroke={THEME.colors.ink}
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Rosy Cheeks */}
              <circle cx="170" cy="225" r="14" fill="#FF8787" opacity="0.8" />
              <circle cx="320" cy="225" r="14" fill="#FF8787" opacity="0.8" />
            </svg>

            {/* "KOK BISA?!" Giant Comic Burst Sticker */}
            {frame >= 144 && (
              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  transform: `scale(${kokBisaScale}) rotate(10deg)`,
                  background: THEME.colors.orange,
                  color: "#FFF",
                  border: `8px solid ${THEME.colors.ink}`,
                  boxShadow: THEME.colors.popShadowLarge,
                  padding: "16px 40px",
                  borderRadius: 36,
                  fontSize: 60,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <HelpCircle size={56} color="#FFF" strokeWidth={3.5} />
                <span>KOK BISA?!</span>
              </div>
            )}
          </div>

          {/* Giant Punchy Keyword */}
          <div
            style={{
              marginTop: 40,
              fontSize: 72,
              fontWeight: 900,
              color: THEME.colors.ink,
              textAlign: "center",
              letterSpacing: "-1px",
              textTransform: "uppercase",
            }}
          >
            Otakmu Lagi{" "}
            <span
              style={{
                color: THEME.colors.coral,
                textDecoration: "underline",
                textDecorationColor: THEME.colors.yellow,
                textDecorationThickness: 10,
              }}
            >
              Spoiler!
            </span>
          </div>

          {/* Sub-badge under Otakmu Lagi Spoiler */}
          <div
            style={{
              marginTop: 24,
              background: "#FFF",
              border: `5px solid ${THEME.colors.ink}`,
              boxShadow: "4px 4px 0 #0F172A",
              borderRadius: 24,
              padding: "10px 28px",
              fontSize: 32,
              fontWeight: 800,
              color: THEME.colors.ink,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Sparkles size={32} color={THEME.colors.orange} strokeWidth={3} />
            <span>BOCORAN RAHASIA SENSORIK</span>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 2: GIANT CHUNKY COMPARISON (195 - 384 FRAMES) */}
      {/* ========================================================= */}
      {!isPhase1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: "0 40px",
          }}
        >
          {/* Giant Card 1: DIGELITIK ORANG LAIN */}
          <div
            style={{
              width: "100%",
              maxWidth: 920,
              background: THEME.colors.teal,
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 40,
              padding: "36px 44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 40,
              transform: `translateY(${card1Y}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 30,
                  background: "#FFF",
                  border: `6px solid ${THEME.colors.ink}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Laugh size={64} color={THEME.colors.ink} strokeWidth={2.8} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: "rgba(15, 23, 42, 0.75)",
                    textTransform: "uppercase",
                  }}
                >
                  Orang Lain
                </div>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 900,
                    color: THEME.colors.ink,
                    letterSpacing: "-1px",
                  }}
                >
                  100% GELI! ⚡
                </div>
              </div>
            </div>

            <Sparkles size={52} color={THEME.colors.yellow} strokeWidth={3} />
          </div>

          {/* Giant Card 2: DIGELITIK SENDIRI */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 920,
              background: "#FFF",
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 40,
              padding: "32px 44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 36,
              transform: `translateY(${card2Y}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 28,
                  background: THEME.colors.bgWarmYellow,
                  border: `6px solid ${THEME.colors.ink}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Meh size={58} color={THEME.colors.ink} strokeWidth={2.8} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "rgba(15, 23, 42, 0.6)",
                    textTransform: "uppercase",
                  }}
                >
                  Diri Sendiri
                </div>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 900,
                    color: THEME.colors.ink,
                    letterSpacing: "-1px",
                  }}
                >
                  0% GELI / KEBAS
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* FILLING THE VOID: CHUNKY DUEL ILLUSTRATION STAGE */}
          {/* ========================================================= */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 920,
              height: 480,
              display: "flex",
              gap: 24,
            }}
          >
            {/* Left Duel Box: Orang Lain (Laughing Madly) */}
            <div
              style={{
                flex: 1,
                background: THEME.colors.bgSoftBlue,
                border: `8px solid ${THEME.colors.ink}`,
                boxShadow: THEME.colors.popShadowLarge,
                borderRadius: 36,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: THEME.colors.ink,
                  background: THEME.colors.yellow,
                  border: `4px solid ${THEME.colors.ink}`,
                  borderRadius: 16,
                  padding: "6px 16px",
                  boxShadow: "3px 3px 0 #0F172A",
                }}
              >
                RESPON: REFLEKS
              </div>

              {/* Chunky Cartoon Laughing Face */}
              <svg viewBox="0 0 200 200" style={{ width: 220, height: 220, overflow: "visible" }}>
                {/* Face Circle */}
                <circle cx="100" cy="100" r="85" fill={THEME.colors.yellow} stroke={THEME.colors.ink} strokeWidth="10" />
                {/* Squeezed Laughing Eyes (> <) */}
                <path d="M 55 85 L 75 95 L 55 105" fill="none" stroke={THEME.colors.ink} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 145 85 L 125 95 L 145 105" fill="none" stroke={THEME.colors.ink} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                {/* Big Open Laughing Mouth */}
                <path d="M 65 125 Q 100 175 135 125 Z" fill={THEME.colors.coral} stroke={THEME.colors.ink} strokeWidth="8" strokeLinejoin="round" />
                {/* Tongue */}
                <path d="M 85 145 Q 100 165 115 145" fill={THEME.colors.pink} />
                {/* Rosy Cheeks */}
                <circle cx="48" cy="120" r="14" fill="#FF8787" opacity="0.8" />
                <circle cx="152" cy="120" r="14" fill="#FF8787" opacity="0.8" />
                {/* Tear of Joy */}
                <path d="M 160 85 C 160 85, 175 95, 175 105 C 175 112, 168 116, 160 116 C 152 116, 145 112, 145 105 C 145 95, 160 85, 160 85 Z" fill="#38BDF8" stroke={THEME.colors.ink} strokeWidth="4" />
              </svg>

              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: THEME.colors.ink,
                  textTransform: "uppercase",
                  letterSpacing: "-0.5px",
                }}
              >
                TERBAHAK-BAHAK! 💥
              </div>
            </div>

            {/* Right Duel Box: Diri Sendiri (Deadpan / Poker Face) */}
            <div
              style={{
                flex: 1,
                background: "#FFF",
                border: `8px solid ${THEME.colors.ink}`,
                boxShadow: THEME.colors.popShadowLarge,
                borderRadius: 36,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "rgba(15, 23, 42, 0.7)",
                  background: THEME.colors.bgWarmCream,
                  border: `4px solid ${THEME.colors.ink}`,
                  borderRadius: 16,
                  padding: "6px 16px",
                  boxShadow: "3px 3px 0 #0F172A",
                }}
              >
                RESPON: DIREDAM
              </div>

              {/* Chunky Cartoon Bored Face */}
              <svg viewBox="0 0 200 200" style={{ width: 220, height: 220, overflow: "visible" }}>
                {/* Face Circle */}
                <circle cx="100" cy="100" r="85" fill="#F8FAFC" stroke={THEME.colors.ink} strokeWidth="10" />
                {/* Flat bored eyes (- -) */}
                <line x1="55" y1="95" x2="85" y2="95" stroke={THEME.colors.ink} strokeWidth="9" strokeLinecap="round" />
                <line x1="115" y1="95" x2="145" y2="95" stroke={THEME.colors.ink} strokeWidth="9" strokeLinecap="round" />
                {/* Flat straight mouth */}
                <line x1="75" y1="140" x2="125" y2="140" stroke={THEME.colors.ink} strokeWidth="9" strokeLinecap="round" />
                {/* Sweat Drop */}
                <path d="M 150 70 C 150 70, 160 80, 160 88 C 160 93, 155 97, 150 97 C 145 97, 140 93, 140 88 C 140 80, 150 70, 150 70 Z" fill="#94A3B8" stroke={THEME.colors.ink} strokeWidth="4" />
              </svg>

              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: "rgba(15, 23, 42, 0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.5px",
                }}
              >
                HAMBAR TOTAL... 😴
              </div>
            </div>

            {/* Giant Red Stamp Slam at frame 282 ("BUKAN SALAH JARI!") */}
            {frame >= 282 && (
              <div
                style={{
                  position: "absolute",
                  inset: -14,
                  background: THEME.colors.coral,
                  border: `12px solid ${THEME.colors.ink}`,
                  borderRadius: 48,
                  boxShadow: "16px 20px 0px #0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 24,
                  transform: `scale(${stampScale}) rotate(-4deg)`,
                  zIndex: 30,
                }}
              >
                <XCircle size={84} color="#FFF" strokeWidth={3.5} />
                <span
                  style={{
                    fontSize: 64,
                    fontWeight: 900,
                    color: "#FFF",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textShadow: "4px 4px 0px #0F172A",
                  }}
                >
                  BUKAN SALAH JARI!
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
