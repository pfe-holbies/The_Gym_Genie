// Import mongoose to create a schema
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say', 'non-binary', 'Attack Helicopter'],
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  workoutType: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'cardio', 'Strength'],
    required: true,
  },
  goal: {
    type: String,
    enum: ['weight loss', 'muscle gain', 'general fitness', 'lose fat', 'lose weight', 'strength'],
    required: true,
  },
  supplements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplement',
  }],
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
  }],
  diets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diet',
  }],
});

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
