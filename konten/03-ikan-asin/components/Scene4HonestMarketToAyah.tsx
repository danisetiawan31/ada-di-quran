import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { EP03_THEME } from "../theme";
import { PopElement } from "../../../src/components/PopElement";
import { CameraRig } from "../../../src/components/CameraRig";
import {
  MainCharacter,
  CharacterPose,
} from "../../../src/components/characters/MainCharacter";

export const Scene4HonestMarketToAyah: React.FC = () => {
  const frame = useCurrentFrame();
  const c = EP03_THEME.colors;

  // ---------------------------------------------------------------------------
  // KAMERA & TRANSISI (Frame 1080 - 1365 global | Frame 0 - 285 lokal)
  // ---------------------------------------------------------------------------
  const cameraZoom = interpolate(frame, [130, 165], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanY = interpolate(frame, [130, 165], [0, -25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Efek blur lembut di 15 frame terakhir untuk transisi mulus ke AyahCard
  const endBlur = interpolate(frame, [270, 285], [0, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ---------------------------------------------------------------------------
  // CONTINUOUS SECONDARY MOTION (Sinar Pagi, Kilau Garam, & Partikel Emas)
  // ---------------------------------------------------------------------------
  const sunPulse = 1 + Math.sin(frame / 6) * 0.04;
  const rayRotate = (frame * 0.8) % 360;
  const awningWave = Math.sin(frame / 8) * 3;
  const sparklePulse = 0.85 + Math.sin(frame / 4) * 0.25;

  const charLeft = interpolate(frame, [130, 155], [400, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hostPose: CharacterPose =
    frame < 60 ? "sedih" : frame < 135 ? "calming" : "pointing";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.morningGold,
        overflow: "hidden",
        filter: endBlur > 0 ? `blur(${endBlur}px)` : undefined,
      }}
    >
      <CameraRig
        zoom={cameraZoom}
        panY={cameraPanY}
        whooshAtFrames={[0]} // Transisi masuk dari Scene 3
      >
        {/* =========================================================================
            LAYER 1: BACKGROUND PASAR PAGI ISLAMI (LANGIT CERAH & TENDA KIOS)
           ========================================================================= */}
        <svg
          viewBox="0 0 1080 1920"
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="morningSkyGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>

            <linearGradient id="marketCounterGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="50%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            <linearGradient id="groundGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="60%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <filter id="badgeShadow2" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#0F172A" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Langit Pagi Hangat */}
          <rect x="0" y="0" width="1080" height="1240" fill="url(#morningSkyGrad2)" />

          {/* Sinar Matahari Pagi Lembut dari Kiri Atas */}
          <g opacity="0.32">
            <polygon points="0,0 260,0 620,1240 0,1240" fill="#FEF08A" />
            <polygon points="300,0 520,0 960,1240 420,1240" fill="#FEF9C3" />
          </g>

          {/* Kanopi Tenda Pasar (Stripes Hijau Emerald & Putih Bersih) */}
          <g transform={`translate(0, ${awningWave})`}>
            {/* Bagian Atas Kanopi */}
            <path
              d="M0 0 L1080 0 L1080 180 L0 180 Z"
              fill="#047857"
            />
            {/* Garis-garis Salur Putih pada Kanopi */}
            {[0, 180, 360, 540, 720, 900, 1080].map((x) => (
              <polygon
                key={x}
                points={`${x},0 ${x + 90},0 ${x + 80},180 ${x - 10},180`}
                fill="#F8FAFC"
              />
            ))}
            {/* Rumbai Gelombang Tenda (Scallops) */}
            <path
              d="M0 180 Q45 220 90 180 Q135 220 180 180 Q225 220 270 180 Q315 220 360 180 Q405 220 450 180 Q495 220 540 180 Q585 220 630 180 Q675 220 720 180 Q765 220 810 180 Q855 220 900 180 Q945 220 990 180 Q1035 220 1080 180"
              fill="#047857"
              stroke="#065F46"
              strokeWidth="4"
            />
            {/* Bayangan di Bawah Kanopi Tenda */}
            <rect x="0" y="195" width="1080" height="25" fill="#000000" opacity="0.12" />
          </g>

          {/* Tiang Penyangga Kios Pasar */}
          <rect x="50" y="180" width="18" height="1060" fill="#78350F" opacity="0.4" />
          <rect x="1010" y="180" width="18" height="1060" fill="#78350F" opacity="0.4" />

          {/* Lantai / Tanah Area Pasar */}
          <rect x="0" y="1240" width="1080" height="680" fill="url(#groundGrad2)" />
          <line x1="0" y1="1240" x2="1080" y2="1240" stroke="#78350F" strokeWidth="8" />
        </svg>

        {/* =========================================================================
            LAYER 2: MASKOT BERBAJU KOKO MODERN (DYNAMIC HOST POSITION)
           ========================================================================= */}
        <div
          style={{
            position: "absolute",
            top: 755,
            left: charLeft,
            width: 280,
            height: 560,
            zIndex: 10,
          }}
        >
          <MainCharacter
            pose={hostPose}
            scale={1.70}
            hairStyle="peci"
            outfitType="koko"
            hasGlasses={true}
            breathe={true}
            blink={true}
          />
        </div>

        {/* =========================================================================
            LAYER 3: MEJA PASAR & DUA KELOMPOK IKAN (CURANG VS JUJUR)
           ========================================================================= */}
        <div
          style={{
            position: "absolute",
            top: 890,
            left: 0,
            width: "100%",
            zIndex: 15,
          }}
        >
          <svg viewBox="0 0 1080 350" width="100%" height="350">
            <defs>
              <linearGradient id="tableGradFg7" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#92400E" />
                <stop offset="50%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
              <filter id="tableShadowFg7" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#0F172A" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Kaki Meja Pasar */}
            <rect x="90" y="220" width="55" height="130" fill="#78350F" stroke="#451A03" strokeWidth="6" />
            <rect x="935" y="220" width="55" height="130" fill="#78350F" stroke="#451A03" strokeWidth="6" />

            {/* Permukaan Meja Kayu Pasar Penuh */}
            <g filter="url(#tableShadowFg7)">
              <rect
                x="40"
                y="10"
                width="1000"
                height="220"
                rx="28"
                fill="url(#tableGradFg7)"
                stroke="#451A03"
                strokeWidth="7"
              />
            </g>

            {/* ---------------------------------------------------------------------
                A. NAMPAN KIRI: IKAN ASIN CURANG / BERACUN (OKNUM NAKAL)
               --------------------------------------------------------------------- */}
            <g transform="translate(220, 105)">
              {/* Nampan Bambu Gelap */}
              <ellipse cx="0" cy="0" rx="145" ry="52" fill="#D97706" stroke="#92400E" strokeWidth="4.5" />
              <ellipse cx="0" cy="0" rx="120" ry="40" fill="#B45309" />

              {/* Ikan Asin Kimia (Warna Kusam Kehijauan Beracun) */}
              <g transform="translate(-30, -5) rotate(-8)">
                <path
                  d="M-55 0 C-35 -18 18 -18 55 0 C18 18 -35 18 -55 0 Z"
                  fill="#86EFAC"
                  stroke="#15803D"
                  strokeWidth="3.5"
                />
                <polygon points="55,0 72,-12 66,0 72,12" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
                <circle cx="-32" cy="-3" r="3" fill="#14532D" />
              </g>

              <g transform="translate(30, 8) rotate(10)">
                <path
                  d="M-55 0 C-35 -18 18 -18 55 0 C18 18 -35 18 -55 0 Z"
                  fill="#BBF7D0"
                  stroke="#15803D"
                  strokeWidth="3.5"
                />
                <polygon points="55,0 72,-12 66,0 72,12" fill="#4ADE80" stroke="#15803D" strokeWidth="2.5" />
                <circle cx="-32" cy="-3" r="3" fill="#14532D" />
              </g>
            </g>

            {/* ---------------------------------------------------------------------
                B. NAMPAN KANAN: IKAN ASIN JUJUR & HIGIENIS (GARAM ALAMI)
               --------------------------------------------------------------------- */}
            <g transform="translate(860, 105)">
              {/* Nampan Bambu Anyaman Terang */}
              <ellipse cx="0" cy="0" rx="145" ry="52" fill="#FDE68A" stroke="#D97706" strokeWidth="4.5" />
              <ellipse cx="0" cy="0" rx="120" ry="40" fill="#FEF3C7" />

              {/* Ikan Asin Segar Alami (Warna Perak Emas Bersih) */}
              <g transform="translate(-30, -5) rotate(-6)">
                <path
                  d="M-55 0 C-35 -18 18 -18 55 0 C18 18 -35 18 -55 0 Z"
                  fill="#F1F5F9"
                  stroke="#64748B"
                  strokeWidth="3.5"
                />
                <polygon points="55,0 72,-12 66,0 72,12" fill="#E2E8F0" stroke="#64748B" strokeWidth="2.5" />
                <circle cx="-32" cy="-3" r="3" fill="#1E293B" />
              </g>

              <g transform="translate(30, 8) rotate(8)">
                <path
                  d="M-55 0 C-35 -18 18 -18 55 0 C18 18 -35 18 -55 0 Z"
                  fill="#FFFFFF"
                  stroke="#64748B"
                  strokeWidth="3.5"
                />
                <polygon points="55,0 72,-12 66,0 72,12" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
                <circle cx="-32" cy="-3" r="3" fill="#1E293B" />
              </g>

              {/* Kristal Garam Laut Putih Alami Berkilau */}
              <g fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" opacity={sparklePulse}>
                <polygon points="-40,-10 -36,-17 -32,-10 -36,-3" />
                <polygon points="10,-15 13,-22 16,-15 13,-8" />
                <polygon points="55,-8 58,-14 61,-8 58,-2" />
                <circle cx="-8" cy="10" r="2.8" />
                <circle cx="25" cy="12" r="3" />
              </g>
            </g>
          </svg>
        </div>

        {/* =========================================================================
            LAYER 4: POP BADGES (SEGEL MERAH LARANGAN VS BADGE HIJAU HALAL)
           ========================================================================= */}
        {/* Badge 1: Segel Merah Larangan Curang di Atas Nampan Kiri (Frame 15+) */}
        {frame >= 15 && frame < 135 && (
          <div
            style={{
              position: "absolute",
              top: 830,
              left: 140,
              width: 160,
              height: 160,
              zIndex: 25,
            }}
          >
            <PopElement startFrame={15} sfxType="whip" volume={0.22} tilt={-10}>
              <svg viewBox="-80 -80 160 160" width="160" height="160">
                <circle cx="0" cy="0" r="68" fill="#FEE2E2" stroke="#EF4444" strokeWidth="12" />
                <line x1="-48" y1="-48" x2="48" y2="48" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" />
                <polygon points="0,-32 26,14 -26,14" fill="#DC2626" />
                <circle cx="0" cy="6" r="2.5" fill="#FFFFFF" />
                <line x1="0" y1="-18" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </PopElement>
          </div>
        )}

        {/* Badge 2: Perisai Halal & Aman di Atas Nampan Kanan (Frame 45+) */}
        {frame >= 45 && frame < 135 && (
          <div
            style={{
              position: "absolute",
              top: 830,
              left: 780,
              width: 160,
              height: 160,
              zIndex: 25,
            }}
          >
            <PopElement startFrame={45} sfxType="ding" volume={0.25} tilt={8}>
              <svg viewBox="-80 -80 160 160" width="160" height="160">
                <path
                  d="M0 -65 L52 -36 C52 20 28 54 0 68 C-28 54 -52 20 -52 -36 Z"
                  fill="#10B981"
                  stroke="#059669"
                  strokeWidth="6"
                />
                <path
                  d="M0 -55 L42 -30 C42 16 22 44 0 56 C-22 44 -42 16 -42 -30 Z"
                  fill="#ECFDF5"
                />
                <path
                  d="M-22 2 L-6 18 L26 -16"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </PopElement>
          </div>
        )}

        {/* =========================================================================
            LAYER 5: TRANSISI PREAMBLE AYAT AL-QUR'AN (FRAME 135 - 240)
            "sudah dilarang keras di dalam Al-Qur'an, Surah Asy-Syu'ara ayat 183."
            Split-Screen di sisi kanan (top: 360, left: 490, width: 550, height: 480)
           ========================================================================= */}
        {frame >= 135 && (
          <div
            style={{
              position: "absolute",
              top: 360,
              left: 490,
              width: 550,
              height: 480,
              zIndex: 35,
            }}
          >
            <PopElement
              startFrame={135}
              sfxType="whoosh"
              volume={0.25}
              tilt={0}
              style={{ width: "100%", height: "100%" }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 32,
                  background:
                    "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #064E3B 100%)",
                  border: "5px solid #F59E0B",
                  boxShadow:
                    "0 24px 50px rgba(15, 23, 42, 0.7), 0 0 40px rgba(245, 158, 11, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px 28px",
                  position: "relative",
                  boxSizing: "border-box",
                }}
              >
                {/* SVG Pijar Bintang Delapan Rub El Hizb */}
                <svg
                  width="110"
                  height="110"
                  viewBox="-60 -60 120 120"
                  style={{
                    overflow: "visible",
                    transform: `scale(${sunPulse})`,
                    marginBottom: 12,
                  }}
                >
                  <defs>
                    <filter id="mushafGlow2" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="16"
                        floodColor="#F59E0B"
                        floodOpacity="0.9"
                      />
                    </filter>
                  </defs>

                  {/* Sinar Emas Berputar */}
                  <g transform={`rotate(${rayRotate})`} opacity="0.4">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                      <line
                        key={angle}
                        x1="0"
                        y1="0"
                        x2={Math.cos((angle * Math.PI) / 180) * 55}
                        y2={Math.sin((angle * Math.PI) / 180) * 55}
                        stroke="#FDE68A"
                        strokeWidth="3"
                        strokeDasharray="4 4"
                      />
                    ))}
                  </g>

                  {/* Bintang Rub El Hizb Ganda */}
                  <g filter="url(#mushafGlow2)">
                    <rect
                      x="-34"
                      y="-34"
                      width="68"
                      height="68"
                      rx="7"
                      fill="#D97706"
                      stroke="#FEF3C7"
                      strokeWidth="2.5"
                    />
                    <rect
                      x="-34"
                      y="-34"
                      width="68"
                      height="68"
                      rx="7"
                      fill="#B45309"
                      stroke="#FDE68A"
                      strokeWidth="2.5"
                      transform="rotate(45)"
                    />
                    <circle cx="0" cy="0" r="21" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="15" fill="#FEF3C7" />
                    <path
                      d="M-8 -3 C-4 -6 0 -5 0 -2 L0 7 C0 4 -4 2 -8 5 Z"
                      fill="#92400E"
                    />
                    <path
                      d="M8 -3 C4 -6 0 -5 0 -2 L0 7 C0 4 4 2 8 5 Z"
                      fill="#78350F"
                    />
                  </g>
                </svg>

                {/* Teks Preamble Ayat Al-Qur'an (HTML/CSS Bersih) */}
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: 4,
                    color: "#FDE68A",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Peringatan Al-Qur'an
                </div>

                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 900,
                    color: "#FFFFFF",
                    textAlign: "center",
                    lineHeight: 1.25,
                    textShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    marginBottom: 12,
                  }}
                >
                  QS. Asy-Syu'ara (26): 183
                </div>

                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 20px",
                    borderRadius: 999,
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    border: "1.5px solid #F59E0B",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#FEF3C7",
                    textAlign: "center",
                  }}
                >
                  Larangan Merugikan Hak Manusia
                </div>
              </div>
            </PopElement>
          </div>
        )}
      </CameraRig>
    </AbsoluteFill>
  );
};
