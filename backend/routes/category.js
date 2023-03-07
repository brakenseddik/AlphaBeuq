const express = require("express");
const router = express.Router();
const {
    createCategory,
    getCategories,
    categoryById,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category');
const {requireSignIn, isAuth, isAdmin} = require("../controllers/auth");
const {userById} = require("../controllers/user");


router.param('userId', userById);
router.param('categoryId', categoryById);


router.post('/:userId', requireSignIn, isAuth, isAdmin, createCategory);
router.put('/:categoryId/:userId', requireSignIn, isAuth, isAdmin, updateCategory);
router.delete('/:categoryId/:userId', requireSignIn, isAuth, isAdmin, deleteCategory);

router.get('/', getCategories);
router.get('/:categoryId', getCategory)

module.exports = router;