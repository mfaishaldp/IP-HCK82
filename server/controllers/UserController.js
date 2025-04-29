const {User} = require('../models/index')
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

}

module.exports = {
    UserController
}