const {isObjectIdOrHexString} = require("mongoose");

const {LocalError} = require("../errors");
const statusCodes = require("../constants/statusCodes");

module.exports = {
    checkIdIsValid: (idName, from = 'params' ) => (req, res, next) => {
        try {
            if (!isObjectIdOrHexString(req[from][idName])) {
                return next(new LocalError('Not valid ID', statusCodes.BAD_REQUEST));
            }
            next();
        } catch (e) {
            next(e)
        }
    }

}
