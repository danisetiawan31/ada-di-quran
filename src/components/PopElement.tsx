import React from "react";
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Import curated local SFX assets dari public/sfx/
import sfxPop from "../../public/sfx/pop.wav";
import sfxBtnPop from "../../public/sfx/btn_pop.wav";
import sfxWhip from "../../public/sfx/whip.wav";
import sfxWhoosh from "../../public/sfx/whoosh.wav";
import sfxDing from "../../public/sfx/ding.wav";
import sfxTing from "../../public/sfx/ting.wav";

export type PopSoundType =
  | "pop"
  | "btn_pop"
  | "whip"
  | "whoosh"
  | "ding"
  | "ting"
  | "none";

const SFX_MAP: Record<Exclude<PopSoundType, "none">, string> = {
  pop: sfxPop,
  btn_pop: sfxBtnPop,
  whip: sfxWhip,
  whoosh: sfxWhoosh,
  ding: sfxDing,
  ting: sfxTing,
};

export interface PopElementProps {
  children: React.ReactNode;
  /** Frame relatif scene saat elemen meletup muncul */
  triggerFrame?: number;
  /** Jenis efek suara saat elemen muncul. Default: "pop" */
  sound?: PopSoundType;
  /** Volume SFX (0.0 s/d 1.0). Default: 0.22 (sejajar BGM, di bawah vokal narator) */
  volume?: number;
  /** Sudut rotasi miring awal (derajat) untuk ayunan playful. Default: -8 */
  tilt?: number;
  /** Titik tumpu transformasi. Default: "center center" */
  transformOrigin?: string;
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
 * 2. Bouncy Overshoot Spring (0 -> 1.08 -> 1.0).
 * 3. Playful Tilt Rotation (-8deg -> 0deg).
 * 4. Micro-Auditory Feedback otomatis (pop / whip / ding) pada triggerFrame.
 */
export const PopElement: React.FC<PopElementProps> = ({
  children,
  triggerFrame = 0,
  sound = "pop",
  volume = 0.22,
  tilt = -8,
  transformOrigin = "center center",
  style,
  springConfig = { damping: 12, stiffness: 120, mass: 0.8 },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isTriggered = frame >= triggerFrame;
  const elapsed = Math.max(0, frame - triggerFrame);

  // Elastic Spring Scale (0 -> 1.08 -> 1.0)
  const scale = isTriggered
    ? spring({
        frame: elapsed,
        fps,
        config: springConfig,
      })
    : 0;

  // Playful Tilt Rotation (-8deg -> 0deg)
  const rotation = isTriggered
    ? interpolate(scale, [0, 1], [tilt, 0], {
        extrapolateRight: "clamp",
      })
    : tilt;

  // Soft Opacity fade in di 3 frame awal
  const opacity = isTriggered
    ? interpolate(elapsed, [0, 3], [0, 1], {
        extrapolateRight: "clamp",
      })
    : 0;

  const sfxSrc = sound !== "none" ? SFX_MAP[sound] : null;

  return (
    <>
      {/* Micro-SFX diputar tepat pada saat elemen meletup muncul */}
      {sfxSrc && (
        <Sequence from={triggerFrame}>
          <Audio src={sfxSrc} volume={volume} />
        </Sequence>
      )}

      {/* Elemen Visual dibungkus animasi elastis */}
      {isTriggered && (
        <div
          style={{
            display: "inline-block",
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin,
            opacity,
            ...style,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};
