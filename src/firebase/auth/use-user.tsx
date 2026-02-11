'use client';

import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        setUser(authUser);
      });
      return () => unsubscribe();
    }
  }, [auth]);

  return user;
}
