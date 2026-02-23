import { useState } from "react";
import Clock from "../components/Widgets/Clock";

function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const Saluations = [
    "Bienvenue !",
    "Hello !",
    "Salut !",
    "Hallo !",
    "Ciao !",
    "Hola !",
    "Olá !",
    "Привет !",
    "你好 !",
    "こんにちは !",
  ];

  const [salutation] = useState(
    () => Saluations[Math.floor(Math.random() * Saluations.length)],
  );

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (password === "aaa") {
      localStorage.setItem("isAuthenticated", "true");
      if (onLogin) onLogin();
    } else {
      alert("Mot de passe incorrect");
    }
  };

  return (
    <div
      className="container is-max-desktop"
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100%",
      }}
    >
      <h1 className="title">{salutation}</h1>
      <div
        className="info"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Clock type="analog" style={{ width: "100%", height: "100%" }} />
        <p
          className="date"
          style={{
            fontSize: "1.5rem",
            marginTop: "3.5rem",
            fontWeight: "bold",
          }}
        >
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <p
        className="subtitle"
        style={{
          marginTop: "2rem",
          fontStyle: "bold",
          fontWeight: "bold",
          color: "#A8A8A8",
          maxWidth: "40vw",
          fontSize: "1.05rem",
        }}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, quas.
      </p>

      <form
        className="password"
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "35vw", marginTop: "2rem" }}
      >
        <div className="field">
          <div className="control">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="input"
              type="password"
              placeholder="Entrez le mot de passe"
              style={{
                cursor: "text",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <p style={{ color: "#A8A8A8", fontSize: "0.9rem" }}>
            Appuyez sur Entrée pour vous connecter
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
