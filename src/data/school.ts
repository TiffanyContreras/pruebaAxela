/**
 * Tipos, constantes y datos iniciales del dominio escolar.
 * Separados del Context para no romper Fast Refresh de React.
 */

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

export type Rol = "admin" | "alumno";

export type UsuarioValido = {
  usuario: string;
  password: string;
  rol: Rol;
  codigoAlumno?: string;
};

export const gradoLabel: Record<string, string> = {
  "1": "Primero primaria",
  "2": "Segundo primaria",
  "3": "Tercero primaria",
};

export const maestros = [
  "Laura García",
  "Carlos Méndez",
  "Andrea López",
  "José Ramírez",
  "María Fernández",
  "Pedro Gómez",
];

export const cursosDisponibles = [
  { codigo: "C001", nombre: "Lengua y alfabetización", maestro: "Laura García", horario: "07:00 - 08:00" },
  { codigo: "C002", nombre: "Matemáticas", maestro: "Carlos Méndez", horario: "08:00 - 09:00" },
  { codigo: "C003", nombre: "Ciencia y exploración", maestro: "Andrea López", horario: "09:00 - 10:00" },
  { codigo: "C004", nombre: "Estudios sociales", maestro: "José Ramírez", horario: "10:00 - 11:00" },
  { codigo: "C005", nombre: "Letras", maestro: "María Fernández", horario: "11:00 - 12:00" },
  { codigo: "C006", nombre: "Educación física", maestro: "Pedro Gómez", horario: "12:00 - 13:00" },
];

export const usuariosValidos: UsuarioValido[] = [
  { usuario: "admin", password: "123456", rol: "admin" },
  { usuario: "maestro", password: "clase2025", rol: "admin" },
  { usuario: "director", password: "colegio123", rol: "admin" },
  { usuario: "ana.lopez", password: "ana2025", rol: "alumno", codigoAlumno: "A001" },
  { usuario: "carlos.perez", password: "carlos2025", rol: "alumno", codigoAlumno: "A002" },
  { usuario: "andrea.morales", password: "andrea2025", rol: "alumno", codigoAlumno: "A003" },
];

export const materiaPorNombre = (nombre: string): MateriaInscrita => {
  const curso = cursosDisponibles.find((c) => c.nombre === nombre);
  return {
    curso: nombre,
    maestro: curso?.maestro ?? "",
    horario: curso?.horario ?? "",
    nota: "",
  };
};

export const alumnosIniciales: Alumno[] = [
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
