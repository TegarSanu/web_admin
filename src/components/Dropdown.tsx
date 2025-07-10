import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/app/store";

const DropdownButton = ({ icon, children }: any) => {
  const [open, setOpen] = useState(false);
  const dropdownRef: any = useRef(null);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-md active:scale-90 transition-transform duration-100 cursor-pointer"
      >
        {icon && <span className="mr-2">{icon}</span>}
      </button>

      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } absolute right-0 mt-4 w-auto origin-top-right rounded-xl p-3 shadow-lg z-50 transition-all duration-300 ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-80 pointer-events-none"
        }`}
      >
        <div className="py-1">{children}</div>
      </div>
    </div>
  );
};

export default DropdownButton;
