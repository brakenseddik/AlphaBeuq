const {User} = require("../models/user")
const jwt = require('jsonwebtoken');
const {expressjwt: expressjwt} = require('express-jwt');
const {errorHandler} = require("../helpers/db_error_handler");


exports.signup = (req, res) => {
    const user = new User(req.body);

    user.save((error, user) => {
        console.log(error);
        console.log(errorHandler(error));
        if (error) return res.json({
                error: errorHandler(error)
            }
        );
        user.salt = undefined;
        user.passwordHash = undefined;
        return res.json({success: true, user});

    });
}

exports.signin = (req, res) => {
    const {email, password} = req.body;
    Auth.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({success: false, error: err});
        }
        // Authenticate user
        if (!user.authenticate(password)) {
            return res.status(401).json({success: false, error: 'Email and password don\'t match'})
        }
        // Generate token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.cookie('t', token, {expire: new Date() + 9999});
        const {_id, name, email, role} = user;
        //Send response to user
        return res.send({
            token, user: {_id, name, email, role}
        });
    });

}


exports.signout = (req, res) => {
    try {
        res.clearCookie('t');
        res.send({success: true, message: 'Sign out success'});
    } catch (e) {
        res.status(500).send({success: false, error: e});
    }

}

exports.requireSignIn = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
},);

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({success: false, error: 'Access denied'});
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({success: false, error: 'Admin resource, Access denied'});
    }
    next()
}