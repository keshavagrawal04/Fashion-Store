const { User } = require("../models");
const { userService, otpService } = require("../services");
const { crypto, jwt, email } = require("../utils");
const { responseMessages } = require("../configs");

const registerUser = async (req, res) => {
  try {
    const { body } = req;
    let user = await userService.findUserByEmail(body.email);
    if (user) {
      return res.status(400).json({
        status: 400,
        message: responseMessages.USER_EXISTS,
      });
    }
    body.password = await crypto.generateHash(body.password);
    user = await userService.saveUser(body);
    return res.status(201).json({
      status: 200,
      message: responseMessages.USER_REGISTRATION_SUCCESS,
      data: user,
    });
  } catch (error) {
    console.log(
      `❌ ${responseMessages.USER_REGISTRATION_SUCCESS} : ${error.message}`
    );
    res.status(400).json({
      status: 400,
      message: responseMessages.USER_REGISTRATION_SUCCESS,
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
        message: responseMessages.USER_NOT_FOUND,
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
        message: responseMessages.INVALID_PASSWORD,
      });
    }
    const tokens = await jwt.generateTokens({
      userId: user._id,
      email: user.email,
    });
    return res.status(201).json({
      status: 200,
      message: responseMessages.USER_LOGIN_SUCCESS,
      data: {
        userId: user._id,
        role: user.role,
        tokens,
      },
    });
  } catch (error) {
    console.log(
      `❌ ${responseMessages.INTERNAL_SERVER_ERROR} : ${error.message}`
    );
    res.status(400).json({
      status: 400,
      message: responseMessages.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { body } = req;
    const user = await userService.findUserByEmail(body.email);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: responseMessages.USER_NOT_FOUND,
      });
    }
    const expiryTime = Date.now() + 2 * 60 * 1000;
    const otp = await otpService.generateOtp(body.email, expiryTime);
    await email.sendPasswordResetOtp(body.email, otp);
    return res.status(200).json({
      status: 200,
      message: responseMessages.OTP_SENT_SUCCESS,
    });
  } catch (error) {
    console.log(
      `❌ ${responseMessages.INTERNAL_SERVER_ERROR} : ${error.message}`
    );
    res.status(400).json({
      status: 400,
      message: responseMessages.INTERNAL_SERVER_ERROR,
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
        message: responseMessages.USER_NOT_FOUND,
      });
    }
    const currentTime = Date.now();
    const isOtpValid = await otpService.verifyOtp(email, otp, currentTime);
    if (!isOtpValid.status) {
      return res.status(400).json({
        status: 400,
        message: isOtpValid.message,
      });
    }
    return res.status(200).json({
      status: 200,
      message: responseMessages.OTP_VERIFIED,
    });
  } catch (error) {
    console.log(
      `❌ ${responseMessages.INTERNAL_SERVER_ERROR}: ${error.message}`
    );
    res.status(400).json({
      status: 400,
      message: responseMessages.INTERNAL_SERVER_ERROR,
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
        message: responseMessages.USER_NOT_FOUND,
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
      message: responseMessages.PASSWORD_UPDATE_SUCCESS,
    });
  } catch (error) {
    console.log(
      `❌ ${responseMessages.INTERNAL_SERVER_ERROR} : ${error.message}`
    );
    res.status(400).json({
      status: 400,
      message: responseMessages.INTERNAL_SERVER_ERROR,
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
