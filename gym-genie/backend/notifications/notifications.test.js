const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const redisMock = require('redis-mock');
const User = require('../models/user');
const {populateStream, sendNotifications} = require('./notifications.js');

let mongoServer;

  // Use the redis mock for testing
  jest.mock('ioredis', () => {
    return require('redis-mock');
  });

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
  
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Helper function to create users
async function createUsers() {
  const users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      age: 25,
      gender: 'male',
      height: 180,
      weight: 80,
      workoutType: 'advanced',
      goal: 'weight loss',
    },
    {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password',
      age: 30,
      gender: 'female',
      height: 160,
      weight: 55,
      workoutType: 'advanced',
      goal: 'muscle gain',
    },
  ];

  await User.insertMany(users);
}

describe('stream population test', () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });
  
    test('populateStream should add notifications to the stream for all advanced users', async () => {
      await createUsers();
  
      // Use a custom Redis client for testing
      const redis = redisMock.createClient();
  
      // Mock the xadd function to capture the calls
      redis.xadd = jest.fn();
  
      // Call the populateStream function
      await populateStream(redis);
  
      expect(redis.xadd).toHaveBeenCalledTimes(2);
      expect(redis.xadd).toHaveBeenCalledWith(
        'notificationsStream',
        '*',
        'notification',
        JSON.stringify({
          userName: 'John Doe',
          workoutName: 'advanced',
        })
      );
      expect(redis.xadd).toHaveBeenCalledWith(
        'notificationsStream',
        '*',
        'notification',
        JSON.stringify({
          userName: 'Jane Doe',
          workoutName: 'advanced',
        })
      );
    }); });

describe('subscribers test', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('sendNotificationsWithoutCron should send notifications to all advanced users', async () => {
    await createUsers();

    // Mock console.log to capture the output
    console.log = jest.fn();

    sendNotifications();

    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith(
      'Sending notification: John Doe, your advanced workout will start in half an hour! 💪🔥'
    );
    expect(console.log).toHaveBeenCalledWith(
      'Sending notification: Jane Doe, your advanced workout will start in half an hour! 💪🔥'
    );
  });
});
