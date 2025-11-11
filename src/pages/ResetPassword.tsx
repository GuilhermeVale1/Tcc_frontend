import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // chama o seu endpoint PUT com o token como query param
      await api.put(`/reset-password?token=${token}`, { password });
      setMessage("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMessage("Token inválido ou expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Redefinir senha</h2>

        {message && (
          <p style={{ color: message.includes("sucesso") ? "green" : "red", textAlign: "center" }}>
            {message}
          </p>
        )}

        <input
          type="text"
          placeholder="Cole o código recebido no e-mail"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
          style={input}
        />

        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={input}
        />

        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          style={input}
        />

        <button type="submit" style={button} disabled={loading}>
          {loading ? "Alterando..." : "Alterar senha"}
        </button>
      </form>
    </div>
  );
}

const container: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#f4f6f8",
};

const formStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 400,
  padding: 40,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 6,
  border: "1px solid #ddd",
};

const button: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 6,
  border: "none",
  background: "var(--primary)",
  color: "#fff",
  fontWeight: 600,
};
