const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userResolvers = require('../resolvers/userResolver');
const User = require('../models/user');

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('userResolvers', () => {
  describe('Query', () => {
    test('getUser throws when user not found', async () => {
      const mockId = new mongoose.Types.ObjectId();
      const user = userResolvers.Query.getUser(null, { id: mockId });
      expect(user).rejects.toThrow('User not found');
    });

    // other tests for getUser and getAllUsers queries
  });

  test('createUser creates a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword',
      age: 25,
      gender: 'Male',
      height: 180.5,
      weight: 80.5,
      workoutType: 'Strength',
      goal: 'muscle gain',
    };
    const user = await userResolvers.Mutation.createUser(null, newUser);
    expect(user).toMatchObject(newUser);
  });

    // other tests for createUser, updateUser, and deleteUser mutations
    test('updateUser updates an existing user', async () => {
      const initialUser = new User({
        name: 'Initial User',
        email: 'initialuser@example.com',
        password: 'initialpassword',
        age: 30,
        gender: 'Female',
        height: 165.0,
        weight: 60.0,
        workoutType: 'Cardio',
        goal: 'Lose weight',
      });
      await initialUser.save();
    
      const updatedUserData = {
        name: 'Updated User',
        email: 'updateduser@example.com',
        password: 'updatedpassword',
        age: 35,
        gender: 'Male',
        height: 170.0,
        weight: 75.0,
        workoutType: 'Strength',
        goal: 'Build muscle',
      };
    
      const updatedUser = await userResolvers.Mutation.updateUser(null, {
        id: initialUser._id,
        ...updatedUserData,
      });
    
      expect(updatedUser).toMatchObject(updatedUserData);
    });
    
    test('deleteUser deletes an existing user', async () => {
      const existingUser = new User({
        name: 'User to Delete',
        email: 'usertodelete@example.com',
        password: 'deletepassword',
        age: 28,
        gender: 'Female',
        height: 160.0,
        weight: 55.0,
        workoutType: 'Cardio',
        goal: 'Maintain weight',
      });
      await existingUser.save();
    
      const deletedUser = await userResolvers.Mutation.deleteUser(null, { id: existingUser._id });
    
      const user = await User.findById(existingUser._id);
      expect(user).toBeNull();
      expect(deletedUser).toMatchObject(existingUser.toObject());
    });
  });

