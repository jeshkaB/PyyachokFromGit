const {Schema, model} = require('mongoose');
const {roles} = require('../constants')



const userSchema = new Schema({
        name: {type: String, trim: true, required: true},
        email: {type: String, trim: true, lowercase: true, required: true, unique: true},
        password: {type: String, required: true},
        avatar: {type: String},
        favoriteRestaurants: {
            type: [Schema.Types.ObjectId],
            ref: 'restaurant',
            select: false
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'comment',
            select: false
        },
        marks: {
            type: [Schema.Types.ObjectId],
            ref: 'mark',
            select: false
        },
        role: {
            type: [String], default: [roles.USER]
        }
    },
    {
        timestamps: true,
        versionKey: false
    });

module.exports = model('user', userSchema)
