const {isObjectIdOrHexString} = require('mongoose');

const {LocalError} = require('../errors');
const statusCodes = require('../constants/statusCodes');
const {statusCode, roles} = require('../constants');

module.exports = {
  checkIdIsValid: (idName, from = 'params' ) => (req, res, next) => {
    try {
      if (!isObjectIdOrHexString(req[from][idName])) {
        return next(new LocalError('Not valid ID', statusCodes.BAD_REQUEST));

      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checkUserIdInEntity: (entity) => (req, res, next) => {

    try {
      const {_id:userId,role} = req.tokenInfo.user; // в токенинфо у нас юзер - цілий об’єкт, а в ентити - тільки айдішка
      // eslint-disable-next-line max-len
      const entityId = req[entity].user; //в мідлварі для перевірки існування кожної сутності (checkIsExist) ми створюємо в req поле сутності (req[entity])
      if ((userId+'')!==(entityId+'') && role!==roles.SUPER_ADMIN) {
        return next (new LocalError('Access is forbidden', statusCode.FORBIDDEN));
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIdAreSame: (idName, from = 'params') => (req, res, next) => {
    try {
      const {_id:userId, role} = req.tokenInfo.user;

      const updateUserId = req[from][idName];

      if ((userId+'')!==(updateUserId+'') && role!==roles.SUPER_ADMIN) {
        return next (new LocalError('Access is forbidden', statusCode.FORBIDDEN));
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkRole: (role) => (req, res, next) => {
    try {
      const userRole = (req.tokenInfo.user.role);

      if (!userRole.includes(role) && !userRole.includes(roles.SUPER_ADMIN)) {
        return next (new LocalError('Access is forbidden', statusCode.FORBIDDEN));
      }
      next();
    } catch (e) {
      next(e);
    }
  },


};
