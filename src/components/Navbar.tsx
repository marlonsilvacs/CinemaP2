import { NavLink } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : ""}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <i className="bi bi-camera-reels-fill" style={{ color: "var(--cinema-gold)" }}></i>
          <span>CINEMARLON</span>
        </NavLink>
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          style={{ color: "var(--cinema-muted)" }}
        >
          <i className={`bi ${isNavCollapsed ? "bi-list" : "bi-x-lg"} fs-5`}></i>
        </button>
        <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1">
            <li className="nav-item">
              <NavLink to="/" className={getLinkClass} end>
                <i className="bi bi-house-door"></i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/filmes" className={getLinkClass}>
                <i className="bi bi-film"></i>Filmes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/salas" className={getLinkClass}>
                <i className="bi bi-door-open"></i>Salas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sessoes" className={getLinkClass}>
                <i className="bi bi-calendar-event"></i>Sessões
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/ingressos" className={getLinkClass}>
                <i className="bi bi-ticket-perforated"></i>Ingressos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/pipoca" className={getLinkClass}>
                <i className="bi bi-cup-straw"></i>Pipoca
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
