const {Category} = require('../models/category');
const {errorHandler} = require('../helpers/db_error_handler');
const {Product} = require("../models/product");
exports.createCategory = (req, res) => {
    let category = new Category(req.body);
    category.save((error, data) => {
        if (error) {
            return res.status(400).send({success: false, error: errorHandler(error)});
        }
        res.status(200).send(data);
    })
}

exports.getCategories = (req, res) => {
    Category.find((error, data) => {
        if (error) {
            return res.status(400).send({success: false, error: errorHandler(error)});
        }
        res.status(200).send(data);
    });
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((error, category) => {
        if (!category || error) {
            res.status(400).json({success: false, error: 'Category not found'});
        }
        req.category = category;
        next();
    })
}

exports.getCategory = (req, res) => {
    return res.send(req.category);
}