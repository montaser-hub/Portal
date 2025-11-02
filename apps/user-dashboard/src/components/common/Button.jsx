// import React from 'react';
// import { COLORS } from './colors';

// export function Button({ children, className = "", onClick, variant = "primary", ...props }) {
//     const base = "px-4 py-2 rounded-lg font-medium transition-colors";
//     let variantClasses = "";

//     if (variant === "primary") {
//         variantClasses = `bg-[${COLORS.primary}] text-white hover:bg-opacity-90`;
//     } else if (variant === "secondary") {
//         variantClasses = `bg-gray-200 text-gray-800 hover:bg-gray-300`;
//     } else if (variant === "alert") {
//         variantClasses = `bg-[${COLORS.alert}] text-white hover:opacity-90`;
//     }

//     return (
//         <button
//             className={`${base} ${variantClasses} ${className}`}
//             onClick={onClick}
//             {...props}
//         >
//             {children}
//         </button>
//     );
// }

// export default Button;

import React from 'react';
import { COLORS } from './colors';

export function Button({ children, className = "", onClick, variant = "primary", ...props }) {
    const base = "px-4 py-2 rounded-lg font-medium transition-colors";
    let variantClasses = "";

    if (variant === "primary") {
        variantClasses = `bg-[${COLORS.primary}] text-white hover:bg-opacity-90`;
    } else if (variant === "secondary") {
        variantClasses = `bg-gray-200 text-gray-800 hover:bg-gray-300`;
    } else if (variant === "alert") {
        variantClasses = `bg-[${COLORS.alert}] text-white hover:opacity-90`;
    }

    return (
        <button
            className={`${base} ${variantClasses} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
