// import React from 'react';
// import { COLORS } from './colors.jsx';
// export function Badge({ children, variant = "default", className = "" }) {
//     const base = "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium";
//     let variantClasses = "bg-gray-100 text-gray-700";
//     if (variant === "primary") {
//         variantClasses = `bg-[${COLORS.primary}] text-white`;
//     } else if (variant === "outline") {
//         variantClasses = `bg-[${COLORS.primaryLight}] text-[${COLORS.primary}] border border-[${COLORS.primary}]`;
//     } else if (variant === "destructive") {
//         variantClasses = `bg-red-500 text-white`;
//     } else if (variant === "success") {
//         variantClasses = `bg-green-500 text-white`;
//     } else if (variant === "warning") {
//         variantClasses = `bg-yellow-500 text-white`;
//     } else if (variant === "secondary") {
//         variantClasses = "bg-gray-200 text-gray-800";
//     }

//     return (
//         <span className={`${base} ${variantClasses} ${className}`}>
//             {children}
//         </span>
//     );
// }

// export default Badge;


import React from 'react';
import { COLORS } from './colors.jsx';
export function Badge({ children, variant = "default", className = "" }) {
    const base = "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium";
    let variantClasses = "bg-gray-100 text-gray-700";
    const style = {};

    if (variant === "primary") {
        variantClasses = `bg-[${COLORS.primary}] text-white`;
    } else if (variant === "outline") {
        variantClasses = `bg-[${COLORS.primaryLight}] text-[${COLORS.primary}] border border-2 border-[${COLORS.primary}]`;
    } else if (variant === "destructive") {
        // تم تصحيح اللون الأحمر ليتطابق مع Alert Red
        variantClasses = `bg-[${COLORS.alert}] text-white`;
    } else if (variant === "success") {
        variantClasses = `bg-green-500 text-white`;
    } else if (variant === "warning") {
        variantClasses = `bg-yellow-500 text-white`;
    } else if (variant === "secondary") {
        variantClasses = "bg-gray-200 text-gray-800";
    }

    return (
        <span className={`${base} ${variantClasses} ${className}`} style={style}>
            {children}
        </span>
    );
}

export default Badge;
