import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
} from "remotion";
import { EP03_THEME } from "../theme";
import { PopElement } from "../../../src/components/PopElement";
import { CameraRig } from "../../../src/components/CameraRig";
import { MainCharacter } from "../../../src/components/characters/MainCharacter";

export const Scene3MedicalLiverKidney: React.FC = () => {
  const frame = useCurrentFrame();
  const c = EP03_THEME.colors;

  // ---------------------------------------------------------------------------
  // KAMERA & TRANSISI (Frame 885 - 1080 global | Frame 0 - 195 lokal)
  // ---------------------------------------------------------------------------
  // Transisi halus intensitas roll & wobble pusing saat narator berucap "memicu mual, pusing" (Frame 65 - 125)
  const dizzyIntensity = interpolate(frame, [65, 75, 115, 125], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Cinematic camera dizzy roll & wobble: rotate: Math.sin(frame * 0.25) * 4deg
  const cameraRotation = dizzyIntensity * Math.sin(frame * 0.25) * 4;
  const dizzyPanX = dizzyIntensity * Math.cos(frame * 0.25) * 6;
  const dizzyPanY = dizzyIntensity * Math.sin(frame * 0.18) * 4;

  // Zoom punch-in halus: sedikit antisipasi saat pusing lalu merapat saat organ rusak (frame 115+)
  const cameraZoom = interpolate(frame, [65, 80, 115, 145], [1.0, 1.04, 1.04, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const basePanY = interpolate(frame, [115, 145], [0, -15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cameraPanY = basePanY + dizzyPanY;
  const cameraPanX = dizzyPanX;

  // ---------------------------------------------------------------------------
  // CONTINUOUS SECONDARY MOTION (Denyut Bahaya Organ & Efek Mual Pusing)
  // ---------------------------------------------------------------------------
  const organPulse = 1 + Math.sin(frame / 4.5) * 0.05;
  const toxicPulse = 1 + Math.sin(frame / 3) * 0.14;
  const sunbeamPulse = 0.22 + Math.sin(frame / 20) * 0.04;
  const charWobbleX = Math.sin(frame * 0.22) * 3.5;

  // ---------------------------------------------------------------------------
  // PROGRES PENEMPELAN PARTIKEL RACUN & PULSING RED DANGER ALERT GLOW
  // Toksin mulai mengalir dan menempel ke hati & ginjal (Frame 35 - 75)
  // ---------------------------------------------------------------------------
  const toxinAttachProgress = interpolate(frame, [35, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Skala penempelan partikel racun elastis saat mendarat
  const liverParticleScale = spring({
    frame: frame - 38,
    fps: 30,
    config: { damping: 12, stiffness: 140 },
  });
  const kidneyParticleScale = spring({
    frame: frame - 48,
    fps: 30,
    config: { damping: 12, stiffness: 140 },
  });

  // Pulsing red danger alert glow aktif saat partikel racun menempel
  const dangerAlertPulse = 0.5 + Math.sin(frame * 0.3) * 0.5;
  const dangerGlowStd = interpolate(frame, [35, 65, 110, 130], [2, 14, 16, 24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dangerGlowOpacity = toxinAttachProgress * (0.5 + dangerAlertPulse * 0.45);

  // ---------------------------------------------------------------------------
  // KALKULASI TITIK PIJAKAN KARAKTER (R1 & R3)
  // Sole of shoes is at Y = 516 inside MainCharacter (560px box).
  // Distance from bottom (560 - 516) = 44px.
  // With scale = 1.28, scaled distance = 44 * 1.28 = 56.3px.
  // We want soles planted firmly at Floor Baseboard Y = 1360.
  // Therefore charTop = 1360 - 560 + 56 = 856px!
  // ---------------------------------------------------------------------------
  const charScale = 1.28;
  const charTop = 856;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.roomWarmCream,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      <CameraRig
        zoom={cameraZoom}
        panX={cameraPanX}
        panY={cameraPanY}
        rotation={cameraRotation}
        whooshAtFrames={[0]} // Transisi mulus masuk dari Scene 2
      >
        {/* =========================================================================
            LAYER 1: BACKGROUND RUANGAN TERANG & HANGAT (R3)
            (Dinding Krem Cerah, Jendela Sinar Matahari, Plin Dinding, Lantai Kayu Y: 1360)
            Ukuran kanvas diberi margin bleed (-50px) agar anti-clipping saat zoom (SSOT Rule #12).
           ========================================================================= */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            right: -60,
            bottom: -60,
            pointerEvents: "none",
          }}
        >
          {/* Dinding Krem Lembut Hangat (Y: -60 s/d 1360) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1420,
              background: "linear-gradient(180deg, #FFFDF8 0%, #FEF8EC 45%, #FDF2DA 100%)",
            }}
          />

          {/* Jendela Ruangan dengan Gradien Sinar Matahari Pagi (Kiri Atas) */}
          <div
            style={{
              position: "absolute",
              top: 200,
              left: 170,
              width: 250,
              height: 320,
              borderRadius: 20,
              backgroundColor: "#BAE6FD",
              border: "10px solid #FFFFFF",
              boxShadow: "0 14px 35px rgba(0,0,0,0.06), inset 0 0 40px rgba(255,255,255,0.7)",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            {/* Langit Biru Terang & Sinar Mentari Hangat */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, #7DD3FC 0%, #BAE6FD 45%, #FEF08A 100%)",
                position: "relative",
              }}
            >
              {/* Siluet Awan Halus Melayang */}
              <div
                style={{
                  position: "absolute",
                  top: 50,
                  left: 20 + Math.sin(frame / 50) * 10,
                  width: 90,
                  height: 30,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 20,
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 36,
                  left: 45 + Math.sin(frame / 50) * 10,
                  width: 44,
                  height: 44,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "50%",
                  opacity: 0.9,
                }}
              />

              {/* Kusen Jendela Kayu Putih Minimalis */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  width: 6,
                  backgroundColor: "#FFFFFF",
                  transform: "translateX(-50%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50%",
                  height: 6,
                  backgroundColor: "#FFFFFF",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </div>

          {/* Sorotan Berkas Cahaya Matahari Halus (Sunbeam) ke Lantai */}
          <svg
            style={{
              position: "absolute",
              top: 520,
              left: 170,
              width: 450,
              height: 900,
              zIndex: 2,
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            <polygon
              points="0,0 250,0 450,900 0,900"
              fill="#FEF9C3"
              opacity={sunbeamPulse}
            />
          </svg>

          {/* Tanaman Hias Hijau Aesthetic di Sudut Kiri Menambah Realisme Panggung (Menapak Kokoh di Lantai Y: 1360) */}
          <div
            style={{
              position: "absolute",
              top: 1130, // 1420 (lantai Y: 1360 + 60 bleed) - 290 (tinggi total tanaman & pot) = 1130
              left: 70,
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <svg width="150" height="190" viewBox="0 0 150 190" style={{ marginBottom: -10, overflow: "visible" }}>
              <path d="M 75 160 Q 40 100 30 55 C 45 60 60 70 75 160 Z" fill="#15803D" stroke="#14532D" strokeWidth="2" />
              <path d="M 75 160 Q 110 90 120 45 C 105 55 90 70 75 160 Z" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
              <path d="M 75 160 Q 75 70 70 15 C 85 30 90 70 75 160 Z" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
              <line x1="75" y1="160" x2="72" y2="35" stroke="#14532D" strokeWidth="2" />
            </svg>
            {/* Pot Keramik Putih Elegan Menapak di Garis Lantai */}
            <div
              style={{
                width: 75,
                height: 110,
                background: "linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)",
                borderRadius: "6px 6px 18px 18px",
                border: "2px solid #CBD5E1",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            />
            {/* Bayangan Kontak Pot Menempel Kokoh di Permukaan Lantai */}
            <div
              style={{
                width: 85,
                height: 12,
                backgroundColor: "rgba(0,0,0,0.22)",
                borderRadius: "50%",
                marginTop: -6,
              }}
            />
          </div>

          {/* Plin Dinding Elegan (Baseboard) Menghubungkan Dinding & Lantai di Y: 1344 - 1360 */}
          <div
            style={{
              position: "absolute",
              top: 1404, // 1344 + 60px bleed offset
              left: 0,
              right: 0,
              height: 16,
              backgroundColor: "#D8CBB7",
              borderTop: "2px solid #B8A892",
              zIndex: 2,
            }}
          />

          {/* Lantai Parquet Kayu Scandinavian Terang & Kokoh (Y: 1360 s/d Bawah Layar) */}
          <div
            style={{
              position: "absolute",
              top: 1420, // 1360 + 60px bleed offset
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, #EFE6D8 0%, #E3D6C1 45%, #D4C3A9 100%)",
              zIndex: 2,
            }}
          >
            {/* Garis-Garis Papan Kayu Parquet Horizontal */}
            <div style={{ position: "absolute", top: 120, left: 0, right: 0, height: 1.5, backgroundColor: "rgba(120, 90, 60, 0.16)" }} />
            <div style={{ position: "absolute", top: 260, left: 0, right: 0, height: 1.5, backgroundColor: "rgba(120, 90, 60, 0.18)" }} />
            <div style={{ position: "absolute", top: 400, left: 0, right: 0, height: 2, backgroundColor: "rgba(120, 90, 60, 0.22)" }} />

            {/* Garis Sambungan Vertikal Natural */}
            <div style={{ position: "absolute", top: 0, height: 120, left: 340, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.12)" }} />
            <div style={{ position: "absolute", top: 0, height: 120, left: 800, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.12)" }} />
            <div style={{ position: "absolute", top: 120, height: 140, left: 540, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.14)" }} />
            <div style={{ position: "absolute", top: 260, height: 140, left: 280, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.16)" }} />
            <div style={{ position: "absolute", top: 260, height: 140, left: 880, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.16)" }} />
          </div>
        </div>

        {/* =========================================================================
            LAYER 2: KARAKTER SAHABAT FULL-BODY (R1 & R2)
            - Kaos kasual biru, tanpa kacamata, rambut quiff/messy, pose dizzy.
            - Menapak kokoh di lantai (Y = 1360) dengan bayangan kontak terintegrasi.
            - Terletak bebas tanpa meja yang memenggal tubuhnya di sisi kiri (left: 80 - 420).
           ========================================================================= */}
        <div
          style={{
            position: "absolute",
            left: 110,
            top: charTop,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MainCharacter
            pose="dizzy"
            scale={charScale}
            hasGlasses={false}
            outfitType="tshirt"
            hairStyle="messy"
            customColors={{
              outfitMain: "#3B82F6",
              outfitShade: "#2563EB",
              outfitCollar: "#1D4ED8",
              pants: "#1E293B",
              pantsDark: "#0F172A",
              hair: "#0F172A",
            }}
          />
        </div>

        {/* Efek Bintang Pusing, Keringat Dingin & Uap Mual di Sekitar Kepala Karakter */}
        {frame >= 15 && (
          <div
            style={{
              position: "absolute",
              top: 724,
              left: 175 + charWobbleX,
              width: 150,
              height: 100,
              zIndex: 12,
              pointerEvents: "none",
            }}
          >
            <PopElement startFrame={15} sfxType="none" style={{ width: "100%", height: "100%" }}>
              <svg width="150" height="100" viewBox="-75 -50 150 100" style={{ overflow: "visible" }}>
                {/* Uap Mual / Pusing Bergelombang Ungu-Hijau */}
                <path
                  d={`M -30 25 Q ${-38 + Math.sin(frame * 0.2) * 6} 5 -30 -15 T ${-30 + Math.sin(frame * 0.2) * 6} -35`}
                  stroke="#A855F7"
                  strokeWidth="3.2"
                  fill="none"
                  opacity="0.8"
                  strokeLinecap="round"
                />
                <path
                  d={`M 35 25 Q ${43 - Math.sin(frame * 0.2) * 6} 5 35 -15 T ${35 - Math.sin(frame * 0.2) * 6} -35`}
                  stroke="#22C55E"
                  strokeWidth="3.2"
                  fill="none"
                  opacity="0.8"
                  strokeLinecap="round"
                />
                <path
                  d={`M 5 30 Q ${-5 + Math.cos(frame * 0.2) * 5} 10 5 -10 T ${5 + Math.cos(frame * 0.2) * 5} -30`}
                  stroke="#C084FC"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.65"
                  strokeLinecap="round"
                />

                {/* Butiran Keringat Dingin Besar Menetes */}
                <g transform={`translate(52, ${-10 + Math.sin(frame * 0.1) * 3}) scale(${1 + Math.sin(frame * 0.3) * 0.1})`}>
                  <path d="M 0 -14 C 5 -7 7 0 0 7 C -7 0 -5 -7 0 -14 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.8" />
                  <ellipse cx="-2" cy="0" rx="1.5" ry="3" fill="#FFFFFF" opacity="0.85" />
                </g>

                {/* Bintang Pusing Kuning Terang Kiri & Kanan Mendampingi Spiral Asli Karakter */}
                <polygon
                  points="0,-9 2.5,-2.5 9,-2.5 4,2 5.5,8 0,4.5 -5.5,8 -4,2 -9,-2.5 -2.5,-2.5"
                  fill="#FEF08A"
                  stroke="#D97706"
                  strokeWidth="2"
                  transform={`translate(-45, ${Math.sin(frame * 0.15) * 3}) scale(1.1) rotate(${(frame * 3) % 360})`}
                />
                <polygon
                  points="0,-9 2.5,-2.5 9,-2.5 4,2 5.5,8 0,4.5 -5.5,8 -4,2 -9,-2.5 -2.5,-2.5"
                  fill="#FEF08A"
                  stroke="#D97706"
                  strokeWidth="2"
                  transform={`translate(45, ${-Math.sin(frame * 0.15) * 3}) scale(1.1) rotate(${-(frame * 3) % 360})`}
                />
              </svg>
            </PopElement>
          </div>
        )}

        {/* =========================================================================
            LAYER 3: KARTU PEMINDAI ANATOMI MEDIS X-RAY (R2 & R4)
            - Terletak bersih di sisi kanan (left: 470 - 1000).
            - Wajah & tubuh karakter di sisi kiri 100% bebas tabrakan (zero collision).
            - Diagram SVG murni visual organ hati, sepasang ginjal, dan partikel racun (ZERO <text> in SVG).
            - Seluruh label teks medis dan badge bahaya menggunakan kartu HTML/React terisolasi di luar SVG.
            - Masuk secara dinamis dengan spring pop pada frame 25 (stabil & siap sebelum frame 75/960 global).
           ========================================================================= */}
        <div
          style={{
            position: "absolute",
            left: 470,
            top: 420,
            width: 530,
            zIndex: 25,
          }}
        >
          <PopElement
            startFrame={25}
            sfxType="whip"
            volume={0.22}
            tilt={-1.5}
            style={{ width: "100%" }}
          >
            {/* KONTEN KARTU HTML/REACT TERISOLASI */}
            <div
              style={{
                width: "100%",
                background: "linear-gradient(180deg, #0F172A 0%, #1E293B 55%, #0B132B 100%)",
                borderRadius: 26,
                border: frame >= 115
                  ? `3.5px solid rgba(239, 68, 68, ${0.6 + Math.sin(frame * 0.35) * 0.4})`
                  : "2px solid rgba(56, 189, 248, 0.45)",
                boxShadow: frame >= 115
                  ? `0 20px 45px rgba(239, 68, 68, 0.45), 0 0 ${25 + Math.sin(frame * 0.35) * 15}px rgba(239, 68, 68, 0.7), inset 0 0 25px rgba(239, 68, 68, 0.2)`
                  : "0 20px 45px rgba(15, 23, 42, 0.35), inset 0 0 25px rgba(56, 189, 248, 0.08)",
                padding: "20px 22px 18px 22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxSizing: "border-box",
              }}
            >
              {/* --- HEADER KARTU: BADGE & JUDUL (HTML/REACT DOM, ZERO SVG TEXT) --- */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                {/* Badge Scanner Medis */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    backgroundColor: "rgba(56, 189, 248, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.4)",
                    borderRadius: 10,
                    padding: "4px 9px",
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: "#38BDF8",
                      boxShadow: "0 0 6px #38BDF8",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#38BDF8",
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    PEMINDAI X-RAY MEDIS
                  </span>
                </div>

                {/* Badge Peringatan Bahaya Toksin */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    backgroundColor: "rgba(239, 68, 68, 0.22)",
                    border: "1px solid rgba(239, 68, 68, 0.55)",
                    borderRadius: 10,
                    padding: "4px 9px",
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: "#EF4444",
                      boxShadow: "0 0 6px #EF4444",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#F87171",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    KONTAMINASI RACUN
                  </span>
                </div>
              </div>

              {/* Judul Kartu Medis */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  textAlign: "center",
                  letterSpacing: -0.2,
                  marginBottom: 12,
                }}
              >
                KERUSAKAN ORGAN DALAM
              </div>

              {/* --- BAGIAN TENGAH: DIAGRAM ANATOMI SVG (MURNI ILUSTRASI VISUAL - ZERO <text>) --- */}
              <div
                style={{
                  width: "100%",
                  height: 380,
                  position: "relative",
                  borderRadius: 18,
                  backgroundColor: "rgba(11, 19, 43, 0.75)",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  overflow: "hidden",
                }}
              >
                <svg
                  viewBox="0 0 480 380"
                  width="100%"
                  height="100%"
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    <linearGradient id="liverGradX5" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="50%" stopColor="#DC2626" />
                      <stop offset="100%" stopColor="#991B1B" />
                    </linearGradient>

                    <linearGradient id="kidneyGradX5" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DC2626" />
                      <stop offset="60%" stopColor="#B91C1C" />
                      <stop offset="100%" stopColor="#7F1D1D" />
                    </linearGradient>

                    <filter id="dangerGlowX5" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="0" stdDeviation={dangerGlowStd} floodColor="#EF4444" floodOpacity={dangerGlowOpacity} />
                    </filter>
                  </defs>

                  {/* Grid Garis Pemindai Medis Sian */}
                  <g stroke="#38BDF8" strokeWidth="1" opacity="0.16">
                    {[65, 130, 195, 260, 325].map((y) => (
                      <line key={y} x1="20" y1={y} x2="460" y2={y} />
                    ))}
                    {[80, 160, 240, 320, 400].map((x) => (
                      <line key={x} x1={x} y1="20" x2={x} y2={360} />
                    ))}
                  </g>

                  {/* Sudut-Sudut Target Reticle Medis */}
                  <g stroke="#38BDF8" strokeWidth="3.5" fill="none" opacity="0.8">
                    <path d="M 25 45 L 25 25 L 45 25" />
                    <path d="M 455 45 L 455 25 L 435 25" />
                    <path d="M 25 335 L 25 355 L 45 355" />
                    <path d="M 455 335 L 455 355 L 435 355" />
                  </g>

                  {/* Garis Pembuluh Darah Utama (Aorta Merah & Vena Cava Sian) */}
                  <g opacity="0.4">
                    <path d="M 248 30 L 248 350" stroke="#EF4444" strokeWidth="7" strokeLinecap="round" />
                    <path d="M 232 30 L 232 350" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
                    {/* Cabang ke Organ Hati */}
                    <path d="M 232 110 Q 190 110 160 110" stroke="#EF4444" strokeWidth="4.5" fill="none" />
                    {/* Cabang ke Sepasang Ginjal */}
                    <path d="M 232 260 L 155 260" stroke="#EF4444" strokeWidth="4" fill="none" />
                    <path d="M 248 260 L 325 260" stroke="#EF4444" strokeWidth="4" fill="none" />
                  </g>

                  {/* -----------------------------------------------------------------
                      ORGAN 1: HATI (LIVER) — PULSING RED DANGER ALERT GLOW & TOXIN
                     ----------------------------------------------------------------- */}
                  <g transform="translate(240, 115)" filter="url(#dangerGlowX5)">
                    {/* Pulsing Danger Outline Alert Glow saat Racun Menempel */}
                    {toxinAttachProgress > 0 && (
                      <path
                        d="M -115 -25 Q -10 -65 125 -15 Q 175 30 115 65 Q 10 80 -95 45 Q -135 10 -115 -25 Z"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth={3 + dangerAlertPulse * 3}
                        opacity={dangerGlowOpacity * 0.85}
                        transform={`scale(${organPulse * (1 + dangerAlertPulse * 0.03)})`}
                        style={{ transformOrigin: "10px 15px" }}
                      />
                    )}
                    {/* Bentuk Anatomi Organ Hati Manusia */}
                    <path
                      d="M -115 -25 Q -10 -65 125 -15 Q 175 30 115 65 Q 10 80 -95 45 Q -135 10 -115 -25 Z"
                      fill="url(#liverGradX5)"
                      stroke="#F87171"
                      strokeWidth="3.8"
                      transform={`scale(${organPulse})`}
                      style={{ transformOrigin: "10px 15px" }}
                    />
                    {/* Partikel Racun Insektisida Hijau Menempel di Jaringan Hati */}
                    {liverParticleScale > 0 && (
                      <g transform={`scale(${Math.max(0, liverParticleScale) * toxicPulse})`} style={{ transformOrigin: "10px 15px" }}>
                        <circle cx="15" cy="-8" r="7.5" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
                        <circle cx="75" cy="12" r="9" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
                        <circle cx="-45" cy="10" r="7" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
                        <circle cx="115" cy="20" r="6" fill="#86EFAC" />
                        <circle cx="-85" cy="8" r="6" fill="#86EFAC" />
                      </g>
                    )}
                  </g>

                  {/* -----------------------------------------------------------------
                      ORGAN 2 & 3: SEPASANG GINJAL (KIDNEYS) — PULSING RED DANGER ALERT GLOW & TOXIN
                     ----------------------------------------------------------------- */}
                  {/* Ginjal Kiri (Bawah Kiri) */}
                  <g transform="translate(145, 260)" filter="url(#dangerGlowX5)">
                    {toxinAttachProgress > 0 && (
                      <path
                        d="M 0 -34 C 34 -34 44 -8 30 0 C 44 8 34 34 0 34 C -32 34 -40 0 0 -34 Z"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth={2.5 + dangerAlertPulse * 2.5}
                        opacity={dangerGlowOpacity * 0.85}
                        transform={`scale(${organPulse * (1 + dangerAlertPulse * 0.03)})`}
                      />
                    )}
                    <path
                      d="M 0 -34 C 34 -34 44 -8 30 0 C 44 8 34 34 0 34 C -32 34 -40 0 0 -34 Z"
                      fill="url(#kidneyGradX5)"
                      stroke="#F87171"
                      strokeWidth="3.5"
                      transform={`scale(${organPulse})`}
                    />
                    {kidneyParticleScale > 0 && (
                      <g transform={`scale(${Math.max(0, kidneyParticleScale) * toxicPulse})`} style={{ transformOrigin: "0 0" }}>
                        <circle cx="8" cy="0" r="6.5" fill="#4ADE80" stroke="#15803D" strokeWidth="1.8" />
                        <circle cx="-8" cy="10" r="5" fill="#86EFAC" />
                      </g>
                    )}
                  </g>

                  {/* Ginjal Kanan (Bawah Kanan) */}
                  <g transform="translate(335, 260)" filter="url(#dangerGlowX5)">
                    {toxinAttachProgress > 0 && (
                      <path
                        d="M 0 -34 C -34 -34 -44 -8 -30 0 C -44 8 -34 34 0 34 C 32 34 40 0 0 -34 Z"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth={2.5 + dangerAlertPulse * 2.5}
                        opacity={dangerGlowOpacity * 0.85}
                        transform={`scale(${organPulse * (1 + dangerAlertPulse * 0.03)})`}
                      />
                    )}
                    <path
                      d="M 0 -34 C -34 -34 -44 -8 -30 0 C -44 8 -34 34 0 34 C 32 34 40 0 0 -34 Z"
                      fill="url(#kidneyGradX5)"
                      stroke="#F87171"
                      strokeWidth="3.5"
                      transform={`scale(${organPulse})`}
                    />
                    {kidneyParticleScale > 0 && (
                      <g transform={`scale(${Math.max(0, kidneyParticleScale) * toxicPulse})`} style={{ transformOrigin: "0 0" }}>
                        <circle cx="-8" cy="0" r="6.5" fill="#4ADE80" stroke="#15803D" strokeWidth="1.8" />
                        <circle cx="8" cy="10" r="5" fill="#86EFAC" />
                      </g>
                    )}
                  </g>
                </svg>
              </div>

              {/* --- FOOTER KARTU: DETAIL ORGAN & STATUS KERUSAKAN (HTML/REACT DOM, ZERO SVG TEXT) --- */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                {/* Status Bar Organ 1: Hati */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "rgba(30, 41, 59, 0.7)",
                    border: "1px solid rgba(239, 68, 68, 0.35)",
                    borderRadius: 12,
                    padding: "8px 12px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#FFFFFF" }}>
                      HATI (LIVER)
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>
                      Penyaring racun kelebihan beban toksin
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.25)",
                      border: "1px solid rgba(239, 68, 68, 0.5)",
                      borderRadius: 8,
                      padding: "3px 8px",
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#FCA5A5",
                      letterSpacing: 0.4,
                      textTransform: "uppercase",
                    }}
                  >
                    JARINGAN RUSAK
                  </div>
                </div>

                {/* Status Bar Organ 2 & 3: Sepasang Ginjal */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "rgba(30, 41, 59, 0.7)",
                    border: "1px solid rgba(249, 115, 22, 0.35)",
                    borderRadius: 12,
                    padding: "8px 12px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#FFFFFF" }}>
                      SEPASANG GINJAL
                    </div>
                    <div style={{ fontSize: 11, color: "#94A3B8" }}>
                      Gagal ekskresi residu pestisida
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(249, 115, 22, 0.25)",
                      border: "1px solid rgba(249, 115, 22, 0.5)",
                      borderRadius: 8,
                      padding: "3px 8px",
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#FDBA74",
                      letterSpacing: 0.4,
                      textTransform: "uppercase",
                    }}
                  >
                    GAGAL FILTRASI
                  </div>
                </div>
              </div>
            </div>
          </PopElement>
        </div>
      </CameraRig>
    </AbsoluteFill>
  );
};
