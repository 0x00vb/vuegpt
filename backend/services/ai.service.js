import { GoogleGenAI } from '@google/genai';

const genai = new GoogleGenAI(process.env.GOOGLE_API_KEY);

export const generateAssistantResponse = async (history) => {
    const response = await genai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: history.map(h => h.parts).join('\n'),
        systemInstruction: 'You are a helpful assistant that can answer questions and help with tasks.',
        temperature: 0.7,
        maxOutputTokens: 1000,
    });
    return response.text;
}; 