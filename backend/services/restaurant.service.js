const Restaurant = require('../dataBase/Restaurant')

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
        return Restaurant.findOne(filter)
    },
    updateRestaurant (restId,restaurantObj) {
        return Restaurant.updateOne({_id: restId},restaurantObj)
    },
    deleteRestaurant (restId) {
    return Restaurant.deleteOne ({_id: restId})
},

}
