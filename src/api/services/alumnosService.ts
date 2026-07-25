import type { Alumno } from "../../data/school";
import { apiConfig } from "../config";
import { httpClient } from "../httpClient";
import type { ApiResponse } from "../types";

export type NuevoAlumnoPayload = Omit<Alumno, "codigo" | "estado"> & {
  codigo?: string;
};

/**
 * Servicio de alumnos.
 * Define el contrato HTTP para listar, consultar, crear y actualizar alumnos.
 */
export const alumnosService = {
  async listar(): Promise<Alumno[]> {
    if (apiConfig.useMock || !apiConfig.baseUrl) {
      return [];
    }

    const response = await httpClient<ApiResponse<Alumno[]> | Alumno[]>("/alumnos");
    return Array.isArray(response) ? response : response.data;
  },

  async obtenerPorCodigo(codigo: string): Promise<Alumno | null> {
    if (apiConfig.useMock || !apiConfig.baseUrl) {
      return null;
    }

    const response = await httpClient<ApiResponse<Alumno> | Alumno>(
      `/alumnos/${encodeURIComponent(codigo)}`
    );
    return (response as ApiResponse<Alumno>).data ?? (response as Alumno);
  },

  async crear(payload: NuevoAlumnoPayload): Promise<Alumno> {
    if (apiConfig.useMock || !apiConfig.baseUrl) {
      throw new Error("alumnosService.crear requiere backend (desactiva mock).");
    }

    const response = await httpClient<ApiResponse<Alumno> | Alumno>("/alumnos", {
      method: "POST",
      body: payload,
    });
    return (response as ApiResponse<Alumno>).data ?? (response as Alumno);
  },

  async actualizar(codigo: string, payload: NuevoAlumnoPayload): Promise<Alumno> {
    if (apiConfig.useMock || !apiConfig.baseUrl) {
      throw new Error("alumnosService.actualizar requiere backend (desactiva mock).");
    }

    const response = await httpClient<ApiResponse<Alumno> | Alumno>(
      `/alumnos/${encodeURIComponent(codigo)}`,
      {
        method: "PUT",
        body: payload,
      }
    );
    return (response as ApiResponse<Alumno>).data ?? (response as Alumno);
  },

  async eliminar(codigo: string): Promise<void> {
    if (apiConfig.useMock || !apiConfig.baseUrl) {
      throw new Error("alumnosService.eliminar requiere backend (desactiva mock).");
    }

    await httpClient<void>(`/alumnos/${encodeURIComponent(codigo)}`, {
      method: "DELETE",
    });
  },
};
