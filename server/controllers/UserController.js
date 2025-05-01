const {User,Plan} = require('../models/index')
const {verifyToken} = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

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

    static async googleLogin (req,res,next) {
        try {
            const {googleToken} = req.body
            
            if (!googleToken) {
                throw {name : 'BadRequest', message : 'Google Token is required'}
            }

            const client = new OAuth2Client();
            
            const ticket = await client.verifyIdToken({
                idToken : googleToken,
                audience : process.env.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload()

            const [user] = await User.findOrCreate({
                where : {email : payload.email},
                defaults : {
                    username : payload.email.split("@")[0],
                    password : Date.now().toString() + Math.random().toString()
                }
            })

            const access_token = signToken({
                id : user.id,
                username : user.username,
                email : user.email,
            })

            res.status(200).json({access_token})

        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }

}

module.exports = {
    UserController
}