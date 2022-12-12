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
        date: {type: Date, required: true},
        time: {type: String, required: true},
        purpose: {type: String, required: true},
        otherInformation: String,
        answers: [{                                 //на відповіді ж не треба окрему схему?
            body: String,
            date: Date,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        }]
    },
    {
        timestamps: true,
        versionKey: false
    });

module.exports = model('userEvent', userEventSchema)
