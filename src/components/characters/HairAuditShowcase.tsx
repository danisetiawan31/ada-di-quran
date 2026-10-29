import React from "react";
import { AbsoluteFill } from "remotion";
import { MainCharacter } from "./MainCharacter";

export const HairAuditShowcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAF9F6",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#0F172A", margin: "0 0 10px 0" }}>
          Inspeksi Karakter Baku "Ada di Quran"
        </h1>
        <p style={{ fontSize: 20, color: "#64748B", margin: 0 }}>
          Kiri: Karakter A (Host Peci Hitam Nasional) | Kanan: Karakter B (Sahabat Textured Fringe)
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          maxWidth: 1000,
          backgroundColor: "#FFFFFF",
          borderRadius: 24,
          padding: "50px 30px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          border: "1px solid #E2E8F0",
        }}
      >
        {/* Karakter A - Close Up */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 420,
              height: 520,
              overflow: "hidden",
              position: "relative",
              border: "2px solid #E2E8F0",
              borderRadius: 24,
              backgroundColor: "#F8FAFC",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 40,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <MainCharacter
                pose="peaceful"
                scale={1.8}
                hasGlasses={true}
                hairStyle="peci"
                outfitType="koko"
                style={{
                  transformOrigin: "top center",
                }}
              />
            </div>
          </div>
          <span style={{ marginTop: 18, fontSize: 24, fontWeight: 800, color: "#0F172A" }}>
            Karakter A: Host (Peci Hitam Nasional)
          </span>
          <span style={{ fontSize: 16, color: "#64748B", marginTop: 4 }}>
            Peci modern berwibawa, aura pengajar Qur'an yang santun & hangat
          </span>
        </div>

        {/* Karakter B - Close Up */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 420,
              height: 520,
              overflow: "hidden",
              position: "relative",
              border: "2px solid #E2E8F0",
              borderRadius: 24,
              backgroundColor: "#F8FAFC",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 40,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <MainCharacter
                pose="regret"
                scale={1.8}
                hasGlasses={false}
                hairStyle="messy"
                outfitType="tshirt"
                customColors={{
                  outfitMain: "#EF4444",
                  hair: "#0F172A",
                  hairHighlight: "#334155",
                }}
                style={{
                  transformOrigin: "top center",
                }}
              />
            </div>
          </div>
          <span style={{ marginTop: 18, fontSize: 24, fontWeight: 800, color: "#0F172A" }}>
            Karakter B: Sahabat (Textured Fringe)
          </span>
          <span style={{ fontSize: 16, color: "#64748B", marginTop: 4 }}>
            Textured crop modern, poni natural di atas alis, tanpa taring tajam
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
