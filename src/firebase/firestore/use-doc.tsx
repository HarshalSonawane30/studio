'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, DocumentData, FirestoreError } from 'firebase/firestore';
import { useFirestore } from '../provider';

export function useDoc<T>(path: string | undefined) {
  const db = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!db || !path) {
      setLoading(false);
      setData(null);
      return;
    }

    setLoading(true);
    const docRef = doc(db, path);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setData({ ...(docSnap.data() as T), id: docSnap.id });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, path]);

  return { data, loading, error };
}
