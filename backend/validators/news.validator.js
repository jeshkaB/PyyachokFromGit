const Joi = require('joi');
const {LocalError} = require("../errors");
const {BAD_REQUEST} = require("../constants/statusCodes");

const newsTitleValidator = Joi.string().min(3).max(50).trim().error(new LocalError('title is not valid', BAD_REQUEST));
const newsContentValidator = Joi.string().min(100).max(2000).error(new LocalError('content is not valid', BAD_REQUEST));
const newsCategoryValidator = Joi.string().valid('основна','подія','акція').error(new LocalError('category is not valid', BAD_REQUEST));

//TODO написати помилки, написати валідатор для mainImage - required, тип - ?

const newNewsBodyValidator = Joi.object({
    title: newsTitleValidator.required(),
    content: newsContentValidator.required(),
    category: newsCategoryValidator.required()
});

const updateNewsBodyValidator = Joi.object({
    title: newsTitleValidator,
    content: newsContentValidator,
    category: newsCategoryValidator
});

module.exports = {
    newNewsBodyValidator,
    updateNewsBodyValidator
}

