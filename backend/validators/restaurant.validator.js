const Joi = require('joi');
const {LocalError} = require("../errors");
const {BAD_REQUEST} = require("../constants/statusCodes");
const {regex} = require("../constants");


const restaurantNameValidator = Joi.string().max(20).trim().error(new LocalError('name is not valid', BAD_REQUEST));
const placeValidator = Joi.string().trim();
const averageBillValidator = Joi.number();
const hoursValidator = Joi.string();
const tagsValidator = Joi.array().items(Joi.string());
const categoriesValidator = Joi.array().items(Joi.string());
const phoneValidator = Joi.string().regex(regex.PHONE);
const restaurantEmailValidator = Joi.string().email();
const webSiteValidator = Joi.string().regex(regex.WEBSITE);

const newRestaurantBodyValidator = Joi.object({
        name: restaurantNameValidator.required(),
        place: placeValidator.required(),
        averageBill: averageBillValidator.required(),
        hours: hoursValidator.required(),
        tags: tagsValidator,
        categories: categoriesValidator.required(),
        phone: phoneValidator.required(),
        email: restaurantEmailValidator.required(),
        webSite: webSiteValidator.required()

    }
);
const updateRestaurantBodyValidator = Joi.object({
        name: restaurantNameValidator,
        place: placeValidator,
        averageBill: averageBillValidator,
        hours: hoursValidator,
        tags: tagsValidator,
        categories: categoriesValidator,
        phone: phoneValidator,
        email: restaurantEmailValidator,
        webSite: webSiteValidator
    }
)

module.exports = {
    newRestaurantBodyValidator,
    updateRestaurantBodyValidator
}
