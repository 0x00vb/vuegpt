import * as SessionsService from '../services/sessions.service.js';

export const getSessions = async (req, res) => {
    try {
        const sessions = await SessionsService.getSessions();
        res.json(sessions);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
};

export const createSession = async (req, res) => {
    const { title } = req.body;
    try {
        const session = await SessionsService.createSession(title);
        res.status(201).json(session);
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
};

export const getSessionById = async (req, res) => {
    const { id } = req.params;
    try {
        const session = await SessionsService.getSessionById(id);
        res.json(session);
    } catch (error) {
        console.error('Error fetching session:', error);
        res.status(500).json({ error: 'Failed to fetch session' });
    }
};

export const updateSession = async (req, res) => {
    const { sessionId, content } = req.params;
    try {
        const { userMessage, assistantMessage } = await SessionsService.updateSessionWithMessage(sessionId, content);
        res.status(201).json({ userMessage, assistantMessage });
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({ error: 'Failed to update session' });
    }
};