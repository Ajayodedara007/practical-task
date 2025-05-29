const Product = require('../models/Product');
const Category = require('../models/Category');

const createProduct = async (req, res) => {
    try {
        const { name, description, quantity, categories } = req.body;

        const product = new Product({
            name,
            description,
            quantity,
            categories
        });

        await product.save();

        // Populate categories for response
        await product.populate('categories', 'name');

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        console.error('Error creating product:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Product name already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error: error.message
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            categories = '[]'
        } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let query = {};

        if (search.trim()) {
            query.name = { $regex: search.trim(), $options: 'i' };
        }

        const categoryFilter = JSON.parse(categories);
        if (categoryFilter.length > 0) {
            query.categories = { $in: categoryFilter };
        }

        const [products, totalCount] = await Promise.all([
            Product.find(query)
                .populate('categories', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber)
                .lean(),
            Product.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalCount / limitNumber);

        res.json({
            success: true,
            data: {
                products,
                pagination: {
                    currentPage: pageNumber,
                    totalPages,
                    totalCount,
                    hasNextPage: pageNumber < totalPages,
                    hasPrevPage: pageNumber > 1,
                    limit: limitNumber
                }
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id).populate('categories', 'name');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: error.message
        });
    }
};



const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: error.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct
};
