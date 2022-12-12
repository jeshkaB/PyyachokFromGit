const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    body: {type: String, required: true},
    images: [String],
    bill: Number,
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
});

module.exports = model('comment', commentSchema)

