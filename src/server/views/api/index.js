const router = require('express').Router();

const addFlow = require('./addFlow');
const getFlow = require('./getFlow');
const jobAdd = require('./jobAdd');
const jobPromote = require('./jobPromote');
const jobRetry = require('./jobRetry');
const jobRemove = require('./jobRemove');
const jobDataUpdate = require('./jobDataUpdate');
const repeatableJobRemove = require('./repeatableJobRemove');
const bulkJobsClean = require('./bulkJobsClean');
const bulkJobsPromote = require('./bulkJobsPromote');
const bulkJobsRemove = require('./bulkJobsRemove');
const bulkJobsRetry = require('./bulkJobsRetry');
const queuePause = require('./queuePause');
const queueResume = require('./queueResume');
const queueUpdateMeta = require('./queueUpdateMeta');
const queueRemoveRateLimitKey = require('./queueRemoveRateLimitKey');

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
router.put('/queue/:queueHost/:queueName/job/:id/data', jobDataUpdate);
router.patch('/queue/:queueHost/:queueName/job/:id', jobRetry);
router.put('/queue/:queueHost/:queueName/pause', queuePause);
router.put('/queue/:queueHost/:queueName/resume', queueResume);
router.put('/queue/:queueHost/:queueName/update-meta', queueUpdateMeta);
router.delete('/queue/:queueHost/:queueName/job/:id', jobRemove);
router.delete('/queue/:queueHost/:queueName/jobs/bulk', bulkJobsClean);
router.delete(
  '/queue/:queueHost/:queueName/rate-limit-key',
  queueRemoveRateLimitKey
);

module.exports = router;
