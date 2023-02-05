const Joi = require('joi');
const {PASSWORD} = require("../constants/regex");
const {BAD_REQUEST} = require("../constants/statusCodes");
const {LocalError} = require("../errors");
const {roles} = require("../constants");


const userNameValidator = Joi.string().alphanum().min(3).max(20).trim().error(new LocalError('name is not valid', BAD_REQUEST));
const emailValidator = Joi.string().trim().email();
const passwordValidator = Joi.string().trim().regex(PASSWORD);
const oldPasswordValidator = Joi.string()
const roleValidator = Joi.array().items(Joi.string().valid(roles.USER, roles.REST_ADMIN, roles.SUPER_ADMIN)).error(new LocalError('role is not valid', BAD_REQUEST));

const newUserBodyValidator = Joi.object({
        name: userNameValidator.required(),
        email: emailValidator.required().error(new LocalError('email is not valid', BAD_REQUEST)),
        password: passwordValidator.required().error(new LocalError('password is not valid', BAD_REQUEST)),
        role: roleValidator
    }
);
const updateUserBodyValidator = Joi.object({
        name: userNameValidator,
        email: emailValidator.error(new LocalError('email is not valid', BAD_REQUEST)),
        password: passwordValidator.error(new LocalError('password is not valid', BAD_REQUEST)),
    }
);

const loginUserValidator = Joi.object({
    email: emailValidator.required().error(new LocalError('email or password is wrong', BAD_REQUEST)),
    password: passwordValidator.required().error(new LocalError('email or password is wrong', BAD_REQUEST)),
});

const changePasswordValidator = Joi.object({
    newPassword: passwordValidator.required().error(new LocalError('password is not valid', BAD_REQUEST)),
    oldPassword: oldPasswordValidator,
});

module.exports = {
    newUserBodyValidator,
    updateUserBodyValidator,
    loginUserValidator,
    changePasswordValidator
}
