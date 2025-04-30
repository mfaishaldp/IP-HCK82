const express = require('express')
const { UserController } = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', UserController.register) //! regist
router.post('/login', UserController.login) //! login
router.post('/google-login', UserController.googleLogin) //! login

router.use('/plan',authentication,require('./plan'))
router.use('/data',authentication,require('./data'))

module.exports = router