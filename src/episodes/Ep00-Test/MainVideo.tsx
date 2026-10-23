import React from "react";
import {
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { EpisodeLayout } from "../../components/EpisodeLayout";
import { CameraRig, ParallaxLayer } from "../../components/CameraRig";
import { SacredLight, Watermark } from "../../components/SacredLight";
import { generateProportionalSubtitles } from "../../utils/subtitleTiming";
import { COLORS, DIMENSIONS } from "../../theme/tokens";
import { FONTS } from "../../theme/fonts";

export const Ep00TestVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Durasi testing Part 1 (Narasi): 240 frame (~8 detik)
  const voMainFrames = 240;

  // 1. Generate Subtitle Proporsional dengan Keyword Highlights
  const mainSubtitles = generateProportionalSubtitles(
    [
      {
        text: "Pernahkah kamu bertanya-tanya tentang rahasia laut yang terbelah dua?",
        highlightWords: ["rahasia", "laut", "terbelah"],
      },
      {
        text: "Dua massa air yang bertemu tapi tidak pernah saling bercampur.",
        highlightWords: ["air", "bercampur"],
      },
      {
        text: "Petunjuk fenomena ini ternyata sudah tertulis jelas di dalam Al-Qur'an!",
        highlightWords: ["tertulis", "Al-Qur'an"],
      },
    ],
    voMainFrames
  );

  // 2. Simulasi Pergerakan Kamera Sinematik (CameraRig)
  const cameraZoom = interpolate(frame, [0, 120, 240], [1.0, 1.15, 1.05], {
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [0, 240], [0, 40], {
    extrapolateRight: "clamp",
  });

  return (
    <EpisodeLayout
      // Bagian 1: Narasi Utama & Storytelling
      voMainSrc={staticFile("assets/ep00/vo_main.mp3")}
      voMainFrames={voMainFrames}
      mainSubtitles={mainSubtitles}
      bgmTrack="bossa"
      bgmVolume={0.15}
      // Bagian 2: Ayat Al-Qur'an (Surah Al-Hajj: 12)
      ayahSurah={22}
      ayahNumber={12}
      ayahTranslation="Ia menyeru kepada selain Allah sesuatu yang tidak dapat mendatangkan bencana dan tidak pula memberi manfaat kepadanya. Itulah kesesatan yang jauh."
      ayahAudioSrc={staticFile("assets/ep00/ayah.mp3")}
      ayahImageSrc={staticFile("assets/ep00/ayah.png")}
      ayahFrames={DIMENSIONS.maxAyahFrames}
      // Bagian 3: Penutup & Outro CTA
      voCtaSrc={staticFile("assets/global/vo_cta.mp3")}
      voCtaFrames={90}
      ctaSubtitles={[
        {
          text: "Follow Ada di Quran buat tahu fakta menarik lainnya, ya!",
          startFrame: 0,
          endFrame: 90,
          durationInFrames: 90,
          highlightWords: ["Follow", "Ada", "Quran"],
        },
      ]}
      ctaNode={
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(10, 17, 40, 0.75)",
            backdropFilter: "blur(12px)",
            padding: "24px 48px",
            borderRadius: 32,
            border: `2px solid ${COLORS.amber}`,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: FONTS.title,
              color: COLORS.amber,
              fontSize: 48,
              margin: 0,
            }}
          >
            ADA DI QURAN
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              color: COLORS.textWhite,
              fontSize: 26,
              marginTop: 12,
            }}
          >
            Edukasi Tadabbur Visual 2D
          </p>
        </div>
      }
    >
      {/* =======================================================================
          VISUAL ILUSTRASI 2D PENUH (DIBUNGKUS CAMERARIG & PARALLAX)
         ======================================================================= */}
      <CameraRig zoom={cameraZoom} panY={cameraPanY}>
        {/* Parallax Layer 1: Langit Malam & Bintang (Kecepatan 0.3) */}
        <ParallaxLayer speed={0.3}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `radial-gradient(ellipse at 50% 20%, #1E293B 0%, ${COLORS.deepNight} 70%)`,
            }}
          >
            {/* Titik-titik Bintang Bercahaya */}
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 23) % 45}%`,
                  width: (i % 3) + 2,
                  height: (i % 3) + 2,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "50%",
                  opacity: (Math.sin(frame * 0.1 + i) + 1) * 0.4 + 0.2,
                }}
              />
            ))}
          </div>
        </ParallaxLayer>

        {/* Parallax Layer 2: Dua Samudra yang Bertemu (Kecepatan 1.0) */}
        <ParallaxLayer speed={1.0}>
          {/* Sisi Laut Kiri (Deep Teal #0D9488) */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "52%",
              height: "60%",
              backgroundColor: "#0F766E",
              borderTopRightRadius: 80,
              boxShadow: "0 -10px 40px rgba(15, 118, 110, 0.4)",
            }}
          />

          {/* Sisi Laut Kanan (Deep Blue #1E3A8A) */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "50%",
              height: "60%",
              backgroundColor: "#1E3A8A",
              borderTopLeftRadius: 80,
              boxShadow: "0 -10px 40px rgba(30, 58, 138, 0.4)",
            }}
          />

          {/* Garis Batas Pemisah (Barzakh / Barrier) */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: 8,
              height: "62%",
              backgroundColor: COLORS.amber,
              boxShadow: `0 0 20px ${COLORS.amber}`,
              transform: "translateX(-50%)",
              opacity: 0.85,
            }}
          />
        </ParallaxLayer>

        {/* Parallax Layer 3: Pancaran Cahaya Hikmah (SacredLight) */}
        <ParallaxLayer speed={0.8}>
          <SacredLight x="50%" y="32%" size={240} label="BARZAKH (PEMISAH)" />
        </ParallaxLayer>
      </CameraRig>

      {/* Watermark Identitas Channel */}
      <Watermark />
    </EpisodeLayout>
  );
};
