import type { Alumno } from "../../data/school";
import { apiConfig } from "../config";
import { httpClient } from "../httpClient";
import type { ApiResponse, ReporteFiltros } from "../types";


export const reportesService = {
  async obtenerAlumnos(filtros: ReporteFiltros = {}): Promise<Alumno[]> {
    if (apiConfig.useMock || !apiConfig.baseUrl) {
      return [];
    }

    const params = new URLSearchParams();
    if (filtros.grado) params.set("grado", filtros.grado);
    if (filtros.seccion) params.set("seccion", filtros.seccion);
    if (filtros.estado) params.set("estado", filtros.estado);

    const query = params.toString();
    const path = query ? `/reportes/alumnos?${query}` : "/reportes/alumnos";

    const response = await httpClient<ApiResponse<Alumno[]> | Alumno[]>(path);
    return Array.isArray(response) ? response : response.data;
  },
};
