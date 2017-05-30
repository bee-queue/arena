const router = require('express').Router();

const queueList = require('./queueList');
const queueDetails = require('./queueDetails');
const queueJobsByState = require('./queueJobsByState');
const jobDetails = require('./jobDetails');
const jobRetry = require('./jobRetry');
const jobRemove = require('./jobRemove');
const bulkJobsRemove = require('./bulkJobsRemove');
const bulkJobsRetry = require('./bulkJobsRetry');

router.get('/', queueList);
router.get('/:queueName', queueDetails);
router.get('/:queueName/:id(\\d+)', jobDetails);
router.patch('/:queueName/:id(\\d+)', jobRetry);
router.delete('/:queueName/:id(\\d+)', jobRemove);
router.get('/:queueName/:state', queueJobsByState);
router.post('/:queueName/:state/bulk', bulkJobsRemove);
router.patch('/:queueName/:state/bulk', bulkJobsRetry);

module.exports = router;
