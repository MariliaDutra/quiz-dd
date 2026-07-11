import IdCard from "./IdCard";
import GraphicPattern from "./GraphicPattern";

export default function CardScreen({ profile, onOpenAdmin }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(160deg, #2f0f57 0%, #5a1f96 60%, #7b2fb5 100%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GraphicPattern style={{ opacity: 0.5 }} />

      <header
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.25rem 0.5rem",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Carteirinha Digital</h2>
        <button
          aria-label="Abrir menu de administração"
          onClick={onOpenAdmin}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: 10,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <main
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          padding: "0.5rem 1.25rem 1.5rem",
        }}
      >
        <IdCard profile={profile} />
      </main>
    </div>
  );
}
