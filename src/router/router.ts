import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store/store'
import $message from '@/components/message/createMessage'

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


// 路由导航守卫
router.beforeEach((to, from, next) => {
    console.log('to', to)

    // 进入登录不需要校验
    if(to.path === '/login'){
        next()
        return ;
    }

    // 没有token需要先登录
    const token = localStorage.getItem('zhihu-token')
    if(token) {
        store.dispatch('checkLogin').then((result) => {
            if(result){
                next()
                return ;
            }else {
                $message('您尚未登录')
                next('/login')
                return 
            }
        })
    } else {
        $message('您尚未登录')
        next('/login')
        return 
    }

    next()
})

export default router