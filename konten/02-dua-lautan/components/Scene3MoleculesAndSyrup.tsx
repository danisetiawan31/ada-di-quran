import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraRig } from "../../../src/components/CameraRig";
import { FONTS } from "../../../src/theme/fonts";

// Sound Effects dari library public/sfx/
import sfxBoing from "../../../public/sfx/boing.wav";
import sfxTing from "../../../public/sfx/ting.wav";
import sfxWhoosh from "../../../public/sfx/whoosh2.mp3";
import sfxDrop from "../../../public/sfx/drop.wav";
import sfxSlide from "../../../public/sfx/slide_down.mp3";
import sfxPop from "../../../public/sfx/pop.wav";
import sfxBling from "../../../public/sfx/bling.mp3";

export const Scene3MoleculesAndSyrup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // FASE & TRANSISI (Total Durasi: 234 frame / 7.8 detik)
  // - Fase 1 (Frame 0 - 98): Molekul Air H₂O bertabrakan & memantul elastis
  // - Fase 2 (Frame 92 - 234): Analogi Gelas Kimia Sirup Kental vs Air Putih
  // =========================================================================
  const syrupPhaseProgress = interpolate(frame, [92, 112], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const moleculesOpacity = 1 - syrupPhaseProgress;
  const isSyrupPhase = frame >= 90;

  // Kamera dinamika: punch-in saat tabrakan molekul & transisi punch ke lab
  const cameraZoom = interpolate(
    frame,
    [0, 28, 34, 45, 92, 112, 170, 234],
    [1.0, 1.05, 1.06, 1.02, 1.0, 1.03, 1.02, 1.0],
    { extrapolateRight: "clamp" }
  );

  // =========================================================================
  // 1. FASE MOLEKUL (Frame 0 - 98)
  // =========================================================================
  // Animasi tabrakan dan pantulan elastis (Boing recoil!)
  const collisionCycle = interpolate(
    frame,
    [0, 28, 36, 52, 75, 98],
    [0, 1, 0.95, 0.1, 0.35, 0.25],
    { extrapolateRight: "clamp" }
  );

  // Posisi X molekul kiri & kanan mendekat ke X = 540 lalu membal
  const leftClusterX = interpolate(collisionCycle, [0, 1], [230, 465]);
  const rightClusterX = interpolate(collisionCycle, [0, 1], [850, 615]);

  // Squash & Stretch saat tabrakan
  const impactSquash = interpolate(frame, [26, 31, 38], [1.0, 0.78, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const impactStretch = interpolate(frame, [26, 31, 38], [1.0, 1.25, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gelombang kejut gaya tolak (Shockwave ring di garis tengah)
  const shockwaveScale = interpolate(frame, [28, 65], [0.2, 2.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shockwaveOpacity = interpolate(frame, [28, 38, 65], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sparks impact comic particles (Frame 28 - 46)
  const isImpactSparks = frame >= 28 && frame <= 46;
  const impactSparkProgress = interpolate(frame, [28, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge Penjelasan "MENOLAK MELEBUR!"
  const rejectBadgeSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Array molekul air & ion garam (Na+, Cl-) di kiri (Asin & Padat)
  const leftMolecules = useMemo(() => {
    return [
      { id: 1, relX: -40, relY: -190, rot: -15, scale: 1.05 },
      { id: 2, relX: 30, relY: -85, rot: 25, scale: 0.95 },
      { id: 3, relX: -60, relY: 15, rot: -8, scale: 1.1 },
      { id: 4, relX: 20, relY: 125, rot: 30, scale: 1.0 },
      { id: 5, relX: -30, relY: 235, rot: -20, scale: 1.02 },
    ];
  }, []);

  const saltIons = useMemo(() => {
    return [
      { id: "na1", relX: -110, relY: -145, type: "Na⁺", color: "#60A5FA", r: 20 },
      { id: "cl1", relX: 70, relY: -30, type: "Cl⁻", color: "#38BDF8", r: 26 },
      { id: "na2", relX: -100, relY: 75, type: "Na⁺", color: "#60A5FA", r: 20 },
      { id: "cl2", relX: 60, relY: 190, type: "Cl⁻", color: "#38BDF8", r: 26 },
      { id: "na3", relX: -90, relY: 285, type: "Na⁺", color: "#60A5FA", r: 20 },
    ];
  }, []);

  // Array molekul air murni di kanan (Segar & Ringan)
  const rightMolecules = useMemo(() => {
    return [
      { id: 6, relX: 40, relY: -185, rot: 15, scale: 1.0 },
      { id: 7, relX: -30, relY: -75, rot: -22, scale: 1.08 },
      { id: 8, relX: 50, relY: 25, rot: 18, scale: 0.98 },
      { id: 9, relX: -20, relY: 135, rot: -15, scale: 1.05 },
      { id: 10, relX: 40, relY: 245, rot: 22, scale: 1.0 },
    ];
  }, []);

  // Spark burst items for comic impact at the boundary
  const sparkParticles = useMemo(() => {
    return [
      { angle: 0, dist: 140, size: 16, char: "💥" },
      { angle: 45, dist: 170, size: 20, char: "✨" },
      { angle: 90, dist: 150, size: 14, char: "⚡" },
      { angle: 135, dist: 160, size: 18, char: "✨" },
      { angle: 180, dist: 140, size: 16, char: "💥" },
      { angle: 225, dist: 170, size: 20, char: "✨" },
      { angle: 270, dist: 150, size: 14, char: "⚡" },
      { angle: 315, dist: 160, size: 18, char: "✨" },
    ];
  }, []);

  // Transisi mikroskop keluar (scale down slightly saat beralih)
  const microLensScale = interpolate(frame, [90, 110], [1.0, 0.86], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 2. FASE GELAS KIMIA & ANALOGI SIRUP (Frame 92 - 234)
  // Geometri:
  // - Beaker: X=540 (width 460, X in [310, 770]), Top=480, Height=610
  // - Beaker Base: Y = 480 + 610 = 1090
  // =========================================================================
  const beakerSpring = spring({
    frame: frame - 96,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Animasi penuangan sirup kental (Frame 110 - 155)
  const syrupPourProgress = interpolate(frame, [110, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const syrupHeight = syrupPourProgress * 230;
  // Permukaan cairan sirup saat ini diukur dari atas layar (global Y)
  const currentSyrupSurfaceY = 1090 - syrupHeight;

  // Animasi penuangan air putih perlahan di atas sirup (Frame 158 - 200)
  const waterPourProgress = interpolate(frame, [158, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waterHeight = waterPourProgress * 230;
  // Permukaan cairan air putih saat ini diukur dari atas layar (global Y)
  const currentWaterSurfaceY = 1090 - 230 - waterHeight; // 860 - waterHeight

  // Botol Sirup (Kanan Luar: mulut di (720, 460))
  const syrupBottleOpacity = interpolate(frame, [106, 114, 150, 158], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Tilt rotasi botol (0 deg = tegak ke bawah, -35 deg = miring tuang ke kiri)
  const syrupBottleTilt = interpolate(frame, [108, 118, 148, 156], [10, -35, -35, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isSyrupStreaming = frame >= 110 && frame <= 152;

  // Botol Air Lab Carafe (Kiri Luar: mulut di (360, 460))
  const waterBottleOpacity = interpolate(frame, [154, 162, 196, 204], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Tilt rotasi botol (0 deg = tegak ke bawah, +35 deg = miring tuang ke kanan)
  const waterBottleTilt = interpolate(frame, [156, 166, 194, 202], [-10, 35, 35, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isWaterStreaming = frame >= 158 && frame <= 198;

  // Lapisan meniskus pembatas emas berkilau (Frame 168+)
  const meniscusGlow = interpolate(frame, [168, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Shimmer pulse di garis batas meniskus
  const meniscusShimmer = Math.sin(frame * 0.15) * 0.2 + 0.8;

  // Card takeaway kesimpulan bawah
  const takeawaySpring = spring({
    frame: frame - 188,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  return (
    <CameraRig zoom={cameraZoom}>
      <AbsoluteFill style={{ backgroundColor: "#060D1E", overflow: "hidden" }}>
        {/* ===================================================================
            AUDIO SFX SEQUENCES (SYNCHRONIZED)
           =================================================================== */}
        {/* 1. Molekul Menabrak Garis Pembatas (Boing Recoil!) di Frame 28 */}
        <Sequence from={28} durationInFrames={40}>
          <Audio src={sfxBoing} volume={0.38} />
        </Sequence>

        {/* 2. Suara Penegasan Tolakan (Ting!) di Frame 36 */}
        <Sequence from={36} durationInFrames={35}>
          <Audio src={sfxTing} volume={0.24} />
        </Sequence>

        {/* 3. Transisi Masuk Gelas Laboratorium di Frame 96 */}
        <Sequence from={96} durationInFrames={35}>
          <Audio src={sfxWhoosh} volume={0.32} />
        </Sequence>

        {/* 4. Menuang Sirup Kental di Frame 112 */}
        <Sequence from={112} durationInFrames={45}>
          <Audio src={sfxSlide} volume={0.26} />
          <Audio src={sfxDrop} volume={0.34} />
        </Sequence>

        {/* 5. Menuang Air Putih Pelan-Pelan di Frame 160 */}
        <Sequence from={160} durationInFrames={45}>
          <Audio src={sfxPop} volume={0.26} />
          <Audio src={sfxDrop} volume={0.3} />
        </Sequence>

        {/* 6. Terbentuknya Batas Pemisah Meniskus Emas di Frame 190 */}
        <Sequence from={190} durationInFrames={45}>
          <Audio src={sfxBling} volume={0.36} />
        </Sequence>

        {/* ===================================================================
            BACKGROUND AMBIENCE: PARTIKEL MIKROSKOPIS MELAYANG
           =================================================================== */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {Array.from({ length: 28 }).map((_, i) => {
            const bx = (i * 137) % 1080;
            const by = (i * 83 + frame * 0.4) % 1920;
            const size = 8 + (i % 6) * 6;
            const op = 0.08 + (i % 5) * 0.04;
            return (
              <div
                key={`amb-dot-${i}`}
                style={{
                  position: "absolute",
                  left: bx,
                  top: by,
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  backgroundColor: i % 2 === 0 ? "#38BDF8" : "#2DD4BF",
                  opacity: op,
                  filter: "blur(2px)",
                }}
              />
            );
          })}
        </div>

        {/* ===================================================================
            FASE 1: MOLEKUL AIR (H₂O) BERTABRAKAN DAN MEMBAL (0 - 98 FRAME)
           =================================================================== */}
        {moleculesOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: moleculesOpacity,
              transform: `scale(${microLensScale})`,
              transformOrigin: "center center",
              pointerEvents: "none",
            }}
          >
            {/* Header Lencana Mikroskopis Sains (Safe Zone: top 230) */}
            <div
              style={{
                position: "absolute",
                top: 230,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(10, 20, 45, 0.94)",
                backdropFilter: "blur(14px)",
                padding: "12px 30px",
                borderRadius: 24,
                border: "1.5px solid rgba(56, 189, 248, 0.5)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.65)",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: 14,
                zIndex: 20,
              }}
            >
              <span style={{ fontSize: 26 }}>🔬</span>
              <div>
                <div
                  style={{
                    color: "#38BDF8",
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    fontFamily: FONTS.title,
                  }}
                >
                  Tampilan Mikroskopis
                </div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontSize: 22,
                    fontWeight: 900,
                    marginTop: 2,
                    fontFamily: FONTS.title,
                  }}
                >
                  Tegangan Permukaan & Kepadatan
                </div>
              </div>
            </div>

            {/* Lingkaran Lensa Mikroskop (Circular Viewport Vignette) */}
            <div
              style={{
                position: "absolute",
                top: 860,
                left: 540,
                width: 920,
                height: 920,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                border: "2px solid rgba(56, 189, 248, 0.25)",
                boxShadow: "inset 0 0 90px rgba(6, 13, 30, 0.92), 0 0 60px rgba(56, 189, 248, 0.1)",
                pointerEvents: "none",
              }}
            />

            {/* Garis Pembatas Vertikal Halocline */}
            <svg
              viewBox="0 0 1080 1920"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <defs>
                <linearGradient id="barrierGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.1" />
                  <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.95" />
                  <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.1" />
                </linearGradient>

                <filter id="glowFilt" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Garis Pembatas Neon Emas (Halocline Boundary) */}
              <line
                x1="540"
                y1="380"
                x2="540"
                y2="1420"
                stroke="url(#barrierGlow)"
                strokeWidth="7"
                strokeDasharray="16 10"
                filter="url(#glowFilt)"
              />

              {/* Shockwave Cincin Pantulan di Frame 28-65 */}
              {shockwaveOpacity > 0 && (
                <ellipse
                  cx="540"
                  cy="860"
                  rx={95 * shockwaveScale}
                  ry={170 * shockwaveScale}
                  fill="none"
                  stroke="#FDE68A"
                  strokeWidth="6"
                  opacity={shockwaveOpacity}
                />
              )}
            </svg>

            {/* COMIC IMPACT SPARKS AT COLLISION (Frame 28 - 46) */}
            {isImpactSparks && (
              <div
                style={{
                  position: "absolute",
                  top: 860,
                  left: 540,
                  pointerEvents: "none",
                  zIndex: 22,
                }}
              >
                {/* Central collision flash */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) scale(${1 + impactSparkProgress * 1.5})`,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(254, 240, 138, 0.9) 0%, rgba(251, 191, 36, 0) 70%)",
                    opacity: 1 - impactSparkProgress,
                  }}
                />
                {/* Radiating comic particles */}
                {sparkParticles.map((sp, idx) => {
                  const rad = (sp.angle * Math.PI) / 180;
                  const curDist = sp.dist * impactSparkProgress;
                  const px = Math.cos(rad) * curDist;
                  const py = Math.sin(rad) * curDist;
                  const pOpacity = 1 - impactSparkProgress;
                  const pScale = interpolate(impactSparkProgress, [0, 0.4, 1], [0.5, 1.3, 0.7]);
                  return (
                    <div
                      key={`spark-${idx}`}
                      style={{
                        position: "absolute",
                        left: px,
                        top: py,
                        transform: `translate(-50%, -50%) scale(${pScale})`,
                        fontSize: sp.size,
                        opacity: pOpacity,
                        textShadow: "0 0 10px #FBBF24",
                      }}
                    >
                      {sp.char}
                    </div>
                  );
                })}
              </div>
            )}

            {/* SISI KIRI: KELOMPOK MOLEKUL ASIN (ATLANTIK - SALINITAS TINGGI) */}
            <div
              style={{
                position: "absolute",
                top: 860,
                left: leftClusterX,
                transform: `translate(-50%, -50%) scaleX(${impactSquash}) scaleY(${impactStretch})`,
                transformOrigin: "right center",
              }}
            >
              {/* Lencana Chip Pill Sisi Kiri (Prominent & Clear) */}
              <div
                style={{
                  position: "absolute",
                  top: -330,
                  left: -155,
                  backgroundColor: "rgba(23, 37, 84, 0.95)",
                  padding: "10px 24px",
                  borderRadius: 20,
                  border: "2px solid rgba(96, 165, 250, 0.8)",
                  color: "#93C5FD",
                  fontSize: 18,
                  fontWeight: 900,
                  fontFamily: FONTS.title,
                  whiteSpace: "nowrap",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.55), 0 0 18px rgba(59, 130, 246, 0.35)",
                }}
              >
                🌊 Air Asin Padat (Kaya Garam)
              </div>

              {/* Partikel Ion Garam (Na+ & Cl-) Bertekstur Tactile */}
              {saltIons.map((ion) => {
                const ionWobble = Math.sin(frame * 0.12 + ion.relX) * 8;
                return (
                  <div
                    key={`ion-${ion.id}`}
                    style={{
                      position: "absolute",
                      left: ion.relX,
                      top: ion.relY + ionWobble,
                      width: ion.r * 2,
                      height: ion.r * 2,
                      borderRadius: "50%",
                      background: `radial-gradient(circle at 35% 35%, #93C5FD 0%, ${ion.color} 50%, #1D4ED8 100%)`,
                      border: "2px solid #FFFFFF",
                      boxShadow: `0 0 16px ${ion.color}, 0 4px 10px rgba(0,0,0,0.5)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 900,
                      fontFamily: FONTS.title,
                    }}
                  >
                    {/* Specular shine */}
                    <div
                      style={{
                        position: "absolute",
                        top: 3,
                        left: 4,
                        width: ion.r * 0.6,
                        height: ion.r * 0.35,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.75)",
                        transform: "rotate(-30deg)",
                      }}
                    />
                    {ion.type}
                  </div>
                );
              })}

              {/* Molekul H2O Kiri (3D Glossy Spheres) */}
              {leftMolecules.map((m) => {
                const molWobble = Math.sin(frame * 0.09 + m.id) * 10;
                const molRot = m.rot + Math.sin(frame * 0.06 + m.id) * 8;
                return (
                  <div
                    key={`lmol-${m.id}`}
                    style={{
                      position: "absolute",
                      left: m.relX,
                      top: m.relY + molWobble,
                      transform: `rotate(${molRot}deg) scale(${m.scale})`,
                    }}
                  >
                    {/* Atom Oksigen Utama */}
                    <div
                      style={{
                        position: "relative",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 35%, #60A5FA 0%, #2563EB 55%, #1E3A8A 100%)",
                        boxShadow: "0 8px 22px rgba(29, 78, 216, 0.65), inset 0 -4px 8px rgba(0,0,0,0.4), inset 0 4px 8px rgba(255,255,255,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: 900,
                        fontFamily: FONTS.title,
                        border: "2px solid #93C5FD",
                      }}
                    >
                      {/* Specular shine highlight */}
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          left: 10,
                          width: 16,
                          height: 9,
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.75)",
                          transform: "rotate(-30deg)",
                        }}
                      />
                      O
                    </div>
                    {/* Atom Hidrogen 1 */}
                    <div
                      style={{
                        position: "absolute",
                        top: -15,
                        left: -9,
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 35%, #DBEAFE 0%, #93C5FD 55%, #3B82F6 100%)",
                        boxShadow: "0 4px 12px rgba(96, 165, 250, 0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1E3A8A",
                        fontSize: 12,
                        fontWeight: 900,
                        fontFamily: FONTS.title,
                        border: "1.5px solid #FFFFFF",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 3,
                          left: 5,
                          width: 8,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          transform: "rotate(-30deg)",
                        }}
                      />
                      H
                    </div>
                    {/* Atom Hidrogen 2 */}
                    <div
                      style={{
                        position: "absolute",
                        top: -15,
                        right: -9,
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 35%, #DBEAFE 0%, #93C5FD 55%, #3B82F6 100%)",
                        boxShadow: "0 4px 12px rgba(96, 165, 250, 0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1E3A8A",
                        fontSize: 12,
                        fontWeight: 900,
                        fontFamily: FONTS.title,
                        border: "1.5px solid #FFFFFF",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 3,
                          left: 5,
                          width: 8,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          transform: "rotate(-30deg)",
                        }}
                      />
                      H
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SISI KANAN: KELOMPOK MOLEKUL SEGAR (ALASKA - AIR LELEHAN ES) */}
            <div
              style={{
                position: "absolute",
                top: 860,
                left: rightClusterX,
                transform: `translate(-50%, -50%) scaleX(${impactSquash}) scaleY(${impactStretch})`,
                transformOrigin: "left center",
              }}
            >
              {/* Lencana Chip Pill Sisi Kanan (Prominent & Clear) */}
              <div
                style={{
                  position: "absolute",
                  top: -330,
                  left: -55,
                  backgroundColor: "rgba(19, 78, 74, 0.95)",
                  padding: "10px 24px",
                  borderRadius: 20,
                  border: "2px solid rgba(45, 212, 191, 0.8)",
                  color: "#99F6E4",
                  fontSize: 18,
                  fontWeight: 900,
                  fontFamily: FONTS.title,
                  whiteSpace: "nowrap",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.55), 0 0 18px rgba(20, 184, 166, 0.35)",
                }}
              >
                🧊 Air Lelehan Segar (Ringan)
              </div>

              {/* Molekul H2O Kanan (3D Glossy Teal Spheres) */}
              {rightMolecules.map((m) => {
                const molWobble = Math.sin(frame * 0.09 + m.id) * 10;
                const molRot = m.rot + Math.sin(frame * 0.06 + m.id) * 8;
                return (
                  <div
                    key={`rmol-${m.id}`}
                    style={{
                      position: "absolute",
                      left: m.relX,
                      top: m.relY + molWobble,
                      transform: `rotate(${molRot}deg) scale(${m.scale})`,
                    }}
                  >
                    {/* Atom Oksigen Utama */}
                    <div
                      style={{
                        position: "relative",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 35%, #2DD4BF 0%, #0D9488 55%, #042F2E 100%)",
                        boxShadow: "0 8px 22px rgba(15, 118, 110, 0.65), inset 0 -4px 8px rgba(0,0,0,0.4), inset 0 4px 8px rgba(255,255,255,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: 900,
                        fontFamily: FONTS.title,
                        border: "2px solid #5EEAD4",
                      }}
                    >
                      {/* Specular shine highlight */}
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          left: 10,
                          width: 16,
                          height: 9,
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.75)",
                          transform: "rotate(-30deg)",
                        }}
                      />
                      O
                    </div>
                    {/* Atom Hidrogen 1 */}
                    <div
                      style={{
                        position: "absolute",
                        top: -15,
                        left: -9,
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 35%, #CCFBF1 0%, #5EEAD4 55%, #14B8A6 100%)",
                        boxShadow: "0 4px 12px rgba(45, 212, 191, 0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#042F2E",
                        fontSize: 12,
                        fontWeight: 900,
                        fontFamily: FONTS.title,
                        border: "1.5px solid #FFFFFF",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 3,
                          left: 5,
                          width: 8,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          transform: "rotate(-30deg)",
                        }}
                      />
                      H
                    </div>
                    {/* Atom Hidrogen 2 */}
                    <div
                      style={{
                        position: "absolute",
                        top: -15,
                        right: -9,
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 35%, #CCFBF1 0%, #5EEAD4 55%, #14B8A6 100%)",
                        boxShadow: "0 4px 12px rgba(45, 212, 191, 0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#042F2E",
                        fontSize: 12,
                        fontWeight: 900,
                        fontFamily: FONTS.title,
                        border: "1.5px solid #FFFFFF",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 3,
                          left: 5,
                          width: 8,
                          height: 5,
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          transform: "rotate(-30deg)",
                        }}
                      />
                      H
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BADGE PANTULAN PLAYFUL: "TIDAK BISA LANGSUNG MELEBUR!" */}
            {frame >= 32 && (
              <div
                style={{
                  position: "absolute",
                  top: 860,
                  left: "50%",
                  transform: `translate(-50%, -50%) scale(${rejectBadgeSpring})`,
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  padding: "16px 34px",
                  borderRadius: 24,
                  border: "3px solid #FEF2F2",
                  boxShadow: "0 14px 40px rgba(220, 38, 38, 0.7)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  zIndex: 25,
                }}
              >
                <span style={{ fontSize: 34 }}>🛡️</span>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 900,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      fontFamily: FONTS.title,
                      color: "#FEE2E2",
                    }}
                  >
                    Tegangan Antarmuka
                  </div>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 900,
                      fontFamily: FONTS.title,
                      marginTop: 2,
                    }}
                  >
                    Menolak Melebur!
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            FASE 2: ANALOGI WADAH / GELAS KACA SIRUP VS AIR PUTIH (92 - 234 FRAME)
           =================================================================== */}
        {isSyrupPhase && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: syrupPhaseProgress,
            }}
          >
            {/* Header Analogi (Safe Zone: top 230) */}
            <div
              style={{
                position: "absolute",
                top: 230,
                left: "50%",
                transform: `translateX(-50%) scale(${beakerSpring})`,
                textAlign: "center",
                zIndex: 20,
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(249, 115, 22, 0.18)",
                  border: "1.5px solid #F97316",
                  padding: "6px 22px",
                  borderRadius: 16,
                  color: "#FB923C",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  fontFamily: FONTS.title,
                }}
              >
                🧪 Eksperimen Analogi
              </div>
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: 42,
                  fontWeight: 900,
                  margin: 0,
                  fontFamily: FONTS.title,
                  textShadow: "0 4px 20px rgba(0,0,0,0.7)",
                }}
              >
                Sirup Kental vs Air Putih
              </h2>
            </div>

            {/* ===============================================================
                GELAS LABORATORIUM / BEAKER KACA TACTILE
                Posisi: Top 480, Center X: 540, Width: 460, Height: 610
                Dasar Beaker = Y 1090
               =============================================================== */}
            <div
              style={{
                position: "absolute",
                top: 480,
                left: "50%",
                transform: `translateX(-50%) scale(${beakerSpring})`,
                width: 460,
                height: 610,
                border: "5px solid rgba(255, 255, 255, 0.55)",
                borderTop: "none",
                borderRadius: "0 0 52px 52px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                boxShadow:
                  "0 32px 85px rgba(0,0,0,0.85), inset 0 0 40px rgba(255,255,255,0.08)",
                overflow: "hidden",
                zIndex: 10,
              }}
            >
              {/* Spout mulut tuang kiri beaker */}
              <div
                style={{
                  position: "absolute",
                  left: -12,
                  top: 0,
                  width: 24,
                  height: 14,
                  borderTop: "5px solid rgba(255, 255, 255, 0.55)",
                  transform: "rotate(-25deg)",
                  borderRadius: "4px 0 0 0",
                }}
              />

              {/* Garis-Garis Ukuran Volume Beaker (Graduation Marks) */}
              {[100, 200, 300, 400, 500].map((val, idx) => (
                <div
                  key={`mark-${val}`}
                  style={{
                    position: "absolute",
                    left: 20,
                    bottom: 50 + idx * 105,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    zIndex: 15,
                  }}
                >
                  <div style={{ width: 28, height: 2.5, backgroundColor: "rgba(255, 255, 255, 0.45)" }} />
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: 13,
                      fontWeight: 800,
                      fontFamily: "monospace",
                    }}
                  >
                    {val}ml
                  </span>
                </div>
              ))}

              {/* Pantulan Kilau Kaca Vertikal (Glass Highlights) */}
              <div
                style={{
                  position: "absolute",
                  left: 28,
                  top: 20,
                  width: 14,
                  height: 580,
                  backgroundColor: "rgba(255, 255, 255, 0.18)",
                  borderRadius: 8,
                  zIndex: 16,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 28,
                  top: 20,
                  width: 8,
                  height: 580,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 4,
                  zIndex: 16,
                }}
              />

              {/* -------------------------------------------------------------
                  1. LAPISAN SIRUP KENTAL DI BAGIAN BAWAH
                 ------------------------------------------------------------- */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: syrupHeight,
                  background: "linear-gradient(180deg, #EA580C 0%, #C2410C 50%, #7C2D12 100%)",
                  boxShadow: "0 -4px 20px rgba(234, 88, 12, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Gelembung Kental Bergerak Lambat di Dalam Sirup */}
                {syrupHeight > 60 &&
                  [1, 2, 3, 4].map((gb) => {
                    const gy = (gb * 65 + frame * 0.3) % Math.max(10, syrupHeight);
                    const gx = 100 + gb * 65;
                    return (
                      <div
                        key={`s-bubble-${gb}`}
                        style={{
                          position: "absolute",
                          left: gx,
                          bottom: gy,
                          width: 8 + gb * 3,
                          height: 8 + gb * 3,
                          borderRadius: "50%",
                          backgroundColor: "rgba(254, 215, 170, 0.45)",
                          boxShadow: "0 0 6px rgba(254, 215, 170, 0.3)",
                        }}
                      />
                    );
                  })}

                {/* Teks Label Sirup (Large Prominent Chip Pill) */}
                {syrupHeight > 90 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#FFFFFF",
                      zIndex: 10,
                      backgroundColor: "rgba(10, 15, 30, 0.8)",
                      border: "2px solid rgba(251, 146, 60, 0.75)",
                      padding: "12px 24px",
                      borderRadius: 20,
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
                      maxWidth: "88%",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 23,
                        letterSpacing: "1px",
                        fontFamily: FONTS.title,
                        color: "#FED7AA",
                      }}
                    >
                      🍯 SIRUP KENTAL
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "#FFFFFF",
                        fontWeight: 800,
                        marginTop: 4,
                        fontFamily: FONTS.body,
                      }}
                    >
                      Kepadatan Tinggi • Mengendap di Dasar
                    </div>
                  </div>
                )}
              </div>

              {/* -------------------------------------------------------------
                  2. GARIS PEMBATAS MENISKUS EMAS (Tegangan Permukaan)
                 ------------------------------------------------------------- */}
              {syrupHeight > 40 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: syrupHeight - 4,
                    left: 0,
                    width: "100%",
                    height: 8,
                    backgroundColor: "#FBBF24",
                    boxShadow: `0 0 ${20 * meniscusShimmer}px rgba(251, 191, 36, ${meniscusGlow * 0.95})`,
                    zIndex: 12,
                    opacity: meniscusGlow,
                  }}
                />
              )}

              {/* -------------------------------------------------------------
                  3. LAPISAN AIR PUTIH DI BAGIAN ATAS
                 ------------------------------------------------------------- */}
              <div
                style={{
                  position: "absolute",
                  bottom: syrupHeight,
                  left: 0,
                  width: "100%",
                  height: waterHeight,
                  background:
                    "linear-gradient(180deg, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.75) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Gelembung Udara Segar di Dalam Air */}
                {waterHeight > 60 &&
                  [1, 2, 3, 4, 5].map((wb) => {
                    const wy = (wb * 50 + frame * 0.8) % Math.max(10, waterHeight);
                    const wx = 80 + wb * 60;
                    return (
                      <div
                        key={`w-bubble-${wb}`}
                        style={{
                          position: "absolute",
                          left: wx,
                          bottom: wy,
                          width: 6 + wb * 2,
                          height: 6 + wb * 2,
                          borderRadius: "50%",
                          backgroundColor: "rgba(255, 255, 255, 0.65)",
                        }}
                      />
                    );
                  })}

                {/* Teks Label Air Putih (Large Prominent Chip Pill) */}
                {waterHeight > 90 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#FFFFFF",
                      zIndex: 10,
                      backgroundColor: "rgba(10, 15, 30, 0.8)",
                      border: "2px solid rgba(56, 189, 248, 0.75)",
                      padding: "12px 24px",
                      borderRadius: 20,
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
                      maxWidth: "88%",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 23,
                        letterSpacing: "1px",
                        fontFamily: FONTS.title,
                        color: "#BAE6FD",
                      }}
                    >
                      💧 AIR PUTIH
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "#FFFFFF",
                        fontWeight: 800,
                        marginTop: 4,
                        fontFamily: FONTS.body,
                      }}
                    >
                      Massa Jenis Ringan • Mengapung Rapi
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ===============================================================
                VECTOR SVG UNTUK BOTOL MENUANG & DYNAMIC TAPERED STREAMS
                - Mulut Sirup berpusat di (720, 460)
                - Mulut Air berpusat di (360, 460)
                - Stream melengkung tepat menyentuh permukaan cairan yang naik
               =============================================================== */}
            <svg
              viewBox="0 0 1080 1920"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 35,
              }}
            >
              <defs>
                <linearGradient id="syrupSvgGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
                <linearGradient id="waterSvgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7DD3FC" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>

                <linearGradient id="syrupBottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#9A3412" />
                </linearGradient>
                <linearGradient id="waterBottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>

              {/* DYNAMIC STREAM SIRUP: Dari (720, 460) ke (570, currentSyrupSurfaceY) */}
              {isSyrupStreaming && (
                <g>
                  {/* Outer fluid body */}
                  <path
                    d={`M 720 460 Q 670 ${460 + (currentSyrupSurfaceY - 460) * 0.45} 570 ${currentSyrupSurfaceY}`}
                    fill="none"
                    stroke="url(#syrupSvgGrad)"
                    strokeWidth="13"
                    strokeLinecap="round"
                  />
                  {/* Inner golden gleam */}
                  <path
                    d={`M 720 460 Q 670 ${460 + (currentSyrupSurfaceY - 460) * 0.45} 570 ${currentSyrupSurfaceY}`}
                    fill="none"
                    stroke="#FED7AA"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  {/* Impact ripple on liquid surface */}
                  <ellipse
                    cx="570"
                    cy={currentSyrupSurfaceY}
                    rx={20 + Math.sin(frame * 0.5) * 4}
                    ry={7 + Math.sin(frame * 0.5) * 2}
                    fill="#EA580C"
                    opacity="0.85"
                  />
                  {/* Tiny splash droplets */}
                  <circle
                    cx={558 + Math.sin(frame * 0.8) * 12}
                    cy={currentSyrupSurfaceY - 14 - Math.abs(Math.sin(frame * 0.9)) * 10}
                    r={3}
                    fill="#FDBA74"
                  />
                  <circle
                    cx={582 + Math.cos(frame * 0.7) * 10}
                    cy={currentSyrupSurfaceY - 10 - Math.abs(Math.cos(frame * 0.8)) * 8}
                    r={2.5}
                    fill="#FED7AA"
                  />
                </g>
              )}

              {/* DYNAMIC STREAM AIR PUTIH: Dari (360, 460) ke (510, currentWaterSurfaceY) */}
              {isWaterStreaming && (
                <g>
                  {/* Outer fluid body */}
                  <path
                    d={`M 360 460 Q 410 ${460 + (currentWaterSurfaceY - 460) * 0.45} 510 ${currentWaterSurfaceY}`}
                    fill="none"
                    stroke="url(#waterSvgGrad)"
                    strokeWidth="11"
                    strokeLinecap="round"
                  />
                  {/* Inner white gleam */}
                  <path
                    d={`M 360 460 Q 410 ${460 + (currentWaterSurfaceY - 460) * 0.45} 510 ${currentWaterSurfaceY}`}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    opacity="0.95"
                  />
                  {/* Impact ripple on liquid surface */}
                  <ellipse
                    cx="510"
                    cy={currentWaterSurfaceY}
                    rx={18 + Math.sin(frame * 0.5) * 3}
                    ry={6 + Math.sin(frame * 0.5) * 1.5}
                    fill="#38BDF8"
                    opacity="0.85"
                  />
                  {/* Tiny splash droplets */}
                  <circle
                    cx={522 + Math.sin(frame * 0.8) * 10}
                    cy={currentWaterSurfaceY - 12 - Math.abs(Math.sin(frame * 0.9)) * 8}
                    r={2.5}
                    fill="#BAE6FD"
                  />
                  <circle
                    cx={498 + Math.cos(frame * 0.7) * 8}
                    cy={currentWaterSurfaceY - 8 - Math.abs(Math.cos(frame * 0.8)) * 6}
                    r={2}
                    fill="#FFFFFF"
                  />
                </g>
              )}

              {/* BOTOL SIRUP KLASIK (Anchored at mouth: 720, 460) */}
              {syrupBottleOpacity > 0 && (
                <g
                  transform={`translate(720, 460) rotate(${syrupBottleTilt})`}
                  opacity={syrupBottleOpacity}
                >
                  {/* Bottle body (extends backward in negative Y) */}
                  <rect
                    x="-38"
                    y="-155"
                    width="76"
                    height="105"
                    rx="16"
                    fill="url(#syrupBottleGrad)"
                    stroke="#FDBA74"
                    strokeWidth="3"
                  />
                  {/* Shoulders */}
                  <path
                    d="M -38 -50 Q -12 -50 -12 -20 L 12 -20 Q 12 -50 38 -50 Z"
                    fill="url(#syrupBottleGrad)"
                    stroke="#FDBA74"
                    strokeWidth="3"
                  />
                  {/* Neck */}
                  <rect
                    x="-12"
                    y="-20"
                    width="24"
                    height="20"
                    fill="rgba(255, 255, 255, 0.25)"
                    stroke="#FDBA74"
                    strokeWidth="3"
                  />
                  {/* Spout Lip at Origin (0, 0) */}
                  <rect
                    x="-16"
                    y="-4"
                    width="32"
                    height="8"
                    rx="3"
                    fill="#FDBA74"
                  />
                  {/* Glass Specular Reflection Highlight */}
                  <line
                    x1="-28"
                    y1="-145"
                    x2="-28"
                    y2="-60"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Label "SIRUP" */}
                  <text
                    x="0"
                    y="-100"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="15"
                    fontWeight="900"
                    fontFamily={FONTS.title}
                    letterSpacing="1.5px"
                  >
                    SIRUP
                  </text>
                </g>
              )}

              {/* BOTOL AIR LAB CARAFE (Anchored at mouth: 360, 460) */}
              {waterBottleOpacity > 0 && (
                <g
                  transform={`translate(360, 460) rotate(${waterBottleTilt})`}
                  opacity={waterBottleOpacity}
                >
                  {/* Bottle body (extends backward in negative Y) */}
                  <rect
                    x="-38"
                    y="-155"
                    width="76"
                    height="105"
                    rx="16"
                    fill="url(#waterBottleGrad)"
                    stroke="#BAE6FD"
                    strokeWidth="3"
                  />
                  {/* Shoulders */}
                  <path
                    d="M -38 -50 Q -12 -50 -12 -20 L 12 -20 Q 12 -50 38 -50 Z"
                    fill="url(#waterBottleGrad)"
                    stroke="#BAE6FD"
                    strokeWidth="3"
                  />
                  {/* Neck */}
                  <rect
                    x="-12"
                    y="-20"
                    width="24"
                    height="20"
                    fill="rgba(255, 255, 255, 0.25)"
                    stroke="#BAE6FD"
                    strokeWidth="3"
                  />
                  {/* Spout Lip at Origin (0, 0) */}
                  <rect
                    x="-16"
                    y="-4"
                    width="32"
                    height="8"
                    rx="3"
                    fill="#BAE6FD"
                  />
                  {/* Glass Specular Reflection Highlight */}
                  <line
                    x1="28"
                    y1="-145"
                    x2="28"
                    y2="-60"
                    stroke="rgba(255, 255, 255, 0.5)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Label "AIR" */}
                  <text
                    x="0"
                    y="-100"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="15"
                    fontWeight="900"
                    fontFamily={FONTS.title}
                    letterSpacing="1.5px"
                  >
                    AIR
                  </text>
                </g>
              )}
            </svg>

            {/* ===============================================================
                CARD TAKEAWAY KESIMPULAN DI BAWAH GELAS
                Posisi: Top 1125, Center X: 540
               =============================================================== */}
            <div
              style={{
                position: "absolute",
                top: 1125,
                left: "50%",
                transform: `translateX(-50%) scale(${takeawaySpring})`,
                backgroundColor: "rgba(10, 20, 45, 0.94)",
                backdropFilter: "blur(14px)",
                padding: "16px 36px",
                borderRadius: 24,
                border: "2px solid rgba(251, 191, 36, 0.7)",
                boxShadow: "0 14px 40px rgba(0, 0, 0, 0.75), 0 0 20px rgba(251, 191, 36, 0.2)",
                textAlign: "center",
                zIndex: 20,
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  color: "#FBBF24",
                  fontWeight: 900,
                  fontSize: 23,
                  fontFamily: FONTS.title,
                }}
              >
                ✨ Perbedaan Densitas Mencegah Peleburan
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 700,
                  marginTop: 6,
                  fontFamily: FONTS.body,
                }}
              >
                Sama persis seperti dua massa air laut di alam bebas!
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            SUBTITLE CONTRAST VIGNETTE PROTECTOR
           =================================================================== */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 380,
            background:
              "linear-gradient(to top, rgba(2, 7, 20, 0.94) 0%, rgba(2, 7, 20, 0.55) 60%, rgba(2, 7, 20, 0) 100%)",
            pointerEvents: "none",
            zIndex: 18,
          }}
        />
      </AbsoluteFill>
    </CameraRig>
  );
};
