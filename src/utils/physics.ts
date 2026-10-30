import { interpolate, spring } from "remotion";

/**
 * 1. Kurva Gerak 4 Fase: Anticipation (Ancang-ancang mundur) -> Fast Launch -> Bouncy Overshoot -> Settle
 * Menghasilkan nilai progress dari 0 menuju 1 (dengan nilai negatif terkontrol di awal untuk ancang-ancang).
 */
export const getAnticipationSpring = (
  frame: number,
  startFrame: number,
  fps: number = 30,
  anticipationFrames: number = 6,
  anticipationStrength: number = 0.18,
  damping: number = 10,
  stiffness: number = 140
): number => {
  const localFrame = frame - startFrame;
  if (localFrame < 0) return 0;

  // Fase 1: Ancang-ancang mundur (Anticipation)
  if (localFrame <= anticipationFrames) {
    return interpolate(
      localFrame,
      [0, anticipationFrames * 0.6, anticipationFrames],
      [0, -anticipationStrength, -anticipationStrength * 0.8],
      { extrapolateRight: "clamp" }
    );
  }

  // Fase 2 & 3: Melesat & Membal (Spring Overshoot)
  const springFrame = localFrame - anticipationFrames;
  const s = spring({
    frame: springFrame,
    fps,
    config: { damping, stiffness, mass: 0.9 },
  });

  return interpolate(s, [0, 1], [-anticipationStrength * 0.8, 1]);
};

/**
 * 2. Efek Recoil / Hentakan Balik (Untuk semprotan kaleng, benturan, atau detak kaget)
 * Mengembalikan nilai dorongan balik (0 -> peak 1.0 -> kembali ke 0 dengan getaran pegas).
 */
export const getRecoilImpulse = (
  frame: number,
  triggerFrame: number,
  fps: number = 30,
  durationFrames: number = 25
): number => {
  const localFrame = frame - triggerFrame;
  if (localFrame < 0 || localFrame > durationFrames) return 0;

  // Fase 1: Serangan cepat naik dalam 2-3 frame
  const attack = interpolate(localFrame, [0, 3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fase 2: Peluruhan kenyal (decay with spring settling back to 0)
  const springDecay = spring({
    frame: Math.max(0, localFrame - 3),
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  // Pastikan saat spring mencapai 1, decay turun ke 0 tanpa tembus ke negatif liar
  const decay = Math.max(0, 1 - springDecay);

  return attack * decay;
};

/**
 * 3. Squash & Stretch Otomatis (Menjaga volume objek tetap kenyal saat bergerak/membal)
 * Masukkan nilai deformasi (-0.45 s/d 0.45) untuk mendapatkan pasangan scaleX dan scaleY.
 * Rumus kekekalan volume animasi klasik: scaleX * scaleY = 1.0
 */
export const getSquashAndStretch = (
  deformation: number
): { scaleX: number; scaleY: number } => {
  const clamped = Math.max(-0.45, Math.min(0.45, deformation));
  return {
    scaleX: 1 + clamped,
    scaleY: 1 / (1 + clamped),
  };
};

/**
 * 4. Gelombang Organik Berkelanjutan (Untuk ombak, uap panas, gelembung mendidih, napas)
 */
export const getContinuousWave = (
  frame: number,
  speed: number = 0.08,
  amplitude: number = 10,
  phaseOffset: number = 0
): number => {
  return Math.sin(frame * speed + phaseOffset) * amplitude;
};
