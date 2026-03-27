import { useState, useEffect } from 'react';
import { rtdb, ref, push, set, remove, onValue } from '../firebase/config';
import { get } from 'firebase/database';

const useRealTimeCollection = (table) => {
  const [results, setResults] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const dbRef = ref(rtdb, table);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([id, value]) => ({
            id,
            ...value,
          }));
          setResults(data);
        } else {
          setResults([]);
        }
        setIsPending(false);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, [table]);

  const getAll = async () => {
    setIsPending(true);
    setError(null);

    try {
      const snapshot = await get(ref(rtdb, table));

      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([id, value]) => ({
          id,
          ...value,
        }));
        setResults(data);
      } else {
        setResults([]);
      }
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  const add = async (data) => {
    setIsPending(true);
    setError(null);

    try {
      const newRef = await push(ref(rtdb, table), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      setIsPending(false);
      return newRef;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return null;
    }
  };

  const update = async (id, data) => {
    setIsPending(true);
    setError(null);

    try {
      await set(ref(rtdb, `${table}/${id}`), {
        ...data,
        updatedAt: new Date().toISOString(),
      });
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  const deleteDoc = async (id) => {
    setIsPending(true);
    setError(null);

    try {
      await remove(ref(rtdb, `${table}/${id}`));
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  return { results, isPending, error, getAll, add, update, deleteDoc };
};

export default useRealTimeCollection;
