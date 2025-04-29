const express = require('express')
const { DataController } = require('../controllers/DataController')
const data = express.Router()

data.get('/get-lon-lat', DataController.getDataGeoCode)
data.get('/get-temperature', DataController.getDataMateo)
data.get('/gemini', DataController.getDataGemini)

module.exports = data