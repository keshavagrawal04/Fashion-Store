const { Otp } = require("../models");
const otpGenerator = require("otp-generator");

const generateOtp = async (email, expiryTime) => {
  try {
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const payload = {
      email: email,
      otp: otp,
      expiryTime: expiryTime,
    };
    let otpObject = await Otp.findOne({ email: email });
    if (otpObject) {
      otpObject = await Otp.findOneAndUpdate({ email: email }, payload);
    } else {
      otpObject = await Otp(payload);
      otpObject = await otpObject.save();
    }
    return otp;
  } catch (error) {
    throw error;
  }
};

const verifyOtp = async (email, otp, currentTime) => {
  try {
    const otpObject = await Otp.findOne({ email: email });
    if (parseInt(otp) !== otpObject.otp) {
      return { status: false, message: "Invalid Otp Try Again" };
    }
    if (currentTime > otpObject.expiryTime) {
      return { status: false, message: "Otp Expired Try To Resend Otp" };
    }

    return { status: true };
  } catch (error) {
    throw error;
  }
};

module.exports = { generateOtp, verifyOtp };
