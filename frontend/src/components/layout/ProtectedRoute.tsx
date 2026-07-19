import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AppLayout } from './AppLayout';
import type { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Not authenticated -> send to login, remember where they were headed
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <AppLayout>{children}</AppLayout>;
}