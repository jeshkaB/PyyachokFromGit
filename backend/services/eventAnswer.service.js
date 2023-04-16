const EventAnswer = require("../dataBase/EventAnswer");

module.exports = {
    createEventAnswer(answObj) {
        return EventAnswer.create(answObj)
    },
    getEventAnswers() {
        return EventAnswer.find()
    },
    getEventAnswerById(answId) {
        return EventAnswer.findById(answId)
    },
    getEventAnswersByParams(filter) {
        return EventAnswer.find(filter)
    },
    updateEventAnswer(answId, answObj) {
        return EventAnswer.findOneAndUpdate({_id: answId}, answObj, {new: true})
    },
    deleteEventAnswer(answId) {
        return EventAnswer.deleteOne({_id: answId})
    },
}
