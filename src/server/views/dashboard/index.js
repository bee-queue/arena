const router = require('express').Router();

const queueList = require('./queueList');
const queueDetails = require('./queueDetails');
const queueJobsByState = require('./queueJobsByState');
const jobDetails = require('./jobDetails');

router.get('/', queueList);
router.get('/:queueHost/:queueName', queueDetails);
router.get('/:queueHost/:queueName/:id(\\d+)', jobDetails);
router.get('/:queueHost/:queueName/:state', queueJobsByState);

module.exports = router;
