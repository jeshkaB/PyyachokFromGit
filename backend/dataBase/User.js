const {Schema, model} = require('mongoose');
const {roles} = require('../constants')


const userSchema = new Schema({
        name: {type: String, trim: true, required: true, unique: true},
        email: {type: String, trim: true, lowercase: true, required: true, unique: true},
        password: {type: String, required: true, /*select: false*/},
        avatar: {type: String},
        role: {
            type: [String], default: [roles.USER]
        },
        favoriteRestaurants: {
            type: [Schema.Types.ObjectId],
            ref: 'restaurant'
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'comment'
        },
        news: {
            type: [Schema.Types.ObjectId],
            ref: 'news'
        },
        marks: {
            type: [Schema.Types.ObjectId],
            ref: 'mark'
        },
        userEvents: {
            type: [Schema.Types.ObjectId],
            ref: 'userEvent'
        },
        eventAnswer: {
            type: [Schema.Types.ObjectId],
            ref: 'eventAnswer'
        },
        restaurants: {
            type: [Schema.Types.ObjectId],
            ref: 'restaurant'
        },

    },
    {
        timestamps: true,
        versionKey: false
    });

module.exports = model('user', userSchema)
