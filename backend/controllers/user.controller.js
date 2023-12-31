const uuid = require('uuid');
const path = require('path');

const {userService, hashService, fileService, authService, nodemailerService} = require('../services');
const {statusCode, roles, pathImg} = require('../constants');
const {PATH_AVATAR} = require('../constants/pathImg');
const {PAGE_LIMIT_USERS} = require('../constants/pageLimit');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const hashPassword = await hashService.hashPassword(req.body.password);
      if (req.files) {
        const fileName = uuid.v4() + '.jpg';
        const {avatar: image} = req.files;
        await image.mv(path.resolve(__dirname, '..', PATH_AVATAR, fileName));
        const userWithPass = await userService.createUser({...req.body, password: hashPassword, avatar: fileName});
        await nodemailerService.sendEmail(userWithPass.email, 'Вхід', 'Ви успішно зараєструвались на сайті "Пиячок"');
        // eslint-disable-next-line no-unused-vars
        const {password, ...user} = userWithPass.toObject();
        res.status(statusCode.CREATE).json(user);
      } else {
        const userWithPass = await userService.createUser({...req.body, password: hashPassword});
        await nodemailerService.sendEmail(userWithPass.email, 'Вхід', 'Ви успішно зараєструвались на сайті "Пиячок"');
        // eslint-disable-next-line no-unused-vars
        const {password, ...user} = userWithPass.toObject();
        res.status(statusCode.CREATE).json(user);
      }
    } catch (e) {
      next(e);
    }
  },

  createUserAsRestaurantAdmin: async (req, res, next) => {
    try {
      const hashPassword = await hashService.hashPassword(req.body.password);
      if (req.files) {
        const fileName = uuid.v4() + '.jpg';
        const {avatar: image} = req.files;
        await image.mv(path.resolve(__dirname, '..', PATH_AVATAR, fileName));
        const userWithPass = await userService.createUser({
          ...req.body,
          password: hashPassword,
          avatar: fileName,
          role: [
            roles.USER,
            roles.REST_ADMIN
          ]
        });
        // eslint-disable-next-line no-unused-vars
        const {password, ...user} = userWithPass.toObject();
        res.status(statusCode.CREATE).json(user);
      } else {
        const userWithPass = await userService.createUser({
          ...req.body,
          password: hashPassword,
          role: [
            roles.USER,
            roles.REST_ADMIN
          ]
        });
        // eslint-disable-next-line no-unused-vars
        const {password, ...user} = userWithPass.toObject();
        res.status(statusCode.CREATE).json(user);
      }

    } catch (e) {
      next(e);
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  },
  getUsersByParams: async (req, res, next) => {
    try {
      const searchParams = req.query;
      const email = searchParams.email ? searchParams.email : '';
      const page = searchParams.page ? searchParams.page : 1;
      const users = await userService.getUsersByParams(email, page);
      const totalItemsByParams = await userService.getCountUsersByParams(email);

      res.json({totalItems:totalItemsByParams, page, limit: PAGE_LIMIT_USERS, users});

    } catch (e) {
      next(e);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const {userId} = req.params;
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  getUserByIdWithoutPass: async (req, res, next) => {
    try {
      const {userId} = req.params;
      const user = await userService.getUserByIdWithoutPass(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const {userId} = req.params;

      if (!req.files) {
        const userWithPass = await userService.updateUser(userId, req.body);
        // eslint-disable-next-line no-unused-vars
        const {password, ...user} = userWithPass.toObject();
        res.json(user);
      } else {
        const {avatar: image} = req.files;
        if (req.user.avatar) {
          const fileName = req.user.avatar;
          await image.mv(path.resolve(__dirname, '..', PATH_AVATAR, fileName));
          // eslint-disable-next-line no-unused-vars
          const userWithPass = await userService.updateUser(userId, req.body);
          const {password, ...user} = userWithPass.toObject();
          res.json(user);
        } else {
          const fileName = uuid.v4() + '.jpg';
          await image.mv(path.resolve(__dirname, '..', PATH_AVATAR, fileName));
          const userWithPass = await userService.updateUser(userId, {...req.body, avatar: fileName});
          // eslint-disable-next-line no-unused-vars
          const {password, ...user} = userWithPass.toObject();
          res.json(user);
        }
      }
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const {userId} = req.params;
      const {avatar} = await userService.getUserById(userId);

      await userService.deleteUser(userId);

      res.status(statusCode.NO_CONTENT).json();

      if (avatar)
      {await fileService.deleteFile(pathImg.PATH_AVATAR, avatar);}

    } catch (e) {
      next(e);
    }
  },

  updateUserPassword: async (req, res, next) => {
    try {
      const {userId} = req.params;
      const {newPassword} = req.body;

      const hashPassword = await hashService.hashPassword(newPassword);
      await authService.deleteMany({user:userId});

      const userWithPass = await userService.updateUser(userId, { password: hashPassword});
      // eslint-disable-next-line no-unused-vars
      const {password, ...user} = userWithPass.toObject();
      res.json(user);

    } catch (e) {
      next(e);
    }
  },

  addFavoriteRest:
        async (req, res, next) => {
          try {
            const {_id} = req.tokenInfo.user;
            const {restId} = req.query;

            const user = await userService.getUserById(_id);
            const prevFavoriteRestaurants = user.favoriteRestaurants;

            await userService.updateUser(_id, {
              favoriteRestaurants: [
                ...prevFavoriteRestaurants,
                restId
              ]
            });
            res.status(statusCode.CREATE).json();
          } catch (e) {
            next(e);
          }
        },
  removeFavoriteRest:
        async (req, res, next) => {
          try {
            const {_id} = req.tokenInfo.user;
            const {restId} = req.query;

            const user = await userService.getUserById(_id);
            const prevFavoriteRestaurants = user.favoriteRestaurants;

            const upFavoriteRestaurants = prevFavoriteRestaurants.filter(item => JSON.stringify(item) !== JSON.stringify(restId));
            await userService.updateUser(_id, {
              favoriteRestaurants: upFavoriteRestaurants
            });
            res.status(statusCode.NO_CONTENT).json();

          } catch (e) {
            next(e);
          }
        },
  createSuperAdmin: async (req, res, next) => {
    try {
      const hashPassword = await hashService.hashPassword(req.body.password);
      const userWithPass = await userService.createUser({
        ...req.body,
        name: 'Superadmin',
        password: hashPassword,
        role: [
          roles.USER,
          roles.SUPER_ADMIN
        ]
      });
      // eslint-disable-next-line no-unused-vars
      const {password, ...user} = userWithPass.toObject();
      res.status(statusCode.CREATE).json(user);
    } catch (e) {
      next(e);
    }
  },

};
