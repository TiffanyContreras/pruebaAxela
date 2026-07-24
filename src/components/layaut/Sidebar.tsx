import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import logo from "../../assets/logo.png";
import "./Sidebar.css";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, usuario, logout } = useApp();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleSessionClick = () => {
    closeMenu();
    if (isLoggedIn) {
      logout();
    } else {
      navigate("/reportes");
    }
  };

  return (
    <header className="topbar">
      <NavLink to="/" className="topbar-logo" onClick={closeMenu}>
        <img className="logo-img" src={logo} alt="Escuela de Brasil" />
        <span className="logo-text">
          <span className="logo-text-main">ESCUELA</span>
          <span className="logo-text-sub">DE BRASIL</span>
        </span>
      </NavLink>

      <button
        type="button"
        className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`topbar-menu${isMenuOpen ? " is-open" : ""}`}>
        <NavLink to="/" onClick={closeMenu} end>
          Home
        </NavLink>
        <NavLink to="/alumnos" onClick={closeMenu}>
          Registrar alumno
        </NavLink>
        <NavLink to="/consultar-alumno" onClick={closeMenu}>
          Consultar alumno por código
        </NavLink>
        <NavLink to="/cursos" onClick={closeMenu}>
          Cursos
        </NavLink>

        {isLoggedIn && <span className="menu-user">👤 {usuario}</span>}

        <button type="button" className="login-button" onClick={handleSessionClick}>
          {isLoggedIn ? "Cerrar sesión" : "Inicia sesión"}
        </button>
      </nav>

      {isMenuOpen && (
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Cerrar menú"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}

export default Sidebar;
