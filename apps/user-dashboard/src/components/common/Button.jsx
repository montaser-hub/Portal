
export default function Button({
  children,
  className = "",
  onClick,
  variant = "outline",
  ...props
}) {
  const base = "px-4 py-2 rounded-lg font-medium transition-color duration-300";
  let variantClasses = "";

  if (variant === "base") {
    variantClasses = `${base}`;
  } else if (variant === "primary") {
    variantClasses = `${base} text-white bg-[#0F7B8A] hover:bg-[#0c656c] `;
  } else if (variant === "secondary") {
    variantClasses = ` ${base} text-gray-600 hover:bg-gray-200`;
  } else if (variant === "alert") {
    variantClasses = ` ${base} text-white bg-red-600 hover:bg-red-700`;
  }

  return (
    <button
      className={` ${variantClasses} ${className} text-gray-500`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

