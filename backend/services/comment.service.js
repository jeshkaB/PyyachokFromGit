const Comment = require('../dataBase/Comment')

module.exports = {
    createComment(commentObj) {
        return Comment.create(commentObj)
    },
    getComments() {
        return Comment.find().sort({createdAt:-1})
    },
    getCommentById(comId) {
        return Comment.findById(comId)
    },
    getCommentsByParams(filter) {
        return Comment.find(filter).sort({createdAt:-1})
    },
    updateComment(comId, commentObj) {
        return Comment.findOneAndUpdate({_id: comId}, commentObj, {new: true})
    },
    deleteComment(comId) {
        return Comment.deleteOne({_id: comId})
    },

}
