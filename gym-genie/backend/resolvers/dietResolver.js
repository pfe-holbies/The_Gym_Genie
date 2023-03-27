const Diet = require('../models/diet');

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
