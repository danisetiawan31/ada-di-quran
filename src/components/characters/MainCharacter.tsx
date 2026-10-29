import React from "react";
import { useCurrentFrame } from "remotion";

export type CharacterPose =
  // Bahasa Indonesia (Native User Names)
  | "senang"
  | "tertawa"
  | "terkejut"
  | "sedih"
  | "marah"
  | "bingung"
  | "wink"
  | "penasaran"
  | "datar"
  | "pusing"
  | "panik"
  // English Aliases / Compatibility
  | "idle"
  | "happy"
  | "laugh"
  | "shocked"
  | "sad"
  | "angry"
  | "confused"
  | "curious"
  | "neutral"
  | "dizzy"
  | "panic"
  | "hopeful"
  | "gloomy"
  | "impatient"
  | "peaceful"
  | "pointing";

export interface CharacterColors {
  skin: string;
  skinShade: string;
  hair: string;
  hairLine: string;
  brow: string;
  iris: string;
  koko: string;
  kokoShade: string;
  kokoCollar: string;
  kokoButton: string;
  outline: string;
  glasses: string;
  // Aliases untuk backward compatibility jika ada yang memanggil hoodie
  hoodie?: string;
  hoodieDark?: string;
  batikGold?: string;
}

export const DEFAULT_CHARACTER_COLORS: CharacterColors = {
  skin: "#EBA875",
  skinShade: "#D98A52",
  hair: "#33200F",
  hairLine: "#241408",
  brow: "#2E1C10",
  iris: "#6B3F1D",
  koko: "#FFFFFF", // Putih Bersih Islami
  kokoShade: "#E2E8F0", // Bayangan lembut kain katun
  kokoCollar: "#FFFFFF", // Kerah Shanghai Putih
  kokoButton: "#C2A15A", // Kancing emas serasi kacamata
  outline: "#12233F",
  glasses: "#C2A15A",
  hoodieDark: "#1E293B",
  batikGold: "#C2A15A",
};

export interface MainCharacterProps {
  pose?: CharacterPose;
  expression?: CharacterPose; // Alias untuk pose
  scale?: number;
  flip?: boolean;
  breathe?: boolean;
  blink?: boolean;
  tilt?: number; // Derajat kemiringan kepala manual (-15 sampai 15)
  customColors?: Partial<CharacterColors>;
  style?: React.CSSProperties;
}

const MOUTH_PROPS = {
  stroke: "#12233F",
  strokeWidth: 4,
  strokeLinejoin: "round" as const,
};

function brow(d: string, color = "#2E1C10", width = 9) {
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />;
}

function mouthOpen(y: number, h: number) {
  return (
    <>
      <path
        d={`M166 ${y} Q200 ${y - 8} 234 ${y} Q231 ${y + h} 200 ${y + h + 4} Q169 ${y + h} 166 ${y}Z`}
        fill="#7F1D2D"
        {...MOUTH_PROPS}
      />
      <path
        d={`M172 ${y + 2} Q200 ${y - 4} 228 ${y + 2} Q226 ${y + 10} 200 ${y + 10} Q174 ${y + 10} 172 ${y + 2}Z`}
        fill="#fff"
      />
      <ellipse cx="200" cy={y + h - 4} rx="13" ry="6" fill="#FB7185" />
    </>
  );
}

/**
 * `<MainCharacter />` — Karakter Maskot 2D Modern Resmi Channel "Ada di Quran".
 *
 * Fitur Unggulan (Hasil Peningkatan):
 * 1. Desain SVG Orisinal: Rambut ikal bervolume, kacamata bulat emas, bintik pipi manis, kerah hoodie motif batik.
 * 2. Secondary Motion & Nafas Alami: Bahu dan kepala memiliki ritme bernapas halus (tanpa kaku seperti gambar mati).
 * 3. Auto-Blinking Engine: Mata berkedip natural otomatis setiap ~3 detik (frame % 90), kecuali pada pose tertawa/merem.
 * 4. 11 Spektrum Ekspresi: Termasuk ekspresi 'pusing' (keracunan/dizzy) & 'panik' yang sangat krusial untuk Episode 03.
 * 5. Dynamic Gestures: Mendukung gestur tangan kartun (pointing, thinking, stop, wave).
 */
export const MainCharacter: React.FC<MainCharacterProps> = ({
  pose,
  expression,
  scale = 1.0,
  flip = false,
  breathe = true,
  blink = true,
  tilt,
  customColors,
  style,
}) => {
  const frame = useCurrentFrame();

  // Mapping nama pose / alias ke normalized key
  const activePoseKey = (expression || pose || "senang").toLowerCase();

  let normalizedPose = "senang";
  if (["senang", "idle", "happy", "peaceful"].includes(activePoseKey)) normalizedPose = "senang";
  else if (["tertawa", "laugh"].includes(activePoseKey)) normalizedPose = "tertawa";
  else if (["terkejut", "shocked"].includes(activePoseKey)) normalizedPose = "terkejut";
  else if (["sedih", "gloomy", "sad"].includes(activePoseKey)) normalizedPose = "sedih";
  else if (["marah", "angry"].includes(activePoseKey)) normalizedPose = "marah";
  else if (["bingung", "confused"].includes(activePoseKey)) normalizedPose = "bingung";
  else if (["wink"].includes(activePoseKey)) normalizedPose = "wink";
  else if (["penasaran", "hopeful", "curious"].includes(activePoseKey)) normalizedPose = "penasaran";
  else if (["datar", "impatient", "neutral"].includes(activePoseKey)) normalizedPose = "datar";
  else if (["pusing", "dizzy"].includes(activePoseKey)) normalizedPose = "pusing";
  else if (["panik", "panic"].includes(activePoseKey)) normalizedPose = "panik";
  else if (activePoseKey === "pointing") {
    normalizedPose = "senang";
  }

  const c: CharacterColors = {
    ...DEFAULT_CHARACTER_COLORS,
    ...customColors,
  };

  // Scoped unique SVG ID untuk pola batik
  const rawId = React.useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");

  // Rigging: Gerakan Nafas Halus
  const breatheOffset = breathe ? Math.sin(frame / 16) * 3 : 0;
  const chestBreathe = breathe ? Math.sin(frame / 16 + 0.4) * 1.8 : 0;

  // Auto-Blink: Kedip natural setiap 90 frames (~3 detik), durasi 4 frames
  const blinkCycle = frame % 90;
  const isBlinking = blink && blinkCycle >= 86 && blinkCycle <= 89;

  // Head Tilt Alami berdasarkan ekspresi jika tidak diatur manual
  let defaultTilt = 0;
  if (normalizedPose === "penasaran") defaultTilt = -3.5;
  else if (normalizedPose === "bingung") defaultTilt = 3.5;
  else if (normalizedPose === "pusing") defaultTilt = Math.sin(frame / 10) * 4;
  else if (normalizedPose === "panik") defaultTilt = Math.sin(frame * 1.5) * 2;
  const finalTilt = tilt !== undefined ? tilt : defaultTilt;

  // Helper render mata terbuka dengan dukungan kedip otomatis
  const renderEye = (cx: number, cy: number, s = 1, dx = 0, canBlink = true) => {
    if (canBlink && isBlinking) {
      return (
        <path
          d={`M${cx - 18 * s} ${cy + 2} Q${cx} ${cy - 8 * s} ${cx + 18 * s} ${cy + 2}`}
          fill="none"
          stroke={c.outline}
          strokeWidth={4.5 * s}
          strokeLinecap="round"
        />
      );
    }
    return (
      <g>
        <circle cx={cx} cy={cy} r={20 * s} fill="#fff" stroke={c.outline} strokeWidth="2" />
        <circle cx={cx + dx} cy={cy + 1} r={13 * s} fill={c.iris} />
        <circle cx={cx + dx} cy={cy + 1} r={7 * s} fill={c.outline} />
        <circle cx={cx + dx + 5 * s} cy={cy - 5 * s} r={3.5 * s} fill="#fff" />
      </g>
    );
  };

  const renderEyeClosed = (cx: number, cy: number) => (
    <path
      d={`M${cx - 20} ${cy} Q${cx} ${cy - 22} ${cx + 20} ${cy}`}
      fill="none"
      stroke={c.outline}
      strokeWidth="6"
      strokeLinecap="round"
    />
  );

  // Render 11 Macam Ekspresi Wajah
  const renderFaceContent = () => {
    switch (normalizedPose) {
      case "tertawa":
        return (
          <>
            {brow("M128 122 Q160 108 192 122", c.brow)}
            {brow("M208 122 Q240 108 272 122", c.brow)}
            {renderEyeClosed(160, 154)}
            {renderEyeClosed(240, 154)}
            {mouthOpen(200, 48)}
            <ellipse cx="118" cy="188" rx="14" ry="8" fill="#FB7185" opacity=".4" />
            <ellipse cx="282" cy="188" rx="14" ry="8" fill="#FB7185" opacity=".4" />
          </>
        );

      case "terkejut":
        return (
          <>
            {brow("M128 106 Q160 92 192 106", c.brow)}
            {brow("M208 106 Q240 92 272 106", c.brow)}
            {renderEye(160, 152, 1.15, 0, false)}
            {renderEye(240, 152, 1.15, 0, false)}
            <ellipse cx="200" cy="224" rx="18" ry="22" fill="#7F1D2D" {...MOUTH_PROPS} />
            <ellipse cx="200" cy="232" rx="12" ry="8" fill="#FB7185" />
          </>
        );

      case "sedih":
        return (
          <>
            {brow("M128 116 L192 132", c.brow)}
            {brow("M272 116 L208 132", c.brow)}
            <ellipse cx="160" cy="154" rx="16" ry="11" fill="#fff" stroke={c.outline} strokeWidth="2" />
            <circle cx="160" cy="158" r="8" fill={c.iris} />
            <circle cx="160" cy="158" r="4" fill={c.outline} />
            <ellipse cx="240" cy="154" rx="16" ry="11" fill="#fff" stroke={c.outline} strokeWidth="2" />
            <circle cx="240" cy="158" r="8" fill={c.iris} />
            <circle cx="240" cy="158" r="4" fill={c.outline} />
            {/* Tetes air mata berkilau */}
            <path
              d="M138 170 Q132 186 140 192 Q148 186 142 170Z"
              fill="#38BDF8"
              stroke={c.outline}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M170 234 Q200 216 230 234" fill="none" stroke={c.outline} strokeWidth="5" strokeLinecap="round" />
          </>
        );

      case "marah":
        return (
          <>
            {brow("M124 112 L194 134", c.brow, 10)}
            {brow("M276 112 L206 134", c.brow, 10)}
            <ellipse cx="160" cy="154" rx="17" ry="10" fill="#fff" stroke={c.outline} strokeWidth="2" />
            <circle cx="160" cy="155" r="8" fill={c.iris} />
            <circle cx="160" cy="155" r="4" fill={c.outline} />
            <ellipse cx="240" cy="154" rx="17" ry="10" fill="#fff" stroke={c.outline} strokeWidth="2" />
            <circle cx="240" cy="155" r="8" fill={c.iris} />
            <circle cx="240" cy="155" r="4" fill={c.outline} />
            <path
              d="M172 234 L186 226 L200 234 L214 226 L228 234"
              fill="none"
              stroke={c.outline}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Vena marah kecil di pelipis kanan */}
            <path
              d="M272 100 L280 106 L288 102 M280 106 L282 114"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        );

      case "bingung":
        return (
          <>
            {brow("M128 106 Q160 92 192 106", c.brow)}
            <path d="M210 128 L272 128" fill="none" stroke={c.brow} strokeWidth="9" strokeLinecap="round" />
            {renderEye(160, 152, 1.08, 0, true)}
            {renderEye(240, 152, 0.82, 0, true)}
            <path
              d="M172 220 Q186 208 200 220 Q214 232 228 220"
              fill="none"
              stroke={c.outline}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </>
        );

      case "wink":
        return (
          <>
            {brow("M128 122 Q160 108 192 122", c.brow)}
            {brow("M208 122 Q240 108 272 122", c.brow)}
            {renderEyeClosed(160, 154)}
            {renderEye(240, 152, 1, 0, false)}
            <path d="M168 214 Q205 236 238 208" fill="none" stroke={c.outline} strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="282" cy="188" rx="14" ry="7" fill="#FB923C" opacity=".35" />
          </>
        );

      case "penasaran":
        return (
          <>
            {brow("M128 108 Q160 94 192 108", c.brow)}
            {brow("M208 108 Q240 94 272 108", c.brow)}
            {/* Melirik ke atas samping */}
            {renderEye(160, 152, 1.0, 5, true)}
            {renderEye(240, 152, 1.0, 5, true)}
            <ellipse cx="202" cy="218" rx="14" ry="16" fill="#7F1D2D" {...MOUTH_PROPS} />
            <ellipse cx="202" cy="224" rx="8" ry="6" fill="#FB7185" />
            <ellipse cx="120" cy="188" rx="12" ry="7" fill="#FB923C" opacity=".25" />
            <ellipse cx="280" cy="188" rx="12" ry="7" fill="#FB923C" opacity=".25" />
          </>
        );

      case "datar":
        return (
          <>
            {brow("M130 124 L190 124", c.brow)}
            {brow("M210 124 L270 124", c.brow)}
            {renderEye(160, 152, 0.88, 0, true)}
            {renderEye(240, 152, 0.88, 0, true)}
            <path d="M172 220 L228 220" fill="none" stroke={c.outline} strokeWidth="5" strokeLinecap="round" />
          </>
        );

      case "pusing": {
        // Spiral dizziness untuk keracunan / pestisida (Episode 03 Scene 3)
        const rot = (frame * 10) % 360;
        return (
          <>
            {brow("M128 116 Q160 128 192 116", c.brow)}
            {brow("M208 116 Q240 128 272 116", c.brow)}
            {/* Mata Spiral Berputar Kiri */}
            <g transform={`rotate(${rot} 160 152)`}>
              <circle cx="160" cy="152" r="22" fill="#FEF08A" stroke={c.outline} strokeWidth="2" />
              <path
                d="M160 152 m-3,0 a3,3 0 1,0 6,0 a6,6 0 1,0 -12,0 a9,9 0 1,0 18,0 a13,13 0 1,0 -26,0"
                fill="none"
                stroke={c.outline}
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </g>
            {/* Mata Spiral Berputar Kanan (Berlawanan arah) */}
            <g transform={`rotate(${-rot} 240 152)`}>
              <circle cx="240" cy="152" r="22" fill="#FEF08A" stroke={c.outline} strokeWidth="2" />
              <path
                d="M240 152 m-3,0 a3,3 0 1,0 6,0 a6,6 0 1,0 -12,0 a9,9 0 1,0 18,0 a13,13 0 1,0 -26,0"
                fill="none"
                stroke={c.outline}
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </g>
            {/* Mulut lemas bergelombang */}
            <path
              d="M174 226 Q187 218 200 226 Q213 234 226 226"
              fill="none"
              stroke={c.outline}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Rona pucat kehijauan mual */}
            <ellipse cx="118" cy="188" rx="16" ry="9" fill="#84CC16" opacity=".35" />
            <ellipse cx="282" cy="188" rx="16" ry="9" fill="#84CC16" opacity=".35" />
            {/* Bintang pusing kecil di atas kepala */}
            <path
              d="M192 18 L196 8 L200 18 L210 18 L202 24 L205 34 L196 28 L187 34 L190 24 L182 18 Z"
              fill="#FACC15"
              stroke={c.outline}
              strokeWidth="2"
            />
          </>
        );
      }

      case "panik": {
        // Panik tertekan (tremor pupil + tetes keringat biru)
        const shake = Math.sin(frame * 2.2) * 2;
        return (
          <>
            {brow("M128 106 L192 120", c.brow, 10)}
            {brow("M272 106 L208 120", c.brow, 10)}
            {/* Mata melotot dengan pupil bergetar ketakutan */}
            <circle cx="160" cy="152" r="22" fill="#fff" stroke={c.outline} strokeWidth="2.5" />
            <circle cx={160 + shake} cy="153" r="7" fill={c.outline} />
            <circle cx={160 + shake + 2} cy="150" r="2.5" fill="#fff" />

            <circle cx="240" cy="152" r="22" fill="#fff" stroke={c.outline} strokeWidth="2.5" />
            <circle cx={240 + shake} cy="153" r="7" fill={c.outline} />
            <circle cx={240 + shake + 2} cy="150" r="2.5" fill="#fff" />

            {/* Mulut teriak panik */}
            <ellipse cx="200" cy="226" rx="20" ry="16" fill="#7F1D2D" {...MOUTH_PROPS} />
            <ellipse cx="200" cy="232" rx="12" ry="7" fill="#FB7185" />
            {/* Tetesan keringat dingin besar di pelipis kiri */}
            <path
              d="M94 112 Q84 132 94 140 Q104 132 94 112Z"
              fill="#38BDF8"
              stroke={c.outline}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </>
        );
      }

      case "senang":
      default:
        return (
          <>
            {brow("M128 122 Q160 108 192 122", c.brow)}
            {brow("M208 122 Q240 108 272 122", c.brow)}
            {renderEye(160, 152, 1, 0, true)}
            {renderEye(240, 152, 1, 0, true)}
            {mouthOpen(208, 32)}
            <ellipse cx="118" cy="188" rx="13" ry="7" fill="#FB923C" opacity=".3" />
            <ellipse cx="282" cy="188" rx="13" ry="7" fill="#FB923C" opacity=".3" />
          </>
        );
    }
  };

  const finalWidth = 400 * scale;
  const finalHeight = 360 * scale;

  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "flex-end",
        width: finalWidth,
        height: finalHeight,
        transform: flip ? "scaleX(-1)" : undefined,
        overflow: "visible",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 400 360"
        width={finalWidth}
        height={finalHeight}
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Pola Batik Khas Kerah Hoodie */}
          <pattern id={`batik-${uid}`} width="26" height="26" patternUnits="userSpaceOnUse">
            <rect width="26" height="26" fill={c.hoodieDark} />
            <path d="M13 4 L19 13 L13 22 L7 13Z" fill="none" stroke={c.batikGold} strokeWidth="2" />
            <circle cx="13" cy="13" r="3" fill={c.batikGold} />
            <circle cx="2" cy="2" r="2" fill={c.batikGold} opacity=".7" />
            <circle cx="24" cy="24" r="2" fill={c.batikGold} opacity=".7" />
          </pattern>
        </defs>

        {/* =========================================================================
            LAYER 1: TUBUH & BAJU KOKO MODERN (Solid, Rapi, Bebas Celah)
           ========================================================================= */}
        <g id="body-layer" transform={`translate(0, ${chestBreathe})`}>
          {/* Leher */}
          <rect
            x="180"
            y="238"
            width="40"
            height="46"
            rx="10"
            fill={c.skin}
            stroke={c.outline}
            strokeWidth="4"
          />

          {/* Badan Baju Koko Modern — Solid Utuh dari Bahu ke Leher */}
          <path
            d="M86 360 L86 314 Q130 284 176 270 L224 270 Q270 284 314 314 L314 360 Z"
            fill={c.koko}
            stroke={c.outline}
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Saku Dada Kiri (Breast Pocket) */}
          <g id="koko-pocket">
            <rect
              x="240"
              y="308"
              width="28"
              height="32"
              rx="4"
              fill={c.koko}
              stroke={c.outline}
              strokeWidth="3.5"
            />
            {/* Aksen Garis Emas di Atas Saku */}
            <path
              d="M241 314 L267 314"
              stroke={c.kokoButton}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* Plaket Kancing Dada Vertikal */}
          <rect
            x="193"
            y="284"
            width="14"
            height="76"
            rx="2"
            fill={c.koko}
            stroke={c.outline}
            strokeWidth="3.5"
          />

          {/* 3 Kancing Elegan (Warna Emas Kacamata) */}
          <circle cx="200" cy="302" r="3.5" fill={c.kokoButton} stroke={c.outline} strokeWidth="1.5" />
          <circle cx="200" cy="322" r="3.5" fill={c.kokoButton} stroke={c.outline} strokeWidth="1.5" />
          <circle cx="200" cy="342" r="3.5" fill={c.kokoButton} stroke={c.outline} strokeWidth="1.5" />

          {/* Kerah Shanghai / Mandarin Collar (Melingkar Pas di Pangkal Leher) */}
          <g id="mandarin-collar">
            <path
              d="M172 274 Q200 258 228 274 L224 286 Q200 272 176 286 Z"
              fill={c.kokoCollar}
              stroke={c.outline}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Aksen Jahitan Emas Halus di Tepi Atas Kerah */}
            <path
              d="M174 274 Q200 260 226 274"
              fill="none"
              stroke={c.kokoButton}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Celah Kancing Kerah Tengah */}
            <line x1="200" y1="274" x2="200" y2="284" stroke={c.outline} strokeWidth="2.5" />
          </g>
        </g>

        {/* =========================================================================
            LAYER 2: KEPALA & WAJAH (Dengan Secondary Motion Nafas & Head Tilt)
           ========================================================================= */}
        <g
          id="head-layer"
          transform={`translate(0, ${breatheOffset}) rotate(${finalTilt} 200 160)`}
        >
          {/* Telinga Kiri & Kanan */}
          <circle cx="98" cy="165" r="26" fill={c.skin} stroke={c.outline} strokeWidth="4" />
          <circle cx="302" cy="165" r="26" fill={c.skin} stroke={c.outline} strokeWidth="4" />
          <path
            d="M92 158 Q98 168 92 176"
            fill="none"
            stroke={c.skinShade}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M308 158 Q302 168 308 176"
            fill="none"
            stroke={c.skinShade}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Bentuk Kepala Utama */}
          <ellipse
            cx="200"
            cy="160"
            rx="103"
            ry="96"
            fill={c.skin}
            stroke={c.outline}
            strokeWidth="5"
          />

          {/* Shading Pipi Halus */}
          <ellipse cx="122" cy="175" rx="14" ry="26" fill={c.skinShade} opacity=".15" />
          <ellipse cx="278" cy="175" rx="14" ry="26" fill={c.skinShade} opacity=".15" />

          {/* Rambut Ikal Bervolume */}
          <path
            d="M96 148 C78 118 84 78 110 62 C102 40 128 28 148 38 C148 18 178 12 196 26 C210 10 240 16 246 36 C268 22 294 36 288 58 C312 72 320 112 304 148 C296 122 278 112 260 118 C248 104 228 104 214 116 C200 102 182 102 168 116 C150 104 130 110 118 122 C106 112 98 128 96 148 Z"
            fill={c.hair}
            stroke={c.outline}
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Tekstur Ikal Rambut */}
          <g fill="none" stroke={c.hairLine} strokeWidth="3" opacity=".45" strokeLinecap="round">
            <path d="M132 58 Q150 44 170 58" />
            <path d="M190 42 Q210 28 230 42" />
            <path d="M248 58 Q268 46 284 62" />
            <path d="M150 102 Q165 92 180 102" />
            <path d="M220 102 Q235 92 250 102" />
          </g>

          {/* Hidung Kartun Minimalis */}
          <path
            d="M192 188 Q200 198 208 188"
            fill="none"
            stroke="#C97A45"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Bintik Manis di Pipi (Freckles) */}
          <g fill="#B96A35" opacity=".35">
            <circle cx="130" cy="188" r="2" />
            <circle cx="142" cy="194" r="1.8" />
            <circle cx="124" cy="196" r="1.8" />
            <circle cx="270" cy="188" r="2" />
            <circle cx="258" cy="194" r="1.8" />
            <circle cx="276" cy="196" r="1.8" />
          </g>

          {/* Layer Ekspresi Wajah (Alis, Mata, Mulut, Emosi) */}
          <g id="face-expression">{renderFaceContent()}</g>

          {/* Kacamata Bulat Emas Ikonik */}
          <g fill="none" stroke={c.glasses} strokeWidth="5" strokeLinecap="round">
            <circle cx="160" cy="152" r="38" />
            <circle cx="240" cy="152" r="38" />
            <path d="M182 140 Q200 128 218 140" />
            <path d="M118 150 L100 144" />
            <path d="M282 150 L300 144" />
          </g>

          {/* Efek Kilau Kaca Kacamata */}
          <path
            d="M132 130 Q144 120 158 124"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".65"
          />
          <path
            d="M212 130 Q224 120 238 124"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".65"
          />
        </g>
      </svg>
    </div>
  );
};
