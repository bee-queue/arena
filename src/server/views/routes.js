const router = require('express').Router();

const dashboardRoutes = require('./dashboard');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/', dashboardRoutes);

module.exports = router;
