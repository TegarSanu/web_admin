import React, { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownFieldProps {
  onChange: (value: string) => void;
  title: string;
  placeHolder?: string;
  value: string;
  options: Option[];
  id?: string;
  className?: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  onChange,
  title,
  placeHolder = "",
  value,
  options,
  id,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(true);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Jika value cocok dengan salah satu option, langsung terisi
  useEffect(() => {
    const found = options.find((opt) => opt.value === value);
    if (found && selectRef.current) {
      selectRef.current.value = found.value;
    }
  }, [value, options]);

  const isActive = isFocused || value.length > 0;

  const baseClass =
    "w-full border border-gray-300 rounded-md py-3 px-3 bg-transparent focus:outline-none transition-colors appearance-none";

  return (
    <div className={`relative ${className}`}>
      <select
        ref={selectRef}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(true)}
        className={baseClass}
      >
        <option value="" disabled hidden>
          {placeHolder || title}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={id}
        className={`absolute left-3 transition-all pointer-events-none bg-white px-1 ${
          isActive ? "-top-2 text-xs" : "top-3 text-gray-400"
        }`}
      >
        {placeHolder || title}
      </label>

      {/* Dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default DropdownField;
