const {Plan,Status} = require('../models')
class PlanController {
    static async createPlan (req,res,next) {
        try {

            // const {longitudeLocation, latitudeLocation, displayNameLocation, longitudeDestination, latitudeDestination, displayNameDestination, recommendationItems,  timeTemperaturePredicted } = req.body

            const newBody = {...req.body}
            newBody.UserId = req.user.id

            const data = await Plan.create(newBody)
            
            res.status(201).json(data)
            
        } catch (error) {
            console.log(error);
            
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
            next(error)
        }
    }

    static async getPlanByUserId (req,res,next) {
        try {
            const {id : userId} = req.user

            const data = await Plan.findAll({
                where : {
                    UserId : +userId
                },
                include : [{
                    model : Status
                }],
                order : [['createdAt','ASC']]
            })

            // if (!data) {
            //     throw {Name : 'NotFound', message : 'Plan not found'}
            // }

            res.status(200).json(data)

        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }

    static async delPlanById (req,res,next) {
        try {
            const {id : planId} = req.params

            const dataDel = await Plan.findByPk(+planId)

            // if (!dataDel) {
            //     throw {name : 'NotFound', message : 'Plan not found'}
            // }

            await Plan.destroy({
                where : {
                    id : +planId
                }
            })

            res.status(200).json(dataDel)

        } catch (error) {
            next(error)
        }
    }

    static async updateStatusByPlanId (req,res,next) {
        try {
            const {id : planId} = req.params
            const {statusId} = req.body

            const data = await Plan.findByPk(+planId)
            
            // if (!data) {
            //     throw {name : 'NotFound', message : 'Plan Not Found'}
            // }

            await data.update({
                StatusId : statusId
            })

            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    PlanController
}