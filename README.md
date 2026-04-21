# 🎬 CinemaP2 — Cinemarlon

Sistema de gerenciamento de cinema desenvolvido com React + TypeScript + Vite.

---

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar backend mock (porta 3000)
npx json-server db.json --port 3000

# Iniciar frontend (porta 5173)
npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| React 18 + TypeScript | Framework principal |
| Vite | Bundler e dev server |
| Bootstrap 5 + Bootstrap Icons | UI base |
| React Router DOM | Roteamento SPA |
| Zod | Validação de formulários |
| Sonner | Notificações toast |
| json-server | Backend mock REST |

---

## 📁 Estrutura

```
src/
├── components/
│   └── Navbar.tsx
├── pages/
│   ├── Home.tsx
│   ├── Filmes.tsx
│   ├── Salas.tsx
│   ├── Sessoes.tsx
│   ├── Ingressos.tsx
│   └── Pipoca.tsx
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 📋 Endpoints da API

| Recurso | Endpoint |
|---|---|
| Filmes | `GET/POST/DELETE /filmes` |
| Salas | `GET/POST/DELETE /salas` |
| Sessões | `GET/POST/DELETE /sessoes` |
| Ingressos | `GET/POST/DELETE /ingressos` |

---

## 📦 Changelog

### v1.2.2 — Modernização da Interface *(Abril 2026)*

#### ✨ Novas Funcionalidades

- **Página Bombonière (`/pipoca`)** — cardápio completo com 9 itens (pipocas, combos, bebidas, snacks), carrinho lateral sticky com controle de quantidade e fluxo de finalização de pedido
- **Suporte a Posters** — campo `posterUrl` no cadastro de filmes com preview em tempo real; fallback automático para placeholder quando URL está ausente ou quebrada
- **Busca de Filmes** — barra de pesquisa sticky na Home que filtra filmes por título em tempo real

#### 🎨 Design

- **Tema Cinematic Escuro** — paleta editorial com preto carvão (`#080A0E`), dourado (`#E8B84B`) e bege suave; substituiu completamente o `dark-theme.css` anterior
- **Tipografia** — Bebas Neue (títulos estilo letreiro de cinema) + DM Sans (texto corrido), carregadas via Google Fonts
- **Hero Fullscreen** — seção hero na Home com imagem do poster em tela cheia, overlay gradiente, título responsivo até 7rem, metadados do filme e navegação por dots entre os filmes em cartaz
- **Grade de Posters** — página Filmes reformulada com grid visual de cards com poster (aspect ratio 2/3) no lugar da lista anterior
- **Sessões Redesenhadas** — lista de próximas sessões com layout de horário estilo painel de cinema (hora em Bebas Neue, borda dourada lateral)

#### 🔧 Melhorias

- **Navbar** — novo visual com logo CINEMARLON, links em uppercase com letter-spacing, hover/active states com fundo dourado translúcido; novo item de menu Pipoca
- **Formulário de Filmes** — recolhível (aparece ao clicar em "Novo Filme"), dropdowns para Gênero (12 opções) e Classificação (6 opções), campo de URL do poster
- **App.tsx** — removido wrapper `<main className="container">` para permitir hero fullscreen; nova rota `/pipoca`
- **Scrollbar** personalizada com a paleta do tema
- **Toaster** (Sonner) com cores integradas ao tema escuro

#### 📐 Alterações no Modelo de Dados (`types.ts`)

- `filmeSchema` — adicionado campo opcional `posterUrl` (string URL)
- `PipocaItem` — novo tipo: `{ id, nome, preco, emoji, descricao }`
- `CarrinhoItem` — extensão de `PipocaItem` com campo `quantidade`

#### 📄 Arquivos Alterados

| Arquivo | Tipo |
|---|---|
| `src/index.css` | Modificado |
| `src/main.tsx` | Modificado |
| `src/App.tsx` | Modificado |
| `src/types.ts` | Modificado |
| `src/components/Navbar.tsx` | Modificado |
| `src/pages/Home.tsx` | Modificado |
| `src/pages/Filmes.tsx` | Modificado |
| `src/pages/Pipoca.tsx` | **Criado** |

---

### v1.0.0 — Versão Inicial

- CRUD de Filmes, Salas, Sessões e Ingressos
- Tema escuro com Bootstrap
- Validação de formulários com Zod
- Notificações com Sonner
- Backend mock com json-server
