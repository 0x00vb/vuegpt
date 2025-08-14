<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const userName = authStore.user.name

const dropdownOpen = ref(false)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function logout() {
  authStore.logout()
  dropdownOpen.value = false
}
</script>

<template>
  <div class="relative">
    <!-- Avatar Button -->
    <div 
      class="fixed top-2 right-5 flex items-center justify-center w-10 h-10 p-4 text-white bg-gradient-to-r from-blue-800 to-indigo-900 rounded-full shadow-lg cursor-pointer"
      @click="toggleDropdown"
    >
      <p class="font-bold">{{ userName[0] }}</p>
    </div>

    <!-- Dropdown -->
    <div 
      v-if="dropdownOpen"
      class="absolute right-5 top-14 w-32 bg-white text-black rounded-md shadow-lg overflow-hidden z-50"
    >
      <button 
        @click="logout" 
        class="flex gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
        </svg>
        Logout
      </button>
    </div>
  </div>
</template>
