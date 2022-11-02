const {User} = require('../models/user')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            res.status(400).json({success: false, error: 'no user with this id'})
        }
        req.profile = user;
        next();
    })
}

