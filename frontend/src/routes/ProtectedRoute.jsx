import React from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = sessionStorage.getItem('login_user')

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
