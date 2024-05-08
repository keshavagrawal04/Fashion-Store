const responseMessages = {
  USER_EXISTS: {
    message: "User with this email already exists.",
  },
  USER_REGISTRATION_SUCCESS: {
    message: "User registered successfully.",
  },
  USER_NOT_FOUND: {
    message: "User with this email is not registered.",
  },
  INVALID_PASSWORD: {
    message: "Invalid password. Please try again.",
  },
  USER_LOGIN_SUCCESS: {
    message: "User logged in successfully.",
  },
  OTP_SENT_SUCCESS: {
    message: "Password reset OTP sent to your email.",
  },
  OTP_VERIFIED: {
    message: "OTP verified.",
  },
  PASSWORD_UPDATE_SUCCESS: {
    message: "Password updated successfully.",
  },
  INTERNAL_SERVER_ERROR: {
    message: "Internal server error",
  },
};

module.exports = responseMessages;
