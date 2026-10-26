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
import sfxWhooshIn from "../../../public/sfx/whoosh2.mp3";
import sfxPopBadge1 from "../../../public/sfx/pop.wav";
import sfxPopBadge2 from "../../../public/sfx/btn_pop.wav";
import sfxCuriosity from "../../../public/sfx/question2.wav";
import sfxGlassSlide from "../../../public/sfx/slide1.mp3";
import sfxGlassTing from "../../../public/sfx/ting.wav";
import sfxGlassShatter from "../../../public/sfx/punch_snap.mp3";
import sfxExplosion from "../../../public/sfx/explosion.wav";

export const Scene1TopDown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // 1. KAMERA DINAMIS: Punch-In pada "Kok Bisa?" & Micro-Shake pada Kaca Pecah
  // =========================================================================
  // Frame 0-84: Zoom perlahan masuk
  // Frame 84-115: Punch-in dramatis saat narator bertanya "Kok bisa?"
  // Frame 238-255: Micro-shake saat kaca dipecahkan
  const baseZoom = interpolate(
    frame,
    [0, 84, 110, 186, 238, 294],
    [1.0, 1.07, 1.18, 1.14, 1.15, 1.16],
    { extrapolateRight: "clamp" }
  );

  // Micro-shake saat kaca pecah di frame 238 - 258
  const shakeIntensity = interpolate(frame, [238, 243, 258], [0, 8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraShakeX = Math.sin(frame * 2.8) * shakeIntensity;
  const cameraShakeY = Math.cos(frame * 3.2) * shakeIntensity * 0.7;

  // =========================================================================
  // 2. GELOMBANG PERTEMUAN DUA LAUTAN (Bezier Organik Fluid Physics)
  // =========================================================================
  const wavePoints = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const height = 1920;
    const steps = 24; // Resolusi lebih mulus
    for (let i = 0; i <= steps; i++) {
      const y = (height / steps) * i;
      // Kombinasi sinewaves multi-frekuensi untuk fluida alami saling dorong
      const w1 = Math.sin(frame * 0.045 + i * 0.38) * 38;
      const w2 = Math.cos(frame * 0.022 + i * 0.22) * 22;
      const w3 = Math.sin(frame * 0.08 + i * 0.65) * 12;
      const x = 540 + w1 + w2 + w3;
      points.push({ x, y });
    }
    return points;
  }, [frame]);

  const waveSvgPath = useMemo(() => {
    return wavePoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");
  }, [wavePoints]);

  // =========================================================================
  // 3. PARTIKEL BUIH AKTIF DENGAN EFEK POPPING & TURBULENSI
  // =========================================================================
  const foamParticles = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      const seedY = (i * 127.3) % 1920;
      const speed = 0.6 + (i % 6) * 0.25;
      const currentY = (seedY + frame * speed) % 1920;
      const yRatio = currentY / 1920;
      const pointIdx = Math.min(24, Math.floor(yRatio * 24));
      const targetPoint = wavePoints[pointIdx] || { x: 540 };

      // Getaran turbulensi mikro di garis batas
      const eddyX = Math.sin(frame * 0.07 + i) * 28 + Math.cos(frame * 0.12 + i * 2) * 12;
      const currentX = targetPoint.x + eddyX;

      // Animasi kembang-kempis/popping buih
      const popCycle = (frame * 0.06 + i * 0.8) % (Math.PI * 2);
      const sizePulse = 1 + Math.sin(popCycle) * 0.45;
      const baseSize = 6 + (i % 6) * 4.5;
      const currentSize = baseSize * sizePulse;

      const opacity = 0.35 + Math.abs(Math.sin(frame * 0.04 + i)) * 0.55;
      return { id: i, x: currentX, y: currentY, size: currentSize, opacity };
    });
  }, [frame, wavePoints]);

  // Riak air laut kiri (Biru)
  const leftCurrentParticles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const baseX = 70 + ((i * 79) % 390);
      const baseY = (i * 143 + frame * 0.9) % 1920;
      const drift = Math.sin(frame * 0.035 + i) * 18;
      return { id: i, x: baseX + drift, y: baseY, size: 5 + (i % 4) * 3 };
    });
  }, [frame]);

  // Riak air laut kanan (Toska)
  const rightCurrentParticles = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const baseX = 610 + ((i * 87) % 390);
      const baseY = (i * 167 - frame * 1.0 + 19200) % 1920;
      const drift = Math.cos(frame * 0.035 + i) * 18;
      return { id: i, x: baseX + drift, y: baseY, size: 5 + (i % 4) * 3 };
    });
  }, [frame]);

  // =========================================================================
  // 4. BADGE INFORMASI PLAYFUL (Pop-in Spring)
  // =========================================================================
  const badge1Spring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const badge2Spring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // =========================================================================
  // 5. HOOK PLAYFUL: Tanda Tanya Emas "Kok Bisa?!" (Frame 84 - 170)
  // =========================================================================
  const questionSpring = spring({
    frame: frame - 84,
    fps,
    config: { damping: 10, stiffness: 150 },
  });
  const questionFloat = Math.sin((frame - 84) * 0.12) * 12;
  const questionWobble = Math.cos((frame - 84) * 0.15) * 8;
  const questionOpacity = interpolate(frame, [84, 94, 160, 184], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 6. PANEL KACA DINAMIS & EFEK PECAH NYATA (Frame 186 - 294)
  // =========================================================================
  const glassProgress = spring({
    frame: frame - 186,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  // Kilau cahaya kaca (Sheen sweep Frame 205-235)
  const glassSheenY = interpolate(frame, [202, 232], [-200, 2120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Momen kaca hancur (Frame 238 - 285)
  const shatterProgress = interpolate(frame, [238, 276], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glassOpacity = interpolate(
    frame,
    [186, 198, 238, 268],
    [0, 0.9, 0.9, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Stempel Cap Silang Merah "TIDAK ADA" (🚫)
  const stampSpring = spring({
    frame: frame - 238,
    fps,
    config: { damping: 9, stiffness: 180 },
  });

  // Pecahan Kaca Poligonal (16 Shards Meledak)
  const glassShards = useMemo(() => {
    return Array.from({ length: 16 }).map((_, idx) => {
      const angle = (idx / 16) * Math.PI * 2;
      const speed = 220 + (idx % 4) * 90;
      const rotDir = idx % 2 === 0 ? 1 : -1;
      const rotSpeed = rotDir * (260 + idx * 45);
      const w = 18 + (idx % 3) * 14;
      const h = 26 + (idx % 4) * 16;
      const originY = 600 + ((idx * 83) % 720);
      return { id: idx, angle, speed, rotSpeed, w, h, originY };
    });
  }, []);

  return (
    <CameraRig zoom={baseZoom} panX={cameraShakeX} panY={cameraShakeY}>
      <AbsoluteFill style={{ backgroundColor: "#061325", overflow: "hidden" }}>
        {/* ===================================================================
            AUDIO SFX SEQUENCES (Terkurasi & Tepat Frame)
           =================================================================== */}
        {/* 1. Whoosh In Pembuka (Frame 2) */}
        <Sequence from={2} durationInFrames={45}>
          <Audio src={sfxWhooshIn} volume={0.22} />
        </Sequence>

        {/* 2. Pop Badge Laut Kiri (Frame 20) */}
        <Sequence from={20} durationInFrames={30}>
          <Audio src={sfxPopBadge1} volume={0.28} />
        </Sequence>

        {/* 3. Pop Badge Laut Kanan (Frame 42) */}
        <Sequence from={42} durationInFrames={30}>
          <Audio src={sfxPopBadge2} volume={0.28} />
        </Sequence>

        {/* 4. Curiosity "Kok Bisa?!" (Frame 86) */}
        <Sequence from={86} durationInFrames={60}>
          <Audio src={sfxCuriosity} volume={0.35} />
        </Sequence>

        {/* 5. Tembok Kaca Slide-in (Frame 186) */}
        <Sequence from={186} durationInFrames={45}>
          <Audio src={sfxGlassSlide} volume={0.2} />
        </Sequence>

        {/* 6. Kilau Pantulan Kaca (Frame 212) */}
        <Sequence from={212} durationInFrames={35}>
          <Audio src={sfxGlassTing} volume={0.25} />
        </Sequence>

        {/* 7. Kaca Pecah & Hantaman Stempel Merah (Frame 238) */}
        <Sequence from={238} durationInFrames={50}>
          <Audio src={sfxGlassShatter} volume={0.38} />
          <Audio src={sfxExplosion} volume={0.16} />
        </Sequence>

        {/* ===================================================================
            LAYER VISUAL: SVG AIR LAUT KIRI (Biru Tua) & KANAN (Toska Terang)
           =================================================================== */}
        <svg
          viewBox="0 0 1080 1920"
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            {/* Gradasi Samudra Atlantik (Laut Kiri) */}
            <linearGradient id="oceanLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#04122C" />
              <stop offset="45%" stopColor="#0A2568" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Gradasi Teluk Alaska / Glasier (Laut Kanan) */}
            <linearGradient id="oceanRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#04443F" />
              <stop offset="45%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>

            {/* Cahaya Buih Neon Halus */}
            <filter id="foamGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Kilau Kaca Reflektif */}
            <linearGradient id="glassSheenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* 1. DASAR LAUT KIRI (Biru Tua) */}
          <rect width="1080" height="1920" fill="url(#oceanLeftGrad)" />

          {/* 2. DASAR LAUT KANAN (Toska): Dipotong Mengikuti Kurva Dinamis waveSvgPath */}
          <path
            d={`${waveSvgPath} L 1080 1920 L 1080 0 Z`}
            fill="url(#oceanRightGrad)"
          />

          {/* 3. TEKSTUR RIAK GELOMBANG HALUS (Caustic Wave Lines Kiri & Kanan) */}
          {Array.from({ length: 6 }).map((_, idx) => {
            const yPos = 200 + idx * 280;
            const waveDrift = Math.sin(frame * 0.03 + idx) * 20;
            return (
              <g key={`caustic-${idx}`} opacity={0.16}>
                {/* Riak Kiri */}
                <path
                  d={`M 60 ${yPos + waveDrift} Q 200 ${yPos - 25 + waveDrift} 380 ${yPos + waveDrift}`}
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Riak Kanan */}
                <path
                  d={`M 680 ${yPos - waveDrift} Q 840 ${yPos + 30 - waveDrift} 1020 ${yPos - waveDrift}`}
                  fill="none"
                  stroke="#5EEAD4"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* 4. PARTIKEL ARUS LAUT KIRI (Biru Berenang) */}
          {leftCurrentParticles.map((p) => (
            <ellipse
              key={`lp-${p.id}`}
              cx={p.x}
              cy={p.y}
              rx={p.size * 2.8}
              ry={p.size * 0.9}
              fill="#93C5FD"
              opacity={0.2}
              transform={`rotate(-12, ${p.x}, ${p.y})`}
            />
          ))}

          {/* 5. PARTIKEL ARUS LAUT KANAN (Toska Berenang) */}
          {rightCurrentParticles.map((p) => (
            <ellipse
              key={`rp-${p.id}`}
              cx={p.x}
              cy={p.y}
              rx={p.size * 2.5}
              ry={p.size * 0.9}
              fill="#A7F3D0"
              opacity={0.24}
              transform={`rotate(18, ${p.x}, ${p.y})`}
            />
          ))}

          {/* 6. GARIS TABRAKAN DUA AIR (Foam Collision Ridge) */}
          <path
            d={waveSvgPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="24"
            strokeLinecap="round"
            filter="url(#foamGlowFilter)"
          />
          <path
            d={waveSvgPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            opacity={0.96}
          />

          {/* 7. BUBBLE / FOAM PARTICLES YANG POPPING & BERDENYUT */}
          {foamParticles.map((bubble) => (
            <g key={`foam-${bubble.id}`}>
              <circle
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.size}
                fill="#FFFFFF"
                opacity={bubble.opacity}
                filter="url(#foamGlowFilter)"
              />
              {/* Cincin meletus mikro untuk buih besar */}
              {bubble.size > 8 && (
                <circle
                  cx={bubble.x}
                  cy={bubble.y}
                  r={bubble.size * 1.5}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="1.5"
                  opacity={bubble.opacity * 0.6}
                />
              )}
            </g>
          ))}

          {/* ===============================================================
              8. PANEL KACA DINAMIS: Fleksibel Mengikuti Gelombang Air
             =============================================================== */}
          {frame >= 186 && glassOpacity > 0 && shatterProgress < 0.95 && (
            <g opacity={glassOpacity * (1 - shatterProgress)}>
              {/* Lapisan Kaca Tebal Mengikuti Batas Ombak */}
              <path
                d={waveSvgPath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.32)"
                strokeWidth={26 * glassProgress}
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 0 12px rgba(255,255,255,0.7))",
                }}
              />
              {/* Refleksi Tepi Kaca Dalam (Glossy Edge) */}
              <path
                d={waveSvgPath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="4"
                strokeDasharray="40 90"
                strokeLinecap="round"
              />

              {/* Garis Kilau Spekular Menyapu dari Atas ke Bawah */}
              {frame >= 202 && frame <= 235 && (
                <rect
                  x="480"
                  y={glassSheenY}
                  width="120"
                  height="160"
                  fill="url(#glassSheenGrad)"
                  transform="rotate(25, 540, 960)"
                  opacity={0.8}
                />
              )}
            </g>
          )}

          {/* ===============================================================
              9. PECAHAN KACA POLIGONAL NYATA SAAT PECAH (Glass Shards)
             =============================================================== */}
          {shatterProgress > 0 &&
            glassShards.map((shard) => {
              const distance = shard.speed * shatterProgress;
              const px = 540 + Math.cos(shard.angle) * distance;
              // Efek gravitasi jatuh ke bawah sedikit
              const py = shard.originY + Math.sin(shard.angle) * distance + 140 * Math.pow(shatterProgress, 2);
              const rotation = shard.rotSpeed * shatterProgress;
              const shardOpacity = Math.max(0, 1 - shatterProgress * 1.1);

              return (
                <polygon
                  key={`shard-${shard.id}`}
                  points={`${px},${py - shard.h / 2} ${px + shard.w / 2},${py + shard.h / 2} ${px - shard.w / 2},${py + shard.h / 3}`}
                  fill="rgba(255, 255, 255, 0.9)"
                  stroke="#67E8F9"
                  strokeWidth="2"
                  opacity={shardOpacity}
                  transform={`rotate(${rotation}, ${px}, ${py})`}
                />
              );
            })}
        </svg>

        {/* ===================================================================
            10. HOOK VISUAL PLAYFUL: Tanda Tanya Emas "Kok Bisa?!" (Frame 84 - 175)
           =================================================================== */}
        {frame >= 84 && frame <= 184 && (
          <div
            style={{
              position: "absolute",
              top: 720 + questionFloat,
              left: 540,
              transform: `translate(-50%, -50%) scale(${questionSpring}) rotate(${questionWobble}deg)`,
              opacity: questionOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 35,
              pointerEvents: "none",
            }}
          >
            {/* Lingkaran Glow Emas */}
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: "radial-gradient(circle, #FBBF24 0%, #D97706 70%, #92400E 100%)",
                boxShadow: "0 12px 40px rgba(245, 158, 11, 0.65), 0 0 30px rgba(255, 255, 255, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "4px solid #FFFFFF",
              }}
            >
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 88,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  textShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
                  marginTop: -6,
                }}
              >
                ?
              </span>
            </div>

            {/* Pill Teks "Kok Bisa?" */}
            <div
              style={{
                marginTop: 14,
                backgroundColor: "rgba(10, 17, 40, 0.92)",
                padding: "8px 24px",
                borderRadius: 20,
                border: "2px solid #FBBF24",
                boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
              }}
            >
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#FDE68A",
                  letterSpacing: "1px",
                }}
              >
                Kok Bisa?!
              </span>
            </div>
          </div>
        )}

        {/* ===================================================================
            11. STEMPEL SILANG MERAH TEBAL (🚫 / "X" Stamp - "TIDAK ADA")
           =================================================================== */}
        {frame >= 238 && stampSpring > 0.05 && (
          <div
            style={{
              position: "absolute",
              top: 920,
              left: 540,
              transform: `translate(-50%, -50%) scale(${stampSpring}) rotate(-8deg)`,
              opacity: interpolate(frame, [238, 243, 275, 292], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {/* Lingkaran Silang Merah Menyala */}
            <div
              style={{
                width: 170,
                height: 170,
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.95)",
                border: "6px solid #FFFFFF",
                boxShadow: "0 14px 45px rgba(239, 68, 68, 0.7), 0 0 25px rgba(255, 255, 255, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Dua Garis X Tebal Menyilang Sempurna */}
              <div
                style={{
                  position: "absolute",
                  width: 110,
                  height: 14,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 7,
                  transform: "rotate(45deg)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 110,
                  height: 14,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 7,
                  transform: "rotate(-45deg)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
            </div>

            {/* Label "TIDAK ADA TEMBOK" */}
            <div
              style={{
                marginTop: 14,
                backgroundColor: "#DC2626",
                color: "#FFFFFF",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "2px",
                padding: "8px 22px",
                borderRadius: 16,
                border: "3px solid #FFFFFF",
                boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
                textTransform: "uppercase",
              }}
            >
              Nggak Ada Kaca!
            </div>
          </div>
        )}

        {/* ===================================================================
            12. BADGE INFORMASI PLAYFUL KURZGESAGT STYLE
           =================================================================== */}
        {/* BADGE LAUT A (KIRI: SAMUDRA ATLANTIK) */}
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 55,
            transform: `scale(${badge1Spring})`,
            transformOrigin: "top left",
            backgroundColor: "rgba(5, 21, 50, 0.75)",
            backdropFilter: "blur(12px)",
            padding: "16px 22px",
            borderRadius: 22,
            border: "2px solid rgba(96, 165, 250, 0.6)",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.25)",
            zIndex: 30,
            maxWidth: 360,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 26 }}>🧂</span>
            <div>
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                Laut A
              </span>
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#93C5FD",
                  display: "block",
                  marginTop: 2,
                }}
              >
                Salinitas Tinggi · Padat
              </span>
            </div>
          </div>
        </div>

        {/* BADGE LAUT B (KANAN: TELUK ALASKA / AIR SEGAR) */}
        <div
          style={{
            position: "absolute",
            top: 240,
            right: 55,
            transform: `scale(${badge2Spring})`,
            transformOrigin: "top right",
            backgroundColor: "rgba(4, 46, 43, 0.75)",
            backdropFilter: "blur(12px)",
            padding: "16px 22px",
            borderRadius: 22,
            border: "2px solid rgba(45, 212, 191, 0.6)",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(20, 184, 166, 0.25)",
            zIndex: 30,
            maxWidth: 360,
            textAlign: "right",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexDirection: "row-reverse" }}>
            <span style={{ fontSize: 26 }}>💧</span>
            <div>
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                Laut B
              </span>
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#5EEAD4",
                  display: "block",
                  marginTop: 2,
                }}
              >
                Air Segar · Rendah Garam
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            13. SUBTITLE CONTRAST VIGNETTE PROTECTOR (Bawah Layar)
           =================================================================== */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 380,
            background:
              "linear-gradient(to top, rgba(6, 19, 37, 0.88) 0%, rgba(6, 19, 37, 0.5) 60%, rgba(6, 19, 37, 0) 100%)",
            pointerEvents: "none",
            zIndex: 15,
          }}
        />
      </AbsoluteFill>
    </CameraRig>
  );
};
