import mongoose from "mongoose";
// const UserWorkouts { UserWorkouts, UserDiets, UserSupplements} = require("./ChatGPT);

// From ChatGPT.js
const BMISchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const BMI = mongoose.model("BMI", BMISchema);

export default BMI;
