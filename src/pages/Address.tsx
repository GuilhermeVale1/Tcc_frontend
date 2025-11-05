import React, { useState } from "react";
import api from "../api/api";

export default function Address() {
  const [form, setForm] = useState({
    cep: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/endereco", form);
      setMsg("Endereço cadastrado com sucesso!");
      setForm({
        cep: "",
        bairro: "",
        rua: "",
        numero: "",
        complemento: "",
      });
    } catch (err) {
      console.error("Erro ao cadastrar endereço:", err);
      setMsg("Erro ao cadastrar endereço.");
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>Cadastrar Endereço</h3>

        <input
          name="cep"
          placeholder="CEP (ex: 12345-678)"
          value={form.cep}
          onChange={handleChange}
          required
          style={input}
        />

        <input
          name="bairro"
          placeholder="Bairro"
          value={form.bairro}
          onChange={handleChange}
          required
          style={input}
        />

        <input
          name="rua"
          placeholder="Rua"
          value={form.rua}
          onChange={handleChange}
          required
          style={input}
        />

        <input
          name="numero"
          placeholder="Número"
          value={form.numero}
          onChange={handleChange}
          required
          style={input}
        />

        <input
          name="complemento"
          placeholder="Complemento (opcional)"
          value={form.complemento}
          onChange={handleChange}
          style={input}
        />

        <button type="submit" style={button}>
          Salvar
        </button>

        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}

const container: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: 48,
  minHeight: "100vh",
  background: "var(--bg)",
};

const formStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 640,
  padding: 36,
  background: "var(--card-bg)",
  borderRadius: 10,
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 6,
  border: "1px solid rgba(0,0,0,0.08)",
};

const button: React.CSSProperties = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "none",
  background: "var(--primary)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};
