const mongoose = require("mongoose");

// User Registration Schema
const UserRegistrationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

module.exports = mongoose.model("UserRegistration", UserRegistrationSchema);
