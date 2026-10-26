import React from "react";
import { Composition } from "remotion";

// =========================================================================
// REGISTRY KONTEN VIDEO
// =========================================================================

// 1. KONTEN 1: Video Gelitik (Arsip Pop-Science)
import { MainVideo as VideoGelitik } from "../konten/01-gelitik/MainVideo";
import { THEME as GELITIK_THEME } from "../konten/01-gelitik/theme";

// 2. KONTEN 2: Episode 01 "Ada di Quran" (Dua Lautan yang Tak Bercampur)
import { MainVideo as VideoDuaLautan } from "../konten/02-dua-lautan/MainVideo";
import { EP01_THEME } from "../konten/02-dua-lautan/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* -------------------------------------------------------------
          1. KONTEN 1: VIDEO GELITIK
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
          2. KONTEN 2: DUA LAUTAN (Episode 1 "Ada di Quran")
             ID: DuaLautan
             Total frames: 1578 (VO) + 126 (Ayat 19) + 150 (Ayat 20) + 107 (CTA) = 1961 frames (~65.3s)
         ------------------------------------------------------------- */}
      <Composition
        id="DuaLautan"
        component={VideoDuaLautan}
        durationInFrames={EP01_THEME.dimensions.totalDurationFrames}
        fps={EP01_THEME.dimensions.fps}
        width={EP01_THEME.dimensions.width}
        height={EP01_THEME.dimensions.height}
      />
    </>
  );
};
