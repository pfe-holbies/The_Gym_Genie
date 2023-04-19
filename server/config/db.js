import mongoose from "mongoose";

mongoose.set("strictQuery", false);

// Async Connection to MongoDB Database
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `💾 MongoDB is ready: ${connection.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`❌ Error: ${error.message}`.red);
    process.exit(1);
  }
};

export default connectDB;
