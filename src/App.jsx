import { useState } from "react";
import CardScreen from "./components/CardScreen";
import AdminScreen from "./components/AdminScreen";
import { loadProfile, saveProfile } from "./data/defaultProfile";

function App() {
  const [profile, setProfile] = useState(loadProfile);
  const [view, setView] = useState("card"); // "card" | "admin"

  function handleSave(updated) {
    setProfile(updated);
    saveProfile(updated);
  }

  if (view === "admin") {
    return (
      <AdminScreen
        profile={profile}
        onSave={handleSave}
        onBack={() => setView("card")}
      />
    );
  }

  return <CardScreen profile={profile} onOpenAdmin={() => setView("admin")} />;
}

export default App;
