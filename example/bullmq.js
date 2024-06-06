const Arena = require('../');
const IORedis = require('ioredis');
const {Queue, Worker, FlowProducer} = require('bullmq');

// Select ports that are unlikely to be used by other services a developer might be running locally.
const HTTP_SERVER_PORT = 4735;
const REDIS_SERVER_PORT = 6379;

async function main() {
  const queueName = 'name_of_my_queue';
  const parentQueueName = 'name_of_my_parent_queue';

  const connection = new IORedis({port: REDIS_SERVER_PORT});

  const queue = new Queue(queueName, {
    connection: {port: REDIS_SERVER_PORT},
  });
  new Queue(parentQueueName, {
    connection: {port: REDIS_SERVER_PORT},
  });

  const flow = new FlowProducer({
    connection: {port: REDIS_SERVER_PORT},
  });

  new Worker(
    queueName,
    async function (job) {
      await job.updateProgress(20);

      // Wait 5sec
      await new Promise((res) => setTimeout(res, 5000));

      // Randomly succeeds or fails the job to put some jobs in completed and some in failed.
      if (Math.random() > 0.5) {
        throw new Error('fake error');
      }
    },
    {
      concurrency: 3,
      connection: {port: REDIS_SERVER_PORT},
    }
  );

  new Worker(
    parentQueueName,
    async function () {
      // Wait 10sec
      await new Promise((res) => setTimeout(res, 10000));

      // Randomly succeeds or fails the job to put some jobs in completed and some in failed.
      if (Math.random() > 0.5) {
        throw new Error('fake error');
      }
    },
    {
      connection: {port: REDIS_SERVER_PORT},
    }
  );

  const children = Array.from(Array(65).keys()).map((index) => ({
    name: 'child',
    data: {idx: index, foo: 'bar'},
    queueName,
  }));
  await flow.add({
    name: 'parent-job',
    queueName: parentQueueName,
    data: {},
    children,
  });

  // adding delayed jobs
  const delayedJob = await queue.add('delayed', {}, {delay: 60 * 1000});
  await queue.add('cron', {}, {repeat: {pattern: '* 1 * 1 *'}});
  delayedJob.log('Log message');

  Arena(
    {
      BullMQ: Queue,

      queues: [
        {
          // Required for each queue definition.
          name: queueName,

          // User-readable display name for the host. Required.
          hostId: 'Queue Server 1',

          // Queue type (Bull or Bullmq or Bee - default Bull).
          type: 'bullmq',

          redis: connection,
        },
        {
          // Required for each queue definition.
          name: parentQueueName,

          // User-readable display name for the host. Required.
          hostId: 'Queue Server 2',

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
