const Diet = require('../models/diet');
// add create multiple diets
// add create diet with invalid calorieGoal
// add diet by calorieGoal
// add diet by name
// add diet by description
// add diet by name and description
// add diet by name and calorieGoal
// add diet by description and calorieGoal
// add diet by name, description, and calorieGoal
// diet by level
// diet by budget
// diet by level and budget
const dietResolver = {
  Query: {
    getDiet: async (_, { id }) => {
      try {
        const diet = await Diet.findById(id);
        if (!diet) {
          throw new Error('Diet not found');
        }
        return diet;
      } catch (error) {
        throw error;
      }
    },
    getAllDiets: async () => {
      try {
        const diets = await Diet.find();
        return diets;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createDiet: async (_, args) => {
      try {
        const diet = await Diet.create(args);
        return diet;
      } catch (error) {
        throw error;
      }
    },
    updateDiet: async (_, { id, ...args }) => {
      try {
        const diet = await Diet.findByIdAndUpdate(id, args, { new: true });
        if (!diet) {
          throw new Error('Diet not found');
        }
        return diet;
      } catch (error) {
        throw error;
      }
    },
    deleteDiet: async (_, { id }) => {
      try {
        const diet = await Diet.findByIdAndDelete(id);
        if (!diet) {
          throw new Error('Diet not found');
        }
        return diet;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = dietResolver;
