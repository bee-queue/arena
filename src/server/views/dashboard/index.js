const router = require('express').Router();

const queueList = require('./queueList');
const queueDetails = require('./queueDetails');
const queueJobsByState = require('./queueJobsByState');
const jobDetails = require('./jobDetails');

router.get('/', queueList);
router.get('/:queueName', queueDetails);
router.get('/:queueName/:state', queueJobsByState);
router.get('/:queueName/:id(\\d+)', jobDetails);

module.exports = router;
