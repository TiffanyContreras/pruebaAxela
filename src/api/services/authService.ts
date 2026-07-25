import { apiConfig } from "../config";
import { httpClient, setAuthToken } from "../httpClient";
import type { LoginRequest, LoginResponse } from "../types";

/**
 * Servicio de autenticación.
 * login, logout y registro de administradores vía API.
 */
export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    if (apiConfig.useMock || !apiConfig.baseUrl) {
    
      throw new Error(
        "authService.login en modo mock: usa el login del AppContext hasta conectar el backend."
      );
    }

    const data = await httpClient<LoginResponse>("/auth/login", {
      method: "POST",
      body: payload,
      token: null,
    });

    setAuthToken(data.token);
    return data;
  },

  async registrarAdmin(payload: LoginRequest): Promise<LoginResponse> {
    if (apiConfig.useMock || !apiConfig.baseUrl) {
      throw new Error(
        "authService.registrarAdmin en modo mock: usa registrarUsuario del AppContext."
      );
    }

    const data = await httpClient<LoginResponse>("/auth/register", {
      method: "POST",
      body: payload,
      token: null,
    });

    setAuthToken(data.token);
    return data;
  },

  logout(): void {
    setAuthToken(null);
  },
};
