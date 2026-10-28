import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../../src/theme/tokens";
import { FONTS } from "../../../src/theme/fonts";
import channelLogo from "../../../public/assets/global/logo_circle_only.png";
import sfxPop from "../../../public/sfx/pop.wav";

export const ClosingCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi pop-in elastis kartu
  const cardScale = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 110,
      mass: 0.8,
    },
  });

  // Animasi denyut halus tombol follow
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
      {/* SFX Pop saat kartu muncul */}
      <Audio src={sfxPop} startFrom={0} volume={0.8} />

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

      {/* Kartu Utama CTA Ber-Avatar (Neutral Frosted Dark Glass) */}
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

        {/* Tombol Interaktif Ajakan Follow */}
        <div
          style={{
            transform: `scale(${buttonPulse})`,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
            padding: "16px 36px",
            borderRadius: 999,
            boxShadow:
              "0 10px 25px rgba(245, 158, 11, 0.45), 0 4px 10px rgba(0,0,0,0.5)",
            border: "1.5px solid #FDE68A",
          }}
        >
          <span
            style={{
              fontSize: 24,
              display: "inline-block",
              transform: `rotate(${bellWiggle}deg)`,
            }}
          >
            🔔
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
            + Follow @AdaDiQuran
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
