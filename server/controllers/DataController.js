const axios = require('axios')
const genAi = require('../helpers/genAi')

const API_KEY_GEOCODE = process.env.API_KEY_GEOCODE
const API_KEY_OPEN_CAGE = process.env.API_KEY_OPEN_CAGE

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
                city : response.data[0].display_name,
                country : req.query.country,
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

            // if (!latitude) {
            //     throw {name : 'BadRequest' , message : 'Please fill latitude'}
            // }
            
            
            // if (!longitude) {
            //     throw {name : 'BadRequest' , message : 'Please fill longitude'}
            // }

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
            console.log(error);
            
            next(error)
        }
    }

    static async getDataGemini (req,res,next) {
        try {

            const {temperature} = req.query

            if (!temperature || temperature === '0') {
                throw {name : 'BadRequest', message : 'Temperature is required'}
            }


            const prompt = `
            Provide JSON data in the following format:
            {
                "top": "string",
                "bottom": "string",
                "outerwear": "string",
                "footwear": "string",
                "accessories": "string"
            }
            The outfit should be appropriate for a temperature of ${temperature} degrees Celsius.
            Only return the JSON object. Do not include any additional text or responses.
            `

            const resGemini = await genAi(prompt)

            res.status(200).json(JSON.parse(resGemini.replace("```json","").replace("```","")))

        } catch (error) {
            next(error)
        }
    }

    static async getDataOpenCage (req,res,next) {
        try {

            const {lat , lon} = req.query

            if (!lat) {
                throw {name : 'BadRequest' , message : 'Please fill latitude'}
            }
            
            
            if (!lon) {
                throw {name : 'BadRequest' , message : 'Please fill longitude'}
            }

            const response = await axios ({
                method : 'get',
                url : 'https://api.opencagedata.com/geocode/v1/json?key=' + API_KEY_OPEN_CAGE,
                params : {
                    q : `${req.query.lat}+${req.query.lon}`
                }
            })

            res.status(200).json({
                city:response.data.results[0].components.city,
                country:response.data.results[0].components.country,
                latitude : Number(req.query.lat),
                longitude : Number(req.query.lon)
            })

        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    DataController
}