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
import sfxGlassCrack from "../../../public/sfx/scratch.wav";
import sfxGlassShatter from "../../../public/sfx/punch_snap.mp3";
import sfxExplosion from "../../../public/sfx/explosion.wav";

export const Scene1TopDown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // 1. KAMERA DINAMIS: Punch-In pada "Kok Bisa?" & Micro-Shake pada Kaca Pecah
  // =========================================================================
  const baseZoom = interpolate(
    frame,
    [0, 84, 110, 186, 238, 294],
    [1.0, 1.07, 1.18, 1.14, 1.15, 1.16],
    { extrapolateRight: "clamp" }
  );

  // Micro-shake saat kaca pecah di frame 238 - 258
  const shakeIntensity = interpolate(frame, [238, 243, 258], [0, 9, 0], {
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
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      const y = (height / steps) * i;
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

      const eddyX = Math.sin(frame * 0.07 + i) * 28 + Math.cos(frame * 0.12 + i * 2) * 12;
      const currentX = targetPoint.x + eddyX;

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
  // 4. BADGE INFORMASI PLAYFUL (Ukuran Lebih Besar & Gagah)
  // =========================================================================
  const badge1Spring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 11, stiffness: 130 },
  });

  const badge2Spring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 11, stiffness: 130 },
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
  // 6. TEMBOK KACA AKUARIUM TEBAL & RETAKAN NYATA (Frame 186 - 294)
  // =========================================================================
  // Animasi turun/slam dari atas layar
  const glassDropProgress = spring({
    frame: frame - 186,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const glassYOffset = interpolate(glassDropProgress, [0, 1], [-1920, 0]);

  // Kemunculan retakan jaring laba-laba (Frame 228 - 238)
  const crackProgress = interpolate(frame, [228, 237], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Momen hancur & ledakan (Frame 238 - 275)
  const shatterProgress = interpolate(frame, [238, 275], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Opasitas panel kaca utama
  const glassPanelOpacity = interpolate(
    frame,
    [186, 196, 238, 245],
    [0, 0.95, 0.95, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Stempel Cap Silang Merah "TIDAK ADA" (🚫)
  const stampSpring = spring({
    frame: frame - 238,
    fps,
    config: { damping: 9, stiffness: 180 },
  });

  // Titik klem logam industri penjepit kaca
  const clampYPositions = [380, 720, 1140, 1520];

  // Pecahan Kaca Poligonal (20 Shards Meledak Dinamis)
  const glassShards = useMemo(() => {
    return Array.from({ length: 20 }).map((_, idx) => {
      const angle = (idx / 20) * Math.PI * 2 + (idx % 3) * 0.2;
      const speed = 250 + (idx % 5) * 110;
      const rotDir = idx % 2 === 0 ? 1 : -1;
      const rotSpeed = rotDir * (320 + idx * 55);
      const w = 22 + (idx % 4) * 18;
      const h = 32 + (idx % 3) * 22;
      const originY = 880 + ((idx * 67) % 360) - 180;
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

        {/* 2. Pop Badge Laut Kiri (Frame 18) */}
        <Sequence from={18} durationInFrames={30}>
          <Audio src={sfxPopBadge1} volume={0.28} />
        </Sequence>

        {/* 3. Pop Badge Laut Kanan (Frame 38) */}
        <Sequence from={38} durationInFrames={30}>
          <Audio src={sfxPopBadge2} volume={0.28} />
        </Sequence>

        {/* 4. Curiosity "Kok Bisa?!" (Frame 86) */}
        <Sequence from={86} durationInFrames={60}>
          <Audio src={sfxCuriosity} volume={0.35} />
        </Sequence>

        {/* 5. Tembok Kaca Slide-in (Frame 186) */}
        <Sequence from={186} durationInFrames={45}>
          <Audio src={sfxGlassSlide} volume={0.28} />
        </Sequence>

        {/* 6. Kilau Pantulan Kaca (Frame 208) */}
        <Sequence from={208} durationInFrames={35}>
          <Audio src={sfxGlassTing} volume={0.25} />
        </Sequence>

        {/* 7. Kaca Retak Menjalar (Frame 229) */}
        <Sequence from={229} durationInFrames={25}>
          <Audio src={sfxGlassCrack} volume={0.22} />
        </Sequence>

        {/* 8. Kaca Pecah & Hantaman Stempel Merah (Frame 238) */}
        <Sequence from={238} durationInFrames={50}>
          <Audio src={sfxGlassShatter} volume={0.4} />
          <Audio src={sfxExplosion} volume={0.18} />
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

            {/* Gradasi Kaca Akuarium Tebal (Frosted Ice Cyan) */}
            <linearGradient id="aquariumGlassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.75)" />
              <stop offset="12%" stopColor="rgba(165, 243, 252, 0.45)" />
              <stop offset="50%" stopColor="rgba(224, 242, 254, 0.28)" />
              <stop offset="88%" stopColor="rgba(165, 243, 252, 0.45)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.75)" />
            </linearGradient>

            {/* Gradasi Logam Klem Penjepit (Titanium Chrome) */}
            <linearGradient id="metalClampGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="45%" stopColor="#CBD5E1" />
              <stop offset="75%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#334155" />
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
                <path
                  d={`M 60 ${yPos + waveDrift} Q 200 ${yPos - 25 + waveDrift} 380 ${yPos + waveDrift}`}
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
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
              8. TEMBOK KACA AKUARIUM TEBAL NYATA (Frame 186 - 238)
             =============================================================== */}
          {frame >= 186 && glassPanelOpacity > 0 && (
            <g
              opacity={glassPanelOpacity}
              transform={`translate(0, ${glassYOffset})`}
              style={{
                filter: "drop-shadow(0 0 24px rgba(56, 189, 248, 0.55)) drop-shadow(0 0 50px rgba(0, 0, 0, 0.7))",
              }}
            >
              {/* Balok Kaca Akuarium Tebal (Width: 84px, Center: 540) */}
              <rect
                x="498"
                y="0"
                width="84"
                height="1920"
                fill="url(#aquariumGlassGrad)"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="3.5"
              />

              {/* Garis Kilau Refleksi Diagonal Khas Kaca Akuarium */}
              {Array.from({ length: 8 }).map((_, i) => {
                const startY = 120 + i * 230;
                return (
                  <line
                    key={`glass-sheen-${i}`}
                    x1="504"
                    y1={startY}
                    x2="576"
                    y2={startY + 70}
                    stroke="rgba(255, 255, 255, 0.75)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity={0.65}
                  />
                );
              })}

              {/* Garis Kilau Utama Sepanjang Kaca */}
              <line
                x1="512"
                y1="0"
                x2="512"
                y2="1920"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="4"
                strokeDasharray="90 140"
              />
              <line
                x1="568"
                y1="0"
                x2="568"
                y2="1920"
                stroke="rgba(255, 255, 255, 0.65)"
                strokeWidth="2.5"
                strokeDasharray="60 120"
              />

              {/* Klem Penjepit Baja Industri (Industrial Glass Mounting Brackets) */}
              {clampYPositions.map((cy, idx) => (
                <g key={`clamp-${idx}`}>
                  {/* Plat Klem */}
                  <rect
                    x="484"
                    y={cy - 16}
                    width="112"
                    height="32"
                    rx="8"
                    fill="url(#metalClampGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.6))" }}
                  />
                  {/* Baut Kiri & Kanan */}
                  <circle cx="498" cy={cy} r="4.5" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
                  <circle cx="582" cy={cy} r="4.5" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
                </g>
              ))}

              {/* =============================================================
                  RETAKAN KACA JARING LABA-LABA (Frame 228 - 238)
                 ============================================================= */}
              {crackProgress > 0 && (
                <g opacity={crackProgress}>
                  {/* Titik Pusat Retakan di Y: 920 */}
                  {/* Garis Retakan Radial Tajam */}
                  <path
                    d={`M 540 920 L 510 880 L 500 840 M 540 920 L 570 870 L 580 820 M 540 920 L 502 940 L 498 980 M 540 920 L 575 950 L 582 1010 M 540 920 L 525 990 L 515 1060 M 540 920 L 555 1000 L 565 1070 M 540 920 L 538 820 L 544 750 M 540 920 L 536 1020 L 542 1100`}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 6px #67E8F9)" }}
                  />
                  {/* Lingkaran Fraktur Zigzag */}
                  <polygon
                    points="540,860 565,885 575,920 560,955 540,970 515,950 505,920 520,875"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                  <polygon
                    points="540,810 580,850 584,920 575,980 540,1010 500,975 498,920 508,840"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.75)"
                    strokeWidth="2"
                  />
                </g>
              )}
            </g>
          )}

          {/* ===============================================================
              9. PECAHAN KACA POLIGONAL NYATA SAAT PECAH (Glass Shards Explosion)
             =============================================================== */}
          {shatterProgress > 0 &&
            glassShards.map((shard) => {
              const distance = shard.speed * shatterProgress;
              const px = 540 + Math.cos(shard.angle) * distance;
              const py = shard.originY + Math.sin(shard.angle) * distance + 160 * Math.pow(shatterProgress, 2);
              const rotation = shard.rotSpeed * shatterProgress;
              const shardOpacity = Math.max(0, 1 - shatterProgress * 1.15);

              return (
                <polygon
                  key={`shard-${shard.id}`}
                  points={`${px},${py - shard.h / 2} ${px + shard.w / 2},${py + shard.h / 2} ${px - shard.w / 2},${py + shard.h / 3}`}
                  fill="rgba(224, 242, 254, 0.95)"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  opacity={shardOpacity}
                  transform={`rotate(${rotation}, ${px}, ${py})`}
                  style={{ filter: "drop-shadow(0 0 10px rgba(56, 189, 248, 0.8))" }}
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
            11. STEMPEL SILANG MERAH TEBAL (🚫 / "X" Stamp - "NGGAK ADA KACA!")
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
            <div
              style={{
                width: 175,
                height: 175,
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.96)",
                border: "6px solid #FFFFFF",
                boxShadow: "0 14px 45px rgba(239, 68, 68, 0.75), 0 0 30px rgba(255, 255, 255, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 116,
                  height: 16,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 8,
                  transform: "rotate(45deg)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 116,
                  height: 16,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 8,
                  transform: "rotate(-45deg)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
            </div>

            <div
              style={{
                marginTop: 14,
                backgroundColor: "#DC2626",
                color: "#FFFFFF",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: "2px",
                padding: "10px 26px",
                borderRadius: 18,
                border: "3px solid #FFFFFF",
                boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                textTransform: "uppercase",
              }}
            >
              Nggak Ada Kaca!
            </div>
          </div>
        )}

        {/* ===================================================================
            12. BADGE INFORMASI PLAYFUL KURZGESAGT STYLE (DIPERBESAR & GAGAH)
           =================================================================== */}
        {/* BADGE LAUT A (KIRI: SAMUDRA ATLANTIK) */}
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 50,
            transform: `scale(${badge1Spring})`,
            transformOrigin: "top left",
            backgroundColor: "rgba(5, 21, 50, 0.88)",
            backdropFilter: "blur(14px)",
            padding: "22px 28px",
            borderRadius: 26,
            border: "3px solid rgba(96, 165, 250, 0.8)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(59, 130, 246, 0.35)",
            zIndex: 30,
            minWidth: 360,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 38 }}>🧂</span>
            <div>
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                Laut A
              </span>
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#93C5FD",
                  display: "block",
                  marginTop: 4,
                  letterSpacing: "0.5px",
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
            top: 220,
            right: 75,
            transform: `scale(${badge2Spring})`,
            transformOrigin: "top right",
            backgroundColor: "rgba(4, 46, 43, 0.88)",
            backdropFilter: "blur(14px)",
            padding: "22px 28px",
            borderRadius: 26,
            border: "3px solid rgba(45, 212, 191, 0.8)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(20, 184, 166, 0.35)",
            zIndex: 30,
            minWidth: 360,
            textAlign: "right",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexDirection: "row-reverse" }}>
            <span style={{ fontSize: 38 }}>💧</span>
            <div>
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                Laut B
              </span>
              <span
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#5EEAD4",
                  display: "block",
                  marginTop: 4,
                  letterSpacing: "0.5px",
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
              "linear-gradient(to top, rgba(6, 19, 37, 0.92) 0%, rgba(6, 19, 37, 0.55) 60%, rgba(6, 19, 37, 0) 100%)",
            pointerEvents: "none",
            zIndex: 15,
          }}
        />
      </AbsoluteFill>
    </CameraRig>
  );
};
