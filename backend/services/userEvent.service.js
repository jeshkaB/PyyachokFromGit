const UserEvent = require("../dataBase/UserEvent");

module.exports = {
    createUserEvent(eventObj) {
        return UserEvent.create(eventObj)
    },
    getUserEvents() {
        return UserEvent.find().populate({path: 'restaurant', select: 'name'})
    },
    getUserEventById(eventId) {
        return UserEvent.findById(eventId).populate({path:'eventAnswers', populate: {path: 'user', select: 'name'}})
    },
    getUserEventByParams(filter) {
        return UserEvent.find(filter)
    },
    updateUserEvent(eventId, eventObj) {
        return UserEvent.findOneAndUpdate({_id: eventId}, eventObj, {new: true})
    },
    deleteUserEvent(eventId) {
        return UserEvent.deleteOne({_id: eventId})
    },
}
