import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Products() {
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [bebidas, setBebidas] = useState<any[]>([]);
  const [carrinho, setCarrinho] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pizzaResp, bebidaResp] = await Promise.all([
          api.get("/pizzas"),
          api.get("/bebidas"),
        ]);
        setPizzas(pizzaResp.data || []);
        setBebidas(bebidaResp.data || []);
      } catch (err) {
        console.error("Erro ao carregar cardápio:", err);
      }
    };
    loadData();

    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) setCarrinho(JSON.parse(carrinhoSalvo));
  }, []);

  const adicionarAoPedido = (produto: any, tipo: "pizza" | "bebida") => {
    const existente = carrinho.find(
      (item) => item.id === produto.id && item.tipo === tipo
    );

    let novoCarrinho: any[];
    if (existente) {
      novoCarrinho = carrinho.map((item) =>
        item.id === produto.id && item.tipo === tipo
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    } else {
      const novoItem = {
        id: produto.id,
        nome: produto.name || produto.nome,
        preco: produto.price || produto.preco,
        tipo,
        quantidade: 1,
      };
      novoCarrinho = [...carrinho, novoItem];
    }

    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    alert(`${produto.name || produto.nome} adicionado ao pedido!`);
  };

  return (
  <div style={{ padding: 36, maxWidth: 1400, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Cardápio</h2>

      <h3>Pizzas</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 12 }}>
        {pizzas.map((p) => (
          <div key={p.id} style={card}>
            <div style={imgWrapper}>
              <img src={p.image} alt={p.name} style={imgElement} />
            </div>
            <h4 style={{ marginTop: 12 }}>{p.name}</h4>
            <p style={{ color: "#666", minHeight: 40 }}>{p.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <strong>R$ {p.price?.toFixed(2)}</strong>
              <button style={button} onClick={() => adicionarAoPedido(p, "pizza")}>
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 36 }}>Bebidas</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20, marginTop: 12 }}>
        {bebidas.map((b) => (
          <div key={b.id} style={{ ...card, padding: 12 }}>
            <div style={imgWrapperSmall}>
              <img src={b.image} alt={b.name} style={imgElement} />
            </div>
            <h4 style={{ marginTop: 8, fontSize: 14 }}>{b.name}</h4>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <strong style={{ fontSize: 14 }}>R$ {b.price?.toFixed(2)}</strong>
              <button style={{ ...button, padding: "6px 8px", fontSize: 13 }} onClick={() => adicionarAoPedido(b, "bebida")}>
                Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const imgWrapper: React.CSSProperties = {
  position: "relative",
  width: "100%",
  paddingTop: "66.66%", // 3:2 ratio box
  overflow: "hidden",
  borderRadius: 6,
};

const imgElement: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const imgWrapperSmall: React.CSSProperties = {
  position: "relative",
  width: "100%",
  paddingTop: "56.25%", // 16:9-ish, smaller height
  overflow: "hidden",
  borderRadius: 6,
};

const card: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: 8,
  padding: 16,
  background: "var(--card-bg)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 6px 18px rgba(0,0,0,0.03)",
};

const button: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 6,
  background: "var(--primary)",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};

