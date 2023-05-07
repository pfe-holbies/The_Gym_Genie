/* global process */
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Async Connection to MongoDB Database
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `💾 MongoDB Connected: ${connection.connection.host}`.bgCyan.bold
    );
  } catch (error) {
    console.log(`❌ Error: ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = { connectDB };
