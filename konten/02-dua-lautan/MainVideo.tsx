import React from "react";
import { AbsoluteFill, Audio, Freeze, Series, useCurrentFrame } from "remotion";
import { EP01_THEME } from "./theme";
import { AyahCard } from "../../src/components/AyahCard";
import { DualAyahCard } from "../../src/components/DualAyahCard";
import { DynamicSubtitle } from "../../src/components/DynamicSubtitle";
import { BackgroundMusic } from "../../src/shared/components/BackgroundMusic";
import { generateProportionalSubtitles } from "../../src/utils/subtitleTiming";
import { COLORS } from "../../src/theme/tokens";
import { FONTS } from "../../src/theme/fonts";
import { StoryScenes } from "./components/StoryScenes";
import { ClosingCta } from "./components/ClosingCta";
import { Watermark } from "../../src/components/SacredLight";

// Audio & Image Assets (Self-contained di dalam folder konten/02-dua-lautan/)
import voMainAudio from "./vo_main.wav";
import voCtaAudio from "./vo_cta.wav";
import ayah19Audio from "./ayah_19.mp3";
import ayah19Img from "./ayah_19.png";
import ayah20Audio from "./ayah_20.mp3";
import ayah20Img from "./ayah_20.png";

// Subtitle segments dari BRIEF.md
import { EP01_SUBTITLE_SEGMENTS } from "./subtitles";

export const MainVideo: React.FC = () => {
  const currentFrame = useCurrentFrame();
  const { voMainFrames, ayah19Frames, ayah20Frames, voCtaFrames } = EP01_THEME.dimensions;

  const mainSubtitles = generateProportionalSubtitles(EP01_SUBTITLE_SEGMENTS, voMainFrames);

  const ctaSubtitles = [
    {
      text: "Follow Ada di Quran buat tahu fakta menarik lainnya, ya!",
      startFrame: 0,
      endFrame: voCtaFrames,
      durationInFrames: voCtaFrames,
      highlightWords: ["Follow", "Ada", "Quran"],
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A1128", overflow: "hidden" }}>
      {/* =========================================================================
          LAYER 1: BASE VISUAL LAYER (Ilustrasi 2D Cerita)
          Adegan visual dibekukan saat masuk ke pembacaan ayat.
         ========================================================================= */}
      <AbsoluteFill style={{ zIndex: 1 }}>
        <Freeze frame={Math.max(0, voMainFrames - 1)} active={currentFrame >= voMainFrames}>
          <StoryScenes />
        </Freeze>
      </AbsoluteFill>

      {/* =========================================================================
          BGM / AMBIENCE LAYER (Adaptif):
          BGM aktif pada Bagian 1, dan DIMATIKAN TOTAL saat masuk ke Ayat Al-Qur'an.
         ========================================================================= */}
      {currentFrame < voMainFrames && (
        <BackgroundMusic
          track="bossa"
          volume={0.25}
          durationInFrames={voMainFrames}
          fadeOutFrames={30}
        />
      )}

      {/* =========================================================================
          LAYER 2: SEQUENTIAL AUDIO & OVERLAY LAYER (<Series>)
         ========================================================================= */}
      {/* CHANNEL WATERMARK DI SAFE ZONE ATAS (Hanya saat narasi visual cerita) */}
      {currentFrame < voMainFrames && <Watermark channelName="@AdaDiQuran" />}

      <AbsoluteFill style={{ zIndex: 10 }}>
        <Series>
          {/* SEKUENS 1: Narasi Utama (vo_main.wav) + Subtitle */}
          <Series.Sequence durationInFrames={voMainFrames} name="Sekuens 1: Narasi Utama">
            <Audio src={voMainAudio} />
            <DynamicSubtitle subtitles={mainSubtitles} />
          </Series.Sequence>

          {/* SEKUENS 2: Ayat 19 & 20 (QS. Ar-Rahman: 19–20) Tanpa Jeda / Seamless */}
          <Series.Sequence
            durationInFrames={ayah19Frames + ayah20Frames}
            name="Sekuens 2: Ayat 19-20"
          >
            <DualAyahCard
              surahNumber={55}
              ayahs={[
                {
                  ayahNumber: 19,
                  translationText:
                    "Dia membiarkan dua laut mengalir yang (kemudian) keduanya bertemu.",
                  imageSrc: ayah19Img,
                  audioSrc: ayah19Audio,
                  durationInFrames: ayah19Frames,
                },
                {
                  ayahNumber: 20,
                  translationText:
                    "Di antara keduanya ada batas yang tidak dilampaui masing-masing.",
                  imageSrc: ayah20Img,
                  audioSrc: ayah20Audio,
                  durationInFrames: ayah20Frames,
                },
              ]}
            />
          </Series.Sequence>

          {/* SEKUENS 3: Penutup & CTA */}
          <Series.Sequence durationInFrames={voCtaFrames} name="Sekuens 3: Penutup & CTA">
            <Audio src={voCtaAudio} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(10, 17, 40, 0.7)",
                backdropFilter: "blur(14px)",
              }}
            />
            <DynamicSubtitle subtitles={ctaSubtitles} />
            <ClosingCta />
          </Series.Sequence>
        </Series>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
