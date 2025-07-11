import React, { useState, useRef, useEffect } from "react";
import moment from "moment";

interface DatePickerFieldProps {
  onChange: (value: string) => void;
  title: string;
  placeHolder?: string;
  value?: string; // bisa dari moment().format()
  id?: string;
  className?: string;
  disabled?: boolean;
  mode?: "date" | "datetime";
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  onChange,
  title,
  placeHolder = "",
  value,
  id,
  className = "",
  disabled = false,
  mode = "date",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = isFocused || (value ?? "").length > 0;

  useEffect(() => {
    if (String(value).length > 0) setIsFocused(true);
  }, [String(value)]);

  const baseClass =
    "w-full border rounded-md py-3 px-3 bg-transparent focus:outline-none transition-colors border-gray-300";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (mode === "datetime") {
      const formatted = moment(val).format("YYYY-MM-DDTHH:mm:ssZ");
      onChange(formatted);
    } else {
      const formatted = moment(val).format("YYYY-MM-DD");
      onChange(formatted);
    }
  };

  const getInputValue = () => {
    if (!value) return "";
    const m = moment(value);
    if (!m.isValid()) return "";
    if (mode === "datetime") {
      return m.format("YYYY-MM-DDTHH:mm");
    } else {
      return m.format("YYYY-MM-DD");
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        id={id}
        type={mode === "date" ? "date" : "datetime-local"}
        onChange={handleChange}
        onFocus={() => !disabled && setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={baseClass}
        value={getInputValue()}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all pointer-events-none bg-white ${
          isActive ? "-top-2 text-xs px-1" : "top-3 text-gray-400"
        }`}
      >
        {placeHolder || title}
      </label>
    </div>
  );
};

export default DatePickerField;
