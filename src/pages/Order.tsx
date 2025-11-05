import { useEffect, useState } from "react";
import api from "../api/api";

export default function Order() {
  const [itens, setItens] = useState<any[]>([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [troco, setTroco] = useState<number | "">("");

  useEffect(() => {
    const itensSalvos = localStorage.getItem("carrinho");
    if (itensSalvos) setItens(JSON.parse(itensSalvos));
  }, []);

  const handleQuantidadeChange = (id: string, novaQtd: number) => {
    if (novaQtd < 1) return;
    const atualizados = itens.map((item) =>
      item.id === id ? { ...item, quantidade: novaQtd } : item
    );
    setItens(atualizados);
    localStorage.setItem("carrinho", JSON.stringify(atualizados));
  };

  const handleRemoverItem = (id: string) => {
    const atualizados = itens.filter((item) => item.id !== id);
    setItens(atualizados);
    localStorage.setItem("carrinho", JSON.stringify(atualizados));
  };

  const calcularTotal = () =>
    itens.reduce((acc, i) => acc + (i.preco || 0) * (i.quantidade || 1), 0);

  const handleFinalizarPedido = async () => {
    if (itens.length === 0) {
      setMsg("Nenhum item adicionado ao pedido.");
      return;
    }

    const totalPedido = calcularTotal();

    if (troco === "" || troco < totalPedido) {
      setMsg("O valor do troco deve ser maior ou igual ao total do pedido.");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      // Envia o troco junto na criação do pedido
      const { data } = await api.post("/pedidos", { troco });
      const idPedido = data.idPedido || data.id;

      // Adiciona cada item ao pedido
      for (const item of itens) {
        const payload =
          item.tipo === "pizza"
            ? {
                idPedido,
                idPizza: item.id,
                quantPizzas: item.quantidade,
              }
            : {
                idPedido,
                idBebida: item.id,
                quantBebidas: item.quantidade,
              };

        await api.post("/products", payload);
      }

      localStorage.removeItem("carrinho");
      setItens([]);
      setTroco("");
      setMsg("Pedido realizado com sucesso!");
    } catch (err) {
      console.error(err);
      setMsg("Erro ao finalizar o pedido.");
    } finally {
      setLoading(false);
    }
  };

  const totalPedido = calcularTotal();

  return (
    <div style={container}>
      <div style={card}>
        <h2>Seu Pedido</h2>

        {itens.length > 0 ? (
          <div style={list}>
            {itens.map((item, i) => (
              <div key={i} style={itemBox}>
                <div style={{ flex: 1 }}>
                  {item.tipo === "pizza" ? "🍕" : "🥤"} <strong>{item.nome}</strong>
                  <br />
                  Preço unitário: R$ {item.preco.toFixed(2)} <br />
                  Quantidade:{" "}
                  <input
                    type="number"
                    min="1"
                    value={item.quantidade}
                    style={inputQuantidade}
                    onChange={(e) =>
                      handleQuantidadeChange(item.id, Number(e.target.value))
                    }
                  />
                  <br />
                  <strong>
                    Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
                  </strong>
                </div>

                <button style={buttonRemove} onClick={() => handleRemoverItem(item.id)}>
                  Remover
                </button>
              </div>
            ))}

            <h3 style={{ textAlign: "right", marginTop: 20 }}>
              💰 Total: R$ {totalPedido.toFixed(2)}
            </h3>

            <div style={{ marginTop: 15 }}>
              <label>
                💵 Valor para troco:
                <input
                  type="number"
                  min={totalPedido}
                  value={troco}
                  onChange={(e) =>
                    setTroco(e.target.value ? Number(e.target.value) : "")
                  }
                  placeholder="Ex: 100.00"
                  style={inputTroco}
                />
              </label>
            </div>

            <button
              onClick={handleFinalizarPedido}
              style={buttonPrimary}
              disabled={loading}
            >
              {loading ? "Finalizando..." : "Finalizar Pedido"}
            </button>
          </div>
        ) : (
          <p style={{ textAlign: "center", fontWeight: "bold", color: "#555" }}>
            🛒 Carrinho vazio
          </p>
        )}

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}

// ====== Estilos ======
const container: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: 40,
  minHeight: "100vh",
  background: "#f4f6f8",
};

const card: React.CSSProperties = {
  background: "var(--card-bg)",
  padding: 34,
  borderRadius: 12,
  boxShadow: "0 12px 40px rgba(2,6,23,0.08)",
  maxWidth: 1000,
  width: "100%",
};

const buttonPrimary: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: 8,
  background: "var(--primary)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  marginTop: 16,
  fontWeight: 600,
};

const buttonRemove: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 6,
  background: "var(--accent)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const list: React.CSSProperties = {
  margin: "10px 0",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const itemBox: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#fafafa",
  padding: "12px 16px",
  borderRadius: 8,
};

const inputQuantidade: React.CSSProperties = {
  width: 80,
  marginLeft: 8,
  padding: 6,
  textAlign: "center",
  borderRadius: 6,
  border: "1px solid #ddd",
};

const inputTroco: React.CSSProperties = {
  width: 120,
  marginLeft: 10,
  padding: 6,
  textAlign: "center",
  borderRadius: 6,
  border: "1px solid #ddd",
};
