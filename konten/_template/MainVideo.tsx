import React from "react";
import { THEME } from "./theme";
import { BackgroundMusic } from "@shared/components/BackgroundMusic";

export const MainVideo: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: THEME.dimensions.width,
        height: THEME.dimensions.height,
        backgroundColor: THEME.colors.bg,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: THEME.typography.fontFamilyTitle,
      }}
    >
      {/* Background Music Reusable (Default SSOT: 25%) */}
      <BackgroundMusic track="bossa" volume={0.25} />

      {/* Konten Video Baru */}
      <h1 style={{ fontSize: 48, color: THEME.colors.primary, textAlign: "center" }}>
        Template Konten Baru
      </h1>
      <p style={{ fontSize: 24, color: THEME.colors.accent }}>
        Siap diisi naskah dan komponen adegan
      </p>
    </div>
  );
};
