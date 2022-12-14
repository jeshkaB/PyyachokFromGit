const {userValidator} = require("../validators");
const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {userService} = require("../services");

module.exports = {

    checkUserBodyIsValid: (req, res, next) => {
        try {
            const validate = userValidator.newUserBodyValidator.validate(req.body);
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
            const userByEmail = await userService.getUserByParams({email})
            if (userByEmail) {
                return next(new LocalError('Email is already exist', statusCodes.CONFLICT))
            }

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
                return next (new LocalError('User is not exist', statusCodes.NOT_FOUND))
            }
            // req.user = user;
           next()
        }catch (e) {
            next(e)
        }

    }
}
