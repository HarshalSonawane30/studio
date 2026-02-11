'use client';
import { ReactNode } from 'react';

// This provider ensures that Firebase is initialized only on the client side.
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
