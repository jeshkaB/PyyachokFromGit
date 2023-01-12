const Joi = require('joi');

const {LocalError} = require("../errors");
const {BAD_REQUEST} = require("../constants/statusCodes");

const bodyValidator = Joi.string().trim()
// const billValidator = Joi.number().integer().positive();

const newCommentBodyValidator = Joi.object({
        comment: bodyValidator.required().error(new LocalError('comment body is not valid', BAD_REQUEST)),
        // bill: billValidator.required().error(new LocalError('bill is not valid', BAD_REQUEST)),
    }
);

const updateCommentBodyValidator = Joi.object({
        comment: bodyValidator.error(new LocalError('comment body is not valid', BAD_REQUEST)),
        // bill: billValidator.error(new LocalError('bill is not valid', BAD_REQUEST)),
    }
);

module.exports = {
    newCommentBodyValidator,
    updateCommentBodyValidator
}




