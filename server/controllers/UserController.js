const {User,Plan} = require('../models/index')
const {verifyToken} = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')
class UserController {

    static async register (req,res,next) {
        try {
            const data = await User.create(req.body)
            res.status(201).json({
                id : data.id,
                username : data.username,
                email : data.email
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async login (req,res,next) {
        try {
            const {username, password} = req.body

            if (!username) {
                throw {name : 'BadRequest', message : 'Username is required'}
            }
            if (!password) {
                throw {name : 'BadRequest', message : 'Password is required'}
            }

            const data = await User.findOne({
                where : {
                    username : username
                }
            })
            
            

            if (!data) {
                throw {name : 'Unauthorized' , message : 'Invalid username/password'}
            }

            const isValid = verifyToken(password, data.password)

            if (!isValid) {
                throw {name : 'Unauthorized', message : 'Invalid username/password'}
            }

            const jwtToken = signToken({
                id : data.id,
                username : data.username,
                email : data.email,
            })

            res.status(200).json({
                access_token : jwtToken
            })

        } catch (error) {
            next(error)
        }
    }

    static async createPlan (req,res,next) {
        try {

            const {longitudeLocation, latitudeLocation, displayNameLocation, longitudeDestination, latitudeDestination, displayNameDestination, recommendationItems,  timeTemperaturePredicted } = req.body

            if (!longitudeLocation) {
                throw {name : 'BadRequest', message : 'Longitude Location is required'}
            }
            if (!latitudeLocation) {
                throw {name : 'BadRequest', message : 'Latitude Location is required'}
            }
            if (!displayNameLocation) {
                throw {name : 'BadRequest', message : 'Location Name is required'}
            }
            if (!longitudeDestination) {
                throw {name : 'BadRequest', message : 'Longitude Destination is required'}
            }
            if (!latitudeDestination) {
                throw {name : 'BadRequest', message : 'Latitude Destination is required'}
            }
            if (!displayNameDestination) {
                throw {name : 'BadRequest', message : 'Destination Name is required'}
            }
            if (!recommendationItems) {
                throw {name : 'BadRequest', message : 'Recommendation Item is required'}
            }
            if (!timeTemperaturePredicted) {
                throw {name : 'BadRequest', message : 'Time and Temperature is required'}
            }

            const newBody = {...req.body}
            newBody.UserId = req.user.id

            const data = await Plan.create(newBody)
            
            res.status(201).json(data)
            
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    UserController
}