// Input.jsx
import { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  disabled = false,
  error = "",
  touched = false,
  className = "",
  children,
  options = [],
  displayKey = "name",
  valueKey = "_id",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  // Determine border color based on validation state
  const getBorderColor = () => {
    if (error && touched) return "border-red-500";
    if (touched && !error && value) return "border-green-500";
    return "border-gray-300";
  };

  const baseClasses = `w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 disabled:bg-gray-100 disabled:text-gray-500 ${getBorderColor()} ${className}`;

  // Handle input change with Arabic character blocking
  const handleInputChange = (e) => {
    const value = e.target.value;

    if (/[ء-ي]/.test(value)) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: ''
        }
      };
      onChange?.(syntheticEvent);
      return;
    }

    onChange?.(e);
  };

  // Custom dropdown component
  if (type === "custom-dropdown") {
    const currentOption = options.find(opt => opt[valueKey] === value);
    const displayValue = currentOption?.[displayKey] ||
                        (value && typeof value === 'string' && value !== "" ?
                         options.find(opt => opt[valueKey] === value)?.[displayKey] : "") ||
                        "";

    return (
      <div className="w-full">
        {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          <button
            type="button"
            onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
            disabled={disabled}
            className={`${baseClasses} text-left flex justify-between items-center ${!displayValue ? 'text-gray-400' : ''}`}
          >
            <span className="truncate">{displayValue || "N/A"}</span>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && !disabled && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {options.length > 0 ? (
                options.map((option) => (
                  <div
                    key={option[valueKey]}
                    className="px-3 py-2 cursor-pointer hover:bg-teal-50 hover:text-teal-700"
                    onClick={() => {
                      const syntheticEvent = {
                        target: { name, value: option[valueKey] }
                      };
                      handleInputChange(syntheticEvent);
                      setDropdownOpen(false);
                    }}
                  >
                    {option[displayKey]}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-500 text-center">
                  No options available
                </div>
              )}
            </div>
          )}
        </div>
        {error && touched && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }

  // Standard select component
  if (type === "select") {
    return (
      <div className="w-full">
        {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
        <select
          name={name}
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          disabled={disabled}
          className={baseClasses}
          {...rest}
        >
          {children}
        </select>
        {error && touched && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }

  // Radio button component
  if (type === "radio") {
    return (
      <label className="flex items-center space-x-2 text-gray-700">
        <input
          type="radio"
          name={name}
          value={value}
          checked={rest.checked}
          onChange={handleInputChange}
          onBlur={onBlur}
          disabled={disabled}
          className="accent-[#0F7B8A]"
          {...rest}
        />
        {label && <span className="capitalize">{label}</span>}
      </label>
    );
  }

  // Standard input components (text, password, email, etc)
  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value ?? ""}
          onChange={handleInputChange}
          onBlur={() => onBlur?.()}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClasses}
          {...rest}
        />

        {/* Password toggle button */}
        {type === "password" && value && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400 hover:text-[#0F7B8A] transition-colors" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400 hover:text-[#0F7B8A] transition-colors" />
            )}
          </button>
        )}
      </div>
      {error && touched && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
