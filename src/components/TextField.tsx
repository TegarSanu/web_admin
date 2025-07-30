import React, { useState, useRef, useEffect } from "react";

interface TextFieldProps {
  onChange: (value: string) => void;
  title: string;
  placeHolder?: string;
  multiline?: boolean;
  value?: string | number;
  id?: string;
  className?: string;
  numberOnly?: boolean;
  disabled?: boolean;
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
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [defaultValue, setDefaultValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const hasExternalValue = value !== undefined && value !== null;
  const currentValue = hasExternalValue ? String(value) : defaultValue;
  const isActive = isFocused || currentValue.length > 0;

  useEffect(() => {
    if (hasExternalValue) {
      setIsFocused(true);
    }
  }, [value]);

  const baseClass =
    "w-full border rounded-md py-3 px-3 bg-transparent focus:outline-none transition-colors border-gray-300";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    if (numberOnly) {
      if (/^\d*$/.test(inputValue)) {
        onChange(inputValue);
        setDefaultValue(inputValue);
      }
    } else {
      onChange(inputValue);
      setDefaultValue(inputValue);
    }
  };

  const commonProps = {
    ref: inputRef,
    id,
    onChange: handleChange,
    onFocus: () => !disabled && setIsFocused(true),
    onBlur: () => (numberOnly ? setIsFocused(true) : setIsFocused(false)),
    className: baseClass,
    value: currentValue,
    disabled,
  };

  return (
    <div className={`relative ${className}`}>
      {multiline ? (
        <textarea
          {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          rows={4}
        />
      ) : (
        <input
          {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
          type="text"
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
