import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_ALUMNOS = "escuelaBrasil.alumnos";
const STORAGE_USUARIOS = "escuelaBrasil.usuarios";

function cargarDesdeStorage<T>(clave: string, porDefecto: T): T {
  if (typeof window === "undefined") return porDefecto;
  try {
    const raw = window.localStorage.getItem(clave);
    if (raw) {
      return JSON.parse(raw) as T;
    }
  } catch {
    /* datos corruptos: usamos los valores por defecto */
  }
  return porDefecto;
}

export type MateriaInscrita = {
  curso: string;
  maestro: string;
  horario: string;
  nota: string;
};

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
  materias: MateriaInscrita[];
  estado: "Activo" | "Inactivo";
};

export const gradoLabel: Record<string, string> = {
  "1": "Primero primaria",
  "2": "Segundo primaria",
  "3": "Tercero primaria",
};

/* Maestros disponibles en la plataforma */
export const maestros = [
  "Laura García",
  "Carlos Méndez",
  "Andrea López",
  "José Ramírez",
  "María Fernández",
  "Pedro Gómez",
];

/* Cursos disponibles en la plataforma (mismos de la página de Cursos),
   con su maestro y horario por defecto. */
export const cursosDisponibles = [
  { codigo: "C001", nombre: "Lengua y alfabetización", maestro: "Laura García", horario: "07:00 - 08:00" },
  { codigo: "C002", nombre: "Matemáticas", maestro: "Carlos Méndez", horario: "08:00 - 09:00" },
  { codigo: "C003", nombre: "Ciencia y exploración", maestro: "Andrea López", horario: "09:00 - 10:00" },
  { codigo: "C004", nombre: "Estudios sociales", maestro: "José Ramírez", horario: "10:00 - 11:00" },
  { codigo: "C005", nombre: "Letras", maestro: "María Fernández", horario: "11:00 - 12:00" },
  { codigo: "C006", nombre: "Educación física", maestro: "Pedro Gómez", horario: "12:00 - 13:00" },
];

export type Rol = "admin" | "alumno";

export type UsuarioValido = {
  usuario: string;
  password: string;
  rol: Rol;
  codigoAlumno?: string;
};

/* Usuarios y contraseñas quemados en el código para iniciar sesión */
export const usuariosValidos: UsuarioValido[] = [
  { usuario: "admin", password: "123456", rol: "admin" },
  { usuario: "maestro", password: "clase2025", rol: "admin" },
  { usuario: "director", password: "colegio123", rol: "admin" },
  { usuario: "ana.lopez", password: "ana2025", rol: "alumno", codigoAlumno: "A001" },
  { usuario: "carlos.perez", password: "carlos2025", rol: "alumno", codigoAlumno: "A002" },
  { usuario: "andrea.morales", password: "andrea2025", rol: "alumno", codigoAlumno: "A003" },
];

const materiaPorNombre = (nombre: string): MateriaInscrita => {
  const curso = cursosDisponibles.find((c) => c.nombre === nombre);
  return {
    curso: nombre,
    maestro: curso?.maestro ?? "",
    horario: curso?.horario ?? "",
    nota: "",
  };
};

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
    materias: [
      { curso: "Lengua y alfabetización", maestro: "Laura García", horario: "07:00 - 08:00", nota: "85" },
      { curso: "Matemáticas", maestro: "Carlos Méndez", horario: "08:00 - 09:00", nota: "90" },
    ],
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
    materias: [
      { curso: "Matemáticas", maestro: "Carlos Méndez", horario: "08:00 - 09:00", nota: "78" },
      { curso: "Ciencia y exploración", maestro: "Andrea López", horario: "09:00 - 10:00", nota: "" },
    ],
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
    materias: [
      { curso: "Estudios sociales", maestro: "José Ramírez", horario: "10:00 - 11:00", nota: "88" },
    ],
    estado: "Inactivo",
  },
];

type NuevoAlumno = Omit<Alumno, "codigo" | "estado"> & { codigo?: string };

type AppContextValue = {
  alumnos: Alumno[];
  agregarAlumno: (alumno: NuevoAlumno) => Alumno;
  actualizarAlumno: (codigo: string, datos: Omit<Alumno, "codigo" | "estado">) => void;
  generarCuentaAlumno: (alumno: Alumno) => { usuario: string; password: string };
  eliminarAlumno: (codigo: string) => void;
  agregarMateria: (codigoAlumno: string, materia: MateriaInscrita) => void;
  actualizarMateria: (
    codigoAlumno: string,
    index: number,
    cambios: Partial<MateriaInscrita>
  ) => void;
  eliminarMateria: (codigoAlumno: string, index: number) => void;
  materiaPorNombre: (nombre: string) => MateriaInscrita;
  usuarios: UsuarioValido[];
  isLoggedIn: boolean;
  usuario: string | null;
  rol: Rol | null;
  codigoAlumno: string | null;
  login: (usuario: string, password: string) => boolean;
  registrarUsuario: (datos: {
    usuario: string;
    password: string;
    codigoAlumno?: string;
  }) => { ok: boolean; error?: string };
  actualizarCredenciales: (
    usuarioOriginal: string,
    nuevos: { usuario?: string; password?: string }
  ) => { ok: boolean; error?: string };
  logout: () => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [alumnos, setAlumnos] = useState<Alumno[]>(() =>
    cargarDesdeStorage(STORAGE_ALUMNOS, alumnosIniciales)
  );
  const [usuarios, setUsuarios] = useState<UsuarioValido[]>(() =>
    cargarDesdeStorage(STORAGE_USUARIOS, usuariosValidos)
  );
  const [sesion, setSesion] = useState<UsuarioValido | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_ALUMNOS, JSON.stringify(alumnos));
  }, [alumnos]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_USUARIOS, JSON.stringify(usuarios));
  }, [usuarios]);

  const value = useMemo<AppContextValue>(() => {
    const siguienteCodigo = () => {
      const numeros = alumnos
        .map((a) => parseInt(a.codigo.replace(/\D/g, ""), 10))
        .filter((n) => !Number.isNaN(n));
      const max = numeros.length > 0 ? Math.max(...numeros) : 0;
      return `A${String(max + 1).padStart(3, "0")}`;
    };

    const agregarAlumno = (datos: NuevoAlumno): Alumno => {
      const codigo = datos.codigo?.trim() || siguienteCodigo();
      const nuevo: Alumno = { ...datos, codigo, estado: "Activo" };
      setAlumnos((prev) => [...prev, nuevo]);
      return nuevo;
    };

    const actualizarAlumno = (
      codigo: string,
      datos: Omit<Alumno, "codigo" | "estado">
    ) => {
      setAlumnos((prev) =>
        prev.map((alumno) =>
          alumno.codigo === codigo ? { ...alumno, ...datos, codigo } : alumno
        )
      );
    };

    const eliminarAlumno = (codigo: string) => {
      setAlumnos((prev) => prev.filter((alumno) => alumno.codigo !== codigo));
    };

    const agregarMateria = (codigoAlumno: string, materia: MateriaInscrita) => {
      setAlumnos((prev) =>
        prev.map((alumno) =>
          alumno.codigo === codigoAlumno
            ? { ...alumno, materias: [...alumno.materias, materia] }
            : alumno
        )
      );
    };

    const actualizarMateria = (
      codigoAlumno: string,
      index: number,
      cambios: Partial<MateriaInscrita>
    ) => {
      setAlumnos((prev) =>
        prev.map((alumno) =>
          alumno.codigo === codigoAlumno
            ? {
                ...alumno,
                materias: alumno.materias.map((m, i) =>
                  i === index ? { ...m, ...cambios } : m
                ),
              }
            : alumno
        )
      );
    };

    const eliminarMateria = (codigoAlumno: string, index: number) => {
      setAlumnos((prev) =>
        prev.map((alumno) =>
          alumno.codigo === codigoAlumno
            ? { ...alumno, materias: alumno.materias.filter((_, i) => i !== index) }
            : alumno
        )
      );
    };

    const login = (nombreUsuario: string, password: string) => {
      const encontrado = usuarios.find(
        (u) => u.usuario === nombreUsuario.trim() && u.password === password
      );
      if (encontrado) {
        setSesion(encontrado);
        return true;
      }
      return false;
    };

    const registrarUsuario = (datos: {
      usuario: string;
      password: string;
      codigoAlumno?: string;
    }): { ok: boolean; error?: string } => {
      const nombreUsuario = datos.usuario.trim();
      const password = datos.password;

      if (!nombreUsuario || !password) {
        return { ok: false, error: "El usuario y la contraseña son obligatorios." };
      }

      const yaExiste = usuarios.some(
        (u) => u.usuario.toLowerCase() === nombreUsuario.toLowerCase()
      );
      if (yaExiste) {
        return { ok: false, error: "Ya existe un usuario con ese nombre." };
      }

      const codigo = datos.codigoAlumno?.trim().toUpperCase();
      if (codigo) {
        const existeAlumno = alumnos.some((a) => a.codigo.toUpperCase() === codigo);
        if (!existeAlumno) {
          return {
            ok: false,
            error: `No existe ningún alumno con el código "${codigo}".`,
          };
        }
      }

      const nuevo: UsuarioValido = codigo
        ? { usuario: nombreUsuario, password, rol: "alumno", codigoAlumno: codigo }
        : { usuario: nombreUsuario, password, rol: "admin" };

      setUsuarios((prev) => [...prev, nuevo]);
      setSesion(nuevo);
      return { ok: true };
    };

    const generarCuentaAlumno = (alumno: Alumno) => {
      const slug = (texto: string) =>
        texto
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");

      const nombreBase = slug(alumno.nombre.split(" ")[0] ?? "");
      const apellidoBase = slug(alumno.apellido.split(" ")[0] ?? "");
      const base = `${nombreBase}.${apellidoBase}` || slug(alumno.codigo);

      let usuario = base;
      let contador = 1;
      while (usuarios.some((u) => u.usuario.toLowerCase() === usuario.toLowerCase())) {
        usuario = `${base}${contador}`;
        contador += 1;
      }

      const password = Math.random().toString(36).slice(-6);
      const nuevo: UsuarioValido = {
        usuario,
        password,
        rol: "alumno",
        codigoAlumno: alumno.codigo,
      };

      setUsuarios((prev) => [...prev, nuevo]);
      return { usuario, password };
    };

    const actualizarCredenciales = (
      usuarioOriginal: string,
      nuevos: { usuario?: string; password?: string }
    ): { ok: boolean; error?: string } => {
      const original = usuarioOriginal.toLowerCase();
      const nuevoNombre = nuevos.usuario?.trim();

      if (nuevos.usuario !== undefined && !nuevoNombre) {
        return { ok: false, error: "El usuario no puede estar vacío." };
      }
      if (nuevos.password !== undefined && !nuevos.password) {
        return { ok: false, error: "La contraseña no puede estar vacía." };
      }

      if (nuevoNombre) {
        const duplicado = usuarios.some(
          (u) =>
            u.usuario.toLowerCase() === nuevoNombre.toLowerCase() &&
            u.usuario.toLowerCase() !== original
        );
        if (duplicado) {
          return { ok: false, error: "Ya existe un usuario con ese nombre." };
        }
      }

      setUsuarios((prev) =>
        prev.map((u) =>
          u.usuario.toLowerCase() === original
            ? {
                ...u,
                usuario: nuevoNombre || u.usuario,
                password: nuevos.password ?? u.password,
              }
            : u
        )
      );

      setSesion((prev) =>
        prev && prev.usuario.toLowerCase() === original
          ? {
              ...prev,
              usuario: nuevoNombre || prev.usuario,
              password: nuevos.password ?? prev.password,
            }
          : prev
      );

      return { ok: true };
    };

    const logout = () => setSesion(null);

    return {
      alumnos,
      agregarAlumno,
      actualizarAlumno,
      generarCuentaAlumno,
      eliminarAlumno,
      agregarMateria,
      actualizarMateria,
      eliminarMateria,
      materiaPorNombre,
      usuarios,
      isLoggedIn: sesion !== null,
      usuario: sesion?.usuario ?? null,
      rol: sesion?.rol ?? null,
      codigoAlumno: sesion?.codigoAlumno ?? null,
      login,
      registrarUsuario,
      actualizarCredenciales,
      logout,
    };
  }, [alumnos, usuarios, sesion]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe usarse dentro de <AppProvider>");
  }
  return context;
}
