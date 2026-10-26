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

// 3. SHOWCASE LOGO
import { LogoOption1Preview, LogoOption2Preview } from "./components/logos/LogoShowcase";
import { StandaloneVectorMushaf, StandaloneVectorRubElHizb } from "./components/logos/StandaloneLogos";

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

      {/* -------------------------------------------------------------
          3. PREVIEW LOGO OPSI 1 & OPSI 2 (Standalone Image Preview)
         ------------------------------------------------------------- */}
      <Composition
        id="LogoOption1"
        component={LogoOption1Preview}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="LogoOption2"
        component={LogoOption2Preview}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* -------------------------------------------------------------
          4. TRANSPARENT VECTOR LOGO EXPORTS (1024x1024 Transparent PNG)
         ------------------------------------------------------------- */}
      <Composition
        id="VectorMushaf"
        component={StandaloneVectorMushaf}
        durationInFrames={1}
        fps={30}
        width={1024}
        height={1024}
      />
      <Composition
        id="VectorRubElHizb"
        component={StandaloneVectorRubElHizb}
        durationInFrames={1}
        fps={30}
        width={1024}
        height={1024}
      />
    </>
  );
};
