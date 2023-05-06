const {userEventValidator} = require('../validators');
const {LocalError} = require('../errors');
const statusCodes = require('../constants/statusCodes');
const {userEventService} = require('../services');


module.exports = {
  checkNewUserEventBodyIsValid: (req, res, next) => {
    try {
      const validate = userEventValidator.newEventBodyValidator.validate(req.body);
      if (validate.error) {
        return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
      }
      req.body = validate.value;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkUpdateUserEventBodyIsValid: (req, res, next) => {
    try {
      const validate = userEventValidator.updateEventBodyValidator.validate(req.body);
      if (validate.error) {
        return next(new LocalError(validate.error.message, statusCodes.BAD_REQUEST));
      }
      req.body = validate.value;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserEventIsExist: (from='params') => async (req, res, next) => {
    try {
      const {eventId} = req[from];

      const eventById = await userEventService.getUserEventById(eventId);
      if (!eventById) {
        return next(new LocalError('event is not exist', statusCodes.NOT_FOUND));
      }
      req.userEvent = eventById;

      next();
    } catch (e) {
      next(e);
    }
  },
};
