import { useEffect, useMemo, useState } from "react";
import type { SubmitEvent } from "react";
import { useApp } from "../context/AppContext";
import { gradoLabel, cursosDisponibles, maestros } from "../data/school";
import type { Alumno } from "../data/school";
import reporteBg1 from "../assets/reporte-bg-1.png";
import reporteBg2 from "../assets/reporte-bg-2.png";
import reporteBg3 from "../assets/reporte-bg-3.png";
import reporteBg4 from "../assets/reporte-bg-4.png";
import "./AlumnosPage.css";
import "./ReportesPage.css";
import { Cards} from "../components/card";

const fondos = [reporteBg1, reporteBg2, reporteBg3, reporteBg4];

function calcularPromedio(alumno: Alumno): string {
  const notas = alumno.materias
    .filter((m) => m.nota.trim() !== "")
    .map((m) => Number(m.nota))
    .filter((n) => !Number.isNaN(n));

  return notas.length > 0
    ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1)
    : "—";
}

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
  const { login, registrarUsuario } = useApp();
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");

  const limpiarCampos = () => {
    setUsuario("");
    setPassword("");
    setConfirmar("");
  };

  const cambiarModo = (nuevo: "login" | "registro") => {
    setModo(nuevo);
    setError("");
    limpiarCampos();
  };

  const handleLogin = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = login(usuario, password);
    if (!ok) {
      setError("Usuario o contraseña incorrectos.");
    }
    setUsuario("");
    setPassword("");
  };

  const handleRegistro = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const resultado = registrarUsuario({
      usuario,
      password,
    });

    if (!resultado.ok) {
      setError(resultado.error ?? "No se pudo crear la cuenta.");
      return;
    }

    setError("");
    limpiarCampos();
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-badge">{modo === "login" ? "🔒" : "🧑‍🎓"}</div>
        <h2>{modo === "login" ? "Inicia sesión" : "Crear cuenta"}</h2>
        <p>
          {modo === "login"
            ? "El listado de alumnos inscritos y sus reportes solo están disponibles para usuarios autenticados."
            : "Crea un nuevo usuario administrador con acceso a los reportes y la gestión de alumnos."}
        </p>

        <div className="login-tabs">
          <button
            type="button"
            className={`login-tab${modo === "login" ? " is-active" : ""}`}
            onClick={() => cambiarModo("login")}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className={`login-tab${modo === "registro" ? " is-active" : ""}`}
            onClick={() => cambiarModo("registro")}
          >
            Crear cuenta
          </button>
        </div>

        {modo === "login" ? (
          <form className="login-form" onSubmit={handleLogin} autoComplete="off">
            <div className="form-group">
              <label htmlFor="usuario">Usuario</label>
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingrese su usuario"
                autoComplete="off"
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
                autoComplete="new-password"
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="button-primary login-submit">
              Ingresar
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleRegistro} autoComplete="off">
            <div className="form-group">
              <label htmlFor="nuevoUsuario">Usuario</label>
              <input
                id="nuevoUsuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Elige un nombre de usuario"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nuevaPassword">Contraseña</label>
              <input
                id="nuevaPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Elige una contraseña"
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarPassword">Confirmar contraseña</label>
              <input
                id="confirmarPassword"
                type="password"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                placeholder="Repite la contraseña"
                autoComplete="new-password"
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="button-primary login-submit">
              Crear cuenta
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function VistaAlumno({ codigoAlumno }: { codigoAlumno: string }) {
  const { alumnos, usuario, logout } = useApp();
  const alumno = alumnos.find((a) => a.codigo === codigoAlumno);

  if (!alumno) {
    return (
      <div className="reportes-content">
        <div className="form-card">
          <h2>Sin información</h2>
          <p>No se encontró la información de tu cuenta.</p>
          <button type="button" className="logout-button" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  const notas = alumno.materias
    .filter((m) => m.nota.trim() !== "")
    .map((m) => Number(m.nota))
    .filter((n) => !Number.isNaN(n));

  const promedio =
    notas.length > 0
      ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1)
      : "—";

  return (
    <div className="reportes-content">
      <div className="page-header">
        <div>
          <h1>Mi información</h1>
          <p>
            Hola, {alumno.nombre}. Aquí puedes consultar tus materias y notas.
          </p>
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
          <span className="stat-icon stat-icon-total">🎓</span>
          <div>
            <span className="stat-value">{alumno.codigo}</span>
            <span className="stat-label">Código de alumno</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon stat-icon-active">📚</span>
          <div>
            <span className="stat-value">{alumno.materias.length}</span>
            <span className="stat-label">Materias inscritas</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon stat-icon-total">⭐</span>
          <div>
            <span className="stat-value">{promedio}</span>
            <span className="stat-label">Promedio general</span>
          </div>
        </div>
      </div>

      <div className="form-card">
        <h2>Datos personales</h2>
        <div className="curso-detalle-info alumno-datos">
          <div className="detalle-item">
            <span className="detalle-label">Nombre</span>
            <span className="detalle-valor">
              {alumno.nombre} {alumno.apellido}
            </span>
          </div>
          <div className="detalle-item">
            <span className="detalle-label">Grado</span>
            <span className="detalle-valor">{gradoLabel[alumno.grado] ?? "—"}</span>
          </div>
          <div className="detalle-item">
            <span className="detalle-label">Sección</span>
            <span className="detalle-valor">{alumno.seccion || "—"}</span>
          </div>
          <div className="detalle-item">
            <span className="detalle-label">Encargado</span>
            <span className="detalle-valor">{alumno.encargado || "—"}</span>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Mis materias y notas</h2>
            <p>Cursos en los que estás inscrito.</p>
          </div>
        </div>

        <div className="table-container">
          <table className="reporte-table">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Maestro asignado</th>
                <th>Horario</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {alumno.materias.length > 0 ? (
                alumno.materias.map((materia, index) => (
                  <tr key={`${materia.curso}-${index}`}>
                    <td>{materia.curso}</td>
                    <td>{materia.maestro || "Sin asignar"}</td>
                    <td>{materia.horario || "—"}</td>
                    <td>{materia.nota !== "" ? materia.nota : "Pendiente"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="report-empty">
                    Aún no tienes materias inscritas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function GestionMaterias() {
  const { alumnos, agregarMateria, actualizarMateria, eliminarMateria, materiaPorNombre } =
    useApp();
  const [codigoSel, setCodigoSel] = useState(alumnos[0]?.codigo ?? "");
  const [nuevoCurso, setNuevoCurso] = useState("");

  const alumno =
    alumnos.find((a) => a.codigo === codigoSel) ?? alumnos[0];

  const handleAgregar = () => {
    if (!alumno || !nuevoCurso) return;
    agregarMateria(alumno.codigo, materiaPorNombre(nuevoCurso));
    setNuevoCurso("");
  };

  return (
    <div className="form-card">
      <h2>Gestión de materias por alumno</h2>

      <div className="gestion-selector">
        <div className="form-group">
          <label htmlFor="alumnoSel">Alumno</label>
          <select
            id="alumnoSel"
            value={alumno?.codigo ?? ""}
            onChange={(e) => setCodigoSel(e.target.value)}
          >
            {alumnos.map((a) => (
              <option key={a.codigo} value={a.codigo}>
                {a.codigo} — {a.nombre} {a.apellido}
              </option>
            ))}
          </select>
        </div>
      </div>

      {alumno && (
        <>
          <div className="table-container">
            <table className="reporte-table gestion-table">
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Maestro asignado</th>
                  <th>Horario</th>
                  <th>Nota</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {alumno.materias.length > 0 ? (
                  alumno.materias.map((materia, index) => (
                    <tr key={`${materia.curso}-${index}`}>
                      <td>{materia.curso}</td>
                      <td>
                        <select
                          value={materia.maestro}
                          onChange={(e) =>
                            actualizarMateria(alumno.codigo, index, {
                              maestro: e.target.value,
                            })
                          }
                        >
                          <option value="">Sin asignar</option>
                          {maestros.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={materia.horario}
                          placeholder="07:00 - 08:00"
                          onChange={(e) =>
                            actualizarMateria(alumno.codigo, index, {
                              horario: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={materia.nota}
                          placeholder="—"
                          className="nota-input"
                          onChange={(e) =>
                            actualizarMateria(alumno.codigo, index, {
                              nota: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => eliminarMateria(alumno.codigo, index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="report-empty">
                      Este alumno no tiene materias inscritas. Agrega una abajo.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="agregar-materia">
            <div className="form-group">
              <label htmlFor="nuevoCurso">Agregar materia</label>
              <select
                id="nuevoCurso"
                value={nuevoCurso}
                onChange={(e) => setNuevoCurso(e.target.value)}
              >
                <option value="">Seleccione un curso</option>
                {cursosDisponibles.map((curso) => (
                  <option key={curso.codigo} value={curso.nombre}>
                    {curso.nombre}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="button-primary"
              onClick={handleAgregar}
              disabled={!nuevoCurso}
            >
              + Agregar materia
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function GestionUsuarios() {
  const { usuarios, actualizarCredenciales } = useApp();
  const [ediciones, setEdiciones] = useState<
    Record<string, { usuario: string; password: string }>
  >({});
  const [mensajes, setMensajes] = useState<Record<string, string>>({});
  const [visibles, setVisibles] = useState<Record<string, boolean>>({});

  const valorUsuario = (original: string, actual: string) =>
    ediciones[original]?.usuario ?? actual;
  const valorPassword = (original: string, actual: string) =>
    ediciones[original]?.password ?? actual;

  const setCampo = (
    original: string,
    campo: "usuario" | "password",
    valor: string,
    actualUsuario: string,
    actualPassword: string
  ) => {
    setEdiciones((prev) => ({
      ...prev,
      [original]: {
        usuario: campo === "usuario" ? valor : prev[original]?.usuario ?? actualUsuario,
        password:
          campo === "password" ? valor : prev[original]?.password ?? actualPassword,
      },
    }));
  };

  const guardar = (original: string, actualUsuario: string, actualPassword: string) => {
    const nuevoUsuario = valorUsuario(original, actualUsuario);
    const nuevaPassword = valorPassword(original, actualPassword);
    const resultado = actualizarCredenciales(original, {
      usuario: nuevoUsuario,
      password: nuevaPassword,
    });
    setMensajes((prev) => ({
      ...prev,
      [original]: resultado.ok
        ? "✔ Credenciales actualizadas."
        : `✖ ${resultado.error ?? "No se pudo actualizar."}`,
    }));
    if (resultado.ok) {
      setEdiciones((prev) => {
        const copia = { ...prev };
        delete copia[original];
        return copia;
      });
    }
  };

  return (
    <div className="form-card">
      <h2>Gestión de usuarios y contraseñas</h2>
      <p className="consulta-ayuda">
        Aquí puedes ver todas las cuentas y restablecer el usuario o la contraseña si
        alguien las pierde.
      </p>

      <div className="table-container">
        <table className="reporte-table gestion-table">
          <thead>
            <tr>
              <th>Rol</th>
              <th>Código alumno</th>
              <th>Usuario</th>
              <th>Contraseña</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => {
              const mostrar = visibles[u.usuario];
              return (
                <tr key={u.usuario}>
                  <td>
                    <span
                      className={`status ${
                        u.rol === "admin" ? "status-active" : "status-inactive"
                      }`}
                    >
                      {u.rol === "admin" ? "Administrador" : "Alumno"}
                    </span>
                  </td>
                  <td>{u.codigoAlumno ?? "—"}</td>
                  <td>
                    <input
                      type="text"
                      value={valorUsuario(u.usuario, u.usuario)}
                      onChange={(e) =>
                        setCampo(u.usuario, "usuario", e.target.value, u.usuario, u.password)
                      }
                    />
                  </td>
                  <td>
                    <div className="password-cell">
                      <input
                        type={mostrar ? "text" : "password"}
                        value={valorPassword(u.usuario, u.password)}
                        onChange={(e) =>
                          setCampo(
                            u.usuario,
                            "password",
                            e.target.value,
                            u.usuario,
                            u.password
                          )
                        }
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setVisibles((prev) => ({ ...prev, [u.usuario]: !prev[u.usuario] }))
                        }
                        aria-label={mostrar ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {mostrar ? "🙈" : "👁"}
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="button-primary"
                      onClick={() => guardar(u.usuario, u.usuario, u.password)}
                    >
                      Guardar
                    </button>
                    {mensajes[u.usuario] && (
                      <div className="credencial-mensaje">{mensajes[u.usuario]}</div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportesPage() {
  const { alumnos, usuario, logout, isLoggedIn, rol, codigoAlumno } = useApp();

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

  const encabezados = [
    "Código",
    "Nombre completo",
    "Grado",
    "Sección",
    "Encargado",
    "Teléfono",
    "Cursos",
    "Promedio",
    "Estado",
  ];

  const filasReporte = () =>
    alumnosFiltrados.map((alumno) => [
      alumno.codigo,
      `${alumno.nombre} ${alumno.apellido}`,
      gradoLabel[alumno.grado] ?? "",
      alumno.seccion || "",
      alumno.encargado || "",
      alumno.telefono || "",
      alumno.materias.map((m) => m.curso).join(", "),
      calcularPromedio(alumno),
      alumno.estado,
    ]);

  const descargarArchivo = (contenido: string, nombre: string, tipo: string) => {
    const blob = new Blob([contenido], { type: tipo });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombre;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  };

  const exportarExcel = () => {
    const filas = filasReporte();
    const escapar = (valor: string) =>
      String(valor).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const encabezadoHtml = encabezados
      .map((h) => `<th style="background:#1f2a6b;color:#fff;padding:6px;">${escapar(h)}</th>`)
      .join("");

    const cuerpoHtml = filas
      .map(
        (fila) =>
          `<tr>${fila
            .map((celda) => `<td style="padding:6px;border:1px solid #ccc;">${escapar(celda)}</td>`)
            .join("")}</tr>`
      )
      .join("");

    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8" /></head>
      <body>
        <table border="1">
          <thead><tr>${encabezadoHtml}</tr></thead>
          <tbody>${cuerpoHtml}</tbody>
        </table>
      </body></html>`;

    descargarArchivo(
      "\uFEFF" + html,
      "reporte-alumnos.xls",
      "application/vnd.ms-excel;charset=utf-8"
    );
  };

  const exportarPDF = () => {
    const filas = filasReporte();
    const escapar = (valor: string) =>
      String(valor).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const fecha = new Date().toLocaleDateString("es-GT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const encabezadoHtml = encabezados.map((h) => `<th>${escapar(h)}</th>`).join("");
    const cuerpoHtml =
      filas.length > 0
        ? filas
            .map(
              (fila) =>
                `<tr>${fila.map((celda) => `<td>${escapar(celda)}</td>`).join("")}</tr>`
            )
            .join("")
        : `<tr><td colspan="${encabezados.length}" style="text-align:center;">Sin alumnos que coincidan con los filtros.</td></tr>`;

    const html = `<!DOCTYPE html><html lang="es"><head>
      <meta charset="utf-8" />
      <title>Reporte de alumnos inscritos</title>
      <style>
        * { font-family: Arial, Helvetica, sans-serif; }
        body { padding: 24px; color: #1f2937; }
        h1 { color: #1f2a6b; font-size: 20px; margin: 0 0 4px; }
        .fecha { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
        table { width: 100%; border-collapse: collapse; font-size: 11px; }
        th { background: #1f2a6b; color: #fff; padding: 7px 6px; text-align: left; }
        td { padding: 6px; border-bottom: 1px solid #e6e8f0; }
        tr:nth-child(even) td { background: #f4f6fb; }
        @media print { .aviso { display: none; } }
        .aviso { margin-top: 18px; font-size: 12px; color: #6b7280; }
      </style>
    </head><body>
      <h1>Reporte de alumnos inscritos</h1>
      <div class="fecha">Escuela de Brasil · Generado el ${escapar(fecha)}</div>
      <table>
        <thead><tr>${encabezadoHtml}</tr></thead>
        <tbody>${cuerpoHtml}</tbody>
      </table>
      <p class="aviso">Usa el diálogo de impresión y elige "Guardar como PDF" para descargar el reporte.</p>
      <script>window.onload = function(){ window.print(); };</script>
    </body></html>`;

   
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const ventana = window.open(url, "_blank");
    if (!ventana) {
      URL.revokeObjectURL(url);
      return;
    }

    ventana.addEventListener(
      "load",
      () => {
        URL.revokeObjectURL(url);
      },
      { once: true }
    );
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

  if (rol === "alumno" && codigoAlumno) {
    return (
      <section className="reportes-page">
        <ReportesBackground />
        <VistaAlumno codigoAlumno={codigoAlumno} />
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


     {/*  Practica en prueba vibe coding */}
      <Cards
      total = {alumnosFiltrados.length}
      activos = {totalActivos}
      inactivos = { totalInactivos}
      />
    
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
          <button type="button" className="button-primary" onClick={exportarPDF}>
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
            <button type="button" className="export-button" onClick={exportarPDF}>
              📄 Exportar PDF
            </button>
            <button type="button" className="export-button" onClick={exportarExcel}>
              📊 Exportar Excel
            </button>
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
                <th>Promedio</th>
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
                      {alumno.materias.length > 0
                        ? alumno.materias.map((m) => m.curso).join(", ")
                        : "—"}
                    </td>
                    <td>{calcularPromedio(alumno)}</td>
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
                  <td colSpan={9} className="report-empty">
                    No hay alumnos que coincidan con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <GestionMaterias />
      <GestionUsuarios />
      </div>
    </section>
  );
}

export default ReportesPage;
