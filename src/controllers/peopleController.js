import asyncHandler from 'express-async-handler'
import { SUCCESS, DATA_LOADED, FAILED, DATA_UPDATED  } from '../config/constants.js'
import People from "../models/peopleModel.js"
import Step from '../models/stepModel.js'

// @desc    Get people
// @route   GET /api/people?category_id={id}
// @access  Public
const getPeople = asyncHandler(async (req, res) => {
    try {
        const data = req.query
        
        const condition = {}
        if(data.category_id) condition.category_id = data.category_id

        const people = await People.findAll({
            where: condition,
            attributes: ['id', 'name', 'job', 'place', 'category_id'],
        })
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_LOADED,
            data: people,
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

// @desc    Get people and steps by id
// @route   GET /api/people/{id}
// @access  Public
const getPeopleById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        const people = await People.findByPk(id, {include: {model: Step, as: 'steps'}})
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_LOADED,
            data: people,
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

// @desc    Update people
// @route   PUT /api/people/{id}
// @access  Private
const putPeople = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const people = await People.update(data, {where: {id}})
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_UPDATED,
            data: people,
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
    getPeople,
    getPeopleById,
    putPeople,
}