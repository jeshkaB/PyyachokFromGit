const bcrypt = require('bcrypt');
const {statusCode} = require("../constants");
const {LocalError} = require("../errors");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (password, hashPassword) =>  {
        const PasswordsAreSame = await bcrypt.compare(password, hashPassword);
        if (!PasswordsAreSame) {
            throw new LocalError('email or password is wrong', statusCode.NOT_FOUND)
        }
    }
}



