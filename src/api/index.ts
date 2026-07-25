/**
 * Punto de entrada de la capa API.
 * Importa desde aquí en páginas, hooks o contexto:
 *
 *   import { alumnosService, authService, useApi } from "../api";
 */

export { apiConfig, getApiUrl } from "./config";
export { httpClient, getAuthToken, setAuthToken } from "./httpClient";
export { ApiError } from "./types";
export type {
  ApiErrorCode,
  ApiResponse,
  LoginRequest,
  LoginResponse,
  ReporteFiltros,
} from "./types";

export { authService } from "./services/authService";
export { alumnosService } from "./services/alumnosService";
export type { NuevoAlumnoPayload } from "./services/alumnosService";
export { cursosService } from "./services/cursosService";
export type { CursoApi } from "./services/cursosService";
export { reportesService } from "./services/reportesService";
