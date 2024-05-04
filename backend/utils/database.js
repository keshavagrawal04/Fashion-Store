const mongoose = require("mongoose");

const connect = async () => {
  const { MONGO_DB_URI, DB_NAME } = process.env;

  try {
    const connection = await mongoose.connect(`${MONGO_DB_URI}/${DB_NAME}`);
    console.log(
      `✅ Database connection Success : ${connection.connection.host}`
    );
  } catch (error) {
    console.log(`❌ Database connection Failed : ${error.message}`);
  }
};

module.exports = { connect };
