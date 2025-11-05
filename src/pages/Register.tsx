import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    password: "",
  });
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const response = await api.post("/clientes", formData);
      if (response.status === 201 || response.status === 200) {
        setMessage({ text: "Cadastro realizado com sucesso!", type: "success" });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err: any) {
      setMessage({ text: "Erro ao cadastrar. Verifique os dados.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Criar conta</h2>

        <input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required style={input} />
        <input name="nome" placeholder="Nome completo" value={formData.nome} onChange={handleChange} required style={input} />
        <input name="email" type="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required style={input} />
        <input name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} style={input} />
        <input name="password" type="password" placeholder="Senha" value={formData.password} onChange={handleChange} required style={input} />

        {message && <p style={{ color: message.type === "error" ? "red" : "green" }}>{message.text}</p>}

        <button type="submit" style={button}>{loading ? "Enviando..." : "Cadastrar"}</button>
        <p style={{ textAlign: "center" }}>
          Já tem conta?{" "}
          <span style={{ color: "#e63946", cursor: "pointer" }} onClick={() => navigate("/login")}>
            Entrar
          </span>
        </p>
      </form>
    </div>
  );
}
const container: React.CSSProperties = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f4f6f8" };
const formStyle: React.CSSProperties = { width: "100%", maxWidth: 640, padding: 40, background: "#fff", borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" };
const input: React.CSSProperties = { width: "100%", padding: 12, marginBottom: 12, borderRadius: 6, border: "1px solid #ddd" };
const button: React.CSSProperties = { width: "100%", padding: 12, borderRadius: 6, border: "none", background: "var(--primary)", color: "#fff", fontWeight: 600 };
