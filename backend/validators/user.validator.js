const Joi = require('joi');
const {PASSWORD} = require("../constants/regex");
const {BAD_REQUEST} = require("../constants/statusCodes");
const {LocalError} = require("../errors");


const userNameValidator = Joi.string().alphanum().min(5).max(20).trim().error(new LocalError('name is not valid', BAD_REQUEST));
const emailValidator = Joi.string().email().error(new LocalError('email is not valid', BAD_REQUEST));
const passwordValidator = Joi.string().regex(PASSWORD).error(new LocalError('password is not valid', BAD_REQUEST));

const newUserBodyValidator = Joi.object({
        name: userNameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required()
    }
);
const updateUserBodyValidator = Joi.object({
        name: userNameValidator,
        email: emailValidator,
        password: passwordValidator
    }
);


module.exports = {
    newUserBodyValidator,
    updateUserBodyValidator
}
