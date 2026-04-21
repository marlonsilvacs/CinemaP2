import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { type Filme, filmeSchema } from "../types";

const PLACEHOLDER = "https://placehold.co/300x450/161b24/e8b84b?text=SEM+POSTER";

const GENEROS = ["Ação", "Aventura", "Animação", "Comédia", "Drama", "Fantasia", "Ficção Científica", "Horror", "Romance", "Suspense", "Terror", "Thriller"];
const CLASSIFICACOES = ["Livre", "10", "12", "14", "16", "18"];

export function Filmes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "", sinopse: "", classificacao: "", duracao: 0,
    genero: "", dataEstreia: "", posterUrl: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/filmes").then((r) => r.json()).then(setFilmes);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dadosValidos = filmeSchema.parse({ ...formData, duracao: Number(formData.duracao) });
      setErrors({});
      await fetch("http://localhost:3000/filmes", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosValidos),
      });
      toast.success("Filme cadastrado com sucesso!");
      setFormData({ titulo: "", sinopse: "", classificacao: "", duracao: 0, genero: "", dataEstreia: "", posterUrl: "" });
      setShowForm(false);
      fetch("http://localhost:3000/filmes").then((r) => r.json()).then(setFilmes);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.issues.forEach((e) => { fieldErrors[e.path[0] as string] = e.message; });
        setErrors(fieldErrors);
      }
    }
  };

  const handleDelete = (id: string) => {
    toast("Deseja realmente excluir este filme?", {
      action: {
        label: "Excluir",
        onClick: async () => {
          await fetch(`http://localhost:3000/filmes/${id}`, { method: "DELETE" });
          setFilmes(filmes.filter((f) => f.id !== id));
          toast.success("Filme excluído!");
        },
      },
      cancel: { label: "Cancelar", onClick: () => {} },
    });
  };

  return (
    <div className="container py-5">
      <style>{`
        .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
        .page-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; letter-spacing: 0.06em; color: var(--cinema-text); margin: 0; }
        .form-panel {
          background: var(--cinema-panel);
          border: 1px solid var(--cinema-border);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2.5rem;
          animation: slideDown 0.25s ease;
        }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        .form-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 0.08em;
          color: var(--cinema-gold);
          margin-bottom: 1.2rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid var(--cinema-border);
        }
        .poster-preview {
          width: 100%;
          aspect-ratio: 2/3;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid var(--cinema-border);
          background: var(--cinema-dark);
        }
        .filme-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.25rem; }
        .filme-item { background: var(--cinema-panel); border: 1px solid var(--cinema-border); border-radius: 10px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
        .filme-item:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
        .filme-poster { width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block; }
        .filme-body { padding: 0.75rem; }
        .filme-titulo { font-size: 0.85rem; font-weight: 600; color: var(--cinema-text); margin: 0 0 0.2rem; }
        .filme-meta { font-size: 0.7rem; color: var(--cinema-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .filme-rating { display: inline-block; background: var(--cinema-dark); border: 1px solid var(--cinema-border); border-radius: 3px; padding: 0.1rem 0.4rem; font-size: 0.68rem; font-weight: 700; color: var(--cinema-gold); margin-top: 0.4rem; }
      `}</style>

      <div className="page-header">
        <h2 className="page-title">Gerenciar Filmes</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <i className={`bi ${showForm ? "bi-x-lg" : "bi-plus-lg"} me-2`}></i>
          {showForm ? "Cancelar" : "Novo Filme"}
        </button>
      </div>

      {showForm && (
        <div className="form-panel">
          <div className="form-section-title">
            <i className="bi bi-film me-2"></i>Cadastrar Novo Filme
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-9">
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="form-label">Título</label>
                    <input type="text" className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
                      value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} />
                    {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Duração (min)</label>
                    <input type="number" className={`form-control ${errors.duracao ? "is-invalid" : ""}`}
                      value={formData.duracao} onChange={(e) => setFormData({ ...formData, duracao: Number(e.target.value) })} />
                    {errors.duracao && <div className="invalid-feedback">{errors.duracao}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Gênero</label>
                    <select className={`form-select ${errors.genero ? "is-invalid" : ""}`}
                      value={formData.genero} onChange={(e) => setFormData({ ...formData, genero: e.target.value })}>
                      <option value="">Selecione...</option>
                      {GENEROS.map((g) => <option key={g}>{g}</option>)}
                    </select>
                    {errors.genero && <div className="invalid-feedback">{errors.genero}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Classificação</label>
                    <select className={`form-select ${errors.classificacao ? "is-invalid" : ""}`}
                      value={formData.classificacao} onChange={(e) => setFormData({ ...formData, classificacao: e.target.value })}>
                      <option value="">Selecione...</option>
                      {CLASSIFICACOES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    {errors.classificacao && <div className="invalid-feedback">{errors.classificacao}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Data de Estreia</label>
                    <input type="date" className={`form-control ${errors.dataEstreia ? "is-invalid" : ""}`}
                      value={formData.dataEstreia} onChange={(e) => setFormData({ ...formData, dataEstreia: e.target.value })} />
                    {errors.dataEstreia && <div className="invalid-feedback">{errors.dataEstreia}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">URL do Poster</label>
                    <input type="text" className={`form-control ${errors.posterUrl ? "is-invalid" : ""}`}
                      placeholder="https://..." value={formData.posterUrl}
                      onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })} />
                    {errors.posterUrl && <div className="invalid-feedback">{errors.posterUrl}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Sinopse</label>
                    <textarea rows={3} className={`form-control ${errors.sinopse ? "is-invalid" : ""}`}
                      value={formData.sinopse} onChange={(e) => setFormData({ ...formData, sinopse: e.target.value })} />
                    {errors.sinopse && <div className="invalid-feedback">{errors.sinopse}</div>}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <label className="form-label">Preview do Poster</label>
                <img src={formData.posterUrl || PLACEHOLDER} alt="poster preview" className="poster-preview"
                  onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }} />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary px-4">
                  <i className="bi bi-save me-2"></i>Salvar Filme
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {filmes.length === 0 ? (
        <div className="text-center py-5" style={{ color: "var(--cinema-muted)" }}>
          <i className="bi bi-film" style={{ fontSize: "3rem", opacity: 0.3 }}></i>
          <p className="mt-3">Nenhum filme cadastrado.</p>
        </div>
      ) : (
        <div className="filme-grid">
          {filmes.map((filme) => (
            <div key={filme.id} className="filme-item">
              <img src={filme.posterUrl || PLACEHOLDER} alt={filme.titulo} className="filme-poster"
                onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }} />
              <div className="filme-body">
                <p className="filme-titulo">{filme.titulo}</p>
                <p className="filme-meta">{filme.genero} · {filme.duracao}min</p>
                <div><span className="filme-rating">{filme.classificacao}</span></div>
                <button onClick={() => handleDelete(filme.id)}
                  className="btn btn-sm mt-2 w-100"
                  style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)", color: "#e74c3c", fontSize: "0.75rem" }}>
                  <i className="bi bi-trash me-1"></i>Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
