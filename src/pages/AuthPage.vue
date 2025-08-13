<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Toggle between login and register
const isLogin = ref(true)

// Form data
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')

const toggleMode = () => {
  isLogin.value = !isLogin.value

  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  firstName.value = ''
  lastName.value = ''
}

const handleLogin = async () => {
    console.log('Login attempt:', { email: email.value, password: password.value })
    const result = await authStore.login(email.value, password.value)
    if (result.success) {
        console.log('Login successful, redirecting to home...')
        router.push('/')
    } else {
        console.error('Login failed:', result.error)
        // You can add error handling UI here
    }
}

const handleRegister = async () => {
  console.log('Register attempt:', { 
    firstName: firstName.value, 
    lastName: lastName.value, 
    email: email.value, 
    password: password.value 
  })
  const result = await authStore.register(firstName.value, lastName.value, email.value, password.value)
  if (result.success) {
      console.log('Registration successful, redirecting to home...')
      router.push('/')
  } else {
      console.error('Registration failed:', result.error)
      // You can add error handling UI here
  }
}
</script>

<template>
    <div class="bg-[#f1e8d6] min-h-screen flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center mb-4">
            <h1 class="text-2xl font-bold mb-4">Welcome to VueGPT</h1>
            <p class="text-sm text-gray-500 mb-4">
              {{ isLogin ? 'Please login to continue' : 'Create your account to get started' }}
            </p>
        </div>
        
        <div class="bg-[#faf5e9] w-lg p-8 rounded-lg shadow-md">
            <!-- Login Section -->
            <div v-if="isLogin">
                <h1 class="text-2xl font-bold mb-4">Login</h1>
                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" v-model="email" class="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-0" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" v-model="password" class="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-0" required>
                    </div>
                    <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Login</button>
                </form>
                <p class="text-sm text-gray-500 mt-4">
                  Don't have an account? 
                  <button @click="toggleMode" class="text-indigo-600 hover:text-indigo-700 underline">Register</button>
                </p>
                <p class="text-sm text-gray-500 mt-2">
                  Forgot your password? 
                  <a href="#" class="line-through text-indigo-600 hover:text-indigo-700">Reset Password</a>
                </p>
            </div>

            <!-- Register Section -->
            <div v-else>
                <h1 class="text-2xl font-bold mb-4">Register</h1>
                <form @submit.prevent="handleRegister">
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" v-model="firstName" class="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-0" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" v-model="lastName" class="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-0" required>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" v-model="email" class="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-0" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" v-model="password" class="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-0" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" v-model="confirmPassword" class="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-0" required>
                    </div>
                    <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Create Account</button>
                </form>
                <p class="text-sm text-gray-500 mt-4">
                  Already have an account? 
                  <button @click="toggleMode" class="text-indigo-600 hover:text-indigo-700 underline">Login</button>
                </p>
            </div>

            <!-- Google Login (shown for both modes) -->
            <div class="flex flex-col items-center justify-center mt-4">
                <p class="text-sm text-gray-500">Or</p>
                <button
                    type="button"
                    class="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none active:shadow transition dark:bg-white dark:text-gray-800"
                    aria-label="Continue with Google"
                    >
                    <!-- Google 'G' icon (official multicolor paths) -->
                    <svg class="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6 1.54 7.38 2.83l5.02-4.91C33.64 4.04 29.3 2 24 2 14.82 2 6.96 7.58 3.69 15.22l6.79 5.27C11.89 14.4 17.42 9.5 24 9.5z"/>
                        <path fill="#34A853" d="M46.5 24.5c0-1.64-.15-3.2-.44-4.71H24v9.02h12.66c-.55 2.96-2.2 5.47-4.71 7.16l7.2 5.59c4.21-3.88 6.35-9.6 6.35-16.06z"/>
                        <path fill="#4A90E2" d="M24 46c6.3 0 11.6-2.08 15.47-5.64l-7.2-5.59c-1.99 1.35-4.54 2.15-8.27 2.15-6.33 0-11.71-4.25-13.64-9.98l-6.85 5.29C7.24 40.42 15.04 46 24 46z"/>
                        <path fill="#FBBC05" d="M10.36 27.94A14.49 14.49 0 0 1 9.5 24c0-1.38.24-2.72.66-3.94l-6.79-5.27A22.91 22.91 0 0 0 1 24c0 3.77.9 7.33 2.37 10.48l6.99-6.54z"/>
                    </svg>

                    <span>{{ isLogin ? 'Login' : 'Sign up' }} with Google</span>
                </button>
            </div>
        </div>
    </div>
</template>