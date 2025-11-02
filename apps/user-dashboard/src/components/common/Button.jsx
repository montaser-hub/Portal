import React from "react";
import { COLORS } from "./colors";

export function Button({
  children,
  className = "",
  onClick,
  variant = "primary",
  ...props
}) {
  const base = "px-4 py-2 rounded-lg font-medium transition-colors";
  let variantClasses = "";
  let style = {};

  if (variant === "primary") {
    variantClasses = `text-white hover:opacity-90`;
    style = { backgroundColor: COLORS.primary };
  } else if (variant === "secondary") {
    variantClasses = ` text-gray-800 hover:bg-[#E0F4F6]`;
  } else if (variant === "alert") {
    variantClasses = `text-white hover:opacity-90`;
    style = { backgroundColor: COLORS.alert };
  }

  return (
    <button
      className={`${base} ${variantClasses} ${className}`}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
