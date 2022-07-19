import asyncHandler from 'express-async-handler'
import User, { hash, matchPassword } from '../models/userModel.js'
import { generateToken, verifyToken } from '../utils/generateToken.js'
import { SUCCESS, USER_UNAUTHORIZED, USER_LOGGED_IN, FAILED, USER_TOKEN_VALID, USER_TOKEN_INVALID, DATA_INSERTED, DATA_LOADED, USER_LOGGED_OUT } from '../config/constants.js'
import Profile from '../models/profileModel.js'

var tokenList = {}

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

      await Profile.create({
        user_id: savedUser.id
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
  checkToken,
  refreshToken,
  logout,
  getUsersByIds,
}
