const {Plan} = require('../models')
class PlanController {
    static async createPlan (req,res,next) {
        try {

            // const {longitudeLocation, latitudeLocation, displayNameLocation, longitudeDestination, latitudeDestination, displayNameDestination, recommendationItems,  timeTemperaturePredicted } = req.body

            const newBody = {...req.body}
            newBody.UserId = req.user.id

            const data = await Plan.create(newBody)
            
            res.status(201).json(data)
            
        } catch (error) {
            next(error)
        }
    }

    static async getPlanById (req,res,next) {
        try {
            const {id : planId} = req.params

            const data = await Plan.findByPk(+planId)

            if (!data) {
                throw {name : 'NotFound', message : 'Error not found'}
            }

            res.status(200).json(data)

        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }
}

module.exports = {
    PlanController
}