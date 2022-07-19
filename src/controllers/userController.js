import asyncHandler from 'express-async-handler'
import User, { hash, matchPassword } from '../models/userModel.js'
import { generateToken, verifyToken } from '../utils/generateToken.js'
import { SUCCESS, USER_UNAUTHORIZED, USER_LOGGED_IN, FAILED, USER_TOKEN_VALID, USER_TOKEN_INVALID, DATA_INSERTED, DATA_UPDATED, DATA_LOADED, USER_LOGGED_OUT } from '../config/constants.js'

var tokenList = {}

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || email.length === 0) throw new Error('E-mail is required')
  if (!password || password.length === 0) throw new Error('Password is required')

  const user = await User.findOne({ where: { email }})

  if (user && (await matchPassword(password, user.password))) {
    const token = generateToken(user.id, user.is_admin, user.name, 'token')
    const refresh = generateToken(user.id, user.is_admin, user.name, 'refresh')
    tokenList[refresh] = token

    res.cookie("rt", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // 1 day
      sameSite: 'strict',
    })

    res.status(200)
    res.json({
      status: SUCCESS,
      message: USER_LOGGED_IN,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
        token,
        refresh,
      }
    })
  } else {
    res.status(401)
    res.json({
      status: FAILED,
      message: USER_UNAUTHORIZED,
      data: null
    })
  }
})

// @desc    Check/verify token
// @route   GET /api/users/check-token
// @access  Public
const checkToken = asyncHandler(async (req, res) => {
  try {
    const refresh = req.cookies.rt  // refresh token ambil dari cookie rt
    const token = tokenList[refresh]
    verifyToken(token, 'token')

    res.status(200)
    res.json({
      status: SUCCESS,
      message: USER_TOKEN_VALID,
      data: 1,
    })
  } catch(err) {
    res.status(401)
    res.json({
      status: FAILED,
      message: USER_TOKEN_INVALID,
      data: null,
    })
  }
})

// @desc    Refresh token
// @route   POST /api/users/refresh
// @access  Private
const refreshToken = asyncHandler(async (req, res) => {
  try {
    const refresh = req.cookies.rt  // refresh token ambil dari cookie rt
    verifyToken(refresh, 'refresh')

    res.status(200)
    res.json({
      status: SUCCESS,
      message: USER_TOKEN_VALID,
      data: {
        token: tokenList[refresh],
      },
    })
  } catch(err) {
    res.status(401)
    res.json({
      status: FAILED,
      message: USER_TOKEN_INVALID,
      data: null,
    })
  }
})

// @desc    Logout
// @route   POST /api/users/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  try {
    const refresh = req.cookies.rt  // refresh token ambil dari cookie rt
    verifyToken(refresh, 'refresh')
    
    delete tokenList[refresh]

    res.clearCookie("rt")
    res.status(200)
    res.json({
      status: SUCCESS,
      message: USER_LOGGED_OUT,
      data: 1,
    })
  } catch(err) {
    res.status(401)
    res.json({
      status: FAILED,
      message: USER_TOKEN_INVALID,
      data: null,
    })
  }
})

// @desc    Register user
// @route   POST /api/users
// @access  Public
const postUser = asyncHandler(async (req, res) => {
  try {
      const fullname = req.body.fullname
      const email = req.body.email
      const password = req.body.password

      if(!fullname || fullname == '') throw new Error('fullname is required')
      if(!email || email == '') throw new Error('email is required')
      if(!password || password == '') throw new Error('password is required')

      const savedUser = await User.create({
          name: fullname,
          email,
          password: await hash(password),
          is_admin: req.body.is_admin,
      })
  
      res.status(201)
      res.json({
          status: SUCCESS,
          message: DATA_INSERTED,
          data: savedUser,
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

// @desc    Update user image
// @route   PUT /api/users/:id/image
// @access  Private
const putImage = asyncHandler(async (req, res) => {
  try {
      const image = req.body.image
      
      if(!image || image == '') throw new Error('image is required')
      
      const updatedUser = await User.update({
        image,
      }, {
        where: {id: req.params.id}
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

      const updatedUser = await User.update({
          name: fullname,
          bio,
          gender,
      }, {
        where: {id: req.params.id}
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
        const user = await User.findByPk(req.params.id, {attributes: ['projects']})
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

      const updatedUser = await User.update(data, {
          where: {id: req.params.id}
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

// @desc    Get image
// @route   GET /api/users/:id/image
// @access  Public
const getImage = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {attributes: ['image']})
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

// @desc    Get basic info
// @route   GET /api/users/:id/basic
// @access  Public
const getBasicInfo = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {attributes: ['name', 'bio', 'gender', 'email', 'createdAt']})
    if(user.length == 0) throw new Error("User does not exist!")

    const data = {
      fullname: user.name,
      bio: user.bio,
      gender: user.gender,
      email: user.email,
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

// @desc    Get array
// @route   GET /api/users/:id/:entity
// @access  Public
const getArray = asyncHandler(async (req, res) => {
  try {
    let user = {}
    let data = {}
    if(req.params.entity == 'achievements') {
      user = await User.findByPk(req.params.id, {attributes: ['achievements']})
      data = JSON.parse(user.achievements) || []
    }
    if(req.params.entity == 'skills') {
      user = await User.findByPk(req.params.id, {attributes: ['skills']})
      data = JSON.parse(user.skills) || []
    }
    if(req.params.entity == 'languages') {
      user = await User.findByPk(req.params.id, {attributes: ['languages']})
      data = JSON.parse(user.languages) || []
    }
    if(req.params.entity == 'hobbies') {
      user = await User.findByPk(req.params.id, {attributes: ['hobbies']})
      data = JSON.parse(user.hobbies) || []
    }
    if(req.params.entity == 'contacts') {
      user = await User.findByPk(req.params.id, {attributes: ['contacts']})
      data = JSON.parse(user.contacts) || []
    }
    if(req.params.entity == 'projects') {
      user = await User.findByPk(req.params.id, {attributes: ['projects']})
      data = JSON.parse(user.projects) || []
    }
    if(req.params.entity == 'experiences') {
      user = await User.findByPk(req.params.id, {attributes: ['experiences']})
      data = JSON.parse(user.experiences) || []
    }
    if(req.params.entity == 'educations') {
      user = await User.findByPk(req.params.id, {attributes: ['educations']})
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

// @desc    Get users by ids
// @route   GET /api/users?ids={id},{id},{id}
// @access  Public
const getUsersByIds = asyncHandler(async (req, res) => {
  try {
    const ids = req.query.ids.split(',')
    console.log(ids)
    const users = await User.findAll({where: {id: ids}, attributes: ['id', 'name']})

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

export {
  authUser,
  postUser,
  putImage,
  putBasicInfo,
  putArray,
  getImage,
  getBasicInfo,
  getArray,
  checkToken,
  refreshToken,
  getUsersByIds,
  logout,
}
