import "./CursosPage.css";

function CursosPage() {
  return (
    <section className="cursos-page">
      <div className="page-header">
        <div>
          <h1>Gestión de cursos</h1>
          <p>Registra y consulta los cursos disponibles del colegio.</p>
        </div>
      </div>

      <div className="form-card">
        <h2>Agregar curso</h2>

        <form className="curso-form">
          <div className="form-group">
            <label htmlFor="codigoCurso">Código</label>
            <input
              id="codigoCurso"
              type="text"
              placeholder="Ejemplo: C001"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombreCurso">Nombre del curso</label>
            <input
              id="nombreCurso"
              type="text"
              placeholder="Ejemplo: Matemática"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gradoCurso">Grado</label>
            <select id="gradoCurso" defaultValue="">
              <option value="" disabled>
                Seleccione un grado
              </option>
              <option value="primero">Primero primaria</option>
              <option value="segundo">Segundo primaria</option>
              <option value="tercero">Tercero primaria</option>
              <option value="cuarto">Cuarto primaria</option>
              <option value="quinto">Quinto primaria</option>
              <option value="sexto">Sexto primaria</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="seccionCurso">Sección</label>
            <select id="seccionCurso" defaultValue="">
              <option value="" disabled>
                Seleccione una sección
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="jornada">Jornada</label>
            <select id="jornada" defaultValue="">
              <option value="" disabled>
                Seleccione una jornada
              </option>
              <option value="matutina">Matutina</option>
              <option value="vespertina">Vespertina</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="maestro">Maestro asignado</label>
            <select id="maestro" defaultValue="">
              <option value="" disabled>
                Seleccione un maestro
              </option>
              <option value="laura">Laura García</option>
              <option value="carlos">Carlos Méndez</option>
              <option value="andrea">Andrea López</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="horaInicio">Hora de inicio</label>
            <input id="horaInicio" type="time" />
          </div>

          <div className="form-group">
            <label htmlFor="horaFin">Hora de finalización</label>
            <input id="horaFin" type="time" />
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="descripcionCurso">Descripción</label>
            <textarea
              id="descripcionCurso"
              rows={3}
              placeholder="Ingrese una descripción del curso"
            />
          </div>

          <div className="form-actions form-group-full">
            <button type="reset" className="button-secondary">
              Limpiar
            </button>

            <button type="button" className="button-primary">
              Agregar curso
            </button>
          </div>
        </form>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Listado de cursos</h2>
            <p>Cursos registrados actualmente.</p>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Buscar curso..."
          />
        </div>

        <div className="table-container">
          <table className="cursos-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Curso</th>
                <th>Grado</th>
                <th>Sección</th>
                <th>Jornada</th>
                <th>Maestro</th>
                <th>Horario</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>C001</td>
                <td>Matemática</td>
                <td>Primero primaria</td>
                <td>A</td>
                <td>Matutina</td>
                <td>Laura García</td>
                <td>07:00 - 08:00</td>
                <td>
                  <span className="status status-active">Activo</span>
                </td>
                <td>
                  <div className="table-actions">
                    <button type="button" className="edit-button">
                      Editar
                    </button>
                    <button type="button" className="delete-button">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>C002</td>
                <td>Comunicación y Lenguaje</td>
                <td>Segundo primaria</td>
                <td>B</td>
                <td>Matutina</td>
                <td>Carlos Méndez</td>
                <td>08:00 - 09:00</td>
                <td>
                  <span className="status status-active">Activo</span>
                </td>
                <td>
                  <div className="table-actions">
                    <button type="button" className="edit-button">
                      Editar
                    </button>
                    <button type="button" className="delete-button">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>C003</td>
                <td>Ciencias Naturales</td>
                <td>Tercero primaria</td>
                <td>A</td>
                <td>Vespertina</td>
                <td>Andrea López</td>
                <td>13:00 - 14:00</td>
                <td>
                  <span className="status status-inactive">Inactivo</span>
                </td>
                <td>
                  <div className="table-actions">
                    <button type="button" className="edit-button">
                      Editar
                    </button>
                    <button type="button" className="delete-button">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default CursosPage;