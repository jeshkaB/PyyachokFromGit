const {Schema, model} = require('mongoose');

const actionTokenSchema = new Schema({
    actionToken: { type: String, required: true },
    tokenType: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('actionToken', actionTokenSchema)

