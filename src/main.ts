import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from '@/store/store'
import './assets/css/reset.css'

const app = createApp(App) // 创建vue实例

app.use(router)
app.use(store)

app.mount('#app') // 将实例挂载到页面上
