const {Schema, model} = require('mongoose');

const eventAnswerSchema = new Schema({
  answer: {type: String, required: true},
  userEvent: {
    type: Schema.Types.ObjectId,
    ref: 'userEvent',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
},
{
  timestamps: true,
  versionKey: false
});

module.exports = model('eventAnswer', eventAnswerSchema);
