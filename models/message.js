const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

// messageSchema.virtual('url').get(function () {
//     return `/message/${this._id}`;
// });

module.exports = mongoose.model('Message', messageSchema);