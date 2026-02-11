'use client';

import { useState, useEffect } from 'react';
import { onSnapshot, Query, DocumentData, FirestoreError } from 'firebase/firestore';

export function useCollection<T>(query: Query<DocumentData> | null) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    // Only run if the query is not null
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const unsubscribe = onSnapshot(
      query as Query<T>,
      (snapshot) => {
        const data: T[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(data);
        setLoading(false);
      },
      (err) => {
        console.error("useCollection error: ", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
}
