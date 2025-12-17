import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [phase, setPhase] = useState("teams"); // começa na tela de times
  const [showRules, setShowRules] = useState(true);

  const [categories, setCategories] = useState([]);
  const [raffleCategories, setRaffleCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctAnswered, setCorrectAnswered] = useState(false);
  const [loading, setLoading] = useState(false);

  // TIMES (via players)
  const [teams, setTeams] = useState([]);
  const [teamsLoaded, setTeamsLoaded] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  // ---------- TIMES (usa tabela players) ----------

  async function loadTeams() {
    setLoading(true);

    const { data, error } = await supabase
      .from("players") // nome da tabela com player, team_name
      .select("id, player, team_name")
      .order("team_name");

    if (error) {
      console.error("Erro ao carregar jogadores:", error);
      setLoading(false);
      return;
    }

    // Agrupa por team_name
    const map = {};
    (data || []).forEach((row) => {
      const team = row.team_name || "Sem time";
      if (!map[team]) map[team] = [];
      map[team].push(row.player);
    });

    const grouped = Object.entries(map).map(([teamName, members], index) => ({
      id: index + 1,
      name: teamName,
      members: members.join("\n"),
    }));

    setTeams(grouped);
    setTeamsLoaded(true);
    setLoading(false);
  }

  // ---------- CATEGORIAS / PERGUNTAS ----------

  async function loadCategories() {
    const { data, error } = await supabase
      .from("questions_dd")
      .select("theme")
      .order("theme");

    if (error) {
      console.error("Erro ao carregar categorias:", error);
      return;
    }

    if (data) {
      const unique = [...new Set(data.map((q) => q.theme))];

      const kidsLabel = "Kids e Disney";
      const other = unique.filter((c) => c !== kidsLabel);
      const ordered = [...other, kidsLabel];

      setCategories(ordered);

      const raffle = ordered.filter((c) => c && c !== kidsLabel);
      setRaffleCategories(raffle);
    }
  }

  async function loadQuestions(theme) {
    setLoading(true);
    const { data, error } = await supabase
      .from("questions_dd")
      .select("id, question_number, used")
      .eq("theme", theme)
      .order("question_number");

    if (error) {
      console.error("Erro ao carregar perguntas:", error);
    }

    if (data) {
      setQuestions(data);
      setCurrentCategory(theme);
      setPhase("numbers");
    }
    setLoading(false);
  }

  async function loadQuestion(id) {
    setLoading(true);
    setSelectedAnswers([]);
    setShowCorrectAnswer(false);
    setCorrectAnswered(false);

    const { data, error } = await supabase
      .from("questions_dd")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erro ao carregar pergunta:", error);
    }

    if (data) {
      setCurrentQuestion(data);
      setPhase("question");
    }
    setLoading(false);
  }

  async function markAsUsed(id) {
    await supabase.from("questions_dd").update({ used: true }).eq("id", id);

    loadQuestions(currentCategory);
    setPhase("numbers");
  }

  function handleAnswerClick(option) {
    if (correctAnswered || selectedAnswers.includes(option)) return;

    const correctAnswer = currentQuestion.correct_option.toUpperCase().trim();
    const optionUpper = option.toUpperCase().trim();

    setSelectedAnswers([...selectedAnswers, option]);

    if (optionUpper === correctAnswer) {
      setCorrectAnswered(true);
    }
  }

  function getButtonStyle(option) {
    const correctAnswer = currentQuestion.correct_option.toUpperCase().trim();
    const optionUpper = option.toUpperCase().trim();

    if ((correctAnswered || showCorrectAnswer) && optionUpper === correctAnswer) {
      return { background: "#4ade80", color: "white" };
    }

    if (selectedAnswers.includes(option) && optionUpper !== correctAnswer) {
      return { background: "#ef4444", color: "white" };
    }

    if (selectedAnswers.includes(option)) {
      return { background: "#333", opacity: 0.5, cursor: "not-allowed" };
    }

    return { background: "#646cff" };
  }

  function handleRaffleCategory() {
    if (!raffleCategories.length) return;
    const randomIndex = Math.floor(Math.random() * raffleCategories.length);
    const chosen = raffleCategories[randomIndex];
    loadQuestions(chosen);
  }

  // ---------- TELAS ----------

  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  // REGRAS PRIMEIRO
  if (showRules) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0,0,0,0.6)",
          color: "white",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.85)",
            padding: "2.5rem 3rem",
            borderRadius: "16px",
            maxWidth: "700px",
          }}
        >
          <h1 style={{ marginBottom: "1rem" }}>Regras do Jogo</h1>

          {/* mantém exatamente o seu <ul> de regras aqui */}
          {/* ... */}

          <button
            onClick={() => {
              setShowRules(false);
              setPhase("teams"); // ao sair das regras, ir para times
            }}
            style={{
              marginTop: "2rem",
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              borderRadius: "999px",
              background: "#dc2626",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Começar o jogo
          </button>
        </div>
      </div>
    );
  }

  // TELA DE TIMES
  if (phase === "teams") {
    return (
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          padding: "2rem",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Formação dos Times</h1>

        {!teamsLoaded ? (
          <button
            onClick={loadTeams}
            style={{
              marginTop: "2rem",
              padding: "1rem 3rem",
              fontSize: "1.2rem",
              borderRadius: "12px",
              background: "#dc2626",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sortear times
          </button>
        ) : (
          <>
            <div
              style={{
                marginTop: "2rem",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5rem",
              }}
            >
              {teams.map((team) => (
                <div
                  key={team.id}
                  style={{
                    background: "rgba(0,0,0,0.7)",
                    padding: "1rem",
                    borderRadius: "12px",
                    textAlign: "left",
                  }}
                >
                  <h2 style={{ marginBottom: "0.5rem" }}>{team.name}</h2>
                  <p style={{ whiteSpace: "pre-line" }}>{team.members}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase("categories")}
              style={{
                marginTop: "2.5rem",
                padding: "1rem 3rem",
                fontSize: "1.2rem",
                borderRadius: "12px",
                background: "#22c55e",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Ir para as categorias
            </button>
          </>
        )}
      </div>
    );
  }

  // CATEGORIAS
  if (phase === "categories") {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100vw",
          }}
        >
          <div
            style={{
              width: "30vw",
              marginRight: "8vw",
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "stretch",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Escolha uma Categoria</h1>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => loadQuestions(cat)}
                style={{
                  width: "100%",
                  textAlign: "center",
                  ...(cat === "Kids e Disney"
                    ? {
                        background: "#ffcc00",
                        color: "#000",
                        fontWeight: "bold",
                      }
                    : {}),
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "25%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            onClick={handleRaffleCategory}
            style={{
              padding: "1.5rem 4rem",
              fontSize: "1.6rem",
              borderRadius: "12px",
              background: "#dc2626",
              color: "#ffffff",
              fontWeight: "bold",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
              border: "none",
              cursor: "pointer",
            }}
          >
            SORTEAR CATEGORIA
          </button>
        </div>
      </>
    );
  }

  // NÚMEROS
  if (phase === "numbers") {
    return (
      <div>
        <h1>{currentCategory}</h1>
        <button onClick={() => setPhase("categories")}>
          Voltar para Categorias
        </button>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => loadQuestion(q.id)}
              disabled={q.used}
              style={{
                background: q.used ? "#333" : "#646cff",
                textDecoration: q.used ? "line-through" : "none",
              }}
            >
              {q.question_number}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // PERGUNTA
  if (phase === "question" && currentQuestion) {
    return (
      <div>
        <h2>Pergunta {currentQuestion.question_number}</h2>
        <button onClick={() => setPhase("numbers")}>
          Voltar para Números
        </button>

        <div style={{ marginTop: "2rem" }}>
          <h3>{currentQuestion.question}</h3>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <button
              onClick={() => handleAnswerClick("A")}
              style={getButtonStyle("A")}
            >
              <strong>A:</strong> {currentQuestion.option_a}
            </button>
            <button
              onClick={() => handleAnswerClick("B")}
              style={getButtonStyle("B")}
            >
              <strong>B:</strong> {currentQuestion.option_b}
            </button>
            <button
              onClick={() => handleAnswerClick("C")}
              style={getButtonStyle("C")}
            >
              <strong>C:</strong> {currentQuestion.option_c}
            </button>
            <button
              onClick={() => handleAnswerClick("D")}
              style={getButtonStyle("D")}
            >
              <strong>D:</strong> {currentQuestion.option_d}
            </button>
          </div>

          {correctAnswered && (
            <button
              onClick={() => markAsUsed(currentQuestion.id)}
              style={{ marginTop: "2rem", background: "#4ade80" }}
            >
              Marcar como Usada
            </button>
          )}

          {selectedAnswers.length > 0 &&
            !correctAnswered &&
            !showCorrectAnswer && (
              <button
                onClick={() => setShowCorrectAnswer(true)}
                style={{ marginTop: "2rem", background: "#fbbf24", color: "#000" }}
              >
                Mostrar Resposta
              </button>
            )}

          {showCorrectAnswer && (
            <button
              onClick={() => markAsUsed(currentQuestion.id)}
              style={{ marginTop: "2rem", background: "#4ade80" }}
            >
              Marcar como Usada
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default App;
