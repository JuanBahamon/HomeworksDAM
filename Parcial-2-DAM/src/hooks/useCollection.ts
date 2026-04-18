import { useState } from "react";
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, QueryConstraint,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (collectionName: string) => {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);

  const getAll = async (filters: [string, any, any][] = []): Promise<Record<string, any>[]> => {
    setLoading(true);
    try {
      const constraints: QueryConstraint[] = filters.map(([field, op, val]) =>
        where(field, op, val)
      );
      const q = query(collection(db, collectionName), ...constraints);
      const snap = await getDocs(q);
      const docs: Record<string, any>[] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setData(docs);
      return docs;
    } finally {
      setLoading(false);
    }
  };

  const add = async (docData: object) => {
    const ref = await addDoc(collection(db, collectionName), docData);
    return ref.id;
  };

  const update = async (id: string, docData: object) => {
    await updateDoc(doc(db, collectionName, id), docData);
  };

  const remove = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  return { data, loading, getAll, add, update, remove };
};