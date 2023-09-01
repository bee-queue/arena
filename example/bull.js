const express = require('express');
const path = require('path');
const Arena = require('../');
const Bull = require('bull');

// Select ports that are unlikely to be used by other services a developer might be running locally.
const HTTP_SERVER_PORT = 4735;
const REDIS_SERVER_PORT = 6379;

// Create a Redis server. This is only for convenience

async function main() {
  const queue = new Bull('name_of_my_queue', {
    redis: {
      port: REDIS_SERVER_PORT,
    },
  });

  // Fake process function to move newly created jobs in the UI through a few of the job states.
  queue.process(async function (job) {
    // Wait 5sec
    job.progress(20);
    await new Promise((res) => setTimeout(res, 5000));

    // Randomly succeeds or fails the job to put some jobs in completed and some in failed.
    if (Math.random() > 0.5) {
      throw new Error('fake error');
    }
  });

  await queue.add({});

  // adding delayed jobs
  const delayedJob = await queue.add({}, {delay: 60 * 1000});
  delayedJob.log('Log message');

  // add repeatable jobs
  await queue.add({}, {repeat: {cron: '15 * * * *'}});

  const app = Arena(
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
      customJsPath: 'http://localhost:4735/example.js',
    },
    {
      port: HTTP_SERVER_PORT,
    }
  );

  app.use(express.static(path.join(__dirname, 'public')));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
