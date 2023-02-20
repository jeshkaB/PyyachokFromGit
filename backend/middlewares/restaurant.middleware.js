const {restaurantValidator} = require("../validators");
const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {userService, restaurantService} = require("../services");

module.exports = {

    checkNewRestaurantBodyIsValid: (req, res, next) => {
        try {
            console.log(req.body)
            const validate = restaurantValidator.newRestaurantBodyValidator.validate(req.body);
            //TODO тут треба перевірити на валідність фотки - поки в мене передбачений тільки тип "jpg"
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
            //TODO тут треба перевірити на валідність фотки - поки в мене передбачений тільки тип "jpg"
            if (validate.error) {
                return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
            }
            req.body = validate.value;
            next()
        } catch (e) {
            next(e)
        }
    },

           checkEmailIsUnique: async (req, res, next) => {
        const {email} = req.body;
        try {
            const restaurantByEmail = await restaurantService.getRestaurantByParams({email});
            //getByParams повертає масив, а пустий масив - це true
            if (restaurantByEmail.length>0) {
                return next(new LocalError('Email is already exist', statusCodes.CONFLICT))
            }

            next()
        } catch (e) {
            next(e)
        }
    },

    checkRestaurantIsExist: (from='params') => async (req, res, next) => {
        try {
            const {restId} = req[from];

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
