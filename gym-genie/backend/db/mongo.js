const mongoose = require('mongoose');
require('dotenv').config();

// Create a function to connect to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://test_user2:9KYroWQYFgzAjcsD@cluster0.mejre0v.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: false,
      // useCreateIndex: true,
    });
    console.log('Connected to database!');
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit with failure
  }
};

// Export the function to use it in your server file
module.exports = connectToDatabase;
