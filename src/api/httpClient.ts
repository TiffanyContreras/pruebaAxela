import { apiConfig, getApiUrl } from "./config";
import { ApiError } from "./types";
import type { ApiErrorCode } from "./types";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  /** Si se omite, se toma el token guardado en sessionStorage */
  token?: string | null;
  signal?: AbortSignal;
};

const TOKEN_KEY = "escuelaBrasil.apiToken";

export function getAuthToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string | null): void {
  try {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    /* storage no disponible */
  }
}

function mapStatusToCode(status: number): ApiErrorCode {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 422 || status === 400) return "VALIDATION";
  if (status >= 500) return "SERVER_ERROR";
  return "UNKNOWN";
}

/**
 * Cliente HTTP centralizado basado en fetch.
 * Todas las llamadas a la API deben pasar por aquí.
 */
export async function httpClient<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, token, signal } = options;
  const url = getApiUrl(path);
  const authToken = token === undefined ? getAuthToken() : token;

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), apiConfig.timeoutMs);

  const onAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener("abort", onAbort);
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await response.json().catch(() => null) : await response.text();

    if (!response.ok) {
      const message =
        (payload && typeof payload === "object" && "message" in payload
          ? String((payload as { message: unknown }).message)
          : null) ||
        `Error HTTP ${response.status}`;

      throw new ApiError(message, mapStatusToCode(response.status), response.status, payload);
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("La petición excedió el tiempo de espera.", "TIMEOUT");
    }

    throw new ApiError(
      "No se pudo conectar con el servidor. Revisa tu conexión o la URL de la API.",
      "NETWORK_ERROR",
      0,
      error
    );
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener("abort", onAbort);
    }
  }
}
