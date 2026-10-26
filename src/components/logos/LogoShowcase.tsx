import React from "react";
import { AbsoluteFill } from "remotion";
import { LogoOpenMushaf } from "./LogoOpenMushaf";
import { LogoRubElHizb } from "./LogoRubElHizb";

export const LogoOption1Preview: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060D1E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Header Tag */}
      <span
        style={{
          color: "#FBBF24",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        OPSI 1: THE OPEN MUSHAF & SACRED LIGHT
      </span>
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: 48,
          fontWeight: 900,
          margin: "0 0 50px 0",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          textAlign: "center",
        }}
      >
        Logo Identitas Channel
      </h1>

      {/* 1. Large Emblem */}
      <div style={{ marginBottom: 50 }}>
        <LogoOpenMushaf size={280} />
      </div>

      {/* 2. Full Horizontal Lockup */}
      <div
        style={{
          backgroundColor: "rgba(10, 17, 40, 0.75)",
          padding: "24px 44px",
          borderRadius: 28,
          border: "1.5px solid rgba(251, 191, 36, 0.4)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          marginBottom: 40,
        }}
      >
        <LogoOpenMushaf size={80} showText tagline="Fakta Menarik di Balik Al-Qur'an" />
      </div>

      {/* 3. Watermark Format Preview */}
      <div style={{ textAlign: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, display: "block", marginBottom: 12 }}>
          Preview Tampilan Watermark Video (Safe Zone Atas):
        </span>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 20px 8px 14px",
            backgroundColor: "rgba(10, 17, 40, 0.65)",
            backdropFilter: "blur(12px)",
            borderRadius: 999,
            border: "1.5px solid rgba(251, 191, 36, 0.4)",
          }}
        >
          <LogoOpenMushaf size={36} />
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "1px",
            }}
          >
            ADA DI QURAN
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const LogoOption2Preview: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060D1E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Header Tag */}
      <span
        style={{
          color: "#FBBF24",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        OPSI 2: MODERN RUB EL HIZB
      </span>
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: 48,
          fontWeight: 900,
          margin: "0 0 50px 0",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          textAlign: "center",
        }}
      >
        Logo Identitas Channel
      </h1>

      {/* 1. Large Emblem */}
      <div style={{ marginBottom: 50 }}>
        <LogoRubElHizb size={280} />
      </div>

      {/* 2. Full Horizontal Lockup */}
      <div
        style={{
          backgroundColor: "rgba(10, 17, 40, 0.75)",
          padding: "24px 44px",
          borderRadius: 28,
          border: "1.5px solid rgba(251, 191, 36, 0.4)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          marginBottom: 40,
        }}
      >
        <LogoRubElHizb size={80} showText tagline="Fakta Menarik di Balik Al-Qur'an" />
      </div>

      {/* 3. Watermark Format Preview */}
      <div style={{ textAlign: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, display: "block", marginBottom: 12 }}>
          Preview Tampilan Watermark Video (Safe Zone Atas):
        </span>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 20px 8px 14px",
            backgroundColor: "rgba(10, 17, 40, 0.65)",
            backdropFilter: "blur(12px)",
            borderRadius: 999,
            border: "1.5px solid rgba(251, 191, 36, 0.4)",
          }}
        >
          <LogoRubElHizb size={36} />
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "1px",
            }}
          >
            ADA DI QURAN
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
