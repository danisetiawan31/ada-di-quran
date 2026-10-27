import React from "react";
import { AbsoluteFill, Audio, Freeze, Series, useCurrentFrame } from "remotion";
import { EP02_THEME } from "./theme";
import { AyahCard } from "../../src/components/AyahCard";
import { DynamicSubtitle } from "../../src/components/DynamicSubtitle";
import { BackgroundMusic } from "../../src/shared/components/BackgroundMusic";
import { generateProportionalSubtitles } from "../../src/utils/subtitleTiming";
import { StoryScenes } from "./components/StoryScenes";
import { ClosingCta } from "./components/ClosingCta";
import { Watermark } from "../../src/components/SacredLight";

// Audio & Image Assets (Self-contained di folder konten/03-manusia-fomo/)
import voMainAudio from "./vo_main.wav";
import voCtaAudio from "./vo_cta.wav";
import ayahAudio from "./ayah.mp3";
import ayahImg from "./ayah.png";

// Subtitle Segments dari BRIEF.md
import { EP02_SUBTITLE_SEGMENTS } from "./subtitles";

export const MainVideo: React.FC = () => {
  const currentFrame = useCurrentFrame();
  const { voMainFrames, ayahFrames, voCtaFrames } = EP02_THEME.dimensions;

  const mainSubtitles = generateProportionalSubtitles(
    EP02_SUBTITLE_SEGMENTS,
    voMainFrames
  );

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
    <AbsoluteFill
      style={{
        backgroundColor: EP02_THEME.colors.bgWarmOffice,
        overflow: "hidden",
      }}
    >
      {/* =========================================================================
          LAYER 1: BASE VISUAL LAYER (Ilustrasi 2D Cerita & Karakter Reusable)
          Adegan visual dibekukan saat masuk ke pembacaan ayat agar latar belakang
          memiliki efek blur estetik (bukan hitam polos).
         ========================================================================= */}
      <AbsoluteFill style={{ zIndex: 1 }}>
        <Freeze
          frame={Math.max(0, voMainFrames - 1)}
          active={currentFrame >= voMainFrames}
        >
          <StoryScenes />
        </Freeze>
      </AbsoluteFill>

      {/* =========================================================================
          BGM / AMBIENCE LAYER (Adaptif):
          BGM santai aktif pada Bagian 1 (volume default 25% per SSOT), dan
          DIMATIKAN TOTAL saat masuk ke Ayat Al-Qur'an demi kekhusyukan murattal.
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
          {/* SEKUENS 1: Narasi Utama (vo_main.wav) + Subtitle Proporsional */}
          <Series.Sequence
            durationInFrames={voMainFrames}
            name="Sekuens 1: Narasi Utama Psikologi"
          >
            <Audio src={voMainAudio} />
            <DynamicSubtitle subtitles={mainSubtitles} />
          </Series.Sequence>

          {/* SEKUENS 2: Ayat Al-Qur'an (QS. Al-Anbiya: 37) */}
          <Series.Sequence
            durationInFrames={ayahFrames}
            name="Sekuens 2: QS. Al-Anbiya 37"
          >
            <AyahCard
              surahNumber={21}
              ayahNumber={37}
              translationText="Manusia telah dijadikan (bertabiat) tergesa-gesa. Kelak akan Aku perlihatkan kepadamu tanda-tanda (kekuasaan)-Ku. Maka janganlah kamu meminta Aku menyegerakannya."
              imageSrc={ayahImg}
              audioSrc={ayahAudio}
              durationInFrames={ayahFrames}
              audioDurationInFrames={ayahFrames}
              hasFadeOut={false}
            />
          </Series.Sequence>

          {/* SEKUENS 3: Penutup & Outro CTA */}
          <Series.Sequence
            durationInFrames={voCtaFrames}
            name="Sekuens 3: Penutup & CTA"
          >
            <Audio src={voCtaAudio} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(15, 23, 42, 0.75)",
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
