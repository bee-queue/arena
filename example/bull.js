const Arena = require('../');
const Bull = require('bull');
const RedisServer = require('redis-server');

// Select ports that are unlikely to be used by other services a developer might be running locally.
const HTTP_SERVER_PORT = 4735;
const REDIS_SERVER_PORT = 4736;

// Create a Redis server. This is only for convenience

async function main() {
  const server = new RedisServer(REDIS_SERVER_PORT);
  await server.open();

  const queue = new Bull('name_of_my_queue', {
    redis: {
      port: REDIS_SERVER_PORT,
    },
  });

  // Fake process function to move newly created jobs in the UI through a few of the job states.
  queue.process(async function (job) {
    // Wait 5sec
    await new Promise((res) => setTimeout(res, 5000));

    // Randomly succeeds or fails the job to put some jobs in completed and some in failed.
    if (Math.random() > 0.5) {
      throw new Error('fake error');
    }
  });

  // adding delayed jobs
  await queue.add({}, { delay: Date.now() + 60 * 1000 });

  Arena(
    {
      Bull,

      queues: [
        {
          // Required for each queue definition.
          name: 'name_of_my_queue',

          // User-readable display name for the host. Required.
          hostId: 'Queue Server 1',

          // Queue type (Bull or Bee - default Bull).
          type: 'bull',

          redis: {
            // host: 'localhost',
            port: REDIS_SERVER_PORT,
          },
        },
      ],
    },
    {
      port: HTTP_SERVER_PORT,
    }
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
