import "./AlumnosPage.css";


function AlumnosPage() {
  return (
    <section className="alumnos-page">
      <div className="page-header">
        <div>
          <h1>Gestión de Alumnos</h1>
          <p>Registra y consulta la información de los alumnos.</p>
        </div>
      </div>
      <div className="form-card">
        <h2> Agregar alumno</h2>
        <form className="alumno-form">
          <div className="form-group">
            <label htmlFor="codigo">Codigo:</label>
            <input type="text" id="codigo" name="codigo" placeholder="Ingrese el código del alumno"/>
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" placeholder="Ingrese el nombre del alumno"/>
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" placeholder="Ingrese el apellido del alumno"/>
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
            <input type="date" id="fechaNacimiento" name="fechaNacimiento"/>
          </div>

          <div className="form-group">
            <label htmlFor="grado">Grado:</label>
            <select id="grado" name="grado" defaultValue="">
              <option value="" disabled>Seleccione un grado</option>
              <option value="1">Primero Primaria</option>
              <option value="2">Segundo Primaria</option>
              <option value="3">Tercero Primaria</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="seccion">Sección:</label>
            <select id="seccion" name="seccion" defaultValue="">
              <option value="" disabled>Seleccione una sección</option>
              <option value="A">Sección A</option>
              <option value="B">Sección B</option>
              <option value="C">Sección C</option>
            </select>
          </div>

          <div className="form-group"> 
          <label htmlFor="encargado">Encargado:</label>
            <input type="text" id="encargado" name="encargado" placeholder="Ingrese el nombre del encargado"/>
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input type="text" id="telefono" name="telefono" placeholder="Ingrese el teléfono de contacto"/>
          </div>
          <div className="form-group form-group-full">
            <label htmlFor="direccion">Dirección:</label>
            <textarea id="direccion" name="direccion" placeholder="Ingrese la dirección del alumno"></textarea>
          </div>

          <div className="form-actions form-group-full">
            <button type="reset" className="button-primary">
              Limpiar Campos
            </button>
            <button type="submit" className="button-secondary">
              Agregar Alumno
            </button>
          </div>
        </form>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Listado de alumnos</h2>
            <p>Alumnos registrados actualmente.</p>
          </div>
        </div>
        <input 
        className="search-input"
        type="search"
        placeholder="Buscar alumno"/>

        <div className="table-container">
          <table className="alumnos-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre completo</th>
                <th>Grado</th>
                <th>Sección</th>
                <th>Encargado</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>A001</td>
                <td>Ana Sofía López García</td>
                <td>Primero primaria</td>
                <td>A</td>
                <td>María García</td>
                <td>5555-1234</td>
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
                <td>A002</td>
                <td>Carlos Daniel Pérez Ruiz</td>
                <td>Segundo primaria</td>
                <td>B</td>
                <td>José Pérez</td>
                <td>5555-5678</td>
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
                <td>A003</td>
                <td>Andrea Fernanda Morales Díaz</td>
                <td>Tercero primaria</td>
                <td>A</td>
                <td>Laura Díaz</td>
                <td>5555-9012</td>
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

export default AlumnosPage;