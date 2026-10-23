import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Brain,
  Megaphone,
  UserPlus,
} from "lucide-react";
import { fontFamily, THEME } from "../../theme";

export const Scene6Penutup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating idle motion
  const idleFloat = Math.sin(frame * 0.1) * 10;

  // Phase transition at frame 170 (Narration: "Follow buat fakta 60 detik lainnya, ya!")
  const isCtaPhase = frame >= 170;
  const ctaAge = Math.max(0, frame - 170);

  // Megaphone soundwaves
  const waveScale = interpolate(frame % 25, [0, 25], [1, 2.2]);
  const waveOpacity = interpolate(frame % 25, [0, 18, 25], [0.8, 0.4, 0]);

  // CTA Button Bounce Spring
  const ctaSpring = spring({
    frame: ctaAge,
    fps,
    config: { damping: 9, stiffness: 200, mass: 0.6 },
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.3, 1]);
  const buttonPulse = 1 + Math.sin(ctaAge * 0.25) * 0.06;

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
        paddingTop: 210,
        zIndex: 10,
      }}
    >
      {/* ========================================================= */}
      {/* PHASE 1: BRAIN WITH MEGAPHONE (Frames 0 - 170) */}
      {/* ========================================================= */}
      {!isCtaPhase && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 920,
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
              marginBottom: 28,
            }}
          >
            Kesimpulan:{" "}
            <span
              style={{
                color: THEME.colors.coral,
                textDecoration: "underline",
                textDecorationColor: THEME.colors.yellow,
                textDecorationThickness: 8,
              }}
            >
              Otakmu Bocor!
            </span>
          </div>

          {/* Giant Chunky Brain with Megaphone Disc */}
          <div
            style={{
              position: "relative",
              width: 350,
              height: 350,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translateY(${idleFloat}px)`,
              marginBottom: 32,
            }}
          >
            {/* Soundwave Ring */}
            <div
              style={{
                position: "absolute",
                width: 310,
                height: 310,
                borderRadius: "50%",
                border: `8px solid ${THEME.colors.coral}`,
                transform: `scale(${waveScale})`,
                opacity: waveOpacity,
              }}
            />

            {/* Central Disc */}
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: THEME.colors.coral,
                border: `12px solid ${THEME.colors.ink}`,
                boxShadow: THEME.colors.popShadowLarge,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Brain size={160} color="#FFF" strokeWidth={2.4} />

              {/* Megaphone Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: -12,
                  right: -12,
                  background: THEME.colors.yellow,
                  borderRadius: "50%",
                  padding: 16,
                  border: `6px solid ${THEME.colors.ink}`,
                  boxShadow: THEME.colors.popShadow,
                }}
              >
                <Megaphone size={48} color={THEME.colors.ink} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Giant Kinetic Banner */}
          <div
            style={{
              background: THEME.colors.yellow,
              color: THEME.colors.ink,
              border: `10px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 44,
              padding: "18px 56px",
              fontSize: 68,
              fontWeight: 900,
              letterSpacing: "1px",
              textTransform: "uppercase",
              textAlign: "center",
              transform: "rotate(-2deg)",
              marginBottom: 28,
            }}
          >
            TUKANG SPOILER! 📢
          </div>

          {/* Concluding Punchline Card */}
          <div
            style={{
              width: "100%",
              background: "#FFF",
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 36,
              padding: "24px 32px",
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
                <Brain size={34} color={THEME.colors.coral} strokeWidth={3} />
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: THEME.colors.ink,
                  }}
                >
                  PERAN UTAMA SEREBELUM
                </span>
              </div>
              <div
                style={{
                  background: THEME.colors.yellow,
                  color: THEME.colors.ink,
                  border: `3px solid ${THEME.colors.ink}`,
                  borderRadius: 14,
                  padding: "4px 14px",
                  fontSize: 20,
                  fontWeight: 900,
                  boxShadow: "3px 3px 0 #0F172A",
                }}
              >
                SPOILER ALERT 🚨
              </div>
            </div>
            <div
              style={{
                fontSize: 35,
                fontWeight: 800,
                color: THEME.colors.ink,
                lineHeight: 1.35,
              }}
            >
              "Membocorkan sensasi sentuhan sebelum kamu sempat merasakannya!"
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PHASE 2: CLEAN BRIGHT OUTRO / CTA (Frames 170 - 267) */}
      {/* ========================================================= */}
      {isCtaPhase && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            transform: `scale(${ctaScale})`,
            marginTop: 220,
          }}
        >
          {/* Cute Mascot Avatar Disc */}
          <div
            style={{
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: THEME.colors.yellow,
              border: `10px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 28,
            }}
          >
            <Brain size={135} color={THEME.colors.ink} strokeWidth={2.5} />
          </div>

          {/* Channel Name */}
          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              color: THEME.colors.ink,
              letterSpacing: "-1.5px",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Eh Lo Tau Nggak?
          </div>

          {/* Tagline Pill */}
          <div
            style={{
              background: THEME.colors.yellow,
              border: `4px solid ${THEME.colors.ink}`,
              boxShadow: "3px 3px 0px #0F172A",
              padding: "10px 28px",
              borderRadius: 20,
              fontSize: 32,
              fontWeight: 800,
              color: THEME.colors.ink,
              marginBottom: 44,
              textAlign: "center",
            }}
          >
            Fakta Sains 60 Detik Tiap Hari 🚀
          </div>

          {/* Giant Bouncing FOLLOW Button (Centered at Eye-Level) */}
          <div
            style={{
              transform: `scale(${buttonPulse})`,
              background: THEME.colors.coral,
              color: "#FFF",
              border: `10px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 60,
              padding: "26px 76px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              cursor: "pointer",
              marginBottom: 36,
            }}
          >
            <UserPlus size={56} color="#FFF" strokeWidth={3.5} />
            <span
              style={{
                fontSize: 54,
                fontWeight: 900,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              FOLLOW SEKARANG
            </span>
          </div>

          {/* Share & Save Teaser Badge */}
          <div
            style={{
              background: "#FFF",
              border: `6px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadow,
              borderRadius: 24,
              padding: "16px 40px",
              fontSize: 32,
              fontWeight: 800,
              color: THEME.colors.ink,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>💡 LIKE, SHARE & SIMPAN BIAR PINTAR!</span>
          </div>
        </div>
      )}
    </div>
  );
};
