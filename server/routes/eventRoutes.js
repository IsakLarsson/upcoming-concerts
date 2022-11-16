import express from 'express'
import { getEvents } from '../controllers/eventController.js'

const router = express.Router()

router.get('/api/events', getEvents)

export default router
