import express from 'express'
const router = express.Router()
import { 
    getImage, 
    putImage, 
    getBasicInfo, 
    putBasicInfo, 
    getArray, 
    putArray, 
} from '../controllers/profileController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/:id/image')
  .put(protect, putImage)
  .get(getImage)
router.route('/:id/basic')
  .put(protect, putBasicInfo)
  .get(getBasicInfo)
router.route('/:id/:entity')
  .put(protect, putArray)
  .get(getArray)
router.route('/:id/:entity/:entityid')
  .put(protect, putArray)
router.route('/:id/:entity/:entityid/:operation')
  .put(protect, putArray)

export default router