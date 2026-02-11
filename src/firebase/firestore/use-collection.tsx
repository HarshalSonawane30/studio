'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, Query, DocumentData, FirestoreError } from 'firebase/firestore';
import { useFirestore } from '../provider';

export function useCollection<T>(path: string) {
  const db = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!db) return;

    const collectionRef = collection(db, path);
    const unsubscribe = onSnapshot(
      collectionRef as Query<T>,
      (snapshot) => {
        const data: T[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(data);
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
