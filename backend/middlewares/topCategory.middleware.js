const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {topCategoryValidator} = require("../validators");
const {topCategoryService} = require("../services");

module.exports = {

    checkTopCategoryBodyIsValid: (req, res, next) => {
        try {
            const validate = topCategoryValidator.topCategoryBodyValidator.validate(req.body);
            if (validate.error) {
                return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
            }
            req.body = validate.value;
            next()
        } catch (e) {
            next(e)
        }
    },

     checkTopCategoryIsExist: (from= 'params') => async (req, res, next) => {
        try {
            const {categId} = req[from];
            const categoryById = await topCategoryService.getTopCategoryById(categId)
            if (!categoryById) {
                return next(new LocalError('top category is not exist', statusCodes.NOT_FOUND))
            }
            req.topCategory = categoryById;

            next()
        } catch (e) {
            next(e)
        }
    },
}
