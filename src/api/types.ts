/**
 *Interfaz para respuestas y errores de la API.
 */

export type ApiErrorCode =
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "SERVER_ERROR"
  | "UNKNOWN";

export class ApiError extends Error {
  code: ApiErrorCode;
  status: number;
  details?: unknown;

  constructor(
    message: string,
    code: ApiErrorCode = "UNKNOWN",
    status = 0,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/** Respuesta estándar envolvente*/
export type ApiResponse<T> = {
  data: T;
  message?: string;
  success?: boolean;
};

/** Petición de login */
export type LoginRequest = {
  usuario: string;
  password: string;
};

/** Respuesta de login*/
export type LoginResponse = {
  token: string;
  usuario: string;
  rol: "admin" | "alumno";
  codigoAlumno?: string;
};

/** Filtros reportería */
export type ReporteFiltros = {
  grado?: string;
  seccion?: string;
  estado?: string;
};
