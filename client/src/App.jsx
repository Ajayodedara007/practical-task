
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import ProductListingPage from "./pages/ProductListingPage"
import AddProductPage from "./pages/AddProductPage"
import { useSelector } from "react-redux"

function App() {
  // Mock data for initial products

  const products = useSelector((state) => state?.main?.products)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={<ProductListingPage />}
            />
            <Route
              path="/add-product"
              element={<AddProductPage existingProducts={products} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
