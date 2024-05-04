const { userService } = require("../services");
const { crypto, jwt } = require("../utils");

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

const loginUser = async (req, res) => {
  try {
    const { body } = req;
    let user = await userService.findUserByEmail(body.email);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User With This Email Is Not Registered",
      });
    }
    const isPasswordValid = await crypto.isHashValid(
      body.password,
      user.password.salt,
      user.password.hash
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        status: 400,
        message: "Invalid Password Try Again",
      });
    }
    const tokens = await jwt.generateTokens({
      userId: user._id,
      email: user.email,
    });
    return res.status(201).json({
      status: 200,
      message: "User Logged In Successfully",
      data: {
        userId: user._id,
        role: user.role,
        tokens,
      },
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

const deleteUser = (req, res) => {};

const updateUser = (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
};
