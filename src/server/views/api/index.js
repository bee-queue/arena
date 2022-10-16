const router = require('express').Router();

const addFlow = require('./addFlow');
const getFlow = require('./getFlow');
const jobAdd = require('./jobAdd');
const jobPromote = require('./jobPromote');
const jobRetry = require('./jobRetry');
const jobRemove = require('./jobRemove');
const repeatableJobRemove = require('./repeatableJobRemove');
const bulkJobsPromote = require('./bulkJobsPromote');
const bulkJobsRemove = require('./bulkJobsRemove');
const bulkJobsRetry = require('./bulkJobsRetry');
const queuePause = require('./queuePause');
const queueResume = require('./queueResume');

router.post('/queue/:queueHost/:queueName/job', jobAdd);
router.post('/flow/:flowHost/:connectionName/flow', addFlow);
router.get('/flow/:flowHost/:connectionName/flow', getFlow);
router.post('/queue/:queueHost/:queueName/job/bulk', bulkJobsRemove);
router.patch('/queue/:queueHost/:queueName/job/bulk', bulkJobsRetry);
router.patch('/queue/:queueHost/:queueName/delayed/job/bulk', bulkJobsPromote);
router.patch('/queue/:queueHost/:queueName/delayed/job/:id', jobPromote);
router.delete(
  '/queue/:queueHost/:queueName/repeatable/job/:id',
  repeatableJobRemove
);
router.patch('/queue/:queueHost/:queueName/job/:id', jobRetry);
router.put('/queue/:queueHost/:queueName/pause', queuePause);
router.put('/queue/:queueHost/:queueName/resume', queueResume);
router.delete('/queue/:queueHost/:queueName/job/:id', jobRemove);

module.exports = router;
