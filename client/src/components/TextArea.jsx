import { forwardRef } from "react"

const TextArea = forwardRef(({ label, id, error, className = "", rows = 4, ...props }, ref) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <textarea
                ref={ref}
                id={id}
                rows={rows}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${error ? "border-red-500" : "border-gray-300"
                    }`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
})

TextArea.displayName = "TextArea"

export default TextArea
