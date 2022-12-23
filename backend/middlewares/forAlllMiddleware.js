const {isObjectIdOrHexString} = require("mongoose");

const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {statusCode} = require("../constants");
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
    checkIdAreSame: (entity) => (req, res, next) => {
      try {
          const userId = stringify(req.tokenInfo.user._id);    // в токенинфо у нас юзер - цілий об’єкт, а в ентити - тільки айдішка
          const entityId = stringify(req[entity].user);

          if (userId!==entityId) {
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
            console.log(userRole)
            if (!userRole.includes(role)) {
                return next (new LocalError('Access is forbidden', statusCode.FORBIDDEN))
            }
            next()
        } catch (e) {
            next(e)
        }
    },


}
