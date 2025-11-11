import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
  await api.post("/forgot-password", { email });
  setMsg("Se o e-mail existir, um código de recuperação foi enviado.");
  // redireciona para a tela de reset para o usuário colar o código
  navigate("/reset-password", { state: { email } });
    } catch (err) {
      setMsg("Erro ao enviar e-mail. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Recuperar Senha</h2>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={input}
        />
        <button type="submit" style={button} disabled={loading}>
          {loading ? "Enviando..." : "Enviar e-mail"}
        </button>
        {msg && <p style={{ marginTop: 12, textAlign: "center" }}>{msg}</p>}
      </form>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#f4f6f8",
};

const formStyle = {
  width: "100%",
  maxWidth: 480,
  padding: 40,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 6,
  border: "1px solid #ddd",
};

const button = {
  width: "100%",
  padding: 12,
  borderRadius: 6,
  border: "none",
  background: "var(--primary)",
  color: "#fff",
  fontWeight: 600,
};
