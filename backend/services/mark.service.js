const Mark = require("../dataBase/Mark");

module.exports = {
    createMark(markObj) {
        return Mark.create(markObj)
    },
    getMarks() {
        return Mark.find().populate('restaurant')
    },
    getMarkById(markId) {
        return Mark.findById(markId).populate('user')
    },
    getMarksByParams(filter) {
        return Mark.find(filter)
    },
    updateMark(markId, markObj) {
        return Mark.findOneAndUpdate({_id: markId}, markObj, {new: true})
    },
    deleteMark(markId) {
        return Mark.deleteOne({_id: markId})
    },
}
