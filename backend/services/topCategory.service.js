const TopCategory = require("../dataBase/TopCategory");

module.exports = {
    createTopCategory(categObj) {
        return TopCategory.create(categObj)
    },
    getTopCategories() {
        return TopCategory.find()
    },
    getTopCategoryById(categId) {
        return TopCategory.findById(categId)
    },
    getTopCategoryByIdWithRest(categId) {
        return TopCategory.findById(categId).populate({path: 'restaurants'})
    },
    getTopCategoryByParams(filter) {
        return TopCategory.find(filter)
    },
    updateTopCategory(categId, categObj) {
        return TopCategory.findOneAndUpdate({_id: categId}, categObj, {new: true})
    },
    deleteTopCategory(categId) {
        return TopCategory.deleteOne({_id: categId})
    },
}
