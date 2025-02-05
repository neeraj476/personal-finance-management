// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;  // Optionally show a loading state while checking auth
  }

  if (!user) {
    return <Navigate to="/register" replace />;  // Redirect to login if user is not authenticated
  }

  return children;  // Render the protected route if user is authenticated
};

export default ProtectedRoute;
