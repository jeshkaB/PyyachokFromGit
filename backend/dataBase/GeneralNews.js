const {Schema, model} = require('mongoose');

const generalNewsSchema = new Schema({
        title: {type: String, trim: true, required: true},
        content: {type: String, required: true},
        newsImage: String,
        category: {type: String, required: true},
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

module.exports = model('generalNews', generalNewsSchema)
