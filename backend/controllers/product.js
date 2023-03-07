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

exports.relatedProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    Product.find({_id: {$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate('category', '_id name')
        .exec((error, data) => {
            if (error) {
                res.status(400).json({success: false, error: 'Products not found'});
            }
            res.send(data);
        })

}
exports.getProducts = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select('-image')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((error, data) => {
            if (error) {
                return res.status(400).json({success: false, error: errorHandler(error)});
            }
            return res.status(200).send(data)
        })

}
exports.removeProduct = (req, res) => {
    let product = req.product;
    product.delete((error, data) => {
        if (error) {
            res.status(400).json({success: false, error: errorHandler(error)});
        }
        console.log(data);
        res.status(200).json({success: true, message: 'Product deleted successfully'});

    })
}

exports.productCategories = (req, res) => {
    Product.distinct('category', {}, (error, data) => {
        if (error) {
            res.status(400).json({success: false, error: 'Products not found'});
        }
        res.send(data);
    })
}


exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-image")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.getProductPhoto = (req, res, next) => {
    if (req.product.image.data) {
        res.set('Content-Type', req.product.image.contentType);
        return res.send(req.product.image.data);
    }
    next();
}