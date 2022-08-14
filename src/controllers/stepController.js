import asyncHandler from 'express-async-handler'
import { SUCCESS, FAILED, DATA_INSERTED, DATA_UPDATED, DATA_DELETED  } from '../config/constants.js'
import Step from "../models/stepModel.js"

// @desc    Save a new step
// @route   POST /api/steps
// @access  Private
const createStep = asyncHandler(async (req, res) => {
    try {
        const data = req.body

        await Step.create(data)
        const steps = await Step.findAll({where: {people_id: data.people_id}})
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_INSERTED,
            data: steps,
        })
    } catch(err) {
        res.status(401)
        res.json({
            status: FAILED,
            message: "" + err,
            data: null,
        })
    }
})

// @desc    Update a step
// @route   PUT /api/steps/{id}
// @access  Private
const updateStep = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        await Step.update(data, {where: {id}})
        const steps = await Step.findAll({where: {people_id: data.people_id}})
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_UPDATED,
            data: steps,
        })
    } catch(err) {
        res.status(401)
        res.json({
            status: FAILED,
            message: "" + err,
            data: null,
        })
    }
})

// @desc    Delete a step
// @route   DELETE /api/steps/{id}
// @access  Private
const deleteStep = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const step = await Step.findByPk(id)
        let steps
        if(step) {
            await Step.destroy({where: {id}})
            steps = await Step.findAll({where: {people_id: step.people_id}})
        }
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_DELETED,
            data: steps,
        })
    } catch(err) {
        res.status(401)
        res.json({
            status: FAILED,
            message: "" + err,
            data: null,
        })
    }
})

export {
    createStep,
    updateStep,
    deleteStep,
}