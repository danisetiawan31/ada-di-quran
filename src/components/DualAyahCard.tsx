import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../theme/tokens";
import { FONTS } from "../theme/fonts";
import { getSurahInfo } from "../theme/surahList";

export interface AyahItem {
  ayahNumber: number;
  translationText: string;
  imageSrc: string;
  audioSrc: string;
  durationInFrames: number;
}

export interface DualAyahCardProps {
  surahNumber: number;
  ayahs: [AyahItem, AyahItem];
  hasFadeOut?: boolean;
}

export const DualAyahCard: React.FC<DualAyahCardProps> = ({
  surahNumber,
  ayahs,
  hasFadeOut = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [ayah1, ayah2] = ayahs;
  const splitFrame = ayah1.durationInFrames;
  const totalDuration = ayah1.durationInFrames + ayah2.durationInFrames;

  // Nama Surah
  const surahInfo = getSurahInfo(surahNumber);

  // Animasi entrance kartu sekali di awal sekuens (spring halus)
  const cardScale = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 120,
      mass: 0.8,
    },
  });

  // Animasi backdrop blur fade-in
  const backdropOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Highlight transisi halus antara Ayat 1 dan Ayat 2 tanpa guncangan kartu
  const activeAyah2Progress = interpolate(
    frame,
    [splitFrame - 6, splitFrame + 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const activeAyah1Progress = 1 - activeAyah2Progress;

  // Waveform Bar Horizontal dinamis (ritme audio murattal)
  const numberOfBars = 32;
  const isSecondHalf = frame >= splitFrame;
  const activePulseSpeed = isSecondHalf ? 0.18 : 0.15;

  const waveValues = Array.from({ length: numberOfBars }).map((_, i) => {
    const p = Math.abs(Math.sin(frame * activePulseSpeed + i * 0.32));
    const secondary = Math.abs(Math.cos(frame * 0.1 + i * 0.5));
    return Math.min(1.0, p * 0.65 + secondary * 0.35 + 0.12);
  });

  return (
    <AbsoluteFill
      style={{
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* =========================================================================
          AUDIO LAYER: Diputar berurutan mulus tanpa jeda (seamless continuous flow)
         ========================================================================= */}
      <Sequence from={0} durationInFrames={ayah1.durationInFrames}>
        <Audio src={ayah1.audioSrc} volume={1} />
      </Sequence>
      <Sequence from={splitFrame} durationInFrames={ayah2.durationInFrames}>
        <Audio
          src={ayah2.audioSrc}
          volume={
            hasFadeOut
              ? (f) =>
                  interpolate(f, [ayah2.durationInFrames - 30, ayah2.durationInFrames], [1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })
              : 1
          }
        />
      </Sequence>

      {/* Backdrop Dark Overlay dengan Blur */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.overlayBlur,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          opacity: backdropOpacity,
        }}
      />

      {/* =========================================================================
          KARTU MUSHAF WARM CREAM: Diam stabil di tengah layar, tanpa guncangan
         ========================================================================= */}
      <div
        style={{
          width: 940,
          maxWidth: "90%",
          backgroundColor: COLORS.mushafCream,
          borderRadius: 36,
          border: `3px solid ${COLORS.amber}`,
          boxShadow: `0 24px 70px rgba(0, 0, 0, 0.5), 0 0 40px rgba(251, 191, 36, 0.28)`,
          padding: "38px 42px 34px 42px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${cardScale})`,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header Badge: Nama Surah & Nomor Gabungan Ayat 19–20 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 22,
            backgroundColor: "rgba(251, 191, 36, 0.14)",
            border: `1.5px solid ${COLORS.amber}`,
            padding: "8px 28px",
            borderRadius: 999,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.title,
              fontWeight: 800,
              fontSize: 22,
              color: "#92400E",
              letterSpacing: 0.8,
              textTransform: "uppercase",
            }}
          >
            QS. {surahInfo.name} [{surahNumber}]: {ayah1.ayahNumber}–{ayah2.ayahNumber}
          </span>
        </div>

        {/* ===================================================================
            KONTEN KALIGRAFI 2 AYAT BERGANDINGAN (Stacked Vertically)
           =================================================================== */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: "6px 0",
          }}
        >
          {/* BARIS 1: AYAT 19 */}
          <div
            style={{
              width: "100%",
              minHeight: 125,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 18px",
              borderRadius: 20,
              backgroundColor: `rgba(251, 191, 36, ${0.14 * activeAyah1Progress})`,
              border: `1.5px solid rgba(245, 158, 11, ${0.5 * activeAyah1Progress})`,
              boxShadow:
                activeAyah1Progress > 0.5
                  ? "0 4px 20px rgba(245, 158, 11, 0.15)"
                  : "none",
              opacity: 0.45 + activeAyah1Progress * 0.55,
              transform: `scale(${0.98 + activeAyah1Progress * 0.03})`,
              transition: "transform 0.2s ease, opacity 0.2s ease",
            }}
          >
            <Img
              src={ayah1.imageSrc}
              style={{
                width: "92%",
                maxHeight: 125,
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </div>

          {/* BARIS 2: AYAT 20 */}
          <div
            style={{
              width: "100%",
              minHeight: 125,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 18px",
              borderRadius: 20,
              backgroundColor: `rgba(251, 191, 36, ${0.14 * activeAyah2Progress})`,
              border: `1.5px solid rgba(245, 158, 11, ${0.5 * activeAyah2Progress})`,
              boxShadow:
                activeAyah2Progress > 0.5
                  ? "0 4px 20px rgba(245, 158, 11, 0.15)"
                  : "none",
              opacity: 0.45 + activeAyah2Progress * 0.55,
              transform: `scale(${0.98 + activeAyah2Progress * 0.03})`,
              transition: "transform 0.2s ease, opacity 0.2s ease",
            }}
          >
            <Img
              src={ayah2.imageSrc}
              style={{
                width: "92%",
                maxHeight: 125,
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        </div>

        {/* ===================================================================
            WAVEFORM VISUALIZER & GLOBAL PROGRESS BAR
           =================================================================== */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
            marginBottom: 16,
          }}
        >
          {/* Waveform Bar Horizontal */}
          <div
            style={{
              width: "75%",
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {waveValues.map((val, idx) => {
              const barHeight = Math.max(5, val * 30);
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: `${barHeight}px`,
                    backgroundColor: COLORS.amber,
                    borderRadius: 3,
                    opacity: 0.85,
                  }}
                />
              );
            })}
          </div>

          {/* Garis Progress Waktu Pemutaran Keseluruhan (0 - totalDuration) */}
          <div
            style={{
              width: "82%",
              height: 5,
              backgroundColor: "rgba(251, 191, 36, 0.25)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, (frame / totalDuration) * 100)}%`,
                backgroundColor: COLORS.amber,
                borderRadius: 3,
              }}
            />
          </div>
        </div>

        {/* Divider Garis Hiasan */}
        <div
          style={{
            width: "50%",
            height: 1.5,
            backgroundColor: "rgba(217, 119, 6, 0.25)",
            marginBottom: 16,
          }}
        />

        {/* ===================================================================
            TERJEMAHAN KEMENAG RI: DUA AYAT BERURUTAN DENGAN HIGHLIGHT AKTIF
           =================================================================== */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            textAlign: "center",
            padding: "0 8px",
          }}
        >
          {/* Terjemahan Ayat 19 */}
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 22,
              lineHeight: 1.45,
              color: activeAyah1Progress > 0.5 ? COLORS.textDark : "#64748B",
              fontWeight: activeAyah1Progress > 0.5 ? 700 : 500,
              margin: 0,
              transition: "color 0.2s ease, font-weight 0.2s ease",
            }}
          >
            <span style={{ color: "#D97706", fontWeight: 800 }}>({ayah1.ayahNumber})</span>{" "}
            "{ayah1.translationText}"
          </p>

          {/* Terjemahan Ayat 20 */}
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 22,
              lineHeight: 1.45,
              color: activeAyah2Progress > 0.5 ? COLORS.textDark : "#64748B",
              fontWeight: activeAyah2Progress > 0.5 ? 700 : 500,
              margin: 0,
              transition: "color 0.2s ease, font-weight 0.2s ease",
            }}
          >
            <span style={{ color: "#D97706", fontWeight: 800 }}>({ayah2.ayahNumber})</span>{" "}
            "{ayah2.translationText}"
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
