const mongoose = require("mongoose");

// Schema for personalized nutritional data received from chatgpt
const DietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  meals: {
    type: Array,
    required: true,
    enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
  },
  dailyCalories: {
    type: Number,
    required: true,
    min: 0,
  },
  dailyMacros: {
    type: Array,
    required: true,
    maxlength: 3,
  },
});

module.exports = mongoose.model("Diet", DietSchema);
