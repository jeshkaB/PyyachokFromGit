const Joi = require('joi');
const {PASSWORD} = require("../constants/regex");
const {BAD_REQUEST} = require("../constants/statusCodes");
const {LocalError} = require("../errors");


const userNameValidator = Joi.string().alphanum().min(5).max(20).trim();
const emailValidator = Joi.string().email().error(new LocalError('email is not valid', BAD_REQUEST));
const passwordValidator = Joi.string().regex(PASSWORD).error(new LocalError ('password is not valid', BAD_REQUEST))


