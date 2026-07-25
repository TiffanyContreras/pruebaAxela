import { useCallback, useState } from "react";
import { alumnosService, ApiError } from "../api";
import type { NuevoAlumnoPayload } from "../api";
import type { Alumno } from "../data/school";
import { useApi } from "./useApi";

/**
 * Hook específico del dominio de alumnos.
 * Encapsula listado, consulta por código y estados de carga/error.
 */
export function useAlumnosApi(options: { cargarAlMontar?: boolean } = {}) {
  const { cargarAlMontar = false } = options;

  const listado = useApi(() => alumnosService.listar(), {
    immediate: cargarAlMontar,
    deps: [],
  });

  const [consulta, setConsulta] = useState<Alumno | null>(null);
  const [consultando, setConsultando] = useState(false);
  const [errorConsulta, setErrorConsulta] = useState<string | null>(null);

  const buscarPorCodigo = useCallback(async (codigo: string) => {
    const limpio = codigo.trim();
    if (!limpio) {
      setConsulta(null);
      setErrorConsulta("Ingrese un código para consultar.");
      return null;
    }

    setConsultando(true);
    setErrorConsulta(null);
    try {
      const alumno = await alumnosService.obtenerPorCodigo(limpio);
      setConsulta(alumno);
      if (!alumno) {
        setErrorConsulta(`No se encontró ningún alumno con el código "${limpio}".`);
      }
      return alumno;
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "No se pudo consultar el alumno.";
      setErrorConsulta(message);
      setConsulta(null);
      return null;
    } finally {
      setConsultando(false);
    }
  }, []);

  const crear = useCallback(async (payload: NuevoAlumnoPayload) => {
    return alumnosService.crear(payload);
  }, []);

  const actualizar = useCallback(async (codigo: string, payload: NuevoAlumnoPayload) => {
    return alumnosService.actualizar(codigo, payload);
  }, []);

  return {
    ...listado,
    consulta,
    consultando,
    errorConsulta,
    buscarPorCodigo,
    crear,
    actualizar,
  };
}
