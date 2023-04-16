const mongoose = require("mongoose");

// const UserWorkouts { UserWorkouts, UserDiets, UserSupplements} = require("./ChatGPT);

// From ChatGPT.js
workoutPlan: [
    {
      type: UserWorkoutsPlan.schema,
      ref: "Workout",
      required: true,
    },
  ],
  // From ChatGPT.js
  MealPlan: [
    {
      type: UserMealPlan.schema,
      ref: "Diet",
      required: true,
    },
  ],
  // From ChatGPT.js
  supplements: [
    {
      type: UserSupplements.schema,
      ref: "Supplements",
      required: true,
    },
  ],