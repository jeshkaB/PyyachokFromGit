const {Schema, model} = require('mongoose');

const restaurantSchema = new Schema({
  name: {type: String, trim: true, required: true},
  mainImage: {type: String, required: true},
  place: {type: String, required: true},
  averageBill: {type: Number, required: true},
  hours: {type: String, required: true},
  tags: String,
  phone: {type: String, required: true},
  email: {type: String, required: true},
  webSite: String,
  rating: Number,
  coordinates: {type: [String], required: true},
  moderated: {type: Boolean, default: false},//неперевірений - false, перевірений - true
  moderationMessage: String,
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
  topCategories: {
    type: [Schema.Types.ObjectId],
    ref: 'topCategory'
  }
},
{
  timestamps: true,
  versionKey: false
});

module.exports = model('restaurant', restaurantSchema);

