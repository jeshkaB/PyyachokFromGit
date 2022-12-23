const {isObjectIdOrHexString} = require("mongoose");

const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");
const {statusCode} = require("../constants");

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
          const userId = req.tokenInfo.user._id;    // в токенинфо у нас юзер - цілий об’єкт, а в ентити - тільки айдішка
          const entityId = req[entity].user
          if (!userId===entityId) {
              return next (new LocalError('Access is forbidden', statusCode.FORBIDDEN))
          }
          next()
      } catch (e) {
          next(e)
      }
    },


}
