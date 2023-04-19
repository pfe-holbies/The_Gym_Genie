const express = require("express");
const router = express.Router();
const { graphqlHTTP } = require("express-graphql");
//const schema = require("../models/schema.js");
const authController = require("../controllers/authController");
//const workoutPlanController = require("../controllers/workoutPlanController");
//const mealPlanController = require("../controllers/mealPlanController");
//const trackerController = require("../controllers/trackerController");

// Home page
router.get("/", (req, res) => {
  res.send("Welcome to the Gym Genie app!");
});

// Sign up page
router.get("/signup", (req, res) => {
  res.send("Please sign up to use the app.");
});

// Log in page
router.get("/login", (req, res) => {
  res.send("Please log in to your account.");
});

// Dashboard page
router.get("/dashboard", authController.protect, (req, res) => {
  res.send("Welcome to your dashboard!");
});

// Workout plan page
router.get(
  "/dashboard/workoutPlan",
  authController.protect,
  workoutPlanController.getWorkoutPlan
);

// Meal plan page
router.get(
  "/dashboard/mealPlan",
  authController.protect,
  mealPlanController.getMealPlan
);

// Tracker page
router.get(
  "/dashboard/tracker",
  authController.protect,
  trackerController.getTracker
);

// Log out page
router.get("/logout", authController.logout);

// GraphQL API
router.use(
  "/graphql",
  graphqlHTTP({
    //schema: schema,
    graphiql: true,
  })
);

module.exports = router;
