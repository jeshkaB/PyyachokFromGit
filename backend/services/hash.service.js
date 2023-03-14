const bcrypt = require('bcrypt');
const {statusCode} = require("../constants");
const {LocalError} = require("../errors");

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (password, hashPassword) =>  {

       return await bcrypt.compare(password, hashPassword);


    }
}



