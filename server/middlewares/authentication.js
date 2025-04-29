const { verifyToken } = require("../helpers/jwt")
const {User} = require('../models')

async function authentication(req,res,next) {
    try {
        const bearerToken = req.headers.authorization

        if (!bearerToken) {
            throw {name : 'Unauthorized', message : 'Invalid Token'}
        }

        const clearToken = bearerToken.slice('Bearer '.length)
        const payload = verifyToken(clearToken)

        const dataUser = User.findOne({
            where : {
                id : payload.id
            }
        })

        if (!dataUser) {
            throw {name :'Unauthorized', message : 'Invalid Token'}
        }

        req.user = dataUser

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authentication