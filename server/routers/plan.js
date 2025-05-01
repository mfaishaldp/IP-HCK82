const express = require('express')
const { PlanController } = require('../controllers/PlanController')
const { guardUser } = require('../middlewares/authorization')
const plan = express.Router()

plan.post('/add-plan', PlanController.createPlan) //! to add new plan

plan.get('/user', PlanController.getPlanByUserId) //! to get plan by user id
plan.delete('/:id', guardUser, PlanController.delPlanById) //! to delete plan by id, need authorization
plan.put('/:id', guardUser, PlanController.updateStatusByPlanId) //! to update status plan by id, need authorization

plan.get('/:id', PlanController.getPlanById) //! to get plan by id

module.exports = plan