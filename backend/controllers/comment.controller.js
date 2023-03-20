const {commentService, userService, restaurantService} = require("../services");
const {statusCode} = require("../constants");


module.exports = {
    createComment: async (req, res, next) => {
        try {

            const {_id} = req.tokenInfo.user;
            const {restId} = req.query;

            const restaurantComments = await commentService.getCommentsByParams({restaurant: restId});
            const userComments = await commentService.getCommentsByParams({user: _id});

            const comment = await commentService.createComment({...req.body, user: _id, restaurant: restId});

            await userService.updateUser(_id, {
                comments: [
                    ...userComments,
                    comment
                ]
            });

            await restaurantService.updateRestaurant(restId, {
                comments: [
                    ...restaurantComments,
                    comment
                ]
            });

            res.status(statusCode.CREATE).json(comment)

        } catch (e) {
            next(e)
        }
    },
    getComments: async (req, res, next) => {
        try {
            const comments = await commentService.getComments();
            res.json(comments)
        } catch (e) {
            next(e)
        }
    },
    getCommentById: async (req, res, next) => {
        try {
            const {comId} = req.params;
            const comment = await commentService.getCommentById(comId);
            res.json(comment)
        } catch (e) {
            next(e)
        }
    },
    updateComment: async (req, res, next) => {
        try {
            const {comId} = req.params;
            const comment = await commentService.updateComment(comId, req.body);

            res.json(comment)
//обновити в юзерів і ресторанів - не треба, бо в юзерах і ресторанах зберігаються тільки айдішкі коментів
        } catch (e) {
            next(e)
        }
    },
    deleteComment: async (req, res, next) => {
        try {
            const {comId} = req.params;
            const {user, restaurant} = await commentService.getCommentById(comId);//ресторан - айдішка, юзер - об'єкт

            await commentService.deleteComment(comId);

            const userComments = await commentService.getCommentsByParams({user: user._id});
            const upUserComments = userComments.filter(item => item._id !== comId)
            await userService.updateUser(user._id, {
                comments: upUserComments
            });

            const restaurantComments = await commentService.getCommentsByParams({restaurant});
            const upRestaurantComments = restaurantComments.filter(item => item._id !== comId)
            await restaurantService.updateRestaurant(restaurant, {
                comments: upRestaurantComments
            });

            res.status(statusCode.NO_CONTENT).json()

        } catch (e) {
            next(e)
        }
    }
}
