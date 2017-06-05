const router = require('express').Router();

const dashboardRoutes = require('./dashboard');
const apiRoutes = require('./api');

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
