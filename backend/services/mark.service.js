const Mark = require("../dataBase/Mark");

module.exports = {
    createMark(markObj) {
        return Mark.create(markObj)
    },
    getMarks() {
        return Mark.find()
    },
    getMarkById(markId) {
        return Mark.findById(markId)
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
