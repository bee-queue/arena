const Arena = require('../');
const { Queue, QueueScheduler, Worker } = require('bullmq');
const RedisServer = require('redis-server');

// Select ports that are unlikely to be used by other services a developer might be running locally.
const HTTP_SERVER_PORT = 4735;
const REDIS_SERVER_PORT = 4736;

// Create a Redis server. This is only for convenience

async function main() {
  const server = new RedisServer(REDIS_SERVER_PORT);
  await server.open();
  const queueName = 'name_of_my_queue';

  const queueScheduler = new QueueScheduler(queueName, {
    connection: { port: REDIS_SERVER_PORT },
  });
  await queueScheduler.waitUntilReady();

  const queue = new Queue(queueName, {
    connection: { port: REDIS_SERVER_PORT },
  });

  new Worker(queueName, async () => {
    processed = true;
  });

  // adding delayed jobs
  const delayedJob = await queue.add('delayed', {}, { delay: 60 * 1000 });
  delayedJob.log('Log message');

  Arena(
    {
      BullMQ: Queue,

      queues: [
        {
          // Required for each queue definition.
          name: 'name_of_my_queue',

          // User-readable display name for the host. Required.
          hostId: 'Queue Server 1',

          // Queue type (Bull or Bullmq or Bee - default Bull).
          type: 'bullmq',

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
