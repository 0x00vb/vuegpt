import express from 'express';
import { getSessions, createSession, getSessionById, updateSession, createSessionWithMessageStream } from '../controllers/sessions.controllers.js';
const router = express.Router();

router.get('/sessions', getSessions);
router.post('/sessions', createSession);
router.get('/sessions/:id/messages', getSessionById);
router.post('/sessions/:id/messages', updateSession);
router.post('/sessions/messages', createSessionWithMessageStream);
export default router;