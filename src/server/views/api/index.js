const router = require('express').Router();

const jobRetry = require('./jobRetry');
const jobRemove = require('./jobRemove');
const bulkJobsRemove = require('./bulkJobsRemove');
const bulkJobsRetry = require('./bulkJobsRetry');

router.get('/', function handler(req, res) {
  return res.status(200).send('asdf')
})
router.post('/queue/:queueName/job/bulk', bulkJobsRemove);
router.patch('/queue/:queueName/job/bulk', bulkJobsRetry);
router.patch('/queue/:queueName/job/:id(\\d+)', jobRetry);
router.delete('/queue/:queueName/job/:id(\\d+)', jobRemove);

module.exports = router;
