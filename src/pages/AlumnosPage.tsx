import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useApp, cursosDisponibles } from "../context/AppContext";
import bannerRegistro from "../assets/registrar-alumno.png";
import "./AlumnosPage.css";

const formularioVacio = {
  codigo: "",
  nombre: "",
  apellido: "",
  fechaNacimiento: "",
  grado: "",
  seccion: "",
  encargado: "",
  telefono: "",
  direccion: "",
  cursos: [] as string[],
};

function AlumnosPage() {
  const { agregarAlumno } = useApp();
  const [form, setForm] = useState(formularioVacio);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCurso = (nombre: string) => {
    setForm((prev) => ({
      ...prev,
      cursos: prev.cursos.includes(nombre)
        ? prev.cursos.filter((c) => c !== nombre)
        : [...prev.cursos, nombre],
    }));
  };

  const limpiar = () => {
    setForm(formularioVacio);
    setMensaje("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.nombre.trim() || !form.apellido.trim()) {
      return;
    }

    agregarAlumno(form);
    setForm(formularioVacio);
    setMensaje(`Alumno ${form.nombre} ${form.apellido} registrado correctamente.`);
  };

  return (
    <section className="alumnos-page">
      <div className="registro-banner">
        <img src={bannerRegistro} alt="Alumnos estudiando en el aula" />
        <div className="registro-banner-overlay">
          <h1>Registrar Alumno</h1>
          <p>Completa el formulario para inscribir a un nuevo alumno.</p>
        </div>
      </div>

      <div className="form-card">
        <h2>Datos del alumno</h2>

        {mensaje && <div className="form-success">{mensaje}</div>}

        <form className="alumno-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="codigo">Código:</label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              value={form.codigo}
              onChange={handleChange}
              placeholder="Se genera automáticamente si se deja vacío"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre del alumno"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              placeholder="Ingrese el apellido del alumno"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="grado">Grado:</label>
            <select id="grado" name="grado" value={form.grado} onChange={handleChange}>
              <option value="" disabled>
                Seleccione un grado
              </option>
              <option value="1">Primero Primaria</option>
              <option value="2">Segundo Primaria</option>
              <option value="3">Tercero Primaria</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="seccion">Sección:</label>
            <select id="seccion" name="seccion" value={form.seccion} onChange={handleChange}>
              <option value="" disabled>
                Seleccione una sección
              </option>
              <option value="A">Sección A</option>
              <option value="B">Sección B</option>
              <option value="C">Sección C</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="encargado">Encargado:</label>
            <input
              type="text"
              id="encargado"
              name="encargado"
              value={form.encargado}
              onChange={handleChange}
              placeholder="Ingrese el nombre del encargado"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ingrese el teléfono de contacto"
            />
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="direccion">Dirección:</label>
            <textarea
              id="direccion"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Ingrese la dirección del alumno"
            />
          </div>

          <div className="form-group form-group-full">
            <label>Cursos a inscribir:</label>
            <div className="cursos-checklist">
              {cursosDisponibles.map((curso) => {
                const activo = form.cursos.includes(curso.nombre);
                return (
                  <label
                    key={curso.codigo}
                    className={`curso-check${activo ? " is-active" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={activo}
                      onChange={() => toggleCurso(curso.nombre)}
                    />
                    <span className="curso-check-codigo">{curso.codigo}</span>
                    <span>{curso.nombre}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-actions form-group-full">
            <button type="button" className="button-secondary" onClick={limpiar}>
              Limpiar Campos
            </button>
            <button type="submit" className="button-primary">
              Registrar Alumno
            </button>
          </div>
        </form>
      </div>

      <p className="alumnos-note">
        El listado de alumnos y sus reportes están disponibles al iniciar sesión, en la
        sección <strong>“Generar reporte de alumnos inscritos”</strong>.
      </p>
    </section>
  );
}

export default AlumnosPage;
