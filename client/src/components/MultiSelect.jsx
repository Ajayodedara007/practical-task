
import { useState, useRef, useEffect } from "react"

const MultiSelect = ({ label, id, options, selectedOptions, onChange, error, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleOptionClick = (option) => {
        let newSelectedOptions

        if (selectedOptions.includes(option)) {
            newSelectedOptions = selectedOptions.filter((item) => item !== option)
        } else {
            newSelectedOptions = [...selectedOptions, option]
        }

        onChange(newSelectedOptions)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className={`mb-4 ${className}`} ref={dropdownRef}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <div className="relative">
                <button
                    type="button"
                    id={id}
                    onClick={toggleDropdown}
                    className={`w-full px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${error ? "border-red-500" : "border-gray-300"
                        }`}
                >
                    {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Select options..."}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 ${selectedOptions.includes(option) ? "bg-emerald-50" : ""
                                    }`}
                            >
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                        checked={selectedOptions.includes(option)}
                                        onChange={() => { }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <span className="ml-3 block truncate">{option}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}

export default MultiSelect
