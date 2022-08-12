import asyncHandler from 'express-async-handler'
import { SUCCESS, FAILED, DATA_INSERTED, DATA_UPDATED, DATA_DELETED  } from '../config/constants.js'
import Step from "../models/stepModel.js"

// @desc    Save a new step
// @route   POST /api/steps
// @access  Private
const createStep = asyncHandler(async (req, res) => {
    try {
        const data = req.body

        const newStep = await Step.create(data)
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_INSERTED,
            data: newStep,
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

        const updatedStep = await Step.update(data, {where: {id}})
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_UPDATED,
            data: updatedStep,
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

        const deletedStep = await Step.destroy({where: {id}})
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_DELETED,
            data: deletedStep,
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