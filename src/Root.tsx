import React from "react";
import { Composition } from "remotion";

// =========================================================================
// REGISTRY KONTEN VIDEO
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

// 4. SHOWCASE LOGO & CHARACTERS
import { LogoOption1Preview, LogoOption2Preview } from "./components/logos/LogoShowcase";
import { StandaloneVectorMushaf, StandaloneVectorRubElHizb } from "./components/logos/StandaloneLogos";
import { CharacterShowcase } from "./components/characters/CharacterShowcase";
import { ComparisonShowcase } from "./components/characters/ComparisonShowcase";
import { ImprovedCharacterShowcase } from "./components/characters/ImprovedCharacterShowcase";
import { Scene1SunDryingAndSpraying } from "../konten/03-ikan-asin/components/Scene1SunDryingAndSpraying";
import { Scene2MacroMeatAndResistance } from "../konten/03-ikan-asin/components/Scene2MacroMeatAndResistance";
import { Scene3MedicalLiverKidney } from "../konten/03-ikan-asin/components/Scene3MedicalLiverKidney";
import { Scene4HonestMarketToAyah } from "../konten/03-ikan-asin/components/Scene4HonestMarketToAyah";

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
          3. KONTEN 3: TERGESA-GESA (Episode 2 "Ada di Quran")
             ID: TergesaGesa
             Total frames: 1524 (VO) + 295 (Ayat 37) + 107 (CTA) = 1926 frames (~64.2s)
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
             Total frames: 1320 (VO) + 248 (Ayat 183) + 107 (CTA) = 1675 frames (~55.8s)
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
          4. PREVIEW LOGO OPSI 1 & OPSI 2 (Standalone Image Preview)
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
          5. TRANSPARENT VECTOR LOGO EXPORTS (1024x1024 Transparent PNG)
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

      {/* -------------------------------------------------------------
          6. SHOWCASE GLOBAL CHARACTERS & POP ELEMENT
         ------------------------------------------------------------- */}
      <Composition
        id="CharacterShowcase"
        component={CharacterShowcase}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="ComparisonShowcase"
        component={ComparisonShowcase}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="ImprovedCharacterShowcase"
        component={ImprovedCharacterShowcase}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* -------------------------------------------------------------
          7. EPISODE 03: SCENE 1 PREVIEW AUDIT
         ------------------------------------------------------------- */}
      <Composition
        id="Ep03Scene1Preview"
        component={Scene1SunDryingAndSpraying}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="Ep03Scene2Preview"
        component={Scene2MacroMeatAndResistance}
        durationInFrames={345}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="Ep03Scene3Preview"
        component={Scene3MedicalLiverKidney}
        durationInFrames={195}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="Ep03Scene4Preview"
        component={Scene4HonestMarketToAyah}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
