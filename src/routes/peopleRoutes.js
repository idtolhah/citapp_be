import express from 'express'
import { getPeople, getPeopleById, postPeople, putPeople, votePeople } from '../controllers/peopleController.js'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'

router.route('/')
    .get(getPeople)
    .post(protect, postPeople)

router.route('/:id')
    .get(getPeopleById)
    .put(protect, putPeople)

router.route('/:id/vote/:vote')
    .put(protect, votePeople)

export default router