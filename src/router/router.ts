import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'

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
        path: '/registry',
        component: () => import('@/views/user/registry.vue')
    },
    {
        path: '/column/:id',
        component: () => import('@/views/column/column-detail.vue')
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/create',
        component: () => import('@/views/article/create.vue')
    },
    {
        path: '/article/detail/:id',
        component: () => import('@/views/article/detail.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// const store = useStore()
// // 路由导航守卫
// router.beforeEach((to, from, next) => {
//     console.log('to', to)
// })

export default router