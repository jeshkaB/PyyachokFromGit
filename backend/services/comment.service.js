const Comment = require('../dataBase/Comment')

module.exports = {
    createComment(commentObj) {
        return Comment.create(commentObj)
    },
    getComments() {
        return Comment.find()
    },
    getCommentById(comId) {
        return Comment.findById(comId)
    },
    getCommentsByParams(filter) {
        return Comment.find(filter)
    },
    updateComment(comId, commentObj) {
        return Comment.findOneAndUpdate({_id: comId}, commentObj, {new: true})
    },
    deleteComment(comId) {
        return Comment.deleteOne({_id: comId})
    },

}
