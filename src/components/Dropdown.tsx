import { useState, useRef, useEffect } from "react";

const DropdownButton = ({ icon, children }: any) => {
  const [open, setOpen] = useState(false);
  const dropdownRef: any = useRef(null);

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
        className={`absolute right-0 mt-4 w-48 origin-top-right rounded-md shadow-lg z-50 transition-all duration-300 scheme-light:bg-white dark:bg-gray-800 hover:text-white ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-1">{children}</div>
      </div>
    </div>
  );
};

export default DropdownButton;
