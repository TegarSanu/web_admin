import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import setupAxios from "./api/setupAxios";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "./components/Loading";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/app/store";
import RoleRouter from "./guard/RoleRouter";
import Login from "./pages/Login";
import AdminGuard from "./guard/AdminGuard";
import SessionGuard from "./guard/SessionGuard";
import { useLayoutEffect } from "react";
import NotFoundPage from "./guard/NotFoundPage";

const AppContent = () => {
  const location = useLocation();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const validPath = ["admin-dashboard", "company-dashboard"];

  const role = location.pathname.split("/")[1]; // ambil 'admin-dashboard' atau 'company-dashboard'

  useLayoutEffect(() => {
    if (role) {
      setupAxios(role);
    }
  }, [role]);

  return (
    <>
      <Routes>
        <Route
          path=":role"
          element={
            <SessionGuard>
              <AdminGuard />
            </SessionGuard>
          }
        />
        <Route
          path=":role/*"
          element={
            <SessionGuard>
              <RoleRouter />
            </SessionGuard>
          }
        />
        <Route
          path=":role/login"
          element={
            role === "admin-dashboard" || role === "company-dashboard" ? (
              <Login />
            ) : (
              <NotFoundPage />
            )
          }
        />
      </Routes>

      {loading && <LoadingScreen />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme={darkMode ? "light" : "dark"}
        style={{ zIndex: 9999, fontSize: 12 }}
      />
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
