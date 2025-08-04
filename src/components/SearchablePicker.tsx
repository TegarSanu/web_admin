import React, { useState, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface SearchablePickerFieldProps {
  onChange: (value: string | null) => void;
  title: string;
  placeHolder?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  endpoint: string;
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
    "w-full border rounded-md py-3 px-3 pr-10 bg-transparent focus:outline-none transition-colors border-gray-300";

  const fetchOptions = debounce(async (query: string) => {
    if (!query.trim()) {
      setOptions([]);
      return;
    }
    try {
      const res = await axios.get(endpoint, {
        params: { name: query, page: 1 },
      });
      setOptions(res.data.data);
    } catch (error) {
      console.error("Failed to fetch options:", error);
    }
  }, 500);

  const handleSelect = (item: CompanyResponse) => {
    setSelectedLabel(item.name);
    setSearchQuery("");
    setOptions([]);
    setShowDropdown(false);
    onChange(item.id);
  };

  const handleClear = () => {
    setSelectedLabel("");
    setSearchQuery("");
    onChange(null);
    setOptions([]);
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
          const val = e.target.value;
          setSelectedLabel("");
          setSearchQuery(val);
          setShowDropdown(true);
          fetchOptions(val);
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

      {/* Dropdown or Clear Icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {!selectedLabel || disabled ? (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        ) : (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-700"
          >
            &#x2715;
          </button>
        )}
      </div>

      {/* Dropdown Options */}
      {showDropdown && (
        <div className="absolute z-50 bg-white border rounded shadow-md mt-1 w-full max-h-60 overflow-y-auto">
          {options.length > 0 ? (
            options.map((item) => (
              <div
                key={item.id}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                onMouseDown={() => handleSelect(item)}
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">{item.address}</div>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              Ketik untuk mencari...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchablePickerField;
