import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type PopSoundType =
  | "whip"
  | "whoosh"
  | "pageTurn"
  | "mouseClick"
  | "ding"
  | "pop"
  | "btn_pop"
  | "ting"
  | "none";

// Mapping SFX ke aset lokal public/sfx/ (Offline-safe, zero latency, tidak memicu network error)
const SFX_MAP: Record<Exclude<PopSoundType, "none">, string> = {
  whip: staticFile("sfx/whip.wav"),
  whoosh: staticFile("sfx/whoosh.wav"),
  pageTurn: staticFile("sfx/slide1.mp3"),
  mouseClick: staticFile("sfx/click.wav"),
  ding: staticFile("sfx/ding.wav"),
  pop: staticFile("sfx/pop.wav"),
  btn_pop: staticFile("sfx/btn_pop.wav"),
  ting: staticFile("sfx/ting.wav"),
};

export interface PopElementProps {
  children: React.ReactNode;
  /** Frame mulai saat elemen meletup muncul */
  startFrame?: number;
  /** Alias triggerFrame untuk kompatibilitas ke belakang */
  triggerFrame?: number;
  /** Frame opsional saat elemen mulai menghilang */
  endFrame?: number;
  /** Jenis efek suara saat elemen muncul. Default: 'whip' */
  sfxType?: PopSoundType;
  /** Alias sound untuk kompatibilitas ke belakang */
  sound?: PopSoundType;
  /** Volume SFX (0.0 s/d 1.0). Default: 0.22 */
  volume?: number;
  /** Sudut rotasi miring awal (derajat) untuk ayunan playful. Default: -8 */
  tilt?: number;
  /** Titik tumpu transformasi. Default: 'center center' */
  transformOrigin?: string;
  /** Tag pembungkus: 'div' untuk layer DOM HTML, 'g' untuk di dalam canvas SVG. Default: 'div' */
  as?: "div" | "g";
  /** Styling tambahan untuk wrapper container */
  style?: React.CSSProperties;
  /** Konfigurasi kekenyalan spring */
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

/**
 * `<PopElement />` — Komponen wrapper standar untuk memunculkan elemen visual pendukung
 * (kartu, balon pikiran, badge, ikon objek, indikator) secara elastis dan bermartabat.
 *
 * Menerapkan prinsip:
 * 1. No Instant Appear (tidak pernah muncul mendadak di frame 0).
 * 2. Bouncy Overshoot Spring (0 -> 1.08 -> 1.0, damping: 11, stiffness: 130).
 * 3. Playful Tilt Rotation (-8deg -> 0deg).
 * 4. Micro-SFX otomatis (@remotion/sfx / local curated sfx) tepat pada startFrame.
 * 5. Mendukung tag 'div' maupun 'g' (SVG canvas native).
 */
export const PopElement: React.FC<PopElementProps> = ({
  children,
  startFrame,
  triggerFrame,
  endFrame,
  sfxType,
  sound,
  volume = 0.22,
  tilt = -8,
  transformOrigin = "center center",
  as = "div",
  style,
  springConfig = { damping: 11, stiffness: 130, mass: 0.8 },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const targetFrame = Math.max(0, startFrame ?? triggerFrame ?? 0);
  const isTriggered = frame >= targetFrame;
  const elapsed = Math.max(0, frame - targetFrame);

  // Elastic Spring Scale Masuk (0 -> 1.08 -> 1.0)
  const enterScale = isTriggered
    ? spring({
        frame: elapsed,
        fps,
        config: springConfig,
      })
    : 0;

  // Elastic Spring Scale Keluar jika endFrame ditentukan
  let exitScale = 1;
  let exitOpacity = 1;
  if (endFrame && frame >= endFrame) {
    const exitElapsed = frame - endFrame;
    exitScale = Math.max(
      0,
      1 -
        spring({
          frame: exitElapsed,
          fps,
          config: { damping: 14, stiffness: 160 },
        })
    );
    exitOpacity = interpolate(exitElapsed, [0, 8], [1, 0], {
      extrapolateRight: "clamp",
    });
  }

  const finalScale = enterScale * exitScale;

  // Playful Tilt Rotation (-8deg -> 0deg)
  const rotation = isTriggered
    ? interpolate(enterScale, [0, 1], [tilt, 0], {
        extrapolateRight: "clamp",
      })
    : tilt;

  // Soft Opacity fade in di 3 frame awal
  const enterOpacity = isTriggered
    ? interpolate(elapsed, [0, 3], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 0;

  const finalOpacity = enterOpacity * exitOpacity;

  // Pilih tipe SFX (prioritas sfxType -> sound -> default 'whip')
  const chosenSfx = sfxType ?? sound ?? "whip";
  const sfxSrc = chosenSfx !== "none" ? SFX_MAP[chosenSfx] : null;

  return (
    <>
      {/* Micro-SFX diputar tepat pada saat elemen meletup muncul (durasi 45 frame = 1.5 detik agar siklus audio selesai tuntas) */}
      {sfxSrc && (
        <Sequence from={targetFrame} durationInFrames={45} layout="none">
          <Audio src={sfxSrc} volume={volume} />
        </Sequence>
      )}

      {/* Elemen Visual dibungkus animasi elastis */}
      {isTriggered &&
        finalScale > 0.001 &&
        (as === "g" ? (
          <g
            style={{
              transform: `scale(${finalScale}) rotate(${rotation}deg)`,
              transformOrigin,
              opacity: finalOpacity,
              ...style,
            }}
          >
            {children}
          </g>
        ) : (
          <div
            style={{
              display: "inline-block",
              transform: `scale(${finalScale}) rotate(${rotation}deg)`,
              transformOrigin,
              opacity: finalOpacity,
              ...style,
            }}
          >
            {children}
          </div>
        ))}
    </>
  );
};
