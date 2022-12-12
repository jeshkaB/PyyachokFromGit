const {Schema, model} = require('mongoose');

const newsSchema = new Schema({
    title: {type: String, trim: true, required: true},
    content: {type: String, required: true},
    images: [String],
    category: {type: String, required: true},	//main || event || action
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant',
        select: false
    },
});

module.exports = model('news', newsSchema)
