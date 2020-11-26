import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        component: () => import('@/views/home/home.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/user/login.vue')
    },
    {
        path: '/column/:id',
        component: () => import('@/views/column/column-detail.vue')
    },
    {
        path: '/',
        redirect: '/home'
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router