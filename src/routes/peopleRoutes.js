import express from 'express'
import { getPeople, getPersonById, getPositions } from '../controllers/peopleController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
  .get(getPeople)
  
router.route('/positions')
.get(getPositions)

router.route('/:id')
  .get(getPersonById)

export default router