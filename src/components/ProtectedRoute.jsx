import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

const ProtectedRoute = ({ children }) => {

  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
