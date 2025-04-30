const {Plan} = require('../models')

async function guardUser(req,res,next) {
    try {
        const {id : userId} = req.user
        const {id : planId} = req.params

        const data = await Plan.findByPk(+planId)

        if (data.UserId !== userId) {
            throw {name : 'Forbidden', message : 'Forbidden Access'}
        }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    guardUser
}