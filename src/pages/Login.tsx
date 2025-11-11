import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await api.post("/login", form);
      const token = resp.data?.token ?? resp.data;
      localStorage.setItem("pizzaria_token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/products");
    } catch {
      setError("Credenciais inválidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Entrar</h2>

        <input
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
          style={input}
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
          style={input}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={button}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* 🔗 Link para recuperar senha */}
        <p style={{ textAlign: "center", marginTop: 16 }}>
          <a
            onClick={() => navigate("/forgot-password")}
            style={{ color: "var(--primary)", cursor: "pointer" }}
          >
            Esqueci minha senha
          </a>
        </p>
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
  maxWidth: 640,
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
