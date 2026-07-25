/**
 * Configuración central de la API.
 * variables de entorno de Vite (prefijo VITE_).
 */

export const apiConfig = {
  /** URL base del backend. Ejemplo: https://api.escueladebrasil.com */
  baseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") || "",

  /** Tiempo máximo de espera por petición (ms) */
  timeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS) || 15000,

  /**  true, los servicios pueden usar respuestas mock locales */
  useMock: String(import.meta.env.VITE_API_USE_MOCK ?? "true") === "true",

  prefix: "/api",
} as const;

export function getApiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${apiConfig.baseUrl}${apiConfig.prefix}${normalized}`;
}
