const {Schema, model} = require('mongoose');

const newsSchema = new Schema({
        title: {type: String, trim: true, required: true},
        content: {type: String, required: true},
        newsImage: String,
        category: {type: String, required: true},
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        restaurant: {
            type: Schema.Types.ObjectId,
            ref: 'restaurant',
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = model('news', newsSchema)
