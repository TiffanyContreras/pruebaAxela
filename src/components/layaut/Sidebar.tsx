import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <header className="topbar">
      <nav className="topbar-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/alumnos">Sobre nosotros</NavLink>
        <NavLink to="/cursos">Cursos</NavLink>
        <NavLink to="/maestros">Portal padres</NavLink>
        <NavLink to="/reportes">Portal maestros</NavLink>
      </nav>

      <div className="topbar-right">
        <button type="button" className="login-button">
          Inicia sesión
        </button>

        {/* Espacio para el logo: círculo + "ilora". Reemplaza el contenido por <img src="..." /> cuando lo tengas */}
        <div className="topbar-logo">
          <span className="logo-circle" aria-hidden="true" />
          <span className="logo-text">ilora</span>
        </div>
      </div>
    </header>
  );
}

export default Sidebar;
