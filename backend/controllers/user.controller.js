const { userService } = require("../services");
const { crypto } = require("../utils");

const registerUser = async (req, res) => {
  try {
    const { body } = req;
    let user = await userService.findUserByEmail(body.email);
    if (user) {
      return res.status(400).json({
        status: 400,
        message: "User With This Email Is Already Registered",
      });
    }
    body.password = await crypto.generateHash(body.password);
    user = await userService.saveUser(body);
    console.log(user);
    return res.status(201).json({
      status: 200,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    console.log(`❌ Internal Server Error : ${error.message}`);
    res.status(400).json({
      status: 400,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginUser = (req, res) => {};

const deleteUser = (req, res) => {};

const updateUser = (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
};
