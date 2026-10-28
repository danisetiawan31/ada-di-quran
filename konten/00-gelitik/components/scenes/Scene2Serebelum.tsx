import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Zap, Sparkles, Hand, ArrowRight, Target } from "lucide-react";
import { fontFamily, THEME } from "../../theme";

export const Scene2Serebelum: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating breathing idle motion
  const idleFloat = Math.sin(frame * 0.1) * 14;

  // Cerebellum Glow & Pulse
  const cerebellumPulse = 1 + Math.sin(frame * 0.2) * 0.08;

  // Signal Phase at frame 135 (Narration: "Tiap kali tanganmu bergerak, sistem gerakmu mengirim bocoran sinyal...")
  const isSignalPhase = frame >= 135;
  const signalAge = Math.max(0, frame - 135);

  // Label Spring
  const labelSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const labelScale = interpolate(labelSpring, [0, 1], [0.2, 1]);

  // Signal Flying Energy Bolt
  const signalProgress = interpolate(signalAge % 35, [0, 35], [0, 1]);
  const boltX = interpolate(signalProgress, [0, 1], [150, 520]);
  const boltY = interpolate(signalProgress, [0, 1], [120, 380]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        zIndex: 10,
      }}
    >
      {/* Giant Title Header */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: THEME.colors.ink,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "-1px",
          marginBottom: 30,
        }}
      >
        Otak Kecil:{" "}
        <span
          style={{
            color: THEME.colors.orange,
            textDecoration: "underline",
            textDecorationColor: THEME.colors.coral,
            textDecorationThickness: 8,
          }}
        >
          Serebelum!
        </span>
      </div>

      {/* Giant Chunky Brain (Side View Facing Left, 740px wide) */}
      <div
        style={{
          position: "relative",
          width: 740,
          height: 580,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${idleFloat}px)`,
        }}
      >
        <svg
          viewBox="0 0 620 500"
          style={{
            width: "100%",
            height: "100%",
            overflow: "visible",
            filter: "drop-shadow(10px 14px 0px rgba(15, 23, 42, 0.35))",
          }}
        >
          {/* 1. BRAIN STEM (Batang Otak - Bottom Center) */}
          <path
            d="M 280 320 Q 285 410 295 450 L 345 445 Q 340 350 330 315 Z"
            fill="#CBD5E1"
            stroke={THEME.colors.ink}
            strokeWidth="10"
            strokeLinejoin="round"
          />

          {/* 2. CEREBRUM (Otak Besar - Facing Left) Solid Pastel Mint/Teal */}
          <path
            d="M 270 100 
               C 160 90, 100 160, 100 240
               C 100 290, 130 320, 175 330
               C 210 338, 230 300, 260 305
               C 285 310, 290 330, 315 330
               C 365 330, 380 290, 420 280
               C 490 260, 500 170, 435 120
               C 390 85, 320 95, 270 100 Z"
            fill={THEME.colors.teal}
            stroke={THEME.colors.ink}
            strokeWidth="12"
            strokeLinejoin="round"
          />

          {/* Cerebrum Folds (Chunky Inner Curves) */}
          <path
            d="M 220 120 Q 250 180 190 220 T 160 290"
            fill="none"
            stroke={THEME.colors.ink}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M 310 115 Q 330 190 380 200 T 440 210"
            fill="none"
            stroke={THEME.colors.ink}
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* 3. CEREBELLUM / SEREBELUM (Otak Kecil - Back Lower Right) */}
          {/* Giant Chunky Orange organ with distinct outline */}
          <g
            transform={`translate(400, 340) scale(${cerebellumPulse}) translate(-400, -340)`}
          >
            <path
              d="M 330 320
                 C 350 290, 420 280, 465 305
                 C 515 330, 505 400, 460 425
                 C 410 450, 350 420, 335 380
                 C 320 355, 315 335, 330 320 Z"
              fill={THEME.colors.orange}
              stroke={THEME.colors.ink}
              strokeWidth="12"
              strokeLinejoin="round"
            />

            {/* Cerebellar Foliation Stripes (Chunky) */}
            <path
              d="M 360 335 Q 410 335 455 350"
              fill="none"
              stroke="#FFF"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 350 365 Q 405 370 455 385"
              fill="none"
              stroke="#FFF"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 360 395 Q 400 405 440 415"
              fill="none"
              stroke="#FFF"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </g>

          {/* Signal Stream Pathway (Dashed thick track) */}
          {isSignalPhase && (
            <path
              d="M 150 120 Q 320 180 440 340"
              fill="none"
              stroke={THEME.colors.yellow}
              strokeWidth="10"
              strokeDasharray="16 12"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Giant Floating Pill Badge: "SEREBELUM" */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 40,
            transform: `scale(${labelScale}) rotate(2deg)`,
            background: THEME.colors.yellow,
            color: THEME.colors.ink,
            border: `8px solid ${THEME.colors.ink}`,
            boxShadow: THEME.colors.popShadowLarge,
            padding: "14px 40px",
            borderRadius: 32,
            fontSize: 52,
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 15,
          }}
        >
          <Sparkles size={48} color={THEME.colors.ink} strokeWidth={3} />
          <span>SEREBELUM</span>
        </div>

        {/* Signal Energy Packet Bolt flying along the track */}
        {isSignalPhase && (
          <div
            style={{
              position: "absolute",
              left: boltX,
              top: boltY,
              transform: "translate(-50%, -50%)",
              background: THEME.colors.yellow,
              borderRadius: "50%",
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `5px solid ${THEME.colors.ink}`,
              boxShadow: "0 0 25px #FFD000",
            }}
          >
            <Zap size={32} color={THEME.colors.ink} strokeWidth={3} />
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* LOWER INFOGRAPHIC STAGE (FILLING THE LOWER VOID) */}
      {/* ========================================================= */}
      <div style={{ width: "100%", maxWidth: 920, marginTop: 70 }}>
        {!isSignalPhase ? (
          /* Phase 1: Cerebellum Role Callout */
          <div
            style={{
              width: "100%",
              background: "#FFF",
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 36,
              padding: "30px 36px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Target size={44} color={THEME.colors.orange} strokeWidth={3} />
                <span
                  style={{
                    fontSize: 34,
                    fontWeight: 900,
                    color: THEME.colors.ink,
                  }}
                >
                  FUNGSI SEREBELUM
                </span>
              </div>
              <div
                style={{
                  background: THEME.colors.teal,
                  color: THEME.colors.ink,
                  border: `4px solid ${THEME.colors.ink}`,
                  borderRadius: 18,
                  padding: "6px 18px",
                  fontSize: 24,
                  fontWeight: 900,
                  boxShadow: "3px 3px 0 #0F172A",
                }}
              >
                SISTEM PREDIKSI 🎯
              </div>
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: THEME.colors.ink,
                lineHeight: 1.3,
              }}
            >
              "Pusat koordinasi yang menebak sensasi gerak sebelum kulit tersentuh!"
            </div>
          </div>
        ) : (
          /* Phase 2: Dynamic Signal Flow Pathway */
          <div
            style={{
              width: "100%",
              background: THEME.colors.bgWarmCream,
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 36,
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Zap size={36} color={THEME.colors.coral} strokeWidth={3} />
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: THEME.colors.ink,
                  }}
                >
                  ALUR BOCORAN SINYAL
                </span>
              </div>
              <div
                style={{
                  background: THEME.colors.coral,
                  color: "#FFF",
                  border: `3px solid ${THEME.colors.ink}`,
                  borderRadius: 14,
                  padding: "4px 14px",
                  fontSize: 22,
                  fontWeight: 900,
                  boxShadow: "3px 3px 0 #0F172A",
                }}
              >
                TERKIRIM CEPAT ⚡
              </div>
            </div>

            {/* 3 Step Interactive Pathway Cards */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              {/* Step 1: Gerakan Tangan */}
              <div
                style={{
                  flex: 1,
                  background: "#FFF",
                  border: `5px solid ${THEME.colors.ink}`,
                  borderRadius: 24,
                  padding: "16px 8px",
                  textAlign: "center",
                  boxShadow: "4px 4px 0 #0F172A",
                }}
              >
                <Hand
                  size={44}
                  color={THEME.colors.ink}
                  style={{ margin: "0 auto 6px" }}
                  strokeWidth={2.8}
                />
                <div style={{ fontSize: 24, fontWeight: 900 }}>TANGAN</div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "rgba(15,23,42,0.6)",
                  }}
                >
                  Mulai Bergerak
                </div>
              </div>

              <ArrowRight
                size={34}
                color={THEME.colors.ink}
                strokeWidth={3.5}
              />

              {/* Step 2: Bocoran Sinyal */}
              <div
                style={{
                  flex: 1.1,
                  background: THEME.colors.yellow,
                  border: `5px solid ${THEME.colors.ink}`,
                  borderRadius: 24,
                  padding: "16px 8px",
                  textAlign: "center",
                  boxShadow: "4px 4px 0 #0F172A",
                  transform: "scale(1.04)",
                }}
              >
                <Zap
                  size={44}
                  color={THEME.colors.ink}
                  style={{ margin: "0 auto 6px" }}
                  strokeWidth={3}
                />
                <div style={{ fontSize: 24, fontWeight: 900 }}>BOCORAN</div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: THEME.colors.coral,
                  }}
                >
                  Sinyal Dikirim!
                </div>
              </div>

              <ArrowRight
                size={34}
                color={THEME.colors.ink}
                strokeWidth={3.5}
              />

              {/* Step 3: Serebelum */}
              <div
                style={{
                  flex: 1,
                  background: THEME.colors.orange,
                  color: "#FFF",
                  border: `5px solid ${THEME.colors.ink}`,
                  borderRadius: 24,
                  padding: "16px 8px",
                  textAlign: "center",
                  boxShadow: "4px 4px 0 #0F172A",
                }}
              >
                <Sparkles
                  size={44}
                  color="#FFF"
                  style={{ margin: "0 auto 6px" }}
                  strokeWidth={3}
                />
                <div style={{ fontSize: 24, fontWeight: 900 }}>SEREBELUM</div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Meredam Geli
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
