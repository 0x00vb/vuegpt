<script setup>
    import { useAuthStore } from '@/store/auth';
    
    const authStore = useAuthStore();
    
    const userName = authStore.user.name;
    
</script>
<template>
    <div class="fixed top-2 right-5 flex items-center justify-center w-10 h-10 p-4 text-white bg-gradient-to-r from-blue-800 to-indigo-900 rounded-full shadow-lg">
        <p>{{  userName[0] }}</p>
    </div>
</template>