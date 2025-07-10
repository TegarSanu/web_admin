// src/AdminGuard.jsx
import { Navigate, useLocation } from "react-router-dom";

const AdminGuard = () => {
  const sessionId = JSON.parse(localStorage.getItem("sessionId") || "null");
  const location = useLocation();
  const currentPath = location.pathname;
  const url = currentPath.split("/")[2];

  if (!sessionId) {
    return <Navigate to={`/admin/${url}/login`} replace />;
  } else {
    return <Navigate to={`/admin/${url}/dashboard`} replace />;
  }
};

export default AdminGuard;
