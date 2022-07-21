import axios from 'axios'
import db from '../config/db.js'
import asyncHandler from 'express-async-handler'
import { DATA_LOADED, FAILED, SUCCESS } from '../config/constants.js'
import Profile from '../models/profileModel.js'
import User from '../models/userModel.js'
const Op = db.Sequelize.Op;

// @desc    Get people
// @route   GET /api/people?position={position}&sortby={sortby}&sortdirection={sortdirection}&keyword={sortdirection}
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
            where: {
                name: {
                  [Op.like]: `%${req.query.name}%`
                }
            },
            attributes: ['id', 'name', 'createdAt'],
            include: [
                { 
                    model: Profile, 
                    where: condition, 
                    attributes: ['position'], 
                },
            ],
            order: [sort],
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
// @route   GET /api/people/positions
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

// @desc    Get person by id
// @route   GET /api/people/{id}
// @access  Private
const getPersonById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id

        // get user data
        const user = await User.findByPk(id, {attributes: ['id', 'name', 'email', 'createdAt']})

        // get profile data
        const profile = await Profile.findOne({where: {id}, attributes: ['position','educations']})
        let education = JSON.parse(profile.educations)
        education = education?.length > 0 ? education[education.length-1].title : '-'

        // get room data
        const {data: rooms} = await axios.get(`http://localhost:5004/api/rooms?user_id=${id}`)
        
        let company_id = rooms.data.filter(e => e.parent_id == null)[0]?.id
        let departments = rooms.data.filter(e => e.type == 'G' && e.parent_id == company_id)
        let superior = await User.findByPk(departments[0].user2_id)

        const data = {
            id: user.id,
            name: user.name,
            position: profile.position,
            email: user.email,
            createdAt: user.createdAt,
            education,
            department: departments[0]?.name || '-',
            superior: superior?.name || '-',
        }
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_LOADED,
            data,
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
    getPersonById,
    getPositions,
}