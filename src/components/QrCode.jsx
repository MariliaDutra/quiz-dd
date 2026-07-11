import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QrCode({ text, size = 120 }) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(text || " ", {
      width: size * 2,
      margin: 1,
      color: { dark: "#2a1a3e", light: "#ffffff00" },
    }).then((url) => {
      if (!cancelled) setDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [text, size]);

  if (!dataUrl) {
    return <div style={{ width: size, height: size }} />;
  }

  return (
    <img
      src={dataUrl}
      alt="QR code da carteirinha"
      width={size}
      height={size}
      style={{ borderRadius: 8 }}
    />
  );
}
