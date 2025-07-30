// src/AdminGuard.jsx
import { Navigate, useParams } from "react-router-dom";
import AdminDashboard from "../pages/superadmin/Dashboard";
import CompanyDashboard from "../pages/user/Dashboard";

const AdminGuard = () => {
  const sessionId = JSON.parse(localStorage.getItem("sessionId") || "null");
  const { role }: any = useParams();

  if (!sessionId) {
    if (role === "admin-dashboard") {
      return <Navigate to={`/admin-dashboard/login`} replace />;
    } else {
      return <Navigate to={`/company-dashboard/login`} replace />;
    }
  } else {
    if (role === "admin-dashboard") {
      return <AdminDashboard />;
    } else {
      return <CompanyDashboard />;
    }
  }
};

export default AdminGuard;
