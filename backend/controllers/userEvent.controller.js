const {commentService, userService, restaurantService, userEventService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    createUserEvent: async (req, res, next) => {
        try {
            const {_id} = req.tokenInfo.user;
            const {restId} = req.query;

            const restaurantUserEvents = await userEventService.getUserEventByParams({restaurant: restId});
            const userUserEvents = await userEventService.getUserEventByParams({user: _id});

            const event = await userEventService.createUserEvent({...req.body, user: _id, restaurant: restId});

            await userService.updateUser(_id, {
                userEvents: [...userUserEvents,event]
            });

            await restaurantService.updateRestaurant(restId, {
                userEvents: [...restaurantUserEvents, event]
            });

            res.status(statusCode.CREATE).json(event)

        } catch (e) {
            next(e)
        }
    },

    getUserEvents: async (req, res, next) => {
        try {
            const events = await userEventService.getUserEvents()
            res.json(events)

        } catch (e) {
            next(e)
        }
    },

    getUserEventById: async (req, res, next) => {
        try {
            const {eventId} = req.params;
            const event = await userEventService.getUserEventById(eventId);
            res.json(event)
        } catch (e) {
            next(e)
        }
    },
    updateUserEvent: async (req, res, next) => {
        try {
            const {eventId} = req.params;
            const event = await userEventService.updateUserEvent(eventId, req.body);

            res.json(event)

        } catch (e) {
            next(e)
        }
    },

    deleteUserEvent: async (req, res, next) => {//TODO працює але зависaє
        try {
            const {eventId} = req.params;
            const {user,restaurant} = await userEventService.getUserEventById(eventId);

            await userEventService.deleteUserEvent(eventId);

            const userUserEvents = await userEventService.getUserEventByParams({user});
            const upUserUserEvents = userUserEvents.filter(item=>item._id!==eventId)
            await userService.updateUser(user, {
                userEvents: upUserUserEvents
            });

            const restaurantUserEvents = await userEventService.getUserEventByParams({restaurant});
            const upRestaurantUserEvents = restaurantUserEvents.filter(item=>item._id !==eventId)
            await restaurantService.updateRestaurant(restaurant, {
                userEvents: upRestaurantUserEvents
            });

            res.status(statusCode.NO_CONTENT).json()

        } catch (e) {
            next(e)
        }
    }
}
