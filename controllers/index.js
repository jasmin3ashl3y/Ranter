const apiRoutes = require('./apiRoutes')

const router = require('express').Router()

router.use('/api', apiRoutes)

module.exports = router