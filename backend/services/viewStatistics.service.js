const ViewStatistics = require('../dataBase/viewStatistics')
const GeneralNews = require("../dataBase/GeneralNews");

module.exports = {
    createViewStatistics(viewObj) {
        return ViewStatistics.create(viewObj)
    },
    getViewStatistics() {
        return ViewStatistics.find().populate('restaurant','name')
    },

    getViewStatisticsByParams (filter) {
        return ViewStatistics.find(filter)
    },
}
