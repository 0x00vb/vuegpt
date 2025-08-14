<script setup>
import { ref, watch, nextTick } from 'vue';
import { useChatStore } from '@/store/chat';
import MesageBox from '@/components/MesageBox.vue';

const chatStore = useChatStore();
const messagesContainer = ref(null);

watch(
    () => chatStore.messages,
    async () => {
        await nextTick();
        if(messagesContainer.value){
            messagesContainer.value.scrollTo({
                top: messagesContainer.value.scrollHeight,
                behavior: 'smooth'
            })
        }
    },
    { deep: true }
)

</script>

<template>
    <div 
    ref="messagesContainer"
    :class="`flex flex-col gap-4 w-full ${chatStore.messages.length > 0 ? 'h-full py-10 overflow-y-auto' : ''}`"
    >
        <div v-for="message in chatStore.messages" :key="message.id" class="flex flex-col gap-2">
            <MesageBox :message="message" />
        </div>
    </div>
</template>