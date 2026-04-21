import { useState } from "react";
import { toast } from "sonner";
import { type PipocaItem, type CarrinhoItem } from "../types";

const CARDAPIO: PipocaItem[] = [
  { id: "p1", nome: "Pipoca Salgada P", preco: 14.9, emoji: "🍿", descricao: "Pipoca salgada tamanho pequeno (50g)" },
  { id: "p2", nome: "Pipoca Salgada G", preco: 22.9, emoji: "🍿", descricao: "Pipoca salgada tamanho grande (100g)" },
  { id: "p3", nome: "Pipoca Doce Caramelo", preco: 18.9, emoji: "🍯", descricao: "Pipoca caramelizada artesanal (80g)" },
  { id: "p4", nome: "Combo Namorados", preco: 39.9, emoji: "💑", descricao: "2 pipocas G + 2 refrigerantes" },
  { id: "p5", nome: "Refrigerante Lata", preco: 8.9, emoji: "🥤", descricao: "Coca-Cola, Pepsi ou Guaraná 350ml" },
  { id: "p6", nome: "Água Mineral", preco: 5.9, emoji: "💧", descricao: "Água sem gás 500ml" },
  { id: "p7", nome: "Nachos + Molho", preco: 16.9, emoji: "🫔", descricao: "Nachos crocantes com molho queijo ou salsa" },
  { id: "p8", nome: "Hot Dog Cinema", preco: 19.9, emoji: "🌭", descricao: "Hot dog tradicional com ketchup e mostarda" },
  { id: "c1", nome: "Combo Família", preco: 69.9, emoji: "👨‍👩‍👧‍👦", descricao: "4 pipocas G + 4 refrigerantes — O melhor preço!" },
];

export function Pipoca() {
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [pedidoFeito, setPedidoFeito] = useState(false);

  const addItem = (item: PipocaItem) => {
    setCarrinho((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, quantidade: c.quantidade + 1 } : c);
      return [...prev, { ...item, quantidade: 1 }];
    });
    toast.success(`${item.nome} adicionado!`, { duration: 1500 });
  };

  const removeItem = (id: string) => {
    setCarrinho((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.quantidade > 1) return prev.map((c) => c.id === id ? { ...c, quantidade: c.quantidade - 1 } : c);
      return prev.filter((c) => c.id !== id);
    });
  };

  const total = carrinho.reduce((sum, c) => sum + c.preco * c.quantidade, 0);
  const totalQtd = carrinho.reduce((sum, c) => sum + c.quantidade, 0);

  const handleFinalizar = () => {
    if (carrinho.length === 0) return;
    setPedidoFeito(true);
    toast.success("Pedido confirmado! Retire na bombonière. 🍿");
    setTimeout(() => { setCarrinho([]); setPedidoFeito(false); }, 4000);
  };

  return (
    <div className="container py-5">
      <style>{`
        .pipoca-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; letter-spacing: 0.06em; margin-bottom: 0.25rem; }
        .pipoca-subtitle { color: var(--cinema-muted); font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2rem; }
        .cardapio-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
        .item-card {
          background: var(--cinema-panel);
          border: 1px solid var(--cinema-border);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex; flex-direction: column;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .item-card:hover { border-color: rgba(232,184,75,0.4); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
        .item-emoji { font-size: 2.5rem; margin-bottom: 0.75rem; }
        .item-nome { font-size: 0.95rem; font-weight: 700; color: var(--cinema-text); margin: 0 0 0.3rem; }
        .item-desc { font-size: 0.78rem; color: var(--cinema-muted); flex: 1; margin-bottom: 1rem; }
        .item-footer { display: flex; align-items: center; justify-content: space-between; }
        .item-price { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: var(--cinema-gold); letter-spacing: 0.05em; }
        .add-btn {
          background: rgba(232,184,75,0.1);
          border: 1px solid rgba(232,184,75,0.3);
          color: var(--cinema-gold);
          border-radius: 6px;
          padding: 0.35rem 0.9rem;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .add-btn:hover { background: var(--cinema-gold); color: #080a0e; }
        .add-btn.in-cart { background: rgba(232,184,75,0.2); border-color: var(--cinema-gold); }

        /* Carrinho */
        .cart-panel {
          position: sticky; top: 80px;
          background: var(--cinema-panel);
          border: 1px solid var(--cinema-border);
          border-radius: 12px;
          padding: 1.5rem;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }
        .cart-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 0.06em; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        .cart-badge { background: var(--cinema-gold); color: #080a0e; border-radius: 50px; padding: 0.1rem 0.5rem; font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 700; }
        .cart-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid var(--cinema-border); }
        .cart-item-emoji { font-size: 1.4rem; }
        .cart-item-name { font-size: 0.82rem; flex: 1; color: var(--cinema-text); }
        .cart-qty-controls { display: flex; align-items: center; gap: 0.4rem; }
        .qty-btn { background: var(--cinema-dark); border: 1px solid var(--cinema-border); color: var(--cinema-text); width: 24px; height: 24px; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.9rem; transition: background 0.15s; }
        .qty-btn:hover { background: var(--cinema-border); }
        .cart-item-total { font-size: 0.82rem; font-weight: 600; color: var(--cinema-gold); min-width: 52px; text-align: right; }
        .cart-total-row { padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; }
        .cart-total-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--cinema-muted); }
        .cart-total-value { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--cinema-gold); }
        .empty-cart { text-align: center; padding: 2rem 0; color: var(--cinema-muted); font-size: 0.85rem; }
        .finalizar-btn {
          width: 100%; margin-top: 1rem;
          background: var(--cinema-gold); border: none; border-radius: 8px;
          color: #080a0e; font-weight: 700; font-size: 0.9rem;
          padding: 0.8rem; cursor: pointer;
          letter-spacing: 0.05em;
          transition: background 0.2s, transform 0.15s;
        }
        .finalizar-btn:hover { background: var(--cinema-gold-dim); transform: translateY(-1px); }
        .finalizar-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .success-anim { text-align: center; padding: 2rem 1rem; animation: pop 0.4s ease; }
        @keyframes pop { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>

      <div className="row g-4">
        <div className="col-lg-8">
          <h2 className="pipoca-title">🍿 Bombonière</h2>
          <p className="pipoca-subtitle">Peça agora e retire na entrada da sala</p>
          <div className="cardapio-grid">
            {CARDAPIO.map((item) => {
              const inCart = carrinho.find((c) => c.id === item.id);
              return (
                <div key={item.id} className="item-card">
                  <div className="item-emoji">{item.emoji}</div>
                  <p className="item-nome">{item.nome}</p>
                  <p className="item-desc">{item.descricao}</p>
                  <div className="item-footer">
                    <span className="item-price">R$ {item.preco.toFixed(2)}</span>
                    <button className={`add-btn ${inCart ? "in-cart" : ""}`} onClick={() => addItem(item)}>
                      {inCart ? `+1 (${inCart.quantidade})` : "Adicionar"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="cart-panel">
            <div className="cart-title">
              <i className="bi bi-bag"></i>
              Seu Pedido
              {totalQtd > 0 && <span className="cart-badge">{totalQtd}</span>}
            </div>

            {pedidoFeito ? (
              <div className="success-anim">
                <div style={{ fontSize: "3rem" }}>✅</div>
                <p style={{ fontSize: "0.9rem", color: "var(--cinema-gold)", fontWeight: 600, marginTop: "0.75rem" }}>
                  Pedido confirmado!
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--cinema-muted)" }}>
                  Retire na bombonière antes de entrar na sala.
                </p>
              </div>
            ) : carrinho.length === 0 ? (
              <div className="empty-cart">
                <div style={{ fontSize: "2.5rem", opacity: 0.3 }}>🛒</div>
                <p className="mt-2">Seu carrinho está vazio.</p>
                <p>Adicione itens do cardápio!</p>
              </div>
            ) : (
              <>
                {carrinho.map((item) => (
                  <div key={item.id} className="cart-item">
                    <span className="cart-item-emoji">{item.emoji}</span>
                    <span className="cart-item-name">{item.nome}</span>
                    <div className="cart-qty-controls">
                      <button className="qty-btn" onClick={() => removeItem(item.id)}>−</button>
                      <span style={{ fontSize: "0.85rem", minWidth: "16px", textAlign: "center" }}>{item.quantidade}</span>
                      <button className="qty-btn" onClick={() => addItem(item)}>+</button>
                    </div>
                    <span className="cart-item-total">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                  </div>
                ))}
                <div className="cart-total-row">
                  <span className="cart-total-label">Total</span>
                  <span className="cart-total-value">R$ {total.toFixed(2)}</span>
                </div>
                <button className="finalizar-btn" onClick={handleFinalizar}>
                  <i className="bi bi-check2-circle me-2"></i>Finalizar Pedido
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
