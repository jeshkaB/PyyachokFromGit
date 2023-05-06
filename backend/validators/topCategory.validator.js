const Joi = require('joi');

const {LocalError} = require('../errors');
const {BAD_REQUEST} = require('../constants/statusCodes');


module.exports = {

  topCategoryBodyValidator: Joi.object({
    title: Joi.string().trim()
      .min(3)
      .max(500)
      .required()
      .error(new LocalError('top category is not valid', BAD_REQUEST)),
  }
  )
};

