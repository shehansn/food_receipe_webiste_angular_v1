const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'server/assets/images/avatar.png',
    },
    passwordHash: {
        type: String,
        required: true,
    },
    favoriteReceipes: [{
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Recipe',
    }]

});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;