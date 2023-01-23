const {markService, userService, restaurantService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    createMark: async (req, res, next) => {
        try {
            const {_id} = req.tokenInfo.user;
            const {restId} = req.query;

            const restaurantMarks = await markService.getMarksByParams({restaurant: restId});
            const userMarks = await markService.getMarksByParams({user: _id});

            const mark = await markService.createMark({...req.body, user: _id, restaurant: restId});
            const rating = restaurantMarks.reduce((accumulator, currentValue) => accumulator + currentValue.mark, mark.mark) /(restaurantMarks.length+1)

            await userService.updateUser(_id, {
                marks: [...userMarks,mark]
            });

            await restaurantService.updateRestaurant(restId, {
                marks: [...restaurantMarks,mark],
                rating
            });

            res.status(statusCode.CREATE).json(mark)

        } catch (e) {
            next(e)
        }
    },

    getMarks: async (req, res, next) => {
        try {
            const marks = await markService.getMarks();
            res.json(marks)

        } catch (e) {
            next(e)
        }
    },

    getMarkById: async (req, res, next) => {
        try {
            const {markId} = req.params;
            const mark = await markService.getMarkById(markId);
            res.json(mark)

        } catch (e) {
            next(e)
        }
    },
    updateMark: async (req, res, next) => {
        try {
            const {markId} = req.params;
            const mark = await markService.updateMark(markId, req.body);
            res.json(mark)

        } catch (e) {
            next(e)
        }
    },

    deleteMark: async (req, res, next) => {//TODO юзер може видаляти свою оцінку?
        try {
            const {markId} = req.params;
            const {user,restaurant} = await markService.getMarkById(markId);

            await markService.deleteMark(markId);

            const userMarks = await markService.getMarksByParams({user});
            const upUserMarks = userMarks.filter(item=>item._id!==markId)
            await userService.updateUser(user, {marks: upUserMarks
            });

            const restaurantMarks = await markService.getMarksByParams({restaurant});
            const upRestaurantMarks = restaurantMarks.filter(item=>item._id !==markId)
            await restaurantService.updateRestaurant(restaurant, {marks: upRestaurantMarks
            });

            res.status(statusCode.NO_CONTENT).json()

        } catch (e) {
            next(e)
        }
    }
}
