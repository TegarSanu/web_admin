import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../api/config";

interface SessionGuardProps {
  children: React.ReactNode;
}

const SessionGuard: React.FC<SessionGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { role } = useParams();
  const sessionId =
    role === "admin-dashboard"
      ? getData("session-superadmin")
      : getData("session-company");

  useEffect(() => {
    if (!sessionId) {
      navigate(`/${role}/login`, { replace: true });
    }
  }, [navigate, role]);

  return <>{children}</>;
};

export default SessionGuard;
