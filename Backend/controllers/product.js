const {Product} = require('../models/product')
const formidable = require('formidable');
const _ = require('lodash')
const fs = require('fs');
const {errorHandler} = require('../helpers/db_error_handler');


exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (error, fields, files) => {
        if (error) {
            res.status(400).json({success: false, error: 'Cannot upload file'});
        }
        let product = new Product(fields);
        if (files.image) {
            product.image.data = fs.readFileSync(files.image.filepath);
            product.image.contentType = files.image.mimetype;
        }

        product.save((error, data) => {
            if (error) {
                res.status(400).json({success: false, error: errorHandler(error)});
            }
            res.status(200).send(data);
        })

    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,
        (error, fields, files) => {
            if (error) {
                res.status(400).json({success: false, error: 'Cannot upload file'});
            }
            let product = req.product;
            product = _.extend(product, fields);

            if (files.image) {
                product.image.data = fs.readFileSync(files.image.filepath);
                product.image.contentType = files.image.mimetype;
            }

            product.save((error, data) => {
                if (error) {
                    res.status(400).json({success: false, error: errorHandler(error)});
                }
                res.status(200).send(data);
            })
        })
}

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((error, product) => {
        if (!product || error) {
            res.status(400).json({success: false, error: 'Product not found'});
        }
        req.product = product;
        next();
    })
}

exports.getProduct = (req, res) => {
    req.product.image = undefined;
    return res.send(req.product);
}

exports.removeProduct = (req, res) => {
    let product = req.product;
    product.delete((error, data) => {
        if (error) {
            res.status(400).json({success: false, error: errorHandler(error)});
        }
        res.status(200).json({success: true, message: 'Product deleted successfully'});

    })
}