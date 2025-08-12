import express from 'express';
import { getSessions, createSession, getSessionById, updateSession } from '../controllers/sessions.controllers.js';
const router = express.Router();

router.get('/sessions', getSessions);
router.post('/sessions', createSession);
router.get('/sessions/:id/messages', getSessionById);
router.post('/sessions/:id/message', updateSession);

export default router;