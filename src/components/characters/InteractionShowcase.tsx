import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MainCharacter } from "./MainCharacter";
import { PopElement } from "../elements/PopElement";

export const InteractionShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B1120",
        color: "#FFFFFF",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: "45px 36px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header Showcase */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, margin: "0 0 8px 0", color: "#38BDF8", letterSpacing: 1.1 }}>
          Multi-Character Interaction System
        </h1>
        <p style={{ fontSize: 19, color: "#94A3B8", margin: 0 }}>
          Satu Engine Karakter · Multi-Persona · Staging Interaksi Dua Arah (Dialog & Konflik)
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
          maxWidth: 1000,
          flex: 1,
        }}
      >
        {/* ===================================================================
            CARD 1: SITUASI 1 — KONFLIK & NASIHAT (MARAH vs MENENANGKAN)
           =================================================================== */}
        <PopElement startFrame={0} sfxType="none" style={{ width: "100%" }}>
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              borderRadius: 24,
              border: "2px solid rgba(239, 68, 68, 0.4)",
              padding: "20px 24px 10px 24px",
              boxShadow: "0 14px 32px rgba(0,0,0,0.5)",
              height: 730,
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Tag Judul Skenario */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#F87171" }}>
                1. USECASE: MENGINGATKAN SAAT TEMAN MARAH
              </span>
              <span style={{ fontSize: 13, backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#FCA5A5", padding: "4px 12px", borderRadius: 12, fontWeight: 700 }}>
                Konflik & Nasihat Santun
              </span>
            </div>

            {/* Panggung Dua Karakter Berinteraksi di Lantai yang Sama */}
            <div
              style={{
                flex: 1,
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                padding: "0 30px",
                paddingBottom: 20,
              }}
            >
              {/* Garis Lantai Ruangan Bersama (Pijakan Grounding SSOT) */}
              <div
                style={{
                  position: "absolute",
                  bottom: 26,
                  left: 20,
                  right: 20,
                  height: 3,
                  backgroundColor: "rgba(148, 163, 184, 0.25)",
                  borderRadius: 2,
                }}
              />

              {/* KARAKTER A (Host / Pengingat): Putih Koko, Kacamata, Menenangkan */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
                <div style={{ marginBottom: 6, textAlign: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#38BDF8" }}>Karakter A (Host)</span>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>pose="calming"</div>
                </div>
                <MainCharacter
                  pose="calming"
                  scale={0.92}
                  hasGlasses={true}
                  outfitType="koko"
                />
              </div>

              {/* Balon Nasihat Dialog di Tengah */}
              <div
                style={{
                  alignSelf: "center",
                  backgroundColor: "rgba(30, 41, 59, 0.95)",
                  border: "2px solid #38BDF8",
                  borderRadius: 18,
                  padding: "16px 20px",
                  textAlign: "center",
                  maxWidth: 310,
                  zIndex: 3,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  marginBottom: 120,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800, color: "#FDE047", marginBottom: 4 }}>
                  AJARAN RASULULLAH ﷺ
                </div>
                <div style={{ fontSize: 19, fontWeight: 800, color: "#FFFFFF", fontStyle: "italic", marginBottom: 4 }}>
                  "Laa Taghdhab..."
                </div>
                <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.4 }}>
                  "Jangan kamu marah, maka bagimu surga." (HR. Thabrani)
                </div>
              </div>

              {/* KARAKTER B (Sahabat Marah): Kaos Merah, Tanpa Kacamata, Rambut Messy, Menghadap Kiri */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
                <div style={{ marginBottom: 6, textAlign: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#EF4444" }}>Karakter B (Sahabat)</span>
                  <div style={{ fontSize: 12, color: "#F87171" }}>pose="angry" (flip)</div>
                </div>
                <MainCharacter
                  pose="angry"
                  flip={true}
                  scale={0.92}
                  hasGlasses={false}
                  outfitType="tshirt"
                  hairStyle="messy"
                  customColors={{
                    outfitMain: "#EF4444",
                    outfitShade: "#DC2626",
                    outfitCollar: "#B91C1C",
                    pants: "#1E293B",
                    hair: "#0F172A",
                  }}
                />
              </div>
            </div>
          </div>
        </PopElement>

        {/* ===================================================================
            CARD 2: SITUASI 2 — RESOLUSI & HIKMAH (SADAR MALU vs DAMAI)
           =================================================================== */}
        <PopElement startFrame={5} sfxType="none" style={{ width: "100%" }}>
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              borderRadius: 24,
              border: "2px solid rgba(52, 211, 153, 0.4)",
              padding: "20px 24px 10px 24px",
              boxShadow: "0 14px 32px rgba(0,0,0,0.5)",
              height: 730,
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Tag Judul Skenario */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#34D399" }}>
                2. USECASE: RESOLUSI & MENDENGARKAN NASIHAT
              </span>
              <span style={{ fontSize: 13, backgroundColor: "rgba(52, 211, 153, 0.2)", color: "#6EE7B7", padding: "4px 12px", borderRadius: 12, fontWeight: 700 }}>
                Hati Jadi Tenang & Damai
              </span>
            </div>

            {/* Panggung Dua Karakter Berinteraksi */}
            <div
              style={{
                flex: 1,
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                padding: "0 30px",
                paddingBottom: 20,
              }}
            >
              {/* Garis Lantai Ruangan Bersama */}
              <div
                style={{
                  position: "absolute",
                  bottom: 26,
                  left: 20,
                  right: 20,
                  height: 3,
                  backgroundColor: "rgba(148, 163, 184, 0.25)",
                  borderRadius: 2,
                }}
              />

              {/* KARAKTER A (Host): Bersedekap Damai / Senyum Lega */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
                <div style={{ marginBottom: 6, textAlign: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#38BDF8" }}>Karakter A (Host)</span>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>pose="peaceful"</div>
                </div>
                <MainCharacter
                  pose="peaceful"
                  scale={0.92}
                  hasGlasses={true}
                  outfitType="koko"
                />
              </div>

              {/* Kartu Hikmah di Tengah */}
              <div
                style={{
                  alignSelf: "center",
                  backgroundColor: "rgba(30, 41, 59, 0.95)",
                  border: "2px solid #34D399",
                  borderRadius: 18,
                  padding: "16px 20px",
                  textAlign: "center",
                  maxWidth: 310,
                  zIndex: 3,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  marginBottom: 120,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800, color: "#34D399", marginBottom: 4 }}>
                  HASIL INTERAKSI
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>
                  Emosi Reda, Hati Lapang
                </div>
                <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.4 }}>
                  Karakter B tersadar dan bersyukur diingatkan sahabatnya.
                </div>
              </div>

              {/* KARAKTER B: Menyesal / Malu Canggung Mendengarkan Nasihat */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
                <div style={{ marginBottom: 6, textAlign: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#F59E0B" }}>Karakter B (Sahabat)</span>
                  <div style={{ fontSize: 12, color: "#FCD34D" }}>pose="regret" (flip)</div>
                </div>
                <MainCharacter
                  pose="regret"
                  flip={true}
                  scale={0.92}
                  hasGlasses={false}
                  outfitType="tshirt"
                  hairStyle="messy"
                  customColors={{
                    outfitMain: "#3B82F6",
                    outfitShade: "#2563EB",
                    outfitCollar: "#1D4ED8",
                    pants: "#1E293B",
                    hair: "#0F172A",
                  }}
                />
              </div>
            </div>
          </div>
        </PopElement>
      </div>
    </AbsoluteFill>
  );
};