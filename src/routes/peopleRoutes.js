import express from 'express'
import { getPeople, getPeopleById, putPeople } from '../controllers/peopleController.js'
const router = express.Router()

router.route('/')
    .get(getPeople)

router.route('/:id')
    .get(getPeopleById)

router.route('/:id')
    .put(putPeople)

export default router