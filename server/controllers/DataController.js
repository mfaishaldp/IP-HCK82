const axios = require('axios')
const API_KEY_GEOCODE = process.env.API_KEY_GEOCODE

class DataContoller {
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
                lat : response.data[0].lat,
                lon : response.data[0].lon
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    DataContoller
}