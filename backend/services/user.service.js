const { User } = require("../models");

const saveUser = async (payload) => {
  try {
    let user = await User(payload);
    user = await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { saveUser, findUserByEmail };
