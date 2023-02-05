const {userService, hashService, fileService} = require('../services');
const {statusCode, roles, pathImg} = require('../constants')
const uuid = require('uuid')
const path = require("path");
const {PATH_AVATAR} = require("../constants/pathImg");
const {comparePasswords} = require("../services/hash.service");


module.exports = {
    createUser: async (req, res, next) => {
        try {
            const hashPassword = await hashService.hashPassword(req.body.password);
            if (req.files) {
                const fileName = uuid.v4() + '.jpg';
                const {avatar: image} = req.files;
                await image.mv(path.resolve(__dirname, '..', PATH_AVATAR, fileName));
                const user = await userService.createUser({...req.body, password: hashPassword, avatar: fileName});
                res.status(statusCode.CREATE).json(user)
            } else {
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
            if (req.files) {
                const fileName = uuid.v4() + '.jpg';
                const {avatar: image} = req.files;
                image.mv(path.resolve(__dirname, '..', PATH_AVATAR, fileName));
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


            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {

        //TODO перевірити що там зі шляхами (заданий прямо і через path)
        try {
            const {userId} = req.params;
            console.log(req.body);
            console.log(req.files)
            if (!req.files) {
                const user = await userService.updateUser(userId, req.body);
                res.json(user)
            } else {
                const {avatar: image} = req.files;
                if (req.user.avatar) {
                    const file = req.user.avatar;
                    await fileService.deleteFile(pathImg.PATH_AVATAR, file);
                    const fileName = uuid.v4() + '.jpg';
                    await image.mv(path.resolve(__dirname, '..', PATH_AVATAR, fileName));
                    const user = await userService.updateUser(userId, {...req.body, avatar: fileName});
                    res.json(user)
                } else {
                    const fileName = uuid.v4() + '.jpg';
                    await image.mv(path.resolve(__dirname, '..', PATH_AVATAR, fileName));
                    const user = await userService.updateUser(userId, {...req.body, avatar: fileName});
                    res.json(user)
                }
            }

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

    updateUserPassword: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const hashPassword = await hashService.hashPassword(req.body.newPassword);
            const user = await userService.updateUser(userId, { password: hashPassword});
            res.json(user)



        } catch (e) {
            next(e)
        }
    },

    //// id ресторану передаємо в query (/users/id/favoriteRest?restId=......)
    addFavoriteRest:
        async (req, res, next) => {
            try {
                const {_id} = req.tokenInfo.user;
                const {restId} = req.query;

                const user = await userService.getUserById(_id)
                const prevFavoriteRestaurants = user.favoriteRestaurants;

                await userService.updateUser(_id, {
                    favoriteRestaurants: [
                        ...prevFavoriteRestaurants,
                        restId
                    ]
                });
                res.status(statusCode.CREATE).json()
            } catch (e) {
                next(e)
            }
        },
    removeFavoriteRest:
        async (req, res, next) => {
            try {
                const {_id} = req.tokenInfo.user;
                const {favoriteRest} = req.query;
                const user = await userService.getUserById(_id)
                const prevFavoriteRestaurants = user.favoriteRestaurants;
                const upFavoriteRestaurants = prevFavoriteRestaurants.filter(item => item === favoriteRest)

                await userService.updateUser(_id, {
                    favoriteRestaurants: upFavoriteRestaurants
                });
                res.status(statusCode.NO_CONTENT).json()

            } catch (e) {
                next(e)
            }
        },
}
