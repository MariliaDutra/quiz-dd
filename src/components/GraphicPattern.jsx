// Purely decorative purple blobs/waves, used behind the card and the app background.
export default function GraphicPattern({ style }) {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}
    >
      <circle cx="360" cy="40" r="140" fill="rgba(255,255,255,0.08)" />
      <circle cx="40" cy="380" r="110" fill="rgba(255,255,255,0.06)" />
      <path
        d="M -20 260 C 80 220, 140 300, 240 260 C 320 230, 360 300, 440 270 L 440 440 L -20 440 Z"
        fill="rgba(255,255,255,0.07)"
      />
      <path
        d="M -20 310 C 100 270, 160 340, 260 300 C 340 270, 380 330, 440 310 L 440 440 L -20 440 Z"
        fill="rgba(255,255,255,0.05)"
      />
    </svg>
  );
}
