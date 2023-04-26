const GeneralNews = require('../dataBase/GeneralNews');

module.exports = {
  createNews(newsObj) {
    return GeneralNews.create(newsObj);
  },
  getNews() {
    return GeneralNews.find();
  },
  getNewsById(newsId) {
    return GeneralNews.findById(newsId);
  },
  getNewsByParams(filter) {
    return GeneralNews.find(filter);
  },
  updateNews(newsId, newsObj) {
    return GeneralNews.findOneAndUpdate({_id: newsId}, newsObj, {new: true});
  },
  deleteNews(newsId) {
    return GeneralNews.deleteOne({_id: newsId});
  },
};
