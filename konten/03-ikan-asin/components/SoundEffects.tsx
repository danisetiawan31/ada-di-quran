import React from "react";
import { Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";

interface SoundCue {
  frame: number;
  file: string;
  volume: number;
  durationInFrames: number;
  fadeOutFrames?: number;
  name: string;
}

const EP03_SOUND_CUES: SoundCue[] = [
  // =========================================================================
  // SCENE 1: PENJEMURAN PESISIR & OKNUM SEMPROT INSEKTISIDA (Frame 0 - 540)
  // =========================================================================
  { frame: 0, file: "sfx/whoosh2.mp3", volume: 0.30, durationInFrames: 45, fadeOutFrames: 12, name: "Scene 1 Opening Whoosh" },
  { frame: 8, file: "sfx/boing.wav", volume: 0.40, durationInFrames: 20, name: "Awas Ikan Asin Badge Boing" },
  { frame: 22, file: "sfx/fader.wav", volume: 0.35, durationInFrames: 35, fadeOutFrames: 10, name: "Aerosol Spray PSSSHHH" },
  { frame: 65, file: "sfx/glitch.wav", volume: 0.28, durationInFrames: 14, name: "Chemical Toxic Sizzle" },
  { frame: 180, file: "sfx/bling.mp3", volume: 0.38, durationInFrames: 40, fadeOutFrames: 12, name: "Fake Clean Diamond Bling" },
  { frame: 240, file: "sfx/whoosh1.mp3", volume: 0.30, durationInFrames: 25, name: "Sub-Scene 1B Transition Whoosh" },
  { frame: 270, file: "sfx/pluck.wav", volume: 0.35, durationInFrames: 12, name: "Curious Fly Buzz Pluck" },
  { frame: 384, file: "sfx/whip.wav", volume: 0.38, durationInFrames: 15, name: "Fly Repel Jet Whip" },
  { frame: 395, file: "sfx/punch_snap.mp3", volume: 0.48, durationInFrames: 20, name: "Fly K.O. Snap Punch" },
  { frame: 415, file: "sfx/pop_cork.wav", volume: 0.42, durationInFrames: 18, name: "Lalat Silang Badge Pop" },

  // =========================================================================
  // SCENE 2: PENAMPANG MAKRO DAGING & UJI RESISTENSI (Frame 540 - 885)
  // =========================================================================
  { frame: 540, file: "sfx/whoosh3.mp3", volume: 0.30, durationInFrames: 22, name: "Scene 2 Transition Whoosh" },
  { frame: 575, file: "sfx/slide_down.mp3", volume: 0.36, durationInFrames: 24, name: "Toxic Drop Falling Whistle" },
  { frame: 612, file: "sfx/drop.wav", volume: 0.50, durationInFrames: 15, name: "Toxic Droplet Impact Thud" },
  { frame: 630, file: "sfx/pop.wav", volume: 0.40, durationInFrames: 16, name: "Forensic Loupe Pop" },
  { frame: 645, file: "sfx/ting.wav", volume: 0.38, durationInFrames: 20, name: "Meresap Ke Daging Ting" },
  { frame: 750, file: "sfx/whoosh1.mp3", volume: 0.32, durationInFrames: 22, name: "Dual Comic Split Whoosh" },
  { frame: 765, file: "sfx/throw1.mp3", volume: 0.36, durationInFrames: 20, name: "BYUR Water Jet Splash" },
  { frame: 795, file: "sfx/punch_heavy.mp3", volume: 0.55, durationInFrames: 26, name: "Stamp GAGAL Heavy Slam" },
  { frame: 810, file: "sfx/scratch.wav", volume: 0.30, durationInFrames: 16, name: "SZZZT Hot Oil Sizzle" },
  { frame: 835, file: "sfx/slam.wav", volume: 0.55, durationInFrames: 26, name: "Stamp KEBAL Slam" },

  // =========================================================================
  // SCENE 3: RUANG MEDIS TERANG & SCANNER ORGAN (Frame 885 - 1080)
  // =========================================================================
  { frame: 885, file: "sfx/whoosh2.mp3", volume: 0.30, durationInFrames: 30, fadeOutFrames: 10, name: "Scene 3 Transition Whoosh" },
  { frame: 910, file: "sfx/tick_real.wav", volume: 0.40, durationInFrames: 10, name: "Heartbeat Biological Tick" },
  { frame: 945, file: "sfx/slide1.mp3", volume: 0.32, durationInFrames: 20, name: "Nausea Dizziness Wobble" },
  { frame: 1000, file: "sfx/duh.wav", volume: 0.42, durationInFrames: 20, name: "Organ Damage Alert Duh" },
  { frame: 1030, file: "sfx/chime.mp3", volume: 0.38, durationInFrames: 35, fadeOutFrames: 12, name: "X-Ray Scanner Warning Chime" },

  // =========================================================================
  // SCENE 4: PASAR PAGI JUJUR & PREAMBLE AYAT (Frame 1080 - 1365)
  // =========================================================================
  { frame: 1080, file: "sfx/whoosh1.mp3", volume: 0.30, durationInFrames: 28, name: "Scene 4 Morning Market Whoosh" },
  { frame: 1125, file: "sfx/whip.wav", volume: 0.38, durationInFrames: 15, name: "Prohibition Red Seal Whip" },
  { frame: 1155, file: "sfx/ding.wav", volume: 0.45, durationInFrames: 30, name: "Halal Green Shield Ding" },
  { frame: 1215, file: "sfx/btn_pop.wav", volume: 0.42, durationInFrames: 18, name: "Preamble Sacred Halo Pop" },
  { frame: 1225, file: "sfx/bling.mp3", volume: 0.40, durationInFrames: 45, fadeOutFrames: 15, name: "Rub El Hizb Star Bling" },

  // =========================================================================
  // OUTRO CTA: AJAKAN FOLLOW BER-AVATAR (Frame 1613 - 1720)
  // (Zona 1365 - 1613 dilewati 100% oleh programmatic guard)
  // =========================================================================
  { frame: 1615, file: "sfx/slide1.mp3", volume: 0.35, durationInFrames: 22, name: "Outro CTA Slide Transition" },
  { frame: 1622, file: "sfx/pop_cork.wav", volume: 0.48, durationInFrames: 15, name: "CTA Card Elastic Pop" },
  { frame: 1640, file: "sfx/click.wav", volume: 0.50, durationInFrames: 10, name: "Pointer Finger Click Impact" },
  { frame: 1644, file: "sfx/boing.wav", volume: 0.38, durationInFrames: 20, name: "Follow Button Rebound Boing" },
];

export const SoundEffects: React.FC = () => {
  const currentFrame = useCurrentFrame();

  // Programmatic guard mutlak: Zona Ayat Al-Qur'an 100% hening mutlak
  if (currentFrame >= 1365 && currentFrame < 1613) {
    return null;
  }

  return (
    <>
      {EP03_SOUND_CUES.map((cue, idx) => {
        // Perlindungan ganda: jangan pernah render cue di dalam zona hening ayat
        if (cue.frame >= 1365 && cue.frame < 1613) {
          return null;
        }

        const hasFade = Boolean(cue.fadeOutFrames && cue.fadeOutFrames > 0);
        return (
          <Sequence
            key={`${cue.file}-${cue.frame}-${idx}`}
            from={cue.frame}
            durationInFrames={cue.durationInFrames}
            name={`SFX: ${cue.name}`}
            layout="none"
          >
            {hasFade ? (
              <Audio
                src={staticFile(cue.file)}
                volume={(f) => {
                  const fadeStart = Math.max(0, cue.durationInFrames - cue.fadeOutFrames!);
                  return interpolate(
                    f,
                    [0, fadeStart, cue.durationInFrames],
                    [cue.volume, cue.volume, 0],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  );
                }}
              />
            ) : (
              <Audio src={staticFile(cue.file)} volume={cue.volume} />
            )}
          </Sequence>
        );
      })}
    </>
  );
};
