<script setup>
import { ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import MainPanel from '@/components/MainPanel.vue';
import ChatsModal from '@/components/ChatsModal.vue';
import ProfileIcon from '@/components/ProfileIcon.vue';

const isChatsModalOpen = ref(false);

const toggleChatsModal = () => {
    isChatsModalOpen.value = !isChatsModalOpen.value;
};

</script>

<template>
    <div class="bg-[#f1e8d6] min-h-screen flex">
        <Sidebar :toggle-modal="toggleChatsModal" />
        <MainPanel />
        <ChatsModal :is-open="isChatsModalOpen" :toggleModal="toggleChatsModal" />
        <ProfileIcon />
    </div>
</template>