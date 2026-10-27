import React from "react";
import { useCurrentFrame } from "remotion";
import { EP02_THEME } from "../theme";

export type CharacterPose = "panic" | "hopeful" | "gloomy" | "impatient" | "peaceful";

export interface MainCharacterProps {
  pose?: CharacterPose;
  scale?: number;
  flip?: boolean;
  style?: React.CSSProperties;
}

export const MainCharacter: React.FC<MainCharacterProps> = ({
  pose = "hopeful",
  scale = 1.0,
  flip = false,
  style,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing / idle motion
  const breatheY = Math.sin(frame * 0.1) * 3;
  const shakeX = pose === "panic" ? Math.sin(frame * 0.8) * 4 : 0;
  const tapFootY = pose === "impatient" ? Math.abs(Math.sin(frame * 0.35)) * 10 : 0;
  const sweatFloat = Math.sin(frame * 0.2) * 5;

  const { colors } = EP02_THEME;

  return (
    <div
      style={{
        width: 320,
        height: 480,
        transform: `scale(${scale}) scaleX(${flip ? -1 : 1}) translate(${shakeX}px, ${breatheY}px)`,
        transformOrigin: "bottom center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 320 480"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Hair Gradient */}
          <linearGradient id="charHairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor={colors.charHair} />
          </linearGradient>

          {/* Hoodie Gradient */}
          <linearGradient id="charHoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor={colors.charShirt} />
          </linearGradient>

          {/* Skin Shadow Gradient */}
          <linearGradient id="charSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor={colors.charSkin} />
          </linearGradient>

          {/* Soft Shadow */}
          <filter id="charDropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* =========================================================================
            1. GROUND SHADOW
           ========================================================================= */}
        <ellipse
          cx="160"
          cy="465"
          rx={pose === "peaceful" ? 110 : 80}
          ry="14"
          fill="rgba(0,0,0,0.18)"
        />

        {/* =========================================================================
            2. LEGS & SHOES (Adjusted for sitting in peaceful pose)
           ========================================================================= */}
        {pose === "peaceful" ? (
          // Sitting legs
          <g filter="url(#charDropShadow)">
            {/* Left bent leg */}
            <path
              d="M130 380 Q100 420 80 455 L125 455 Q135 425 145 385 Z"
              fill={colors.charPants}
            />
            {/* Right bent leg crossed */}
            <path
              d="M180 380 Q215 420 235 455 L190 455 Q175 425 165 385 Z"
              fill={colors.charPants}
            />
            {/* Shoes */}
            <ellipse cx="95" cy="458" rx="28" ry="12" fill={colors.charShoe} />
            <ellipse cx="220" cy="458" rx="28" ry="12" fill={colors.charShoe} />
          </g>
        ) : (
          // Standing legs
          <g filter="url(#charDropShadow)">
            {/* Left Leg */}
            <rect
              x="122"
              y="360"
              width="30"
              height="90"
              rx="12"
              fill={colors.charPants}
            />
            {/* Right Leg (taps when impatient) */}
            <rect
              x="168"
              y={360 - tapFootY}
              width="30"
              height="90"
              rx="12"
              fill={colors.charPants}
            />
            {/* Left Shoe */}
            <path
              d="M110 445 Q135 440 152 445 L156 460 Q130 464 110 460 Z"
              fill={colors.charShoe}
            />
            {/* Right Shoe */}
            <path
              d={`M166 ${445 - tapFootY} Q195 ${440 - tapFootY} 212 ${445 - tapFootY} L214 ${460 - tapFootY} Q185 ${464 - tapFootY} 166 ${460 - tapFootY} Z`}
              fill={colors.charShoe}
            />
          </g>
        )}

        {/* =========================================================================
            3. TORSO / HOODIE
           ========================================================================= */}
        <g filter="url(#charDropShadow)">
          {/* Main Torso */}
          <path
            d={
              pose === "gloomy"
                ? "M110 230 C90 270 95 365 115 375 L205 375 C225 365 230 270 210 230 Z"
                : "M105 220 C90 260 95 360 115 370 L205 370 C225 360 230 260 215 220 Z"
            }
            fill="url(#charHoodieGrad)"
          />

          {/* Hoodie Kangaroo Pocket */}
          <path
            d="M125 305 Q160 315 195 305 L202 345 Q160 355 118 345 Z"
            fill="#0369A1"
            opacity="0.85"
          />

          {/* Hoodie Strings */}
          <path d="M145 225 Q143 255 145 265" stroke="#E0F2FE" strokeWidth="3" strokeLinecap="round" />
          <path d="M175 225 Q177 255 175 265" stroke="#E0F2FE" strokeWidth="3" strokeLinecap="round" />
          <circle cx="145" cy="268" r="3.5" fill="#E0F2FE" />
          <circle cx="175" cy="268" r="3.5" fill="#E0F2FE" />
        </g>

        {/* =========================================================================
            4. ARMS & HANDS (Dynamically reacts to pose)
           ========================================================================= */}
        {pose === "panic" && (
          // Hands clutching head
          <g filter="url(#charDropShadow)">
            {/* Left Arm bending upward to head */}
            <path
              d="M105 230 C75 200 70 140 115 115"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="28"
              strokeLinecap="round"
            />
            {/* Right Arm bending upward to head */}
            <path
              d="M215 230 C245 200 250 140 205 115"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="28"
              strokeLinecap="round"
            />
            {/* Hands clutching hair */}
            <circle cx="118" cy="115" r="16" fill={colors.charSkin} />
            <circle cx="202" cy="115" r="16" fill={colors.charSkin} />
          </g>
        )}

        {pose === "hopeful" && (
          // Clutched hands near chest in admiration
          <g filter="url(#charDropShadow)">
            {/* Left Arm to chest */}
            <path
              d="M105 230 C90 260 120 280 150 270"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="26"
              strokeLinecap="round"
            />
            {/* Right Arm to chest */}
            <path
              d="M215 230 C230 260 200 280 170 270"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="26"
              strokeLinecap="round"
            />
            {/* Intertwined hands */}
            <ellipse cx="160" cy="268" rx="18" ry="14" fill={colors.charSkin} />
          </g>
        )}

        {pose === "gloomy" && (
          // Limp arms hanging straight down
          <g filter="url(#charDropShadow)">
            <path
              d="M105 230 Q92 290 92 340"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="26"
              strokeLinecap="round"
            />
            <path
              d="M215 230 Q228 290 228 340"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="26"
              strokeLinecap="round"
            />
            <circle cx="92" cy="348" r="14" fill={colors.charSkin} />
            <circle cx="228" cy="348" r="14" fill={colors.charSkin} />
          </g>
        )}

        {pose === "impatient" && (
          // Left arm on hip, right arm checking watch
          <g filter="url(#charDropShadow)">
            {/* Left Arm on hip */}
            <path
              d="M105 230 C75 250 80 300 110 305"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="26"
              strokeLinecap="round"
            />
            <circle cx="112" cy="305" r="14" fill={colors.charSkin} />

            {/* Right Arm checking wristwatch */}
            <path
              d="M215 230 C240 260 220 285 180 275"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="26"
              strokeLinecap="round"
            />
            {/* Hand & Wristwatch */}
            <circle cx="175" cy="275" r="14" fill={colors.charSkin} />
            {/* Wristwatch */}
            <rect x="182" y="265" width="10" height="20" rx="3" fill="#EF4444" />
            <circle cx="187" cy="275" r="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </g>
        )}

        {pose === "peaceful" && (
          // Relaxed arms resting naturally
          <g filter="url(#charDropShadow)">
            <path
              d="M105 230 C85 270 100 320 130 340"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="26"
              strokeLinecap="round"
            />
            <path
              d="M215 230 C235 270 220 320 190 340"
              fill="none"
              stroke={colors.charShirt}
              strokeWidth="26"
              strokeLinecap="round"
            />
            <circle cx="135" cy="345" r="14" fill={colors.charSkin} />
            <circle cx="185" cy="345" r="14" fill={colors.charSkin} />
          </g>
        )}

        {/* =========================================================================
            5. NECK & HEAD
           ========================================================================= */}
        {/* Neck */}
        <rect x="145" y="180" width="30" height="30" rx="6" fill={colors.charSkinShadow} />

        {/* Head Base */}
        <g filter="url(#charDropShadow)">
          {/* Head Shape */}
          <ellipse
            cx="160"
            cy={pose === "gloomy" ? 142 : 135}
            rx="52"
            ry="58"
            fill="url(#charSkinGrad)"
          />

          {/* Ears */}
          <circle cx="106" cy={pose === "gloomy" ? 145 : 138} r="12" fill={colors.charSkin} />
          <circle cx="214" cy={pose === "gloomy" ? 145 : 138} r="12" fill={colors.charSkin} />
          <circle cx="106" cy={pose === "gloomy" ? 145 : 138} r="6" fill={colors.charSkinShadow} opacity="0.6" />
          <circle cx="214" cy={pose === "gloomy" ? 145 : 138} r="6" fill={colors.charSkinShadow} opacity="0.6" />

          {/* Stylish Hair */}
          <path
            d="M106 130 C104 80 130 60 160 60 C195 60 216 80 214 130 C206 100 190 92 165 92 C135 92 120 102 106 130 Z"
            fill="url(#charHairGrad)"
          />
          {/* Hair swoosh front */}
          <path
            d="M130 85 Q165 72 195 90 Q170 95 140 92 Z"
            fill="#475569"
            opacity="0.8"
          />

          {/* =========================================================================
              6. FACIAL FEATURES (Reacts to Pose)
             ========================================================================= */}
          {pose === "panic" && (
            <g>
              {/* Worried Eyebrows */}
              <path d="M125 106 Q140 102 148 114" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M195 106 Q180 102 172 114" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Wide Panic Eyes with Tiny Pupils */}
              <ellipse cx="138" cy="128" rx="13" ry="15" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
              <ellipse cx="182" cy="128" rx="13" ry="15" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
              <circle cx="138" cy="128" r="4.5" fill="#0F172A" />
              <circle cx="182" cy="128" r="4.5" fill="#0F172A" />
              {/* Trembling Open Mouth */}
              <path
                d="M142 162 Q150 156 160 162 Q170 168 178 162 Q170 178 160 176 Q150 174 142 162 Z"
                fill="#DC2626"
                stroke="#0F172A"
                strokeWidth="2"
              />
              {/* Sweat Drops */}
              <path
                d={`M92 ${95 + sweatFloat} C82 ${90 + sweatFloat} 80 ${110 + sweatFloat} 92 ${115 + sweatFloat} C104 ${110 + sweatFloat} 102 ${90 + sweatFloat} 92 ${95 + sweatFloat} Z`}
                fill={colors.charSweat}
              />
              <path
                d={`M228 ${95 - sweatFloat} C218 ${90 - sweatFloat} 216 ${110 - sweatFloat} 228 ${115 - sweatFloat} C240 ${110 - sweatFloat} 238 ${90 - sweatFloat} 228 ${95 - sweatFloat} Z`}
                fill={colors.charSweat}
              />
            </g>
          )}

          {pose === "hopeful" && (
            <g>
              {/* Arched Happy Eyebrows */}
              <path d="M126 108 Q140 98 152 106" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M194 108 Q180 98 168 106" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Big Sparkling Eyes looking upward */}
              <ellipse cx="138" cy="126" rx="13" ry="14" fill="#0F172A" />
              <ellipse cx="182" cy="126" rx="13" ry="14" fill="#0F172A" />
              <circle cx="142" cy="122" r="5" fill="#FFFFFF" />
              <circle cx="186" cy="122" r="5" fill="#FFFFFF" />
              <circle cx="134" cy="130" r="2.5" fill="#FFFFFF" />
              <circle cx="178" cy="130" r="2.5" fill="#FFFFFF" />
              {/* Rosy Cheeks */}
              <circle cx="120" cy="142" r="9" fill="#FB7185" opacity="0.45" />
              <circle cx="200" cy="142" r="9" fill="#FB7185" opacity="0.45" />
              {/* Warm Smiling Mouth */}
              <path
                d="M144 154 Q160 172 176 154"
                fill="#EF4444"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
            </g>
          )}

          {pose === "gloomy" && (
            <g>
              {/* Droopy Sad Eyebrows */}
              <path d="M126 122 Q140 114 150 120" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M194 122 Q180 114 170 120" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* Tired Half-Closed Eyes looking down */}
              <path d="M128 134 Q138 126 148 134" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M172 134 Q182 126 192 134" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <circle cx="138" cy="136" r="3.5" fill="#475569" />
              <circle cx="182" cy="136" r="3.5" fill="#475569" />
              {/* Sad turned down mouth */}
              <path
                d="M148 165 Q160 156 172 165"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {pose === "impatient" && (
            <g>
              {/* Asymmetric impatient eyebrows */}
              <path d="M126 112 Q140 106 150 110" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M194 104 Q180 108 170 116" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Eyes looking sideways at watch */}
              <ellipse cx="138" cy="126" rx="11" ry="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <ellipse cx="182" cy="126" rx="11" ry="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <circle cx="143" cy="127" r="4.5" fill="#0F172A" />
              <circle cx="187" cy="127" r="4.5" fill="#0F172A" />
              {/* Slightly annoyed mouth */}
              <path d="M148 158 Q160 156 172 160" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {pose === "peaceful" && (
            <g>
              {/* Soft serene curved eyebrows */}
              <path d="M126 110 Q138 102 150 108" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M194 110 Q182 102 170 108" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* Peaceful closed curved smiling eyes (^ ^) */}
              <path d="M128 128 Q138 118 148 128" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M172 128 Q182 118 192 128" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* Soft blush */}
              <circle cx="122" cy="138" r="8" fill="#F43F5E" opacity="0.35" />
              <circle cx="198" cy="138" r="8" fill="#F43F5E" opacity="0.35" />
              {/* Calm, serene smile */}
              <path
                d="M146 150 Q160 162 174 150"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
