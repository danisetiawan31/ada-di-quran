import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Scene1OfficePanic } from "./Scene1OfficePanic";
import { Scene2ForkInTheRoad } from "./Scene2ForkInTheRoad";
import { Scene3SoilRoots } from "./Scene3SoilRoots";
import { Scene4TreeOfPatience } from "./Scene4TreeOfPatience";

export const StoryScenes: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {/* SCENE 1: Office Panic & Expectation Drop (Frame 0 - 558) */}
      {frame < 558 && <Scene1OfficePanic />}

      {/* SCENE 2: Fork in the Road & Instant Gratification Bias (Frame 558 - 915) */}
      {frame >= 558 && frame < 915 && <Scene2ForkInTheRoad />}

      {/* SCENE 3: Planting Seed & Deep Glowing Roots (Frame 915 - 1239) */}
      {frame >= 915 && frame < 1239 && <Scene3SoilRoots />}

      {/* SCENE 4: Lush Fruitful Tree & Peaceful Serenity (Frame 1239 - 1524) */}
      {frame >= 1239 && <Scene4TreeOfPatience />}
    </AbsoluteFill>
  );
};
