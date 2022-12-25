const {userValidator} = require("../validators");
const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {userService} = require("../services");

module.exports = {

    checkNewUserBodyIsValid: (req, res, next) => {
        try {
            const validate = userValidator.newUserBodyValidator.validate(req.body);
            //TODO тут треба перевірити на валідність файл аватара - поки в мене передбачений тільки тип "jpg"
            if (validate.error) {
                return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
            }
            req.body = validate.value;
            next()
        } catch (e) {
            next(e)
        }
    },

    checkUpdateUserBodyIsValid: (req, res, next) => {
        try {
            const validate = userValidator.updateUserBodyValidator.validate(req.body);
            //TODO тут треба перевірити на валідність файл аватара - поки в мене передбачений тільки тип "jpg"
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

    checkUserIsExist: (from = 'params') => async (req, res, next) => {
        try {
            const {userId} = req[from];
            const userById = await userService.getUserById(userId);
            if (!userById) {
                return next(new LocalError('User is not exist', statusCodes.NOT_FOUND))
            }
            req.user = userById;
            next()
        } catch (e) {
            next(e)
        }

    },

    checkUserIsExistByEmail: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await userService.getUserByParams({email});
            if (!userByEmail) {
                return next(new LocalError('User is not exist', statusCodes.NOT_FOUND))
            }
            req.user = userByEmail;
            next()
        } catch (e) {
            next(e)
        }
    }
}
