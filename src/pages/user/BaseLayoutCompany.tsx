import {
  faBuilding,
  faDollar,
  faHome,
  faLockOpen,
  faMoon,
  faSun,
  faUserCircle,
  faUsers,
  faBars,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownButton from "../../components/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/app/store";
import { useMemo, useEffect, useState } from "react";
import { toggleDarkMode } from "../../redux/features/darkMode/darkModeSlice";
import { getData, removeData } from "../../api/config";
import axios from "axios";
import { toast } from "react-toastify";

const BaseLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getData("userInfo");
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Ambil & simpan state collapse sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    const stored = localStorage.getItem("isSidebarCollapsed");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      "isSidebarCollapsed",
      JSON.stringify(isSidebarCollapsed)
    );
  }, [isSidebarCollapsed]);

  const logOut = () => {
    axios
      .post(`company-dashboard/logout`, null)
      .finally(() => {})
      .then(() => {
        removeData("sessionId");
        removeData("userInfo");
        toast.success("Berhasil logout, silahkan login kembali");
        navigate(`/company-dashboard/login`);
      });
  };

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

  const sidebarSections = [
    {
      title: "Main",
      items: [{ name: "Dashboard", icon: faHome, url: `/company-dashboard` }],
    },
    {
      title: "Data",
      items: [
        {
          name: "Company",
          icon: faBuilding,
          url: `/company-dashboard/company`,
        },
        {
          name: "Company User",
          icon: faUsers,
          url: `/company-dashboard/company-user`,
        },
        { name: "Payment", icon: faDollar, url: `/company-dashboard/payment` },
      ],
    },
  ];

  const isActivePath = (targetUrl: string) => {
    if (targetUrl === "/company-dashboard") {
      return currentPath === targetUrl;
    }
    return currentPath === targetUrl || currentPath.startsWith(targetUrl + "/");
  };

  const pageInfo = useMemo(() => {
    const allItems = sidebarSections.flatMap((section) => section.items);
    const match = allItems.find((item) => isActivePath(item.url));
    return match || { name: "Unknown", icon: faHome };
  }, [currentPath]);

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* SIDEBAR */}
      <div
        className={`fixed z-50 p-4 h-screen ${
          isSidebarCollapsed ? "w-28" : "w-80"
        } transition-all duration-300`}
      >
        <div
          className={`h-full ${
            darkMode ? "bg-gray-800" : "bg-white/80"
          } backdrop-blur-md shadow-xl border ${
            darkMode ? "border-gray-700" : "border-white/50"
          } rounded-xl px-4 py-6 flex flex-col`}
        >
          {/* Logo + Toggle */}
          <div className="flex justify-between items-center mb-6">
            {!isSidebarCollapsed ? (
              <img
                src={
                  darkMode
                    ? "https://ik.imagekit.io/tgrsnbr/Solusi%20parkir%202.png?updatedAt=1752058193676"
                    : "https://ik.imagekit.io/tgrsnbr/Solusi%20parkir%201.png?updatedAt=1752058193679"
                }
                className="w-36"
              />
            ) : (
              <img
                src="https://ik.imagekit.io/tgrsnbr/Favicon.png?updatedAt=1752058193563"
                className="w-6"
              />
            )}
            <button
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              className="text-gray-500 dark:text-gray-300"
            >
              <FontAwesomeIcon
                icon={isSidebarCollapsed ? faBars : faChevronLeft}
              />
            </button>
          </div>

          <div className="mt-2 flex-1 space-y-4 overflow-y-auto">
            {sidebarSections.map((section) => (
              <div key={section.title}>
                {!isSidebarCollapsed && (
                  <div className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 px-2 mb-3">
                    {section.title}
                  </div>
                )}
                {section.items.map((item) => {
                  const isActive = isActivePath(item.url);
                  return (
                    <div
                      key={item.url}
                      onClick={() => navigate(item.url)}
                      className={`flex items-center ${
                        isSidebarCollapsed ? "justify-center" : "gap-3 px-3"
                      } py-3 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                          : darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                      {!isSidebarCollapsed && <span>{item.name}</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div
        className={`fixed top-0 right-0 ${
          isSidebarCollapsed
            ? "ml-28 w-[calc(100%-7rem)]"
            : "ml-80 w-[calc(100%-20rem)]"
        } p-4 z-40 transition-all duration-300`}
      >
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
              <div className="py-2 px-4 text-sm rounded-md">{user?.email}</div>
              <div
                onClick={logOut}
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
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "ml-28" : "ml-80"
        } p-4 pt-28`}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default BaseLayout;
