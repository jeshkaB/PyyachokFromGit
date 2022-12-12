const {Schema, model} = require('mongoose');

const restaurantSchema = new Schema({
        name: {type: String, trim: true, required: true},
        mainImage: {type: String, required: true},
        images: [String],
        place: {type: String, required: true},
        average_bill: {type: Number, required: true},
        hours: {type: String, required: true},
        tags: [String],
        categories: [String], //напр. весілля, корпоратив, день народження. А як його сортувати по цих категоріях в топ??????
        contacts: {type: String, required: true},
        news: {
            type: [Schema.Types.ObjectId],
            ref: 'news'
        },
        viewStatistics: {},// TODO
        rating: Number
    },
    {
        timestamps: true,
        versionKey: false
    });

module.exports = model('restaurant', restaurantSchema)

