const express = require("express");
const router = express.Router();
const {createCategory, getCategories} = require('../controllers/category');
const {requireSignin, isAuth, isAdmin} = require("../controllers/auth");
const {userById} = require("../controllers/user");


router.param('userId', userById);

router.post('/:userId', requireSignin, isAuth, isAdmin, createCategory);
router.get('/', getCategories);

module.exports = router;