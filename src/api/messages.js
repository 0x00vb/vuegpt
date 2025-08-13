import api from './index'

const API_BASE_URL = import.meta.env.VITE_API_URL

export const getMessages = async (sessionId) => {
    const response = await api.get(`/sessions/${sessionId}/messages`);
    console.log(response.data)
    return response.data;
};

export const createMessage = async (sessionId, message, onChunk, onComplete, onError) => {
    try {
        const url = sessionId 
            ? `${API_BASE_URL}/sessions/${sessionId}/messages`
            : `${API_BASE_URL}/sessions/messages`; // For new sessions - use the stream endpoint
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Failed to create message stream');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { value, done } = await reader.read();
            
            if (done) {
                break;
            }

            buffer += decoder.decode(value, { stream: true });
            
            // Process complete lines
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer

            for (const line of lines) {
                if (line.trim() === '') continue;
                
                if (line.startsWith('data: ')) {
                    const data = line.substring(6);
                    
                    if (data === '[DONE]') {
                        onComplete();
                        return;
                    }
                    
                    try {
                        const chunk = JSON.parse(data);
                        onChunk(chunk);
                    } catch (e) {
                        console.error('Error parsing chunk:', e);
                    }
                }
            }
        }

        onComplete();
    } catch (error) {
        onError(error);
    }
};