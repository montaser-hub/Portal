export function Badge({ children, variant = "default", className = "" }) {
    const base = "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium";
    let variantClasses = "bg-gray-100 text-gray-700";
    const style = {};

    if (variant === "primary") {
        variantClasses = `bg-[#0F7B8A] text-white`;
    } else if (variant === "outline") {
        variantClasses = `bg-[#E0F4F6] text-[#0F7B8A] border border-2]`;
    } else if (variant === "destructive") {
        variantClasses = `bg-[#E74C3C] text-white`;
    } else if (variant === "success") {
        variantClasses = `bg-green-500 text-white`;
    } else if (variant === "warning") {
        variantClasses = `bg-yellow-500 text-white`;
    } else if (variant === "secondary") {
        variantClasses = "bg-gray-200 text-gray-700";
    }
    return (
        <span className={`${base} ${variantClasses} ${className}`} style={style}>
            {children}
        </span>
    );
}
export default Badge;
