const express = require('express')
const { DataContoller } = require('../controllers/DataController')
const data = express.Router()

data.get('/geo-code', DataContoller.getDataGeoCode)

module.exports = data