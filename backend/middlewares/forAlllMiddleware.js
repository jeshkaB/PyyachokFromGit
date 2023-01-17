const {isObjectIdOrHexString} = require("mongoose");

const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {statusCode, roles} = require("../constants");
const {stringify} = require("nodemon/lib/utils");

module.exports = {
    checkIdIsValid: (idName, from = 'params' ) => (req, res, next) => {
        try {
            if (!isObjectIdOrHexString(req[from][idName])) {                            //метод монгуса - проверка валідності id
                return next(new LocalError('Not valid ID', statusCodes.BAD_REQUEST));

            }

            next();
        } catch (e) {
            next(e)
        }
    },
    checkUserIdInEntity: (entity) => (req, res, next) => {
      try {//stringify потрібен, щоб порівнювались строкові значення, а не new ObjectId, з new ObjectId не працює іфка
          const userId = stringify(req.tokenInfo.user._id);    // в токенинфо у нас юзер - цілий об’єкт, а в ентити - тільки айдішка
          const entityId = stringify(req[entity].user); //в мідлварі для перевірки існування кожної сутності (checkIsExist) ми створюємо в req поле сутності (req[entity])
          if (userId!==entityId && userId!==roles.SUPER_ADMIN_ID) {
              return next (new LocalError('Access is forbidden', statusCode.FORBIDDEN))
          }

          next()
      } catch (e) {
          next(e)
      }
    },

    checkIdAreSame: (idName, from = 'params') => (req, res, next) => {
    try {


        const userId = stringify(req.tokenInfo.user._id);//

        const updateUserId = req[from][idName]

        if (userId!==updateUserId && userId!==roles.SUPER_ADMIN_ID) {
            return next (new LocalError('Access is forbidden', statusCode.FORBIDDEN))
        }

        next()
    } catch (e) {
        next(e)
    }
},

    checkRole: (role) => (req, res, next) => {
        try {
            const userRole = (req.tokenInfo.user.role);    // в токенинфо у нас юзер - цілий об’єкт, а в ентити - тільки айдішка

            if (!userRole.includes(role) && !userRole.includes(roles.SUPER_ADMIN)) {
                return next (new LocalError('Access is forbidden', statusCode.FORBIDDEN))
            }
            next()
        } catch (e) {
            next(e)
        }
    },


}
