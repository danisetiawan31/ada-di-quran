import React from "react";
import { AbsoluteFill } from "remotion";

const COLORS = {
  skin: "#EBA875",
  skinShade: "#D98A52",
  hair: "#33200F",
  hairLine: "#241408",
  brow: "#2E1C10",
  iris: "#6B3F1D",
  hoodie: "#1B8A9A",
  hoodieDark: "#146E7A",
  batikGold: "#E8B84B",
  outline: "#12233F",
  glasses: "#C2A15A",
};

function eyeOpen(cx: number, cy: number, s = 1, dx = 0) {
  return (
    <>
      <circle cx={cx} cy={cy} r={20 * s} fill="#fff" stroke="#12233F" strokeWidth="2" />
      <circle cx={cx + dx} cy={cy + 1} r={13 * s} fill={COLORS.iris} />
      <circle cx={cx + dx} cy={cy + 1} r={7 * s} fill="#12233F" />
      <circle cx={cx + dx + 5 * s} cy={cy - 5 * s} r={3.5 * s} fill="#fff" />
    </>
  );
}

function eyeClosed(cx: number, cy: number) {
  return (
    <path
      d={`M${cx - 20} ${cy} Q${cx} ${cy - 22} ${cx + 20} ${cy}`}
      fill="none"
      stroke="#12233F"
      strokeWidth="6"
      strokeLinecap="round"
    />
  );
}

function brow(d: string) {
  return <path d={d} fill="none" stroke={COLORS.brow} strokeWidth="9" strokeLinecap="round" />;
}

const MOUTH_PROPS = {
  stroke: "#12233F",
  strokeWidth: 4,
  strokeLinejoin: "round" as const,
};

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

const FACES: Record<string, React.ReactNode> = {
  Senang: (
    <>
      {brow("M128 122 Q160 108 192 122")}
      {brow("M208 122 Q240 108 272 122")}
      {eyeOpen(160, 152)}
      {eyeOpen(240, 152)}
      {mouthOpen(208, 32)}
      <ellipse cx="118" cy="188" rx="13" ry="7" fill="#FB923C" opacity=".3" />
      <ellipse cx="282" cy="188" rx="13" ry="7" fill="#FB923C" opacity=".3" />
    </>
  ),
  Tertawa: (
    <>
      {brow("M128 122 Q160 108 192 122")}
      {brow("M208 122 Q240 108 272 122")}
      {eyeClosed(160, 154)}
      {eyeClosed(240, 154)}
      {mouthOpen(200, 48)}
    </>
  ),
  Terkejut: (
    <>
      {brow("M128 110 Q160 96 192 110")}
      {brow("M208 110 Q240 96 272 110")}
      {eyeOpen(160, 152, 1.1)}
      {eyeOpen(240, 152, 1.1)}
      <ellipse cx="200" cy="222" rx="16" ry="20" fill="#7F1D2D" {...MOUTH_PROPS} />
    </>
  ),
  Sedih: (
    <>
      {brow("M128 116 L192 132")}
      {brow("M272 116 L208 132")}
      <ellipse cx="160" cy="154" rx="16" ry="11" fill="#fff" stroke="#12233F" strokeWidth="2" />
      <circle cx="160" cy="158" r="8" fill={COLORS.iris} />
      <circle cx="160" cy="158" r="4" fill="#12233F" />
      <ellipse cx="240" cy="154" rx="16" ry="11" fill="#fff" stroke="#12233F" strokeWidth="2" />
      <circle cx="240" cy="158" r="8" fill={COLORS.iris} />
      <circle cx="240" cy="158" r="4" fill="#12233F" />
      <path
        d="M138 170 Q132 186 140 192 Q148 186 142 170Z"
        fill="#38BDF8"
        stroke="#12233F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M170 234 Q200 214 230 234" fill="none" stroke="#12233F" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  Marah: (
    <>
      {brow("M126 114 L192 134")}
      {brow("M274 114 L208 134")}
      <ellipse cx="160" cy="154" rx="17" ry="10" fill="#fff" stroke="#12233F" strokeWidth="2" />
      <circle cx="160" cy="155" r="8" fill={COLORS.iris} />
      <circle cx="160" cy="155" r="4" fill="#12233F" />
      <ellipse cx="240" cy="154" rx="17" ry="10" fill="#fff" stroke="#12233F" strokeWidth="2" />
      <circle cx="240" cy="155" r="8" fill={COLORS.iris} />
      <circle cx="240" cy="155" r="4" fill="#12233F" />
      <path
        d="M172 234 L186 226 L200 234 L214 226 L228 234"
        fill="none"
        stroke="#12233F"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  Bingung: (
    <>
      {brow("M128 108 Q160 94 192 108")}
      <path d="M210 128 L270 128" fill="none" stroke={COLORS.brow} strokeWidth="9" strokeLinecap="round" />
      {eyeOpen(160, 152, 1.05)}
      {eyeOpen(240, 152, 0.8)}
      <path
        d="M172 218 Q186 208 200 218 Q214 228 228 218"
        fill="none"
        stroke="#12233F"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  ),
  Wink: (
    <>
      {brow("M128 122 Q160 108 192 122")}
      {brow("M208 122 Q240 108 272 122")}
      {eyeClosed(160, 154)}
      {eyeOpen(240, 152)}
      <path d="M168 214 Q205 234 238 208" fill="none" stroke="#12233F" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="282" cy="188" rx="13" ry="7" fill="#FB923C" opacity=".3" />
    </>
  ),
  Penasaran: (
    <>
      {brow("M128 110 Q160 96 192 110")}
      {brow("M208 110 Q240 96 272 110")}
      {eyeOpen(160, 152, 1, 5)}
      {eyeOpen(240, 152, 1, 5)}
      <ellipse cx="200" cy="218" rx="13" ry="15" fill="#7F1D2D" {...MOUTH_PROPS} />
    </>
  ),
  Datar: (
    <>
      {brow("M130 124 L190 124")}
      {brow("M210 124 L270 124")}
      {eyeOpen(160, 152, 0.85)}
      {eyeOpen(240, 152, 0.85)}
      <path d="M172 220 L228 220" fill="none" stroke="#12233F" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
};

export const UserSvgCharacter: React.FC<{ expression: string; uid: string }> = ({
  expression,
  uid,
}) => {
  const c = COLORS;
  const face = FACES[expression] || FACES.Senang;

  return (
    <svg viewBox="0 0 400 360" width="100%" height="100%" style={{ overflow: "visible" }}>
      <defs>
        <pattern id={`batik-${uid}`} width="26" height="26" patternUnits="userSpaceOnUse">
          <rect width="26" height="26" fill={c.hoodieDark} />
          <path d="M13 4 L19 13 L13 22 L7 13Z" fill="none" stroke={c.batikGold} strokeWidth="2" />
          <circle cx="13" cy="13" r="3" fill={c.batikGold} />
          <circle cx="2" cy="2" r="2" fill={c.batikGold} opacity=".7" />
          <circle cx="24" cy="24" r="2" fill={c.batikGold} opacity=".7" />
        </pattern>
      </defs>
      {/* leher */}
      <rect x="180" y="238" width="40" height="40" rx="10" fill={c.skin} stroke={c.outline} strokeWidth="4" />
      {/* bahu / hoodie */}
      <path
        d="M92 360 L92 316 Q200 276 308 316 L308 360 Z"
        fill={c.hoodie}
        stroke={c.outline}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* tali ransel */}
      <rect x="132" y="300" width="24" height="60" rx="9" fill="#1F2937" stroke={c.outline} strokeWidth="4" />
      <rect x="244" y="300" width="24" height="60" rx="9" fill="#1F2937" stroke={c.outline} strokeWidth="4" />
      {/* pin lampu + patch bendera */}
      <circle cx="144" cy="318" r="7" fill="#FDE68A" stroke={c.outline} strokeWidth="3" />
      <rect x="250" y="310" width="14" height="5" fill="#EF4444" />
      <rect x="250" y="315" width="14" height="5" fill="#fff" stroke={c.outline} strokeWidth="1" />
      {/* kerah hoodie batik */}
      <path
        d="M148 300 Q200 272 252 300 L242 328 Q200 312 158 328 Z"
        fill={`url(#batik-${uid})`}
        stroke={c.outline}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* telinga */}
      <circle cx="98" cy="165" r="26" fill={c.skin} stroke={c.outline} strokeWidth="4" />
      <circle cx="302" cy="165" r="26" fill={c.skin} stroke={c.outline} strokeWidth="4" />
      <path d="M92 158 Q98 168 92 176" fill="none" stroke={c.skinShade} strokeWidth="3" strokeLinecap="round" />
      <path d="M308 158 Q302 168 308 176" fill="none" stroke={c.skinShade} strokeWidth="3" strokeLinecap="round" />
      {/* kepala */}
      <ellipse cx="200" cy="160" rx="103" ry="96" fill={c.skin} stroke={c.outline} strokeWidth="5" />
      {/* shading pipi */}
      <ellipse cx="122" cy="175" rx="14" ry="26" fill={c.skinShade} opacity=".15" />
      <ellipse cx="278" cy="175" rx="14" ry="26" fill={c.skinShade} opacity=".15" />
      {/* RAMBUT */}
      <path
        d="M96 148 C78 118 84 78 110 62 C102 40 128 28 148 38 C148 18 178 12 196 26 C210 10 240 16 246 36 C268 22 294 36 288 58 C312 72 320 112 304 148 C296 122 278 112 260 118 C248 104 228 104 214 116 C200 102 182 102 168 116 C150 104 130 110 118 122 C106 112 98 128 96 148 Z"
        fill={c.hair}
        stroke={c.outline}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* ikal rambut */}
      <g fill="none" stroke={c.hairLine} strokeWidth="3" opacity=".45" strokeLinecap="round">
        <path d="M132 58 Q150 44 170 58" />
        <path d="M190 42 Q210 28 230 42" />
        <path d="M248 58 Q268 46 284 62" />
        <path d="M150 102 Q165 92 180 102" />
        <path d="M220 102 Q235 92 250 102" />
      </g>
      {/* hidung */}
      <path d="M192 188 Q200 198 208 188" fill="none" stroke="#C97A45" strokeWidth="3.5" strokeLinecap="round" />
      {/* bintik pipi */}
      <g fill="#B96A35" opacity=".35">
        <circle cx="130" cy="188" r="2" />
        <circle cx="142" cy="194" r="1.8" />
        <circle cx="124" cy="196" r="1.8" />
        <circle cx="270" cy="188" r="2" />
        <circle cx="258" cy="194" r="1.8" />
        <circle cx="276" cy="196" r="1.8" />
      </g>
      {/* ekspresi wajah */}
      <g>{face}</g>
      {/* kacamata */}
      <g fill="none" stroke={c.glasses} strokeWidth="5" strokeLinecap="round">
        <circle cx="160" cy="152" r="38" />
        <circle cx="240" cy="152" r="38" />
        <path d="M182 140 Q200 128 218 140" />
        <path d="M118 150 L100 144" />
        <path d="M282 150 L300 144" />
      </g>
      <path d="M132 130 Q144 120 158 124" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".6" />
      <path d="M212 130 Q224 120 238 124" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".6" />
    </svg>
  );
};

export const UserCharacterTest: React.FC = () => {
  const names = Object.keys(FACES);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#12233F",
        padding: "40px 30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ color: "#38BDF8", fontSize: 40, margin: "0 0 20px 0", textAlign: "center" }}>
        Evaluasi Source Code SVG User (9 Ekspresi)
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          width: "100%",
          maxWidth: 1020,
        }}
      >
        {names.map((n, i) => (
          <div
            key={n}
            style={{
              backgroundColor: "#F6F1E7",
              borderRadius: 18,
              padding: "12px 10px 8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%", height: 210 }}>
              <UserSvgCharacter expression={n} uid={`user-${i}`} />
            </div>
            <span style={{ color: "#12233F", fontWeight: 800, fontSize: 18, marginTop: 4 }}>
              {n}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
