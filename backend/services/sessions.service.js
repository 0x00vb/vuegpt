import * as SessionsRepository from '../repositories/sessions.repository.js';
import * as MessagesRepository from '../repositories/messages.repository.js';
import { generateAssistantResponse } from './ai.service.js';

export const getSessions = async () => {
    return await SessionsRepository.getAllSessions();
};

export const createSession = async (title) => {
    return await SessionsRepository.createSession(title);
};

export const getSessionById = async (id) => {
    return await SessionsRepository.getSessionById(id);
};

export const updateSessionWithMessage = async (sessionId, content) => {
    // Save user message
    const userMessage = await MessagesRepository.saveMessage(sessionId, 'user', content);
    // Get conversation history
    const historyRows = await MessagesRepository.getMessagesBySessionId(sessionId);
    const history = historyRows.map(msg => ({
        role: msg.role,
        parts: msg.content
    }));
    // Generate assistant response
    const assistantResponse = await generateAssistantResponse(history);
    // Save assistant message
    const assistantMessage = await MessagesRepository.saveMessage(sessionId, 'assistant', assistantResponse);
    return { userMessage, assistantMessage };
}; 