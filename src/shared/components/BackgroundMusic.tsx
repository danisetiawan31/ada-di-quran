import React from "react";
import { Audio, interpolate, staticFile, useVideoConfig } from "remotion";

export interface BackgroundMusicProps {
  /**
   * Selected BGM track:
   * "bossa": Acoustic nylon-string guitar, flute, light latin percussion (Kevin MacLeod - Bossa Antigua)
   * "rhodes": Warm Fender Rhodes electric piano, upright bass, gentle brushes (Kevin MacLeod - Airport Lounge)
   * Or any custom audio file path located in public/
   */
  track?: "bossa" | "rhodes" | string;
  /**
   * Peak target volume (0.0 to 1.0)
   */
  volume?: number;
  /**
   * Custom duration in frames (defaults to the composition's durationInFrames)
   */
  durationInFrames?: number;
  /**
   * Number of frames for initial fade-in (default: 24 frames / ~0.8s)
   */
  fadeInFrames?: number;
  /**
   * Number of frames for final fade-out (default: 60 frames / ~2.0s)
   */
  fadeOutFrames?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  track = "bossa",
  volume,
  durationInFrames: customDuration,
  fadeInFrames = 24,
  fadeOutFrames = 60,
}) => {
  const { durationInFrames: compDuration } = useVideoConfig();
  const totalDuration = customDuration ?? compDuration;

  let fileName = track;
  if (track === "bossa") fileName = "bgm_bossa.mp3";
  else if (track === "rhodes") fileName = "bgm_rhodes.mp3";

  // Bossa Antigua is mastered with high dynamic range (-23.8 dB mean), so 0.20 (20%) gives a cozy presence.
  // Airport Lounge is louder (-16.9 dB mean), so 0.12 is ideal.
  const targetVolume = volume ?? (track === "bossa" ? 0.20 : 0.12);

  const fadeOutStart = Math.max(0, totalDuration - fadeOutFrames);

  return (
    <Audio
      src={staticFile(fileName)}
      volume={(f) =>
        interpolate(
          f,
          [0, fadeInFrames, fadeOutStart, totalDuration],
          [0, targetVolume, targetVolume, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        )
      }
    />
  );
};
