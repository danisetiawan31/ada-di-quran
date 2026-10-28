import React from "react";
import { AbsoluteFill } from "remotion";
import { MainCharacter, CharacterPose } from "./MainCharacter";

export const ImprovedCharacterShowcase: React.FC = () => {
  const expressions: { pose: CharacterPose; label: string; desc: string; badge?: string }[] = [
    { pose: "senang", label: "Senang (Default)", desc: "Ramah, santai, pembuka cerita" },
    { pose: "tertawa", label: "Tertawa", desc: "Mata merem, tawa ceria" },
    { pose: "terkejut", label: "Terkejut", desc: "Mata bulat, mulut O, fakta unik" },
    { pose: "sedih", label: "Sedih", desc: "Alis sendu, tetes air mata kilau" },
    { pose: "marah", label: "Marah", desc: "Alis tajam, urat merah pelipis" },
    { pose: "bingung", label: "Bingung", desc: "Alis asimetris, mulut heran" },
    { pose: "wink", label: "Wink", desc: "Kedip sebelah, senyum manis" },
    { pose: "penasaran", label: "Penasaran", desc: "Melirik ke atas samping, mikir" },
    { pose: "datar", label: "Datar", desc: "Serius, objektif, netral" },
    { pose: "pusing", label: "Pusing (Racun)", desc: "Mata spiral, rona mual Ep 03", badge: "Ep 03 Special" },
    { pose: "panik", label: "Panik", desc: "Pupil getar, keringat dingin", badge: "High Alert" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070E1E",
        padding: "48px 60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: "#fff",
      }}
    >
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid #1E2D4A", paddingBottom: 24 }}>
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(232, 184, 75, 0.12)",
              color: "#E8B84B",
              fontWeight: 800,
              fontSize: 13,
              padding: "6px 14px",
              borderRadius: 20,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: 10,
              border: "1px solid rgba(232, 184, 75, 0.35)",
            }}
          >
            <span>✦</span> OFFICIAL MASCOT BUST — CHANNEL "ADA DI QURAN"
          </div>
          <h1
            style={{
              fontSize: 38,
              fontWeight: 900,
              margin: "2px 0 8px 0",
              background: "linear-gradient(135deg, #FFFFFF 0%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Showcase Maskot: Baju Koko Modern & 11 Ekspresi
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 16, margin: 0 }}>
            Kerah Shanghai Elegan • Aksen Kancing Emas • Rambut Ikal Ikonik • Secondary Motion & Auto-Blink
          </p>
        </div>

        {/* FEATURE HIGHLIGHT PILLS */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { title: "Baju Koko Modern", desc: "Kerah Shanghai & Kancing Emas" },
            { title: "Nafas Halus", desc: "Secondary Motion Terpisah" },
            { title: "Auto-Blink", desc: "Kedip Alami Tiap ~3 Detik" },
            { title: "11 Ekspresi Wajah", desc: "Termasuk Pusing & Panik" },
            { title: "Clean Bust", desc: "Bebas Cacat, Siap Shorts 9:16" },
          ].map((pill, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#0F1A30",
                border: "1px solid #23355A",
                borderRadius: 14,
                padding: "10px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#38BDF8", fontWeight: 800, fontSize: 14 }}>{pill.title}</div>
              <div style={{ color: "#64748B", fontSize: 11, marginTop: 2 }}>{pill.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 11 RAGAM EKSPRESI EMOSI (GRID BESAR & LEGA) */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}
        >
          {expressions.map((item) => (
            <div
              key={item.pose}
              style={{
                backgroundColor: "#0D182E",
                borderRadius: 18,
                padding: "16px 12px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: item.badge ? "1.5px solid #E8B84B" : "1px solid #1E2D4A",
                boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                position: "relative",
              }}
            >
              {item.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#E8B84B",
                    color: "#070E1E",
                    fontSize: 10,
                    fontWeight: 900,
                    padding: "3px 8px",
                    borderRadius: 6,
                  }}
                >
                  {item.badge}
                </div>
              )}
              <div style={{ height: 180, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <MainCharacter pose={item.pose} scale={0.58} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#F8FAFC", marginTop: 12 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", textAlign: "center", marginTop: 4 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
