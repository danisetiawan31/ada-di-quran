import React from "react";
import {
  Audio,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { THEME } from "./theme";
import { Background } from "./components/Background";
import { SubtitleOverlay } from "./components/SubtitleOverlay";
import { Scene1Hook } from "./components/scenes/Scene1Hook";
import { Scene2Serebelum } from "./components/scenes/Scene2Serebelum";
import { Scene3Meredam } from "./components/scenes/Scene3Meredam";
import { Scene4OrangLain } from "./components/scenes/Scene4OrangLain";
import { Scene5Robot } from "./components/scenes/Scene5Robot";
import { Scene6Penutup } from "./components/scenes/Scene6Penutup";
import { SoundEffects } from "./components/SoundEffects";
import { BackgroundMusic } from "@shared/components/BackgroundMusic";
import voiceoverAudio from "./voiceover.mp3";

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Determine current active scene index (0 to 5)
  let sceneIndex = 0;
  if (frame < 384) {
    sceneIndex = 0; // Blok 1: Hook & Konteks
  } else if (frame < 666) {
    sceneIndex = 1; // Blok 2: Serebelum
  } else if (frame < 1005) {
    sceneIndex = 2; // Blok 3: Meredam
  } else if (frame < 1266) {
    sceneIndex = 3; // Blok 4: Orang Lain
  } else if (frame < 1515) {
    sceneIndex = 4; // Blok 5: Robot
  } else {
    sceneIndex = 5; // Blok 6: Outro
  }

  return (
    <div
      style={{
        position: "relative",
        width: THEME.dimensions.width,
        height: THEME.dimensions.height,
        backgroundColor: THEME.colors.bgCream,
        overflow: "hidden",
      }}
    >
      {/* 1. Voiceover Audio Track (Self-contained in this content folder) */}
      <Audio src={voiceoverAudio} />

      {/* 1.2. Chill Organic Instrument Background Music (BGM) - 20% Volume */}
      <BackgroundMusic track="bossa" volume={0.20} />

      {/* 1.5. Synchronized Pop-Science Sound Effects (SFX) Track */}
      <SoundEffects />

      {/* 2. Dynamic Bright Friendly Background */}
      <Background sceneIndex={sceneIndex} />

      {/* 3. Scene Sequences (Total 1782 frames / 59.4 seconds @ 30fps) */}
      {/* Blok 1: Hook & Konteks (0 - 384 frames / 0 - 12.8s) */}
      <Sequence from={0} durationInFrames={384} name="Blok 1: Hook & Konteks">
        <Scene1Hook />
      </Sequence>

      {/* Blok 2: Serebelum & Sinyal Bocoran (384 - 666 frames / 12.8s - 22.2s) */}
      <Sequence from={384} durationInFrames={282} name="Blok 2: Serebelum">
        <Scene2Serebelum />
      </Sequence>

      {/* Blok 3: Meredam Sensasi (666 - 1005 frames / 22.2s - 33.5s) */}
      <Sequence from={666} durationInFrames={339} name="Blok 3: Meredam Sensasi">
        <Scene3Meredam />
      </Sequence>

      {/* Blok 4: Digelitik Orang Lain (1005 - 1266 frames / 33.5s - 42.2s) */}
      <Sequence from={1005} durationInFrames={261} name="Blok 4: Digelitik Orang Lain">
        <Scene4OrangLain />
      </Sequence>

      {/* Blok 5: Eksperimen Robot (1266 - 1515 frames / 42.2s - 50.5s) */}
      <Sequence from={1266} durationInFrames={249} name="Blok 5: Eksperimen Robot">
        <Scene5Robot />
      </Sequence>

      {/* Blok 6: Kesimpulan & CTA (1515 - 1782 frames / 50.5s - 59.4s) */}
      <Sequence from={1515} durationInFrames={267} name="Blok 6: Penutup & CTA">
        <Scene6Penutup />
      </Sequence>

      {/* 4. Subtitle Overlay (Persistent in Safe Zone across all scenes) */}
      <SubtitleOverlay />
    </div>
  );
};
