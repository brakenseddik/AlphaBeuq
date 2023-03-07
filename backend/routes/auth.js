const express = require("express");
const router = express.Router();
const {signup, signin, signout, requireSignIn} = require('../controllers/auth');
const {userSignUpValidator} = require('../validators/index')

router.post('/signup', userSignUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);


module.exports = router;