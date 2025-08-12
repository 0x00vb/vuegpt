import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import AuthPage from '@/pages/AuthPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/auth', component: AuthPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;