const {userService, hashService, fileService} = require('../services');
const {statusCode, roles, pathImg} = require('../constants')
const uuid = require('uuid')

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const hashPassword = await hashService.hashPassword(req.body.password);
            if (req.files.length > 0) {
                const {buffer} = req.files[0];
                const fileName = uuid.v4() + '.jpg';
                await fileService.writeFile(pathImg.PATH_AVATAR, fileName, buffer)
                const user = await userService.createUser({...req.body, password: hashPassword, avatar: fileName});
                res.status(statusCode.CREATE).json(user)
            }
            else {
                const user = await userService.createUser({...req.body, password: hashPassword});
                res.status(statusCode.CREATE).json(user)
            }
        } catch (e) {
            next(e)
        }
    },

    createUserAsRestaurantAdmin: async (req, res, next) => {
        try {
            const hashPassword = await hashService.hashPassword(req.body.password);
            if (req.files.length > 0) {
                const {buffer} = req.files[0];
                const fileName = uuid.v4() + '.jpg';
                await fileService.writeFile(pathImg.PATH_AVATAR, fileName, buffer)
                const user = await userService.createUser({
                    ...req.body,
                    password: hashPassword,
                    avatar: fileName,
                    role: [roles.USER, roles.REST_ADMIN]
                })
                res.status(statusCode.CREATE).json(user)
            } else {
                const user = await userService.createUser({
                    ...req.body,
                    password: hashPassword,
                    role: [roles.USER, roles.REST_ADMIN]
                })
                res.status(statusCode.CREATE).json(user)
            }

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
            // const avatarBuffer = await fileService.readFile(pathImg.PATH_AVATAR, user.avatar)
            // res.json({...user, avatarBuffer})

            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userService.updateUser(userId, req.body);

            if (req.files) {//TODO length >0?
                const fileName = user.avatar;
                const {buffer} = req.files[0];
                await fileService.writeFile(pathImg.PATH_AVATAR, fileName, buffer)
            }

            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const {avatar} = await userService.getUserById(userId);

            await userService.deleteUser(userId);

            res.status(statusCode.NO_CONTENT).json()

            if (avatar)
                await fileService.deleteFile(pathImg.PATH_AVATAR, avatar)

        } catch (e) {
            next(e)
        }
    },
}
