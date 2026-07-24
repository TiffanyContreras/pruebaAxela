import { useState } from "react";
import "./CursosPage.css";
import cursoLengua from "../assets/curso-lengua.png";
import cursoMatematicas from "../assets/curso-matematicas.png";
import cursoCiencia from "../assets/curso-ciencia.png";
import cursoSociales from "../assets/curso-sociales.png";
import cursoLetras from "../assets/curso-letras.png";
import cursoEducacionFisica from "../assets/curso-educacion-fisica.png";

const materias = [
  {
    img: cursoLengua,
    nombre: "Lengua y alfabetización",
    codigo: "C001",
    jornada: "Matutina",
    horario: "07:00 - 08:00",
    descripcion:
      "Actividades diarias que refuerzan las destrezas lingüísticas y preparan a los alumnos para la lectura y la escritura.",
  },
  {
    img: cursoMatematicas,
    nombre: "Matemáticas",
    codigo: "C002",
    jornada: "Matutina",
    horario: "08:00 - 09:00",
    descripcion:
      "Conceptos fundamentales como contar, formas, patrones y resolución de problemas sencillos.",
  },
  {
    img: cursoCiencia,
    nombre: "Ciencia y exploración",
    codigo: "C003",
    jornada: "Matutina",
    horario: "09:00 - 10:00",
    descripcion:
      "Actividades prácticas que introducen conceptos científicos básicos y fomentan la exploración del mundo natural.",
  },
  {
    img: cursoSociales,
    nombre: "Estudios sociales",
    codigo: "C004",
    jornada: "Matutina",
    horario: "10:00 - 11:00",
    descripcion:
      "Aprender sobre las relaciones, los papeles en la comunidad y la comprensión de las culturas.",
  },
  {
    img: cursoLetras,
    nombre: "Letras",
    codigo: "C005",
    jornada: "Matutina",
    horario: "11:00 - 12:00",
    descripcion:
      "La música, las artes visuales, el teatro y el movimiento se integran en el proceso de aprendizaje.",
  },
  {
    img: cursoEducacionFisica,
    nombre: "Educación física",
    codigo: "C006",
    jornada: "Matutina",
    horario: "12:00 - 13:00",
    descripcion:
      "Actividades estructuradas y no estructuradas para promover la salud física y la coordinación.",
  },
];

function CursosPage() {
  const [seleccionado, setSeleccionado] = useState(0);
  const curso = materias[seleccionado];

  return (
    <section className="cursos-page">
      <div className="page-header">
        <div>
          <h1>Gestión de cursos</h1>
          <p>Selecciona un área para ver la información del curso.</p>
        </div>
      </div>

      <div className="materias-section">
        <h2 className="materias-title">Áreas de aprendizaje</h2>

        <div className="materias-grid">
          {materias.map((materia, index) => (
            <button
              type="button"
              className={`materia-card${index === seleccionado ? " is-selected" : ""}`}
              key={materia.nombre}
              onClick={() => setSeleccionado(index)}
              aria-pressed={index === seleccionado}
            >
              <img src={materia.img} alt={materia.nombre} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <div className="curso-detalle">
        <div className="curso-detalle-header">
          <h2>{curso.nombre}</h2>
          <span className="curso-detalle-codigo">{curso.codigo}</span>
        </div>

        <p className="curso-detalle-desc">{curso.descripcion}</p>

        <div className="curso-detalle-info">
          <div className="detalle-item">
            <span className="detalle-label">Código</span>
            <span className="detalle-valor">{curso.codigo}</span>
          </div>
          <div className="detalle-item">
            <span className="detalle-label">Jornada</span>
            <span className="detalle-valor">{curso.jornada}</span>
          </div>
          <div className="detalle-item">
            <span className="detalle-label">Horario</span>
            <span className="detalle-valor">{curso.horario}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CursosPage;
