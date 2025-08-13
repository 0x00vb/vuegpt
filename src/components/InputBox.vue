<template>
    <form 
    @submit.prevent="sendMessage"
    class="flex flex-col items-center justify-center w-full bg-amber-50 h-38 p-2 mb-5 outline-0 rounded-3xl shadow-md shadow-gray-300 border-0 gap-2"
    >
    <div class="flex flex-row items-center justify-center w-full gap-3">
        <!-- Text Input -->
        <input type="text" 
            class="w-full h-full p-3 border-0 outline-0  bg-transparent text-gray-800 placeholder-gray-400"
            placeholder="Ask me anything..."
            v-model="message"
        />

    </div>
    <div class="flex flex-row items-center justify-between w-full p-2">
        <div class="flex flex-row items-center  w-full gap-2">

            <!-- Load Image Button -->
            <label class="flex items-center justify-center bg-[#f1e8d6] hover:bg-white/50 text-gray-800 px-3 py-2 rounded-lg shadow transition-colors cursor-pointer border border-gray-200">
                <input type="file" accept="image/*" class="hidden" @change="onImageChange" />
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1e2939">
                    <path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z"/>
                </svg>        
            </label>

            <!-- Search Button -->
            <button type="button" class="flex items-center gap-1 bg-[#f1e8d6] hover:bg-white/50 text-gray-800 px-4 py-2 rounded-lg shadow border border-gray-200 transition-colors font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
                Search
            </button>        
        </div>

        <!-- Send Button -->
        <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2 shadow font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/>
            </svg>
        </button>
    </div>
    </form>
</template>
<script setup>
import { ref } from 'vue';
import { useChatStore } from '@/store/chat';

const message = ref("");
const chatStore = useChatStore();

const sendMessage = async () => {
    if(!message.value) return;
    await chatStore.sendMessage(message.value);
    message.value = "";
}



function onImageChange(event) {
    const file = event.target.files[0];
    if (file) {
        // Handle the image file as needed
    }
}

</script>