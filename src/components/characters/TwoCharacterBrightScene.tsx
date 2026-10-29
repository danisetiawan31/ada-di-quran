import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MainCharacter } from "./MainCharacter";

export const TwoCharacterBrightScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1 (Frame 0 - 120): Karakter B Marah, Karakter A Menenangkan
  // Phase 2 (Frame 120 - 300): Karakter B Sadar/Malu, Karakter A Tersenyum Damai
  const isPhase2 = frame >= 120;

  const poseA = isPhase2 ? "peaceful" : "calming";
  const poseB = isPhase2 ? "regret" : "angry";
  const shirtColorB = isPhase2 ? "#3B82F6" : "#EF4444";
  const shirtShadeB = isPhase2 ? "#2563EB" : "#DC2626";

  // Coordinates:
  // Sole of shoes is at 516px inside MainCharacter.
  // When scale is 1.32, character height to sole is 516 * 1.32 = 681px.
  // We want the soles to plant precisely on Floor Baseboard at Y = 1360.
  // Therefore top = 1360 - 681 = 679px!
  const charTop = 679;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAF9F6", // Warm Off-White (Terang Bersih & Elegan)
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* =====================================================================
          1. BACKGROUND LAYER: RUANGAN MODERN TERANG & HANGAT
         ===================================================================== */}
      {/* Dinding Atas: Gradasi Krem Lembut Hangat */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1360,
          background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 55%, #E2E8F0 100%)",
        }}
      />

      {/* Lampu Plafon Minimalis */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <div style={{ width: 3, height: 130, backgroundColor: "#64748B" }} />
        <div
          style={{
            width: 120,
            height: 36,
            backgroundColor: "#1E293B",
            borderRadius: "0 0 60px 60px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        />
        {/* Pancaran Cahaya Lembut Lampu */}
        <div
          style={{
            width: 380,
            height: 300,
            background: "radial-gradient(ellipse at top, rgba(254, 240, 138, 0.22) 0%, rgba(254, 240, 138, 0) 70%)",
            marginTop: -6,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Jendela Modern di Dinding (Menampilkan Langit Siang Cerah) */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 440,
          height: 440,
          backgroundColor: "#BAE6FD",
          borderRadius: 24,
          border: "12px solid #FFFFFF",
          boxShadow: "0 16px 40px rgba(0,0,0,0.06), inset 0 0 60px rgba(255,255,255,0.6)",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Langit & Awan Cerah */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #38BDF8 0%, #7DD3FC 60%, #E0F2FE 100%)",
            position: "relative",
          }}
        >
          {/* Siluet Awan Halus Bergerak */}
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 40 + Math.sin(frame / 60) * 15,
              width: 140,
              height: 44,
              backgroundColor: "#FFFFFF",
              borderRadius: 30,
              opacity: 0.88,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 50,
              left: 70 + Math.sin(frame / 60) * 15,
              width: 60,
              height: 60,
              backgroundColor: "#FFFFFF",
              borderRadius: "50%",
              opacity: 0.88,
            }}
          />
          {/* Garis Kusen Jendela Minimalis */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 6, backgroundColor: "#FFFFFF", transform: "translateX(-50%)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 6, backgroundColor: "#FFFFFF", transform: "translateY(-50%)" }} />
        </div>
      </div>

      {/* Tanaman Hias Aesthetic di Lantai Sudut Kiri */}
      <div
        style={{
          position: "absolute",
          top: 1040,
          left: 40,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Daun Hijau Monstera Cantik */}
        <svg width="180" height="220" viewBox="0 0 180 220" style={{ marginBottom: -15, overflow: "visible" }}>
          <path d="M 90 180 Q 50 120 40 70 C 55 75 70 85 90 180 Z" fill="#15803D" stroke="#14532D" strokeWidth="2" />
          <path d="M 90 180 Q 130 110 145 60 C 130 70 115 85 90 180 Z" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
          <path d="M 90 180 Q 90 80 85 20 C 100 40 105 80 90 180 Z" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
          <line x1="90" y1="180" x2="88" y2="40" stroke="#14532D" strokeWidth="2.5" />
        </svg>
        {/* Pot Keramik Putih Minimalis di Lantai */}
        <div
          style={{
            width: 90,
            height: 140,
            background: "linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)",
            borderRadius: "6px 6px 20px 20px",
            border: "2px solid #CBD5E1",
            boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
          }}
        />
        {/* Bayangan Kontak Pot di Lantai */}
        <div
          style={{
            width: 100,
            height: 14,
            backgroundColor: "rgba(0,0,0,0.22)",
            borderRadius: "50%",
            marginTop: -6,
          }}
        />
      </div>

      {/* =====================================================================
          2. STAGE BASEBOARD & FLOOR (LANTAI PARQUET TERANG HANGAT DI Y: 1360)
         ===================================================================== */}
      {/* Plin Dinding / Baseboard Kayu Elegan */}
      <div
        style={{
          position: "absolute",
          top: 1344,
          left: 0,
          right: 0,
          height: 16,
          backgroundColor: "#CBD5E1",
          borderTop: "2px solid #94A3B8",
          zIndex: 1,
        }}
      />

      {/* Lantai Parquet Kayu Terang Scandinavian (Hangat & Kokoh) */}
      <div
        style={{
          position: "absolute",
          top: 1360,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, #EDE5D8 0%, #E2D7C5 45%, #D5C7B2 100%)",
          zIndex: 1,
        }}
      >
        {/* Garis Sambungan Papan Kayu Parquet Lantai */}
        <div style={{ position: "absolute", top: 100, left: 0, right: 0, height: 1.5, backgroundColor: "rgba(120, 90, 60, 0.16)" }} />
        <div style={{ position: "absolute", top: 230, left: 0, right: 0, height: 1.5, backgroundColor: "rgba(120, 90, 60, 0.19)" }} />
        <div style={{ position: "absolute", top: 370, left: 0, right: 0, height: 2, backgroundColor: "rgba(120, 90, 60, 0.23)" }} />

        {/* Garis Vertikal Antar Papan Kayu */}
        <div style={{ position: "absolute", top: 0, height: 100, left: 320, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.13)" }} />
        <div style={{ position: "absolute", top: 0, height: 100, left: 780, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.13)" }} />
        <div style={{ position: "absolute", top: 100, height: 130, left: 540, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.15)" }} />
        <div style={{ position: "absolute", top: 230, height: 140, left: 240, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.18)" }} />
        <div style={{ position: "absolute", top: 230, height: 140, left: 860, width: 1.5, backgroundColor: "rgba(120, 90, 60, 0.18)" }} />
      </div>

      {/* =====================================================================
          3. TWO CHARACTERS STANDING FIRMLY ON THE FLOOR (Y = 1360)
         ===================================================================== */}
      {/* KARAKTER A (Host): Berdiri Tegak di Lantai, Menghadap Kanan */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: charTop,
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MainCharacter
          pose={poseA}
          scale={1.32}
          hasGlasses={true}
          outfitType="koko"
        />
      </div>

      {/* KARAKTER B (Sahabat): Berdiri Tegak di Lantai, Menghadap Kiri */}
      <div
        style={{
          position: "absolute",
          left: 690,
          top: charTop,
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MainCharacter
          pose={poseB}
          flip={true}
          scale={1.32}
          hasGlasses={false}
          outfitType="tshirt"
          hairStyle="messy"
          customColors={{
            outfitMain: shirtColorB,
            outfitShade: shirtShadeB,
            outfitCollar: isPhase2 ? "#1D4ED8" : "#B91C1C",
            pants: "#1E293B",
            hair: "#0F172A",
          }}
        />
      </div>

      {/* =====================================================================
          4. DIALOGUE CARD DI TENGAH (BERSIH, LEGA & TANPA OVERLAP)
         ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: 660,
          left: "50%",
          transform: "translateX(-50%)",
          width: 330,
          backgroundColor: "#FFFFFF",
          borderRadius: 22,
          padding: "18px 24px",
          textAlign: "center",
          boxShadow: "0 18px 36px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05)",
          border: isPhase2 ? "2.5px solid #34D399" : "2.5px solid #F59E0B",
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 1.1,
            color: isPhase2 ? "#059669" : "#D97706",
            textTransform: "uppercase",
            display: "inline-block",
            marginBottom: 6,
          }}
        >
          {isPhase2 ? "Hikmah & Resolusi" : "Ajaran Rasulullah ﷺ"}
        </span>
        <div
          style={{
            fontSize: 21,
            fontWeight: 900,
            color: "#0F172A",
            marginBottom: 6,
            lineHeight: 1.25,
          }}
        >
          {isPhase2 ? '"Alhamdulillah, Hati Tenang"' : '"Laa Taghdhab..."'}
        </div>
        <p
          style={{
            fontSize: 14,
            color: "#64748B",
            margin: 0,
            lineHeight: 1.45,
            fontWeight: 500,
          }}
        >
          {isPhase2
            ? "Karakter B tersadar dan menahan amarahnya setelah diingatkan sahabatnya."
            : '"Janganlah kamu marah, maka bagimu surga." (HR. Thabrani)'}
        </p>
      </div>

      {/* =====================================================================
          5. SUBTITLE ZONE / LOWER THIRD INFO (Y: 1480 - 1650)
         ===================================================================== */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.88)",
            backdropFilter: "blur(10px)",
            padding: "14px 28px",
            borderRadius: 20,
            border: "1.5px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>
            {isPhase2 ? (
              <>
                Karakter B:{" "}
                <span style={{ color: "#60A5FA" }}>
                  "Iya ya... terima kasih sudah mengingatkan, saudaraku."
                </span>
              </>
            ) : (
              <>
                Karakter A:{" "}
                <span style={{ color: "#FDE047" }}>
                  "Sabar sahabatku... ingat pesan Rasulullah agar menahan marah."
                </span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* =====================================================================
          6. HEADER WATERMARK DI ATAS (SAFE ZONE Y: 0 - 200)
         ===================================================================== */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(8px)",
            padding: "10px 28px",
            borderRadius: 30,
            border: "1.5px solid rgba(203, 213, 225, 0.8)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A" }}>
            Ada di Quran
          </span>
          <span style={{ fontSize: 16, color: "#64748B", marginLeft: 10 }}>
            — Evaluasi Interaksi 2 Karakter di Panggung Terang
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};