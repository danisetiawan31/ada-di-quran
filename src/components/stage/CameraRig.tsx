import React, { createContext, useContext } from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";

interface CameraContextValue {
  panX: number;
  panY: number;
  zoom: number;
}

const CameraContext = createContext<CameraContextValue>({
  panX: 0,
  panY: 0,
  zoom: 1,
});

export interface CameraRigProps {
  children: React.ReactNode;
  /**
   * Tingkat perbesaran kamera (1 = normal 100%, 1.2 = zoom in 120%, dll.)
   */
  zoom?: number;
  /**
   * Pergeseran kamera horizontal (dalam piksel)
   */
  panX?: number;
  /**
   * Pergeseran kamera vertikal (dalam piksel, misal menyelam ke bawah air)
   */
  panY?: number;
  /**
   * Intensitas guncangan kamera (0 = tenang, 5-10 = getaran gempa/benturan)
   */
  shake?: number;
  /**
   * Daftar frame di mana SFX whoosh otomatis diputar saat kamera bergerak/transisi
   */
  whooshAtFrames?: number[];
  /**
   * Volume SFX whoosh (default: 0.18)
   */
  whooshVolume?: number;
  style?: React.CSSProperties;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  zoom = 1,
  panX = 0,
  panY = 0,
  shake = 0,
  whooshAtFrames = [],
  whooshVolume = 0.18,
  style,
}) => {
  const frame = useCurrentFrame();

  // Hitung efek guncangan kamera jika shake > 0
  let shakeOffsetX = 0;
  let shakeOffsetY = 0;
  if (shake > 0) {
    shakeOffsetX = Math.sin(frame * 1.8) * shake;
    shakeOffsetY = Math.cos(frame * 2.3) * shake;
  }

  const finalPanX = panX + shakeOffsetX;
  const finalPanY = panY + shakeOffsetY;

  return (
    <CameraContext.Provider value={{ panX: finalPanX, panY: finalPanY, zoom }}>
      {/* Auto-SFX Whoosh pada frame-frame pergerakan kamera (Aset lokal: zero-latency & offline safe) */}
      {whooshAtFrames.map((triggerF) => (
        <Sequence key={`whoosh-${triggerF}`} from={triggerF} layout="none">
          <Audio src={staticFile("sfx/whoosh.wav")} volume={whooshVolume} />
        </Sequence>
      ))}

      <AbsoluteFill
        style={{
          transformOrigin: "center center",
          transform: `scale(${zoom}) translate(${finalPanX}px, ${finalPanY}px)`,
          transition: "transform 0.1s ease-out",
          overflow: "hidden",
          ...style,
        }}
      >
        {children}
      </AbsoluteFill>
    </CameraContext.Provider>
  );
};

export interface ParallaxLayerProps {
  children: React.ReactNode;
  /**
   * Kecepatan pergerakan layer parallax relatif terhadap kamera:
   * - 0.2: Langit/awan jauh (bergerak sangat lambat)
   * - 0.5: Gunung/gedung latar belakang
   * - 1.0: Objek utama di tengah (kecepatan normal)
   * - 1.5: Objek latar depan / foreground (bergerak lebih cepat)
   */
  speed?: number;
  style?: React.CSSProperties;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 1.0,
  style,
}) => {
  const { panX, panY } = useContext(CameraContext);

  // Offset parallax tambahan berdasarkan perbedaan kecepatan
  const parallaxX = panX * (speed - 1);
  const parallaxY = panY * (speed - 1);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        pointerEvents: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
