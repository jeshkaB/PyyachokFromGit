const Restaurant = require('../dataBase/Restaurant')
const {login} = require("../controllers/auth.controller");

module.exports = {
    createRestaurant (restaurantObj) {
        return Restaurant.create(restaurantObj)
    },
    getRestaurants() {
        return Restaurant.find()
    },
    getRestaurantById (restId) {
        return Restaurant.findById (restId)
    },
    getRestaurantByParams (filter) {
        return Restaurant.find(filter)
    },
    updateRestaurant (restId,restaurantObj) {
        return Restaurant.findOneAndUpdate({_id: restId},restaurantObj, {new: true})
    },
    deleteRestaurant (restId) {
    return Restaurant.deleteOne ({_id: restId})
},

}
