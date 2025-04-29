const express = require('express')
const { PlanController } = require('../controllers/PlanController')
const plan = express.Router()

plan.post('/add-plan', PlanController.createPlan) //! to add new plan
plan.get('/:id', PlanController.getPlanById) //! to get plan by id

module.exports = plan