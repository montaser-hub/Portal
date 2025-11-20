import { useState } from "react";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  showToggle = false,
  myClass = "",
  children,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  const baseClasses = `w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none   disabled:bg-gray-100 disabled:text-gray-500 ${myClass}`;

  if (type === "select") {
    return (
      <div className="w-full">
        {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
        <select name={name} value={value} onChange={onChange} disabled={disabled} className={baseClasses}>
          {children}
        </select>
      </div>
    );
  }

  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium text-gray-600">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClasses}
        />

      </div>
    </div>
  );
}
