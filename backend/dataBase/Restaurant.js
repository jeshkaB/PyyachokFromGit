const {Schema, model} = require('mongoose');

const restaurantSchema = new Schema({
        name: {type: String, trim: true, required: true},
        mainImage: {type: String, required: true},
        // images: [String],
        place: {type: String, required: true},
        averageBill: {type: Number, required: true},
        hours: {type: String, required: true},
        tags: String,
        categories: [String], //напр. весілля, корпоратив, день народження. А як його сортувати по цих категоріях в топ??????
        phone: {type: String, required: true},
        email: {type: String, required: true},
        webSite: {type: String},
        rating: Number,
        moderated: {type: Boolean, default: false}, //неперевірений - false, перевірений - true
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        news: {
            type: [Schema.Types.ObjectId],
            ref: 'news'
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'comment'
        },
        marks: {
            type: [Schema.Types.ObjectId],
            ref: 'mark'
        },
        userEvents: {
            type: [Schema.Types.ObjectId],
            ref: 'userEvent'
        },
        viewStatistics: {},// TODO
        },
    {
        timestamps: true,
        versionKey: false
    });

module.exports = model('restaurant', restaurantSchema)

