import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import { useAuthStore } from '@/store/auth';
const routes = [
    { path: '/', component: HomePage, meta: { requiresAuth: true } },
    { path: '/auth', component: AuthPage, meta: { requiresAuth: false } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach( async (to, from, next) => {
    const authStore = useAuthStore()

    // If user has token but no user data, verify the token
    if(authStore.isAuthenticated && !authStore.user){
        const isValid = await authStore.verifyToken()
        if(!isValid){
            return next('/auth')
        }
    }

    // If route requires auth and user is not authenticated, redirect to auth
    if(to.meta.requiresAuth && !authStore.isAuthenticated){
        return next('/auth')
    }

    // If user is authenticated and trying to access auth page, redirect to home
    if(to.path === '/auth' && authStore.isAuthenticated){
        return next('/')
    }

    next()
})

export default router;