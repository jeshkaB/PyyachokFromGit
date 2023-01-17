
const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {eventAnswerValidator} = require("../validators");
const {eventAnswerService} = require("../services");


module.exports = {

    checkAnswerBodyIsValid: (req, res, next) => {
        try {
            const validate = eventAnswerValidator.answerBodyValidator.validate(req.body);
            if (validate.error) {
                return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
            }
            req.body = validate.value;
            next()
        } catch (e) {
            next(e)
        }
    },

     checkEventAnswerIsExist: (from= 'params') => async (req, res, next) => {
        try {
            const {answId} = req[from];
            const answerById = await eventAnswerService.getEventAnswerById(answId)
            if (!answerById) {
                return next(new LocalError('Answer is not exist', statusCodes.NOT_FOUND))
            }
            req.eventAnswer = answerById;


            next()
        } catch (e) {
            next(e)
        }
    },
}
