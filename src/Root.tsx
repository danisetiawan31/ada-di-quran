import React from "react";
import { Composition } from "remotion";

// =========================================================================
// REGISTRY KONTEN VIDEO UTAMA
// =========================================================================

// 1. KONTEN 1: Video Gelitik (Arsip Pop-Science)
import { MainVideo as VideoGelitik } from "../konten/00-gelitik/MainVideo";
import { THEME as GELITIK_THEME } from "../konten/00-gelitik/theme";

// 2. KONTEN 2: Episode 01 "Ada di Quran" (Dua Lautan yang Tak Bercampur)
import { MainVideo as VideoDuaLautan } from "../konten/01-dua-lautan/MainVideo";
import { EP01_THEME } from "../konten/01-dua-lautan/theme";

// 3. KONTEN 3: Episode 02 "Ada di Quran" (Kenapa Manusia Gampang Panik & Nggak Sabaran - QS. Al-Anbiya: 37)
import { MainVideo as VideoTergesaGesa } from "../konten/02-manusia-fomo/MainVideo";
import { EP02_THEME } from "../konten/02-manusia-fomo/theme";

// 4. KONTEN 4: Episode 03 "Ada di Quran" (Bahaya Ikan Asin Disemprot Obat Nyamuk - QS. Asy-Syu'ara: 183)
import { MainVideo as VideoIkanAsin } from "../konten/03-ikan-asin/MainVideo";
import { EP03_THEME } from "../konten/03-ikan-asin/theme";

// 5. LIVING BENCHMARK: Showcase Karakter Global Baku (Fase 1)
import { CharacterShowcase as GlobalFoundationShowcase } from "./components/characters/CharacterShowcase";
import { InteractionShowcase as GlobalInteractionShowcase } from "./components/characters/InteractionShowcase";
import { TwoCharacterBrightScene } from "./components/characters/TwoCharacterBrightScene";
import { HairAuditShowcase } from "./components/characters/HairAuditShowcase";

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
          3. KONTEN 3: TERGESA-GESA (Episode 2 "Ada di Quran")
             ID: TergesaGesa
         ------------------------------------------------------------- */}
      <Composition
        id="TergesaGesa"
        component={VideoTergesaGesa}
        durationInFrames={EP02_THEME.dimensions.totalDurationFrames}
        fps={EP02_THEME.dimensions.fps}
        width={EP02_THEME.dimensions.width}
        height={EP02_THEME.dimensions.height}
      />

      {/* -------------------------------------------------------------
          4. KONTEN 4: IKAN ASIN (Episode 3 "Ada di Quran")
             ID: Ep03MainVideo
         ------------------------------------------------------------- */}
      <Composition
        id="Ep03MainVideo"
        component={VideoIkanAsin}
        durationInFrames={EP03_THEME.dimensions.totalDurationFrames}
        fps={EP03_THEME.dimensions.fps}
        width={EP03_THEME.dimensions.width}
        height={EP03_THEME.dimensions.height}
      />

      {/* -------------------------------------------------------------
          5. GLOBAL FOUNDATION BENCHMARK: 8 Poses Full-Body Character
             ID: GlobalFoundationShowcase
         ------------------------------------------------------------- */}
      <Composition
        id="GlobalFoundationShowcase"
        component={GlobalFoundationShowcase}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* -------------------------------------------------------------
          6. MULTI-CHARACTER INTERACTION BENCHMARK: 2 Characters In Scene
             ID: GlobalInteractionShowcase
         ------------------------------------------------------------- */}
      <Composition
        id="GlobalInteractionShowcase"
        component={GlobalInteractionShowcase}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* -------------------------------------------------------------
          7. BRIGHT ROOM EVALUATION: 2 Characters on Warm Light Stage
             ID: TwoCharacterBrightScene
         ------------------------------------------------------------- */}
      <Composition
        id="TwoCharacterBrightScene"
        component={TwoCharacterBrightScene}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* -------------------------------------------------------------
          8. HAIR AUDIT SHOWCASE: Extreme Close-Up on Hair & Head Anatomy
             ID: HairAuditShowcase
         ------------------------------------------------------------- */}
      <Composition
        id="HairAuditShowcase"
        component={HairAuditShowcase}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
