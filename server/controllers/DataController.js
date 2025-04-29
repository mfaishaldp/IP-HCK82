const axios = require('axios')
const API_KEY_GEOCODE = process.env.API_KEY_GEOCODE

class DataController {
    static async getDataGeoCode (req,res,next) {
        try {

            const {city , country} = req.query

            if (!city) {
                throw {name : 'BadRequest' , message : 'Please fill city'}
            }
            
            
            if (!country) {
                throw {name : 'BadRequest' , message : 'Please fill country'}
            }

            const response = await axios({
                method: 'get',
                url: `https://geocode.maps.co/search?`,
                params : {
                    api_key : API_KEY_GEOCODE,
                    city : req.query.city,
                    country : req.query.country
                }
            });

            if (response.data.length === 0) {
                throw {name : 'NotFound', message : 'Location not found'}
            }
            
            res.status(200).json({
                place_id : response.data[0].place_id,
                display_name : response.data[0].display_name,
                latitude : Number(response.data[0].lat),
                longitude : Number(response.data[0].lon)
            })

        } catch (error) {
            next(error)
        }
    }

    static async getDataMateo (req,res,next) {
        try {

            const {latitude , longitude} = req.query

            if (!latitude) {
                throw {name : 'BadRequest' , message : 'Please fill latitude'}
            }
            
            
            if (!longitude) {
                throw {name : 'BadRequest' , message : 'Please fill longitude'}
            }

            const response = await axios ({
                method : 'get',
                url : 'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&forecast_days=2',
                params : {
                    latitude : req.query.latitude,
                    longitude : req.query.longitude
                }
            })

            const resTime = []
            const resTemp = []

            for (let i = 0; i < response.data.hourly.time.length; i++) { //! to get data > current datetime
                if (new Date(response.data.hourly.time[i]) > new Date()) {
                    resTime.push(response.data.hourly.time[i])
                    resTemp.push(response.data.hourly.temperature_2m[i])
                }
            }

            res.status(200).json({
                latitude : Number(req.query.latitude),
                longitude : Number(req.query.longitude),
                timezone : response.data.timezone,
                temperature_type : response.data.hourly_units.temperature_2m,
                data : {
                    time : resTime,
                    temperature : resTemp
                }
            })

        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    DataController
}