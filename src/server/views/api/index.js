const router = require('express').Router();

const jobAdd = require('./jobAdd');
const jobRetry = require('./jobRetry');
const jobRemove = require('./jobRemove');
const bulkJobsRemove = require('./bulkJobsRemove');
const bulkJobsRetry = require('./bulkJobsRetry');
const queuePause = require('./queuePause');
const queueResume = require('./queueResume');

router.post('/queue/:queueHost/:queueName/job', jobAdd);
router.post('/queue/:queueHost/:queueName/job/bulk', bulkJobsRemove);
router.patch('/queue/:queueHost/:queueName/job/bulk', bulkJobsRetry);
router.patch('/queue/:queueHost/:queueName/job/:id', jobRetry);
router.delete('/queue/:queueHost/:queueName/job/:id', jobRemove);
router.post('/queue/:queueHost/:queueName/queue/pause', queuePause);
router.post('/queue/:queueHost/:queueName/queue/resume', queueResume);

module.exports = router;
