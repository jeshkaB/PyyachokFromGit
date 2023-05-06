
const {LocalError} = require('../errors');
const statusCodes = require('../constants/statusCodes');
const {commentValidator} = require('../validators');
const {commentService} = require('../services');


module.exports = {

  checkCommentBodyIsValid: (req, res, next) => {
    try {
      const validate = commentValidator.commentBodyValidator.validate(req.body);
      if (validate.error) {
        return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
      }
      req.body = validate.value;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkCommentIsExist: (from= 'params') => async (req, res, next) => {
    try {
      const {comId} = req[from];
      const commentById = await commentService.getCommentById(comId);
      if (!commentById) {
        return next(new LocalError('Comment is not exist', statusCodes.NOT_FOUND));
      }
      req.comment = commentById;

      next();
    } catch (e) {
      next(e);
    }
  },
};
