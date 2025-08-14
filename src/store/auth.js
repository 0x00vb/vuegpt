import { defineStore } from 'pinia'
import { login, register, verifyToken } from '../api/auth.js'
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(email, password) {
            try {
                const response = await login(email, password)
                this.token = response.token
                localStorage.setItem('token', response.token)
                return { success: true }
            } catch (error) {
                console.error('Error logging in:', error)
                return { success: false, error }
            }
        },
        async register(firstName, lastName, email, password) {
            try {
                const response = await register(firstName, lastName, email, password)
                this.user = response.user
                this.token = response.token
                localStorage.setItem('token', response.token)
                return { success: true }
            } catch (error) {
                console.error('Error registering:', error)
                return { success: false, error }
            }
        },
        async verifyToken() {
            if(!this.token) return this.logout()
            try {
                const response = await verifyToken()
                if(response.valid){
                    this.user = response.user
                    return true
                }else{
                    this.token = null
                    this.user = null
                    localStorage.removeItem('token')
                    return false
                }
            } catch (error) {
                this.logout()
                console.error('Error verifying token:', error)
                return false
            }
        },
        async logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('token')
            router.push('/auth')
        }
    }
})