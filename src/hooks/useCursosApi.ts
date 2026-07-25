import { cursosService } from "../api";
import { useApi } from "./useApi";

/**
 * Ejemplo concreto de consumo de API en el dominio de cursos.
 * En modo mock devuelve los cursos locales; con backend llama a /api/cursos.
 */
export function useCursosApi() {
  return useApi(() => cursosService.listar(), { immediate: true, deps: [] });
}
