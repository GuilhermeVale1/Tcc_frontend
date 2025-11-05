export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        textAlign: "center",
        padding: "15px",
        background: "#f3f3f3",
        borderTop: "1px solid #ccc",
      }}
    >
      <p>© {new Date().getFullYear()} Pizzaria Online 🍕 | Todos os direitos reservados</p>
    </footer>
  );
}
