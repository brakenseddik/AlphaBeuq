const express = require("express");
const router = express.Router();
const {createProduct, productById, getProduct, removeProduct, updateProduct,} = require('../controllers/product');
const {requireSignIn, isAuth, isAdmin} = require("../controllers/auth");
const {userById} = require("../controllers/user");


router.param('userId', userById);
router.param('productId', productById);

router.get('/:productId', getProduct);
router.post('/:userId', requireSignIn, isAuth, isAdmin, createProduct);
router.delete('/:productId/:userId', requireSignIn, isAuth, isAdmin, removeProduct);
router.put('/:productId/:userId', requireSignIn, isAuth, isAdmin, updateProduct);


// router.get('/', getCategories);

module.exports = router;