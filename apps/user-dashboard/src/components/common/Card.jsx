
export function Card({ children, className = "", ...props }) {
    return (
        <div
            className={` rounded-xl border shadow-sm ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export default Card;
