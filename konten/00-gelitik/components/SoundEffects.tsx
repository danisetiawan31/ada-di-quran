import React from "react";
import { Audio, Sequence, interpolate, staticFile } from "remotion";

interface SoundCue {
  frame: number;
  file: string;
  volume: number;
  durationInFrames: number;
  fadeOutFrames?: number;
  name: string;
}

const PLAYFUL_SOUND_CUES: SoundCue[] = [
  // =========================================================
  // BLOK 1: HOOK & KONTEKS (0 - 384 frames / 0 - 12.8s)
  // =========================================================
  // 1. Opening wide whoosh (Full breath sweep)
  { frame: 0, file: "sfx/whoosh2.mp3", volume: 0.32, durationInFrames: 60, fadeOutFrames: 15, name: "Intro Whoosh" },
  // 2. Comic bouncy spring for "SPOILER ALERT!" badge
  { frame: 8, file: "sfx/boing.wav", volume: 0.42, durationInFrames: 20, name: "Spoiler Boing" },
  // 3. Curious rising question cue for "KOK BISA?!"
  { frame: 144, file: "sfx/question1.wav", volume: 0.45, durationInFrames: 18, name: "Kok Bisa Question" },
  // 4. Cartoon slide whistle transition to Duel Phase
  { frame: 195, file: "sfx/slide1.mp3", volume: 0.38, durationInFrames: 26, name: "Duel Slide Whistle" },
  // 5. Spring pluck when "DIGELITIK ORANG LAIN" enters
  { frame: 198, file: "sfx/pluck.wav", volume: 0.42, durationInFrames: 8, name: "Orang Lain Pluck" },
  // 6. Natural cartoon giggle (Full laugh trailing off smoothly before Bukan Salah Jari punch)
  { frame: 204, file: "sfx/giggle.mp3", volume: 0.32, durationInFrames: 76, fadeOutFrames: 16, name: "Laugh Giggle" },
  // 7. Water droplet / dull drop when "DIGELITIK SENDIRI" enters
  { frame: 215, file: "sfx/drop.wav", volume: 0.42, durationInFrames: 8, name: "Diri Sendiri Drop" },
  // 8. Crunchy comic punch slam for "BUKAN SALAH JARI!" stamp
  { frame: 282, file: "sfx/punch_heavy.mp3", volume: 0.52, durationInFrames: 26, name: "Bukan Jari Punch" },
  // 9. Funny cartoon vocal "duh"
  { frame: 290, file: "sfx/duh.wav", volume: 0.35, durationInFrames: 12, name: "Bukan Jari Duh" },

  // =========================================================
  // BLOK 2: SEREBELUM & BOCORAN SINYAL (384 - 666 frames / 12.8s - 22.2s)
  // =========================================================
  // 10. Crisp airy whoosh transition to Scene 2
  { frame: 384, file: "sfx/whoosh1.mp3", volume: 0.32, durationInFrames: 32, name: "Scene 2 Whoosh" },
  // 11. Bubbly cork pop for "SEREBELUM" pill badge
  { frame: 395, file: "sfx/pop_cork.wav", volume: 0.45, durationInFrames: 10, name: "Serebelum Cork Pop" },
  // 12. Gentle crystal ting on cerebellum foliation glow
  { frame: 410, file: "sfx/ting.wav", volume: 0.32, durationInFrames: 12, name: "Cerebellum Ting" },
  // 13. Playful cartoon throw when signal energy packet launches
  { frame: 525, file: "sfx/throw1.mp3", volume: 0.38, durationInFrames: 10, name: "Signal Energy Throw" },
  // 14. Star bling when signal hits serebelum (Full shimmering ring decay)
  { frame: 555, file: "sfx/bling.mp3", volume: 0.42, durationInFrames: 65, fadeOutFrames: 15, name: "Signal Bling Arrival" },

  // =========================================================
  // BLOK 3: MEREDAM SENSASI (666 - 1005 frames / 22.2s - 33.5s)
  // =========================================================
  // 15. Smooth medium whoosh transition to Scene 3
  { frame: 666, file: "sfx/whoosh3.mp3", volume: 0.32, durationInFrames: 16, name: "Scene 3 Whoosh" },
  // 16. Descending cartoon slide whistle as volume fades from 100% to 0%
  { frame: 756, file: "sfx/slide_down.mp3", volume: 0.42, durationInFrames: 20, name: "Damping Slide Down" },
  // 17. Comic record stop / scratch when volume hits 0% ("0% DIMATIKAN")
  { frame: 830, file: "sfx/scratch.wav", volume: 0.36, durationInFrames: 10, name: "Mute Scratch" },
  // 18. Comical hollow bong thud for "HAMBAR!" stamp slam
  { frame: 896, file: "sfx/bong.wav", volume: 0.52, durationInFrames: 10, name: "Hambar Bong Slam" },

  // =========================================================
  // BLOK 4: ORANG LAIN & PLOT TWIST (1005 - 1266 frames / 33.5s - 42.2s)
  // =========================================================
  // 19. Sharp comic whip transition to Scene 4
  { frame: 1005, file: "sfx/whip.wav", volume: 0.32, durationInFrames: 8, name: "Scene 4 Whip Whoosh" },
  // 20. Quirky mysterious question cue for confused brain with question marks
  { frame: 1018, file: "sfx/question2.wav", volume: 0.42, durationInFrames: 14, name: "Confused Brain Chime" },
  // 21. Natural giggles during "100% GELI MAKSIMAL" (Plays fully for 3s then fades into glitch)
  { frame: 1086, file: "sfx/giggle.mp3", volume: 0.35, durationInFrames: 92, fadeOutFrames: 18, name: "Geli Maksimal Giggle" },
  // 22. Quirky digital glitch for "PLOT TWIST: SENSORIK HACK!"
  { frame: 1182, file: "sfx/glitch.wav", volume: 0.42, durationInFrames: 8, name: "Sensorik Hack Glitch" },
  // 23. Snappy comic punch for "OTAK BISA DITIPU! 💥" banner slam
  { frame: 1195, file: "sfx/punch_snap.mp3", volume: 0.52, durationInFrames: 12, name: "Otak Ditipu Snap Punch" },

  // =========================================================
  // BLOK 5: EKSPERIMEN ROBOT (1266 - 1515 frames / 42.2s - 50.5s)
  // =========================================================
  // 24. Airy whoosh transition to Scene 5
  { frame: 1266, file: "sfx/whoosh1.mp3", volume: 0.32, durationInFrames: 32, name: "Scene 5 Whoosh" },
  // 25. Real mechanical clock ticks during the 0.2s stopwatch delay
  { frame: 1290, file: "sfx/tick_real.wav", volume: 0.45, durationInFrames: 6, name: "Stopwatch Tick 1" },
  { frame: 1330, file: "sfx/tick_real.wav", volume: 0.45, durationInFrames: 6, name: "Stopwatch Tick 2" },
  { frame: 1370, file: "sfx/tick_real.wav", volume: 0.45, durationInFrames: 6, name: "Stopwatch Tick 3" },
  // 26. Comic cannon boom + sparkle burst when "GELI LAGI! ⚡" explodes! (Full bass resonance)
  { frame: 1449, file: "sfx/cannon.mp3", volume: 0.48, durationInFrames: 55, fadeOutFrames: 15, name: "Geli Lagi Cannon Boom" },
  { frame: 1452, file: "sfx/bling.mp3", volume: 0.42, durationInFrames: 55, fadeOutFrames: 15, name: "Geli Lagi Sparkle Bling" },
  // 27. Funny cartoon laugh for ticklish reflex return
  { frame: 1464, file: "sfx/laugh_monster.wav", volume: 0.38, durationInFrames: 18, name: "Refleks Laugh" },

  // =========================================================
  // BLOK 6: PENUTUP & OUTRO CTA (1515 - 1782 frames / 50.5s - 59.4s)
  // =========================================================
  // 28. Wide whoosh transition to Scene 6
  { frame: 1515, file: "sfx/whoosh2.mp3", volume: 0.32, durationInFrames: 50, fadeOutFrames: 15, name: "Scene 6 Whoosh" },
  // 29. Bright discovery chime for "TUKANG SPOILER! 📢" (Full resonant bell ring)
  { frame: 1526, file: "sfx/chime.mp3", volume: 0.42, durationInFrames: 50, fadeOutFrames: 12, name: "Tukang Spoiler Chime" },
  // 30. Upward slide whistle transition to Outro CTA
  { frame: 1685, file: "sfx/slide1.mp3", volume: 0.35, durationInFrames: 26, name: "Outro Slide Whistle" },
  // 31. Juicy tactile UI pop for "FOLLOW SEKARANG" button entrance
  { frame: 1698, file: "sfx/btn_pop.wav", volume: 0.48, durationInFrames: 10, name: "Follow Button Pop" },
  // 32. Spring boing for the bounce pulse of the Follow button
  { frame: 1704, file: "sfx/boing.wav", volume: 0.35, durationInFrames: 20, name: "Follow Button Boing" },
];

export const SoundEffects: React.FC = () => {
  return (
    <>
      {PLAYFUL_SOUND_CUES.map((cue, idx) => {
        const hasFade = Boolean(cue.fadeOutFrames && cue.fadeOutFrames > 0);
        return (
          <Sequence
            key={`${cue.file}-${cue.frame}-${idx}`}
            from={cue.frame}
            durationInFrames={cue.durationInFrames}
            name={`SFX: ${cue.name}`}
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
