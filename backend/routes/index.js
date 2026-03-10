const express = require('express')
const router = express.Router()
const jobsRoutes = require('./jobs')

router.use('/api/jobs', jobsRoutes)

module.exports = router