import * as SessionsService from '../services/sessions.service.js';
import * as MessagesRepository from '../repositories/messages.repository.js';

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
        console.log(session)
        res.json(session);
    } catch (error) {
        console.error('Error fetching session:', error);
        res.status(500).json({ error: 'Failed to fetch session' });
    }
};

export const createSessionWithMessageStream = async (req, res) => {
    const { message } = req.body;

    try {
        // Set headers for Server-Sent Events
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');

        // Create new session first
        const session = await SessionsService.createSession(`Chat ${new Date().toLocaleDateString()}`);
        
        // Send session creation event
        res.write(`data: ${JSON.stringify({ type: 'sessionCreated', data: session })}\n\n`);

        // Now handle the message with the new session
        const { userMessage, getStream } = await SessionsService.updateSessionWithMessageStream(session.id, message);

        // Send user message
        res.write(`data: ${JSON.stringify({ type: 'userMessage', data: userMessage })}\n\n`);

        // Get the stream and process it
        const stream = await getStream();
        let fullResponse = '';

        // Create a placeholder assistant message
        const assistantMessagePlaceholder = {
            id: null, // Will be set when saved
            session_id: session.id,
            role: 'assistant',
            content: '',
            created_at: new Date().toISOString()
        };

        res.write(`data: ${JSON.stringify({ type: 'assistantMessageStart', data: assistantMessagePlaceholder })}\n\n`);

        // Process the stream chunks
        for await (const chunk of stream.stream) {
            // Handle the new API format where text is in candidates[0].content.parts[0].text
            let chunkText = '';
            if (chunk.candidates && chunk.candidates[0] && chunk.candidates[0].content && chunk.candidates[0].content.parts && chunk.candidates[0].content.parts[0]) {
                chunkText = chunk.candidates[0].content.parts[0].text || '';
            }
            
            if (chunkText) {
                fullResponse += chunkText;
                // Send each chunk
                res.write(`data: ${JSON.stringify({ type: 'chunk', data: { text: chunkText } })}\n\n`);
            }
        }

        // Save the complete assistant message
        const assistantMessage = await MessagesRepository.saveMessage(session.id, 'assistant', fullResponse);

        // Send the final complete message
        res.write(`data: ${JSON.stringify({ type: 'assistantMessageComplete', data: assistantMessage })}\n\n`);

        res.write(`data: [DONE]\n\n`);
        res.end();
    } catch (error) {
        console.error('Error in new session streaming:', error);
        res.write(`data: ${JSON.stringify({ type: 'error', data: { error: 'Failed to create session and send message' } })}\n\n`);
        res.end();
    }
};

// Handle streaming messages for EXISTING sessions
export const updateSession = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    try {
        // Set headers for Server-Sent Events
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');

        const { userMessage, getStream, sessionId } = await SessionsService.updateSessionWithMessageStream(id, message);

        // Send user message first
        res.write(`data: ${JSON.stringify({ type: 'userMessage', data: userMessage })}\n\n`);

        // Get the stream and process it
        const stream = await getStream();
        let fullResponse = '';

        // Create a placeholder assistant message
        const assistantMessagePlaceholder = {
            id: null, // Will be set when saved
            session_id: sessionId,
            role: 'assistant',
            content: '',
            created_at: new Date().toISOString()
        };

        res.write(`data: ${JSON.stringify({ type: 'assistantMessageStart', data: assistantMessagePlaceholder })}\n\n`);

        // Process the stream chunks
        for await (const chunk of stream.stream) {
            // Handle the new API format where text is in candidates[0].content.parts[0].text
            let chunkText = '';
            if (chunk.candidates && chunk.candidates[0] && chunk.candidates[0].content && chunk.candidates[0].content.parts && chunk.candidates[0].content.parts[0]) {
                chunkText = chunk.candidates[0].content.parts[0].text || '';
            }
            
            if (chunkText) {
                fullResponse += chunkText;
                // Send each chunk
                res.write(`data: ${JSON.stringify({ type: 'chunk', data: { text: chunkText } })}\n\n`);
            }
        }

        // Save the complete assistant message
        const assistantMessage = await MessagesRepository.saveMessage(sessionId, 'assistant', fullResponse);

        // Send the final complete message
        res.write(`data: ${JSON.stringify({ type: 'assistantMessageComplete', data: assistantMessage })}\n\n`);

        res.write(`data: [DONE]\n\n`);
        res.end();
    } catch (error) {
        console.error('Error in streaming update:', error);
        res.write(`data: ${JSON.stringify({ type: 'error', data: { error: 'Failed to update session' } })}\n\n`);
        res.end();
    }
};

export const renameSession = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const session = await SessionsService.renameSession(id, title);
        res.json(session);
    } catch (error) {
        console.error('Error renaming session:', error);
        res.status(500).json({ error: 'Failed to rename session' });
    }
}

export const deleteSession = async (req,res) => {
    const { id } = req.params;
    try {
        const session = await SessionsService.deleteSession(id);
        res.json(session);
    } catch (error) {
        console.error('Error deleting session:', error);
        res.status(500).json({ error: 'Failed to delete session' });
    }
}