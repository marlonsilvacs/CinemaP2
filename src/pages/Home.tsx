import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Filme, type Sessao, type Sala } from "../types";

const PLACEHOLDER = "https://placehold.co/300x450/161b24/e8b84b?text=SEM+POSTER";

export function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/filmes").then((r) => r.json()),
      fetch("http://localhost:3000/sessoes").then((r) => r.json()),
      fetch("http://localhost:3000/salas").then((r) => r.json()),
    ])
      .then(([filmesData, sessoesData, salasData]) => {
        setFilmes(filmesData);
        setSessoes(sessoesData);
        setSalas(salasData);
      })
      .finally(() => setLoading(false));
  }, []);

  const getFilme = (id: string) => filmes.find((f) => f.id === id);
  const getSala = (id: string) => salas.find((s) => s.id === id);

  const filmesComSessao = filmes.filter((filme) =>
    sessoes.some(
      (sessao) => sessao.filmeId === filme.id && new Date(sessao.dataHora) > new Date(),
    ),
  );

  const filmesFiltered = search.trim()
    ? filmes.filter((f) => f.titulo.toLowerCase().includes(search.toLowerCase()))
    : filmesComSessao;

  const sessoesDisponiveis = sessoes
    .filter((s) => new Date(s.dataHora) > new Date())
    .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());

  const heroFilme = filmesComSessao[heroIdx % Math.max(filmesComSessao.length, 1)] ?? null;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p style={{ color: "var(--cinema-muted)", letterSpacing: "0.15em", fontSize: "0.8rem", textTransform: "uppercase" }}>
            Preparando a sessão
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .hero-wrap {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center 20%;
          filter: brightness(0.35) saturate(0.7);
          transition: background-image 0.6s ease;
        }
        .hero-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            var(--cinema-black) 0%,
            rgba(8,10,14,0.7) 50%,
            rgba(8,10,14,0.2) 100%
          );
        }
        .hero-content { position: relative; z-index: 2; padding: 4rem 0 5rem; }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: var(--cinema-gold); color: #080a0e;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.25rem 0.7rem; border-radius: 2px;
          margin-bottom: 1rem;
        }
        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 8vw, 7rem);
          letter-spacing: 0.03em;
          line-height: 0.95;
          color: var(--cinema-text);
          text-shadow: 0 4px 24px rgba(0,0,0,0.8);
          margin-bottom: 1.2rem;
        }
        .hero-meta span {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--cinema-muted);
          padding: 0 0.8rem;
          border-right: 1px solid var(--cinema-border);
        }
        .hero-meta span:first-child { padding-left: 0; }
        .hero-meta span:last-child { border-right: none; }
        .hero-synopsis {
          color: rgba(232,224,208,0.75);
          font-size: 0.95rem;
          max-width: 520px;
          margin: 1rem 0 2rem;
          line-height: 1.7;
        }
        .hero-nav {
          display: flex; gap: 0.5rem; margin-top: 2rem;
        }
        .hero-dot {
          width: 32px; height: 3px; border-radius: 2px;
          background: var(--cinema-border);
          cursor: pointer; transition: background 0.2s, width 0.2s;
          border: none; padding: 0;
        }
        .hero-dot.active { background: var(--cinema-gold); width: 48px; }

        /* Search */
        .search-bar-wrap {
          position: sticky; top: 68px; z-index: 10;
          background: rgba(8,10,14,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--cinema-border);
          padding: 0.75rem 0;
        }
        .search-input {
          background: var(--cinema-dark) !important;
          border: 1px solid var(--cinema-border) !important;
          color: var(--cinema-text) !important;
          border-radius: 6px !important;
          padding: 0.6rem 1rem 0.6rem 2.8rem !important;
          font-size: 0.9rem !important;
        }
        .search-input:focus { border-color: var(--cinema-gold) !important; box-shadow: 0 0 0 3px rgba(232,184,75,0.12) !important; }
        .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--cinema-muted); pointer-events: none; }

        /* Section */
        .section-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.06em;
          color: var(--cinema-text);
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .section-label::after {
          content: '';
          flex: 1; height: 1px;
          background: linear-gradient(to right, var(--cinema-border), transparent);
        }

        /* Movie card */
        .hscroll { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 1rem; }
        .hscroll::-webkit-scrollbar { height: 4px; }
        .hscroll::-webkit-scrollbar-thumb { background: var(--cinema-border); }

        .movie-card {
          flex: 0 0 180px;
          border-radius: 8px;
          overflow: hidden;
          background: var(--cinema-panel);
          border: 1px solid var(--cinema-border);
          transition: transform 0.25s, box-shadow 0.25s;
          cursor: pointer;
          text-decoration: none;
        }
        .movie-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 48px rgba(0,0,0,0.6), 0 0 0 1px var(--cinema-gold);
        }
        .movie-poster {
          width: 100%; aspect-ratio: 2/3;
          object-fit: cover;
          display: block;
        }
        .movie-info { padding: 0.6rem 0.75rem 0.75rem; }
        .movie-title { font-size: 0.82rem; font-weight: 600; color: var(--cinema-text); margin: 0 0 0.2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .movie-genre { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--cinema-gold); }

        /* Sessions */
        .session-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1rem;
          align-items: center;
          padding: 1rem 1.25rem;
          background: var(--cinema-panel);
          border: 1px solid var(--cinema-border);
          border-left: 3px solid var(--cinema-gold);
          border-radius: 0 8px 8px 0;
          margin-bottom: 0.5rem;
          transition: background 0.2s;
        }
        .session-row:hover { background: #1a202c; }
        .session-time {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: var(--cinema-gold);
          line-height: 1;
          min-width: 60px;
          text-align: center;
        }
        .session-time small { display: block; font-family: 'DM Sans', sans-serif; font-size: 0.62rem; letter-spacing: 0.1em; color: var(--cinema-muted); text-transform: uppercase; }
        .session-name { font-size: 0.95rem; font-weight: 600; color: var(--cinema-text); }
        .session-detail { font-size: 0.75rem; color: var(--cinema-muted); margin-top: 0.15rem; }
        .session-sala { font-size: 0.75rem; background: var(--cinema-dark); border: 1px solid var(--cinema-border); border-radius: 4px; padding: 0.25rem 0.6rem; color: var(--cinema-muted); white-space: nowrap; }
      `}</style>

      {/* HERO */}
      {heroFilme && (
        <div className="hero-wrap">
          <div
            className="hero-bg"
            style={{ backgroundImage: `url('${heroFilme.posterUrl || PLACEHOLDER}')` }}
          />
          <div className="hero-gradient" />
          <div className="container hero-content">
            <div className="hero-tag"><i className="bi bi-play-fill"></i> Em Cartaz</div>
            <h1 className="hero-title">{heroFilme.titulo}</h1>
            <div className="hero-meta">
              <span>{heroFilme.genero}</span>
              <span>{heroFilme.duracao} min</span>
              <span>{heroFilme.classificacao}</span>
            </div>
            <p className="hero-synopsis">{heroFilme.sinopse}</p>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/sessoes" className="btn btn-primary px-4">
                <i className="bi bi-ticket-perforated me-2"></i>Comprar Ingresso
              </Link>
              <Link to="/pipoca" className="btn btn-outline-secondary px-4">
                <i className="bi bi-cup-straw me-2"></i>Pedir Pipoca
              </Link>
            </div>
            {filmesComSessao.length > 1 && (
              <div className="hero-nav">
                {filmesComSessao.map((_, i) => (
                  <button
                    key={i}
                    className={`hero-dot ${i === heroIdx % filmesComSessao.length ? "active" : ""}`}
                    onClick={() => setHeroIdx(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEARCH */}
      <div className="search-bar-wrap">
        <div className="container">
          <div className="position-relative" style={{ maxWidth: 480 }}>
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Buscar filme por título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* FILMES EM CARTAZ */}
        <section className="mb-5">
          <div className="section-label">
            {search ? `Resultados para "${search}"` : "Em Cartaz"}
          </div>
          <div className="hscroll">
            {filmesFiltered.length > 0 ? (
              filmesFiltered.map((filme) => (
                <Link to="/sessoes" key={filme.id} className="movie-card">
                  <img
                    src={filme.posterUrl || PLACEHOLDER}
                    alt={filme.titulo}
                    className="movie-poster"
                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
                  />
                  <div className="movie-info">
                    <p className="movie-title">{filme.titulo}</p>
                    <p className="movie-genre">{filme.genero}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p style={{ color: "var(--cinema-muted)" }}>Nenhum filme encontrado.</p>
            )}
          </div>
        </section>

        {/* PRÓXIMAS SESSÕES */}
        <section>
          <div className="section-label">Próximas Sessões</div>
          {sessoesDisponiveis.length > 0 ? (
            <>
              {sessoesDisponiveis.slice(0, 6).map((sessao) => {
                const filme = getFilme(sessao.filmeId);
                const sala = getSala(sessao.salaId);
                const dt = new Date(sessao.dataHora);
                return (
                  <div key={sessao.id} className="session-row">
                    <div className="session-time">
                      {dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      <small>{dt.toLocaleDateString("pt-BR", { weekday: "short" })}</small>
                    </div>
                    <div>
                      <div className="session-name">{filme?.titulo ?? "—"}</div>
                      <div className="session-detail">
                        {dt.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                        {filme && <> &bull; {filme.genero} &bull; {filme.duracao} min</>}
                      </div>
                    </div>
                    <span className="session-sala">
                      <i className="bi bi-door-open me-1"></i>Sala {sala?.numero ?? "?"}
                    </span>
                  </div>
                );
              })}
              {sessoesDisponiveis.length > 6 && (
                <div className="text-center mt-3">
                  <Link to="/sessoes" className="btn btn-outline-secondary btn-sm">
                    Ver todas as sessões
                  </Link>
                </div>
              )}
            </>
          ) : (
            <p style={{ color: "var(--cinema-muted)" }}>Nenhuma sessão disponível.</p>
          )}
        </section>
      </div>
    </>
  );
}
