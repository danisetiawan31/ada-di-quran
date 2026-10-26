import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme/tokens";
import { FONTS } from "../theme/fonts";
import { TimedSubtitle } from "../utils/subtitleTiming";

export interface DynamicSubtitleProps {
  subtitles: TimedSubtitle[];
  /**
   * Warna sorotan (highlight) kata kunci (default: Amber #FBBF24)
   */
  highlightColor?: string;
  style?: React.CSSProperties;
}

export const DynamicSubtitle: React.FC<DynamicSubtitleProps> = ({
  subtitles,
  highlightColor = COLORS.amber,
  style,
}) => {
  const frame = useCurrentFrame();

  // Cari subtitle yang sedang aktif pada frame saat ini
  const activeSub = subtitles.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );

  if (!activeSub) {
    return null;
  }

  // Animasi pop-in lembut saat pergantian baris kalimat
  const relativeFrame = frame - activeSub.startFrame;
  const popScale = interpolate(relativeFrame, [0, 4], [0.94, 1.0], {
    extrapolateRight: "clamp",
  });
  const popOpacity = interpolate(relativeFrame, [0, 3], [0.3, 1.0], {
    extrapolateRight: "clamp",
  });

  // Pecah teks menjadi kata-kata dan berikan highlight jika kata cocok
  const words = activeSub.text.split(" ");
  const cleanHighlights = activeSub.highlightWords.map((w) =>
    w.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
  );

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 80,
      }}
    >
      {/* 1. Bottom Dark Vignette: Gradasi hitam halus di bagian bawah agar teks selalu kontras */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 520,
          background: `linear-gradient(to top, rgba(10, 17, 40, 0.92) 0%, rgba(10, 17, 40, 0.65) 50%, transparent 100%)`,
        }}
      />

      {/* 2. Kontainer Teks Subtitle (Safe Zone di atas UI TikTok/Reels) */}
      <div
        style={{
          position: "absolute",
          bottom: 270, // Posisi aman di atas caption TikTok / nama audio
          left: "50%",
          transform: `translateX(-50%) scale(${popScale})`,
          opacity: popOpacity,
          width: "88%",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...style,
        }}
      >
        <p
          style={{
            fontFamily: FONTS.title,
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.35,
            color: COLORS.textWhite,
            margin: 0,
            textShadow: "0 4px 16px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8)",
            letterSpacing: -0.5,
          }}
        >
          {words.map((word, idx) => {
            const cleanWord = word.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
            const isHighlighted = cleanHighlights.includes(cleanWord);

            return (
              <span
                key={idx}
                style={{
                  color: isHighlighted ? highlightColor : COLORS.textWhite,
                  display: "inline-block",
                  marginRight: "0.28em",
                  filter: isHighlighted
                    ? `drop-shadow(0 0 12px ${highlightColor}66)`
                    : "none",
                  fontWeight: isHighlighted ? 900 : 800,
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </AbsoluteFill>
  );
};
