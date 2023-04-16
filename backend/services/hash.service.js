const bcrypt = require('bcrypt');

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (password, hashPassword) =>  {

       return await bcrypt.compare(password, hashPassword);


    }
}



