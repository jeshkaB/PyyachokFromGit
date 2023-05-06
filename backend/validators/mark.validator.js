const Joi = require('joi');
const {LocalError} = require('../errors');
const {BAD_REQUEST} = require('../constants/statusCodes');


module.exports = {
  markBodyValidator: Joi.object({
    mark: Joi.number().min(1)
      .max(5)
      .required()
      .error(new LocalError('mark is not valid', BAD_REQUEST))
  }
  )
};


