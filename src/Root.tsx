import React from "react";
import { Composition } from "remotion";

// =========================================================================
// REGISTRY KONTEN VIDEO
// =========================================================================

// 1. KONTEN 1: Video Gelitik (Arsip / Pembelajaran Awal)
import { MainVideo as VideoGelitik } from "../konten/01-gelitik/MainVideo";
import { THEME as GELITIK_THEME } from "../konten/01-gelitik/theme";

// 2. BASE ENGINE: Episode 00 Test ("Ada di Quran" Base Engine)
import { Ep00TestVideo } from "./episodes/Ep00-Test/MainVideo";
import { DIMENSIONS } from "./theme/tokens";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* -------------------------------------------------------------
          1. KONTEN 1: VIDEO GELITIK (Edukasi Pop-Science)
             ID: VideoGelitik
         ------------------------------------------------------------- */}
      <Composition
        id="VideoGelitik"
        component={VideoGelitik}
        durationInFrames={GELITIK_THEME.dimensions.durationInFrames}
        fps={GELITIK_THEME.dimensions.fps}
        width={GELITIK_THEME.dimensions.width}
        height={GELITIK_THEME.dimensions.height}
      />

      {/* -------------------------------------------------------------
          2. EPISODE 00 TEST: UJI COBA BASE ENGINE "ADA DI QURAN"
             ID: Ep00Test
             Total frames: 240 (VO) + 300 (Ayat) + 90 (CTA) = 630 frames (21s)
         ------------------------------------------------------------- */}
      <Composition
        id="Ep00Test"
        component={Ep00TestVideo}
        durationInFrames={630}
        fps={DIMENSIONS.fps}
        width={DIMENSIONS.width}
        height={DIMENSIONS.height}
      />
    </>
  );
};
