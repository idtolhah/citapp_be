import asyncHandler from 'express-async-handler'
import { DATA_LOADED, FAILED, SUCCESS } from '../config/constants.js'
import Profile from '../models/profileModel.js'
import User from '../models/userModel.js'

// @desc    Get people
// @route   GET /api/people?position={position}
// @access  Private
const getPeople = asyncHandler(async (req, res) => {
    try {
        // filter
        var condition = {}
        if(req.query.position) condition.position = req.query.position

        // sort
        var sortBy = 'createdAt'
        var sortDirection = 'ASC'
        if(req.query.sortby) sortBy = req.query.sortby
        if(req.query.sortdirection) sortDirection = req.query.sortdirection
        var sort = [sortBy, sortDirection]

        const users = await User.findAll({
            attributes: ['id', 'name', 'createdAt'],
            include: [
                { 
                    model: Profile, 
                    where: condition, 
                    attributes: ['position'], 
                },
            ],
            order: [sort],
            raw: true,
        })
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_LOADED,
            data: users,
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

// @desc    Get positions
// @route   GET /api/positions
// @access  Private
const getPositions = asyncHandler(async (req, res) => {
    try {        
        const positions = await Profile.findAll({
            attributes: ['position'], 
            group: ['position'],
            order: [ ['position', 'ASC'] ]
        })
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_LOADED,
            data: positions,
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
    getPositions,
}