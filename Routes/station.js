import express from 'express'
import {addStation, getSingleStation, getAllStation} from '../Controllers/stationController.js'

const router = express.Router()

router.post("/addstation", addStation)
router.get("/:id", getSingleStation)
router.get("/", getAllStation)

export default router