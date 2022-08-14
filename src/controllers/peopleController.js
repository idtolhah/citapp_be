import asyncHandler from 'express-async-handler'
import { SUCCESS, DATA_LOADED, FAILED, DATA_UPDATED  } from '../config/constants.js'
import { Op } from 'sequelize'
import People from "../models/peopleModel.js"
import Step from '../models/stepModel.js'
import Vote from '../models/voteModel.js'

// @desc    Get people
// @route   GET /api/people?category_id={id}&status={status}
// @access  Public
const getPeople = asyncHandler(async (req, res) => {
    try {
        const data = req.query
        
        const condition = {}
        if(data.category_id) condition.category_id = data.category_id
        if(data.status) condition.status = data.status

        const people = await People.findAll({
            where: condition,
            attributes: ['id', 'name', 'job', 'place', 'vote', 'category_id', 'status', 'createdAt'],
        })

        for (let i = 0; i < people.length; i++) {
            const votesCount = await Vote.count({where: {people_id: people[i].id}})
            people[i].vote = votesCount
        }
    
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

        const votesCount = await Vote.count({where: {people_id: id}}) 
        people.vote = votesCount
    
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
    // const t = await db.transaction()
    try {
        const { id } = req.params
        const data = req.body

        const people = await People.update(data, {where: {id}})
        
        // await t.commit()
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_UPDATED,
            data: people,
        })
    } catch(err) {
        // await t.rollback()
        res.status(401)
        res.json({
            status: FAILED,
            message: "" + err,
            data: null,
        })
    }
})

// @desc    Create people
// @route   POST /api/people
// @access  Private
const postPeople = asyncHandler(async (req, res) => {
    try {
        const data = req.body

        const people = await People.create(data)
        
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
    postPeople,
}