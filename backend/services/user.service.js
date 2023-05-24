const User = require('../dataBase/User');
const {PAGE_LIMIT_USERS} = require('../constants/pageLimit');

module.exports = {
  createUser(userObj) {
    return User.create(userObj);
  },
  getUsers() {
    return User.find();
  },
  getCountUsersByParams(email) {
    return User.countDocuments({
      email: {$regex: '.*' + email + '.*', $options: 'i'}
    });
  },
  getUsersWithoutPass(email, page) {
    const skip = !page ? 0 : (page-1)*PAGE_LIMIT_USERS;
    return User
      .find({email: {$regex: '.*' + email + '.*', $options: 'i'}})
      .select({password:0})
      .skip(skip)
      .limit(PAGE_LIMIT_USERS);
  },
  getUserById(userId) {
    return User.findById(userId);
  },
  getUserByIdWithoutPass(userId) {
    return User.findById(userId).select({password:0});
  },
  getUserByParams(filter) {
    return User.findOne(filter);
  },
  updateUser(userId, userObj) {
    return User.findOneAndUpdate({_id: userId}, userObj, {new: true});
  },
  deleteUser(userId) {
    return User.deleteOne({_id: userId});
  }
};
