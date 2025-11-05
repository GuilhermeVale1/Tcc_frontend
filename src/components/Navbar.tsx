import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? localStorage.getItem("pizzaria_token") : null;

  const handleLogout = () => {
    localStorage.removeItem("pizzaria_token");
    // remove default header as well
    try {
      delete api.defaults.headers.common["Authorization"];
    } catch {}
    navigate("/login");
  };

  return (
    <nav style={{ background: "var(--card-bg)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px" }}>
      {token ? (
        <>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <Link to="/products" style={{ fontWeight: 700, color: "var(--primary)" }}>🍕 Cardápio</Link>
            <Link to="/address" style={{ color: "var(--text)" }}>🏠 Endereço</Link>
            <Link to="/order" style={{ color: "var(--text)" }}>🧾 Pedido</Link>
          </div>
          <div>
            <button onClick={handleLogout} style={{ background: "var(--accent)", border: "none", color: "#fff", padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}>
              Sair
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", gap: 16 }}>
            <Link to="/login">🔑 Login</Link>
            <Link to="/register">🧾 Cadastro</Link>
          </div>
        </>
      )}
      </div>
    </nav>
  );
}
