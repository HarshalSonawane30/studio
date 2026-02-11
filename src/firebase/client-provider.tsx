'use client';
import { ReactNode, useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from '.';

// This provider ensures that Firebase is initialized only on the client side and provides it to the app.
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const firebaseInstances = useMemo(initializeFirebase, []);
  
  return <FirebaseProvider value={firebaseInstances}>{children}</FirebaseProvider>;
}
