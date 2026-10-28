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
import sfxWhoosh1 from "../../../public/sfx/whoosh1.mp3";
import sfxChime from "../../../public/sfx/chime.mp3";
import sfxPop from "../../../public/sfx/pop.wav";
import sfxBling from "../../../public/sfx/bling.mp3";

export const Scene4ForcefieldBarrier: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Kamera dinamika: subtle breathing + punch-in saat tumbukan ikan
  const impactZoom = interpolate(frame, [56, 60, 72], [1.0, 1.05, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraZoom = (1.0 + Math.sin(frame * 0.03) * 0.015) * impactZoom;

  // =========================================================================
  // 1. DINDING ENERGI PEMBATAS (HALOCLINE FORCEFIELD)
  // =========================================================================
  // Efek lentur/indentasi saat ikan menabrak perisai di frame 58 - 75
  const barrierImpactDent = interpolate(
    frame,
    [56, 60, 66, 75],
    [0, 26, 10, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Gelombang medan gaya vertikal (Y: 360 - 1460, tidak menabrak watermark/card atas)
  const forcefieldPoints = useMemo(() => {
    const points: string[] = [];
    const startY = 360;
    const endY = 1460;
    const steps = 18;
    for (let i = 0; i <= steps; i++) {
      const y = startY + ((endY - startY) / steps) * i;
      // Undulasi lembut alami
      const naturalWave =
        Math.sin(frame * 0.07 + i * 0.45) * 14 +
        Math.cos(frame * 0.05 + i * 0.7) * 8;
      // Lentur lokal saat ikan menabrak di sekitar Y = 560
      const distFromImpactY = Math.abs(y - 560);
      const impactEffect =
        distFromImpactY < 180
          ? barrierImpactDent * Math.cos((distFromImpactY / 180) * (Math.PI / 2))
          : 0;

      const x = 540 + naturalWave + impactEffect;
      points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(" ");
  }, [frame, barrierImpactDent]);

  // Pendaran dinding energi (berdenyut dinamis)
  const barrierGlowIntensity = interpolate(
    Math.sin(frame * 0.09),
    [-1, 1],
    [0.75, 1.05]
  );

  // Shockwave riak melingkar saat benturan ikan di Y = 560 (Frame 58 - 88)
  const isFishImpact = frame >= 58 && frame <= 88;
  const impactProgress = interpolate(frame, [58, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const impactRippleRadius = impactProgress * 170;
  const impactRippleOpacity = 1 - impactProgress;

  // =========================================================================
  // 2. HERO CARTOON FISHES (DUA IKAN DARI KEDUA SISI MENCOBA MENYEBERANG)
  // =========================================================================
  // IKAN KIRI (Oranye Clownfish Atlantik): X = 200 -> 515 (bump) -> recoil ke 330
  const leftFishX = interpolate(
    frame,
    [15, 58, 64, 85, 130, 230],
    [200, 515, 475, 340, 310, 260],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const leftFishY =
    560 +
    Math.sin(frame * 0.12) * 10 +
    (frame >= 58 && frame <= 72 ? Math.sin((frame - 58) * 0.8) * 8 : 0);

  const leftFishFacing = frame < 65 ? 1 : -1;
  const leftFishSquashX = interpolate(frame, [57, 59, 64, 72], [1.0, 0.72, 1.25, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftFishSquashY = interpolate(frame, [57, 59, 64, 72], [1.0, 1.3, 0.85, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // IKAN KANAN (Teal/Yellow Arctic Tang Pasifik): X = 880 -> 565 (bump) -> recoil ke 740
  const rightFishX = interpolate(
    frame,
    [18, 59, 65, 86, 130, 230],
    [880, 565, 605, 730, 760, 810],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const rightFishY =
    580 +
    Math.cos(frame * 0.11) * 10 +
    (frame >= 59 && frame <= 73 ? Math.cos((frame - 59) * 0.8) * 8 : 0);

  const rightFishFacing = frame < 66 ? -1 : 1;
  const rightFishSquashX = interpolate(frame, [58, 60, 65, 73], [1.0, 0.72, 1.25, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightFishSquashY = interpolate(frame, [58, 60, 65, 73], [1.0, 1.3, 0.85, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge lucu "BOING! GAK BISA LEWAT!" (Frame 59 - 105)
  const fishBoingSpring = spring({
    frame: frame - 58,
    fps,
    config: { damping: 10, stiffness: 150 },
  });
  const fishBoingOpacity = interpolate(frame, [58, 62, 98, 106], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 3. KAWANAN IKAN LAUT LATAR BELAKANG (CUTE CARTOON STYLED)
  // =========================================================================
  const leftFishes = useMemo(() => {
    return [
      { id: 1, baseX: 160, baseY: 420, speed: 0.9, size: 28, delay: 0 },
      { id: 2, baseX: 280, baseY: 780, speed: 1.1, size: 34, delay: 15 },
      { id: 3, baseX: 140, baseY: 980, speed: 0.8, size: 24, delay: 30 },
      { id: 4, baseX: 340, baseY: 1180, speed: 1.2, size: 30, delay: 45 },
      { id: 5, baseX: 200, baseY: 1360, speed: 0.7, size: 26, delay: 20 },
    ];
  }, []);

  const rightFishes = useMemo(() => {
    return [
      { id: 6, baseX: 860, baseY: 430, speed: 0.85, size: 30, delay: 10 },
      { id: 7, baseX: 740, baseY: 790, speed: 1.15, size: 26, delay: 25 },
      { id: 8, baseX: 900, baseY: 990, speed: 0.75, size: 34, delay: 40 },
      { id: 9, baseX: 720, baseY: 1190, speed: 1.05, size: 28, delay: 5 },
      { id: 10, baseX: 840, baseY: 1370, speed: 0.95, size: 24, delay: 35 },
    ];
  }, []);

  // =========================================================================
  // 4. UI HUDS & PROPERTY CARDS (ZONA AMAN & TYPOGRAPHY)
  // =========================================================================
  const topHudSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Dua Kartu Properti Ekosistem (Slide in di Frame 115+)
  const leftCardSpring = spring({
    frame: frame - 116,
    fps,
    config: { damping: 12, stiffness: 115 },
  });
  const rightCardSpring = spring({
    frame: frame - 122,
    fps,
    config: { damping: 12, stiffness: 115 },
  });

  // Card Takeaway Quranic Hook di Bawah (Frame 165+)
  const bottomHookSpring = spring({
    frame: frame - 168,
    fps,
    config: { damping: 13, stiffness: 125 },
  });

  return (
    <CameraRig zoom={cameraZoom}>
      <AbsoluteFill style={{ backgroundColor: "#040A18", overflow: "hidden" }}>
        {/* ===================================================================
            AUDIO SFX SEQUENCES (SYNCHRONIZED)
           =================================================================== */}
        {/* 1. Transisi Masuk Scene 4 (Whoosh) di Frame 4 */}
        <Sequence from={4} durationInFrames={35}>
          <Audio src={sfxWhoosh} volume={0.28} />
        </Sequence>

        {/* 2. Dinding Halocline Terbuka & Berpendar (Chime) di Frame 18 */}
        <Sequence from={18} durationInFrames={45}>
          <Audio src={sfxChime} volume={0.32} />
        </Sequence>

        {/* 3. BUMP! Ikan Menabrak Dinding Gaya Tolak (Boing Recoil) di Frame 58 */}
        <Sequence from={58} durationInFrames={40}>
          <Audio src={sfxBoing} volume={0.42} />
        </Sequence>

        {/* 4. Suara Penegasan Perisai Menolak Penembusan (Ting!) di Frame 64 */}
        <Sequence from={64} durationInFrames={35}>
          <Audio src={sfxTing} volume={0.25} />
        </Sequence>

        {/* 5. Kartu Properti Dua Ekosistem Muncul di Frame 118 & 124 */}
        <Sequence from={118} durationInFrames={35}>
          <Audio src={sfxWhoosh1} volume={0.25} />
          <Audio src={sfxPop} volume={0.28} />
        </Sequence>

        {/* 6. Quranic Ayah Hook Terpancar di Frame 170 */}
        <Sequence from={170} durationInFrames={45}>
          <Audio src={sfxBling} volume={0.35} />
        </Sequence>

        {/* ===================================================================
            SVG BACKGROUND & WATER DYNAMICS
           =================================================================== */}
        <svg
          viewBox="0 0 1080 1920"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            {/* Gradien Samudra Kiri: Biru Tua Padat Garam */}
            <linearGradient id="deepSalineOcean" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#030919" />
              <stop offset="70%" stopColor="#0C2356" />
              <stop offset="100%" stopColor="#143A82" />
            </linearGradient>

            {/* Gradien Samudra Kanan: Toska Dingin Lelehan Es */}
            <linearGradient id="coldGlacialOcean" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0E5E58" />
              <stop offset="40%" stopColor="#0A4641" />
              <stop offset="100%" stopColor="#031E1C" />
            </linearGradient>

            {/* Glow Filter untuk Dinding Halocline Emas */}
            <filter id="forcefieldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Honeycomb Pattern untuk Kisi Energi Dinding Barzakh */}
            <pattern
              id="honeycombGrid"
              x="0"
              y={frame * 0.5}
              width="36"
              height="62.35"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 18 0 L 36 10.39 L 36 31.18 L 18 41.57 L 0 31.18 L 0 10.39 Z M 18 41.57 L 36 51.96 L 36 62.35 M 0 51.96 L 18 62.35"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="1.2"
                opacity="0.22"
              />
            </pattern>
          </defs>

          {/* Sisi Kiri: Samudra Atlantik (Garam Tinggi) */}
          <rect x="0" y="0" width="540" height="1920" fill="url(#deepSalineOcean)" />

          {/* Sisi Kanan: Teluk Pasifik/Alaska (Air Segar Dingin) */}
          <rect x="540" y="0" width="540" height="1920" fill="url(#coldGlacialOcean)" />

          {/* Partikel Garam Melayang di Sisi Kiri */}
          {Array.from({ length: 14 }).map((_, idx) => {
            const py = (idx * 135 + frame * 0.4) % 1920;
            const px = 60 + ((idx * 83) % 400);
            return (
              <circle
                key={`salt-pt-${idx}`}
                cx={px}
                cy={py}
                r={3 + (idx % 3)}
                fill="#93C5FD"
                opacity={0.15 + (idx % 4) * 0.05}
              />
            );
          })}

          {/* Gelembung Udara Dingin Melayang di Sisi Kanan */}
          {Array.from({ length: 14 }).map((_, idx) => {
            const py = (idx * 140 - frame * 0.5 + 1920) % 1920;
            const px = 600 + ((idx * 79) % 400);
            return (
              <circle
                key={`bubble-pt-${idx}`}
                cx={px}
                cy={py}
                r={3.5 + (idx % 3)}
                fill="#5EEAD4"
                opacity={0.16 + (idx % 4) * 0.05}
              />
            );
          })}

          {/* KISI HEKSAGONAL TRANSPARAN DI SEPANJANG SUMBU PERBATASAN (BARZAKH ENERGY FIELD) */}
          <rect
            x="440"
            y="360"
            width="200"
            height="1120"
            fill="url(#honeycombGrid)"
            opacity={0.45 * barrierGlowIntensity}
          />

          {/* ===============================================================
              DINDING PEMBATAS ENERGI TAK KASATMATA (HALOCLINE FORCEFIELD)
              Dimulai dari Y=360 hingga Y=1460 (TIDAK menabrak watermark/card atas)
             =============================================================== */}
          {/* Pendaran Luar Amber Emas */}
          <path
            d={forcefieldPoints}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="24"
            strokeLinecap="round"
            opacity={0.65 * barrierGlowIntensity}
            filter="url(#forcefieldGlow)"
          />

          {/* Pendaran Inti Cyan/Teal */}
          <path
            d={forcefieldPoints}
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="9"
            strokeLinecap="round"
            opacity={0.88 * barrierGlowIntensity}
          />

          {/* Garis Tengah Putih Neon Berkilau */}
          <path
            d={forcefieldPoints}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* GELOMBANG SHOCKWAVE MELINGKAR SAAT IKAN MENABRAK (Frame 58 - 88) */}
          {isFishImpact && (
            <g>
              <ellipse
                cx="540"
                cy="570"
                rx={impactRippleRadius}
                ry={impactRippleRadius * 1.5}
                fill="none"
                stroke="#FBBF24"
                strokeWidth="5"
                opacity={impactRippleOpacity * 0.9}
              />
              <circle
                cx="540"
                cy="570"
                r={impactRippleRadius * 0.5}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                opacity={impactRippleOpacity * 0.8}
              />
              {/* Percikan Partikel Energi di Titik Benturan */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const dist = impactProgress * 105;
                const sx = 540 + Math.cos(rad) * dist;
                const sy = 570 + Math.sin(rad) * dist * 1.4;
                return (
                  <circle
                    key={`spark-dot-${i}`}
                    cx={sx}
                    cy={sy}
                    r={4 * (1 - impactProgress)}
                    fill="#FDE68A"
                  />
                );
              })}
            </g>
          )}

          {/* ===============================================================
              KAWANAN IKAN KARTUN LATAR (BACKGROUND FISH SCHOOL)
             =============================================================== */}
          {/* Sisi Kiri: Ikan Biru Bermata Kartun */}
          {leftFishes.map((f) => {
            const curX = f.baseX + Math.sin((frame + f.delay) * 0.05) * 35;
            const curY = f.baseY + Math.cos((frame + f.delay) * 0.04) * 15;
            const tailWag = Math.sin((frame + f.delay) * 0.3) * 6;
            return (
              <g key={`l-fish-${f.id}`} transform={`translate(${curX}, ${curY})`}>
                <polygon
                  points={`-${f.size * 0.9},${-f.size * 0.4 + tailWag} -${f.size * 0.3},0 -${f.size * 0.9},${f.size * 0.4 + tailWag}`}
                  fill="#60A5FA"
                />
                <ellipse cx="0" cy="0" rx={f.size * 0.75} ry={f.size * 0.45} fill="#93C5FD" />
                <circle cx={f.size * 0.35} cy={-f.size * 0.12} r={f.size * 0.12} fill="#FFFFFF" />
                <circle cx={f.size * 0.38} cy={-f.size * 0.12} r={f.size * 0.06} fill="#0F172A" />
              </g>
            );
          })}

          {/* Sisi Kanan: Ikan Kuning Bermata Kartun */}
          {rightFishes.map((f) => {
            const curX = f.baseX + Math.cos((frame + f.delay) * 0.05) * 35;
            const curY = f.baseY + Math.sin((frame + f.delay) * 0.04) * 15;
            const tailWag = Math.sin((frame + f.delay) * 0.3) * 6;
            return (
              <g key={`r-fish-${f.id}`} transform={`translate(${curX}, ${curY})`}>
                <polygon
                  points={`${f.size * 0.9},${-f.size * 0.4 + tailWag} ${f.size * 0.3},0 ${f.size * 0.9},${f.size * 0.4 + tailWag}`}
                  fill="#F59E0B"
                />
                <ellipse cx="0" cy="0" rx={f.size * 0.75} ry={f.size * 0.45} fill="#FDE68A" />
                <circle cx={-f.size * 0.35} cy={-f.size * 0.12} r={f.size * 0.12} fill="#FFFFFF" />
                <circle cx={-f.size * 0.38} cy={-f.size * 0.12} r={f.size * 0.06} fill="#0F172A" />
              </g>
            );
          })}
        </svg>

        {/* ===================================================================
            HERO IKAN 1: IKAN BADUT ORANYE ATLANTIK (KIRI)
            Ukuran Diperbesar (140x90) agar Jelas & Menggemaskan
           =================================================================== */}
        <div
          style={{
            position: "absolute",
            top: leftFishY,
            left: leftFishX,
            transform: `translate(-50%, -50%) scaleX(${leftFishFacing * leftFishSquashX}) scaleY(${leftFishSquashY})`,
            pointerEvents: "none",
            zIndex: 25,
          }}
        >
          <svg width="140" height="90" viewBox="-70 -45 140 90">
            {/* Ekor Ikan Bergerak-gerak */}
            <polygon
              points={`-48,${-22 + Math.sin(frame * 0.5) * 7} -18,0 -48,${22 + Math.sin(frame * 0.5) * 7}`}
              fill="#EA580C"
              stroke="#FFF"
              strokeWidth="2.5"
            />
            {/* Sirip Punggung */}
            <path d="M -18 -22 Q 0 -38 24 -22 Z" fill="#EA580C" />
            {/* Badan Ikan Badut Oranye */}
            <ellipse cx="0" cy="0" rx="42" ry="28" fill="#F97316" stroke="#FFF" strokeWidth="3" />
            {/* Garis-Garis Putih Ikan Badut */}
            <path
              d="M -6 -27 Q 6 0 -6 27"
              stroke="#FFFFFF"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 18 -23 Q 23 0 18 23"
              stroke="#FFFFFF"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Sirip Samping */}
            <ellipse cx="2" cy="10" rx="10" ry="6" fill="#C2410C" transform="rotate(-15)" />

            {/* MATA KARTUN EKSPRESIF */}
            {frame >= 58 && frame <= 74 ? (
              <g>
                <circle cx="24" cy="-8" r="11" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.5" />
                <circle cx="24" cy="-8" r="4" fill="#0F172A" />
                <text x="28" y="-22" fontSize="16">
                  💫
                </text>
              </g>
            ) : (
              <g>
                <circle cx="24" cy="-8" r="9.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                <circle cx="26" cy="-8" r="5" fill="#0F172A" />
                <circle cx="28" cy="-10" r="2" fill="#FFFFFF" />
              </g>
            )}
          </svg>
        </div>

        {/* ===================================================================
            HERO IKAN 2: IKAN TOSKA/KUNING PASIFIK (KANAN)
            Juga ikut menabrak dari sisi kanan, membuktikan dinding 2 arah!
           =================================================================== */}
        <div
          style={{
            position: "absolute",
            top: rightFishY,
            left: rightFishX,
            transform: `translate(-50%, -50%) scaleX(${rightFishFacing * rightFishSquashX}) scaleY(${rightFishSquashY})`,
            pointerEvents: "none",
            zIndex: 25,
          }}
        >
          <svg width="130" height="85" viewBox="-65 -42 130 85">
            {/* Ekor Ikan */}
            <polygon
              points={`-44,${-20 + Math.cos(frame * 0.5) * 7} -16,0 -44,${20 + Math.cos(frame * 0.5) * 7}`}
              fill="#0D9488"
              stroke="#FFF"
              strokeWidth="2.5"
            />
            {/* Sirip Punggung */}
            <path d="M -16 -20 Q 0 -34 22 -20 Z" fill="#0D9488" />
            {/* Badan Ikan Toska / Kuning */}
            <ellipse cx="0" cy="0" rx="40" ry="26" fill="#2DD4BF" stroke="#FFF" strokeWidth="3" />
            {/* Aksen Strip Emas */}
            <path
              d="M -4 -25 Q 6 0 -4 25"
              stroke="#FDE68A"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Sirip Samping */}
            <ellipse cx="2" cy="9" rx="9" ry="5.5" fill="#14B8A6" transform="rotate(-15)" />

            {/* MATA KARTUN EKSPRESIF */}
            {frame >= 59 && frame <= 75 ? (
              <g>
                <circle cx="22" cy="-7" r="10.5" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.5" />
                <circle cx="22" cy="-7" r="3.8" fill="#0F172A" />
                <text x="26" y="-20" fontSize="15">
                  💫
                </text>
              </g>
            ) : (
              <g>
                <circle cx="22" cy="-7" r="9" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                <circle cx="24" cy="-7" r="4.8" fill="#0F172A" />
                <circle cx="26" cy="-9" r="1.8" fill="#FFFFFF" />
              </g>
            )}
          </svg>
        </div>

        {/* POP BADGE LUCU: "⚡ BOING! GAK BISA LEWAT!" (Center X = 540) */}
        {fishBoingOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              top: 450,
              left: "50%",
              transform: `translate(-50%, -50%) scale(${fishBoingSpring})`,
              opacity: fishBoingOpacity,
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              padding: "12px 28px",
              borderRadius: 22,
              border: "3px solid #FEF2F2",
              boxShadow: "0 10px 35px rgba(220, 38, 38, 0.75)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 30,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 30 }}>🛡️</span>
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontFamily: FONTS.title,
                  color: "#FEE2E2",
                }}
              >
                Gaya Tolak Haloklin
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  fontFamily: FONTS.title,
                  marginTop: 2,
                }}
              >
                BOING! Gak Bisa Lewat!
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            HUD HEADER ATAS (SAFE ZONE: TOP 230)
           =================================================================== */}
        <div
          style={{
            position: "absolute",
            top: 230,
            left: "50%",
            transform: `translateX(-50%) scale(${topHudSpring})`,
            width: 860,
            textAlign: "center",
            backgroundColor: "rgba(10, 20, 45, 0.94)",
            backdropFilter: "blur(14px)",
            padding: "18px 34px",
            borderRadius: 24,
            border: "1.5px solid rgba(245, 158, 11, 0.55)",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.65)",
            zIndex: 20,
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(245, 158, 11, 0.18)",
              border: "1px solid #F59E0B",
              padding: "4px 20px",
              borderRadius: 14,
              color: "#FBBF24",
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: FONTS.title,
              marginBottom: 6,
            }}
          >
            ⚖️ HUKUM ALAM (BARZAKH)
          </div>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: 36,
              fontWeight: 900,
              margin: 0,
              fontFamily: FONTS.title,
              textShadow: "0 4px 18px rgba(0,0,0,0.7)",
            }}
          >
            Dinding Pembatas Tak Kasatmata
          </h2>
          <p
            style={{
              color: "#E2E8F0",
              fontSize: 19,
              fontWeight: 800,
              margin: "6px 0 0 0",
              fontFamily: FONTS.body,
            }}
          >
            Perbedaan densitas menciptakan perisai alamiah di bawah laut
          </p>
        </div>

        {/* ===================================================================
            FASE 2: KARTU PROPERTI DUA EKOSISTEM (FRAME 115+)
            - Sisi Kiri: Samudra Atlantik (Garam Tinggi)
            - Sisi Kanan: Teluk Pasifik/Alaska (Segar & Dingin)
            Font chips diperbesar ke 17px Bold 800 (Sesuai masukan keterbacaan)
           =================================================================== */}
        {frame >= 115 && (
          <>
            {/* KARTU EKOSISTEM KIRI (ATLANTIK) */}
            <div
              style={{
                position: "absolute",
                top: 720,
                left: 50,
                transform: `scale(${leftCardSpring})`,
                transformOrigin: "center left",
                width: 420,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                backdropFilter: "blur(14px)",
                padding: "22px 24px",
                borderRadius: 24,
                border: "2px solid rgba(96, 165, 250, 0.8)",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.65), 0 0 25px rgba(59, 130, 246, 0.3)",
                zIndex: 22,
              }}
            >
              <div
                style={{
                  color: "#93C5FD",
                  fontSize: 22,
                  fontWeight: 900,
                  fontFamily: FONTS.title,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <span style={{ fontSize: 24 }}>🌊</span> LAUT ATLANTIK
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    backgroundColor: "rgba(30, 58, 138, 0.85)",
                    border: "1.5px solid rgba(96, 165, 250, 0.6)",
                    padding: "9px 16px",
                    borderRadius: 14,
                    color: "#FFFFFF",
                    fontSize: 17,
                    fontWeight: 800,
                    fontFamily: FONTS.body,
                  }}
                >
                  🧂 Salinitas Tinggi (~3.8%)
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(30, 58, 138, 0.85)",
                    border: "1.5px solid rgba(96, 165, 250, 0.6)",
                    padding: "9px 16px",
                    borderRadius: 14,
                    color: "#FFFFFF",
                    fontSize: 17,
                    fontWeight: 800,
                    fontFamily: FONTS.body,
                  }}
                >
                  🌡️ Suhu Dingin & Sangat Padat
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(30, 58, 138, 0.85)",
                    border: "1.5px solid rgba(96, 165, 250, 0.6)",
                    padding: "9px 16px",
                    borderRadius: 14,
                    color: "#FFFFFF",
                    fontSize: 17,
                    fontWeight: 800,
                    fontFamily: FONTS.body,
                  }}
                >
                  🐠 Spesies Laut Dalam
                </div>
              </div>
            </div>

            {/* KARTU EKOSISTEM KANAN (PASIFIK / ALASKA) */}
            <div
              style={{
                position: "absolute",
                top: 720,
                right: 50,
                transform: `scale(${rightCardSpring})`,
                transformOrigin: "center right",
                width: 420,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                backdropFilter: "blur(14px)",
                padding: "22px 24px",
                borderRadius: 24,
                border: "2px solid rgba(45, 212, 191, 0.8)",
                boxShadow: "0 12px 35px rgba(0, 0, 0, 0.65), 0 0 25px rgba(20, 184, 166, 0.3)",
                zIndex: 22,
              }}
            >
              <div
                style={{
                  color: "#5EEAD4",
                  fontSize: 22,
                  fontWeight: 900,
                  fontFamily: FONTS.title,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <span style={{ fontSize: 24 }}>🏔️</span> TELUK ALASKA
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    backgroundColor: "rgba(19, 78, 74, 0.85)",
                    border: "1.5px solid rgba(45, 212, 191, 0.6)",
                    padding: "9px 16px",
                    borderRadius: 14,
                    color: "#FFFFFF",
                    fontSize: 17,
                    fontWeight: 800,
                    fontFamily: FONTS.body,
                  }}
                >
                  💧 Salinitas Rendah (~3.2%)
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(19, 78, 74, 0.85)",
                    border: "1.5px solid rgba(45, 212, 191, 0.6)",
                    padding: "9px 16px",
                    borderRadius: 14,
                    color: "#FFFFFF",
                    fontSize: 17,
                    fontWeight: 800,
                    fontFamily: FONTS.body,
                  }}
                >
                  🧊 Air Lelehan Es Ringan
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(19, 78, 74, 0.85)",
                    border: "1.5px solid rgba(45, 212, 191, 0.6)",
                    padding: "9px 16px",
                    borderRadius: 14,
                    color: "#FFFFFF",
                    fontSize: 17,
                    fontWeight: 800,
                    fontFamily: FONTS.body,
                  }}
                >
                  🐟 Kaya Fitoplankton & Alga
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===================================================================
            CARD TAKEAWAY QURANIC HOOK DI BAWAH (FRAME 165+)
            Posisi: Top 1130, Center X: 540, Width: 820
            (Jarak aman >260px dari Subtitle di Y >= 1500)
           =================================================================== */}
        {frame >= 165 && (
          <div
            style={{
              position: "absolute",
              top: 1130,
              left: "50%",
              transform: `translateX(-50%) scale(${bottomHookSpring})`,
              width: 860,
              backgroundColor: "rgba(10, 20, 45, 0.95)",
              backdropFilter: "blur(16px)",
              padding: "24px 44px",
              borderRadius: 26,
              border: "2.5px solid rgba(251, 191, 36, 0.85)",
              boxShadow: "0 16px 45px rgba(0, 0, 0, 0.85), 0 0 30px rgba(251, 191, 36, 0.35)",
              textAlign: "center",
              zIndex: 22,
            }}
          >
            <div
              style={{
                color: "#FBBF24",
                fontWeight: 900,
                fontSize: 28,
                fontFamily: FONTS.title,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                letterSpacing: "0.5px",
              }}
            >
              <span>✨</span> QS. Ar-Rahman: 20
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: 700,
                marginTop: 8,
                fontFamily: FONTS.body,
                lineHeight: 1.45,
              }}
            >
              "Di antara keduanya ada batas yang tidak dilampaui masing-masing."
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
