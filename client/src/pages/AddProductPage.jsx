"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import MultiSelect from "../components/MultiSelect"
import { useDispatch, useSelector } from "react-redux"
import { createProducts, getCategories } from "../slices/MainSlice"

const AddProductPage = ({ existingProducts }) => {


    const category = useSelector((state) => state?.main?.category)
    const categories = useSelector((state) => state?.main?.category?.map((item) => item.name))

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        quantity: "",
        categories: [],
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Product name is required"
        } else if (existingProducts.some((p) => p.name.toLowerCase() === formData.name.toLowerCase())) {
            newErrors.name = "Product name must be unique"
        }

        if (!formData.description.trim()) {
            newErrors.description = "Product description is required"
        }

        if (!formData.quantity) {
            newErrors.quantity = "Quantity is required"
        } else if (isNaN(formData.quantity) || Number.parseInt(formData.quantity) <= 0) {
            newErrors.quantity = "Quantity must be a positive number"
        }

        if (formData.categories.length === 0) {
            newErrors.categories = "Select at least one category"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            })
        }
    }

    const handleCategoriesChange = (selectedCategories) => {
        setFormData({
            ...formData,
            categories: selectedCategories,
        })

        // Clear error for categories if it exists
        if (errors.categories) {
            setErrors({
                ...errors,
                categories: null,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSubmitting(true)
            setSubmitStatus(null)
            const data = {
                ...formData,
                categories: category?.filter((item) => formData?.categories?.includes(item.name))?.map((pro) => pro?._id)
            }
            try {

                await dispatch(createProducts(data))

                setSubmitStatus({ type: "success", message: "Product added successfully!" })

                // Reset form
                setFormData({
                    name: "",
                    description: "",
                    quantity: "",
                    categories: [],
                }
                )
                // Redirect to product listing after a short delay
                setTimeout(() => {
                    navigate("/")
                }, 1500)

            } catch (error) {
                console.log("error", error)
                setSubmitStatus({ type: "error", message: "Failed to add product. Please try again." })
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    const getAllCategories = async () => {
        await dispatch(getCategories())
    }


    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

            {submitStatus && (
                <div
                    className={`mb-6 p-4 rounded-md ${submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                >
                    {submitStatus.message}
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Product Name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        error={errors.name}
                        required
                    />

                    <TextArea
                        label="Description"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                        error={errors.description}
                        required
                    />

                    <Input
                        label="Quantity"
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        error={errors.quantity}
                        min="1"
                        required
                    />

                    <MultiSelect
                        label="Categories"
                        id="categories"
                        options={categories}
                        selectedOptions={formData.categories}
                        onChange={handleCategoriesChange}
                        error={errors.categories}
                    />

                    <div className="flex gap-4 mt-6">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Adding..." : "Add Product"}
                        </Button>

                        <Button type="button" variant="outline" onClick={() => navigate("/")}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProductPage
