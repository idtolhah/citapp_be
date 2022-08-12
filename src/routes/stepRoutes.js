import express from 'express'
import { createStep, deleteStep, updateStep } from '../controllers/stepController.js'
const router = express.Router()

router.route('/')
    .post(createStep)

router.route('/:id')
    .put(updateStep)
    .delete(deleteStep)

export default router