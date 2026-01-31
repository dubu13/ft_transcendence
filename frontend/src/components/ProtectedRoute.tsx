import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = React.useContext(AuthContext) as any;
  const {loading, isAuthenticated } = auth ?? {};
  const location = useLocation();

  // If auth is still loading (e.g. on refresh), don't redirect yet — wait for the
  // auth provider to finish hydrating from the server/local storage.
  if (loading) {
    // You can render a spinner or null to keep the current page until auth resolves.
    return null;
  }

  // If not authenticated after loading, redirect to login.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}