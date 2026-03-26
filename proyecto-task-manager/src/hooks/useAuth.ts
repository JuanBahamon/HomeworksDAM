import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  AuthError
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const useAuth = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registrar = async (correo: string, contrasena: string) => {
    setCargando(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, correo, contrasena);
    } catch (err) {
      const firebaseError = err as AuthError;
      setError(firebaseError.message);
    } finally {
      setCargando(false);
    }
  };

  const iniciarSesion = async (correo: string, contrasena: string) => {
    setCargando(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
    } catch (err) {
      const firebaseError = err as AuthError;
      setError(firebaseError.message);
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = async () => {
    setCargando(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      const firebaseError = err as AuthError;
      setError(firebaseError.message);
    } finally {
      setCargando(false);
    }
  };

  return { registrar, iniciarSesion, cerrarSesion, cargando, error };
};