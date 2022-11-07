const express = require("express");
const router = express.Router();
const {
    createProduct,
    productById,
    getProduct,
    removeProduct,
    updateProduct,
    getProducts,
    relatedProducts,
    productCategories,
    listBySearch,
    getProductPhoto
} = require('../controllers/product');

const {requireSignIn, isAuth, isAdmin} = require("../controllers/auth");
const {userById} = require("../controllers/user");


router.param('userId', userById);
router.param('productId', productById);

router.get('/:productId', getProduct);
router.get('/', getProducts);
router.get('/related/:productId', relatedProducts);
router.get('/avd/categories', productCategories)
router.post('/:userId', requireSignIn, isAuth, isAdmin, createProduct);
router.delete('/:productId/:userId', requireSignIn, isAuth, isAdmin, removeProduct);
router.put('/:productId/:userId', requireSignIn, isAuth, isAdmin, updateProduct);
router.post('/by/search', listBySearch);
router.get('/photo/:productId', getProductPhoto);


module.exports = router;