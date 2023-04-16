const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {markValidator} = require("../validators");
const {markService} = require("../services");

module.exports = {

    checkMarkBodyIsValid: (req, res, next) => {
        try {
            const validate = markValidator.markBodyValidator.validate(req.body);
            if (validate.error) {
                return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
            }
            req.body = validate.value;
            next()
        } catch (e) {
            next(e)
        }
    },

    checkMarkIsExist: (from= 'params') => async (req, res, next) => {
        try {
            const {markId} = req[from];
            const markById = await markService.getMarkById(markId)
            if (!markById) {
                return next(new LocalError('Mark is not exist', statusCodes.NOT_FOUND))
            }
            req.mark = markById;

            next()
        } catch (e) {
            next(e)
        }
    },
}
