const {restaurantValidator} = require("../validators");
const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {userService, restaurantService} = require("../services");

module.exports = {

    checkNewRestaurantBodyIsValid: (req, res, next) => {
        try {
            const validate = restaurantValidator.newRestaurantBodyValidator.validate(req.body);
            if (validate.error) {
                return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
            }
            req.body = validate.value;
            next()
        } catch (e) {
            next(e)
        }
    },

    checkUpdateRestaurantBodyIsValid: (req, res, next) => {
        try {
            const validate = restaurantValidator.updateRestaurantBodyValidator.validate(req.body);
            if (validate.error) {
                return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
            }
            req.body = validate.value;
            next()
        } catch (e) {
            next(e)
        }
    },

    checkUserIsExist: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const userById = await userService.getUserById(userId);
            if (!userById) {
                return next(new LocalError('User is not exist', statusCodes.NOT_FOUND))
            }
            // req.user = user;
            next()
        } catch (e) {
            next(e)
        }
    },

        checkEmailIsUnique: async (req, res, next) => {
        const {email} = req.body;
        try {
            const restaurantByEmail = await restaurantService.getRestaurantByParams({email})
            if (restaurantByEmail) {
                return next(new LocalError('Email is already exist', statusCodes.CONFLICT))
            }

            next()
        } catch (e) {
            next(e)
        }
    },

    checkRestaurantIsExist: async (req, res, next) => {
        try {
            const {restId} = req.params;
            const restaurantById = await restaurantService.getRestaurantById(restId)
            if (!restaurantById) {
                return next(new LocalError('Restaurant is not exist', statusCodes.NOT_FOUND))
            }
            req.restaurant = restaurantById;
            next()
        } catch (e) {
            next(e)
        }
    },
}
