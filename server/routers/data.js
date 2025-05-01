const express = require('express')
const { DataController } = require('../controllers/DataController')
const data = express.Router()

data.get('/get-lon-lat', DataController.getDataGeoCode) //! to get long-lat based on city & country
data.get('/get-location-name', DataController.getDataOpenCage) //! to get city n country based on lat & lon
data.get('/get-temperature', DataController.getDataMateo) //! to get temperature based on long-lat
data.get('/gemini', DataController.getDataGemini) //! to get object recommend outfit

module.exports = data