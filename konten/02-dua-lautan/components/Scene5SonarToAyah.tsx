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
import sfxWhoosh from "../../../public/sfx/whoosh2.mp3";
import sfxTing from "../../../public/sfx/ting.wav";
import sfxChime from "../../../public/sfx/chime.mp3";
import sfxBling from "../../../public/sfx/bling.mp3";
import sfxPop from "../../../public/sfx/pop.wav";

export const Scene5SonarToAyah: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // FASE & TRANSISI (Total Durasi: 378 frame / ~12.6 detik)
  // - Fase 1 (Frame 0 - 170): Kapal Riset Oseanografi & Robot Selam (ROV)
  // - Fase 2 (Frame 160 - 378): Cahaya Keemasan Wahyu Al-Qur'an (Surah Ar-Rahman)
  // =========================================================================
  const sacredPhaseProgress = interpolate(frame, [155, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const modernSonarOpacity = 1 - sacredPhaseProgress;
  const isSacredPhase = frame >= 155;

  // Kamera: zoom out perlahan & dramatis memberi kesan megah
  const cameraZoom = interpolate(frame, [0, 160, 378], [1.06, 1.02, 1.0], {
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 1. FASE 1: OSEANOGRAFI MODERN & WAHANA SELAM (ROV DRONE)
  // =========================================================================
  // Goyangan kapal riset di atas ombak
  const shipBobbingY = Math.sin(frame * 0.08) * 6;
  const shipRotation = Math.cos(frame * 0.06) * 1.8;

  // Gelombang Sonar Multibeam yang menyapu ke bawah
  const sonarPings = useMemo(() => {
    return [0, 1, 2].map((idx) => {
      const pingProgress = ((frame * 1.6 + idx * 45) % 135) / 135;
      const radius = pingProgress * 560;
      const opacity = (1 - pingProgress) * 0.75;
      return { id: idx, radius, opacity };
    });
  }, [frame]);

  // Robot Selam Kuning (ROV Submarine) yang menuruni dinding haloklin
  const rovY = interpolate(frame, [0, 155], [740, 1060], {
    extrapolateRight: "clamp",
  });
  const rovWobbleX = Math.sin(frame * 0.1) * 8;
  const rovWobbleRot = Math.cos(frame * 0.08) * 3;

  // Baling-baling pendorong ROV
  const propellerAngle = (frame * 35) % 360;

  // =========================================================================
  // 2. FASE 2: CAHAYA KEEMASAN AL-QUR'AN (SURAH AR-RAHMAN)
  // =========================================================================
  // Bintang Islami 8 Sudut (Rub-el-Hizb) berotasi anggun
  const starRotation = frame * 0.25;

  // Partikel Nur Keemasan yang Naik ke Langit
  const goldenParticles = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => {
      const baseX = 380 + ((i * 37) % 320);
      const speed = 2.0 + (i % 4) * 0.8;
      const currentY = 1600 - ((frame * speed + i * 48) % 1400);
      const size = 4 + (i % 5) * 3;
      const opacity = 0.35 + Math.sin(frame * 0.08 + i) * 0.45;
      return { id: i, x: baseX, y: currentY, size, opacity };
    });
  }, [frame]);

  // Card Surah Ar-Rahman spring bounce entrance
  const surahCardSpring = spring({
    frame: frame - 170,
    fps,
    config: { damping: 13, stiffness: 105 },
  });

  return (
    <CameraRig zoom={cameraZoom}>
      <AbsoluteFill style={{ backgroundColor: "#030814", overflow: "hidden" }}>
        {/* ===================================================================
            AUDIO SFX SEQUENCES (SYNCHRONIZED)
           =================================================================== */}
        {/* 1. Transisi Masuk Scene 5 (Whoosh) di Frame 4 */}
        <Sequence from={4} durationInFrames={35}>
          <Audio src={sfxWhoosh} volume={0.28} />
        </Sequence>

        {/* 2. Echo Sonar Radar Ping (Berkala setiap ~45 frame) */}
        <Sequence from={20} durationInFrames={30}>
          <Audio src={sfxTing} volume={0.22} />
        </Sequence>
        <Sequence from={68} durationInFrames={30}>
          <Audio src={sfxTing} volume={0.24} />
        </Sequence>
        <Sequence from={115} durationInFrames={30}>
          <Audio src={sfxTing} volume={0.22} />
        </Sequence>

        {/* 3. Transisi Cahaya Sakral Al-Qur'an (Chime & Bling) di Frame 168 */}
        <Sequence from={168} durationInFrames={60}>
          <Audio src={sfxChime} volume={0.38} />
          <Audio src={sfxBling} volume={0.4} />
        </Sequence>

        {/* 4. Pop Efek Kemunculan Badge Surah di Frame 180 */}
        <Sequence from={180} durationInFrames={30}>
          <Audio src={sfxPop} volume={0.28} />
        </Sequence>

        {/* ===================================================================
            SVG BACKGROUND: LANGIT MALAM & DUA LAUTAN DENGAN WATERLINE
           =================================================================== */}
        <svg
          viewBox="0 0 1080 1920"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            {/* Langit Malam */}
            <linearGradient id="skyNightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#02040A" />
              <stop offset="50%" stopColor="#061229" />
              <stop offset="100%" stopColor="#0C2044" />
            </linearGradient>

            {/* Laut Kiri: Biru Tua Padat Asin */}
            <linearGradient id="seaLeftNight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#040F24" />
              <stop offset="70%" stopColor="#0E3378" />
              <stop offset="100%" stopColor="#124094" />
            </linearGradient>

            {/* Laut Kanan: Toska Dingin Lelehan Es */}
            <linearGradient id="seaRightNight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B5D58" />
              <stop offset="60%" stopColor="#07423E" />
              <stop offset="100%" stopColor="#032624" />
            </linearGradient>

            {/* Pilar Cahaya Keemasan Sakral */}
            <linearGradient id="sacredPillarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.1" />
            </linearGradient>

            <filter id="sacredGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="22" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Lampu Sorot ROV Submarine */}
            <radialGradient id="rovLightGrad" cx="0%" cy="50%" r="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#FDE047" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FACC15" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          {/* Langit Malam di Atas Permukaan Air (Y: 0 - 660) */}
          <rect x="0" y="0" width="1080" height="660" fill="url(#skyNightGrad)" />

          {/* Bintang-Bintang Berkelap-Kelip di Langit */}
          {Array.from({ length: 45 }).map((_, idx) => {
            const bx = (idx * 163) % 1080;
            const by = (idx * 87) % 520;
            const op = 0.25 + Math.sin(frame * 0.06 + idx) * 0.25;
            return <circle key={`st-${idx}`} cx={bx} cy={by} r="1.8" fill="#FFFFFF" opacity={op} />;
          })}

          {/* Laut Kiri & Kanan (Y: 660 - 1920) */}
          <rect x="0" y="660" width="540" height="1260" fill="url(#seaLeftNight)" />
          <rect x="540" y="660" width="540" height="1260" fill="url(#seaRightNight)" />

          {/* Garis Ombak Permukaan Air Bergerak */}
          <path
            d={`M 0 660 Q 270 ${655 + Math.sin(frame * 0.08) * 5} 540 660 T 1080 660`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="3"
          />

          {/* Garis Vertikal Haloklin Bawah Air */}
          <line
            x1="540"
            y1="660"
            x2="540"
            y2="1520"
            stroke="rgba(251, 191, 36, 0.55)"
            strokeWidth="3"
            strokeDasharray="14 10"
          />

          {/* ===============================================================
              FASE 1: KAPAL RISET OSEANOGRAFI & SONAR SCANNING (Frame 0 - 170)
             =============================================================== */}
          {modernSonarOpacity > 0 && (
            <g opacity={modernSonarOpacity}>
              {/* Gelombang Sonar Radar Memancar ke Bawah */}
              {sonarPings.map((ping) => (
                <path
                  key={`sonar-${ping.id}`}
                  d={`M ${540 - ping.radius * 0.65} ${665 + ping.radius} Q 540 ${665 + ping.radius + 40} ${540 + ping.radius * 0.65} ${665 + ping.radius}`}
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="4"
                  opacity={ping.opacity}
                />
              ))}

              {/* Garis Pandu Kerucut Sonar */}
              <line
                x1="540"
                y1="665"
                x2="240"
                y2="1280"
                stroke="#14B8A6"
                strokeWidth="1.5"
                strokeDasharray="8 6"
                opacity="0.45"
              />
              <line
                x1="540"
                y1="665"
                x2="840"
                y2="1280"
                stroke="#14B8A6"
                strokeWidth="1.5"
                strokeDasharray="8 6"
                opacity="0.45"
              />

              {/* KAPAL RISET OSEANOGRAFI MODERN (Sitting on waterline Y=655) */}
              <g
                transform={`translate(540, ${655 + shipBobbingY}) rotate(${shipRotation})`}
              >
                {/* Riak air di lambung kapal */}
                <ellipse
                  cx="0"
                  cy="14"
                  rx="120"
                  ry="8"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                />

                {/* Lambung Bawah Kapal (Merah Antifouling) */}
                <path
                  d="M -115 0 L -90 16 L 85 16 L 115 0 Z"
                  fill="#DC2626"
                  stroke="#991B1B"
                  strokeWidth="1.5"
                />
                {/* Lambung Atas Kapal (Putih Baja) */}
                <path
                  d="M -125 -18 L -90 0 L 90 0 L 125 -18 L 90 -30 L -95 -30 Z"
                  fill="#F8FAFC"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                />
                {/* Garis Biru Laut Lambung */}
                <line x1="-85" y1="-8" x2="85" y2="-8" stroke="#0284C7" strokeWidth="4.5" />

                {/* Dek Utama & Jembatan Navigasi (Bridge) */}
                <rect x="-55" y="-62" width="80" height="32" fill="#FFFFFF" rx="4" stroke="#94A3B8" strokeWidth="1.5" />
                <rect x="-35" y="-84" width="45" height="23" fill="#E2E8F0" rx="3" stroke="#64748B" strokeWidth="1.5" />

                {/* Jendela Kabin Biru */}
                <circle cx="-40" cy="-48" r="4" fill="#38BDF8" />
                <circle cx="-25" cy="-48" r="4" fill="#38BDF8" />
                <circle cx="-10" cy="-48" r="4" fill="#38BDF8" />
                <circle cx="5" cy="-48" r="4" fill="#38BDF8" />

                {/* Tiang Radar & Satelit Berputar */}
                <line x1="-12" y1="-84" x2="-12" y2="-120" stroke="#475569" strokeWidth="3.5" />
                <ellipse
                  cx="-12"
                  cy="-120"
                  rx="18"
                  ry="6"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  transform={`rotate(${frame * 4}, -12, -120)`}
                />

                {/* Lampu Navigasi Merah (Port) & Hijau (Starboard) */}
                <circle cx="-115" cy="-22" r="3.5" fill="#EF4444" />
                <circle cx="115" cy="-22" r="3.5" fill="#22C55E" />
              </g>

              {/* ROBOT SELAM ROV KUNING EKSPLORASI (Menuruni Dinding Haloklin) */}
              <g
                transform={`translate(${540 + rovWobbleX}, ${rovY}) rotate(${rovWobbleRot})`}
              >
                {/* Kabel Tether Oranye dari Kapal */}
                <path
                  d={`M 0 -30 Q ${-rovWobbleX * 2} -70 0 ${660 - rovY}`}
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Lampu Sorot Kembar ROV (Conical Yellow Beams Menyinari Dinding) */}
                <polygon points="25,-6 180,-45 180,45" fill="url(#rovLightGrad)" opacity="0.8" />
                <polygon points="-25,-6 -180,-45 -180,45" fill="url(#rovLightGrad)" opacity="0.8" />

                {/* Badan Kapal Selam ROV Kuning */}
                <rect
                  x="-42"
                  y="-26"
                  width="84"
                  height="52"
                  rx="18"
                  fill="#EAB308"
                  stroke="#A16207"
                  strokeWidth="3"
                />
                {/* Kubah Kaca Pengamatan Depan */}
                <circle cx="0" cy="0" r="15" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
                <circle cx="-4" cy="-4" r="4" fill="#FFFFFF" opacity="0.8" />

                {/* Baling-Baling Belakang */}
                <g transform="translate(0, 32)">
                  <line
                    x1={-12 * Math.cos((propellerAngle * Math.PI) / 180)}
                    y1="0"
                    x2={12 * Math.cos((propellerAngle * Math.PI) / 180)}
                    y2="0"
                    stroke="#475569"
                    strokeWidth="4"
                  />
                </g>

                {/* Lengan Robotik Pengambil Sampel */}
                <line x1="-24" y1="20" x2="-35" y2="35" stroke="#64748B" strokeWidth="3" />
                <circle cx="-35" cy="35" r="3" fill="#EF4444" />
                <line x1="24" y1="20" x2="35" y2="35" stroke="#64748B" strokeWidth="3" />
                <circle cx="35" cy="35" r="3" fill="#22C55E" />
              </g>

              {/* HUD Sensor Chip di Samping ROV */}
              <g transform={`translate(${630 + rovWobbleX}, ${rovY - 20})`}>
                <rect
                  x="0"
                  y="0"
                  width="200"
                  height="52"
                  rx="14"
                  fill="rgba(10, 20, 45, 0.88)"
                  stroke="rgba(45, 212, 191, 0.6)"
                  strokeWidth="1.5"
                />
                <text
                  x="14"
                  y="22"
                  fill="#2DD4BF"
                  fontSize="12"
                  fontWeight="900"
                  fontFamily={FONTS.title}
                  letterSpacing="1px"
                >
                  ROV SENSOR CTD
                </text>
                <text
                  x="14"
                  y="40"
                  fill="#FFFFFF"
                  fontSize="13"
                  fontWeight="800"
                  fontFamily={FONTS.body}
                >
                  Depth: {Math.round(interpolate(frame, [0, 155], [120, 480]))}m • Halocline
                </text>
              </g>
            </g>
          )}

          {/* ===============================================================
              FASE 2: PILAR CAHAYA KEEMASAN AL-QUR'AN (Frame 160 - 378)
              Dibatasi dengan aman: Dimulai di Y=220 (TIDAK menabrak watermark)
             =============================================================== */}
          {isSacredPhase && (
            <g opacity={sacredPhaseProgress}>
              {/* Pilar Cahaya Keemasan yang Menjulang Tinggi (Y: 220 - 1520) */}
              <rect
                x="430"
                y="220"
                width="220"
                height="1300"
                fill="url(#sacredPillarGrad)"
                filter="url(#sacredGlow)"
              />
              <rect
                x="490"
                y="220"
                width="100"
                height="1300"
                fill="url(#sacredPillarGrad)"
              />
              {/* Garis Inti Putih Berkilau */}
              <line
                x1="540"
                y1="220"
                x2="540"
                y2="1520"
                stroke="#FFFFFF"
                strokeWidth="4"
                opacity="0.95"
              />

              {/* BINTANG ISLAMI 8 SUDUT (RUB-EL-HIZB) MEMANCARKAN CAHAYA EMAS */}
              <g
                transform={`translate(540, 430) rotate(${starRotation})`}
                filter="url(#sacredGlow)"
              >
                {/* Kotak Persegi 1 */}
                <rect
                  x="-55"
                  y="-55"
                  width="110"
                  height="110"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="4"
                  rx="6"
                />
                {/* Kotak Persegi 2 Diputar 45 Derajat */}
                <rect
                  x="-55"
                  y="-55"
                  width="110"
                  height="110"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="4"
                  rx="6"
                  transform="rotate(45)"
                />
                {/* Lingkaran Inti Bersinar */}
                <circle cx="0" cy="0" r="28" fill="#FEF08A" opacity="0.85" />
                <circle cx="0" cy="0" r="18" fill="#FFFFFF" />
              </g>

              {/* Partikel Emas Naik Mengalir ke Angkasa */}
              {goldenParticles.map((gp) => (
                <circle
                  key={`gp-${gp.id}`}
                  cx={gp.x}
                  cy={gp.y}
                  r={gp.size}
                  fill="#FDE68A"
                  opacity={gp.opacity}
                  filter="url(#sacredGlow)"
                />
              ))}
            </g>
          )}
        </svg>

        {/* ===================================================================
            HUD HEADER FASE 1: RISET OSEANOGRAFI (SAFE ZONE: TOP 230)
           =================================================================== */}
        {modernSonarOpacity > 0.1 && (
          <div
            style={{
              position: "absolute",
              top: 230,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: modernSonarOpacity,
              backgroundColor: "rgba(10, 20, 45, 0.94)",
              backdropFilter: "blur(14px)",
              padding: "16px 36px",
              borderRadius: 24,
              border: "1.5px solid rgba(45, 212, 191, 0.55)",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.65)",
              textAlign: "center",
              zIndex: 20,
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(45, 212, 191, 0.18)",
                border: "1px solid #2DD4BF",
                padding: "4px 18px",
                borderRadius: 14,
                color: "#2DD4BF",
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontFamily: FONTS.title,
                marginBottom: 6,
              }}
            >
              📡 TEKNOLOGI OSEANOGRAFI
            </div>
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: 34,
                fontWeight: 900,
                margin: 0,
                fontFamily: FONTS.title,
                textShadow: "0 4px 18px rgba(0,0,0,0.7)",
              }}
            >
              Pemetaan Sonar Kedalaman Laut
            </h2>
            <p
              style={{
                color: "#CBD5E1",
                fontSize: 16,
                fontWeight: 700,
                margin: "6px 0 0 0",
                fontFamily: FONTS.body,
              }}
            >
              Gelombang akustik mendeteksi batas kerapatan air laut
            </p>
          </div>
        )}

        {/* ===================================================================
            CARD SAKRAL FASE 2: SURAH AR-RAHMAN AYAT 19 & 20
            Posisi: Top 600, Center X: 540, Width: 860
           =================================================================== */}
        {isSacredPhase && (
          <div
            style={{
              position: "absolute",
              top: 590,
              left: "50%",
              transform: `translateX(-50%) scale(${surahCardSpring})`,
              opacity: sacredPhaseProgress,
              width: 860,
              backgroundColor: "rgba(10, 18, 42, 0.95)",
              backdropFilter: "blur(18px)",
              padding: "28px 46px",
              borderRadius: 30,
              border: "2.5px solid #F59E0B",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.85), 0 0 50px rgba(245, 158, 11, 0.45)",
              textAlign: "center",
              zIndex: 25,
            }}
          >
            {/* Badge Waktu */}
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(245, 158, 11, 0.2)",
                border: "1.5px solid #FBBF24",
                padding: "6px 22px",
                borderRadius: 16,
                color: "#FBBF24",
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: "3.5px",
                textTransform: "uppercase",
                fontFamily: FONTS.title,
                marginBottom: 10,
              }}
            >
              📖 TERTULIS SEJAK 14 ABAD SILAM
            </div>

            {/* Nama Surah */}
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: 48,
                fontWeight: 900,
                margin: "4px 0",
                fontFamily: FONTS.title,
                textShadow: "0 6px 25px rgba(0,0,0,0.8)",
                letterSpacing: "1px",
              }}
            >
              Surah Ar-Rahman
            </h2>

            {/* Nomor Ayat Pill */}
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(245, 158, 11, 0.28)",
                border: "1px solid rgba(253, 230, 138, 0.6)",
                color: "#FEF08A",
                padding: "6px 26px",
                borderRadius: 16,
                fontSize: 22,
                fontWeight: 900,
                fontFamily: FONTS.title,
                marginTop: 8,
                boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
              }}
            >
              Ayat 19 & 20
            </div>

            {/* Teaser Terjemahan Singkat */}
            <div
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: 17,
                fontWeight: 700,
                marginTop: 14,
                fontFamily: FONTS.body,
                lineHeight: 1.5,
              }}
            >
              "Dia membiarkan dua laut mengalir berdampingan... di antara keduanya ada batas."
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
