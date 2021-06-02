const router = require('express').Router();

const queueList = require('./queueList');
const queueDetails = require('./queueDetails');
const queueJobsByState = require('./queueJobsByState');
const flowList = require('./flowList');
const flowDetails = require('./flowDetails');
const jobDetails = require('./jobDetails');

router.get('/', queueList);
router.get('/flows', flowList);
router.get('/flows/:flowHost/:connectionName', flowDetails);
router.get('/:queueHost/:queueName', queueDetails);
router.get(
  '/:queueHost/:queueName/:state(waiting|active|completed|succeeded|failed|delayed|paused|waiting-children).:ext?',
  queueJobsByState
);
router.get('/:queueHost/:queueName/:id', jobDetails);

module.exports = router;
