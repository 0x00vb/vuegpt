<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { useChatStore } from '@/store/chat';

import ChatsOptions from '@/components/ChatsOptions.vue';

defineProps({
  toggleModal: {
    type: Function,
    required: true
  }
})

const chatStore = useChatStore();

const sidebarOpen = ref(true);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

// Inline editing state
const editingSessionId = ref(null);
const editingTitle = ref('');

// Handle session operations
const handleRenameSession = async (sessionId) => {
  const session = chatStore.sessions.find(s => s.id === sessionId);
  if (session) {
    editingSessionId.value = sessionId;
    editingTitle.value = session.title;
    
    // Focus the input in the next tick
    await nextTick();
    const input = document.querySelector(`[data-session-id="${sessionId}"] input`);
    if (input) {
      input.focus();
      input.select();
    }
  }
};

const confirmRename = async (sessionId) => {
  if (editingTitle.value.trim() && editingTitle.value.trim() !== '') {
    try {
      await chatStore.renameSession(sessionId, editingTitle.value.trim());
    } catch (error) {
      console.error('Error renaming session:', error);
    }
  }
  cancelEdit();
};

const cancelEdit = () => {
  editingSessionId.value = null;
  editingTitle.value = '';
};

const handleDeleteSession = async (sessionId) => {
  try {
    await chatStore.deleteSession(sessionId);
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};


onMounted(async () => {
  await chatStore.loadSessions();
});
</script>

<template>
  <div 
    class="bg-[#f1e8d6] min-h-screen shadow-lg fixed md:static left-0 top-0 z-10 transition-all duration-300 ease-in-out"
    :class="sidebarOpen ? 'w-[300px]' : 'w-[60px]'"
  >
    <!-- Toggle Button - Always Visible -->
    <div class="absolute top-3 left-4 z-40">
      <button 
        @click="toggleSidebar" 
        class=" text-gray-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#fafafa52] transition-colors outline-none"
      >
        <!-- Hamburger/Close Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1e2939">
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"/>
        </svg>
      </button>
    </div>

    <!-- Sidebar Content Container -->
    <div class="flex flex-col h-screen overflow-hidden">
      <!-- Peek Content (Always Visible) -->
      <div class="flex flex-col items-center justify-start pt-16 px-2">
        <!-- Mini Icons/Indicators when closed -->
        <div v-if="!sidebarOpen" class="flex flex-col gap-4">
          <!-- Chat Icon -->
          <div class="w-8 h-8 b rounded-lg flex items-center justify-center text-gray-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
          </div>
          
          <!-- Search Icon -->
          <div class="w-8 h-8  rounded-lg flex items-center justify-center text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
          </div>
          
        </div>
      </div>

      <!-- Full Sidebar Content (When Open) -->
      <transition 
        name="sidebar-content"
        enter-active-class="transition-opacity duration-300 ease-in-out"
        leave-active-class="transition-opacity duration-200 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="sidebarOpen" class="flex flex-col items-center justify-center flex-1 px-4">
          <!-- Main Sidebar Content -->
          <div class="h-full w-full">
            
            <!-- Navigation Items -->
            <nav class="space-y-3 border-b-1 border-gray-200 pb-2">
              <a @click="chatStore.startSession" class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg px-3 py-2 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>New chat</span>
              </a>
              
              <a @click="toggleModal" class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg px-3 py-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                </svg>
                <span>Search chat</span>
              </a>
            </nav>

            <div class="flex flex-col gap-2">
              <p class="text-gray-700 text-sm font-bold mt-4">
                Chats
              </p>
              <div 
              v-for="session in chatStore.sessions" 
              :key="session.id" 
              :data-session-id="session.id"
              @click="editingSessionId !== session.id ? chatStore.loadMessages(session.id) : null"
              class="flex items-center justify-between space-x-3 text-gray-700 hover:text-gray-900 hover:bg-white/50 rounded-lg px-3 py-2 transition-colors">
                
                <!-- Editable Title -->
                <div class="flex-1 min-w-0">
                  <span 
                    v-if="editingSessionId !== session.id" 
                    class="text-sm cursor-pointer block truncate"
                  >
                    {{ session.title }}
                  </span>
                  <input
                    v-else
                    v-model="editingTitle"
                    type="text"
                    class="text-sm w-full bg-white border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    @keyup.enter="confirmRename(session.id)"
                    @keyup.escape="cancelEdit"
                    @blur="confirmRename(session.id)"
                    @click.stop
                  />
                </div>
                
                <ChatsOptions 
                  :chat="session" 
                  @rename="handleRenameSession"
                  @delete="handleDeleteSession"
                  @click.stop
                />
              </div>

            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Hover hint when closed -->
    <div 
      v-if="!sidebarOpen" 
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-70"
    >
      <svg class="w-4 h-4 mx-auto animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions for the sidebar width */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom scrollbar for the sidebar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>