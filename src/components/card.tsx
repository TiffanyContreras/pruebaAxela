
/* Practica en prueba vibe coding */
type ReportStatsProps = {
    total: number;
    activos: number;
    inactivos: number;
}

export function Cards({total,activos, inactivos}: ReportStatsProps){
 return(
   <div className="report-stats">
        <div className="stat-card">
          <span className="stat-icon stat-icon-total">👥</span>
          <div>
            <span className="stat-value">{total}</span>
            <span className="stat-label">Alumnos en el reporte</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon stat-icon-active">✅</span>
          <div>
            <span className="stat-value">{activos}</span>
            <span className="stat-label">Activos</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon stat-icon-inactive">⛔</span>
          <div>
            <span className="stat-value">{inactivos}</span>
            <span className="stat-label">Inactivos</span>
          </div>
        </div>
      </div>


 );


}