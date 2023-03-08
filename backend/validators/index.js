const {check, validationResult} = require('express-validator');

exports.userSignUpValidator = async (req, res, next) => {
    await check('name', 'Name is required!!').notEmpty().run(req);
    await check('email', 'Email must be valid').isEmail().run(req);
    await check('password', 'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number',
    ).isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false, error: errors.array()[0].msg});
    }

    next();

}