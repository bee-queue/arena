const router = require('express').Router();

const dashboardRoutes = require('./dashboard');

router.use('/dashboard', dashboardRoutes);

module.exports = router;
