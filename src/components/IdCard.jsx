import QrCode from "./QrCode";
import GraphicPattern from "./GraphicPattern";
import { formatDate } from "../utils/formatDate";

export default function IdCard({ profile }) {
  const qrText = [
    `Nome: ${profile.name}`,
    `Matrícula: ${profile.idNumber}`,
    `Curso: ${profile.course}`,
    `Validade: ${formatDate(profile.validity)}`,
  ].join("\n");

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 420,
        borderRadius: 28,
        overflow: "hidden",
        background: "linear-gradient(135deg, #4b1f7a 0%, #7b2fb5 55%, #9b3fd1 100%)",
        boxShadow: "0 20px 40px rgba(60, 20, 100, 0.35)",
        color: "#fff",
        padding: "2rem 1.75rem",
      }}
    >
      <GraphicPattern />

      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.75rem",
        }}
      >
        <Logo logo={profile.logoLeft} />

        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <Photo photo={profile.photo} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: "1.9rem", lineHeight: 1.2, wordBreak: "break-word" }}>
              {profile.name || "Seu Nome"}
            </h1>
            <p style={{ fontSize: "1rem", opacity: 0.85, marginTop: 8 }}>
              {formatDate(profile.birthDate)}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", fontSize: "1.05rem" }}>
          <Field label="Matrícula" value={profile.idNumber || "----"} />
          <Field label="Curso" value={profile.course || "Seu Curso"} />
          <Field label="Data de Validade" value={formatDate(profile.validity)} />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 16,
              padding: "0.85rem",
            }}
          >
            <QrCode text={qrText} size={150} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div style={{ opacity: 0.7, fontSize: "0.75rem", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function Logo({ logo }) {
  return (
    <div style={{ width: 160, height: 96, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
      {logo ? (
        <img src={logo} alt="Logo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1px dashed rgba(255,255,255,0.35)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.55rem",
            opacity: 0.6,
            letterSpacing: 0.5,
          }}
        >
          LOGO
        </div>
      )}
    </div>
  );
}

function Photo({ photo }) {
  return (
    <div
      style={{
        width: 116,
        height: 116,
        borderRadius: 20,
        overflow: "hidden",
        flexShrink: 0,
        background: "rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid rgba(255,255,255,0.5)",
      }}
    >
      {photo ? (
        <img src={photo} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.8)" />
          <path
            d="M4 20c0-4 3.6-6 8-6s8 2 8 6"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
