const express = require("express");
const router = express.Router();
const {userById} = require('../controllers/user');
const {requireSignin, isAuth, isAdmin} = require("../controllers/auth");

router.param('userId', userById);

router.get('/secret/:userId', requireSignin, isAuth, (req, res) => {
    return res.send({success: true, user: req.profile})
})
module.exports = router;