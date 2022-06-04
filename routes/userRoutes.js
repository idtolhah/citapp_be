import express from 'express'
const router = express.Router()
import {
  authUser,
  checkToken,
  getArray,
  getBasicInfo,
  getImage,
  logout,
  postUser,
  putArray,
  putBasicInfo,
  putImage,
  refreshToken,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .post(postUser)
router.route('/:id/image')
  .put(protect, putImage)
  .get(getImage)
router.route('/:id/basic')
  .put(protect, putBasicInfo)
  .get(getBasicInfo)
router.route('/:id/:entity')
  .put(protect, putArray)
  .get(getArray)
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
