import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useApp, gradoLabel } from "../context/AppContext";
import reporteBg1 from "../assets/reporte-bg-1.png";
import reporteBg2 from "../assets/reporte-bg-2.png";
import reporteBg3 from "../assets/reporte-bg-3.png";
import reporteBg4 from "../assets/reporte-bg-4.png";
import "./AlumnosPage.css";
import "./ReportesPage.css";

const fondos = [reporteBg1, reporteBg2, reporteBg3, reporteBg4];

function ReportesBackground() {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActivo((prev) => (prev + 1) % fondos.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="reportes-bg" aria-hidden="true">
      {fondos.map((img, index) => (
        <div
          key={img}
          className={`reportes-bg-slide${index === activo ? " is-active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="reportes-bg-overlay" />
    </div>
  );
}

function LoginCard() {
  const { login } = useApp();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = login(usuario, password);
    if (!ok) {
      setError("Ingresa usuario y contraseña para continuar.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-badge">🔒</div>
        <h2>Inicia sesión</h2>
        <p>
          El listado de alumnos inscritos y sus reportes solo están disponibles para
          usuarios autenticados.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese su usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="button-primary login-submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

function ReportesPage() {
  const { alumnos, usuario, logout, isLoggedIn } = useApp();

  const [grado, setGrado] = useState("");
  const [seccion, setSeccion] = useState("");
  const [estado, setEstado] = useState("");

  const alumnosFiltrados = useMemo(() => {
    return alumnos.filter((alumno) => {
      const coincideGrado = !grado || alumno.grado === grado;
      const coincideSeccion = !seccion || alumno.seccion === seccion;
      const coincideEstado = !estado || alumno.estado === estado;
      return coincideGrado && coincideSeccion && coincideEstado;
    });
  }, [alumnos, grado, seccion, estado]);

  const totalActivos = alumnosFiltrados.filter((a) => a.estado === "Activo").length;
  const totalInactivos = alumnosFiltrados.length - totalActivos;

  const limpiarFiltros = () => {
    setGrado("");
    setSeccion("");
    setEstado("");
  };

  if (!isLoggedIn) {
    return (
      <section className="reportes-page">
        <ReportesBackground />
        <div className="reportes-content">
          <LoginCard />
        </div>
      </section>
    );
  }

  return (
    <section className="reportes-page">
      <ReportesBackground />
      <div className="reportes-content">
      <div className="page-header">
        <div>
          <h1>Reporte de alumnos inscritos</h1>
          <p>Consulta el listado de alumnos y genera reportes según los filtros.</p>
        </div>

        <div className="session-box">
          <span className="session-user">👤 {usuario}</span>
          <button type="button" className="logout-button" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="report-stats">
        <div className="stat-card">
          <span className="stat-icon stat-icon-total">👥</span>
          <div>
            <span className="stat-value">{alumnosFiltrados.length}</span>
            <span className="stat-label">Alumnos en el reporte</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon stat-icon-active">✅</span>
          <div>
            <span className="stat-value">{totalActivos}</span>
            <span className="stat-label">Activos</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon stat-icon-inactive">⛔</span>
          <div>
            <span className="stat-value">{totalInactivos}</span>
            <span className="stat-label">Inactivos</span>
          </div>
        </div>
      </div>

      <div className="form-card">
        <h2>Filtros del reporte</h2>

        <div className="report-filters">
          <div className="form-group">
            <label htmlFor="filtroGrado">Grado</label>
            <select id="filtroGrado" value={grado} onChange={(e) => setGrado(e.target.value)}>
              <option value="">Todos los grados</option>
              <option value="1">Primero primaria</option>
              <option value="2">Segundo primaria</option>
              <option value="3">Tercero primaria</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filtroSeccion">Sección</label>
            <select
              id="filtroSeccion"
              value={seccion}
              onChange={(e) => setSeccion(e.target.value)}
            >
              <option value="">Todas las secciones</option>
              <option value="A">Sección A</option>
              <option value="B">Sección B</option>
              <option value="C">Sección C</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="filtroEstado">Estado</label>
            <select id="filtroEstado" value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={limpiarFiltros}>
            Limpiar filtros
          </button>
          <button type="button" className="button-primary" onClick={() => window.print()}>
            Generar / Imprimir reporte
          </button>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Listado de alumnos inscritos</h2>
            <p>Resultado según los filtros aplicados.</p>
          </div>

          <div className="report-export">
            <button type="button" className="export-button">📄 Exportar PDF</button>
            <button type="button" className="export-button">📊 Exportar Excel</button>
          </div>
        </div>

        <div className="table-container">
          <table className="reporte-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre completo</th>
                <th>Grado</th>
                <th>Sección</th>
                <th>Encargado</th>
                <th>Teléfono</th>
                <th>Cursos</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {alumnosFiltrados.length > 0 ? (
                alumnosFiltrados.map((alumno) => (
                  <tr key={alumno.codigo}>
                    <td>{alumno.codigo}</td>
                    <td>
                      {alumno.nombre} {alumno.apellido}
                    </td>
                    <td>{gradoLabel[alumno.grado] ?? "—"}</td>
                    <td>{alumno.seccion || "—"}</td>
                    <td>{alumno.encargado || "—"}</td>
                    <td>{alumno.telefono || "—"}</td>
                    <td>
                      {alumno.cursos && alumno.cursos.length > 0
                        ? alumno.cursos.join(", ")
                        : "—"}
                    </td>
                    <td>
                      <span
                        className={`status ${
                          alumno.estado === "Activo" ? "status-active" : "status-inactive"
                        }`}
                      >
                        {alumno.estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="report-empty">
                    No hay alumnos que coincidan con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </section>
  );
}

export default ReportesPage;
