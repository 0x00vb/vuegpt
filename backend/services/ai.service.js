import { GoogleGenAI } from '@google/genai';

const genai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

export const generateAssistantResponse = async (history) => {
    try {
        // Format the history for the new API
        const contents = history.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.parts }]
        }));

        const response = await genai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: contents,
            config: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        });

        return response.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error generating AI response:', error);
        throw new Error(`AI response generation failed: ${error.message}`);
    }
};

export const generateAssistantResponseStream = async (history) => {
    try {
        // Format the history for the new API
        const contents = history.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.parts }]
        }));

        const responseStream = await genai.models.generateContentStream({
            model: 'gemini-2.0-flash-001',
            contents: contents,
            config: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        });

        return {
            stream: responseStream
        };
    } catch (error) {
        console.error('Error generating AI response stream:', error);
        throw new Error(`AI response stream generation failed: ${error.message}`);
    }
}; 