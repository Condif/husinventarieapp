const mongoose = require("mongoose");

async function connect() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log("Connected to database");
  } catch (err) {
    console.log("Failed to connect to databasen", err);
  }
}

async function run() {
  await connect();
}

module.exports = {
  run,
};


