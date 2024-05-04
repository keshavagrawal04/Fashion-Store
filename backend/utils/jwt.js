const JWT = require("jsonwebtoken");

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

const generateTokens = async (payload) => {
  const access = await JWT.sign(payload, ACCESS_SECRET);
  const refresh = await JWT.sign(payload, REFRESH_SECRET);
  return { access, refresh };
};

module.exports = {
  generateTokens,
};
