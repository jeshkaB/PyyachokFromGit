const Restaurant = require('../dataBase/Restaurant');
const {logout} = require("../controllers/auth.controller");

module.exports = {
  createRestaurant(restaurantObj) {
    return Restaurant.create(restaurantObj);
  },
  getRestaurants() {
    return Restaurant.find();
  },
  getRestaurantById(restId) {
    return Restaurant.findById (restId);
  },
  getRestaurantByParams(filter) {
    return Restaurant.find(filter);
  },
  updateRestaurant(restId,restaurantObj) {
    return Restaurant.findOneAndUpdate({_id: restId},restaurantObj, {new: true});
  },
  deleteRestaurant(restId) {
    return Restaurant.deleteOne ({_id: restId});
  },
  getRestaurantsListByParams(filter, sort, skip, limit) {
    const {ratingMin, ratingMax, averageBillMin, averageBillMax, tagsValue} = filter;
    console.log(tagsValue);
    if (tagsValue !== '') {
      return Restaurant.find({
        rating: {$gte: ratingMin, $lte: ratingMax},
        averageBill: {$gte: averageBillMin, $lte: averageBillMax},
        tags: {$all: tagsValue}
      })
        .sort(sort)
        .skip(skip)
        .limit(limit);
    }
    return Restaurant.find({
      rating: {$gte: ratingMin, $lte: ratingMax},
      averageBill: {$gte: averageBillMin, $lte: averageBillMax}
    })
      .sort(sort)
      .skip(skip)
      .limit(limit);

  },

};
