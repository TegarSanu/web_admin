import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { rolePages } from "./RolePages";

export default function RoleRouter() {
  const { role }: any = useParams();

  const allowedRoles = Object.keys(rolePages);
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Routes>
      {rolePages[role].map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
}
