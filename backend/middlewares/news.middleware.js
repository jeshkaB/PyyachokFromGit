const {newsValidator} = require('../validators');
const {LocalError} = require('../errors');
const statusCodes = require('../constants/statusCodes');
const {newsService} = require('../services');

module.exports = {
  checkNewNewsBodyIsValid: (req, res, next) => {
    try {
      const validate = newsValidator.newNewsBodyValidator.validate(req.body);
      //TODO тут треба перевірити на валідність фотки - поки в мене передбачений тільки тип "jpg"
      if (validate.error) {
        return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
      }
      req.body = validate.value;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkUpdateNewsBodyIsValid: (req, res, next) => {
    try {
      const validate = newsValidator.updateNewsBodyValidator.validate(req.body);
      //TODO тут треба перевірити на валідність фотки - поки в мене передбачений тільки тип "jpg"
      if (validate.error) {
        return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
      }
      req.body = validate.value;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkNewsIsExist: (from='params') => async (req, res, next) => {
    try {
      const {newsId} = req[from];

      const newsById = await newsService.getNewsById(newsId);
      if (!newsById) {
        return next(new LocalError('News is not exist', statusCodes.NOT_FOUND));
      }
      req.news = newsById;

      next();
    } catch (e) {
      next(e);
    }
  },
};
