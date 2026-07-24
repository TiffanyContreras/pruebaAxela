import "./AlumnosPage.css";

function MaestrosPage() {
  return (
    <section className="maestros-page">
      <div className="page-header">
        <div>
          <h1>Gestión de Maestros</h1>
          <p>Registra y administra la información de los maestros del colegio.</p>
        </div>
      </div>

      <div className="form-card">
        <h2>Agregar maestro</h2>

        <form className="alumno-form">
          <div className="form-group">
            <label htmlFor="codigoMaestro">Código</label>
            <input id="codigoMaestro" type="text" placeholder="Ejemplo: M001" />
          </div>

          <div className="form-group">
            <label htmlFor="nombreMaestro">Nombre</label>
            <input id="nombreMaestro" type="text" placeholder="Ingrese el nombre" />
          </div>

          <div className="form-group">
            <label htmlFor="apellidoMaestro">Apellido</label>
            <input id="apellidoMaestro" type="text" placeholder="Ingrese el apellido" />
          </div>

          <div className="form-group">
            <label htmlFor="especialidad">Especialidad</label>
            <select id="especialidad" defaultValue="">
              <option value="" disabled>
                Seleccione una especialidad
              </option>
              <option value="matematica">Matemática</option>
              <option value="lenguaje">Comunicación y Lenguaje</option>
              <option value="ciencias">Ciencias Naturales</option>
              <option value="sociales">Estudios Sociales</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="correoMaestro">Correo electrónico</label>
            <input id="correoMaestro" type="email" placeholder="nombre@colegio.edu" />
          </div>

          <div className="form-group">
            <label htmlFor="telefonoMaestro">Teléfono</label>
            <input id="telefonoMaestro" type="text" placeholder="5555-0000" />
          </div>

          <div className="form-actions form-group-full">
            <button type="reset" className="button-secondary">
              Limpiar
            </button>
            <button type="button" className="button-primary">
              Agregar maestro
            </button>
          </div>
        </form>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Listado de maestros</h2>
            <p>Maestros registrados actualmente.</p>
          </div>

          <input className="search-input" type="search" placeholder="Buscar maestro..." />
        </div>

        <div className="table-container">
          <table className="alumnos-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre completo</th>
                <th>Especialidad</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>M001</td>
                <td>Laura García Méndez</td>
                <td>Matemática</td>
                <td>laura.garcia@colegio.edu</td>
                <td>5555-1010</td>
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
                <td>M002</td>
                <td>Carlos Méndez Rojas</td>
                <td>Comunicación y Lenguaje</td>
                <td>carlos.mendez@colegio.edu</td>
                <td>5555-2020</td>
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
                <td>M003</td>
                <td>Andrea López Soto</td>
                <td>Ciencias Naturales</td>
                <td>andrea.lopez@colegio.edu</td>
                <td>5555-3030</td>
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

export default MaestrosPage;
