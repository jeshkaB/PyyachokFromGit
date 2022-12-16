const Auth = require('../dataBase/Auth')
module.exports = {
    saveTokens (authTokens) {
        console.log(authTokens)
      return Auth.create(authTokens)
}
}
