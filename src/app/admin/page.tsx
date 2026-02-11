'use client';

import { useState } from 'react';
import AdminDashboard from '@/components/admin/dashboard';
import LoginForm from '@/components/admin/login-form';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      {isAuthenticated ? (
        <AdminDashboard />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
