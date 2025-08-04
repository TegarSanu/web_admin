import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../api/config";
import NotFoundPage from "./NotFoundPage";

interface SessionGuardProps {
  children: React.ReactNode;
}
const allowedRoles = ["admin-dashboard", "company-dashboard"];

const SessionGuard: React.FC<SessionGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { role } = useParams();
  const isValidRole = allowedRoles.includes(role || "");
  const sessionId =
    role === "admin-dashboard"
      ? getData("session-superadmin")
      : getData("session-company");

  useEffect(() => {
    if (!isValidRole) {
      navigate("/404", { replace: true });
    } else if (!sessionId) {
      navigate(`/${role}/login`, { replace: true });
    }
  }, [navigate, role, isValidRole, sessionId]);

  if (!isValidRole || !sessionId) return <NotFoundPage />;

  return <>{children}</>;
};

export default SessionGuard;
