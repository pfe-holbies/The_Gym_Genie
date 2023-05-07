const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // eslint-disable-line no-useless-escape
        'Please enter a valid email',
      ],
    },
    token: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
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
    primaryGoal: {
      type: String,
      enum: ['Lose Weight', 'Gain Muscle', 'Gain Weight', 'Maintain Weight'],
      required: true,
    },
    activityLevel: {
      type: String,
      enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'],
      required: true,
    },
    strengthLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: false,
    },
    workoutType: {
      type: String,
      enum: ['Strength', 'Cardio', 'Flexibility'],
      required: true,
    },
    workoutsPerWeek: {
      type: Number,
      enum: [2, 3, 4],
      required: true,
    },
    dietType: {
      type: String,
      enum: [
        'No restriction',
        'Vegan',
        'Vegetarian',
        'Pescatarian',
        'Keto',
        'Paleo',
      ],
      required: true,
    },
    foodAllergies: {
      type: String,
      enum: [
        'No allergies',
        'gluten',
        'dairy',
        'nuts',
        'eggs',
        'soy',
        'fish',
        'shellfish',
      ],
    },
    workoutPlan: {
      type: String,
    },
    mealPlan: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

exports.User = User;
