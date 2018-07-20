const router = require('express').Router()

const dashboardRoutes = require('./dashboard')
const apiRoutes = require('./api')

router.use('/api', apiRoutes)
router.use('/', dashboardRoutes)

router.get('/healthz', (req, res) => {
  res.status(200).send(':)')
})

module.exports = router
