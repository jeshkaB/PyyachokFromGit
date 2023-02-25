const Joi = require('joi');
const {LocalError} = require("../errors");
const {BAD_REQUEST} = require("../constants/statusCodes");
const {regex, coordinatesLimit} = require("../constants");

const restaurantNameValidator = Joi.string().max(20).trim().error(new LocalError('name is not valid', BAD_REQUEST));
const placeValidator = Joi.string().trim().error(new LocalError('place is not valid', BAD_REQUEST));
const averageBillValidator = Joi.number().error(new LocalError('average bill is not valid', BAD_REQUEST));
const webSiteValidator = Joi.string().regex(regex.WEBSITE).error(new LocalError('web site is not valid', BAD_REQUEST));
const hoursValidator = Joi.string().error(new LocalError('hours is not valid', BAD_REQUEST));
const tagsValidator = Joi.string().error(new LocalError('tag is not valid', BAD_REQUEST));
// const categoriesValidator = Joi.array().items(Joi.string()).error(new LocalError('category is not valid', BAD_REQUEST));
const phoneValidator = Joi.string().regex(regex.PHONE).error(new LocalError('phone is not valid', BAD_REQUEST));
const restaurantEmailValidator = Joi.string().email().error(new LocalError('email is not valid', BAD_REQUEST));
const moderatedValidator = Joi.boolean().error(new LocalError('moderated is not valid', BAD_REQUEST));
const moderationMessageValidator = Joi.string().min(3).max(50).error(new LocalError('moderation message is not valid', BAD_REQUEST));
const coordinatesValidator = Joi.array().ordered(
    Joi.number().min(coordinatesLimit.LONGITUDE_MIN).max(coordinatesLimit.LONGITUDE_MAX),
    Joi.number().min(coordinatesLimit.LATITUDE_MIN).max(coordinatesLimit.LATITUDE_MAX))
    .description("Please use this format [longitude, latitude]")
    .error(new LocalError('coordinates is not valid', BAD_REQUEST));

//TODO написати валідатор для mainImage - required? Це повинно бути окремо, бо в мідлварі ми валідуємо окремо бади и файлс

const newRestaurantBodyValidator = Joi.object({
        name: restaurantNameValidator.required(),
        place: placeValidator.required(),
        averageBill: averageBillValidator.required(),
        hours: hoursValidator.required(),
        tags: tagsValidator,
        // categories: categoriesValidator,
        phone: phoneValidator.required(),
        email: restaurantEmailValidator.required(),
        webSite: webSiteValidator,
        coordinates: coordinatesValidator.required()


    }
);
const updateRestaurantBodyValidator = Joi.object({
        name: restaurantNameValidator,
        place: placeValidator,
        averageBill: averageBillValidator,
        hours: hoursValidator,
        tags: tagsValidator,
        // categories: categoriesValidator,
        phone: phoneValidator,
        email: restaurantEmailValidator,
        webSite: webSiteValidator,
        moderated: moderatedValidator,
        moderationMessage: moderationMessageValidator,
        coordinates: coordinatesValidator
    }
)

module.exports = {
    newRestaurantBodyValidator,
    updateRestaurantBodyValidator
}
