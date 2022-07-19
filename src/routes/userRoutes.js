import express from 'express'
const router = express.Router()
import {
    postUser,
    authUser,
    checkToken,
    refreshToken,
    logout,
    getUsersByIds,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(postUser)
  .get(getUsersByIds)
router.route('/login')
  .post(authUser) // login
router.route('/register')
  .post(postUser) // register
router.route('/check-token')
  .get(checkToken)
router.route('/refresh')
  .post(refreshToken)
router.route('/logout')
  .post(logout)

export default router