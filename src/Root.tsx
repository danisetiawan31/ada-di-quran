import React from "react";
import { Composition } from "remotion";

// =========================================================================
// REGISTRY KONTEN VIDEO
// =========================================================================
// Konten 1: Kenapa Tidak Bisa Menggelitik Diri Sendiri? (9:16 vertical ~59.4s)
import { MainVideo as VideoGelitik } from "@konten/01-gelitik/MainVideo";
import { THEME as GELITIK_THEME } from "@konten/01-gelitik/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* -------------------------------------------------------------
          1. KONTEN 1: VIDEO GELITIK (Edukasi Pop-Science)
             Folder: konten/01-gelitik/
             ID: VideoGelitik
             Output Render: npx remotion render VideoGelitik out/gelitik.mp4
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
          2. KONTEN 2: (Siap ditambahkan)
             Folder: konten/02-.../
             ID: VideoKonten2
             Tinggal daftarkan <Composition /> di sini.
         ------------------------------------------------------------- */}
    </>
  );
};
