const { exec } = require('child_process');

// Start Redis server as a child process
const redisServer = exec('redis-server');

const User = require('../models/user');

//const Redis = require('redis');
//const redis = Redis.createClient({}); 
const Redis = require('ioredis');
const redis = new Redis();
const cron = require('node-cron');



// Log any errors
redisServer.on('error', (error) => {
  console.error('Error starting Redis server: ${error}');
});

// Log the Redis server output
redisServer.stdout.on('data', (data) => {
  console.log('Redis server output: ${data}');
});

// Log any Redis server exit codes
redisServer.on('exit', (code) => {
  console.log('Redis server exited with code ${code}');
});

async function populateStream(redisClient) {
  const users = await User.find({ workoutType: 'advanced' });

  for (const user of users) {
    const notification = {
      userName: user.name,
      workoutName: 'advanced',
    };
    await redisClient.xadd('notificationsStream', '*', 'notification', JSON.stringify(notification));
  }
}

async function sendNotifications() {
  const stream = 'notificationsStream';
  const group = 'notificationsGroup';

  // Fetch all pending messages from the stream
  const pendingMessages = await redis.xpending(stream, group);
  const pendingMessageCount = pendingMessages[0];

  if (pendingMessageCount > 0) {
    const messages = await redis.xreadgroup('GROUP', group, 'consumer', 'COUNT', pendingMessageCount, 'STREAMS', stream, 0);
    const streamData = messages[0][1];

    for (const message of streamData) {
      const notification = {
        id: message[0],
        data: message[1],
      };
      const workoutName = notification.data.workoutName;
      const userName = notification.data.userName;
      const messageText = '${userName}, your ${workoutName} workout will start in half an hour! 💪🔥';

      // Process the notification (e.g. send an email, update a database, etc.)
      console.log('Sending notification:', messageText);
      await redis.xack(stream, group, message[0]);
    }
  }
}

cron.schedule('0 9 * * *', () => {
  console.log('Sending notifications to subscribers...');
  sendUnifiedMessage();
});

module.exports = {
  populateStream,
  sendNotifications,
};