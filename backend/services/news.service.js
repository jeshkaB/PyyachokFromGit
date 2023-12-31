const News = require('../dataBase/News');

module.exports = {
  createNews(newsObj) {
    return News.create(newsObj);
  },
  getNews() {
    return News.find().populate('restaurant');
  },
  getNewsById(newsId) {
    return News.findById(newsId).populate('restaurant');
  },
  getNewsByParams(filter) {
    return News.find(filter);
  },
  updateNews(newsId, newsObj) {
    return News.findOneAndUpdate({_id: newsId}, newsObj, {new: true});
  },
  deleteNews(newsId) {
    return News.deleteOne({_id: newsId});
  },
};
