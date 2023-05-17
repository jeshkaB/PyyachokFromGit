const Restaurant = require('../dataBase/Restaurant');
const {PAGE_LIMIT_REST} = require('../constants/pageLimit');

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
  getCountRestaurantsByParams(filter, searchByName) {
    const {ratingMin, ratingMax, averageBillMin, averageBillMax, tagsValue} = filter;
    return Restaurant.countDocuments({
      rating: {$gte: ratingMin, $lte: ratingMax},
      averageBill: {$gte: averageBillMin, $lte: averageBillMax},
      tags: {$regex: '.*' + tagsValue + '.*', $options: 'i'},
      name: {$regex: '.*' + searchByName + '.*', $options: 'i'}
    });
  },
  getRestaurantsListByParams(filter, searchByName, moderated, sort, page) {
    const {ratingMin, ratingMax, averageBillMin, averageBillMax, tagsValue} = filter;
    const skip = !page ? 0 : (page-1)*PAGE_LIMIT_REST;
    return Restaurant.find({
      rating: {$gte: ratingMin, $lte: ratingMax},
      averageBill: {$gte: averageBillMin, $lte: averageBillMax},
      tags: {$regex: '.*' + tagsValue + '.*', $options: 'i'},
      name: {$regex: '.*' + searchByName + '.*', $options: 'i'},
      moderated: true
    })
      .sort(sort)
      .skip(skip)
      .limit(PAGE_LIMIT_REST);
  },

};
