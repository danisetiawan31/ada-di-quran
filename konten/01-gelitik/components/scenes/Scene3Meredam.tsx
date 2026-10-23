import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Volume2, VolumeX, Meh, ShieldCheck } from "lucide-react";
import { fontFamily, THEME } from "../../theme";

export const Scene3Meredam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Damping volume from 100 to 0 (frames 90 - 180)
  const volumeProgress = interpolate(frame, [90, 180], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slider Knob Position (X offset: from 600px to 0px)
  const knobX = interpolate(volumeProgress, [0, 100], [0, 560]);

  // Stamp "HAMBAR!" at frame 230
  const stampAge = Math.max(0, frame - 230);
  const stampSpring = spring({
    frame: stampAge,
    fps,
    config: { damping: 8, stiffness: 220, mass: 0.6 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [3, 1]);

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
        paddingTop: 210,
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
        Otak Meredam{" "}
        <span
          style={{
            color: THEME.colors.coral,
            textDecoration: "underline",
            textDecorationColor: THEME.colors.yellow,
            textDecorationThickness: 8,
          }}
        >
          Rasa Geli!
        </span>
      </div>

      {/* Main Chunky Interactive Console (No enclosing box, full canvas!) */}
      <div
        style={{
          position: "relative",
          width: 780,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {/* Dynamic Equalizer / Soundwave Graphic */}
        <div
          style={{
            width: "100%",
            height: 300,
            background: "#FFF",
            border: `8px solid ${THEME.colors.ink}`,
            boxShadow: THEME.colors.popShadowLarge,
            borderRadius: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 40px",
            marginBottom: 44,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Soundwave Bars */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {Array.from({ length: 14 }).map((_, i) => {
              const baseWave =
                Math.sin(frame * 0.25 + i * 0.5) * 45 +
                Math.cos(frame * 0.2 + i * 0.3) * 35;
              const barHeight = Math.max(
                12,
                (Math.abs(baseWave) + 20) * (volumeProgress / 100)
              );

              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: barHeight,
                    background:
                      volumeProgress > 30
                        ? THEME.colors.coral
                        : THEME.colors.ink,
                    borderRadius: 16,
                    border: `4px solid ${THEME.colors.ink}`,
                    transition: "height 0.1s ease, background 0.3s ease",
                  }}
                />
              );
            })}
          </div>

          {/* Volume Indicator Pill Badge */}
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background:
                volumeProgress > 20
                  ? THEME.colors.yellow
                  : THEME.colors.pink,
              color: THEME.colors.ink,
              border: `4px solid ${THEME.colors.ink}`,
              boxShadow: "3px 3px 0px #0F172A",
              padding: "6px 18px",
              borderRadius: 20,
              fontSize: 26,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {volumeProgress > 20 ? (
              <>
                <Volume2 size={24} color={THEME.colors.ink} />
                <span>{Math.round(volumeProgress)}% SENSASI</span>
              </>
            ) : (
              <>
                <VolumeX size={24} color="#FFF" />
                <span style={{ color: "#FFF" }}>0% DIMATIKAN</span>
              </>
            )}
          </div>
        </div>

        {/* Giant Physical Fader Slider Track (780px wide) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 120,
            background: THEME.colors.bgWarmYellow,
            border: `8px solid ${THEME.colors.ink}`,
            boxShadow: THEME.colors.popShadowLarge,
            borderRadius: 36,
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          {/* Inner Groove Track */}
          <div
            style={{
              width: "100%",
              height: 28,
              background: THEME.colors.ink,
              borderRadius: 14,
            }}
          />

          {/* Giant Chunky Knob Handle (120px) */}
          <div
            style={{
              position: "absolute",
              left: 20 + knobX,
              width: 130,
              height: 150,
              borderRadius: 30,
              background: "#FFF",
              border: `8px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadow,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: 50,
                height: 8,
                borderRadius: 4,
                background: THEME.colors.ink,
              }}
            />
            <div
              style={{
                width: 50,
                height: 8,
                borderRadius: 4,
                background: THEME.colors.ink,
              }}
            />
            <div
              style={{
                width: 50,
                height: 8,
                borderRadius: 4,
                background: THEME.colors.coral,
              }}
            />
          </div>
        </div>

        {/* Giant Stamp "HAMBAR! 😐" (Frames 230+) */}
        {frame >= 230 && (
          <div
            style={{
              position: "absolute",
              top: 50,
              background: THEME.colors.yellow,
              border: `10px solid ${THEME.colors.ink}`,
              boxShadow: THEME.colors.popShadowLarge,
              borderRadius: 44,
              padding: "24px 60px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              transform: `scale(${stampScale}) rotate(-4deg)`,
              zIndex: 30,
            }}
          >
            <Meh size={84} color={THEME.colors.ink} strokeWidth={3.5} />
            <span
              style={{
                fontSize: 84,
                fontWeight: 900,
                color: THEME.colors.ink,
                letterSpacing: "1px",
              }}
            >
              HAMBAR!
            </span>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* LOWER POP-SCIENCE CARD (FILLING THE LOWER VOID) */}
      {/* ========================================================= */}
      <div
        style={{
          width: "100%",
          maxWidth: 880,
          background: "#FFF",
          border: `8px solid ${THEME.colors.ink}`,
          boxShadow: THEME.colors.popShadowLarge,
          borderRadius: 36,
          padding: "32px 38px",
          marginTop: 50,
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
            <ShieldCheck size={40} color={THEME.colors.coral} strokeWidth={3} />
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: THEME.colors.ink,
              }}
            >
              SISTEM REDUKSI OTAK
            </span>
          </div>
          <div
            style={{
              background:
                volumeProgress > 30
                  ? THEME.colors.yellow
                  : THEME.colors.coral,
              color: volumeProgress > 30 ? THEME.colors.ink : "#FFF",
              border: `3px solid ${THEME.colors.ink}`,
              borderRadius: 14,
              padding: "6px 18px",
              fontSize: 24,
              fontWeight: 900,
              boxShadow: "3px 3px 0 #0F172A",
            }}
          >
            {volumeProgress > 30
              ? "PREDIKSI: MENURUN 📉"
              : "NOISE-CANCELLING: 100% 🔇"}
          </div>
        </div>

        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: THEME.colors.ink,
            lineHeight: 1.3,
          }}
        >
          {volumeProgress > 30
            ? "Otak sudah menebak sensasi sentuhan sebelum jarimu mendarat!"
            : "Area sensorik geli diredam otomatis hingga 0% (Hambar total)!"}
        </div>
      </div>
    </div>
  );
};
