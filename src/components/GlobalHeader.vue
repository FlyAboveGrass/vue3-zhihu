<template>

    <nav class="navbar navbar-dark bg-primary mb-4 justify-content-between px-5">
        <a class="navbar-brand mx-5" href="#">知乎</a>

        <ul v-if="!userInfo.isLogin" class="list-inline mb-0  mx-2">
            <li class="list-inline-item"><router-link to="/login" tag="a" class="btn btn-outline-light my-2 my-sm-0 mx-2" type="submit">登录</router-link></li>
            <li class="list-inline-item"><router-link to="/registry" tag="a" class="btn btn-outline-light my-2 my-sm-0 mx-2" type="submit">注册</router-link></li>
        </ul>

        <v-menu v-else :title="userInfo.name">
            <dropdown-item><a href="#" class="dropdown-item">我的文章</a></dropdown-item>
            <dropdown-item><a href="#" class="dropdown-item">创作中心</a></dropdown-item>
            <dropdown-item><a href="#" class="dropdown-item">退出登录</a></dropdown-item>
        </v-menu>
    </nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { useStore } from 'vuex'
import { IUserProps } from '@/interface/user.ts'
import VMenu from '@/components/Menu/menu.vue' // 名字不能用menu，会跟现有标签冲突
import dropdownItem from '@/components/Menu/dropdownItem.vue'

export default defineComponent({
    name: 'GlobalHeader',
    props: {
    },
    components: {
        VMenu,
        dropdownItem
    },
    setup() {
        const store = useStore()
        console.log('🚀 ~ file: GlobalHeader.vue ~ line 39 ~ setup ~ store', store)
        const userInfo = computed(() => store.state.userInfo)
        return {
            userInfo
        }
    }
})
</script>

<style scoped lang="less">

</style>
