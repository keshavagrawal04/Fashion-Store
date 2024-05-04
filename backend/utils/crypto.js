const crypto = require("crypto");

const generateHash = (
  password,
  salt = crypto.randomBytes(32).toString("hex")
) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 100, 64, "sha256")
    .toString("hex");
  return { hash, salt };
};

const isHashValid = (password, salt, hash) => {
  const { hash: generatedHash } = generateHash(password, salt);
  return generatedHash === hash;
};

module.exports = {
  generateHash,
  isHashValid,
};
