const {Schema, model} = require('mongoose');

const topCategorySchema = new Schema({
  title: {type: String, required: true},
  restaurants: {
    type: [Schema.Types.ObjectId],
    ref: 'restaurant',
  },
},
{
  timestamps: true,
  versionKey: false
}
);

module.exports = model('topCategory', topCategorySchema);

