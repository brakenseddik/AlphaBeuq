const {Category} = require('../models/category');
const {errorHandler} = require('../helpers/db_error_handler');
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