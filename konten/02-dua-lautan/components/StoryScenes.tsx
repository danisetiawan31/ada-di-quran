import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1TopDown } from "./Scene1TopDown";
import { Scene2UnderwaterDive } from "./Scene2UnderwaterDive";
import { Scene3MoleculesAndSyrup } from "./Scene3MoleculesAndSyrup";
import { Scene4ForcefieldBarrier } from "./Scene4ForcefieldBarrier";
import { Scene5SonarToAyah } from "./Scene5SonarToAyah";

export const StoryScenes: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A1128" }}>
      <Series>
        {/* Scene 1: Top-down aerial view lautan bertabrakan & ilusi kaca (0 - 294f | 0 - 9.8s) */}
        <Series.Sequence durationInFrames={294} name="Scene 1: Top-Down Dua Lautan">
          <Scene1TopDown />
        </Series.Sequence>

        {/* Scene 2: Peta Bumi (Gibraltar/Alaska) & Penyelaman ke Halocline (294 - 735f | 9.8 - 24.5s) */}
        <Series.Sequence durationInFrames={441} name="Scene 2: Peta & Penyelaman Halocline">
          <Scene2UnderwaterDive />
        </Series.Sequence>

        {/* Scene 3: Mikroskopis Molekul & Analogi Sirup vs Air Putih (735 - 969f | 24.5 - 32.3s) */}
        <Series.Sequence durationInFrames={234} name="Scene 3: Molekul & Analogi Sirup">
          <Scene3MoleculesAndSyrup />
        </Series.Sequence>

        {/* Scene 4: Dinding Pembatas Tak Kasatmata di Bawah Laut (969 - 1200f | 32.3 - 40.0s) */}
        <Series.Sequence durationInFrames={231} name="Scene 4: Dinding Pembatas Tak Kasatmata">
          <Scene4ForcefieldBarrier />
        </Series.Sequence>

        {/* Scene 5: Kapal Riset Oseanografi & Transisi Cahaya Al-Qur'an (1200 - 1578f | 40.0 - 52.6s) */}
        <Series.Sequence durationInFrames={378} name="Scene 5: Kapal Riset & Transisi Ayat">
          <Scene5SonarToAyah />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
