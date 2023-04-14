const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    'name': {
        type: String,
        required: true,
        maxLength: 32,
        trim: true,
        unique: true
    },
    'description': {
        type: String,
        maxLength: 500,
        default: ''
    },
    'image': {
        type: String,
        // required: true,
    },
}, {timestamps: true})

exports.Category = mongoose.model('Category', categorySchema);