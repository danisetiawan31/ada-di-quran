import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MainCharacter, CharacterPose } from "./MainCharacter";
import { PopElement } from "../elements/PopElement";

const POSES: { pose: CharacterPose; label: string; desc: string }[] = [
  { pose: "idle", label: "1. IDLE", desc: "Berdiri tegak, tangan samping, senyum ramah" },
  { pose: "panic", label: "2. PANIC", desc: "Tangan pegang kepala, mata membelalak, mulut getar" },
  { pose: "hopeful", label: "3. HOPEFUL", desc: "Tangan di dada, mata berbinar ke atas, pipi merona" },
  { pose: "gloomy", label: "4. GLOOMY", desc: "Bahu bungkuk, tangan lemas, mata setengah tertutup" },
  { pose: "impatient", label: "5. IMPATIENT", desc: "Tangan pinggang, cek arloji merah, ketuk kaki" },
  { pose: "dizzy", label: "6. DIZZY", desc: "Pegang dahi & perut mual, mata spiral, pipi pucat" },
  { pose: "peaceful", label: "7. PEACEFUL", desc: "Duduk bersila santai, mata melengkung, senyum damai" },
  { pose: "pointing", label: "8. POINTING", desc: "Tangan kanan menunjuk mantap ke depan/atas" },
];

export const CharacterShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B1120",
        color: "#FFFFFF",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        padding: "50px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h1 style={{ fontSize: 46, fontWeight: 800, margin: "0 0 10px 0", color: "#38BDF8" }}>
          Ada di Quran — MainCharacter Global
        </h1>
        <p style={{ fontSize: 22, color: "#94A3B8", margin: 0 }}>
          Frame {frame} · 8 Poses Anatomy Lock · Secondary Breathing & Blinking Motion
        </p>
      </div>

      {/* 2 Columns x 4 Rows Grid (Fits cleanly in 1080x1920) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px 28px",
          width: "100%",
          maxWidth: 1000,
          flex: 1,
        }}
      >
        {POSES.map((item, idx) => (
          <PopElement
            key={item.pose}
            startFrame={idx * 4}
            sfxType="none"
            style={{ width: "100%" }}
          >
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                borderRadius: 22,
                border: "2px solid rgba(56, 189, 248, 0.28)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
                height: 330,
                boxSizing: "border-box",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Text Info (Left side of card) */}
              <div style={{ flex: 1, paddingRight: 12 }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#FDE047",
                    marginBottom: 8,
                    letterSpacing: 1.1,
                  }}
                >
                  {item.label}
                </span>
                <p style={{ fontSize: 16, color: "#94A3B8", margin: 0, lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>

              {/* Character Figure (Right side of card) */}
              <div
                style={{
                  width: 200,
                  height: 300,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <MainCharacter pose={item.pose} scale={0.62} />
              </div>
            </div>
          </PopElement>
        ))}
      </div>
    </AbsoluteFill>
  );
};
