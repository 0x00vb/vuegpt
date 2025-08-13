<script setup>
import { useChatStore } from '@/store/chat';

defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    toggleModal: {
        type: Function,
        required: true
    }
})

const chatStore = useChatStore();
</script>

<template>
    <div v-if="isOpen" @click="toggleModal" class="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black/50 z-50">
        <div @click.stop class="bg-[#f1ebde] w-full max-w-2xl mx-auto rounded-lg  shadow-lg p-4">
            <input @keyup.esc="toggleModal" type="text" class="w-full p-3 border-0 outline-0" placeholder="Search chats">
            <div class="flex flex-col gap-2 border-t border-gray-300 pt-2">
                <div v-for="session in chatStore.sessions" :key="session.id" class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg px-3 py-3 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span class="text-md">{{ session.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>