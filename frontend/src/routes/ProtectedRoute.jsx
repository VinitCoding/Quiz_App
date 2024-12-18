import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isUser = sessionStorage.getItem('login_user')
  if (!isUser) {
    return <Navigate to="/user_login" />;
  }

  return children;
};

export default ProtectedRoute;
