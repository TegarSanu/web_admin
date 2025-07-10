import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import setupAxios from "./api/setupAxios";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "./components/Loading";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/app/store";
import RoleRouter from "./RoleRouter";
import Login from "./pages/Login";
import AdminGuard from "./AdminGuard";

setupAxios();

const App = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  return (
    <Router>
      <Routes>
        <Route path="admin/:role" element={<AdminGuard />} />
        <Route path="admin/:role/*" element={<RoleRouter />} />
        <Route path="admin/:role/login" element={<Login />} />
      </Routes>
      {/* LOADING & TOAST */}
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
    </Router>
  );
};

export default App;
