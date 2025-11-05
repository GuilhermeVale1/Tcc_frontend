interface ProductCardProps {
  product: {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        textAlign: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {product.imagemUrl && (
        <img
          src={product.imagemUrl}
          alt={product.nome}
          style={{ width: "100%", borderRadius: "10px" }}
        />
      )}
      <h3>{product.nome}</h3>
      <p>{product.descricao}</p>
      <strong>R$ {product.preco.toFixed(2)}</strong>
      <br />
      <button style={{ marginTop: "10px", padding: "8px", cursor: "pointer" }}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
