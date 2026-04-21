import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Filmes } from "./pages/Filmes";
import { Salas } from "./pages/Salas";
import { Sessoes } from "./pages/Sessoes";
import { Ingressos } from "./pages/Ingressos";
import { Home } from "./pages/Home";
import { Pipoca } from "./pages/Pipoca";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/salas" element={<Salas />} />
        <Route path="/sessoes" element={<Sessoes />} />
        <Route path="/ingressos" element={<Ingressos />} />
        <Route path="/pipoca" element={<Pipoca />} />
      </Routes>
      <Toaster
        richColors
        toastOptions={{
          style: {
            background: "var(--cinema-panel)",
            border: "1px solid var(--cinema-border)",
            color: "var(--cinema-text)",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
