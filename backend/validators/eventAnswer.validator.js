const Joi = require('joi');

const {LocalError} = require('../errors');
const {BAD_REQUEST} = require('../constants/statusCodes');


module.exports = {

  answerBodyValidator: Joi.object({
    answer: Joi.string().trim()
      .min(3)
      .max(240)
      .required()
      .error(new LocalError('answer is not valid', BAD_REQUEST)),
  }
  )
};

