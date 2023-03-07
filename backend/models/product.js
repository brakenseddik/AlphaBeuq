const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    'name': {
        type: String,
        required: true,
        maxLength: 32,
        trim: true
    },
    'description': {
        type: String,
        maxLength: 500,
        default: ''
    },
    'image': {
        data: Buffer,
        contentType: String,
    },
    "price": {
        type: Number,
        require: true
    },
    "quantity": {
        type: Number,
        require: true
    },
    "sold": {
        type: Number,
        default: 0
    },
    "category": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    "shipping": {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


exports.Product = mongoose.model('Product', productSchema);