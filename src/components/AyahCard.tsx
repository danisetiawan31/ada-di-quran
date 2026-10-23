import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { COLORS, DIMENSIONS } from "../theme/tokens";
import { FONTS } from "../theme/fonts";
import { getSurahInfo } from "../theme/surahList";

export interface AyahCardProps {
  surahNumber: number;
  ayahNumber: number;
  translationText: string;
  imageSrc: string;
  audioSrc: string;
  /**
   * Durasi tampilan kartu ayat dalam frame.
   * - Jika durasi asli ayat <= 10 detik (<= 300 frames), diputar penuh TANPA FADE OUT (volume 100%).
   * - Jika durasi asli ayat > 10 detik (> 300 frames), dibatasi maksimal 300 frames dengan fade out halus di frame 270-300.
   */
  durationInFrames?: number;
  /**
   * Durasi asli file audio ayat (dalam frame @ 30fps).
   * Digunakan untuk memastikan apakah ayat melebihi 10 detik atau tidak.
   */
  audioDurationInFrames?: number;
  /**
   * Opsi eksplisit untuk memaksa / mematikan fade-out.
   */
  hasFadeOut?: boolean;
}

export const AyahCard: React.FC<AyahCardProps> = ({
  surahNumber,
  ayahNumber,
  translationText,
  imageSrc,
  audioSrc,
  durationInFrames = DIMENSIONS.maxAyahFrames,
  audioDurationInFrames,
  hasFadeOut,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Audio Data untuk Waveform Visualizer & Deteksi Durasi Asli
  const audioData = useAudioData(audioSrc);
  const detectedDurationInFrames = audioData?.durationInSeconds
    ? Math.round(audioData.durationInSeconds * fps)
    : undefined;

  // Tentukan durasi asli audio (dari prop eksplisit, dari audioData, atau dari durationInFrames)
  const actualAudioFrames =
    audioDurationInFrames ?? detectedDurationInFrames ?? durationInFrames;

  // ATURAN MUTLAK SSOT:
  // - Jika audio ayat <= 10 detik (<= 300 frames): TIDAK ADA FADE OUT SAMA SEKALI (volume = 1)
  // - Jika audio ayat > 10 detik (> 300 frames): Batasi 300 frames & Fade Out halus di 1 detik terakhir (270-300)
  const isOver10Seconds = actualAudioFrames > DIMENSIONS.maxAyahFrames;
  const shouldFadeOut = hasFadeOut ?? isOver10Seconds;

  const effectiveDuration = isOver10Seconds
    ? DIMENSIONS.maxAyahFrames
    : Math.min(actualAudioFrames, DIMENSIONS.maxAyahFrames);

  const fadeOutStart = Math.max(0, effectiveDuration - DIMENSIONS.ayahFadeOutFrames);

  // Ambil data nama surah otomatis dari kamus 114 Surah
  const surahInfo = getSurahInfo(surahNumber);

  // Animasi entrance kartu: pop-up halus dengan spring
  const cardScale = spring({
    frame,
    fps,
    config: {
      damping: 18,
      stiffness: 120,
      mass: 0.8,
    },
  });

  // Animasi fade in backdrop blur
  const backdropOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 2. Waveform Visualizer
  const numberOfBars = 32;
  let waveValues: number[] = [];

  if (audioData) {
    waveValues = visualizeAudio({
      fps,
      frame,
      audioData,
      numberOfSamples: numberOfBars,
    });
  } else {
    // Fallback gelombang dinamis jika audioData belum selesai diurai
    waveValues = Array.from({ length: numberOfBars }).map((_, i) =>
      Math.abs(Math.sin(frame * 0.15 + i * 0.3)) * 0.6 + 0.1
    );
  }

  // 2. Logika Auto-Scale Ukuran Font Terjemahan (Anti-Overflow)
  const textLength = translationText.trim().length;
  let translationFontSize = 34;
  let lineHeight = 1.45;

  if (textLength > 200) {
    translationFontSize = 24;
    lineHeight = 1.35;
  } else if (textLength > 150) {
    translationFontSize = 27;
    lineHeight = 1.4;
  } else if (textLength > 90) {
    translationFontSize = 31;
    lineHeight = 1.42;
  }

  return (
    <AbsoluteFill
      style={{
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Audio Murattal: Fade Out HANYA jika durasi ayat > 10 detik sesuai aturan SSOT. Jika <= 10 detik, diputar 100% penuh tanpa fade-out */}
      <Audio
        src={audioSrc}
        volume={
          shouldFadeOut
            ? (f) =>
                interpolate(f, [0, fadeOutStart, effectiveDuration], [1, 1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
            : 1
        }
      />

      {/* Backdrop Dark Overlay dengan Blur untuk mem-freeze scene di bawahnya */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.overlayBlur,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          opacity: backdropOpacity,
        }}
      />

      {/* Kartu Mushaf Warm Cream */}
      <div
        style={{
          width: 920,
          maxWidth: "88%",
          backgroundColor: COLORS.mushafCream,
          borderRadius: 32,
          border: `3px solid ${COLORS.amber}`,
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.45), 0 0 35px rgba(251, 191, 36, 0.25)`,
          padding: "44px 40px 36px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${cardScale})`,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header Badge: Nama Surah & Nomor Ayat */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
            backgroundColor: "rgba(251, 191, 36, 0.12)",
            border: `1.5px solid ${COLORS.amber}`,
            padding: "8px 24px",
            borderRadius: 999,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.title,
              fontWeight: 800,
              fontSize: 22,
              color: "#92400E",
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            QS. {surahInfo.name} [{surahNumber}]: {ayahNumber}
          </span>
        </div>

        {/* Gambar Kaligrafi Ayat Resmi dari EveryAyah dengan mixBlendMode: 'multiply' */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 120,
            maxHeight: 420,
            padding: "10px 0",
            overflow: "hidden",
          }}
        >
          <Img
            src={imageSrc}
            style={{
              width: "100%",
              maxHeight: 420,
              objectFit: "contain",
              mixBlendMode: "multiply", // Kaligrafi hitam menyatu 100% dengan background cream
            }}
          />
        </div>

        {/* Audio Waveform Visualizer & Progress Bar */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginTop: 20,
            marginBottom: 24,
          }}
        >
          {/* Waveform Bar Horizontal */}
          <div
            style={{
              width: "80%",
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {waveValues.map((val, idx) => {
              const barHeight = Math.max(6, val * 36);
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: `${barHeight}px`,
                    backgroundColor: COLORS.amber,
                    borderRadius: 4,
                    transition: "height 0.08s ease-out",
                    opacity: 0.85,
                  }}
                />
              );
            })}
          </div>

          {/* Garis Progress Waktu Pemutaran Ayat (10 Detik) */}
          <div
            style={{
              width: "85%",
              height: 4,
              backgroundColor: "rgba(251, 191, 36, 0.2)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, (frame / effectiveDuration) * 100)}%`,
                backgroundColor: COLORS.amber,
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* Divider Hiasan Islami Halus */}
        <div
          style={{
            width: "60%",
            height: 1,
            backgroundColor: "rgba(217, 119, 6, 0.2)",
            marginBottom: 20,
          }}
        />

        {/* Teks Terjemahan Standar Kemenag RI (Auto-Scaled & Anti-Overflow) */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            padding: "0 10px",
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: translationFontSize,
              lineHeight,
              color: COLORS.textDark,
              fontWeight: 500,
              margin: 0,
              letterSpacing: -0.2,
            }}
          >
            "{translationText}"
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
