import express from 'express'
import { checkVoteable, votePeople } from '../controllers/voteController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/:id')
    .get(protect, checkVoteable)
    .post(protect, votePeople)

export default router