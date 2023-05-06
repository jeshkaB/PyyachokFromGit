const {Schema, model} = require('mongoose');

const authSchema = new Schema({
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('auth', authSchema);

