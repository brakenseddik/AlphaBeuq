const express = require("express");
const router = express.Router();
const {userById} = require('../controllers/user');
const {requireSignIn, isAuth, isAdmin} = require("../controllers/auth");

router.param('userId', userById);

router.get('/secret/:userId', requireSignIn, isAuth, (req, res) => {
    return res.send({success: true, user: req.profile})
})
module.exports = router;