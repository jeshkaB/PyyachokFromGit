const {commentService, userService, restaurantService, eventAnswerService, userEventService} = require("../services");
const {statusCode} = require("../constants");
const {login} = require("./auth.controller");


module.exports = {
    createEventAnswer: async (req, res, next) => {
        try {
            const {_id} = req.tokenInfo.user;
            const {eventId} = req.query;// айдішка події - в квері

            const eventAnswersInUserEvents = await eventAnswerService.getEventAnswersByParams({userEvent: eventId});
            const eventAnswersInUser = await eventAnswerService.getEventAnswersByParams({user: _id});

            const eventAnswer = await eventAnswerService.createEventAnswer({
                ...req.body,
                user: _id,
                userEvent: eventId
            });

            await userService.updateUser(_id, {
                eventAnswers: [...eventAnswersInUser, eventAnswer]
            });

            await userEventService.updateUserEvent(eventId, {
                eventAnswers: [...eventAnswersInUserEvents, eventAnswer]
            });

            res.status(statusCode.CREATE).json(eventAnswer)

        } catch (e) {
            next(e)
        }
    },

    getEventAnswers: async (req, res, next) => {
        try {
            const eventAnswers = await eventAnswerService.getEventAnswers()
            res.json(eventAnswers)

        } catch (e) {
            next(e)
        }
    },

    getEventAnswerById: async (req, res, next) => {
        try {
            const {answId} = req.params;
            const eventAnswer = await eventAnswerService.getEventAnswerById(answId);
            res.json(eventAnswer)
        } catch (e) {
            next(e)
        }
    },
    updateEventAnswer: async (req, res, next) => {
        try {
            const {answId} = req.params;
            const eventAnswer = await eventAnswerService.updateEventAnswer(answId, req.body);

            res.json(eventAnswer)

        } catch (e) {
            next(e)
        }
    },

    deleteEventAnswer: async (req, res, next) => {
        try {
            const {answId} = req.params;
            const {user, userEvent} = await eventAnswerService.getEventAnswerById(answId);//беремо айдішкі юзера і ресторана
            console.log(user)
            await eventAnswerService.deleteEventAnswer(answId);

            const answersInUser = await eventAnswerService.getEventAnswersByParams({user});
            const upAnswersInUser = answersInUser.filter(item => item._id !== answId)
            await userService.updateUser(user, {
                eventAnswer: upAnswersInUser
            });

            const answersInUserEvents = await eventAnswerService.getEventAnswersByParams({userEvent});
            const upAnswersInUserEvents = answersInUserEvents.filter(item => item._id !== answId)
            await userEventService.updateUserEvent(userEvent, {
                eventAnswer: upAnswersInUserEvents
            });

            res.status(statusCode.NO_CONTENT).json()

        } catch (e) {
            next(e)
        }
    }
}
