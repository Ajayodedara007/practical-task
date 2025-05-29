const Category = require('../models/Category');

// Get all categories (for dropdown/select options)
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .select('name description')
            .sort({ name: 1 })
            .lean();

        res.json({
            data: categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: error.message
        });
    }
};

// Create category (for seeder use)
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const category = new Category({
            name,
            description
        });

        await category.save();

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        console.error('Error creating category:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create category',
            error: error.message
        });
    }
};

module.exports = {
    getCategories,
    createCategory
};
