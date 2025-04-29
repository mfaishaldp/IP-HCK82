const express = require('express')
const { UserController } = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.post('/add-plan',authentication, UserController.createPlan)

router.use('/data',authentication,require('./data'))

module.exports = router