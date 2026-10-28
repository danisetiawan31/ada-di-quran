import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1SunDryingAndSpraying } from "./Scene1SunDryingAndSpraying";
import { Scene2MacroMeatAndResistance } from "./Scene2MacroMeatAndResistance";
import { Scene3MedicalLiverKidney } from "./Scene3MedicalLiverKidney";
import { Scene4HonestMarketToAyah } from "./Scene4HonestMarketToAyah";

export const StoryScenes: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* SCENE 1: Penjemuran Pesisir & Oknum Semprot Insektisida (Frame 0 - 540) */}
      <Sequence from={0} durationInFrames={540} name="Scene 1: Sun Drying & Spraying">
        <Scene1SunDryingAndSpraying />
      </Sequence>

      {/* SCENE 2: Makro Serat Daging Ikan & Uji Tahan Cuci/Goreng (Frame 540 - 885) */}
      <Sequence from={540} durationInFrames={345} name="Scene 2: Macro Meat & Resistance">
        <Scene2MacroMeatAndResistance />
      </Sequence>

      {/* SCENE 3: Ruang Makan Siang & Pemindai Anatomi Medis Hati/Ginjal (Frame 885 - 1080) */}
      <Sequence from={885} durationInFrames={195} name="Scene 3: Medical Liver & Kidney">
        <Scene3MedicalLiverKidney />
      </Sequence>

      {/* SCENE 4: Pasar Pagi Jujur & Preamble Ayat Al-Qur'an (Frame 1080 - 1320) */}
      <Sequence from={1080} durationInFrames={240} name="Scene 4: Honest Market to Ayah">
        <Scene4HonestMarketToAyah />
      </Sequence>
    </AbsoluteFill>
  );
};
