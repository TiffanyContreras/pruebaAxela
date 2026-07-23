import "./DashboardPage.css";

function DashboardPage() {
  return (
    <section className="dashboard-hero">
      <div className="dashboard-background-shape dashboard-shape-one" />
      <div className="dashboard-background-shape dashboard-shape-two" />

      <div className="dashboard-content">
        <div className="dashboard-text">
  <h1 className="hero-title">
    <span className="hero-title-white">Un colegio</span>

    <span className="hero-title-purple">
      <span className="underlined-word">por</span>{" "}
      <span className="underlined-word">y</span>{" "}
      <span className="underlined-word">para</span> ellos
    </span>
  </h1>

  <p className="hero-description">
    Gestiona alumnos, maestros, cursos y reportes desde un solo lugar.
  </p>

  <div className="hero-actions">
    <button type="button" className="discover-button">
      <span>Descubre más</span>
      <span className="discover-arrow">→</span>
    </button>

    <button
      type="button"
      className="favorite-button"
      aria-label="Agregar a favoritos"
    >
      ☆
    </button>
  </div>

  <div className="hero-dots" aria-hidden="true">
    <span />
    <span />
    <span />
  </div>
</div>

        <div className="student-area">
          <div className="green-quarter-circle" />

          <div className="student-placeholder">
            <span>IMAGEN DEL NIÑO</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
