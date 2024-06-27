const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    membership_status: {
        type: String,
        required: true,
        enum: ['user', 'member']
    },
    admin: {
        type: Boolean,
        required: true
    }
});

// userSchema.virtual('url').get(function () {
//     return `/user/${this._id}`;
// });

userSchema.virtual('fullname').get(function () {
    return `${this.firstName} ${this.lastName}`;
});


module.exports = mongoose.model('User', userSchema);