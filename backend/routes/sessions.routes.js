import express from 'express';
import  * as sessionsController from '../controllers/sessions.controllers.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express.Router();

router.use(authMiddleware)

router.get('/sessions', sessionsController.getSessions);
router.post('/sessions', sessionsController.createSession);
router.get('/sessions/:id/messages', sessionsController.getSessionById);
router.post('/sessions/:id/messages', sessionsController.updateSession);
router.post('/sessions/messages', sessionsController.createSessionWithMessageStream);
router.put('/sessions/:id/rename', sessionsController.renameSession);
router.delete('/sessions/:id', sessionsController.deleteSession);

export default router;