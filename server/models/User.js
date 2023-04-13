const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
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
    enum: ['Male', 'Female', 'Other', 'Prefer not to say', 'non-binary'],
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
    enum: ['beginner', 'intermediate', 'advanced', 'cardio', 'strength'],
    required: true,
  },
  goal: {
    type: String,
    enum: ['Be more active','Weight loss', 'Muscle gain', 'General fitness', 'Maintain weight', 'Manage stress'],
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

module.exports = mongoose.model('User', UserSchema);
