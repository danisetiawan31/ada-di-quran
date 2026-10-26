import React from "react";
import { AbsoluteFill } from "remotion";
import { LogoOpenMushaf } from "./LogoOpenMushaf";
import { LogoRubElHizb } from "./LogoRubElHizb";

export const StandaloneVectorMushaf: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LogoOpenMushaf size={850} />
    </AbsoluteFill>
  );
};

export const StandaloneVectorRubElHizb: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LogoRubElHizb size={850} />
    </AbsoluteFill>
  );
};
