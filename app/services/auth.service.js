const UserModel = require('../models/user.model');

exports.findByEmail = async email => {
  return UserModel.findOne({ email: email });
};
