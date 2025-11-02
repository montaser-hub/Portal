import { useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

export default function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  name,
  onChange,
  showToggle = false,
  myClass = "",
  children,
}) {
  const [showPassword, setShowPassword] = useState(false);

  // حالة select
  if (type === "select") {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <select
          id={name}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0F7B8A] ${myClass}`}
        >
          {children}
        </select>
      </div>
    );
  }

  // حالة text / password
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0F7B8A] ${myClass}`}
        />
        {type === "password" && showToggle && (
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer z-10 select-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BiSolidShow className="text-gray-500" />
            ) : (
              <BiSolidHide className="text-gray-500" />
            )}
          </span>
        )}
      </div>
    </div>
  );
}
