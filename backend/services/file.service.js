const fs = require('fs/promises');
const path = require('path');
const {LocalError} = require("../errors");


module.exports = {

    writeFile (pathImg, fileName, data) {
        const pathh = path.join(process.cwd(), pathImg, fileName)
        return fs.writeFile(pathh, data)
    }

}
