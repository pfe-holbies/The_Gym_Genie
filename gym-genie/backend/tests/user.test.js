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
    test.skip('getUser throws when user not found', async () => {
      const mockId = new mongoose.Types.ObjectId();
      const user = userResolvers.Query.getUser(null, { id: mockId });
      expect(user).rejects.toThrow('User not found');
    });

    // other tests for getUser and getAllUsers queries
  });

  test.skip('createUser creates a new user', async () => {
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

test.skip('createUser creates a duplicate user', async () => {
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
  
  // create a new user
  const createdUser = await userResolvers.Mutation.createUser(null, newUser);
  expect(createdUser).toMatchObject(newUser);

  // try to create the same user again
  const duplicateUser = await userResolvers.Mutation.createUser(null, newUser);
  expect(duplicateUser._id).toEqual(createdUser._id);
  
  // retrieve the existing user
  const retrievedUser = await User.findOne({ email: newUser.email });
  expect(retrievedUser).toMatchObject(newUser);
});

test.skip('createUser fails when required fields are missing', async () => {
  const newUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testpassword',
    age: 25,
    gender: 'Male',
    height: 180.5,
    weight: 80.5,
    workoutType: 'Strength',
  };
  // Omitting the 'goal' field should cause the createUser mutation to fail
  await expect(userResolvers.Mutation.createUser(null, newUser)).rejects.toThrow();
});
  

    // other tests for createUser, updateUser, and deleteUser mutations
    test.skip('updateUser updates an existing user', async () => {
      const initialUser = new User({
        name: 'Initial User',
        email: 'initialuser@example.com',
        password: 'initialpassword',
        age: 30,
        gender: 'Female',
        height: 165.0,
        weight: 60.0,
        workoutType: 'cardio',
        goal: 'weight loss',
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
    
    test.skip('deleteUser deletes an existing user', async () => {
      const existingUser = new User({
        name: 'User to Delete',
        email: 'usertodelete@example.com',
        password: 'deletepassword',
        age: 28,
        gender: 'Female',
        height: 160.0,
        weight: 55.0,
        workoutType: 'cardio',
        goal: 'Maintain weight',
      });
      await existingUser.save();
    
      const deletedUser = await userResolvers.Mutation.deleteUser(null, { id: existingUser._id });
    
      const user = await User.findById(existingUser._id);
      expect(user).toBeNull();
      expect(deletedUser).toMatchObject({});
    });

    
  describe('Calorie Burn', () => {
    test('addCalorieBurn adds a new calorie burn entry', async () => {
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

      const date = new Date();
      const calories = 500;

      const updatedCalorieBurn = await userResolvers.addCalorieBurn(null, {
        id: user._id,
        date,
        calories,
      });
      const updatedUser = await User.findById(user._id);
      // console.log(updatedUser.calorieBurn);
      expect(updatedCalorieBurn).toHaveLength(1);
      expect(updatedCalorieBurn[0]).toMatchObject({ date, calories });
      // console.log(updatedCalorieBurn[0]);
      
    });
    test('getUserCalorieBurnOfPreviousWeek retrieves calorie burn of the previous week correctly', async () => {
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
  
      const date1 = new Date();
      date1.setDate(date1.getDate() - 10); // 10 days ago
      const calories1 = 500;
  
      const date2 = new Date();
      date2.setDate(date2.getDate() - 6); // 6 days ago
      const calories2 = 600;
  
      await userResolvers.addCalorieBurn(null, { id: user._id, date: date1, calories: calories1 });
      await userResolvers.addCalorieBurn(null, { id: user._id, date: date2, calories: calories2 });
  
      const previousWeekCalorieBurn = await userResolvers.getUserCalorieBurnOfPreviousWeek(null, { id: user._id });
      const updatedUser = await User.findById(user._id);
      console.log(updatedUser.calorieBurn);
      expect(previousWeekCalorieBurn).toHaveLength(2);
      expect(previousWeekCalorieBurn[0]).toMatchObject({ date: date2, calories: calories2 });
    });
    
    });
  });

