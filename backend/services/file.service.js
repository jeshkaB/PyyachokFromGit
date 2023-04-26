const fs = require('fs/promises');
const path = require('path');


module.exports = {

  writeFile(pathImg, fileName, data) {
    const pathToFile = path.join(process.cwd(), pathImg, fileName);
    return fs.writeFile(pathToFile, data);
  },
  readFile(pathImg, fileName) {
    const pathToFile = path.join(process.cwd(), pathImg, fileName);
    return fs.readFile(pathToFile);
  },
  deleteFile(pathImg, fileName) {
    const pathToFile = path.join(process.cwd(), pathImg, fileName);
    return fs.unlink(pathToFile);
  },

};

