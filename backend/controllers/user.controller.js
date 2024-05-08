const { User } = require("../models");
const { userService } = require("../services");
const { crypto, jwt, email } = require("../utils");
const otpGenerator = require("otp-generator");

const otpStore = {};

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

const forgotPassword = async (req, res) => {
  try {
    const { body } = req;
    const user = await userService.findUserByEmail(body.email);
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    otpStore[body.email] = {
      otp: otp,
      expiryTimestamp: Date.now() + 2 * 60 * 1000,
    };
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User With This Email Is Not Registered",
      });
    }
    await email.sendPasswordResetOtp(body.email, otp);
    return res.status(200).json({
      status: 200,
      message: "Password Reset Otp Sended To Users Email",
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

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User With This Email Is Not Registered",
      });
    }
    const currentTime = Date.now();
    const isOtpValid = otp === otpStore[email].otp;
    if (!isOtpValid || currentTime < otpStore[email].otp.expiryTimestamp) {
      return res.status(400).json({
        status: 400,
        message: "Invalid / Expired Otp Try Again",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Otp Is Verified",
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

const createPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User With This Email Is Not Registered",
      });
    }
    password = await crypto.generateHash(password);
    user = await User.findOneAndUpdate(
      { email: email },
      { password },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "Password Successfully Updated",
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
  forgotPassword,
  verifyOtp,
  createPassword,
};
