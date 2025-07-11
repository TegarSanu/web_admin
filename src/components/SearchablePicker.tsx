import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

interface SearchablePickerFieldProps {
  onChange: (value: string) => void; // return id saja
  title: string;
  placeHolder?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  endpoint: string; // URL endpoint yang di-hit saat search
}

interface CompanyResponse {
  id: string;
  name: string;
  address?: string;
  [key: string]: any;
}

const SearchablePickerField: React.FC<SearchablePickerFieldProps> = ({
  onChange,
  title,
  placeHolder = "",
  id,
  className = "",
  disabled = false,
  endpoint,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<CompanyResponse[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const isActive =
    isFocused || searchQuery.length > 0 || selectedLabel.length > 0;

  const baseClass =
    "w-full border rounded-md py-3 px-3 bg-transparent focus:outline-none transition-colors border-gray-300";

  // Debounced fetch
  const fetchOptions = debounce(async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    axios
      .get(`${endpoint}`, { params: { name: query, page: 1 } })
      .finally(() => {})
      .then((res) => {
        if (searchQuery.length > 0 || selectedLabel.length > 0) {
          setOptions(res.data.data);
        } else {
          setOptions([]);
        }
      });
  }, 500);

  useEffect(() => {
    fetchOptions(searchQuery);
  }, [searchQuery]);

  const handleSelect = (item: CompanyResponse) => {
    setSelectedLabel(item.name);
    setSearchQuery("");
    setOptions([]);
    setShowDropdown(false);
    onChange(item.id);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        id={id}
        type="text"
        onFocus={() => {
          if (!disabled) {
            setIsFocused(true);
            setShowDropdown(true);
          }
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsFocused(false);
            setShowDropdown(false);
          }, 150);
        }}
        onChange={(e) => {
          setSelectedLabel("");
          setSearchQuery(e.target.value);
          setShowDropdown(true);
        }}
        value={selectedLabel || searchQuery}
        className={baseClass}
        disabled={disabled}
        placeholder=""
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all pointer-events-none bg-white ${
          isActive ? "-top-2 text-xs px-1" : "top-3 text-gray-400"
        }`}
      >
        {placeHolder || title}
      </label>

      {showDropdown && options.length > 0 && (
        <div className="absolute z-50 bg-white border rounded shadow-md mt-1 w-full max-h-60 overflow-y-auto">
          {options.map((item) => (
            <div
              key={item.id}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              onMouseDown={() => handleSelect(item)}
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-500">{item.address}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchablePickerField;
