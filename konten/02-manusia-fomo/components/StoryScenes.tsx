import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1OfficePanic } from "./Scene1OfficePanic";
import { Scene2ForkInTheRoad } from "./Scene2ForkInTheRoad";
import { Scene3SoilRoots } from "./Scene3SoilRoots";
import { Scene4TreeOfPatience } from "./Scene4TreeOfPatience";

export const StoryScenes: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* SCENE 1: Office Panic & Expectation Drop (Frame 0 - 558) */}
      <Sequence from={0} durationInFrames={558} name="Scene 1: Office Panic">
        <Scene1OfficePanic />
      </Sequence>

      {/* SCENE 2: Fork in the Road & Instant Gratification Bias (Frame 558 - 915) */}
      <Sequence from={558} durationInFrames={357} name="Scene 2: Fork in the Road">
        <Scene2ForkInTheRoad />
      </Sequence>

      {/* SCENE 3: Planting Seed & Deep Glowing Roots (Frame 915 - 1239) */}
      <Sequence from={915} durationInFrames={324} name="Scene 3: Soil & Roots">
        <Scene3SoilRoots />
      </Sequence>

      {/* SCENE 4: Lush Fruitful Tree & Peaceful Serenity (Frame 1239 - 1524) */}
      <Sequence from={1239} name="Scene 4: Tree of Patience">
        <Scene4TreeOfPatience />
      </Sequence>
    </AbsoluteFill>
  );
};
