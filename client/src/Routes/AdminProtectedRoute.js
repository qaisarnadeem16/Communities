import React from 'react'

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.admin);
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default AdminProtectedRoute;