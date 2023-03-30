const Supplement = require('../models/supplement');

const supplementResolvers = {
  Query: {
    getSupplement: async (_, { id }) => {
      try {
        const supplement = await Supplement.findById(id);
        if (!supplement) {
          throw new Error('Supplement not found');
        }
        return supplement;
      } catch (error) {
        throw error;
      }
    },
    getAllSupplements: async () => {
      try {
        const supplements = await Supplement.find();
        return supplements;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createSupplement: async (_, args) => {
      try {
        const supplement = await Supplement.create(args);
        return supplement;
      } catch (error) {
        throw error;
      }
    },
    updateSupplement: async (_, { id, ...args }) => {
      try {
        const supplement = await Supplement.findByIdAndUpdate(id, args, { new: true });
        if (!supplement) {
          throw new Error('Supplement not found');
        }
        return supplement;
      } catch (error) {
        throw error;
      }
    },
    deleteSupplement: async (_, { id }) => {
      try {
        const supplement = await Supplement.findByIdAndDelete(id);
        if (!supplement) {
          throw new Error('Supplement not found');
        }
        return supplement;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = supplementResolvers;
