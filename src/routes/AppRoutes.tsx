import {Route, Routes} from "react-router-dom";
import MainLayout from "../components/layaut/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import AlumnosPage from "../pages/AlumnosPage";
import ConsultarAlumnoPage from "../pages/ConsultarAlumnoPage";
import CursosPage from "../pages/CursosPage";
import MaestrosPage from "../pages/MaestrosPAge";
import ReportesPage from "../pages/ReportesPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/alumnos" element={<AlumnosPage />} />
        <Route path="/consultar-alumno" element={<ConsultarAlumnoPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/maestros" element={<MaestrosPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;