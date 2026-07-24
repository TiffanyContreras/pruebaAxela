import { useState } from "react";
import type { FormEvent } from "react";
import { useApp, gradoLabel } from "../context/AppContext";
import type { Alumno } from "../context/AppContext";
import "./AlumnosPage.css";

function ConsultarAlumnoPage() {
  const { alumnos } = useApp();
  const [codigoConsulta, setCodigoConsulta] = useState("");
  const [alumnoConsultado, setAlumnoConsultado] = useState<Alumno | null>(null);
  const [errorConsulta, setErrorConsulta] = useState("");

  const consultarAlumno = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const codigo = codigoConsulta.trim().toUpperCase();
    if (!codigo) {
      setAlumnoConsultado(null);
      setErrorConsulta("Ingrese un código para consultar.");
      return;
    }
    const encontrado = alumnos.find((a) => a.codigo.toUpperCase() === codigo);
    if (encontrado) {
      setAlumnoConsultado(encontrado);
      setErrorConsulta("");
    } else {
      setAlumnoConsultado(null);
      setErrorConsulta(`No se encontró ningún alumno con el código "${codigo}".`);
    }
  };

  return (
    <section className="alumnos-page">
      <div className="page-header">
        <h1>Consultar alumno por código</h1>
        <p>Ingresa el código del alumno para ver su información registrada.</p>
      </div>

      <div className="form-card consulta-card">
        <h2>Buscar alumno</h2>
        <p className="consulta-ayuda">
          Ingresa el código del alumno (por ejemplo <strong>A001</strong>) para ver su
          información registrada.
        </p>

        <form className="consulta-form" onSubmit={consultarAlumno}>
          <input
            type="text"
            value={codigoConsulta}
            onChange={(e) => setCodigoConsulta(e.target.value)}
            placeholder="Ej. A001"
            aria-label="Código del alumno"
          />
          <button type="submit" className="button-primary">
            Consultar
          </button>
        </form>

        {errorConsulta && <div className="consulta-error">{errorConsulta}</div>}

        {alumnoConsultado && (
          <div className="consulta-resultado">
            <div className="consulta-encabezado">
              <span className="consulta-codigo">{alumnoConsultado.codigo}</span>
              <h3>
                {alumnoConsultado.nombre} {alumnoConsultado.apellido}
              </h3>
              <span
                className={`consulta-estado consulta-estado--${
                  alumnoConsultado.estado === "Activo" ? "activo" : "inactivo"
                }`}
              >
                {alumnoConsultado.estado}
              </span>
            </div>

            <div className="consulta-datos">
              <div>
                <span className="dato-label">Grado</span>
                <span className="dato-valor">
                  {gradoLabel[alumnoConsultado.grado] ?? alumnoConsultado.grado}
                </span>
              </div>
              <div>
                <span className="dato-label">Sección</span>
                <span className="dato-valor">{alumnoConsultado.seccion || "—"}</span>
              </div>
              <div>
                <span className="dato-label">Fecha de nacimiento</span>
                <span className="dato-valor">
                  {alumnoConsultado.fechaNacimiento || "—"}
                </span>
              </div>
              <div>
                <span className="dato-label">Encargado</span>
                <span className="dato-valor">{alumnoConsultado.encargado || "—"}</span>
              </div>
              <div>
                <span className="dato-label">Teléfono</span>
                <span className="dato-valor">{alumnoConsultado.telefono || "—"}</span>
              </div>
              <div>
                <span className="dato-label">Dirección</span>
                <span className="dato-valor">{alumnoConsultado.direccion || "—"}</span>
              </div>
            </div>

            <div className="consulta-materias">
              <span className="dato-label">Cursos inscritos</span>
              {alumnoConsultado.materias.length > 0 ? (
                <ul>
                  {alumnoConsultado.materias.map((m, i) => (
                    <li key={i}>
                      <strong>{m.curso}</strong>
                      <span>{m.maestro || "Sin maestro"}</span>
                      <span>{m.horario || "Sin horario"}</span>
                      <span>Nota: {m.nota.trim() ? m.nota : "—"}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="consulta-sin-materias">
                  Este alumno no tiene cursos inscritos.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ConsultarAlumnoPage;
