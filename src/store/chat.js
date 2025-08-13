import { getSessions, createSession } from '@/api/sessions'
import { getMessages, createMessage } from '@/api/messages'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
    state: () => ({
        sessions: [],
        currentSession: null,
        messages: [],
        loading: false,
        error: null,
        isStreaming: false,
        streamingMessageId: null,
    }),
    actions: {
        async loadSessions(){
           this.loading = true
           try {
            const sessions = await getSessions();
            this.sessions = sessions;
           } catch (error) {
            this.error = error
           } finally {
            this.loading = false
           }
        },
        async startSession(){
                this.currentSession = null
                this.messages = []
                this.error = null
        },
        async loadMessages(sessionId){
            this.loading = true
            try {
                const messages = await getMessages(sessionId)
                this.messages = messages
                this.currentSession = this.sessions.find(session => session.id == sessionId)
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async sendMessage(message) {
            this.isStreaming = true;
            this.error = null;
            let currentAssistantMessage = null;

            const onChunk = (chunk) => {
                switch (chunk.type) {
                    case 'userMessage':
                        this.messages.push(chunk.data);
                        break;
                    case 'sessionCreated':
                        // Update current session and add to sessions list
                        this.currentSession = chunk.data;
                        this.sessions.unshift(chunk.data);
                        break;
                    case 'assistantMessageStart':
                        currentAssistantMessage = { ...chunk.data };
                        this.streamingMessageId = currentAssistantMessage.id;
                        this.messages.push(currentAssistantMessage);
                        break;
                    case 'chunk':
                        if (currentAssistantMessage) {
                            // Find the message in the array and update it
                            const messageIndex = this.messages.findIndex(msg => 
                                msg === currentAssistantMessage || 
                                (msg.role === 'assistant' && msg.id === this.streamingMessageId)
                            );
                            if (messageIndex !== -1) {
                                this.messages[messageIndex].content += chunk.data.text;
                            }
                        }
                        break;
                    case 'assistantMessageComplete':
                        // Update with the final saved message data
                        const messageIndex = this.messages.findIndex(msg => 
                            msg === currentAssistantMessage || 
                            (msg.role === 'assistant' && msg.id === this.streamingMessageId)
                        );
                        if (messageIndex !== -1) {
                            this.messages[messageIndex] = chunk.data;
                        }
                        break;
                }
            };

            const onComplete = () => {
                this.isStreaming = false;
                this.streamingMessageId = null;
            };

            const onError = (error) => {
                this.error = error;
                this.isStreaming = false;
                this.streamingMessageId = null;
            };

            try {
                // If no current session, send to new session endpoint
                // If existing session, send to existing session endpoint
                await createMessage(
                    this.currentSession?.id || null,
                    message, 
                    onChunk, 
                    onComplete, 
                    onError
                );
            } catch (error) {
                this.error = error;
                this.isStreaming = false;
                this.streamingMessageId = null;
            }
        },

    }   
})