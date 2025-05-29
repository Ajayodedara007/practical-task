
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <svg
                                className="h-8 w-8 text-emerald-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            <span className="ml-2 text-xl font-bold text-gray-800">ProductHub</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/")
                                ? "text-emerald-600 bg-emerald-50"
                                : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                                }`}
                        >
                            Products
                        </Link>
                        <Link
                            to="/add-product"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/add-product")
                                ? "text-emerald-600 bg-emerald-50"
                                : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                                }`}
                        >
                            Add Product
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-50 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/")
                                ? "text-emerald-600 bg-emerald-50"
                                : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            to="/add-product"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/add-product")
                                ? "text-emerald-600 bg-emerald-50"
                                : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Add Product
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
