const mongoose = require("mongoose");

// User Profile Schema "Registration Quiz"
const UserProfileSchema = new mongoose.Schema({
  personalInfo: {
      age: {
        type: Number,
        required: [true, "Please provide your age."],
      },
      gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
      },
      height: {
        type: Number,
        required: [true, "Please provide your height in cm."],
      },
      weight: {
        type: Number,
        required: [true, "Please provide your weight in kg."],
      },
  },
  primaryGoal: {
    type: String,
    enum: ["Lose Fat", "Gain Muscle", "Get Toned"],
    required: true,
  },
  activityLevel: {
    type: String,
    enum: ["Not Very Active", "Lightly Active", "Active", "Very Active"],
    required: true,
  },
  workoutType: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "cardio", "strength"],
    required: true,
  },
  dietType: {
    type: String,
    enum: [
      "No dietary restrictions",
      "vegan",
      "vegetarian",
      "pescatarian",
      "carnivore",
      "ketogenic",
      "low-carb",
      "low-fat",
      "low-sodium",
      "low-sugar",
      "paleo",
    ],
    required: true,
  },
  foodAllergies: {
    type: String,
    enum: [
      "No food allergies",
      "dairy",
      "eggs",
      "fish",
      "gluten",
      "peanuts",
      "shellfish",
      "soy",
      "tree nuts",
      "wheat",
    ],
  },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
