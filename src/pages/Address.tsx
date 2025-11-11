import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function Address() {
  const [form, setForm] = useState({
    cep: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  // Buscar endereços existentes ao montar o componente
  useEffect(() => {
    fetchEnderecos();
  }, []);

  const fetchEnderecos = async () => {
    try {
      const response = await api.get("/endereco");
      setEnderecos(response.data);
    } catch (err) {
      console.error("Erro ao buscar endereços:", err);
      setMsg("Erro ao carregar endereços.");
    }
  };

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
      fetchEnderecos(); // Atualiza a lista após salvar
    } catch (err) {
      console.error("Erro ao cadastrar endereço:", err);
      setMsg("Erro ao cadastrar endereço.");
    }
  };

  // 🟢 Definir como principal
  const handleSetPrincipal = async (id: string) => {
    try {
      await api.put(`/endereco/${id}`);
      setMsg("Endereço definido como principal!");
      fetchEnderecos();
    } catch (err) {
      console.error("Erro ao definir principal:", err);
      setMsg("Erro ao definir endereço como principal.");
    }
  };

  // 🔴 Excluir endereço
  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este endereço?")) return;

    try {
      await api.delete(`/endereco/${id}`);
      setMsg("Endereço excluído com sucesso!");
      fetchEnderecos();
    } catch (err) {
      console.error("Erro ao excluir endereço:", err);
      setMsg("Erro ao excluir endereço.");
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

        {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      </form>

      <div style={listContainer}>
        <h3>Meus Endereços</h3>
        {enderecos.length === 0 ? (
          <p>Nenhum endereço cadastrado ainda.</p>
        ) : (
          enderecos.map((endereco) => (
            <div key={endereco.id} style={card}>
              <p>
                <strong>Rua:</strong> {endereco.rua}, {endereco.numero}
              </p>
              <p>
                <strong>Bairro:</strong> {endereco.bairro}
              </p>
              <p>
                <strong>CEP:</strong> {endereco.cep}
              </p>
              {endereco.complemento && (
                <p>
                  <strong>Complemento:</strong> {endereco.complemento}
                </p>
              )}

              {endereco.principal ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Endereço principal
                </p>
              ) : (
                <button
                  onClick={() => handleSetPrincipal(endereco.id)}
                  style={secondaryButton}
                >
                  Definir como principal
                </button>
              )}

              <button
                onClick={() => handleDelete(endereco.id)}
                style={{ ...secondaryButton, background: "#ff4d4f", marginLeft: 8 }}
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==== Estilos ====
const container: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: 48,
  gap: 32,
  minHeight: "100vh",
  background: "var(--bg)",
  flexWrap: "wrap",
};

const formStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 400,
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

const listContainer: React.CSSProperties = {
  width: "100%",
  maxWidth: 400,
  padding: 36,
  background: "var(--card-bg)",
  borderRadius: 10,
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
};

const card: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  background: "#fff",
};

const secondaryButton: React.CSSProperties = {
  padding: "8px 12px",
  border: "none",
  borderRadius: 6,
  background: "#007bff",
  color: "#fff",
  cursor: "pointer",
  fontSize: 14,
};
