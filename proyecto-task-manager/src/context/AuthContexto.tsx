import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';

interface AuthContextoTipo {
  usuario: User | null;
  cargando: boolean;
  error: string | null;
  registrar: (correo: string, contrasena: string) => Promise<void>;
  iniciarSesion: (correo: string, contrasena: string) => Promise<void>;
  cerrarSesion: () => Promise<void>;
}

const AuthContexto = createContext<AuthContextoTipo | undefined>(undefined);

export const AuthProveedor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const { registrar, iniciarSesion, cerrarSesion, cargando, error } = useAuth();

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
      setCargandoUsuario(false);
    });
    return cancelarSuscripcion;
  }, []);

  return (
    <AuthContexto.Provider
      value={{
        usuario,
        cargando: cargando || cargandoUsuario,
        error,
        registrar,
        iniciarSesion,
        cerrarSesion
      }}
    >
      {children}
    </AuthContexto.Provider>
  );
};

export const useAuthContexto = (): AuthContextoTipo => {
  const contexto = useContext(AuthContexto);
  if (!contexto) {
    throw new Error('useAuthContexto debe usarse dentro de AuthProveedor');
  }
  return contexto;
};