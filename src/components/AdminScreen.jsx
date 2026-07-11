import { useState } from "react";
import { resizeImageFile } from "../utils/resizeImage";

const inputStyle = {
  width: "100%",
  padding: "0.65rem 0.8rem",
  borderRadius: 10,
  border: "1px solid #d8cbee",
  fontSize: "0.95rem",
  background: "#fff",
  color: "#2a1a3e",
};

const labelStyle = {
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#5a1f96",
  marginBottom: "0.3rem",
  display: "block",
};

export default function AdminScreen({ profile, onSave, onBack }) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await resizeImageFile(file);
    update("photo", dataUrl);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
    setSaved(true);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f4effb" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1.25rem",
          background: "#5a1f96",
          color: "#fff",
        }}
      >
        <button
          aria-label="Voltar"
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: 10,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Administração do aplicativo</h2>
      </header>

      <form onSubmit={handleSubmit} style={{ padding: "1.5rem", maxWidth: 420, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "1.5rem" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              overflow: "hidden",
              background: "#e4d6f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.75rem",
            }}
          >
            {form.photo ? (
              <img src={form.photo} alt="Foto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#9b6fd1" />
                <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" stroke="#9b6fd1" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <label
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#5a1f96",
              cursor: "pointer",
              padding: "0.4rem 1rem",
              border: "1px solid #9b6fd1",
              borderRadius: 999,
            }}
          >
            Escolher foto
            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
          </label>
        </div>

        <Field label="Nome">
          <input
            style={inputStyle}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Nome completo"
          />
        </Field>

        <Field label="Curso">
          <input
            style={inputStyle}
            value={form.course}
            onChange={(e) => update("course", e.target.value)}
            placeholder="Curso"
          />
        </Field>

        <Field label="ID / Matrícula">
          <input
            style={inputStyle}
            value={form.idNumber}
            onChange={(e) => update("idNumber", e.target.value)}
            placeholder="Número de identificação"
          />
        </Field>

        <Field label="Data de nascimento">
          <input
            type="date"
            style={inputStyle}
            value={form.birthDate}
            onChange={(e) => update("birthDate", e.target.value)}
          />
        </Field>

        <Field label="Validade">
          <input
            type="date"
            style={inputStyle}
            value={form.validity}
            onChange={(e) => update("validity", e.target.value)}
          />
        </Field>

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "1rem",
            padding: "0.85rem",
            borderRadius: 12,
            border: "none",
            background: "#5a1f96",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          {saved ? "Salvo!" : "Salvar"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <span style={labelStyle}>{label}</span>
      {children}
    </div>
  );
}
