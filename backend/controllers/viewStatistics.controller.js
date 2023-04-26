const {viewStatisticsService} = require('../services');

module.exports = {

  getViewStatistics: async (req, res, next) => {
    try {
      const views = await viewStatisticsService.getViewStatistics();
      res.json(views);
    } catch (e) {
      next(e);
    }
  },
  getViewStatisticsByRestId: async (req, res, next) => {
    try {
      const {restId} = req.params;
      const views = await viewStatisticsService.getViewStatisticsByParams({restaurant: restId});
      res.json(views);
    } catch (e) {
      next(e);
    }
  }
};
