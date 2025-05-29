
import { useState, useEffect } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import MultiSelect from "../components/MultiSelect"
import Pagination from "../components/Pagination"
import useDebounce from "../hooks/useDebounce"
import { deleteProduct, getCategories, getProducts } from "../slices/MainSlice"
import { useDispatch, useSelector } from "react-redux"

const ProductListingPage = ({ onDelete }) => {

    const dispatch = useDispatch()

    const category = useSelector((state) => state?.main?.category)
    const products = useSelector((state) => state?.main?.products)
    const categories = category?.map((item) => item?.name)

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredProducts, setFilteredProducts] = useState([])

    const productsPerPage = 6
    const debouncedSearchTerm = useDebounce(searchTerm, 300)



    const getAllCategories = async () => {
        await dispatch(getCategories())
    }
    const getAllProducts = async () => {
        await dispatch(getProducts())
    }
    // Filter products based on search term and selected categories
    useEffect(() => {
        let result = [...products]

        // Filter by search term
        if (debouncedSearchTerm) {
            result = result.filter((product) => product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        }

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            result = result.filter((product) => product.categories.some((category) => selectedCategories.includes(category?.name)))
        }

        setFilteredProducts(result)
        setCurrentPage(1)
    }, [debouncedSearchTerm, selectedCategories, products])


    useEffect(() => {
        getAllCategories()
        getAllProducts()
    }, [])

    // Get current products for pagination
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    // Format date to DD MMM YYYY
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        // Scroll to top of product list
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Product Listing</h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Search Products"
                        id="search"
                        type="text"
                        placeholder="Search by product name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <MultiSelect
                        label="Filter by Categories"
                        id="categories"
                        options={categories}
                        selectedOptions={selectedCategories}
                        onChange={setSelectedCategories}
                    />
                </div>
            </div>

            {/* Product List */}
            {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="p-5">
                                <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h2>

                                <div className="flex flex-wrap gap-1 mb-3">
                                    {product?.categories?.map((category) => (
                                        <span
                                            key={category?._id}
                                            className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full"
                                        >
                                            {category?.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-sm text-gray-500 mb-4">Created: {formatDate(product.createdAt)}</div>

                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-medium text-gray-700">Quantity: {product.quantity}</div>
                                    <Button variant="danger" onClick={() => {
                                        dispatch(deleteProduct(product?._id)).then(() => {
                                            dispatch(getAllProducts())
                                        })
                                    }} className="text-sm px-3 py-1">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <p className="text-gray-500">No products found matching your filters.</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    )
}

export default ProductListingPage
