import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MainCharacter, CharacterPose } from "./MainCharacter";
import { PopElement } from "../elements/PopElement";

const POSES: { pose: CharacterPose; label: string; desc: string }[] = [
  { pose: "idle", label: "1. IDLE", desc: "Berdiri tegak ramah, tangan santai, menapak lantai" },
  { pose: "explaining", label: "2. EXPLAINING", desc: "Tangan terbuka santun, gestur menerangkan materi" },
  { pose: "pointing", label: "3. POINTING", desc: "Telunjuk kanan menunjuk mantap ke samping/atas" },
  { pose: "curious", label: "4. CURIOUS", desc: "Tangan di dagu, kepala miring berpikir penasaran" },
  { pose: "alert", label: "5. ALERT", desc: "Kedua tangan terangkat waspada, mata membelalak" },
  { pose: "dizzy", label: "6. DIZZY", desc: "Tangan di dahi & perut mual, spiral pusing berputar" },
  { pose: "peaceful", label: "7. PEACEFUL", desc: "Tangan bersedekap santun/tawadhu', senyum damai" },
  { pose: "holding", label: "8. HOLDING", desc: "Tangan terulur memegang properti adegan" },
];

export const CharacterShowcase: React.FC = () => {
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
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, margin: "0 0 8px 0", color: "#38BDF8", letterSpacing: 1.2 }}>
          Ada di Quran — MainCharacter Global (Full-Body)
        </h1>
        <p style={{ fontSize: 20, color: "#94A3B8", margin: 0 }}>
          Natural Human Proportions · 8 Core Story Poses · Secondary Motion & Ground Contact
        </p>
      </div>

      {/* 2 Columns x 4 Rows Grid (Fits cleanly in 1080x1920) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "18px 22px",
          width: "100%",
          maxWidth: 1000,
          flex: 1,
        }}
      >
        {POSES.map((item, idx) => (
          <PopElement
            key={item.pose}
            startFrame={idx * 3}
            sfxType="none"
            style={{ width: "100%" }}
          >
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                borderRadius: 24,
                border: "2px solid rgba(56, 189, 248, 0.35)",
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 12px 28px rgba(0,0,0,0.45)",
                height: 350,
                boxSizing: "border-box",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Text Info (Left side of card) */}
              <div style={{ flex: 1, paddingRight: 10, zIndex: 2 }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 21,
                    fontWeight: 900,
                    color: "#FDE047",
                    marginBottom: 8,
                    letterSpacing: 1.1,
                  }}
                >
                  {item.label}
                </span>
                <p style={{ fontSize: 16, color: "#94A3B8", margin: 0, lineHeight: 1.45, fontWeight: 500 }}>
                  {item.desc}
                </p>
              </div>

              {/* Character Figure (Right side of card, clearly visible & grounded!) */}
              <div
                style={{
                  width: 210,
                  height: 320,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  zIndex: 1,
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
