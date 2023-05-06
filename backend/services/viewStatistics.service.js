const ViewStatistics = require('../dataBase/ViewStatistics');

module.exports = {
  createViewStatistics(viewObj) {
    return ViewStatistics.create(viewObj);
  },
  getViewStatistics() {
    return ViewStatistics.find().populate('restaurant','name');
  },

  getViewStatisticsByParams(filter) {
    return ViewStatistics.find(filter);
  },
};
