const {userService, restaurantService, userEventService, eventAnswerService} = require('../services');
const {statusCode} = require('../constants');

module.exports = {
  createUserEvent: async (req, res, next) => {
    try {
      const {_id} = req.tokenInfo.user;
      const {restId} = req.query;

      const restaurantUserEvents = await userEventService.getUserEventByParams({restaurant: restId});
      const userUserEvents = await userEventService.getUserEventByParams({user: _id});

      const event = await userEventService.createUserEvent({...req.body, user: _id, restaurant: restId});

      await userService.updateUser(_id, {
        userEvents: [
          ...userUserEvents,
          event
        ]
      });

      await restaurantService.updateRestaurant(restId, {
        userEvents: [
          ...restaurantUserEvents,
          event
        ]
      });

      res.status(statusCode.CREATE).json(event);

    } catch (e) {
      next(e);
    }
  },

  getUserEvents: async (req, res, next) => {
    try {
      const events = await userEventService.getUserEvents();
      res.json(events);

    } catch (e) {
      next(e);
    }
  },

  getUserEventById: async (req, res, next) => {
    try {
      const {eventId} = req.params;
      const event = await userEventService.getUserEventById(eventId);
      res.json(event);
    } catch (e) {
      next(e);
    }
  },
  updateUserEvent: async (req, res, next) => {
    try {
      const {eventId} = req.params;
      const event = await userEventService.updateUserEvent(eventId, req.body);

      res.json(event);

    } catch (e) {
      next(e);
    }
  },

  deleteUserEvent: async (req, res, next) => {
    try {
      const {eventId} = req.params;
      const {user,restaurant} = await userEventService.getUserEventById(eventId); //user - об1єкт, ресторан - айдішка

      //видаляємо відповіді на подію
      const eventAnswers = await eventAnswerService.getEventAnswersByParams({userEvent:eventId});
      eventAnswers.map(id=> eventAnswerService.deleteEventAnswer(id));

      //видаляємо подію з юзера
      const eventsOfUser = await userEventService.getUserEventByParams({user:user._id});
      const index1 = eventsOfUser.findIndex(event=>event._id===eventId);
      const newEventsListOfUser = eventsOfUser.splice(index1,1);
      await userService.updateUser(user._id, {userEvents: newEventsListOfUser});

      //видаляємо подію з ресторану
      const eventsOfRest= await userEventService.getUserEventByParams({restaurant});
      const index2 = eventsOfRest.findIndex(event=>event._id===eventId);
      const newEventsListOfRest = eventsOfRest.splice(index2,1);
      await restaurantService.updateRestaurant(restaurant, {userEvents: newEventsListOfRest});

      await userEventService.deleteUserEvent(eventId);

      res.status(statusCode.NO_CONTENT).json();

    } catch (e) {
      next(e);
    }
  }
};
