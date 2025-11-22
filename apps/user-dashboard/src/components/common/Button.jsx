
export default function Button({
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
    style = { backgroundColor: "#0F7B8A" };
  } else if (variant === "secondary") {
    variantClasses = ` text-gray-800 hover:bg-[#E0F4F6]`;
  } else if (variant === "alert") {
    variantClasses = `text-white hover:opacity-90`;
    style = { backgroundColor: "#E74C3C" };
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

