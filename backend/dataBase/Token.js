const {Schema, model} = require('mongoose');

const tokenSchema = new Schema({
  token: { type: String, required: true },
  tokenType: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('token', tokenSchema);

