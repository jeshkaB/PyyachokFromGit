const {resetWatchers} = require("nodemon/lib/monitor/watch");
module.exports = {
    statusCode: require('./statusCodes'),
    regex: require('./regex'),
    roles: require('./roles'),
    pathImg: require('./pathImg'),
    coordinatesLimit: require('./coordinatesLimit'),
    tokenTypes: require('./tokenTypes')

}
