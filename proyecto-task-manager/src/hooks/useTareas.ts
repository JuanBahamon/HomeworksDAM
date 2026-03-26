import { useState } from 'react';
import { Tarea } from '../models/tarea';

const CLAVE_STORAGE = 'tareas';

export const leerTareas = (): Tarea[] => {
  try {
    const datos = localStorage.getItem(CLAVE_STORAGE);
    return datos ? JSON.parse(datos) : [];
  } catch {
    return [];
  }
};

const escribirTareas = (tareas: Tarea[]) => {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(tareas));
};

export const useTareas = () => {
  const [tareas, setTareas] = useState<Tarea[]>(leerTareas);

  const recargarTareas = () => {
    setTareas(leerTareas());
  };

  const agregarTarea = (titulo: string) => {
    const tareasActuales = leerTareas();
    const nueva: Tarea = { id: Date.now(), titulo, completada: false };
    const nuevaLista = [...tareasActuales, nueva];
    escribirTareas(nuevaLista);
    setTareas(nuevaLista);
  };

  const completarTarea = (id: number) => {
    const tareasActuales = leerTareas();
    const nuevaLista = tareasActuales.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    escribirTareas(nuevaLista);
    setTareas(nuevaLista);
  };

  const eliminarTarea = (id: number) => {
    const tareasActuales = leerTareas();
    const nuevaLista = tareasActuales.filter((t) => t.id !== id);
    escribirTareas(nuevaLista);
    setTareas(nuevaLista);
  };

  const editarTarea = (id: number, nuevoTitulo: string) => {
    const tareasActuales = leerTareas();
    const nuevaLista = tareasActuales.map((t) =>
      t.id === id ? { ...t, titulo: nuevoTitulo } : t
    );
    escribirTareas(nuevaLista);
    setTareas(nuevaLista);
  };

  return { tareas, recargarTareas, agregarTarea, completarTarea, eliminarTarea, editarTarea };
};