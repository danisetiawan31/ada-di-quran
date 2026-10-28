import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EP03_THEME } from "../theme";
import { PopElement } from "../../../src/components/PopElement";
import { CameraRig } from "../../../src/components/CameraRig";

export const Scene1SunDryingAndSpraying: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = EP03_THEME.colors;

  // ---------------------------------------------------------------------------
  // KAMERA & TRANSISI ZOOM / PAN (Sub-Scene 1A: 0-240, Sub-Scene 1B: 240-540)
  // ---------------------------------------------------------------------------
  const cameraZoom = interpolate(frame, [220, 260], [1.14, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [220, 260], [-50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // CONTINUOUS SECONDARY MOTION (Hukum "Layar Tidak Boleh Mati")
  // ---------------------------------------------------------------------------
  const sunPulse = 1 + Math.sin(frame / 14) * 0.05;
  const sunRaysRotate = (frame * 0.45) % 360;
  const seaWaves = Math.sin(frame / 16) * 10;
  const cloudOffset1 = (frame * 0.7) % 1500 - 300;
  const cloudOffset2 = ((frame * 0.5) + 650) % 1500 - 300;
  const palmSway = Math.sin(frame / 18) * 3.5;
  const smellWave = Math.sin(frame / 7) * 14;

  // ---------------------------------------------------------------------------
  // SUB-SCENE 1A: SEMPROTAN KABUT RACUN HIJAU (Frame 90 - 220)
  // ---------------------------------------------------------------------------
  const isSprayingA = frame >= 90 && frame < 220;
  const sprayProgressA = interpolate(frame, [90, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sprayCloudOpacity = isSprayingA
    ? interpolate(frame, [90, 110, 190, 220], [0, 0.88, 0.88, 0])
    : 0;

  // Kilauan bersih palsu pada ikan (Frame 180 - 240)
  const fakeCleanGleam = spring({
    frame: frame - 180,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // ---------------------------------------------------------------------------
  // SUB-SCENE 1B: LALAT MENDEKAT & TERPENTAL PUSING (Frame 240-540)
  // ---------------------------------------------------------------------------
  const flyApproachProgress = interpolate(frame, [240, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flyRepelProgress = interpolate(frame, [384, 430], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isRepelled = frame >= 384;
  const repelSprayOpacity = frame >= 384 && frame < 490
    ? interpolate(frame, [384, 400, 450, 490], [0, 0.92, 0.92, 0])
    : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0369A1",
        overflow: "hidden",
      }}
    >
      <CameraRig
        scale={cameraZoom}
        translateY={cameraPanY}
        whooshAtFrames={[240]}
      >
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Gradasi Langit Pesisir Siang Cerah */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="35%" stopColor="#38BDF8" />
              <stop offset="80%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>

            {/* Gradasi Matahari Terik */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
              <stop offset="40%" stopColor="#FACC15" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            {/* Gradasi Laut Pesisir */}
            <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="45%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>

            {/* Gradasi Pasir Pantai Hangat */}
            <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="35%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Gradasi Kabut Semprotan Racun Hijau Neon Beracun */}
            <radialGradient id="toxicCloudGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#4ADE80" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#22C55E" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
            </radialGradient>

            {/* Gradasi Kaleng Insektisida Bahaya */}
            <linearGradient id="canBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="30%" stopColor="#EF4444" />
              <stop offset="70%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>

            {/* Gradasi Anyaman Bilah Bambu */}
            <linearGradient id="bambooWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="40%" stopColor="#D97706" />
              <stop offset="80%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Bayangan Halus */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.35" />
            </filter>
            <filter id="glowToxic" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#4ADE80" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* =========================================================================
              LAYER 1: BACKGROUND ENVIRONMENT (Langit, Matahari, Laut, Pohon Kelapa)
             ========================================================================= */}
          {/* Langit Pesisir */}
          <rect x="0" y="0" width="1080" height="1100" fill="url(#skyGrad)" />

          {/* Matahari Terik Pesisir */}
          <g transform="translate(930, 220)">
            <g transform={`rotate(${sunRaysRotate})`}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="0"
                  y1="0"
                  x2={120 * Math.cos((angle * Math.PI) / 180)}
                  y2={120 * Math.sin((angle * Math.PI) / 180)}
                  stroke="#FDE047"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              ))}
            </g>
            <circle cx="0" cy="0" r="150" fill="url(#sunGlow)" transform={`scale(${sunPulse})`} />
            <circle cx="0" cy="0" r="56" fill="#FEF08A" stroke="#F59E0B" strokeWidth="4" />
          </g>

          {/* Awan Pesisir Bergerak Halus */}
          <g opacity="0.9">
            <g transform={`translate(${cloudOffset1}, 160)`}>
              <ellipse cx="140" cy="80" rx="95" ry="36" fill="#FFFFFF" opacity="0.9" />
              <ellipse cx="210" cy="65" rx="80" ry="44" fill="#FFFFFF" />
              <ellipse cx="280" cy="80" rx="70" ry="34" fill="#FFFFFF" opacity="0.95" />
            </g>
            <g transform={`translate(${cloudOffset2}, 270)`}>
              <ellipse cx="120" cy="70" rx="75" ry="30" fill="#FFFFFF" opacity="0.75" />
              <ellipse cx="180" cy="55" rx="65" ry="38" fill="#FFFFFF" opacity="0.85" />
              <ellipse cx="240" cy="70" rx="60" ry="28" fill="#FFFFFF" opacity="0.8" />
            </g>
          </g>

          {/* Laut Pesisir Bergelombang */}
          <path
            d={`M0 580 Q270 ${568 + seaWaves} 540 580 T1080 580 L1080 740 L0 740 Z`}
            fill="url(#seaGrad)"
          />
          <path
            d={`M0 620 Q270 ${612 - seaWaves} 540 620 T1080 620 L1080 740 L0 740 Z`}
            fill="#0284C7"
            opacity="0.65"
          />

          {/* Pasir Pantai Hangat */}
          <path
            d="M0 720 Q540 700 1080 730 L1080 1920 L0 1920 Z"
            fill="url(#sandGrad)"
          />

          {/* Siluet Pohon Kelapa Pesisir (Kiri) Berayun Lembut */}
          <g transform={`translate(-40, 320) rotate(${palmSway} 120 700)`}>
            <path
              d="M100 850 Q160 560 135 360 Q120 350 145 350 Q180 560 120 850 Z"
              fill="#78350F"
              stroke="#451A03"
              strokeWidth="4"
            />
            {/* Daun-daun Kelapa Hijau */}
            <path
              d="M135 355 Q30 320 -50 380 Q40 340 135 365"
              fill="none"
              stroke="#15803D"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M140 355 Q170 270 255 295 Q170 305 140 365"
              fill="none"
              stroke="#16A34A"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M140 355 Q80 250 10 260 Q80 275 140 365"
              fill="none"
              stroke="#15803D"
              strokeWidth="11"
              strokeLinecap="round"
            />
          </g>

          {/* =========================================================================
              LAYER 2: MIDGROUND — PARA-PARA BAMBU (POSISI OPTIMAL Y: 920 - 1220)
             ========================================================================= */}
          {/* Kaki-kaki Penyangga Para-Para Bambu Kokoh */}
          <g stroke="#78350F" strokeWidth="20" strokeLinecap="round">
            <line x1="150" y1="1040" x2="130" y2="1520" />
            <line x1="380" y1="1040" x2="360" y2="1520" />
            <line x1="700" y1="1040" x2="720" y2="1520" />
            <line x1="930" y1="1040" x2="950" y2="1520" />
            {/* Palang Penahan Silang Bambu */}
            <line x1="130" y1="1280" x2="950" y2="1280" strokeWidth="15" stroke="#92400E" />
            <line x1="160" y1="1440" x2="340" y2="1280" strokeWidth="9" stroke="#B45309" />
            <line x1="740" y1="1280" x2="910" y2="1440" strokeWidth="9" stroke="#B45309" />
          </g>

          {/* Meja Anyaman Bilah Bambu */}
          <g filter="url(#softShadow)">
            <rect
              x="70"
              y="930"
              width="940"
              height="160"
              rx="20"
              fill="url(#bambooWood)"
              stroke="#451A03"
              strokeWidth="7"
            />
            {/* Kisi-kisi Anyaman Bambu Tebal */}
            {Array.from({ length: 23 }).map((_, i) => (
              <line
                key={i}
                x1={100 + i * 40}
                y1="940"
                x2={100 + i * 40}
                y2="1080"
                stroke="#FDE68A"
                strokeWidth="5.5"
                opacity="0.8"
              />
            ))}
          </g>

          {/* -----------------------------------------------------------------------
              DERETAN IKAN ASIN (UKURAN BESAR & PROPORSI EMAS Y: 940 - 1050)
             ----------------------------------------------------------------------- */}
          <g id="salted-fishes">
            {/* Ikan Asin 1 (Kiri) */}
            <g transform="translate(130, 950) rotate(-6)">
              <polygon points="25,48 0,20 0,76" fill="#CBD5E1" stroke="#334155" strokeWidth="3.5" />
              <ellipse cx="105" cy="48" rx="86" ry="34" fill="#F1F5F9" stroke="#1E293B" strokeWidth="4.5" />
              <path d="M45 48 Q105 38 165 48" stroke="#94A3B8" strokeWidth="3.5" fill="none" />
              <path d="M70 32 Q105 48 140 32" stroke="#CBD5E1" strokeWidth="3" fill="none" />
              <path d="M70 64 Q105 48 140 64" stroke="#CBD5E1" strokeWidth="3" fill="none" />
              <circle cx="165" cy="42" r="6" fill="#0F172A" />
              <circle cx="167" cy="40" r="2" fill="#FFFFFF" />
            </g>

            {/* Ikan Asin 2 (Tengah Utama — Target Semprotan Oknum) */}
            <g transform="translate(420, 935)">
              <polygon points="25,52 0,22 0,82" fill="#E2E8F0" stroke="#1E293B" strokeWidth="4" />
              <ellipse cx="125" cy="52" rx="108" ry="40" fill="#F8FAFC" stroke="#0F172A" strokeWidth="5" />
              <path d="M50 52 Q125 38 200 52" stroke="#64748B" strokeWidth="4" fill="none" />
              <path d="M75 30 Q125 52 175 30" stroke="#94A3B8" strokeWidth="3.5" fill="none" />
              <path d="M75 74 Q125 52 175 74" stroke="#94A3B8" strokeWidth="3.5" fill="none" />
              {/* Butiran Kristal Garam */}
              <circle cx="105" cy="40" r="3" fill="#FFFFFF" />
              <circle cx="145" cy="58" r="2.5" fill="#FFFFFF" />
              <circle cx="170" cy="42" r="2.5" fill="#FFFFFF" />
              {/* Kepala & Mata Ikan */}
              <circle cx="205" cy="46" r="7" fill="#0F172A" />
              <circle cx="207" cy="44" r="2.5" fill="#FFFFFF" />

              {/* Kilauan Bersih Palsu saat Disemprot (Frame 180+) */}
              {fakeCleanGleam > 0 && (
                <g opacity={fakeCleanGleam}>
                  {/* Kilau Bintang Emas */}
                  <path
                    d="M130 0 L135 18 L155 22 L135 26 L130 44 L125 26 L105 22 L125 18 Z"
                    fill="#FEF08A"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    transform="scale(0.9) translate(30, -10)"
                  />
                  {/* Kilau Bintang Biru */}
                  <path
                    d="M185 10 L188 24 L202 27 L188 30 L185 44 L182 30 L168 27 L182 24 Z"
                    fill="#38BDF8"
                    stroke="#0284C7"
                    strokeWidth="2"
                    transform="scale(0.75) translate(65, 0)"
                  />
                </g>
              )}
            </g>

            {/* Ikan Asin 3 (Kanan) */}
            <g transform="translate(740, 952) rotate(4)">
              <polygon points="25,48 0,20 0,76" fill="#CBD5E1" stroke="#334155" strokeWidth="3.5" />
              <ellipse cx="105" cy="48" rx="86" ry="34" fill="#F1F5F9" stroke="#1E293B" strokeWidth="4.5" />
              <path d="M45 48 Q105 38 165 48" stroke="#94A3B8" strokeWidth="3.5" fill="none" />
              <circle cx="165" cy="42" r="6" fill="#0F172A" />
              <circle cx="167" cy="40" r="2" fill="#FFFFFF" />
            </g>
          </g>

          {/* -----------------------------------------------------------------------
              GELOMBANG AROMA AMIS DI UDARA (Frame 240-384)
             ----------------------------------------------------------------------- */}
          {frame >= 240 && frame < 390 && (
            <g opacity={interpolate(frame, [240, 260, 360, 384], [0, 0.8, 0.8, 0])}>
              <path
                d={`M460 900 Q${470 + smellWave} 800 450 700 T${480 + smellWave} 580`}
                fill="none"
                stroke="#64748B"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray="10 12"
              />
              <path
                d={`M560 880 Q${540 - smellWave} 780 570 680 T${540 - smellWave} 560`}
                fill="none"
                stroke="#94A3B8"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray="8 10"
              />
              <path
                d={`M660 910 Q${680 + smellWave} 820 650 720 T${670 + smellWave} 600`}
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="6 8"
              />
            </g>
          )}

          {/* -----------------------------------------------------------------------
              LALAT-LALAT KARTUN TERBANG MENDEKAT & TERPENTAL (Frame 240-540)
             ----------------------------------------------------------------------- */}
          {frame >= 240 && (
            <g id="flies-group">
              {/* Lalat 1 (Kiri) */}
              {(() => {
                const flyX = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [460, 140])
                  : interpolate(flyApproachProgress, [0, 1], [200, 460]);
                const flyY = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [820, 640])
                  : interpolate(flyApproachProgress, [0, 1], [620, 820]) + Math.sin(frame / 4) * 16;
                const flyAngle = isRepelled ? (frame * 24) % 360 : Math.sin(frame / 6) * 20;
                const wingFlap = Math.sin(frame * 1.8) * 20;

                return (
                  <g transform={`translate(${flyX}, ${flyY}) rotate(${flyAngle})`} filter="url(#softShadow)">
                    <ellipse cx="-10" cy={-16 + wingFlap} rx="15" ry="9" fill="#E0F2FE" opacity="0.8" stroke="#38BDF8" strokeWidth="2" />
                    <ellipse cx="10" cy={-16 - wingFlap} rx="15" ry="9" fill="#E0F2FE" opacity="0.8" stroke="#38BDF8" strokeWidth="2" />
                    <ellipse cx="0" cy="0" rx="18" ry="13" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
                    <circle cx="12" cy="-2" r="9" fill="#7F1D1D" stroke="#0F172A" strokeWidth="2" />
                    {isRepelled ? (
                      /* Spiral Pusing (Path Vektor Murni — Sesuai Rule 11) */
                      <path
                        d="M12 -2 m-3,0 a3,3 0 1,0 6,0 a6,6 0 1,0 -12,0"
                        fill="none"
                        stroke="#FEF08A"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    ) : (
                      <circle cx="14" cy="-3" r="3.5" fill="#EF4444" />
                    )}
                  </g>
                );
              })()}

              {/* Lalat 2 (Kanan) */}
              {(() => {
                const flyX = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [640, 920])
                  : interpolate(flyApproachProgress, [0, 1], [860, 640]);
                const flyY = isRepelled
                  ? interpolate(flyRepelProgress, [0, 1], [860, 680])
                  : interpolate(flyApproachProgress, [0, 1], [660, 860]) + Math.sin(frame / 5) * 15;
                const flyAngle = isRepelled ? -(frame * 22) % 360 : -Math.sin(frame / 6) * 18;
                const wingFlap = Math.cos(frame * 1.8) * 18;

                return (
                  <g transform={`translate(${flyX}, ${flyY}) rotate(${flyAngle})`} filter="url(#softShadow)">
                    <ellipse cx="-9" cy={-14 + wingFlap} rx="14" ry="8" fill="#E0F2FE" opacity="0.8" stroke="#38BDF8" strokeWidth="2" />
                    <ellipse cx="9" cy={-14 - wingFlap} rx="14" ry="8" fill="#E0F2FE" opacity="0.8" stroke="#38BDF8" strokeWidth="2" />
                    <ellipse cx="0" cy="0" rx="16" ry="12" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
                    <circle cx="-10" cy="-2" r="8" fill="#7F1D1D" stroke="#0F172A" strokeWidth="2" />
                    <circle cx="-11" cy="-3" r="3" fill="#EF4444" />
                  </g>
                );
              })()}
            </g>
          )}

          {/* -----------------------------------------------------------------------
              KABUT PARTIKEL SEMPROTAN RACUN HIJAU (Sub-Scene 1A & 1B)
             ----------------------------------------------------------------------- */}
          {/* Kabut Semprotan Pertama (Frame 90 - 220) */}
          {sprayCloudOpacity > 0 && (
            <g opacity={sprayCloudOpacity} filter="url(#glowToxic)">
              {/* Semburan Kerucut Awal dari Nozel Kaleng */}
              <path
                d="M320 620 Q440 700 560 840 Q460 960 330 890 Z"
                fill="url(#toxicCloudGrad)"
              />
              {/* Partikel Gumpalan Racun Menyelimuti Ikan */}
              <circle cx="500" cy="880" r={100 * sprayProgressA} fill="url(#toxicCloudGrad)" />
              <circle cx="620" cy="920" r={130 * sprayProgressA} fill="url(#toxicCloudGrad)" />
              <circle cx="740" cy="880" r={110 * sprayProgressA} fill="url(#toxicCloudGrad)" />
              {/* Bintik Tetesan Racun Kimia Halus */}
              <circle cx="460" cy="840" r="9" fill="#86EFAC" />
              <circle cx="550" cy="910" r="11" fill="#4ADE80" />
              <circle cx="660" cy="870" r="10" fill="#86EFAC" />
              <circle cx="720" cy="940" r="8" fill="#BBF7D0" />
            </g>
          )}

          {/* Kabut Semprotan Kedua Menghempaskan Lalat (Frame 384 - 490) */}
          {repelSprayOpacity > 0 && (
            <g opacity={repelSprayOpacity} filter="url(#glowToxic)">
              <circle cx="540" cy="780" r={160} fill="url(#toxicCloudGrad)" />
              <circle cx="380" cy="740" r={130} fill="url(#toxicCloudGrad)" />
              <circle cx="700" cy="740" r={130} fill="url(#toxicCloudGrad)" />
            </g>
          )}

          {/* =========================================================================
              LAYER 3: FOREGROUND — TANGAN OKNUM & KALENG SEMPROT RACUN (Frame 15 - 240)
              MENGGUNAKAN as="g" AGAR ELEMEN SVG VALID DAN TAMPIL 100%
             ========================================================================= */}
          {frame < 240 && (
            <PopElement as="g" startFrame={15} sfxType="whip" volume={0.22}>
              <g id="hand-spray-can" transform="translate(140, 440)" filter="url(#softShadow)">
                {/* Lengan Baju Siluet Oknum Nakal (Kiri Atas) */}
                <path
                  d="M-80 180 Q-10 100 110 90 L130 150 Q40 180 -30 260 Z"
                  fill="#1E293B"
                  stroke="#0F172A"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />

                {/* Telapak Tangan Memegang Kaleng */}
                <ellipse cx="140" cy="115" rx="32" ry="26" fill="#D98A52" stroke="#12233F" strokeWidth="4.5" />
                {/* Jari Telunjuk Menekan Nozel Semprot */}
                <rect x="130" y="55" width="22" height="40" rx="10" fill="#D98A52" stroke="#12233F" strokeWidth="4.5" />

                {/* -------------------------------------------------------------------
                    KALENG SEMPROT INSEKTISIDA MERAH-HITAM (IKON TENGKORAK MURNI)
                   ------------------------------------------------------------------- */}
                <g id="spray-can" transform="translate(130, 40) rotate(-22)">
                  {/* Nozel Semprot Hitam Mengarah ke Ikan */}
                  <rect x="22" y="-22" width="18" height="26" rx="5" fill="#0F172A" stroke="#12233F" strokeWidth="3.5" />
                  <path d="M40 -16 L54 -16 L54 -8 L40 -8 Z" fill="#EF4444" />

                  {/* Kubah Atas Kaleng */}
                  <ellipse cx="32" cy="4" rx="42" ry="15" fill="#DC2626" stroke="#12233F" strokeWidth="4.5" />

                  {/* Tabung Kaleng Semprot Silinder Besar */}
                  <rect
                    x="-10"
                    y="4"
                    width="84"
                    height="230"
                    rx="10"
                    fill="url(#canBodyGrad)"
                    stroke="#12233F"
                    strokeWidth="5.5"
                  />

                  {/* Strip Hitam Bahaya di Tengah Kaleng */}
                  <rect x="-10" y="65" width="84" height="85" fill="#0F172A" />

                  {/* IKON TENGKORAK BAHAYA KIMIA MURNI (Sesuai Rule 11 & Batasan Brief) */}
                  <g transform="translate(32, 108)">
                    <circle cx="0" cy="-7" r="17" fill="#FFFFFF" stroke="#12233F" strokeWidth="2.5" />
                    <rect x="-10" y="5" width="20" height="12" rx="4" fill="#FFFFFF" stroke="#12233F" strokeWidth="2.5" />
                    <ellipse cx="-6" cy="-7" rx="4" ry="5.5" fill="#0F172A" />
                    <ellipse cx="6" cy="-7" rx="4" ry="5.5" fill="#0F172A" />
                    <polygon points="0,0 -2.5,5 2.5,5" fill="#0F172A" />
                    <line x1="-5" y1="10" x2="-5" y2="16" stroke="#0F172A" strokeWidth="2" />
                    <line x1="0" y1="10" x2="0" y2="16" stroke="#0F172A" strokeWidth="2" />
                    <line x1="5" y1="10" x2="5" y2="16" stroke="#0F172A" strokeWidth="2" />
                  </g>

                  {/* Dasar Bawah Kaleng */}
                  <ellipse cx="32" cy="234" rx="42" ry="15" fill="#7F1D1D" stroke="#12233F" strokeWidth="4.5" />
                </g>
              </g>
            </PopElement>
          )}

          {/* =========================================================================
              BADGE INFO POP-UP: SILANG BELATUNG & BAHAYA KIMIA (Frame 390 - 540)
              MENGGUNAKAN as="g" AGAR ELEMEN TAMPIL SOLID DI DALAM SVG
             ========================================================================= */}
          {frame >= 390 && (
            <PopElement as="g" startFrame={390} sfxType="whip" volume={0.22}>
              <g transform="translate(540, 520)" filter="url(#softShadow)">
                {/* Lingkaran Luar Badge Merah Bahaya */}
                <circle cx="0" cy="0" r="130" fill="#0F172A" stroke="#EF4444" strokeWidth="9" />
                <circle cx="0" cy="0" r="112" fill="#FEF2F2" />

                {/* Ilustrasi Lalat/Belatung Disilang Merah Tebal */}
                <g transform="translate(0, -12)">
                  <ellipse cx="-18" cy="6" rx="24" ry="16" fill="#334155" />
                  <circle cx="8" cy="2" r="11" fill="#DC2626" />
                  <ellipse cx="-24" cy="-16" rx="18" ry="10" fill="#BAE6FD" opacity="0.85" />
                  {/* TANDA SILANG MERAH BESAR (X) */}
                  <line x1="-65" y1="-65" x2="65" y2="65" stroke="#DC2626" strokeWidth="18" strokeLinecap="round" />
                  <line x1="65" y1="-65" x2="-65" y2="65" stroke="#DC2626" strokeWidth="18" strokeLinecap="round" />
                </g>

                {/* Ikon Bahaya Tengkorak Kecil di Bawah */}
                <g transform="translate(0, 62) scale(0.95)">
                  <circle cx="0" cy="-5" r="12" fill="#EF4444" />
                  <rect x="-7" y="5" width="14" height="8" rx="2" fill="#EF4444" />
                  <circle cx="-4" cy="-5" r="3" fill="#FFFFFF" />
                  <circle cx="4" cy="-5" r="3" fill="#FFFFFF" />
                </g>
              </g>
            </PopElement>
          )}
        </svg>
      </CameraRig>
    </AbsoluteFill>
  );
};
