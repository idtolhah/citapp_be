import asyncHandler from 'express-async-handler'
import { SUCCESS, DATA_LOADED, FAILED  } from '../config/constants.js'
import Category from "../models/categoryModel.js"

// @desc    Get categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.findAll({attributes: ['id', 'title']})
    
        res.status(200)
        res.json({
            status: SUCCESS,
            message: DATA_LOADED,
            data: categories,
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
    getCategories,
}