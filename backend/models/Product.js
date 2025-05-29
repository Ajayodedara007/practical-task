const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: true,
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be a whole number'
        }
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'At least one category is required']
    }]
}, {
    timestamps: true
});

productSchema.index({ name: 1 });
productSchema.index({ categories: 1 });
productSchema.index({ createdAt: -1 });

productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);