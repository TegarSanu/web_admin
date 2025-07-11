import React, { useState, useRef, useEffect } from "react";

interface TextFieldProps {
  onChange: (value: string) => void;
  title: string;
  placeHolder?: string;
  multiline?: boolean;
  value?: string;
  id?: string;
  className?: string;
  numberOnly?: boolean;
  disabled?: boolean; // Tambahkan prop disabled
}

const TextField: React.FC<TextFieldProps> = ({
  onChange,
  title,
  placeHolder = "",
  multiline = false,
  value,
  id,
  className = "",
  numberOnly = false,
  disabled = false, // Default false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isActive = isFocused || (value ?? "").length > 0;

  useEffect(() => {
    if (String(value).length > 0) setIsFocused(true);
  }, [String(value)]);

  const baseClass = `w-full border rounded-md py-3 px-3 bg-transparent focus:outline-none transition-colors border-gray-300`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let inputValue = e.target.value;
    if (numberOnly) {
      // Hanya izinkan angka dan kosong
      if (/^\d*$/.test(inputValue)) {
        onChange(inputValue);
      }
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={id}
          onChange={handleChange}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => (numberOnly ? setIsFocused(true) : setIsFocused(false))}
          className={baseClass}
          value={value}
          rows={4}
          disabled={disabled} // Set disabled textarea
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          id={id}
          type="text"
          onChange={handleChange}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={() => (numberOnly ? setIsFocused(true) : setIsFocused(false))}
          className={baseClass}
          value={value}
          disabled={disabled} // Set disabled input
        />
      )}
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

export default TextField;
