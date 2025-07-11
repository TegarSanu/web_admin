import {
  faBuilding,
  faDollar,
  faHome,
  faLockOpen,
  faMoneyBill,
  faMoon,
  faSun,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownButton from "../../components/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/app/store";
import { useMemo, useEffect, useState } from "react";
import { toggleDarkMode } from "../../redux/features/darkMode/darkModeSlice";
import { getData } from "../../api/config";

const BaseLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getData("userInfo");
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const activeUrl = currentPath;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const sidebarMenu = [
    { name: "Dashboard", icon: faHome, url: `/admin-dashboard` },
    { name: "Company", icon: faBuilding, url: `/admin-dashboard/company` },
    { name: "Payment", icon: faDollar, url: `/admin-dashboard/payment` },
    { name: "Invoice", icon: faMoneyBill, url: `/admin-dashboard/invoice` },
    { name: "Admin", icon: faUsers, url: `/admin-dashboard/admin` },
  ];

  const pageInfo = useMemo(() => {
    return (
      sidebarMenu.find((item) => item.url === currentPath) || {
        name: "Unknown",
        icon: faHome,
      }
    );
  }, [currentPath, sidebarMenu]);

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
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
          <div className="text-lg font-bold text-center border-b pb-4 flex justify-center">
            <img
              src={
                darkMode
                  ? "https://ik.imagekit.io/tgrsnbr/Solusi%20parkir%202.png?updatedAt=1752058193676"
                  : "https://ik.imagekit.io/tgrsnbr/Solusi%20parkir%201.png?updatedAt=1752058193679"
              }
              className="w-40"
            />
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
          className={`h-18 px-4 py-3 flex items-center justify-between backdrop-blur-lg rounded-xl transition-all duration-300 ${
            scrolled
              ? darkMode
                ? "bg-gray-800 shadow"
                : "bg-white/80 shadow"
              : "bg-transparent border-transparent"
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
          <div className="flex gap-3 items-center">
            <DropdownButton
              icon={
                <FontAwesomeIcon icon={faUserCircle} color="gray" size="xl" />
              }
            >
              <div className={`py-2 px-4 text-sm rounded-md`}>{user.email}</div>
              <div
                onClick={() => navigate("/login")}
                className={`py-2 px-4 text-sm rounded-md cursor-pointer flex gap-3 items-center ${
                  darkMode
                    ? "hover:bg-gray-200"
                    : "hover:bg-gray-500 hover:text-white"
                }`}
              >
                <FontAwesomeIcon icon={faLockOpen} />
                Log Out
              </div>
            </DropdownButton>
            <label
              htmlFor="toggle"
              className="relative inline-block w-10 h-8 cursor-pointer mr-4"
            >
              <input
                type="checkbox"
                id="toggle"
                checked={darkMode}
                onChange={() => dispatch(toggleDarkMode())}
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
        <div className={`max-w-7xl mx-auto`}>{children}</div>
      </div>
    </div>
  );
};

export default BaseLayout;
