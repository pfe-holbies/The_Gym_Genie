const mongoose = require("mongoose");

// Schema for personalized training data received from chatgpt
const personalizedTrainingSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workout: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  nutrition: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Training", personalizedTrainingSchema);
