const {Schema, model} = require('mongoose');

const viewStatisticsSchema = new Schema({
  user: {type:
            Schema.Types.ObjectId,
  ref: 'user'
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurant'
  }
},
{
  timestamps: true,
  versionKey: false
});

module.exports = model('viewStatistics', viewStatisticsSchema);

