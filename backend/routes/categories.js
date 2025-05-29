const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

// GET - Get all categories
router.get('/', CategoryController.getCategories);

// POST  for seeder
router.post('/', CategoryController.createCategory);

module.exports = router;
