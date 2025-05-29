const mongoose = require('mongoose');
const Category = require('../models/Category');
const DBConnect = require('../config/DBConnect');

const categories = [
    {
        name: 'Electronics',
        description: 'Electronic devices and gadgets'
    },
    {
        name: 'Clothing',
        description: 'Apparel and fashion items'
    },
    {
        name: 'Home & Garden',
        description: 'Home improvement and gardening supplies'
    },
    {
        name: 'Books',
        description: 'Books and educational materials'
    },
    {
        name: 'Sports & Outdoors',
        description: 'Sports equipment and outdoor gear'
    },
    {
        name: 'Health & Beauty',
        description: 'Health and beauty products'
    },
    {
        name: 'Automotive',
        description: 'Car parts and automotive accessories'
    },
    {
        name: 'Toys & Games',
        description: 'Toys and gaming products'
    },
    {
        name: 'Food & Beverages',
        description: 'Food items and beverages'
    },
    {
        name: 'Office Supplies',
        description: 'Office and business supplies'
    }
];

const seedCategories = async () => {
    try {
        await Category.deleteMany({});
        const insertedCategories = await Category.insertMany(categories);
        console.log(`Successfully seeded ${insertedCategories.length} categories`);

        return insertedCategories;
    } catch (error) {
        console.error(' Error seeding categories:', error);
        throw error;
    }
};

// Run seeder if called directly
if (require.main === module) {
    DBConnect()
        .then(() => {
            console.log('Connected to MongoDB');
            return seedCategories();
        })
        .then(() => {
            console.log('Category seeder run');
            process.exit(0);
        })
        .catch((error) => {
            console.error('seeder failed:', error);
        });
}

module.exports = { seedCategories, categories };