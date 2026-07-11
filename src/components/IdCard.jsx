import QrCode from "./QrCode";
import GraphicPattern from "./GraphicPattern";
import { formatDate } from "../utils/formatDate";

export default function IdCard({ profile }) {
  const qrText = [
    `Nome: ${profile.name}`,
    `Curso: ${profile.course}`,
    `ID: ${profile.idNumber}`,
    `Validade: ${formatDate(profile.validity)}`,
  ].join("\n");

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 380,
        borderRadius: 24,
        overflow: "hidden",
        background: "linear-gradient(135deg, #4b1f7a 0%, #7b2fb5 55%, #9b3fd1 100%)",
        boxShadow: "0 20px 40px rgba(60, 20, 100, 0.35)",
        color: "#fff",
        padding: "1.5rem",
      }}
    >
      <GraphicPattern />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Logo logo={profile.logoLeft} align="left" />
          <Logo logo={profile.logoRight} align="right" />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.75rem", letterSpacing: 1, opacity: 0.85 }}>
            CARTEIRA PESSOAL
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              background: "rgba(255,255,255,0.18)",
              padding: "0.2rem 0.6rem",
              borderRadius: 999,
            }}
          >
            ID {profile.idNumber || "----"}
          </span>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Photo photo={profile.photo} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: "1.15rem", lineHeight: 1.25, wordBreak: "break-word" }}>
              {profile.name || "Seu Nome"}
            </h1>
            <p style={{ fontSize: "0.85rem", opacity: 0.9, marginTop: 4 }}>
              {profile.course || "Seu Curso"}
            </p>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 14,
            padding: "0.85rem 1rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "0.6rem",
            fontSize: "0.8rem",
          }}
        >
          <Field label="Nascimento" value={formatDate(profile.birthDate)} />
          <Field label="Validade" value={formatDate(profile.validity)} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", paddingTop: "0.25rem" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: 12,
              padding: "0.6rem",
            }}
          >
            <QrCode text={qrText} size={110} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div style={{ opacity: 0.7, fontSize: "0.68rem", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function Logo({ logo, align }) {
  return (
    <div
      style={{
        width: 64,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: align === "left" ? "flex-start" : "flex-end",
      }}
    >
      {logo ? (
        <img
          src={logo}
          alt={align === "left" ? "Logo esquerda" : "Logo direita"}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
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
        width: 72,
        height: 72,
        borderRadius: 16,
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
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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
