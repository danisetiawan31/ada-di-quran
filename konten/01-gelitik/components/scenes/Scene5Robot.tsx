import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Bot,
  Timer,
  Hand,
  ArrowRight,
  Laugh,
  Sparkles,
  Zap,
} from "lucide-react";
import { fontFamily, THEME } from "../../theme";

export const Scene5Robot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating idle motion for illustrations
  const idleFloat = Math.sin(frame * 0.1) * 10;

  // Phase transition at frame 183 (Narration: "...rasa geli itu langsung muncul lagi", abs frame 1449)
  const isExplosionPhase = frame >= 183;
  const explosionAge = Math.max(0, frame - 183);

  // Timer Denyut Pulse
  const timerPulse = 1 + Math.sin(frame * 0.25) * 0.12;

  // Explosion Spring Banner
  const bannerSpring = spring({
    frame: explosionAge,
    fps,
    config: { damping: 8, stiffness: 220, mass: 0.6 },
  });
  const bannerScale = interpolate(bannerSpring, [0, 1], [0.2, 1]);
  const bannerRotate = interpolate(bannerSpring, [0, 1], [-6, 0]);

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
        paddingTop: 250,
        zIndex: 10,
      }}
    >
      {/* Giant Title Header */}
      <div
        style={{
          fontSize: 66,
          fontWeight: 900,
          color: THEME.colors.ink,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "-1px",
          marginBottom: 44,
        }}
      >
        Eksperimen:{" "}
        <span
          style={{
            color: THEME.colors.blue,
            textDecoration: "underline",
            textDecorationColor: THEME.colors.yellow,
            textDecorationThickness: 8,
          }}
        >
          Lengan Robot!
        </span>
      </div>

      {/* 3-Part Giant Chunky Horizontal Chain */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transform: `translateY(${idleFloat}px)`,
          marginBottom: 48,
          padding: "0 10px",
        }}
      >
        {/* Step 1: Hand Trigger Circle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: THEME.colors.teal,
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadow,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Hand size={118} color="#FFF" strokeWidth={2.6} />
          </div>
          <span
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: THEME.colors.ink,
              textTransform: "uppercase",
            }}
          >
            Tangan Gerak
          </span>
        </div>

        {/* Thick Chunky Arrow 1 */}
        <div style={{ marginBottom: 44 }}>
          <ArrowRight size={58} color={THEME.colors.ink} strokeWidth={4.5} />
        </div>

        {/* Step 2: The Pulsing Delay Stopwatch Node */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            transform: `scale(${timerPulse})`,
          }}
        >
          <div
            style={{
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: THEME.colors.orange,
              border: `10px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Timer size={140} color="#FFF" strokeWidth={2.6} />
          </div>
          <div
            style={{
              background: THEME.colors.yellow,
              border: `5px solid ${THEME.colors.ink}`,
              boxShadow: "4px 4px 0px #0F172A",
              borderRadius: 20,
              padding: "8px 24px",
              fontSize: 28,
              fontWeight: 900,
              color: THEME.colors.ink,
            }}
          >
            JEDA 0.2 DETIK
          </div>
        </div>

        {/* Thick Chunky Arrow 2 */}
        <div style={{ marginBottom: 44 }}>
          <ArrowRight size={58} color={THEME.colors.ink} strokeWidth={4.5} />
        </div>

        {/* Step 3: Robot Claw Touch */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: THEME.colors.blue,
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadow,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bot size={118} color="#FFF" strokeWidth={2.6} />
          </div>
          <span
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: THEME.colors.ink,
              textTransform: "uppercase",
            }}
          >
            Robot Sentuh
          </span>
        </div>
      </div>

      {/* Explosion Banner & Lower Stage */}
      {!isExplosionPhase ? (
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Timeline Status Bar */}
          <div
            style={{
              width: "100%",
              background: THEME.colors.yellow,
              border: `7px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadow,
              borderRadius: 28,
              padding: "16px 32px",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Timer size={36} color={THEME.colors.ink} strokeWidth={3.5} />
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: THEME.colors.ink,
                }}
              >
                RADAR SEREBELUM: TERPUTUS!
              </span>
            </div>
            <div
              style={{
                background: THEME.colors.coral,
                color: "#FFF",
                border: `3px solid ${THEME.colors.ink}`,
                borderRadius: 14,
                padding: "4px 16px",
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              DELAY 200ms ⚡
            </div>
          </div>

          {/* Lower Pop-Science Card */}
          <div
            style={{
              width: "100%",
              background: "#FFF",
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 36,
              padding: "30px 38px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
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
                  fontSize: 32,
                  fontWeight: 900,
                  color: THEME.colors.ink,
                }}
              >
                HACK SENSORIK LAB
              </span>
              <div
                style={{
                  background: THEME.colors.orange,
                  color: "#FFF",
                  border: `3px solid ${THEME.colors.ink}`,
                  borderRadius: 14,
                  padding: "6px 16px",
                  fontSize: 24,
                  fontWeight: 900,
                }}
              >
                JEDA WAKTU ⏱️
              </div>
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: THEME.colors.ink,
                lineHeight: 1.35,
              }}
            >
              "Jeda sepersekian detik memutus korelasi antara gerakan tangan dan sentuhan!"
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 920,
          }}
        >
          {/* Giant Bouncing Stamp Banner */}
          <div
            style={{
              transform: `scale(${bannerScale}) rotate(${bannerRotate}deg)`,
              background: THEME.colors.yellow,
              color: THEME.colors.ink,
              border: `10px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 44,
              padding: "24px 64px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 24,
            }}
          >
            <Laugh size={72} color={THEME.colors.ink} strokeWidth={3.5} />
            <span
              style={{
                fontSize: 78,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              GELI LAGI! ⚡
            </span>
            <Sparkles size={72} color={THEME.colors.coral} strokeWidth={3.5} />
          </div>

          {/* Explosion Alert Bar */}
          <div
            style={{
              width: "100%",
              background: THEME.colors.coral,
              color: "#FFF",
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 32,
              padding: "18px 32px",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <Zap size={38} color={THEME.colors.yellow} strokeWidth={3.5} />
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.5px",
                textShadow: "2px 2px 0px #0F172A",
              }}
            >
              PREDIKSI KEDALUWARSA ➔ REFLEKS MELEDAK! 💥
            </span>
          </div>

          {/* Explanation Card */}
          <div
            style={{
              width: "100%",
              background: "#FFF",
              border: `7px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadow,
              borderRadius: 30,
              padding: "22px 36px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: THEME.colors.ink,
                lineHeight: 1.35,
              }}
            >
              "Karena ada jeda, otak menganggap sentuhan itu datang dari luar tubuh!"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
