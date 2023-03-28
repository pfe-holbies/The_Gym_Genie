const mongoose = require('mongoose');
const User = require('../models/user'); // assuming your User model is defined in a file named user.js
const connectToDatabase = require('../db/mongo');

// Connect to the test database

db = connectToDatabase();

beforeAll(async () => {
  await db;
});

// Disconnect from the database after all tests are done
afterAll(async () => {
  await mongoose.disconnect();
});

describe('User model tests', () => {
  // Initialize a test user
  let testUser;

  beforeEach(async () => {
    // Create a test user with some dummy data
    testUser = await User.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'password123',
      age: 25,
      gender: 'male',
      height: 180.5,
      weight: 75.0,
      workoutType: 'cardio',
      goal: 'lose weight',
    });
  });

  afterEach(async () => {
    // Remove the test user after each test
    await User.findByIdAndDelete(testUser._id);
  });

  // Test getting a user by ID
  it('should get a user by ID', async () => {
    const foundUser = await User.findById(testUser._id);
    expect(foundUser).toEqual(expect.objectContaining({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'password123',
      age: 25,
      gender: 'male',
      height: 180.5,
      weight: 75.0,
      workoutType: 'cardio',
      goal: 'lose weight',
    }));
  });

  // Test getting all users
  it('should get all users', async () => {
    const allUsers = await User.find({});
    expect(allUsers.length).toBeGreaterThan(0);
  });

  // Test getting all users by weight
  it('should get all users by weight', async () => {
    const usersByWeight = await User.find({}).sort({ weight: 1 });
    expect(usersByWeight[0].weight).toBeLessThanOrEqual(usersByWeight[usersByWeight.length - 1].weight);
  });
});