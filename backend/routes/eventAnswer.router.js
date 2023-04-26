const {Router} = require('express');

const {eventAnswerController} = require('../controllers');
const {forAllMiddleware, authMiddleware, eventAnswerMiddleware,
  userEventMiddleware
} = require('../middlewares');
const {tokenTypes} = require('../constants');

const eventAnswerRouter = Router();

eventAnswerRouter.get('/',eventAnswerController.getEventAnswers);

eventAnswerRouter.post('/',
  eventAnswerMiddleware.checkAnswerBodyIsValid,
  forAllMiddleware.checkIdIsValid('eventId','query'),
  userEventMiddleware.checkUserEventIsExist('query'),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  eventAnswerController.createEventAnswer);

eventAnswerRouter.get('/:answId',
  forAllMiddleware.checkIdIsValid('answId'),
  eventAnswerMiddleware.checkEventAnswerIsExist(),
  eventAnswerController.getEventAnswerById);

eventAnswerRouter.patch('/:answId',
  eventAnswerMiddleware.checkAnswerBodyIsValid,
  forAllMiddleware.checkIdIsValid('answId'),
  eventAnswerMiddleware.checkEventAnswerIsExist(),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkUserIdInEntity('eventAnswer'),
  eventAnswerController.updateEventAnswer);

eventAnswerRouter.delete('/:answId',
  forAllMiddleware.checkIdIsValid('answId'),
  eventAnswerMiddleware.checkEventAnswerIsExist(),
  authMiddleware.checkToken(tokenTypes.ACCESS_TYPE),
  forAllMiddleware.checkUserIdInEntity('eventAnswer'),
  eventAnswerController.deleteEventAnswer);

module.exports = eventAnswerRouter;
