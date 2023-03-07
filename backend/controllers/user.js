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

exports.getUser = (req, res) => {
    req.profile.hashPassword = undefined;
    req.profile.salt = undefined;
    return res.send(req.profile);

}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({_id: req.profile._id},
        {$set: req.body},
        {new: true},
        (error, user) => {
            if (error || !user) {
                res.status(400).json({success: false, error: 'You are not authorized to perform this action'})
            }
            user.hashPassword = undefined;
            user.salt = undefined;
            return res.send(user)
        })
}