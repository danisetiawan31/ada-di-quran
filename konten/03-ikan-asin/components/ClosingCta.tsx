import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../../src/theme/tokens";
import { FONTS } from "../../../src/theme/fonts";
import channelLogo from "../../../public/assets/global/logo_circle_only.png";

export const ClosingCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi pop-in elastis kartu dengan bouncy overshoot
  const cardScale = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 140,
      mass: 0.85,
    },
  });

  // Animasi Pointer Jari Kartun Bergerak Menuju Tombol Follow
  const fingerRight = interpolate(frame, [10, 26], [-90, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fingerBottom = interpolate(frame, [10, 26], [-110, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fingerOpacity = interpolate(frame, [10, 16, 75, 88], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fingerPress = interpolate(frame, [25, 27, 30], [1, 0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tap impact, rebound, dan status follow (frame 27)
  const isTapped = frame >= 27;
  const buttonTapScale = interpolate(frame, [26, 28, 33, 42], [1, 0.92, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ripple effect saat tombol ditekan (frame 27 - 48)
  const rippleScale = interpolate(frame, [27, 48], [0.85, 2.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleOpacity = interpolate(frame, [27, 32, 48], [0, 0.75, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Denyut halus tombol follow
  const buttonPulse = 1 + Math.sin(frame * 0.18) * 0.035;
  const bellWiggle = Math.sin(frame * 0.25) * 12;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
      }}
    >
      {/* Aura Cahaya Emas di Belakang Kartu */}
      <div
        style={{
          position: "absolute",
          top: "43%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />

      {/* Kartu Utama CTA Ber-Avatar (Bouncy Elastic Dark Glass) */}
      <div
        style={{
          position: "absolute",
          top: "43%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${cardScale})`,
          backgroundColor: "rgba(15, 23, 42, 0.94)",
          backdropFilter: "blur(20px)",
          padding: "44px 52px 38px 52px",
          borderRadius: 38,
          border: `2.5px solid ${COLORS.amber}`,
          boxShadow: `0 24px 70px rgba(0, 0, 0, 0.75), 0 0 50px rgba(245, 158, 11, 0.35)`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 820,
          maxWidth: "88%",
        }}
      >
        {/* Avatar / Logo Lingkar Resmi Channel */}
        <div
          style={{
            width: 145,
            height: 145,
            borderRadius: "50%",
            border: `3.5px solid ${COLORS.amber}`,
            boxShadow: `0 0 30px rgba(245, 158, 11, 0.5), 0 8px 24px rgba(0,0,0,0.6)`,
            overflow: "hidden",
            backgroundColor: "#0F172A",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={channelLogo}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Nama Channel */}
        <h2
          style={{
            fontFamily: FONTS.title,
            color: COLORS.amber,
            fontSize: 48,
            fontWeight: 900,
            margin: 0,
            letterSpacing: 1.5,
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          }}
        >
          ADA DI QURAN
        </h2>

        {/* Tagline Channel */}
        <p
          style={{
            fontFamily: FONTS.body,
            color: COLORS.textWhite,
            fontSize: 22,
            fontWeight: 700,
            marginTop: 8,
            marginBottom: 26,
            opacity: 0.92,
          }}
        >
          Edukasi Tadabbur Visual 2D
        </p>

        {/* Tombol Interaktif Ajakan Follow dengan Tap Impact + Rebound + Ripple */}
        <div style={{ position: "relative" }}>
          {/* Ripple Effect Ring Saat Ditekan */}
          {rippleOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: "3px solid #FDE68A",
                transform: `scale(${rippleScale})`,
                opacity: rippleOpacity,
                pointerEvents: "none",
                boxShadow: "0 0 20px #F59E0B",
              }}
            />
          )}

          <div
            style={{
              transform: `scale(${buttonPulse * buttonTapScale})`,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: isTapped
                ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                : "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              padding: "16px 36px",
              borderRadius: 999,
              boxShadow: isTapped
                ? "0 10px 30px rgba(16, 185, 129, 0.5), 0 0 25px rgba(52, 211, 153, 0.4)"
                : "0 10px 25px rgba(245, 158, 11, 0.45), 0 4px 10px rgba(0,0,0,0.5)",
              border: isTapped ? "2px solid #A7F3D0" : "1.5px solid #FDE68A",
            }}
          >
            <span
              style={{
                fontSize: 24,
                display: "inline-block",
                transform: `rotate(${bellWiggle}deg)`,
              }}
            >
              {isTapped ? "✓" : "🔔"}
            </span>
            <span
              style={{
                fontFamily: FONTS.title,
                color: "#FFFFFF",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {isTapped ? "Followed @AdaDiQuran" : "+ Follow @AdaDiQuran"}
            </span>
          </div>

          {/* Sparkles Bintang Pop Saat Tombol Di-Tap (Frame 27 - 50) */}
          {frame >= 27 && frame < 50 && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "120%",
                height: "140%",
                pointerEvents: "none",
              }}
            >
              {[
                { top: -15, left: "20%", deg: 0, scale: 1 },
                { top: -10, left: "80%", deg: 45, scale: 1.2 },
                { bottom: -12, left: "30%", deg: 30, scale: 0.9 },
                { bottom: -15, left: "75%", deg: 60, scale: 1.1 },
              ].map((sp, idx) => (
                <svg
                  key={idx}
                  width="24"
                  height="24"
                  viewBox="-12 -12 24 24"
                  style={{
                    position: "absolute",
                    top: sp.top,
                    left: sp.left,
                    transform: `rotate(${sp.deg + frame * 4}deg) scale(${sp.scale * (1 - (frame - 27) / 23)})`,
                    opacity: 1 - (frame - 27) / 23,
                  }}
                >
                  <polygon
                    points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3"
                    fill="#FEF08A"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                  />
                </svg>
              ))}
            </div>
          )}

          {/* Pointer Jari Kartun yang Menekan Tombol Follow */}
          {fingerOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                right: fingerRight,
                bottom: fingerBottom,
                transform: `scale(${fingerPress}) rotate(-24deg)`,
                transformOrigin: "20px 20px",
                opacity: fingerOpacity,
                pointerEvents: "none",
                zIndex: 40,
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.6))",
              }}
            >
              <svg width="68" height="68" viewBox="0 0 64 64" fill="none">
                <path
                  d="M 22 28 L 22 10 C 22 6.5 25.5 4 29 4 C 32.5 4 36 6.5 36 10 L 36 26 L 40 25 C 43 24 47 26 47 29 C 47 31 46 33 44 34 L 46 34 C 49 34 52 36.5 52 39.5 C 52 42 50 44 48 44.5 C 50 45 52 47 52 49.5 C 52 53 48 55 44 55 L 32 55 C 24 55 18 48 16 42 L 13 33 C 11.5 29 15 25.5 19 28 L 22 30 Z"
                  fill="#FBD5B5"
                  stroke="#0F172A"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <rect x="24" y="52" width="22" height="10" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
