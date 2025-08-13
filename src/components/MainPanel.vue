<script setup>
import InputBox from '@/components/InputBox.vue';
import MessagesList from '@/components/MessagesList.vue';
import { useChatStore } from '@/store/chat';

const chatStore = useChatStore();

</script>

<template>
    <div class="flex-1 flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center h-screen w-[60%] gap-4">
            <h1 :class="chatStore.messages.length > 0 ? 'hidden' : 'text-4xl font-bold'">What can I help you with?</h1>
            <MessagesList />
            <InputBox />
        </div>
    </div>
</template>