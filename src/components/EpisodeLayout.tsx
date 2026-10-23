import React from "react";
import {
  AbsoluteFill,
  Audio,
  Freeze,
  Series,
  useCurrentFrame,
} from "remotion";
import { DIMENSIONS } from "../theme/tokens";
import { AyahCard } from "./AyahCard";
import { DynamicSubtitle } from "./DynamicSubtitle";
import { TimedSubtitle } from "../utils/subtitleTiming";
import { BackgroundMusic } from "../shared/components/BackgroundMusic";

export interface EpisodeLayoutProps {
  // Part 1: Main Story & Voiceover
  voMainSrc: string;
  voMainFrames: number;
  mainSubtitles: TimedSubtitle[];
  children: React.ReactNode; // Full-scene 2D illustrations

  // Part 2: Ayah Murattal & Calligraphy
  ayahSurah: number;
  ayahNumber: number;
  ayahTranslation: string;
  ayahAudioSrc: string;
  ayahImageSrc: string;
  ayahFrames?: number; // Default: Math.min(durasi, 300)

  // Part 3: Reusable Outro & CTA
  voCtaSrc?: string;
  voCtaFrames?: number;
  ctaSubtitles?: TimedSubtitle[];
  ctaNode?: React.ReactNode;

  // Optional Ambience / BGM
  bgmTrack?: "bossa" | "rhodes" | string;
  bgmVolume?: number; // 0.15 - 0.20
}

export const EpisodeLayout: React.FC<EpisodeLayoutProps> = ({
  voMainSrc,
  voMainFrames,
  mainSubtitles,
  children,

  ayahSurah,
  ayahNumber,
  ayahTranslation,
  ayahAudioSrc,
  ayahImageSrc,
  ayahFrames = DIMENSIONS.maxAyahFrames,

  voCtaSrc,
  voCtaFrames = 0,
  ctaSubtitles = [],
  ctaNode,

  bgmTrack,
  bgmVolume = 0.15,
}) => {
  const currentFrame = useCurrentFrame();

  const effectiveAyahFrames = Math.min(ayahFrames, DIMENSIONS.maxAyahFrames);
  const effectiveCtaFrames = voCtaSrc ? voCtaFrames : 0;
  const isPart1Active = currentFrame < voMainFrames;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A1128",
        overflow: "hidden",
      }}
    >
      {/* =========================================================================
          LAYER 1: BASE VISUAL LAYER (Ilustrasi 2D Cerita)
          Saat masuk ke Sekuens Ayat (Frame >= voMainFrames), ilustrasi cerita
          dibekukan (<Freeze />) pada frame terakhirnya, sehingga efek blur
          pada <AyahCard /> memiliki latar belakang yang estetik dan tidak hitam.
         ========================================================================= */}
      <AbsoluteFill style={{ zIndex: 1 }}>
        <Freeze
          frame={Math.max(0, voMainFrames - 1)}
          active={currentFrame >= voMainFrames}
        >
          {children}
        </Freeze>
      </AbsoluteFill>

      {/* =========================================================================
          BGM / AMBIENCE LAYER (Adaptif):
          BGM otomatis aktif pada Bagian 1, dan DIMATIKAN TOTAL (fade out)
          saat masuk ke Bagian 2 (Ayat Al-Qur'an) demi kekhusyukan bacaan murattal.
         ========================================================================= */}
      {bgmTrack && (
        <BackgroundMusic
          track={bgmTrack}
          volume={isPart1Active ? bgmVolume : 0}
          durationInFrames={voMainFrames}
          fadeOutFrames={30}
        />
      )}

      {/* =========================================================================
          LAYER 2: SEQUENTIAL AUDIO & OVERLAY LAYER (<Series>)
          Menjalankan 3 Sekuens Audio Linear secara presisi berurutan.
         ========================================================================= */}
      <AbsoluteFill style={{ zIndex: 10 }}>
        <Series>
          {/* SEKUENS 1: Narasi Utama (vo_main.mp3) + Subtitle Proporsional */}
          <Series.Sequence
            durationInFrames={voMainFrames}
            name="Sekuens 1: Narasi Utama & Cerita"
          >
            <Audio src={voMainSrc} />
            <DynamicSubtitle subtitles={mainSubtitles} />
          </Series.Sequence>

          {/* SEKUENS 2: Murattal & Kartu Mushaf Ayat (AyahCard) */}
          <Series.Sequence
            durationInFrames={effectiveAyahFrames}
            name="Sekuens 2: Ayat Al-Qur'an (Murattal & Mushaf)"
          >
            <AyahCard
              surahNumber={ayahSurah}
              ayahNumber={ayahNumber}
              translationText={ayahTranslation}
              imageSrc={ayahImageSrc}
              audioSrc={ayahAudioSrc}
              durationInFrames={effectiveAyahFrames}
            />
          </Series.Sequence>

          {/* SEKUENS 3: Penutup & Outro CTA */}
          {effectiveCtaFrames > 0 && (
            <Series.Sequence
              durationInFrames={effectiveCtaFrames}
              name="Sekuens 3: Penutup & Outro CTA"
            >
              {voCtaSrc && <Audio src={voCtaSrc} />}
              {ctaSubtitles.length > 0 && (
                <DynamicSubtitle subtitles={ctaSubtitles} />
              )}
              {ctaNode}
            </Series.Sequence>
          )}
        </Series>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
