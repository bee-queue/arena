const sync = require('synchronize');
const router = require('express').Router();

const dashboardRoutes = require('./dashboard');

router.use((req, res, next) => sync.fiber(next));
router.use('/dashboard', dashboardRoutes);

module.exports = router;
