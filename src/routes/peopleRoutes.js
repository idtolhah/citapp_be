import express from 'express'
import { getPeople, getPositions } from '../controllers/peopleController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .get(getPeople)

router.route('/positions')
  .get(getPositions)

export default router