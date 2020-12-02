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

const store = useStore()


router.beforeEach((to, from, next) => {
    console.log('to', to)
    console.log('from', from)
    console.log('file: router.ts ~ line 36 ~ store', store);
    if(to.path === '/create') {
        next()
    }else {
        next()
    }
})

export default router