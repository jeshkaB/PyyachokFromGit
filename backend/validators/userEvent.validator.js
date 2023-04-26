const Joi = require('joi');

const {BAD_REQUEST} = require('../constants/statusCodes');
const {LocalError} = require('../errors');
const {TIME} = require('../constants/regex');

const dateValidator = Joi.date().iso()
  .greater('now')
  .less(`${new Date().setMonth(new Date().getMonth()+1)}`);//формат дати 2022-12-31
const timeValidator = Joi.string().trim()
  .regex(TIME);// в форматі HH:MM
const purposeValidator = Joi.string().min(3)
  .max(500);
const otherInfoValidator = Joi.string().min(3)
  .max(500);


const newEventBodyValidator = Joi.object({
  date: dateValidator.required().error(new LocalError('date is not valid', BAD_REQUEST)),
  time: timeValidator.required().error(new LocalError('time is not valid', BAD_REQUEST)),
  purpose: purposeValidator.required().error(new LocalError('purpose is not valid', BAD_REQUEST)),
  otherInformation: otherInfoValidator.error(new LocalError('other information is not valid', BAD_REQUEST)),

}
);
const updateEventBodyValidator = Joi.object({
  date: dateValidator.error(new LocalError('date is not valid', BAD_REQUEST)),
  time: timeValidator.error(new LocalError('time is not valid', BAD_REQUEST)),
  purpose: purposeValidator.error(new LocalError('purpose is not valid', BAD_REQUEST)),
  otherInformation: otherInfoValidator.error(new LocalError('other information is not valid', BAD_REQUEST)),
}
);
module.exports = {
  newEventBodyValidator,
  updateEventBodyValidator
};
