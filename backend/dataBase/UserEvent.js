const {Schema, model} = require('mongoose');

const userEventSchema = new Schema({            // Пиячок
        restaurant: {
            type: Schema.Types.ObjectId,
            ref: 'restaurant',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        date: {type: Date, required: true}, //формат дати 2022-12-31
        time: {type: String, required: true}, // формат часу HH:MM
        purpose: {type: String, required: true},
        otherInformation: String,
        eventAnswers: [{
            type: Schema.Types.ObjectId,
            ref: 'eventAnswer',
        }]
    },
    {
        timestamps: true,
        versionKey: false
    });

module.exports = model('userEvent', userEventSchema)
