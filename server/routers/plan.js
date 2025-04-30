const express = require('express')
const { PlanController } = require('../controllers/PlanController')
const plan = express.Router()

plan.post('/add-plan', PlanController.createPlan) //! to add new plan

plan.get('/user', PlanController.getPlanByUserId) //! to get plan by user id, need authorization
plan.delete('/delete/:id', PlanController.delPlanById) //! to delete plan by id, need authorization

plan.get('/:id', PlanController.getPlanById) //! to get plan by id

module.exports = plan