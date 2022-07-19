import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Profile from '../models/profileModel.js'
import { SUCCESS, FAILED, DATA_UPDATED, DATA_LOADED } from '../config/constants.js'

// @desc    Get image
// @route   GET /api/users/:id/image
// @access  Public
const getImage = asyncHandler(async (req, res) => {
    try {
        const user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['image']})
        if(user.length == 0) throw new Error("User does not exist!")
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_LOADED,
            data: user.image,
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

// @desc    Update user image
// @route   PUT /api/users/:id/image
// @access  Private
const putImage = asyncHandler(async (req, res) => {
    try {
        const image = req.body.image
        
        if(!image || image == '') throw new Error('image is required')
        
        const updatedUser = await Profile.update({
            image,
        }, {
            where: {user_id: req.params.id}
        })
            
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_UPDATED,
            data: updatedUser,
        })
    } catch (e) {
        res.status(500)
        res.json({
            status: FAILED,
            message: "" + e,
            data: null,
        })
    }
})

// @desc    Get basic info
// @route   GET /api/users/:id/basic
// @access  Public
const getBasicInfo = asyncHandler(async (req, res) => {
    try {
        const user = await Profile.findOne({
            where: {user_id: req.params.id}, 
            attributes: ['bio', 'gender', 'createdAt'],
            include: [{ model: User, attributes: ['name', 'email'] }],
        })
        if(user.length == 0) throw new Error("User does not exist!")

        const data = {
            fullname: user.user.name,
            email: user.user.email,
            bio: user.bio,
            gender: user.gender,
            createdAt: user.createdAt,
        }

        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_LOADED,
            data: data,
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

// @desc    Update user basic info
// @route   PUT /api/users/:id/basic
// @access  Private
const putBasicInfo = asyncHandler(async (req, res) => {
    try {
        const fullname = req.body.fullname
        const bio = req.body.bio
        const gender = req.body.gender

        if(!fullname || fullname == '') throw new Error('fullname is required')
        if(!bio || bio == '') throw new Error('bio is required')
        if(!gender || gender == '') throw new Error('gender is required')

        await Profile.update({ bio, gender }, { where: {user_id: req.params.id} })
        await User.update({ name: fullname }, { where: {id: req.params.id} })
        
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_UPDATED,
            data: {
                fullname,
                bio,
                gender,
            },
        })
    } catch (e) {
        res.status(500)
        res.json({
            status: FAILED,
            message: "" + e,
            data: null,
        })
    }
})

// @desc    Get array
// @route   GET /api/users/:id/:entity
// @access  Public
const getArray = asyncHandler(async (req, res) => {
    try {
        let user = {}
        let data = {}
        if(req.params.entity == 'achievements') {
            user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['achievements']})
            data = JSON.parse(user.achievements) || []
        }
        if(req.params.entity == 'skills') {
            user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['skills']})
            data = JSON.parse(user.skills) || []
        }
        if(req.params.entity == 'languages') {
            user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['languages']})
            data = JSON.parse(user.languages) || []
        }
        if(req.params.entity == 'hobbies') {
            user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['hobbies']})
            data = JSON.parse(user.hobbies) || []
            }
        if(req.params.entity == 'contacts') {
            user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['contacts']})
            data = JSON.parse(user.contacts) || []
        }
        if(req.params.entity == 'projects') {
            user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['projects']})
            data = JSON.parse(user.projects) || []
        }
        if(req.params.entity == 'experiences') {
            user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['experiences']})
            data = JSON.parse(user.experiences) || []
        }
        if(req.params.entity == 'educations') {
            user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['educations']})
            data = JSON.parse(user.educations) || []
        }

        if(user.length == 0) throw new Error("User does not exist!")

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

// @desc    Update user array (achievements, skills, etc)
// @route   PUT /api/users/:id/:entity
// @access  Private
const putArray = asyncHandler(async (req, res) => {
    try {
        let array = req.body.array
        // if(!array || array == '') throw new Error('array is required')

        let data = {}
        array = JSON.stringify(array)
        if(req.params.entity == 'achievements') data = { achievements: array }
        if(req.params.entity == 'skills') data = { skills: array }
        if(req.params.entity == 'languages') data = { languages: array }
        if(req.params.entity == 'hobbies') data = { hobbies: array }
        if(req.params.entity == 'contacts') data = { contacts: array }
        if(req.params.entity == 'experiences') data = { experiences: array }
        if(req.params.entity == 'educations') data = { educations: array }
        if(req.params.entity == 'projects') {
            const user = await Profile.findOne({where: {user_id: req.params.id}, attributes: ['projects']})
            let projects = JSON.parse(user.projects) || []
            array = JSON.parse(array)

            if(req.params.entityid) {
                projects = projects.filter(item => item.id !== array[0].id);
            }
            if(req.params.operation != 'delete') {
                projects.push(array[0])
            }

            data = { projects: JSON.stringify(projects) }
        }

        const updatedUser = await Profile.update(data, {
            where: {user_id: req.params.id}
        })

        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_UPDATED,
            data: updatedUser,
        })
    } catch (e) {
        res.status(500)
        res.json({
            status: FAILED,
            message: "" + e,
            data: null,
        })
    }
})

export {
    getImage,
    putImage,
    getBasicInfo,
    putBasicInfo,
    getArray,
    putArray,
}