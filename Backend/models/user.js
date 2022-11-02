const mongoose = require('mongoose');
const {v1: uuidv1} = require('uuid');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    'name': {
        type: String,
        required: true,
        maxLength: 32,
        trim: true
    },
    'email': {
        type: String,
        required: true,
        maxLength: 32,
        unique: true,
        trim: true
    },
    'hashPassword': {
        type: String,
        required: true,
    },
    'about': {
        type: String,
        trim: true
    },
    'salt': String,
    'role': {
        type: Number,
        default: 0
    },
    'history': {
        type: Array,
        default: []
    }
}, {timestamps: true});

userSchema.virtual('password').set(
    function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashPassword = this.encryptPassword(password);

    }
).get(
    function () {
        return this._password;
    }
)

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashPassword;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto.createHash('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (e) {
            console.log(e)
            return '';
        }
    }
}

exports.User = mongoose.model('User', userSchema);