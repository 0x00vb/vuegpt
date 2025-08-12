<script setup>
import Sidebar from '@/components/Sidebar.vue';
import InputBox from '@/components/InputBox.vue';
</script>

<template>
    <div class="bg-[#f1e8d6] min-h-screen flex">
        <Sidebar>
        </Sidebar>
        <div class="flex-1 flex flex-col items-center justify-center h-screen">
            <div class="flex flex-col items-center justify-center h-screen w-[60%] gap-4">
                <h1 class="text-4xl font-bold">What can I help you with?</h1>
                <InputBox />
            </div>
        </div>
    </div>
</template>