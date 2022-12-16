const {hashService, userService} = require("../services");
const {LocalError} = require("../errors");
const {statusCode} = require("../constants");
const {userValidator} = require("../validators");
const statusCodes = require("../constants/statusCodes");

module.exports = {
    checkLoginBodyIsValid: (req, res, next) => {
        try {
            const validate = userValidator.loginUserValidator.validate(req.body);
            if (validate.error) {
                return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
            }
            req.body = validate.value;
            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsPasswordSame: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {_id} = req.user;
            const {password: hashPassword} = await userService.getUserById(_id);
            await hashService.comparePasswords(password, hashPassword);

            next()
        } catch (e) {
            next(e)
        }
    },
}
