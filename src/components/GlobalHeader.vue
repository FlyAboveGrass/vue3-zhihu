<template>

    <nav class="navbar navbar-dark bg-primary mb-4 justify-content-between px-5">
        <a class="navbar-brand mx-5" href="#">知乎</a>

        <ul v-if="!user.isLogin" class="list-inline mb-0  mx-2">
            <li class="list-inline-item"><a class="btn btn-outline-light my-2 my-sm-0 mx-2" type="submit">登录</a></li>
            <li class="list-inline-item"><a class="btn btn-outline-light my-2 my-sm-0 mx-2" type="submit">注册</a></li>
        </ul>

        <v-menu v-else :title="user.name">
          <dropdown-item><a href="#" class="dropdown-item">我的文章</a></dropdown-item>
          <dropdown-item><a href="#" class="dropdown-item">创作中心</a></dropdown-item>
          <dropdown-item><a href="#" class="dropdown-item">退出登录</a></dropdown-item>
        </v-menu>
    </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IUserProps } from '@/interface/user.ts'
import VMenu from '@/components/Menu/menu.vue'
import dropdownItem from '@/components/Menu/dropdownItem.vue'

export default defineComponent({
    name: 'GlobalHeader',
    props: {
        user: {
            type: Object as PropType<IUserProps>,
            required: true
        }
    },
    components: {
      VMenu,
      dropdownItem
    }
})
</script>

<style scoped lang="less">

</style>
