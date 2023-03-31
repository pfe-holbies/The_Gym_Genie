const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const dietResolver = require('../resolvers/dietResolver');
const Diet = require('../models/diet');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Diet.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('dietResolver', () => {
  describe('Query', () => {
    test('getDiet throws when diet not found', async () => {
      const mockId = new mongoose.Types.ObjectId();
      await expect(dietResolver.Query.getDiet(null, { id: mockId })).rejects.toThrow('Diet not found');
    });

    test('getAllDiets returns all diets', async () => {
      const diets = [
        {
          name: 'Diet 1',
          description: 'Description 1',
          calorieGoal: 2000,
        },
        {
          name: 'Diet 2',
          description: 'Description 2',
          calorieGoal: 2500,
        },
      ];
      await Diet.insertMany(diets);
      const result = await dietResolver.Query.getAllDiets();
      expect(result).toHaveLength(diets.length);
      expect(result.map(diet => diet.name)).toEqual(diets.map(diet => diet.name));
    });

    // Add more tests for the getDiet query
  });

  describe('Mutation', () => {
    test('createDiet creates a new diet', async () => {
      const newDiet = {
        name: 'New Diet',
        description: 'New Description',
        calorieGoal: 2000,
      };
      const diet = await dietResolver.Mutation.createDiet(null, newDiet);
      expect(diet).toBeInstanceOf(Diet);
      expect(diet).not.toBeNull();
    });

    test('updateDiet updates an existing diet', async () => {
      const initialDiet = new Diet({
        name: 'Initial Diet',
        description: 'Initial Description',
        calorieGoal: 2000,
      });
      await initialDiet.save();

      const updatedData = {
        name: 'Updated Diet',
        description: 'Updated Description',
        calorieGoal: 2500,
      };

      const updatedDiet = await dietResolver.Mutation.updateDiet(null, {
        id: initialDiet._id,
        ...updatedData,
      });
      expect(updatedDiet.calorieGoal).toEqual(2500);
      expect(updatedData.name).toEqual('Updated Diet');
    });

    test('deleteDiet deletes an existing diet', async () => {
      const existingDiet = new Diet({
        name: 'Diet to Delete',
        description: 'Description to Delete',
        calorieGoal: 2000,
      });
      await existingDiet.save();

      const deletedDiet = await dietResolver.Mutation.deleteDiet(null, { id: existingDiet._id });

      const diet = await Diet.findById(existingDiet._id);
      expect(diet).toBeNull();
      expect(deletedDiet).toMatchObject(existingDiet.toObject());
    });
  });
});
