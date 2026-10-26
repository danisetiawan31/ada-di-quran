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
  // - Fase 1 (Frame 0 - 100): Molekul Air H₂O bertabrakan & memantul elastis
  // - Fase 2 (Frame 95 - 234): Analogi Gelas Kimia Sirup Kental vs Air Putih
  // =========================================================================
  const syrupPhaseProgress = interpolate(frame, [92, 112], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const moleculesOpacity = 1 - syrupPhaseProgress;
  const isSyrupPhase = frame >= 90;

  // Kamera dinamika: sedikit punch-in saat tabrakan molekul
  const cameraZoom = interpolate(frame, [0, 32, 70, 95, 120, 234], [1.0, 1.04, 1.02, 1.0, 1.02, 1.0], {
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 1. FASE MOLEKUL (Frame 0 - 100)
  // =========================================================================
  // Animasi tabrakan dan pantulan elastis (Boing recoil!)
  const collisionCycle = interpolate(
    frame,
    [0, 28, 36, 50, 75, 100],
    [0, 1, 0.95, 0.1, 0.35, 0.25],
    { extrapolateRight: "clamp" }
  );

  // Posisi X molekul kiri & kanan
  const leftClusterX = interpolate(collisionCycle, [0, 1], [220, 460]);
  const rightClusterX = interpolate(collisionCycle, [0, 1], [860, 620]);

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

  // Badge Penjelasan "MENOLAK BERCAMPUR!"
  const rejectBadgeSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Array molekul air & ion garam (Na+, Cl-) di kiri (Asin & Padat)
  const leftMolecules = useMemo(() => {
    return [
      { id: 1, relX: -40, relY: -200, rot: -15, scale: 1.05 },
      { id: 2, relX: 30, relY: -90, rot: 25, scale: 0.95 },
      { id: 3, relX: -60, relY: 10, rot: -8, scale: 1.1 },
      { id: 4, relX: 20, relY: 120, rot: 30, scale: 1.0 },
      { id: 5, relX: -30, relY: 230, rot: -20, scale: 1.02 },
    ];
  }, []);

  const saltIons = useMemo(() => {
    return [
      { id: "na1", relX: -110, relY: -150, type: "Na⁺", color: "#60A5FA", r: 18 },
      { id: "cl1", relX: 70, relY: -35, type: "Cl⁻", color: "#38BDF8", r: 24 },
      { id: "na2", relX: -100, relY: 70, type: "Na⁺", color: "#60A5FA", r: 18 },
      { id: "cl2", relX: 60, relY: 185, type: "Cl⁻", color: "#38BDF8", r: 24 },
      { id: "na3", relX: -90, relY: 280, type: "Na⁺", color: "#60A5FA", r: 18 },
    ];
  }, []);

  // Array molekul air murni di kanan (Segar & Ringan)
  const rightMolecules = useMemo(() => {
    return [
      { id: 6, relX: 40, relY: -190, rot: 15, scale: 1.0 },
      { id: 7, relX: -30, relY: -80, rot: -22, scale: 1.08 },
      { id: 8, relX: 50, relY: 20, rot: 18, scale: 0.98 },
      { id: 9, relX: -20, relY: 130, rot: -15, scale: 1.05 },
      { id: 10, relX: 40, relY: 240, rot: 22, scale: 1.0 },
    ];
  }, []);

  // =========================================================================
  // 2. FASE GELAS KIMIA & ANALOGI SIRUP (Frame 95 - 234)
  // =========================================================================
  // Kemunculan gelas dengan spring bounce
  const beakerSpring = spring({
    frame: frame - 98,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Animasi penuangan sirup kental (Frame 110 - 155)
  const syrupPourProgress = interpolate(frame, [110, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const syrupHeight = syrupPourProgress * 230;

  // Animasi penuangan air putih perlahan di atas sirup (Frame 158 - 200)
  const waterPourProgress = interpolate(frame, [158, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waterHeight = waterPourProgress * 230;

  // Botol Sirup (Kanan Atas)
  const syrupBottleOpacity = interpolate(frame, [106, 114, 150, 158], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const syrupBottleTilt = interpolate(frame, [108, 120, 150, 158], [0, -32, -32, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Botol Air (Kiri Atas)
  const waterBottleOpacity = interpolate(frame, [154, 162, 196, 204], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waterBottleTilt = interpolate(frame, [156, 168, 196, 204], [0, 32, 32, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Lapisan meniskus pembatas emas berkilau (Frame 168+)
  const meniscusGlow = interpolate(frame, [168, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          <Audio src={sfxBoing} volume={0.36} />
        </Sequence>

        {/* 2. Suara Penegasan Tolakan (Ting!) di Frame 36 */}
        <Sequence from={36} durationInFrames={35}>
          <Audio src={sfxTing} volume={0.22} />
        </Sequence>

        {/* 3. Transisi Masuk Gelas Laboratorium di Frame 96 */}
        <Sequence from={96} durationInFrames={35}>
          <Audio src={sfxWhoosh} volume={0.3} />
        </Sequence>

        {/* 4. Menuang Sirup Kental di Frame 112 */}
        <Sequence from={112} durationInFrames={45}>
          <Audio src={sfxSlide} volume={0.25} />
          <Audio src={sfxDrop} volume={0.32} />
        </Sequence>

        {/* 5. Menuang Air Putih Pelan-Pelan di Frame 160 */}
        <Sequence from={160} durationInFrames={45}>
          <Audio src={sfxPop} volume={0.25} />
          <Audio src={sfxDrop} volume={0.28} />
        </Sequence>

        {/* 6. Terbentuknya Batas Pemisah Meniskus Emas di Frame 190 */}
        <Sequence from={190} durationInFrames={45}>
          <Audio src={sfxBling} volume={0.35} />
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
            FASE 1: MOLEKUL AIR (H₂O) BERTABRAKAN DAN MEMBAL (0 - 100 FRAME)
           =================================================================== */}
        {moleculesOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: moleculesOpacity,
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
                backgroundColor: "rgba(10, 20, 45, 0.92)",
                backdropFilter: "blur(14px)",
                padding: "12px 28px",
                borderRadius: 24,
                border: "1.5px solid rgba(56, 189, 248, 0.45)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: 12,
                zIndex: 20,
              }}
            >
              <span style={{ fontSize: 24 }}>🔬</span>
              <div>
                <div
                  style={{
                    color: "#38BDF8",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  Tampilan Mikroskopis
                </div>
                <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 900, marginTop: 2 }}>
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
                width: 900,
                height: 900,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                border: "2px solid rgba(56, 189, 248, 0.2)",
                boxShadow: "inset 0 0 80px rgba(6, 13, 30, 0.9), 0 0 50px rgba(56, 189, 248, 0.08)",
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
                  <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.95" />
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

              {/* Garis Pembatas Neon Emas */}
              <line
                x1="540"
                y1="380"
                x2="540"
                y2="1420"
                stroke="url(#barrierGlow)"
                strokeWidth="6"
                strokeDasharray="14 10"
                filter="url(#glowFilt)"
              />

              {/* Shockwave Cincin Pantulan di Frame 28-65 */}
              {shockwaveOpacity > 0 && (
                <ellipse
                  cx="540"
                  cy="860"
                  rx={90 * shockwaveScale}
                  ry={160 * shockwaveScale}
                  fill="none"
                  stroke="#FDE68A"
                  strokeWidth="5"
                  opacity={shockwaveOpacity}
                />
              )}
            </svg>

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
              {/* Lencana Sisi Kiri */}
              <div
                style={{
                  position: "absolute",
                  top: -350,
                  left: -120,
                  backgroundColor: "rgba(30, 58, 138, 0.88)",
                  padding: "8px 18px",
                  borderRadius: 16,
                  border: "1px solid rgba(96, 165, 250, 0.5)",
                  color: "#93C5FD",
                  fontSize: 14,
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                🌊 Air Asin Padat (Kaya Garam)
              </div>

              {/* Partikel Ion Garam (Na+ & Cl-) */}
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
                      backgroundColor: ion.color,
                      border: "2px solid #FFFFFF",
                      boxShadow: `0 0 14px ${ion.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: 11,
                      fontWeight: 900,
                    }}
                  >
                    {ion.type}
                  </div>
                );
              })}

              {/* Molekul H2O Kiri */}
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
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 35%, #3B82F6 0%, #1D4ED8 100%)",
                        boxShadow: "0 6px 18px rgba(29, 78, 216, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: 15,
                        fontWeight: 900,
                        border: "2px solid #93C5FD",
                      }}
                    >
                      O
                    </div>
                    {/* Atom Hidrogen 1 */}
                    <div
                      style={{
                        position: "absolute",
                        top: -14,
                        left: -8,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 30% 30%, #BFDBFE 0%, #60A5FA 100%)",
                        boxShadow: "0 3px 10px rgba(96, 165, 250, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1E3A8A",
                        fontSize: 11,
                        fontWeight: 900,
                        border: "1.5px solid #FFFFFF",
                      }}
                    >
                      H
                    </div>
                    {/* Atom Hidrogen 2 */}
                    <div
                      style={{
                        position: "absolute",
                        top: -14,
                        right: -8,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 30% 30%, #BFDBFE 0%, #60A5FA 100%)",
                        boxShadow: "0 3px 10px rgba(96, 165, 250, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#1E3A8A",
                        fontSize: 11,
                        fontWeight: 900,
                        border: "1.5px solid #FFFFFF",
                      }}
                    >
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
              {/* Lencana Sisi Kanan */}
              <div
                style={{
                  position: "absolute",
                  top: -350,
                  left: -30,
                  backgroundColor: "rgba(15, 118, 110, 0.88)",
                  padding: "8px 18px",
                  borderRadius: 16,
                  border: "1px solid rgba(45, 212, 191, 0.5)",
                  color: "#99F6E4",
                  fontSize: 14,
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                🧊 Air Lelehan Segar (Ringan)
              </div>

              {/* Molekul H2O Kanan */}
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
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 35%, #14B8A6 0%, #0F766E 100%)",
                        boxShadow: "0 6px 18px rgba(15, 118, 110, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: 15,
                        fontWeight: 900,
                        border: "2px solid #5EEAD4",
                      }}
                    >
                      O
                    </div>
                    {/* Atom Hidrogen 1 */}
                    <div
                      style={{
                        position: "absolute",
                        top: -14,
                        left: -8,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 30% 30%, #CCFBF1 0%, #5EEAD4 100%)",
                        boxShadow: "0 3px 10px rgba(45, 212, 191, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#042F2E",
                        fontSize: 11,
                        fontWeight: 900,
                        border: "1.5px solid #FFFFFF",
                      }}
                    >
                      H
                    </div>
                    {/* Atom Hidrogen 2 */}
                    <div
                      style={{
                        position: "absolute",
                        top: -14,
                        right: -8,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 30% 30%, #CCFBF1 0%, #5EEAD4 100%)",
                        boxShadow: "0 3px 10px rgba(45, 212, 191, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#042F2E",
                        fontSize: 11,
                        fontWeight: 900,
                        border: "1.5px solid #FFFFFF",
                      }}
                    >
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
                  padding: "14px 28px",
                  borderRadius: 22,
                  border: "3px solid #FEF2F2",
                  boxShadow: "0 12px 35px rgba(220, 38, 38, 0.65)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  zIndex: 25,
                }}
              >
                <span style={{ fontSize: 28 }}>🛡️</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase" }}>
                    Tegangan Antarmuka
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>
                    Menolak Melebur!
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            FASE 2: ANALOGI WADAH / GELAS KACA SIRUP VS AIR PUTIH (95 - 234 FRAME)
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
                  padding: "6px 20px",
                  borderRadius: 16,
                  color: "#FB923C",
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                🧪 Eksperimen Analogi
              </div>
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: 40,
                  fontWeight: 900,
                  margin: 0,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  textShadow: "0 4px 18px rgba(0,0,0,0.6)",
                }}
              >
                Sirup Kental vs Air Putih
              </h2>
            </div>

            {/* ===============================================================
                BOTOL MENUANG: SIRUP (Kanan Luar) & AIR (Kiri Luar)
                Ditempatkan di sisi luar agar tidak menutupi teks judul
               =============================================================== */}
            {/* Botol Sirup Menuang (Frame 106 - 158) */}
            {syrupBottleOpacity > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 430,
                  left: 810,
                  opacity: syrupBottleOpacity,
                  zIndex: 35,
                  pointerEvents: "none",
                }}
              >
                {/* Botol yang miring ke arah mulut gelas */}
                <div
                  style={{
                    position: "absolute",
                    top: -70,
                    left: 0,
                    transform: `rotate(${syrupBottleTilt}deg)`,
                    transformOrigin: "bottom left",
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 100,
                      borderRadius: "14px 14px 6px 6px",
                      background: "linear-gradient(135deg, #EA580C 0%, #9A3412 100%)",
                      border: "3px solid #FDBA74",
                      boxShadow: "0 8px 25px rgba(234, 88, 12, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 900,
                    }}
                  >
                    SIRUP
                  </div>
                </div>

                {/* Aliran Cairan Sirup Vertikal yang Masuk ke Gelas */}
                <div
                  style={{
                    position: "absolute",
                    top: 15,
                    left: -80,
                    width: 8,
                    height: 250,
                    backgroundColor: "#EA580C",
                    borderRadius: 4,
                    boxShadow: "0 0 12px #EA580C",
                  }}
                />
              </div>
            )}

            {/* Botol Air Menuang (Frame 154 - 204) */}
            {waterBottleOpacity > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 430,
                  left: 210,
                  opacity: waterBottleOpacity,
                  zIndex: 35,
                  pointerEvents: "none",
                }}
              >
                {/* Botol yang miring ke arah mulut gelas */}
                <div
                  style={{
                    position: "absolute",
                    top: -70,
                    left: 0,
                    transform: `rotate(${waterBottleTilt}deg)`,
                    transformOrigin: "bottom right",
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 100,
                      borderRadius: "14px 14px 6px 6px",
                      background: "linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)",
                      border: "3px solid #BAE6FD",
                      boxShadow: "0 8px 25px rgba(56, 189, 248, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 900,
                    }}
                  >
                    AIR
                  </div>
                </div>

                {/* Aliran Cairan Air Vertikal yang Masuk ke Gelas */}
                <div
                  style={{
                    position: "absolute",
                    top: 15,
                    left: 140,
                    width: 6,
                    height: 190,
                    backgroundColor: "#38BDF8",
                    borderRadius: 4,
                    boxShadow: "0 0 12px #38BDF8",
                  }}
                />
              </div>
            )}

            {/* ===============================================================
                GELAS LABORATORIUM / BEAKER KACA TACTILE
                Posisi: Top 480, Center X: 540
               =============================================================== */}
            <div
              style={{
                position: "absolute",
                top: 480,
                left: "50%",
                transform: `translateX(-50%) scale(${beakerSpring})`,
                width: 440,
                height: 610,
                border: "5px solid rgba(255, 255, 255, 0.5)",
                borderTop: "none",
                borderRadius: "0 0 48px 48px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.85), inset 0 0 35px rgba(255,255,255,0.06)",
                overflow: "hidden",
                zIndex: 10,
              }}
            >
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
                  <div style={{ width: 28, height: 2, backgroundColor: "rgba(255, 255, 255, 0.4)" }} />
                  <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>
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
                          backgroundColor: "rgba(254, 215, 170, 0.4)",
                          boxShadow: "0 0 6px rgba(254, 215, 170, 0.3)",
                        }}
                      />
                    );
                  })}

                {/* Teks Label Sirup */}
                {syrupHeight > 90 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#FFFFFF",
                      zIndex: 10,
                      backgroundColor: "rgba(0,0,0,0.4)",
                      padding: "8px 20px",
                      borderRadius: 16,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <div style={{ fontWeight: 900, fontSize: 19, letterSpacing: "1px" }}>
                      🍯 SIRUP KENTAL
                    </div>
                    <div style={{ fontSize: 12, color: "#FED7AA", fontWeight: 700, marginTop: 2 }}>
                      Kepadatan Tinggi (Tenggelam di Dasar)
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
                    boxShadow: `0 0 18px rgba(251, 191, 36, ${meniscusGlow * 0.95})`,
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
                    "linear-gradient(180deg, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.65) 100%)",
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
                          backgroundColor: "rgba(255, 255, 255, 0.6)",
                        }}
                      />
                    );
                  })}

                {/* Teks Label Air Putih */}
                {waterHeight > 90 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#FFFFFF",
                      zIndex: 10,
                      backgroundColor: "rgba(0,0,0,0.4)",
                      padding: "8px 20px",
                      borderRadius: 16,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <div style={{ fontWeight: 900, fontSize: 19, letterSpacing: "1px" }}>
                      💧 AIR PUTIH
                    </div>
                    <div style={{ fontSize: 12, color: "#BAE6FD", fontWeight: 700, marginTop: 2 }}>
                      Massa Jenis Ringan (Mengapung Rapi)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ===============================================================
                CARD TAKEAWAY KESIMPULAN DI BAWAH GELAS
                Posisi: Top 1120, Center X: 540
               =============================================================== */}
            <div
              style={{
                position: "absolute",
                top: 1110,
                left: "50%",
                transform: `translateX(-50%) scale(${takeawaySpring})`,
                backgroundColor: "rgba(10, 20, 45, 0.92)",
                backdropFilter: "blur(14px)",
                padding: "14px 30px",
                borderRadius: 22,
                border: "1.5px solid rgba(251, 191, 36, 0.55)",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.65)",
                textAlign: "center",
                zIndex: 20,
                whiteSpace: "nowrap",
              }}
            >
              <div style={{ color: "#FBBF24", fontWeight: 900, fontSize: 19 }}>
                ✨ Perbedaan Densitas Mencegah Peleburan
              </div>
              <div style={{ color: "rgba(255, 255, 255, 0.82)", fontSize: 13, fontWeight: 600, marginTop: 4 }}>
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
