import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MainCharacter } from "./MainCharacter";
import { RedesignedCharacter } from "./RedesignedCharacter";

export const ComparisonShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B1120",
        color: "#FFFFFF",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: "60px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, margin: "0 0 12px 0", color: "#38BDF8" }}>
          Perbandingan Desain Karakter
        </h1>
        <p style={{ fontSize: 22, color: "#94A3B8", margin: 0 }}>
          Versi Lama (Terlalu Emoji) vs Versi Baru (Gaya Kartun Edukasi Kok Bisa / Kurzgesagt)
        </p>
      </div>

      {/* Side by Side Comparison Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          width: "100%",
          maxWidth: 1000,
          flex: 1,
        }}
      >
        {/* LEFT: OLD VERSION (EMOJI-LIKE) */}
        <div
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.7)",
            borderRadius: 24,
            border: "2px solid rgba(239, 68, 68, 0.4)",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 12px 28px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#FCA5A5",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 16,
              border: "1px solid rgba(239, 68, 68, 0.4)",
            }}
          >
            ❌ VERSI LAMA (Terlalu Emoji)
          </div>
          <ul
            style={{
              fontSize: 15,
              color: "#CBD5E1",
              margin: "0 0 20px 0",
              paddingLeft: 20,
              lineHeight: 1.5,
              alignSelf: "flex-start",
            }}
          >
            <li>Kepala bulat telur kuning polos (seperti emotikon)</li>
            <li>Rambut seperti topi renang / helm karet kaku</li>
            <li>Sepatu hanya bulatan oval tanpa sol</li>
            <li>Tanpa hidung & tanpa lipatan hoodie</li>
          </ul>

          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <MainCharacter pose="idle" scale={0.88} />
          </div>
        </div>

        {/* RIGHT: NEW VERSION (REAL CARTOON STYLE) */}
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            borderRadius: 24,
            border: "2px solid rgba(34, 197, 94, 0.6)",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 16px 36px rgba(34, 197, 94, 0.15)",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              color: "#86EFAC",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 16,
              border: "1px solid rgba(34, 197, 94, 0.5)",
            }}
          >
            ✨ DESAIN BARU (Karakter Kartun Edukasi)
          </div>
          <ul
            style={{
              fontSize: 15,
              color: "#CBD5E1",
              margin: "0 0 20px 0",
              paddingLeft: 20,
              lineHeight: 1.5,
              alignSelf: "flex-start",
            }}
          >
            <li>Warna kulit natural hangat (Warm Honey Tan)</li>
            <li>Rambut bervolume dengan poni berlapis & jambang</li>
            <li>Mata ekspresif kartun dengan sklera putih & pupil binar</li>
            <li>Hidung kartun, kerah hoodie berlipat & tali serut</li>
            <li>Sneakers modern dengan sol karet putih tebal</li>
          </ul>

          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <RedesignedCharacter pose="idle" scale={0.88} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
