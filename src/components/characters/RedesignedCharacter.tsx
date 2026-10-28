import React from "react";
import { useCurrentFrame } from "remotion";

export interface RedesignedCharacterProps {
  pose?: "idle" | "panic" | "dizzy" | "peaceful";
  scale?: number;
  style?: React.CSSProperties;
}

export const RedesignedCharacter: React.FC<RedesignedCharacterProps> = ({
  pose = "idle",
  scale = 1.0,
  style,
}) => {
  const frame = useCurrentFrame();

  const breatheY = Math.sin(frame / 15) * 3;
  const shakeX = pose === "panic" ? Math.sin(frame * 0.8) * 4 : 0;
  const dizzyWobble = pose === "dizzy" ? Math.sin(frame * 0.25) * 5 : 0;
  const sweatFloat = Math.sin(frame * 0.2) * 5;
  const isBlinking = frame % 90 < 4 && pose !== "panic" && pose !== "peaceful" && pose !== "dizzy";

  // Natural warm skin tone (Indonesian/Asian warm honey)
  const skin = "#F6C8A4";
  const skinShadow = "#E4AC84";
  const hair = "#1E293B";
  const hairHighlight = "#334155";
  const hoodie = "#0284C7";
  const hoodieDark = "#0369A1";
  const hoodieLight = "#38BDF8";
  const pants = "#334155";
  const shoeWhite = "#F8FAFC";
  const shoeBase = "#0F172A";

  return (
    <div
      style={{
        width: 320,
        height: 500,
        transform: `scale(${scale}) translate(${shakeX + dizzyWobble}px, 0px)`,
        transformOrigin: "bottom center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.22))",
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 320 500"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="hoodieGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={hoodieLight} />
            <stop offset="100%" stopColor={hoodie} />
          </linearGradient>
          <linearGradient id="hairGradNew" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hairHighlight} />
            <stop offset="100%" stopColor={hair} />
          </linearGradient>
        </defs>

        {/* 1. GROUND SHADOW */}
        <ellipse cx="160" cy="482" rx="95" ry="14" fill="rgba(0,0,0,0.24)" />

        {/* 2. LEGS & SNEAKERS (Grounded) */}
        {pose === "peaceful" ? (
          // Sitting cross-legged
          <g>
            <path d="M125 390 Q90 430 75 465 L125 465 Q135 435 145 395 Z" fill={pants} />
            <path d="M185 390 Q220 430 235 465 L185 465 Q175 435 165 395 Z" fill={pants} />
            {/* Left Sneaker */}
            <path d="M70 460 Q95 450 120 460 L120 472 L65 472 Z" fill={shoeBase} />
            <rect x="65" y="470" width="55" height="6" rx="3" fill={shoeWhite} />
            {/* Right Sneaker */}
            <path d="M190 460 Q215 450 240 460 L245 472 L190 472 Z" fill={shoeBase} />
            <rect x="190" y="470" width="55" height="6" rx="3" fill={shoeWhite} />
          </g>
        ) : (
          // Standing Legs with Modern Sneakers
          <g>
            {/* Left Leg */}
            <path d="M124 370 L122 455 L152 455 L150 370 Z" fill={pants} />
            {/* Right Leg */}
            <path d="M168 370 L166 455 L196 455 L194 370 Z" fill={pants} />
            {/* Pants cuff fold */}
            <rect x="120" y="448" width="34" height="7" rx="3" fill="#1E293B" opacity="0.4" />
            <rect x="164" y="448" width="34" height="7" rx="3" fill="#1E293B" opacity="0.4" />

            {/* Left Sneaker (Modern Streetwear) */}
            <g>
              <path d="M106 462 Q125 448 152 454 L154 476 L104 476 Q100 468 106 462 Z" fill={shoeBase} />
              {/* White Rubber Sole */}
              <rect x="102" y="470" width="54" height="8" rx="4" fill={shoeWhite} />
              {/* White Toe Cap */}
              <path d="M102 470 Q106 462 114 464 L114 474 L102 474 Z" fill={shoeWhite} />
            </g>

            {/* Right Sneaker */}
            <g>
              <path d="M164 454 Q191 448 210 462 Q216 468 212 476 L162 476 L164 454 Z" fill={shoeBase} />
              {/* White Rubber Sole */}
              <rect x="160" y="470" width="54" height="8" rx="4" fill={shoeWhite} />
              {/* White Toe Cap */}
              <path d="M202 464 Q210 462 214 470 L202 474 Z" fill={shoeWhite} />
            </g>
          </g>
        )}

        {/* 3. UPPER BODY GROUP (Breathing naturally together) */}
        <g transform={`translate(0, ${breatheY})`}>
          {/* Back Hair (Visible behind neck/ears for depth) */}
          <path
            d="M98 140 C95 190 115 205 130 208 L190 208 C205 205 225 190 222 140 Z"
            fill={hair}
          />

          {/* Neck */}
          <path d="M146 185 L146 220 Q160 224 174 220 L174 185 Z" fill={skinShadow} />

          {/* Torso / Hoodie */}
          <g>
            {/* Hoodie Body */}
            <path
              d="M102 225 C88 265 92 360 112 376 L208 376 C228 360 232 265 218 225 C195 218 125 218 102 225 Z"
              fill="url(#hoodieGradNew)"
            />
            {/* Bottom Waistband Ribbing */}
            <rect x="108" y="366" width="104" height="14" rx="5" fill={hoodieDark} />

            {/* Kangaroo Pocket */}
            <path
              d="M122 305 Q160 316 198 305 L204 352 Q160 362 116 352 Z"
              fill={hoodieDark}
              opacity="0.88"
            />
            {/* Pocket entry slit shadows */}
            <path d="M122 305 L116 352" stroke="#024D74" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M198 305 L204 352" stroke="#024D74" strokeWidth="2.5" strokeLinecap="round" />

            {/* Hoodie Collar / Neckline overlapping */}
            <path
              d="M128 220 Q160 242 192 220 Q175 246 160 248 Q145 246 128 220 Z"
              fill={hoodieDark}
            />

            {/* White Hoodie Drawstrings with Aglets */}
            <path d="M148 238 Q145 275 147 288" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M172 238 Q175 275 173 288" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="145" y="288" width="4" height="8" rx="1.5" fill="#CBD5E1" />
            <rect x="171" y="288" width="4" height="8" rx="1.5" fill="#CBD5E1" />
          </g>

          {/* Arms & Hands */}
          {pose === "idle" && (
            <g>
              {/* Left Arm with sleeve cuff & natural thumb */}
              <path d="M104 230 C86 270 90 320 100 342" fill="none" stroke={hoodieDark} strokeWidth="28" strokeLinecap="round" />
              <path d="M104 230 C86 270 90 320 100 342" fill="none" stroke={hoodie} strokeWidth="22" strokeLinecap="round" />
              {/* Sleeve cuff */}
              <rect x="88" y="334" width="24" height="8" rx="3" fill={hoodieDark} transform="rotate(15, 100, 338)" />
              {/* Hand with thumb */}
              <ellipse cx="102" cy="354" rx="13" ry="15" fill={skin} stroke={skinShadow} strokeWidth="1.5" />
              <ellipse cx="94" cy="350" rx="5" ry="6" fill={skin} />

              {/* Right Arm with sleeve cuff & natural thumb */}
              <path d="M216 230 C234 270 230 320 220 342" fill="none" stroke={hoodieDark} strokeWidth="28" strokeLinecap="round" />
              <path d="M216 230 C234 270 230 320 220 342" fill="none" stroke={hoodie} strokeWidth="22" strokeLinecap="round" />
              {/* Sleeve cuff */}
              <rect x="208" y="334" width="24" height="8" rx="3" fill={hoodieDark} transform="rotate(-15, 220, 338)" />
              {/* Hand with thumb */}
              <ellipse cx="218" cy="354" rx="13" ry="15" fill={skin} stroke={skinShadow} strokeWidth="1.5" />
              <ellipse cx="226" cy="350" rx="5" ry="6" fill={skin} />
            </g>
          )}

          {pose === "panic" && (
            <g>
              {/* Hands to head */}
              <path d="M104 230 C72 195 68 135 116 115" fill="none" stroke={hoodieDark} strokeWidth="28" strokeLinecap="round" />
              <path d="M104 230 C72 195 68 135 116 115" fill="none" stroke={hoodie} strokeWidth="22" strokeLinecap="round" />
              <path d="M216 230 C248 195 252 135 204 115" fill="none" stroke={hoodieDark} strokeWidth="28" strokeLinecap="round" />
              <path d="M216 230 C248 195 252 135 204 115" fill="none" stroke={hoodie} strokeWidth="22" strokeLinecap="round" />
              {/* Hands clutching hair */}
              <ellipse cx="118" cy="115" rx="16" ry="14" fill={skin} stroke={skinShadow} strokeWidth="1.5" />
              <ellipse cx="202" cy="115" rx="16" ry="14" fill={skin} stroke={skinShadow} strokeWidth="1.5" />
            </g>
          )}

          {pose === "dizzy" && (
            <g>
              {/* Left hand to stomach */}
              <path d="M104 230 C78 270 108 322 142 322" fill="none" stroke={hoodieDark} strokeWidth="28" strokeLinecap="round" />
              <path d="M104 230 C78 270 108 322 142 322" fill="none" stroke={hoodie} strokeWidth="22" strokeLinecap="round" />
              <ellipse cx="146" cy="322" rx="14" ry="13" fill={skin} stroke={skinShadow} strokeWidth="1.5" />

              {/* Right hand to forehead */}
              <path d="M216 230 C248 195 240 135 195 125" fill="none" stroke={hoodieDark} strokeWidth="28" strokeLinecap="round" />
              <path d="M216 230 C248 195 240 135 195 125" fill="none" stroke={hoodie} strokeWidth="22" strokeLinecap="round" />
              <ellipse cx="190" cy="122" rx="14" ry="13" fill={skin} stroke={skinShadow} strokeWidth="1.5" />
            </g>
          )}

          {pose === "peaceful" && (
            <g>
              <path d="M104 230 C85 270 100 325 130 345" fill="none" stroke={hoodieDark} strokeWidth="28" strokeLinecap="round" />
              <path d="M104 230 C85 270 100 325 130 345" fill="none" stroke={hoodie} strokeWidth="22" strokeLinecap="round" />
              <path d="M216 230 C235 270 220 325 190 345" fill="none" stroke={hoodieDark} strokeWidth="28" strokeLinecap="round" />
              <path d="M216 230 C235 270 220 325 190 345" fill="none" stroke={hoodie} strokeWidth="22" strokeLinecap="round" />
              <ellipse cx="135" cy="350" rx="14" ry="12" fill={skin} stroke={skinShadow} strokeWidth="1.5" />
              <ellipse cx="185" cy="350" rx="14" ry="12" fill={skin} stroke={skinShadow} strokeWidth="1.5" />
            </g>
          )}

          {/* 4. HEAD, FACE & STYLIZED HAIR (Modern Cartoon / Kok Bisa Style) */}
          <g>
            {/* Ears with inner detail */}
            <circle cx="104" cy="142" r="13" fill={skin} stroke={skinShadow} strokeWidth="1.5" />
            <path d="M102 138 Q108 142 102 147" stroke={skinShadow} strokeWidth="2.5" strokeLinecap="round" fill="none" />

            <circle cx="216" cy="142" r="13" fill={skin} stroke={skinShadow} strokeWidth="1.5" />
            <path d="M218 138 Q212 142 218 147" stroke={skinShadow} strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Jaw / Face Base (Softly tapered cartoon jaw, not a round egg) */}
            <path
              d="M108 128 C106 175 125 196 160 196 C195 196 214 175 212 128 C212 85 108 85 108 128 Z"
              fill={skin}
            />
            {/* Chin shadow */}
            <path d="M148 190 Q160 195 172 190" stroke={skinShadow} strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Stylized Modern Anime/Cartoon Hair with Volume and Bangs */}
            <g>
              {/* Main Hair Volume */}
              <path
                d="M102 128 C98 75 125 50 160 50 C200 50 222 75 218 128 C210 102 196 85 160 85 C124 85 110 102 102 128 Z"
                fill="url(#hairGradNew)"
              />
              {/* Left Sideburn */}
              <path d="M105 120 L108 145 L115 130 Z" fill={hair} />
              {/* Right Sideburn */}
              <path d="M215 120 L212 145 L205 130 Z" fill={hair} />

              {/* Expressive Layered Bangs (Trio of hair tufts across forehead) */}
              {/* Tuft 1 (Left) */}
              <path d="M110 98 Q125 118 132 102 Q120 92 110 98 Z" fill={hair} />
              {/* Tuft 2 (Center Swoosh - Signature Look) */}
              <path d="M130 92 Q158 124 168 100 Q148 88 130 92 Z" fill={hair} />
              {/* Tuft 3 (Right) */}
              <path d="M165 92 Q188 118 198 98 Q182 88 165 92 Z" fill={hair} />
              {/* Hair Highlight Accent */}
              <path d="M138 68 Q165 60 185 70" stroke={hairHighlight} strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>

            {/* 5. FACIAL FEATURES */}
            {/* Cute Cartoon Nose (Bridge line + soft shadow) */}
            <path d="M159 144 Q163 150 159 152" stroke={skinShadow} strokeWidth="3" strokeLinecap="round" fill="none" />

            {pose === "idle" && (
              <g>
                {/* Expressive Thick Brows */}
                <path d="M124 116 Q138 110 150 114" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M196 116 Q182 110 170 114" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" fill="none" />

                {isBlinking ? (
                  // Closed blinking line
                  <>
                    <path d="M126 132 Q138 138 148 132" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <path d="M172 132 Q182 138 194 132" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </>
                ) : (
                  // Large, appealing cartoon eyes with iris & highlight
                  <>
                    {/* Left Eye */}
                    <ellipse cx="137" cy="132" rx="12" ry="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
                    <ellipse cx="138" cy="132" rx="9" ry="11" fill="#0F172A" />
                    <circle cx="141" cy="128" r="4" fill="#FFFFFF" />
                    <circle cx="134" cy="136" r="2" fill="#FFFFFF" />

                    {/* Right Eye */}
                    <ellipse cx="183" cy="132" rx="12" ry="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
                    <ellipse cx="182" cy="132" rx="9" ry="11" fill="#0F172A" />
                    <circle cx="185" cy="128" r="4" fill="#FFFFFF" />
                    <circle cx="178" cy="136" r="2" fill="#FFFFFF" />
                  </>
                )}

                {/* Friendly Cartoon Smile with depth */}
                <path
                  d="M144 165 Q160 180 176 165 Q160 172 144 165 Z"
                  fill="#E11D48"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                />
              </g>
            )}

            {pose === "panic" && (
              <g>
                {/* Angled distressed brows */}
                <path d="M124 110 Q138 104 148 118" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M196 110 Q182 104 172 118" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" fill="none" />

                {/* Wide Panic Eyes */}
                <ellipse cx="136" cy="132" rx="14" ry="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
                <ellipse cx="184" cy="132" rx="14" ry="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
                <circle cx="136" cy="132" r="5" fill="#0F172A" />
                <circle cx="184" cy="132" r="5" fill="#0F172A" />

                {/* Trembling Open Mouth with tongue */}
                <path
                  d="M140 162 Q150 155 160 162 Q170 169 180 162 Q172 182 160 180 Q148 178 140 162 Z"
                  fill="#BE123C"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                />
                <ellipse cx="160" cy="174" rx="8" ry="4" fill="#FB7185" />

                {/* Floating Sweat Drops */}
                <path
                  d={`M92 ${95 + sweatFloat} C82 ${90 + sweatFloat} 80 ${110 + sweatFloat} 92 ${115 + sweatFloat} C104 ${110 + sweatFloat} 102 ${90 + sweatFloat} 92 ${95 + sweatFloat} Z`}
                  fill="#38BDF8"
                />
                <path
                  d={`M228 ${95 - sweatFloat} C218 ${90 - sweatFloat} 216 ${110 - sweatFloat} 228 ${115 - sweatFloat} C240 ${110 - sweatFloat} 238 ${90 - sweatFloat} 228 ${95 - sweatFloat} Z`}
                  fill="#38BDF8"
                />
              </g>
            )}

            {pose === "dizzy" && (
              <g>
                {/* Wavy Queasy Brows */}
                <path d="M124 114 Q135 120 148 112" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M196 112 Q185 120 172 114" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Rotating Spiral Eyes (@ @) */}
                <g transform="translate(137, 132)">
                  <path
                    d="M0 0 A3.5 3.5 0 0 1 3.5 3.5 A7 7 0 0 1 -3.5 3.5 A10.5 10.5 0 0 1 -3.5 -3.5 A14 14 0 0 1 3.5 -3.5"
                    stroke="#0F172A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    transform={`rotate(${frame * 8})`}
                  />
                </g>
                <g transform="translate(183, 132)">
                  <path
                    d="M0 0 A3.5 3.5 0 0 1 3.5 3.5 A7 7 0 0 1 -3.5 3.5 A10.5 10.5 0 0 1 -3.5 -3.5 A14 14 0 0 1 3.5 -3.5"
                    stroke="#0F172A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    transform={`rotate(${-frame * 8})`}
                  />
                </g>

                {/* Sick Greenish Tint Blush */}
                <circle cx="118" cy="148" r="11" fill="#84CC16" opacity="0.45" />
                <circle cx="202" cy="148" r="11" fill="#84CC16" opacity="0.45" />

                {/* Wobbling Nauseous Mouth */}
                <path
                  d={`M142 ${166 + Math.sin(frame * 0.4) * 2.5} Q152 158 160 166 Q168 174 178 ${166 - Math.sin(frame * 0.4) * 2.5}`}
                  stroke="#0F172A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            )}

            {pose === "peaceful" && (
              <g>
                {/* Serene soft brows */}
                <path d="M125 114 Q138 106 150 112" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M195 114 Q182 106 170 112" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Peaceful closed curved smiling eyes (^ ^) */}
                <path d="M126 132 Q138 120 148 132" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M172 132 Q182 120 194 132" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Soft warm blush */}
                <circle cx="120" cy="144" r="9" fill="#F43F5E" opacity="0.35" />
                <circle cx="200" cy="144" r="9" fill="#F43F5E" opacity="0.35" />

                {/* Gentle peaceful smile */}
                <path d="M146 162 Q160 172 174 162" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </g>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
