import { cursosDisponibles } from "../../data/school";
import { apiConfig } from "../config";
import { httpClient } from "../httpClient";
import type { ApiResponse } from "../types";

export type CursoApi = {
  codigo: string;
  nombre: string;
  maestro: string;
  horario: string;
};

export const cursosService = {
  async listar(): Promise<CursoApi[]> {
    if (apiConfig.useMock || !apiConfig.baseUrl) {
      return cursosDisponibles;
    }

    const response = await httpClient<ApiResponse<CursoApi[]> | CursoApi[]>("/cursos");
    return Array.isArray(response) ? response : response.data;
  },
};
