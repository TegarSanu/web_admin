import {
  faBuilding,
  faDollar,
  faHome,
  faMoneyBill,
  faMoon,
  faSun,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import DropdownButton from "./components/Dropdown";
import LoadingScreen from "./components/Loading";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/app/store";
import { ToastContainer } from "react-toastify";
import { useMemo, useState, useEffect } from "react";

const BaseLayout = ({ children, activeUrl }: any) => {
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const sidebarMenu = [
    { name: "Dashboard", icon: faHome, url: "/" },
    { name: "Company", icon: faBuilding, url: "/company" },
    { name: "Payment", icon: faDollar, url: "/payment" },
    { name: "Invoice", icon: faMoneyBill, url: "/invoice" },
    { name: "Admin", icon: faUsers, url: "/admin" },
  ];

  const pageInfo = useMemo(() => {
    return (
      sidebarMenu.find((item) => item.url === activeUrl) || {
        name: "Unknown",
        icon: faHome,
      }
    );
  }, [activeUrl]);

  return (
    <div
      className={`w-full min-h-screen font-sans transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* SIDEBAR */}
      <div className="fixed z-50 p-4 h-screen w-80">
        <div
          className={`h-full ${
            darkMode ? "bg-gray-800" : "bg-white/80"
          } backdrop-blur-md shadow-xl border ${
            darkMode ? "border-gray-700" : "border-white/50"
          } rounded-xl px-4 py-6 flex flex-col`}
        >
          <div className="text-lg font-bold text-center border-b pb-4">
            Welcome Admin
          </div>
          <div className="mt-6 flex-1 space-y-1">
            {sidebarMenu.map((item) => (
              <div
                key={item.url}
                onClick={() => navigate(item.url)}
                className={`flex items-center gap-3 px-3 py-4 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 ${
                  activeUrl === item.url
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-8" />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="fixed top-0 right-0 ml-64 w-[calc(100%-20rem)] p-4 z-40">
        <div
          className={`h-18 px-6 py-3 flex items-center justify-between backdrop-blur-lg rounded-xl shadow ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white/80 border-gray-300"
          }`}
        >
          <div>
            <div className="flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400">
              <FontAwesomeIcon icon={pageInfo.icon} />
              <span>/</span>
              <span>{pageInfo.name}</span>
            </div>
            <h1 className="font-bold text-xl">{pageInfo.name}</h1>
          </div>
          <div className="flex gap-5 items-center">
            <DropdownButton
              icon={
                <FontAwesomeIcon icon={faUserCircle} color="gray" size="lg" />
              }
            >
              <div
                onClick={() => navigate("/login")}
                className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm rounded-md cursor-pointer text-white"
              >
                Login
              </div>
            </DropdownButton>
            <label
              htmlFor="toggle"
              className="relative inline-block w-14 h-8 cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-300 dark:bg-gray-500 rounded-full peer-checked:bg-yellow-400 transition-colors duration-300"></div>
              <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full flex items-center justify-center transition-transform duration-300 peer-checked:translate-x-6">
                <FontAwesomeIcon
                  icon={darkMode ? faSun : faMoon}
                  className="text-gray-700 text-xs"
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="ml-80 p-4 pt-28 transition-all duration-300">
        <div
          className={`rounded-2xl shadow-md p-6 h-auto transition-all duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {children}
        </div>
      </div>

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
        theme="colored"
      />
    </div>
  );
};

export default BaseLayout;
