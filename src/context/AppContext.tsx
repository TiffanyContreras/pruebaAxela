import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Alumno = {
  codigo: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  grado: string;
  seccion: string;
  encargado: string;
  telefono: string;
  direccion: string;
  cursos: string[];
  estado: "Activo" | "Inactivo";
};

export const gradoLabel: Record<string, string> = {
  "1": "Primero primaria",
  "2": "Segundo primaria",
  "3": "Tercero primaria",
};

/* Cursos disponibles en la plataforma (mismos de la página de Cursos) */
export const cursosDisponibles = [
  { codigo: "C001", nombre: "Lengua y alfabetización" },
  { codigo: "C002", nombre: "Matemáticas" },
  { codigo: "C003", nombre: "Ciencia y exploración" },
  { codigo: "C004", nombre: "Estudios sociales" },
  { codigo: "C005", nombre: "Letras" },
  { codigo: "C006", nombre: "Educación física" },
];

const alumnosIniciales: Alumno[] = [
  {
    codigo: "A001",
    nombre: "Ana Sofía",
    apellido: "López García",
    fechaNacimiento: "2016-03-12",
    grado: "1",
    seccion: "A",
    encargado: "María García",
    telefono: "5555-1234",
    direccion: "Zona 1",
    cursos: ["Lengua y alfabetización", "Matemáticas"],
    estado: "Activo",
  },
  {
    codigo: "A002",
    nombre: "Carlos Daniel",
    apellido: "Pérez Ruiz",
    fechaNacimiento: "2015-07-22",
    grado: "2",
    seccion: "B",
    encargado: "José Pérez",
    telefono: "5555-5678",
    direccion: "Zona 5",
    cursos: ["Matemáticas", "Ciencia y exploración"],
    estado: "Activo",
  },
  {
    codigo: "A003",
    nombre: "Andrea Fernanda",
    apellido: "Morales Díaz",
    fechaNacimiento: "2014-11-02",
    grado: "3",
    seccion: "A",
    encargado: "Laura Díaz",
    telefono: "5555-9012",
    direccion: "Zona 10",
    cursos: ["Estudios sociales"],
    estado: "Inactivo",
  },
];

type AppContextValue = {
  alumnos: Alumno[];
  agregarAlumno: (alumno: Omit<Alumno, "codigo" | "estado"> & { codigo?: string }) => void;
  eliminarAlumno: (codigo: string) => void;
  isLoggedIn: boolean;
  usuario: string | null;
  login: (usuario: string, password: string) => boolean;
  logout: () => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [alumnos, setAlumnos] = useState<Alumno[]>(alumnosIniciales);
  const [usuario, setUsuario] = useState<string | null>(null);

  const value = useMemo<AppContextValue>(() => {
    const agregarAlumno: AppContextValue["agregarAlumno"] = (datos) => {
      setAlumnos((prev) => {
        const codigo =
          datos.codigo?.trim() || `A${String(prev.length + 1).padStart(3, "0")}`;
        const nuevo: Alumno = { ...datos, codigo, estado: "Activo" };
        return [...prev, nuevo];
      });
    };

    const eliminarAlumno = (codigo: string) => {
      setAlumnos((prev) => prev.filter((alumno) => alumno.codigo !== codigo));
    };

    const login = (nombreUsuario: string, password: string) => {
      if (nombreUsuario.trim() && password.trim()) {
        setUsuario(nombreUsuario.trim());
        return true;
      }
      return false;
    };

    const logout = () => setUsuario(null);

    return {
      alumnos,
      agregarAlumno,
      eliminarAlumno,
      isLoggedIn: usuario !== null,
      usuario,
      login,
      logout,
    };
  }, [alumnos, usuario]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe usarse dentro de <AppProvider>");
  }
  return context;
}
