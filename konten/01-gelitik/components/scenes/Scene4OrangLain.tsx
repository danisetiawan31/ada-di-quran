import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Bot, HelpCircle, Zap, Laugh, Brain, FlaskConical } from "lucide-react";
import { fontFamily, THEME } from "../../theme";

export const Scene4OrangLain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating idle motion
  const idleFloat = Math.sin(frame * 0.12) * 16;
  const shakeIntensity = interpolate(frame, [60, 80, 120], [0, 16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 2.2) * shakeIntensity;

  // Phase switch at frame 180 (Twist: "Uniknya, otak bisa ditipu!")
  const isTwistPhase = frame >= 180;
  const twistAge = Math.max(0, frame - 180);

  // Question Marks Floating
  const q1Float = Math.sin(frame * 0.18) * 20;
  const q2Float = Math.cos(frame * 0.22) * 22;

  // Twist Slam Spring
  const twistSpring = spring({
    frame: twistAge,
    fps,
    config: { damping: 8, stiffness: 220, mass: 0.6 },
  });
  const twistScale = interpolate(twistSpring, [0, 1], [0.2, 1]);
  const twistRotate = interpolate(twistSpring, [0, 1], [-12, -2]);

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
        paddingTop: 200,
        zIndex: 10,
        transform: `translateX(${shakeX}px)`,
      }}
    >
      {/* ========================================================= */}
      {/* PHASE 1: CONFUSED BRAIN & SENSORY SHOCK (Frames 0 - 180) */}
      {/* ========================================================= */}
      {!isTwistPhase && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Giant Title Header */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: THEME.colors.ink,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "-1px",
              marginBottom: 30,
            }}
          >
            Digelitik Orang Lain:{" "}
            <span
              style={{
                color: THEME.colors.purple,
                textDecoration: "underline",
                textDecorationColor: THEME.colors.yellow,
                textDecorationThickness: 8,
              }}
            >
              Tanpa Bocoran!
            </span>
          </div>

          {/* Giant Chunky Brain (Confused with dizzy/questioning eyes) */}
          <div
            style={{
              position: "relative",
              width: 720,
              height: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translateY(${idleFloat}px)`,
            }}
          >
            <svg
              viewBox="0 0 500 380"
              style={{
                width: "100%",
                height: "100%",
                overflow: "visible",
                filter: "drop-shadow(10px 14px 0px rgba(15, 23, 42, 0.35))",
              }}
            >
              {/* Brain Silhouette in Vibrant Purple */}
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
                fill={THEME.colors.purple}
                stroke={THEME.colors.ink}
                strokeWidth="12"
                strokeLinejoin="round"
              />

              {/* Chunky Inner Grooves */}
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

              {/* Shocked / Confused Spiral Eyes */}
              <circle cx="205" cy="190" r="24" fill="#FFF" stroke={THEME.colors.ink} strokeWidth="7" />
              <text x="194" y="200" fontSize="28" fontWeight="900" fill={THEME.colors.ink}>?</text>

              <circle cx="285" cy="190" r="24" fill="#FFF" stroke={THEME.colors.ink} strokeWidth="7" />
              <text x="274" y="200" fontSize="28" fontWeight="900" fill={THEME.colors.ink}>?</text>

              {/* Wavy Mouth */}
              <path
                d="M 225 240 Q 245 230 265 245"
                fill="none"
                stroke={THEME.colors.ink}
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>

            {/* Giant Bouncing Question Mark Sticker 1 (Left) */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 10,
                transform: `translateY(${q1Float}px) rotate(-15deg)`,
                background: THEME.colors.yellow,
                border: `7px solid ${THEME.colors.ink}`,
                boxShadow: THEME.colors.popShadow,
                borderRadius: "50%",
                padding: 16,
              }}
            >
              <HelpCircle size={64} color={THEME.colors.ink} strokeWidth={3.5} />
            </div>

            {/* Giant Bouncing Question Mark Sticker 2 (Right) */}
            <div
              style={{
                position: "absolute",
                top: 40,
                right: 10,
                transform: `translateY(${q2Float}px) rotate(15deg)`,
                background: THEME.colors.yellow,
                border: `7px solid ${THEME.colors.ink}`,
                boxShadow: THEME.colors.popShadow,
                borderRadius: "50%",
                padding: 16,
              }}
            >
              <HelpCircle size={64} color={THEME.colors.ink} strokeWidth={3.5} />
            </div>
          </div>

          {/* Giant Kinetic Banner */}
          <div
            style={{
              marginTop: 40,
              background: THEME.colors.yellow,
              color: THEME.colors.ink,
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 36,
              padding: "18px 54px",
              fontSize: 64,
              fontWeight: 900,
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              transform: "rotate(-2deg)",
            }}
          >
            <Zap size={60} color={THEME.colors.ink} strokeWidth={3.5} />
            <span>100% GELI MAKSIMAL!</span>
            <Laugh size={60} color={THEME.colors.ink} strokeWidth={3.5} />
          </div>

          {/* Lower Pop-Science Card in Phase 1 */}
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              background: "#FFF",
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 36,
              padding: "24px 32px",
              marginTop: 36,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: THEME.colors.ink,
                }}
              >
                MENGAPA TIDAK TEREDAM?
              </span>
              <div
                style={{
                  background: THEME.colors.coral,
                  color: "#FFF",
                  border: `3px solid ${THEME.colors.ink}`,
                  borderRadius: 14,
                  padding: "4px 14px",
                  fontSize: 22,
                  fontWeight: 900,
                }}
              >
                GERAKAN ASING ❓
              </div>
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: THEME.colors.ink,
                lineHeight: 1.3,
              }}
            >
              "Gerakan orang lain tidak dapat diprediksi serebelum, sehingga sensor geli kaget dan meledak 100%!"
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 2: THE TWIST! "OTAK BISA DITIPU!" (Frames 180 - 261) */}
      {/* ========================================================= */}
      {isTwistPhase && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            transform: `scale(${twistScale})`,
          }}
        >
          {/* Top Plot Twist Title */}
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: THEME.colors.ink,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "-1px",
              marginBottom: 24,
            }}
          >
            PLOT TWIST:{" "}
            <span
              style={{
                color: THEME.colors.coral,
                textDecoration: "underline",
                textDecorationColor: THEME.colors.yellow,
                textDecorationThickness: 8,
              }}
            >
              SENSORIK HACK!
            </span>
          </div>

          {/* Central Duel Stage: Brain vs Robot Confrontation */}
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 36,
            }}
          >
            {/* Left: The Bewildered Brain Disc */}
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: THEME.colors.purple,
                border: `10px solid ${THEME.colors.ink}`,
                boxShadow: THEME.colors.popShadowLarge,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Brain size={150} color="#FFF" strokeWidth={2.4} />
              <div
                style={{
                  position: "absolute",
                  bottom: -16,
                  background: THEME.colors.yellow,
                  border: `4px solid ${THEME.colors.ink}`,
                  borderRadius: 16,
                  padding: "4px 16px",
                  fontSize: 22,
                  fontWeight: 900,
                  color: THEME.colors.ink,
                  boxShadow: "3px 3px 0 #0F172A",
                }}
              >
                TERKECIKAL?! 😵
              </div>
            </div>

            {/* Middle: Comic Zap Bolt */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  background: THEME.colors.coral,
                  borderRadius: "50%",
                  padding: 18,
                  border: `6px solid ${THEME.colors.ink}`,
                  boxShadow: THEME.colors.popShadow,
                  transform: "rotate(12deg)",
                }}
              >
                <Zap size={56} color="#FFF" strokeWidth={3} />
              </div>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: THEME.colors.ink,
                  textTransform: "uppercase",
                }}
              >
                DIHACK!
              </span>
            </div>

            {/* Right: The Hacker Robot Disc */}
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: THEME.colors.blue,
                border: `10px solid ${THEME.colors.ink}`,
                boxShadow: THEME.colors.popShadowLarge,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Bot size={150} color="#FFF" strokeWidth={2.4} />
              <div
                style={{
                  position: "absolute",
                  bottom: -16,
                  background: THEME.colors.yellow,
                  border: `4px solid ${THEME.colors.ink}`,
                  borderRadius: 16,
                  padding: "4px 16px",
                  fontSize: 22,
                  fontWeight: 900,
                  color: THEME.colors.ink,
                  boxShadow: "3px 3px 0 #0F172A",
                }}
              >
                LENGAN ROBOT 🤖
              </div>
            </div>
          </div>

          {/* Giant Kinetic Punchy Banner (Only this card tilts!) */}
          <div
            style={{
              background: THEME.colors.yellow,
              color: THEME.colors.ink,
              border: `10px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 44,
              padding: "20px 64px",
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: "1px",
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 1.15,
              marginBottom: 36,
              transform: `rotate(${twistRotate}deg)`,
            }}
          >
            OTAK BISA{" "}
            <span
              style={{
                color: THEME.colors.coral,
                textDecoration: "underline",
                textDecorationColor: THEME.colors.ink,
                textDecorationThickness: 10,
              }}
            >
              DITIPU! 💥
            </span>
          </div>

          {/* Rich Lower Pop-Science Card */}
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              background: "#FFF",
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 36,
              padding: "26px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <FlaskConical
                  size={36}
                  color={THEME.colors.coral}
                  strokeWidth={3}
                />
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 900,
                    color: THEME.colors.ink,
                  }}
                >
                  EKSPERIMEN LABORATORIUM
                </span>
              </div>
              <div
                style={{
                  background: THEME.colors.teal,
                  color: THEME.colors.ink,
                  border: `3px solid ${THEME.colors.ink}`,
                  borderRadius: 14,
                  padding: "4px 16px",
                  fontSize: 22,
                  fontWeight: 900,
                  boxShadow: "3px 3px 0 #0F172A",
                }}
              >
                TRIK JEDA WAKTU ⏱️
              </div>
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: THEME.colors.ink,
                lineHeight: 1.3,
              }}
            >
              "Ilmuwan membuktikan: jeda sepersekian detik cukup untuk mengelabui radar serebelum!"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
