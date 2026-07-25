import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError } from "../api";

export type UseApiState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  /** Vuelve a ejecutar la petición */
  refetch: () => void;
};

type UseApiOptions = {
  /** Si es false, no se ejecuta al montar (útil para búsquedas manuales) */
  immediate?: boolean;
  /** Dependencias que disparan una nueva petición */
  deps?: readonly unknown[];
};

/**
 * Hook genérico para consumir cualquier función async de un servicio API.
 *
 * Ejemplo:
 *   const { data, loading, error, refetch } = useApi(
 *     () => alumnosService.listar(),
 *     { deps: [] }
 *   );
 */
export function useApi<T>(
  request: () => Promise<T>,
  options: UseApiOptions = {}
): UseApiState<T> {
  const { immediate = true, deps = [] } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [tick, setTick] = useState(0);
  const requestRef = useRef(request);

  useEffect(() => {
    requestRef.current = request;
  }, [request]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setTick((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!immediate && tick === 0) {
      return;
    }

    let cancelled = false;

    requestRef.current()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setError(null);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message =
          err instanceof ApiError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Ocurrió un error inesperado.";
        setError(message);
        setData(null);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // Solo se vuelve a pedir cuando cambian deps o se llama refetch (tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, tick, ...deps]);

  return { data, error, loading, refetch };
}
