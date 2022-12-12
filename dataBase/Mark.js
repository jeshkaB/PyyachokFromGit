const {Schema, model} = require('mongoose');

const markSchema = new Schema({
    mark: {type: Number, required: true},
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant',

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
});

module.exports = model('mark', markSchema)
