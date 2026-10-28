import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily, THEME } from "../theme";

export interface SubtitleCue {
  startFrame: number;
  endFrame: number;
  text: string;
  highlights: string[];
}

export const SUBTITLES: SubtitleCue[] = [
  {
    startFrame: 0,
    endFrame: 144, // 0.0s - 4.8s
    text: "Tiap kali coba menggelitik diri sendiri, otakmu sebenarnya lagi spoiler!",
    highlights: ["menggelitik", "diri", "sendiri,", "spoiler!"],
  },
  {
    startFrame: 144,
    endFrame: 195, // 4.8s - 6.5s
    text: "Kok bisa?",
    highlights: ["Kok", "bisa?"],
  },
  {
    startFrame: 195,
    endFrame: 282, // 6.5s - 9.4s
    text: "Kenapa kita cuma geli kalau digelitik orang lain?",
    highlights: ["cuma", "geli", "orang", "lain?"],
  },
  {
    startFrame: 282,
    endFrame: 384, // 9.4s - 12.8s
    text: "Tenang, itu bukan karena jarimu yang kurang jago.",
    highlights: ["bukan", "jarimu"],
  },
  {
    startFrame: 384,
    endFrame: 525, // 12.8s - 17.5s
    text: "Di bagian belakang bawah otak, ada otak kecil bernama serebelum.",
    highlights: ["otak", "kecil", "serebelum."],
  },
  {
    startFrame: 525,
    endFrame: 666, // 17.5s - 22.2s
    text: "Tiap kali tanganmu bergerak, sistem gerakmu mengirim bocoran sinyal ke sana.",
    highlights: ["bocoran", "sinyal"],
  },
  {
    startFrame: 666,
    endFrame: 810, // 22.2s - 27.0s
    text: "Sebelum jarimu menyentuh kulit, otak sudah menebak rasanya duluan—",
    highlights: ["menebak", "rasanya", "duluan—"],
  },
  {
    startFrame: 810,
    endFrame: 900, // 27.0s - 30.0s
    text: "lalu meredam area pengolah rasa geli.",
    highlights: ["meredam", "rasa", "geli."],
  },
  {
    startFrame: 900,
    endFrame: 1005, // 30.0s - 33.5s
    text: "Hasilnya? Gelitikanmu sendiri terasa hambar.",
    highlights: ["terasa", "hambar."],
  },
  {
    startFrame: 1005,
    endFrame: 1086, // 33.5s - 36.2s
    text: "Beda cerita kalau orang lain yang menggelitik.",
    highlights: ["Beda", "cerita", "orang", "lain"],
  },
  {
    startFrame: 1086,
    endFrame: 1194, // 36.2s - 39.8s
    text: "Karena gerakannya nggak ketebak, otak nggak sempat meredamnya.",
    highlights: ["nggak", "ketebak,", "nggak", "sempat"],
  },
  {
    startFrame: 1194,
    endFrame: 1266, // 39.8s - 42.2s
    text: "Uniknya, otak bisa ditipu!",
    highlights: ["otak", "bisa", "ditipu!"],
  },
  {
    startFrame: 1266,
    endFrame: 1449, // 42.2s - 48.3s
    text: "Saat peneliti memakai tangan robot yang memberi jeda sepersekian detik...",
    highlights: ["tangan", "robot", "jeda"],
  },
  {
    startFrame: 1449,
    endFrame: 1515, // 48.3s - 50.5s
    text: "...antara gerakan dan sentuhan, rasa geli itu langsung muncul lagi.",
    highlights: ["geli", "langsung", "muncul", "lagi."],
  },
  {
    startFrame: 1515,
    endFrame: 1695, // 50.5s - 56.5s
    text: "Intinya, otakmu itu tukang spoiler yang membocorkan kejutan sebelum merasakannya.",
    highlights: ["tukang", "spoiler", "kejutan"],
  },
  {
    startFrame: 1695,
    endFrame: 1782, // 56.5s - 59.4s
    text: "Follow buat fakta 60 detik lainnya, ya!",
    highlights: ["Follow", "fakta", "60", "detik"],
  },
];

export const SubtitleOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentCue = SUBTITLES.find(
    (cue) => frame >= cue.startFrame && frame < cue.endFrame
  );

  if (!currentCue) {
    return null;
  }

  // Animation for cue entrance
  const cueAge = frame - currentCue.startFrame;
  const popSpring = spring({
    frame: cueAge,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const scale = interpolate(popSpring, [0, 1], [0.85, 1]);
  const opacity = interpolate(cueAge, [0, 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const words = currentCue.text.split(" ");

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 260, // Safe Zone: Above TikTok/Reels caption area, comfortable visual anchor
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 60px",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px 14px", // Guaranteed spacing between every word!
          maxWidth: 960,
          textAlign: "center",
          transform: `scale(${scale})`,
          opacity,
          fontFamily,
        }}
      >
        {words.map((word, idx) => {
          const cleanWord = word.toLowerCase().replace(/[.,!?—]/g, "");
          const isHighlighted = currentCue.highlights.some(
            (hl) => hl.toLowerCase().replace(/[.,!?—]/g, "") === cleanWord
          );

          if (isHighlighted) {
            return (
              <span
                key={idx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px 18px",
                  background: THEME.colors.yellow,
                  color: THEME.colors.ink,
                  fontSize: 54,
                  fontWeight: 900,
                  borderRadius: 18,
                  border: `4px solid ${THEME.colors.ink}`,
                  boxShadow: "4px 4px 0px #0F172A",
                  transform: "rotate(-1.5deg)",
                  letterSpacing: "-0.5px",
                }}
              >
                {word}
              </span>
            );
          }

          return (
            <span
              key={idx}
              style={{
                display: "inline-block",
                color: THEME.colors.ink,
                fontSize: 52,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                textShadow:
                  "-3px -3px 0 #FFF, 3px -3px 0 #FFF, -3px 3px 0 #FFF, 3px 3px 0 #FFF, 0 4px 10px rgba(0,0,0,0.12)",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
