const { body, query, validationResult } = require('express-validator');
const Product = require('../models/Product');
const Category = require('../models/Category');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

const validateProduct = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 1, max: 100 })
        .withMessage('Product name must be between 1 and 100 characters')
        .trim()
        .custom(async (value, { req }) => {
            // Check for unique name (excluding current product for updates)
            const existingProduct = await Product.findOne({
                name: value,
                ...(req.params.id && { _id: { $ne: req.params.id } })
            });
            if (existingProduct) {
                throw new Error('Product name already exists');
            }
            return true;
        }),

    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 1, max: 500 })
        .withMessage('Description must be between 1 and 500 characters')
        .trim(),

    body('quantity')
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),

    body('categories')
        .isArray({ min: 1 })
        .withMessage('At least one category must be selected')
        .custom(async (categoryIds) => {
            // Validate that all category IDs exist
            const categories = await Category.find({ _id: { $in: categoryIds } });
            if (categories.length !== categoryIds.length) {
                throw new Error('One or more selected categories do not exist');
            }
            return true;
        }),

    handleValidationErrors
];

const validateProductQuery = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),

    query('search')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Search term cannot exceed 100 characters')
        .trim(),

    query('categories')
        .optional()
        .custom((value) => {
            if (typeof value === 'string') {
                try {
                    JSON.parse(value);
                } catch (error) {
                    throw new Error('Categories must be a valid JSON array');
                }
            }
            return true;
        }),

    handleValidationErrors
];

module.exports = {
    validateProduct,
    validateProductQuery,
    handleValidationErrors
};