const Joi = require('joi');

const {LocalError} = require('../errors');
const {BAD_REQUEST} = require('../constants/statusCodes');


module.exports = {

  commentBodyValidator: Joi.object({
    comment: Joi.string().trim()
      .min(3)
      .max(500)
      .required()
      .error(new LocalError('comment is not valid', BAD_REQUEST)),
    bill: Joi.number().error(new LocalError('bill is not a number', BAD_REQUEST)),
  }
  )
};

