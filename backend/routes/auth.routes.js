import express from 'express'
import { login, register, verifyToken } from '../controllers/auth.controllers.js'
import authMiddleware from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/verify-token', authMiddleware, verifyToken)

export default router