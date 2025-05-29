const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct
} = require('../controllers/productController');

const { validateProduct, validateProductQuery } = require('../middleware/validation');

router.get('/', validateProductQuery, getProducts);
router.post('/', validateProduct, createProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

module.exports = router;
