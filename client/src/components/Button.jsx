
const Button = ({ children, type = "button", variant = "primary", className = "", disabled = false, onClick }) => {
    const baseClasses =
        "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"

    const variantClasses = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 disabled:bg-emerald-300",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100 disabled:text-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300",
        outline:
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-emerald-500 disabled:text-gray-400",
    }

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
