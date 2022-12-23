const {userService, hashService} = require('../services');
const {statusCode, roles} = require('../constants')

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const hashPassword = await hashService.hashPassword(req.body.password);
            const user = await userService.createUser({...req.body, password: hashPassword,});
            res.status(statusCode.CREATE).json(user)
        } catch (e) {
            next(e)
        }
    },

    createUserAsRestaurantAdmin: async (req, res, next) => {
        try {
            const hashPassword = await hashService.hashPassword(req.body.password);
            const user = await userService.createUser({...req.body, password: hashPassword, role: [roles.USER, roles.REST_ADMIN]});
            res.status(statusCode.CREATE).json(user)
        } catch (e) {
            next(e)
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getUsers();
            res.json(users)
        } catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userService.getUserById(userId);
            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userService.updateUser(userId, req.body);
            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            await userService.deleteUser(userId);
            res.status(statusCode.NO_CONTENT).json()
        } catch (e) {
            next(e)
        }
    },
}
