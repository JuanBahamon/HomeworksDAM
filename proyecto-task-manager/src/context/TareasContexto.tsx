import React, { createContext, useContext } from 'react';
import { Tarea } from '../models/tarea';
import { useTareas } from '../hooks/useTareas';

interface TareasContextoTipo {
  tareas: Tarea[];
  recargarTareas: () => void;
  agregarTarea: (titulo: string) => void;
  completarTarea: (id: number) => void;
  eliminarTarea: (id: number) => void;
  editarTarea: (id: number, nuevoTitulo: string) => void;
}

const TareasContexto = createContext<TareasContextoTipo | undefined>(undefined);

export const TareasProveedor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tareasHook = useTareas();

  return (
    <TareasContexto.Provider value={tareasHook}>
      {children}
    </TareasContexto.Provider>
  );
};

export const useTareasContexto = (): TareasContextoTipo => {
  const contexto = useContext(TareasContexto);
  if (!contexto) {
    throw new Error('useTareasContexto debe usarse dentro de TareasProveedor');
  }
  return contexto;
};