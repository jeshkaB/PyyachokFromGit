const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
        comment: {type: String, required: true},
        // images: [String],
        // bill: Number,
        restaurant: {
            type: Schema.Types.ObjectId,
            ref: 'restaurant',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = model('comment', commentSchema)

